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
 * 翻译函数实现
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
 * 获取嵌套对象的值
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
 * 字符串插值
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
 * 转义正则表达式特殊字符
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

// 便捷 Hooks
export function useCurrentLanguage() {
  return useI18nStore((state) => state.currentLanguage);
}

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

export function useLanguageList() {
  return useI18nStore((state) => state.availableLanguages);
}
