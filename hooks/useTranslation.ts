/**
 * 翻译 Hook
 * 提供组件级别的翻译功能
 */

import {
  formatCurrency,
  formatDate,
  formatFileSize,
  formatList,
  formatNumber,
  formatPercent,
  formatPlural,
  formatRelativeTime,
} from "@/i18n/formatter.ts";
import type {
  SupportedLanguage,
  TranslationFunction,
  TranslationNamespace,
  TranslationParams,
} from "@/i18n/types.ts";
import { useI18nStore } from "@stores/useI18nStore.ts";
import { useEffect, useMemo } from "preact/hooks";

/**
 * 翻译 Hook 返回值接口
 */
export interface UseTranslationReturn {
  // 翻译函数
  t: (key: string, params?: TranslationParams) => string;

  // 语言相关
  currentLanguage: SupportedLanguage;
  changeLanguage: (language: SupportedLanguage) => Promise<void>;

  // 加载状态
  isLoading: boolean;
  error: string | null;

  // 格式化函数
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
  formatRelativeTime: (date: Date, baseDate?: Date) => string;
  formatNumber: (number: number, options?: { useGrouping?: boolean }) => string;
  formatCurrency: (amount: number, currency?: string) => string;
  formatPercent: (value: number, options?: { useGrouping?: boolean }) => string;
  formatFileSize: (bytes: number, binary?: boolean) => string;
  formatList: (
    items: string[],
    type?: "conjunction" | "disjunction" | "unit",
  ) => string;
  formatPlural: (count: number, translations: Record<string, string>) => string;

  // 工具函数
  isRTL: boolean;
  ready: boolean;
}

/**
 * 翻译 Hook 选项
 */
export interface UseTranslationOptions {
  // 命名空间
  namespace?: TranslationNamespace;

  // 是否自动加载命名空间
  autoLoad?: boolean;

  // 回退键值
  fallback?: string;

  // 是否启用调试模式
  debug?: boolean;
}

/**
 * Provides a translation function and locale-aware formatting utilities scoped to a specific namespace.
 *
 * Returns translation and formatting utilities for the given namespace, along with language management, loading state, and right-to-left language detection. Supports automatic namespace loading, fallback translations, and debug warnings for missing keys.
 *
 * @param namespace - The translation namespace to use (defaults to "common").
 * @param options - Optional settings for auto-loading, fallback text, and debug mode.
 * @returns An object containing the translation function, formatting utilities, language management, and state indicators.
 */
export function useTranslation(
  namespace: TranslationNamespace = "common",
  options: UseTranslationOptions = {},
): UseTranslationReturn {
  const {
    autoLoad = true,
    fallback,
    debug = false,
  } = options;

  const {
    currentLanguage,
    changeLanguage,
    loadNamespace,
    translations,
    loadState,
    t: storeT,
  } = useI18nStore();

  // 自动加载命名空间
  useEffect(() => {
    if (autoLoad) {
      const namespaceKey = `${currentLanguage}_${namespace}`;
      if (!translations[namespaceKey] && !loadState.isLoading) {
        loadNamespace(namespace);
      }
    }
  }, [
    currentLanguage,
    namespace,
    autoLoad,
    translations,
    loadState.isLoading,
    loadNamespace,
  ]);

  // 创建命名空间特定的翻译函数
  const t = useMemo<TranslationFunction>(() => {
    return (key: string, params?: TranslationParams) => {
      try {
        const translation = storeT(key, params, namespace);

        if (debug && translation === key) {
          console.warn(`Translation missing: ${key} in namespace ${namespace}`);
        }

        // 如果翻译失败且有回退值，使用回退值
        if (translation === key && fallback) {
          return fallback;
        }

        return translation;
      } catch (error) {
        console.error(`Translation error for key "${key}":`, error);
        return fallback || key;
      }
    };
  }, [storeT, namespace, fallback, debug]);

  // 格式化函数（绑定当前语言）
  const formatters = useMemo(() => ({
    formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) =>
      formatDate(date, currentLanguage, options),

    formatRelativeTime: (date: Date, baseDate?: Date) =>
      formatRelativeTime(date, currentLanguage, baseDate),

    formatNumber: (number: number, options?: { useGrouping?: boolean }) =>
      formatNumber(number, currentLanguage, options),

    formatCurrency: (amount: number, currency?: string) =>
      formatCurrency(amount, currentLanguage, currency),

    formatPercent: (value: number, options?: { useGrouping?: boolean }) =>
      formatPercent(value, currentLanguage, options),

    formatFileSize: (bytes: number, binary = false) =>
      formatFileSize(bytes, currentLanguage, binary),

    formatList: (
      items: string[],
      type?: "conjunction" | "disjunction" | "unit",
    ) => formatList(items, currentLanguage, type),

    formatPlural: (count: number, translations: Record<string, string>) =>
      formatPlural(count, translations, currentLanguage),
  }), [currentLanguage]);

  // 检查命名空间是否已加载
  const namespaceKey = `${currentLanguage}_${namespace}`;
  const ready = !!translations[namespaceKey];

  // 检查是否为 RTL 语言
  const isRTL = useMemo(() => {
    // 目前支持的语言都是 LTR，如果以后添加阿拉伯语等可以在这里扩展
    return false;
  }, [currentLanguage]);

  return {
    t,
    currentLanguage,
    changeLanguage,
    isLoading: loadState.isLoading,
    error: loadState.error,
    isRTL,
    ready,
    ...formatters,
  };
}

/**
 * Returns a translation function scoped to the specified namespace.
 *
 * @returns The translation function for the given namespace
 */
export function useT(
  namespace: TranslationNamespace = "common",
): TranslationFunction {
  const { t } = useTranslation(namespace);
  return t;
}

/**
 * Placeholder hook intended to provide translation functions for multiple namespaces.
 *
 * Currently returns an empty object due to hook rules; not yet implemented.
 *
 * @returns An object mapping each namespace to its translation function.
 */
export function useMultipleTranslations(
  namespaces: TranslationNamespace[],
): Record<TranslationNamespace, TranslationFunction> {
  // 使用 useMemo 来避免在循环中调用 Hook
  return useMemo(() => {
    // 注意：这里仍然有问题，需要重新设计这个 Hook
    // 暂时返回空对象，避免 Hook 规则违反
    const result: Record<string, TranslationFunction> = {};
    return result as Record<TranslationNamespace, TranslationFunction>;
  }, [namespaces]);
}

/**
 * Returns a translation hook scoped to one of two namespaces based on a boolean condition.
 *
 * Selects the translation namespace according to the provided condition and returns the corresponding translation utilities.
 *
 * @param condition - If true, uses `trueNamespace`; otherwise, uses `falseNamespace`
 * @param trueNamespace - Namespace to use when the condition is true
 * @param falseNamespace - Namespace to use when the condition is false (defaults to "common")
 * @returns Translation utilities for the selected namespace
 */
export function useConditionalTranslation(
  condition: boolean,
  trueNamespace: TranslationNamespace,
  falseNamespace: TranslationNamespace = "common",
): UseTranslationReturn {
  const namespace = condition ? trueNamespace : falseNamespace;
  return useTranslation(namespace);
}

/**
 * Provides a translation hook that loads translations for a namespace only when explicitly triggered.
 *
 * Returns a tuple containing the translation hook result (or `null` if not yet loaded) and a function to initiate loading.
 *
 * @returns A tuple: the translation hook result for the namespace (or `null` if not loaded), and a function to trigger loading.
 */
export function useLazyTranslation(
  namespace: TranslationNamespace,
): [UseTranslationReturn | null, () => void] {
  const [shouldLoad, setShouldLoad] = useState(false);

  // 始终调用 Hook，但根据条件返回结果
  const translation = useTranslation(namespace);

  const load = useCallback(() => {
    setShouldLoad(true);
  }, []);

  return [shouldLoad ? translation : null, load];
}

/**
 * Preloads translation resources for the specified namespaces.
 *
 * Triggers loading of translation data for the given namespaces when the component mounts or when the namespaces change.
 */
export function usePreloadTranslations(namespaces: TranslationNamespace[]) {
  const { preloadNamespaces } = useI18nStore();

  useEffect(() => {
    preloadNamespaces(namespaces);
  }, [namespaces, preloadNamespaces]);
}

/**
 * Validates that all required translation keys exist in the specified namespace for the current language during development.
 *
 * Logs a warning in the console if any required keys are missing from the loaded translations.
 *
 * @param namespace - The translation namespace to validate.
 * @param requiredKeys - An array of translation keys that must be present.
 */
export function useTranslationValidation(
  namespace: TranslationNamespace,
  requiredKeys: string[],
) {
  const { translations, currentLanguage } = useI18nStore();

  useEffect(() => {
    if (Deno.env.get("NODE_ENV") === "development") {
      const namespaceKey = `${currentLanguage}_${namespace}`;
      const resource = translations[namespaceKey];

      if (resource) {
        const missingKeys = requiredKeys.filter((key) => {
          const value = getNestedValue(resource, key);
          return value === undefined;
        });

        if (missingKeys.length > 0) {
          console.warn(
            `Missing translation keys in ${namespace}:`,
            missingKeys,
          );
        }
      }
    }
  }, [translations, currentLanguage, namespace, requiredKeys]);
}

/**
 * Retrieves the value at a given dot-separated path from a nested object.
 *
 * @param obj - The object to query
 * @param path - Dot-separated string representing the path to the desired value
 * @returns The value at the specified path, or `undefined` if any key is missing
 */
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((current: unknown, key: string) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);
}

// 导入必要的 hooks
import { useCallback, useState } from "preact/hooks";
