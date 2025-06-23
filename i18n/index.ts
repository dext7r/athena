/**
 * 国际化模块主入口
 * 导出所有 i18n 相关的功能
 */

// 类型定义
export type {
  SupportedLanguage,
  TranslationNamespace,
  TranslationResource,
  TranslationFunction,
  TranslationParams,
  LanguageConfig,
  I18nConfig,
  LanguageDetectionResult,
  TranslationLoadState,
  I18nContext,
  DateFormatOptions,
  NumberFormatOptions,
} from "./types.ts";

// 配置
export {
  DEFAULT_LANGUAGE,
  FALLBACK_LANGUAGE,
  SUPPORTED_LANGUAGES,
  LANGUAGE_CONFIGS,
  I18N_CONFIG,
  isSupportedLanguage,
  getLanguageConfig,
  getAllLanguageConfigs,
  getBrowserLanguage,
  getLanguageDisplayName,
} from "./config.ts";

// 语言检测
export {
  LanguageDetectorImpl,
  ServerLanguageDetector,
  languageDetector,
  detectLanguage,
  setLanguage,
  getStoredLanguage,
  clearStoredLanguage,
} from "./detector.ts";

// 资源加载
export {
  TranslationLoaderImpl,
  translationLoader,
  loadNamespace,
  preloadNamespaces,
  clearTranslationCache,
} from "./loader.ts";

// 状态管理
export {
  useI18nStore,
  useCurrentLanguage,
  useTranslation,
  useLanguageList,
} from "@stores/useI18nStore.ts";

// 便捷函数
export function initializeI18n() {
  const store = useI18nStore.getState();
  return store.initialize();
}

export function getCurrentLanguage(): SupportedLanguage {
  return useI18nStore.getState().currentLanguage;
}

export function changeLanguage(language: SupportedLanguage): Promise<void> {
  return useI18nStore.getState().changeLanguage(language);
}

export function translate(
  key: string,
  params?: TranslationParams,
  namespace?: TranslationNamespace
): string {
  return useI18nStore.getState().t(key, params, namespace);
}

// 简化的翻译函数别名
export const t = translate;
