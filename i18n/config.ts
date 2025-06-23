/**
 * 国际化配置文件
 * 定义支持的语言、命名空间和检测策略
 */

import type {
  I18nConfig,
  LanguageConfig,
  SupportedLanguage,
  TranslationNamespace,
} from "./types.ts";

// 支持的语言配置
export const LANGUAGE_CONFIGS: Record<SupportedLanguage, LanguageConfig> = {
  zh: {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
    rtl: false,
  },
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    rtl: false,
  },
};

// 默认语言
export const DEFAULT_LANGUAGE: SupportedLanguage = "zh";

// 回退语言
export const FALLBACK_LANGUAGE: SupportedLanguage = "en";

// 支持的语言列表
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ["zh", "en"];

// 翻译命名空间列表
export const TRANSLATION_NAMESPACES: TranslationNamespace[] = [
  "common",
  "auth",
  "components",
  "pages",
  "errors",
];

// 主要 i18n 配置
export const I18N_CONFIG: I18nConfig = {
  defaultLanguage: DEFAULT_LANGUAGE,
  supportedLanguages: SUPPORTED_LANGUAGES,
  fallbackLanguage: FALLBACK_LANGUAGE,
  namespaces: TRANSLATION_NAMESPACES,

  // 插值配置
  interpolation: {
    prefix: "{{",
    suffix: "}}",
  },

  // 语言检测配置
  detection: {
    // 检测顺序：本地存储 -> 查询参数 -> 浏览器语言 -> HTTP头部
    order: ["localStorage", "querystring", "navigator", "header"],

    // 缓存策略
    caches: ["localStorage"],

    // 查询参数名称
    lookupQuerystring: "lang",

    // 本地存储键名
    lookupLocalStorage: "athena_language",
  },
};

// 翻译资源路径配置
export const TRANSLATION_PATHS = {
  // 翻译文件基础路径
  basePath: "/i18n/locales",

  // 文件扩展名
  extension: ".json",

  // 获取翻译文件路径
  getPath: (language: SupportedLanguage, namespace: TranslationNamespace) =>
    `${TRANSLATION_PATHS.basePath}/${language}/${namespace}${TRANSLATION_PATHS.extension}`,
};

// 缓存配置
export const CACHE_CONFIG = {
  // 缓存键前缀
  prefix: "athena_i18n_",

  // 缓存过期时间（毫秒）
  ttl: 24 * 60 * 60 * 1000, // 24小时

  // 最大缓存条目数
  maxEntries: 100,

  // 是否启用缓存
  enabled: true,
};

// 开发模式配置
export const DEV_CONFIG = {
  // 是否显示缺失的翻译键
  showMissingKeys: true,

  // 是否在控制台输出调试信息
  debug: false,

  // 是否启用翻译键验证
  validateKeys: true,

  // 缺失翻译的占位符
  missingKeyPlaceholder: (key: string) => `[Missing: ${key}]`,
};

// 格式化配置
export const FORMAT_CONFIG = {
  // 日期格式化默认选项
  dateFormat: {
    zh: {
      dateStyle: "long" as const,
      timeStyle: "short" as const,
    },
    en: {
      dateStyle: "long" as const,
      timeStyle: "short" as const,
    },
  },

  // 数字格式化默认选项
  numberFormat: {
    zh: {
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
    en: {
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  },

  // 货币格式化默认选项
  currencyFormat: {
    zh: {
      currency: "CNY",
      style: "currency" as const,
    },
    en: {
      currency: "USD",
      style: "currency" as const,
    },
  },
};

// 性能配置
export const PERFORMANCE_CONFIG = {
  // 是否启用懒加载
  lazyLoading: true,

  // 预加载的命名空间
  preloadNamespaces: ["common"] as TranslationNamespace[],

  // 资源加载超时时间（毫秒）
  loadTimeout: 5000,

  // 并发加载限制
  maxConcurrentLoads: 3,
};

// 错误处理配置
export const ERROR_CONFIG = {
  // 是否在翻译失败时抛出错误
  throwOnMissingKey: false,

  // 是否在加载失败时使用回退语言
  useFallbackOnLoadError: true,

  // 错误重试次数
  maxRetries: 3,

  // 重试延迟（毫秒）
  retryDelay: 1000,
};

// 导出所有配置的便捷对象
export const CONFIG = {
  i18n: I18N_CONFIG,
  languages: LANGUAGE_CONFIGS,
  paths: TRANSLATION_PATHS,
  cache: CACHE_CONFIG,
  dev: DEV_CONFIG,
  format: FORMAT_CONFIG,
  performance: PERFORMANCE_CONFIG,
  error: ERROR_CONFIG,
} as const;

/**
 * Determines whether the given language code is supported by the application.
 *
 * @param lang - The language code to check
 * @returns True if the language code is supported; otherwise, false
 */
export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

/**
 * Retrieves the configuration object for a given supported language.
 *
 * @param lang - The language code for which to obtain the configuration
 * @returns The configuration details for the specified language
 */
export function getLanguageConfig(lang: SupportedLanguage): LanguageConfig {
  return LANGUAGE_CONFIGS[lang];
}

/**
 * Returns an array of all supported language configurations.
 *
 * @returns An array containing the configuration objects for each supported language.
 */
export function getAllLanguageConfigs(): LanguageConfig[] {
  return SUPPORTED_LANGUAGES.map((lang) => LANGUAGE_CONFIGS[lang]);
}

/**
 * Determines whether a given string is a valid translation namespace.
 *
 * @param namespace - The namespace string to validate
 * @returns True if the namespace is supported; otherwise, false
 */
export function isValidNamespace(
  namespace: string,
): namespace is TranslationNamespace {
  return TRANSLATION_NAMESPACES.includes(namespace as TranslationNamespace);
}

/**
 * Returns the browser's preferred language if it is supported; otherwise returns the default language.
 *
 * If the `navigator` object is unavailable (such as in server-side environments), the default language is returned.
 */
export function getBrowserLanguage(): SupportedLanguage {
  if (typeof navigator === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const browserLang = navigator.language.split("-")[0];
  return isSupportedLanguage(browserLang) ? browserLang : DEFAULT_LANGUAGE;
}

/**
 * Returns the display name of a language, either in its native form or in English.
 *
 * @param lang - The language code to display
 * @param displayLang - The language code in which to display the name; if omitted or equal to `lang`, returns the native name
 * @returns The display name of the language in the specified display language
 */
export function getLanguageDisplayName(
  lang: SupportedLanguage,
  displayLang: SupportedLanguage = lang,
): string {
  const config = getLanguageConfig(lang);
  return displayLang === lang ? config.nativeName : config.name;
}
