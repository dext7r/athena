/**
 * 国际化类型定义
 * 提供完整的 TypeScript 类型安全支持
 */

// 支持的语言类型
export type SupportedLanguage = "zh" | "en";

// 翻译命名空间类型
export type TranslationNamespace = 
  | "common" 
  | "auth" 
  | "components" 
  | "pages" 
  | "errors";

// 翻译键值类型（支持嵌套）
export type TranslationKey = string;

// 翻译参数类型
export interface TranslationParams {
  [key: string]: string | number | boolean | Date;
}

// 翻译资源结构类型
export interface TranslationResource {
  [key: string]: string | TranslationResource;
}

// 翻译资源集合类型
export interface TranslationResources {
  [namespace: string]: TranslationResource;
}

// 语言配置接口
export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

// i18n 配置接口
export interface I18nConfig {
  defaultLanguage: SupportedLanguage;
  supportedLanguages: SupportedLanguage[];
  fallbackLanguage: SupportedLanguage;
  namespaces: TranslationNamespace[];
  interpolation: {
    prefix: string;
    suffix: string;
  };
  detection: {
    order: ("localStorage" | "navigator" | "querystring" | "header")[];
    caches: ("localStorage" | "sessionStorage")[];
    lookupQuerystring: string;
    lookupLocalStorage: string;
  };
}

// 语言检测结果接口
export interface LanguageDetectionResult {
  language: SupportedLanguage;
  source: "localStorage" | "navigator" | "querystring" | "header" | "default";
}

// 翻译函数类型
export type TranslationFunction = (
  key: TranslationKey,
  params?: TranslationParams,
  namespace?: TranslationNamespace
) => string;

// 格式化选项接口
export interface FormatOptions {
  locale?: string;
  timeZone?: string;
  currency?: string;
}

// 日期格式化选项
export interface DateFormatOptions extends FormatOptions {
  dateStyle?: "full" | "long" | "medium" | "short";
  timeStyle?: "full" | "long" | "medium" | "short";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
}

// 数字格式化选项
export interface NumberFormatOptions extends FormatOptions {
  style?: "decimal" | "currency" | "percent" | "unit";
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
}

// 翻译加载状态
export interface TranslationLoadState {
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
  loadedNamespaces: TranslationNamespace[];
}

// i18n 上下文接口
export interface I18nContext {
  currentLanguage: SupportedLanguage;
  availableLanguages: LanguageConfig[];
  t: TranslationFunction;
  changeLanguage: (language: SupportedLanguage) => Promise<void>;
  formatDate: (date: Date, options?: DateFormatOptions) => string;
  formatNumber: (number: number, options?: NumberFormatOptions) => string;
  formatCurrency: (amount: number, currency?: string) => string;
  formatRelativeTime: (date: Date) => string;
  isRTL: boolean;
  loadState: TranslationLoadState;
}

// 翻译资源加载器接口
export interface TranslationLoader {
  loadNamespace: (
    language: SupportedLanguage,
    namespace: TranslationNamespace
  ) => Promise<TranslationResource>;
  preloadNamespaces: (
    language: SupportedLanguage,
    namespaces: TranslationNamespace[]
  ) => Promise<void>;
  clearCache: () => void;
}

// 语言检测器接口
export interface LanguageDetector {
  detect: () => LanguageDetectionResult;
  setLanguage: (language: SupportedLanguage) => void;
  getStoredLanguage: () => SupportedLanguage | null;
}

// 中间件上下文扩展
export interface I18nMiddlewareContext {
  language: SupportedLanguage;
  t: TranslationFunction;
  formatDate: (date: Date, options?: DateFormatOptions) => string;
  formatNumber: (number: number, options?: NumberFormatOptions) => string;
}

// 错误类型
export class I18nError extends Error {
  constructor(
    message: string,
    public code: string,
    public context?: any
  ) {
    super(message);
    this.name = "I18nError";
  }
}

// 翻译键值验证结果
export interface TranslationValidationResult {
  isValid: boolean;
  missingKeys: string[];
  extraKeys: string[];
  suggestions: string[];
}

// 开发工具接口
export interface I18nDevTools {
  validateTranslations: () => TranslationValidationResult;
  extractKeys: (sourceCode: string) => string[];
  generateMissingTranslations: (targetLanguage: SupportedLanguage) => void;
  exportTranslations: (format: "json" | "csv" | "xlsx") => void;
}
