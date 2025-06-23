/**
 * 国际化状态管理 Store
 * 使用 Zustand 管理语言状态和翻译资源
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  LanguageConfig,
  SupportedLanguage,
  TranslationFunction,
  TranslationLoadState,
  TranslationNamespace,
  TranslationParams,
  TranslationResource,
} from "@/i18n/types.ts";
import {
  DEFAULT_LANGUAGE,
  getAllLanguageConfigs,
  I18N_CONFIG,
  SUPPORTED_LANGUAGES,
} from "@/i18n/config.ts";
import {
  detectLanguage,
  setLanguage as setStoredLanguage,
} from "@/i18n/detector.ts";
import {
  clearTranslationCache,
  loadNamespace,
  preloadNamespaces,
} from "@/i18n/loader.ts";

// i18n 状态接口
export interface I18nState {
  // 状态
  currentLanguage: SupportedLanguage;
  availableLanguages: LanguageConfig[];
  translations: Record<string, TranslationResource>;
  loadState: TranslationLoadState;
  isInitialized: boolean;

  // 操作方法
  changeLanguage: (language: SupportedLanguage) => Promise<void>;
  loadNamespace: (namespace: TranslationNamespace) => Promise<void>;
  preloadNamespaces: (namespaces: TranslationNamespace[]) => Promise<void>;
  t: TranslationFunction;
  clearCache: () => void;
  initialize: () => Promise<void>;

  // 内部方法
  setCurrentLanguage: (language: SupportedLanguage) => void;
  setTranslations: (namespace: string, resource: TranslationResource) => void;
  setLoadState: (state: Partial<TranslationLoadState>) => void;
}

/**
 * Creates a translation function for the specified language and loaded translations.
 *
 * The returned function retrieves translation strings by key from the given namespace, supports nested key lookup, and performs parameter interpolation if needed. If the namespace or key is missing, it logs a warning and returns the key as a fallback.
 *
 * @returns A function that translates keys using the current language and loaded resources.
 */
function createTranslationFunction(
  currentLanguage: SupportedLanguage,
  translations: Record<string, TranslationResource>,
): TranslationFunction {
  return (key: string, params?: TranslationParams, namespace = "common") => {
    const namespaceKey = `${currentLanguage}_${namespace}`;
    const resource = translations[namespaceKey];

    if (!resource) {
      console.warn(`Translation namespace not loaded: ${namespace}`);
      return key;
    }

    // 获取翻译值
    const translation = getNestedValue(resource, key);

    if (translation === undefined) {
      console.warn(
        `Translation key not found: ${key} in namespace ${namespace}`,
      );
      return key;
    }

    // 如果没有参数，直接返回翻译
    if (!params || typeof translation !== "string") {
      return String(translation);
    }

    // 执行参数插值
    return interpolateString(translation, params);
  };
}

/**
 * Retrieves a nested value from a translation resource object using a dot-separated key path.
 *
 * @param obj - The translation resource object to search within
 * @param path - Dot-separated string representing the nested key path (e.g., "greeting.hello")
 * @returns The value at the specified path, or `undefined` if not found
 */
function getNestedValue(obj: TranslationResource, path: string): unknown {
  return path.split(".").reduce((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);
}

/**
 * Performs string interpolation by replacing placeholders in the template with values from the provided parameters.
 *
 * Placeholders are defined by the configured prefix and suffix in the i18n settings. If a parameter is missing, the original placeholder is retained.
 *
 * @param template - The translation string containing placeholders
 * @param params - An object mapping placeholder keys to their replacement values
 * @returns The interpolated string with placeholders replaced by parameter values
 */
function interpolateString(
  template: string,
  params: TranslationParams,
): string {
  const { prefix, suffix } = I18N_CONFIG.interpolation;

  return template.replace(
    new RegExp(
      `${escapeRegExp(prefix)}([^${escapeRegExp(suffix)}]+)${
        escapeRegExp(suffix)
      }`,
      "g",
    ),
    (match, key) => {
      const value = params[key.trim()];
      return value !== undefined ? String(value) : match;
    },
  );
}

/**
 * Escapes special characters in a string for use in a regular expression.
 *
 * @param string - The input string to escape
 * @returns The escaped string safe for use in regular expressions
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * 创建 i18n Store
 */
export const useI18nStore = create<I18nState>()(
  persist(
    (set, get) => ({
      // 初始状态
      currentLanguage: DEFAULT_LANGUAGE,
      availableLanguages: getAllLanguageConfigs(),
      translations: {},
      loadState: {
        isLoading: false,
        isLoaded: false,
        error: null,
        loadedNamespaces: [],
      },
      isInitialized: false,

      // 翻译函数
      t: (key: string, params?: TranslationParams, namespace = "common") => {
        const state = get();
        const translationFn = createTranslationFunction(
          state.currentLanguage,
          state.translations,
        );
        return translationFn(key, params, namespace);
      },

      // 切换语言
      changeLanguage: async (language: SupportedLanguage) => {
        if (!SUPPORTED_LANGUAGES.includes(language)) {
          console.error(`Unsupported language: ${language}`);
          return;
        }

        const state = get();

        // 如果语言没有变化，直接返回
        if (state.currentLanguage === language) {
          return;
        }

        set({
          currentLanguage: language,
          loadState: { ...state.loadState, isLoading: true, error: null },
        });

        try {
          // 保存语言偏好
          setStoredLanguage(language);

          // 预加载常用命名空间
          await get().preloadNamespaces(["common"]);

          set((state) => ({
            loadState: {
              ...state.loadState,
              isLoading: false,
              error: null,
            },
          }));
        } catch (error) {
          console.error("Failed to change language:", error);
          set((state) => ({
            loadState: {
              ...state.loadState,
              isLoading: false,
              error: error instanceof Error ? error.message : "Unknown error",
            },
          }));
        }
      },

      // 加载命名空间
      loadNamespace: async (namespace: TranslationNamespace) => {
        const state = get();
        const namespaceKey = `${state.currentLanguage}_${namespace}`;

        // 如果已经加载，直接返回
        if (state.translations[namespaceKey]) {
          return;
        }

        set((state) => ({
          loadState: {
            ...state.loadState,
            isLoading: true,
            error: null,
          },
        }));

        try {
          const resource = await loadNamespace(
            state.currentLanguage,
            namespace,
          );

          set((state) => ({
            translations: {
              ...state.translations,
              [namespaceKey]: resource,
            },
            loadState: {
              ...state.loadState,
              isLoading: false,
              loadedNamespaces: [
                ...state.loadState.loadedNamespaces,
                namespace,
              ],
            },
          }));
        } catch (error) {
          console.error(`Failed to load namespace ${namespace}:`, error);
          set((state) => ({
            loadState: {
              ...state.loadState,
              isLoading: false,
              error: error instanceof Error ? error.message : "Unknown error",
            },
          }));
        }
      },

      // 预加载多个命名空间
      preloadNamespaces: async (namespaces: TranslationNamespace[]) => {
        const state = get();

        set((state) => ({
          loadState: {
            ...state.loadState,
            isLoading: true,
            error: null,
          },
        }));

        try {
          await preloadNamespaces(state.currentLanguage, namespaces);

          // 加载所有命名空间到状态中
          const loadPromises = namespaces.map((namespace) =>
            get().loadNamespace(namespace)
          );

          await Promise.all(loadPromises);

          set((state) => ({
            loadState: {
              ...state.loadState,
              isLoading: false,
              isLoaded: true,
            },
          }));
        } catch (error) {
          console.error("Failed to preload namespaces:", error);
          set((state) => ({
            loadState: {
              ...state.loadState,
              isLoading: false,
              error: error instanceof Error ? error.message : "Unknown error",
            },
          }));
        }
      },

      // 清除缓存
      clearCache: () => {
        clearTranslationCache();
        set({
          translations: {},
          loadState: {
            isLoading: false,
            isLoaded: false,
            error: null,
            loadedNamespaces: [],
          },
        });
      },

      // 初始化
      initialize: async () => {
        const state = get();

        if (state.isInitialized) {
          return;
        }

        // 检测语言
        const detection = detectLanguage();

        set({
          currentLanguage: detection.language,
          isInitialized: true,
        });

        // 预加载基础命名空间
        await get().preloadNamespaces(["common"]);
      },

      // 内部方法
      setCurrentLanguage: (language: SupportedLanguage) => {
        set({ currentLanguage: language });
      },

      setTranslations: (namespace: string, resource: TranslationResource) => {
        set((state) => ({
          translations: {
            ...state.translations,
            [namespace]: resource,
          },
        }));
      },

      setLoadState: (newState: Partial<TranslationLoadState>) => {
        set((state) => ({
          loadState: {
            ...state.loadState,
            ...newState,
          },
        }));
      },
    }),
    {
      name: "athena-i18n-store",
      partialize: (state) => ({
        currentLanguage: state.currentLanguage,
        // 不持久化翻译资源，每次重新加载
      }),
    },
  ),
);

/**
 * Returns the currently selected language from the i18n store.
 *
 * Useful for accessing the active language in React components.
 */
export function useCurrentLanguage() {
  return useI18nStore((state) => state.currentLanguage);
}

/**
 * Provides translation utilities and language controls scoped to a specific namespace.
 *
 * Ensures the specified translation namespace is loaded, and returns a translation function, the current language, a method to change the language, loading status, and any error encountered during loading.
 *
 * @param namespace - The translation namespace to use. Defaults to "common".
 * @returns An object containing the translation function (`t`), current language, language change method, loading status, and error message.
 */
export function useTranslation(namespace: TranslationNamespace = "common") {
  const store = useI18nStore();

  // 确保命名空间已加载
  if (!store.translations[`${store.currentLanguage}_${namespace}`]) {
    store.loadNamespace(namespace);
  }

  return {
    t: (key: string, params?: TranslationParams) =>
      store.t(key, params, namespace),
    currentLanguage: store.currentLanguage,
    changeLanguage: store.changeLanguage,
    isLoading: store.loadState.isLoading,
    error: store.loadState.error,
  };
}

/**
 * Returns the list of available language configurations supported by the application.
 *
 * @returns An array of language configuration objects.
 */
export function useLanguageList() {
  return useI18nStore((state) => state.availableLanguages);
}
