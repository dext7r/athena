/**
 * 国际化模块主入口
 * 导出所有 i18n 相关的功能
 */

// 类型定义
export type {
  DateFormatOptions,
  I18nConfig,
  I18nContext,
  LanguageConfig,
  LanguageDetectionResult,
  NumberFormatOptions,
  SupportedLanguage,
  TranslationFunction,
  TranslationLoadState,
  TranslationNamespace,
  TranslationParams,
  TranslationResource,
} from "./types.ts";

// 配置
export {
  DEFAULT_LANGUAGE,
  FALLBACK_LANGUAGE,
  getAllLanguageConfigs,
  getBrowserLanguage,
  getLanguageConfig,
  getLanguageDisplayName,
  I18N_CONFIG,
  isSupportedLanguage,
  LANGUAGE_CONFIGS,
  SUPPORTED_LANGUAGES,
} from "./config.ts";

// 语言检测
export {
  clearStoredLanguage,
  detectLanguage,
  getStoredLanguage,
  languageDetector,
  LanguageDetectorImpl,
  ServerLanguageDetector,
  setLanguage,
} from "./detector.ts";

// 资源加载
export {
  clearTranslationCache,
  loadNamespace,
  preloadNamespaces,
  translationLoader,
  TranslationLoaderImpl,
} from "./loader.ts";

// 状态管理
export {
  useCurrentLanguage,
  useI18nStore,
  useLanguageList,
  useTranslation,
} from "@stores/useI18nStore.ts";

// 导入用于便捷函数
import { useI18nStore } from "@stores/useI18nStore.ts";
import type {
  SupportedLanguage,
  TranslationNamespace,
  TranslationParams,
} from "./types.ts";

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
  namespace?: TranslationNamespace,
): string {
  return useI18nStore.getState().t(key, params, namespace);
}

// 简化的翻译函数别名
export const t = translate;
