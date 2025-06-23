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
 * 主要的翻译 Hook
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
 * 简化的翻译 Hook（仅返回翻译函数）
 */
export function useT(
  namespace: TranslationNamespace = "common",
): TranslationFunction {
  const { t } = useTranslation(namespace);
  return t;
}

/**
 * 多命名空间翻译 Hook
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
 * 条件翻译 Hook（根据条件选择不同的翻译）
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
 * 懒加载翻译 Hook（仅在需要时加载）
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
 * 翻译预加载 Hook
 */
export function usePreloadTranslations(namespaces: TranslationNamespace[]) {
  const { preloadNamespaces } = useI18nStore();

  useEffect(() => {
    preloadNamespaces(namespaces);
  }, [namespaces, preloadNamespaces]);
}

/**
 * 翻译键值验证 Hook（开发模式）
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

// 导入必要的 hooks
import { useCallback, useState } from "preact/hooks";
