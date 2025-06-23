/**
 * 国际化路由中间件
 * 为 Fresh 2.0 提供 i18n 支持
 */

import { FreshContext } from "fresh";
import { DEFAULT_LANGUAGE, PERFORMANCE_CONFIG } from "./config.ts";
import { detectLanguage, ServerLanguageDetector } from "./detector.ts";
import { formatDate, formatNumber } from "./formatter.ts";
import { loadNamespace, preloadNamespaces } from "./loader.ts";
import type {
  I18nMiddlewareContext,
  SupportedLanguage,
  TranslationFunction,
  TranslationNamespace,
  TranslationParams,
} from "./types.ts";

/**
 * 扩展 FreshContext 以包含 i18n 信息
 */
interface I18nFreshContext extends FreshContext {
  state: {
    i18n?: I18nMiddlewareContext;
    [key: string]: unknown;
  };
}

/**
 * 服务端翻译缓存
 */
const serverTranslationCache = new Map<string, Record<string, unknown>>();

/**
 * 创建服务端翻译函数
 */
async function createServerTranslationFunction(
  language: SupportedLanguage,
): Promise<TranslationFunction> {
  // 预加载常用命名空间
  const namespaces = PERFORMANCE_CONFIG.preloadNamespaces;

  try {
    await preloadNamespaces(language, namespaces);

    // 加载翻译资源到缓存
    const translations: Record<string, Record<string, unknown>> = {};
    for (const namespace of namespaces) {
      const cacheKey = `${language}_${namespace}`;
      if (!serverTranslationCache.has(cacheKey)) {
        const resource = await loadNamespace(language, namespace);
        serverTranslationCache.set(cacheKey, resource);
      }
      const cachedResource = serverTranslationCache.get(cacheKey);
      if (cachedResource) {
        translations[namespace] = cachedResource;
      }
    }

    // 返回翻译函数
    return (
      key: string,
      params?: TranslationParams,
      namespace = "common",
    ) => {
      const resource = translations[namespace];
      if (!resource) {
        console.warn(
          `Translation namespace not loaded on server: ${namespace}`,
        );
        return key;
      }

      const translation = getNestedValue(resource, key);
      if (translation === undefined) {
        console.warn(
          `Translation key not found on server: ${key} in namespace ${namespace}`,
        );
        return key;
      }

      if (!params || typeof translation !== "string") {
        return String(translation);
      }

      // 简单的参数插值
      return interpolateString(translation, params);
    };
  } catch (error) {
    console.error("Failed to create server translation function:", error);

    // 返回回退翻译函数
    return (key: string) => key;
  }
}

/**
 * 获取嵌套对象的值
 */
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((current: unknown, key: string) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);
}

/**
 * 字符串插值
 */
function interpolateString(
  template: string,
  params: TranslationParams,
): string {
  return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
    const value = params[key.trim()];
    return value !== undefined ? String(value) : match;
  });
}

/**
 * i18n 中间件
 * 在每个请求中检测语言并提供翻译功能
 */
export function i18nMiddleware() {
  return async function middleware(ctx: I18nFreshContext) {
    try {
      // 检测语言
      let detectedLanguage: SupportedLanguage;

      if (typeof window === "undefined") {
        // 服务端：从请求中检测语言
        const detection = ServerLanguageDetector.detectFromRequest(ctx.req);
        detectedLanguage = detection.language;
      } else {
        // 客户端：使用客户端检测器
        const detection = detectLanguage();
        detectedLanguage = detection.language;
      }

      // 创建翻译函数
      const t = await createServerTranslationFunction(detectedLanguage);

      // 创建格式化函数
      const formatDateFn = (date: Date, options?: Intl.DateTimeFormatOptions) =>
        formatDate(date, detectedLanguage, options);

      const formatNumberFn = (
        number: number,
        options?: { useGrouping?: boolean },
      ) => formatNumber(number, detectedLanguage, options);

      // 将 i18n 上下文添加到状态中
      ctx.state.i18n = {
        language: detectedLanguage,
        t,
        formatDate: formatDateFn,
        formatNumber: formatNumberFn,
      };

      // 设置语言相关的响应头
      const response = await ctx.next();

      if (response) {
        response.headers.set("Content-Language", detectedLanguage);
      }

      return response;
    } catch (error) {
      console.error("i18n middleware error:", error);

      // 设置默认语言上下文
      ctx.state.i18n = {
        language: DEFAULT_LANGUAGE,
        t: (key: string) => key,
        formatDate: (date: Date) => date.toLocaleDateString(),
        formatNumber: (number: number) => number.toString(),
      };

      return ctx.next();
    }
  };
}

/**
 * 页面级 i18n 中间件
 * 为特定页面提供额外的翻译命名空间
 */
export function pageI18nMiddleware(namespaces: string[] = []) {
  return async function middleware(ctx: I18nFreshContext) {
    const i18nContext = ctx.state.i18n;

    if (!i18nContext) {
      console.warn(
        "i18n context not found, make sure i18nMiddleware is applied first",
      );
      return ctx.next();
    }

    try {
      // 预加载页面特定的命名空间
      if (namespaces.length > 0) {
        await preloadNamespaces(
          i18nContext.language,
          namespaces as TranslationNamespace[],
        );

        // 更新翻译函数以包含新的命名空间
        const updatedT = await createServerTranslationFunction(
          i18nContext.language,
        );
        if (ctx.state.i18n) {
          ctx.state.i18n.t = updatedT;
        }
      }

      return ctx.next();
    } catch (error) {
      console.error("Page i18n middleware error:", error);
      return ctx.next();
    }
  };
}

/**
 * API 路由 i18n 中间件
 * 为 API 响应提供国际化支持
 */
export function apiI18nMiddleware() {
  return async function middleware(ctx: I18nFreshContext) {
    const i18nContext = ctx.state.i18n;

    if (!i18nContext) {
      console.warn("i18n context not found for API route");
      return ctx.next();
    }

    try {
      const response = await ctx.next();

      // 如果响应是 JSON，添加语言信息
      if (
        response &&
        response.headers.get("content-type")?.includes("application/json")
      ) {
        const body = await response.text();

        try {
          const data = JSON.parse(body);
          const enhancedData = {
            ...data,
            _i18n: {
              language: i18nContext.language,
              timestamp: new Date().toISOString(),
            },
          };

          return new Response(JSON.stringify(enhancedData), {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
          });
        } catch {
          // 如果解析失败，返回原始响应
          return response;
        }
      }

      return response;
    } catch (error) {
      console.error("API i18n middleware error:", error);
      return ctx.next();
    }
  };
}

/**
 * 静态资源 i18n 中间件
 * 为静态资源添加语言相关的缓存策略
 */
export function staticI18nMiddleware() {
  return async function middleware(ctx: I18nFreshContext) {
    const url = new URL(ctx.req.url);

    // 检查是否是翻译资源文件
    if (url.pathname.startsWith("/i18n/locales/")) {
      const response = await ctx.next();

      if (response) {
        // 为翻译资源设置缓存头
        response.headers.set("Cache-Control", "public, max-age=3600");
        response.headers.set("Vary", "Accept-Language");
      }

      return response;
    }

    return ctx.next();
  };
}

/**
 * 获取请求的 i18n 上下文
 */
export function getI18nContext(
  ctx: I18nFreshContext,
): I18nMiddlewareContext | null {
  return ctx.state.i18n || null;
}

/**
 * 设置响应的语言头
 */
export function setLanguageHeaders(
  response: Response,
  language: SupportedLanguage,
): Response {
  response.headers.set("Content-Language", language);
  response.headers.set("Vary", "Accept-Language");
  return response;
}

/**
 * 重定向到本地化 URL
 */
export function redirectToLocalizedUrl(
  url: string,
  language: SupportedLanguage,
  status = 302,
): Response {
  const localizedUrl = new URL(url);
  localizedUrl.searchParams.set("lang", language);

  return new Response(null, {
    status,
    headers: {
      "Location": localizedUrl.toString(),
    },
  });
}

/**
 * 清除服务端翻译缓存
 */
export function clearServerTranslationCache(): void {
  serverTranslationCache.clear();
}

/**
 * 获取服务端翻译缓存统计
 */
export function getServerCacheStats() {
  return {
    size: serverTranslationCache.size,
    keys: Array.from(serverTranslationCache.keys()),
  };
}
