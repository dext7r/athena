/**
 * 语言检测器
 * 智能检测用户的语言偏好
 */

import type {
  LanguageDetectionResult,
  LanguageDetector,
  SupportedLanguage,
} from "./types.ts";
import {
  DEFAULT_LANGUAGE,
  getBrowserLanguage,
  I18N_CONFIG,
  isSupportedLanguage,
} from "./config.ts";

/**
 * 语言检测器实现
 */
export class LanguageDetectorImpl implements LanguageDetector {
  private readonly config = I18N_CONFIG.detection;

  /**
   * 检测用户的语言偏好
   */
  detect(): LanguageDetectionResult {
    // 按配置的顺序检测语言
    for (const method of this.config.order) {
      const result = this.detectByMethod(method);
      if (result) {
        return result;
      }
    }

    // 如果所有方法都失败，返回默认语言
    return {
      language: DEFAULT_LANGUAGE,
      source: "default",
    };
  }

  /**
   * 设置语言偏好
   */
  setLanguage(language: SupportedLanguage): void {
    // 保存到配置的缓存中
    for (const cache of this.config.caches) {
      this.saveToCache(cache, language);
    }
  }

  /**
   * 获取存储的语言偏好
   */
  getStoredLanguage(): SupportedLanguage | null {
    // 从本地存储获取
    if (this.config.caches.includes("localStorage")) {
      const stored = this.getFromLocalStorage();
      if (stored) return stored;
    }

    // 从会话存储获取
    if (this.config.caches.includes("sessionStorage")) {
      const stored = this.getFromSessionStorage();
      if (stored) return stored;
    }

    return null;
  }

  /**
   * 清除存储的语言偏好
   */
  clearStoredLanguage(): void {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(this.config.lookupLocalStorage);
    }
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.removeItem(this.config.lookupLocalStorage);
    }
  }

  /**
   * 根据指定方法检测语言
   */
  private detectByMethod(method: string): LanguageDetectionResult | null {
    switch (method) {
      case "localStorage":
        return this.detectFromLocalStorage();
      case "sessionStorage":
        return this.detectFromSessionStorage();
      case "querystring":
        return this.detectFromQueryString();
      case "navigator":
        return this.detectFromNavigator();
      case "header":
        return this.detectFromHeader();
      default:
        return null;
    }
  }

  /**
   * 从本地存储检测语言
   */
  private detectFromLocalStorage(): LanguageDetectionResult | null {
    const language = this.getFromLocalStorage();
    return language ? { language, source: "localStorage" } : null;
  }

  /**
   * 从会话存储检测语言
   */
  private detectFromSessionStorage(): LanguageDetectionResult | null {
    const language = this.getFromSessionStorage();
    return language ? { language, source: "localStorage" } : null;
  }

  /**
   * 从查询参数检测语言
   */
  private detectFromQueryString(): LanguageDetectionResult | null {
    if (typeof window === "undefined") return null;

    const urlParams = new URLSearchParams(globalThis.location.search);
    const langParam = urlParams.get(this.config.lookupQuerystring);

    if (langParam && isSupportedLanguage(langParam)) {
      return { language: langParam, source: "querystring" };
    }

    return null;
  }

  /**
   * 从浏览器语言检测
   */
  private detectFromNavigator(): LanguageDetectionResult | null {
    const browserLang = getBrowserLanguage();
    return { language: browserLang, source: "navigator" };
  }

  /**
   * 从 HTTP 头部检测语言（服务端）
   */
  private detectFromHeader(): LanguageDetectionResult | null {
    // 这个方法主要用于服务端渲染
    // 在客户端环境中无法直接访问 HTTP 头部
    return null;
  }

  /**
   * 从本地存储获取语言
   */
  private getFromLocalStorage(): SupportedLanguage | null {
    if (typeof localStorage === "undefined") return null;

    try {
      const stored = localStorage.getItem(this.config.lookupLocalStorage);
      return stored && isSupportedLanguage(stored) ? stored : null;
    } catch {
      return null;
    }
  }

  /**
   * 从会话存储获取语言
   */
  private getFromSessionStorage(): SupportedLanguage | null {
    if (typeof sessionStorage === "undefined") return null;

    try {
      const stored = sessionStorage.getItem(this.config.lookupLocalStorage);
      return stored && isSupportedLanguage(stored) ? stored : null;
    } catch {
      return null;
    }
  }

  /**
   * 保存到缓存
   */
  private saveToCache(cache: string, language: SupportedLanguage): void {
    try {
      switch (cache) {
        case "localStorage":
          if (typeof localStorage !== "undefined") {
            localStorage.setItem(this.config.lookupLocalStorage, language);
          }
          break;
        case "sessionStorage":
          if (typeof sessionStorage !== "undefined") {
            sessionStorage.setItem(this.config.lookupLocalStorage, language);
          }
          break;
      }
    } catch (error) {
      console.warn(`Failed to save language to ${cache}:`, error);
    }
  }
}

/**
 * 服务端语言检测器
 * 用于在服务端渲染时检测语言
 */
export class ServerLanguageDetector {
  /**
   * 从请求中检测语言
   */
  static detectFromRequest(request: Request): LanguageDetectionResult {
    // 1. 检查查询参数
    const url = new URL(request.url);
    const langParam = url.searchParams.get(
      I18N_CONFIG.detection.lookupQuerystring,
    );
    if (langParam && isSupportedLanguage(langParam)) {
      return { language: langParam, source: "querystring" };
    }

    // 2. 检查 Accept-Language 头部
    const acceptLanguage = request.headers.get("Accept-Language");
    if (acceptLanguage) {
      const preferredLang = this.parseAcceptLanguage(acceptLanguage);
      if (preferredLang) {
        return { language: preferredLang, source: "header" };
      }
    }

    // 3. 返回默认语言
    return { language: DEFAULT_LANGUAGE, source: "default" };
  }

  /**
   * 解析 Accept-Language 头部
   */
  private static parseAcceptLanguage(
    acceptLanguage: string,
  ): SupportedLanguage | null {
    const languages = acceptLanguage
      .split(",")
      .map((lang) => {
        const [code, q = "1"] = lang.trim().split(";q=");
        return {
          code: code.split("-")[0].toLowerCase(),
          quality: parseFloat(q),
        };
      })
      .sort((a, b) => b.quality - a.quality);

    for (const { code } of languages) {
      if (isSupportedLanguage(code)) {
        return code;
      }
    }

    return null;
  }
}

// 创建默认的语言检测器实例
export const languageDetector = new LanguageDetectorImpl();

/**
 * Detects the user's language preference using the configured detection strategies.
 *
 * @returns The result of the language detection process, including the detected language and detection source.
 */
export function detectLanguage(): LanguageDetectionResult {
  return languageDetector.detect();
}

/**
 * Stores the specified language preference in all configured client-side caches.
 *
 * @param language - The language code to set as the user's preference
 */
export function setLanguage(language: SupportedLanguage): void {
  languageDetector.setLanguage(language);
}

/**
 * Retrieves the user's stored language preference from available caches.
 *
 * @returns The stored supported language, or `null` if none is found.
 */
export function getStoredLanguage(): SupportedLanguage | null {
  return languageDetector.getStoredLanguage();
}

/**
 * Removes any stored language preference from all configured client-side caches.
 */
export function clearStoredLanguage(): void {
  languageDetector.clearStoredLanguage();
}
