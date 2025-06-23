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
 * Creates a server-side translation function for the specified language.
 *
 * Preloads configured translation namespaces, loads and caches translation resources, and returns a function that retrieves and interpolates translation strings for the given language. If loading fails, returns a fallback function that returns keys as-is.
 *
 * @param language - The language for which to create the translation function
 * @returns A translation function that retrieves and interpolates translation strings for the specified language
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
 * Retrieves a nested value from an object using a dot-separated path.
 *
 * @param obj - The object to query
 * @param path - Dot-separated string representing the path to the desired value
 * @returns The value at the specified path, or undefined if not found
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
 * Replaces placeholders in a template string with corresponding values from the provided parameters.
 *
 * Placeholders in the template should be in the form `{{key}}`. If a key is not found in the parameters, the placeholder remains unchanged.
 *
 * @param template - The template string containing placeholders
 * @param params - An object mapping placeholder keys to their replacement values
 * @returns The interpolated string with placeholders replaced by parameter values
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
 * Middleware that detects the user's language for each request and provides translation and formatting utilities in the request context.
 *
 * Adds an `i18n` object to `ctx.state` containing the detected language, translation function, and localized date and number formatting functions. Sets the `Content-Language` header on the response. Falls back to default language and identity functions if detection or setup fails.
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
 * Middleware to preload additional translation namespaces for a specific page.
 *
 * Ensures that page-specific translation resources are loaded and updates the translation function in the i18n context to include these namespaces. Logs a warning if the i18n context is missing and continues processing.
 *
 * @param namespaces - Additional translation namespaces to preload for the page
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
 * Middleware that enhances API JSON responses with i18n metadata.
 *
 * If the response is JSON, adds an `_i18n` field containing the detected language and a timestamp. If the i18n context is missing or the response is not JSON, the response is returned unchanged.
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
 * Middleware that applies caching headers to static translation resource files.
 *
 * Adds appropriate cache control and language negotiation headers to responses for requests under `/i18n/locales/`.
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
 * Retrieves the i18n context from the request state.
 *
 * @returns The i18n middleware context if present, or `null` if not available.
 */
export function getI18nContext(
  ctx: I18nFreshContext,
): I18nMiddlewareContext | null {
  return ctx.state.i18n || null;
}

/**
 * Sets the `Content-Language` and `Vary: Accept-Language` headers on the response for proper language negotiation.
 *
 * @param response - The HTTP response to modify
 * @param language - The language code to set in the `Content-Language` header
 * @returns The response with updated language headers
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
 * Returns a redirect response to the specified URL with the language query parameter set.
 *
 * @param url - The original URL to redirect to
 * @param language - The language code to set in the `lang` query parameter
 * @param status - The HTTP status code for the redirect (default is 302)
 * @returns A Response object with the `Location` header set to the localized URL
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
 * Clears all entries from the server-side translation cache.
 */
export function clearServerTranslationCache(): void {
  serverTranslationCache.clear();
}

/**
 * Returns statistics about the server-side translation cache.
 *
 * @returns An object containing the cache size and an array of cache keys.
 */
export function getServerCacheStats() {
  return {
    size: serverTranslationCache.size,
    keys: Array.from(serverTranslationCache.keys()),
  };
}
