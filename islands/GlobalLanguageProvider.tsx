/**
 * 全局语言提供者 Island 组件
 * 管理全局语言状态，实现无刷新语言切换
 */

import { DEFAULT_LANGUAGE, isSupportedLanguage } from "@i18n/config.ts";
import type { SupportedLanguage, TranslationResource } from "@i18n/types.ts";
import { ComponentChildren, createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";

// 语言上下文类型
interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  changeLanguage: (language: SupportedLanguage) => void;
  translations: Record<string, TranslationResource>;
  isLoading: boolean;
  t: (
    key: string,
    params?: Record<string, string | number>,
    namespace?: string,
  ) => string;
}

// 创建语言上下文
const LanguageContext = createContext<LanguageContextType | null>(null);

// 翻译缓存
const translationCache = new Map<string, TranslationResource>();

// 简单的翻译函数
function simpleTranslate(
  key: string,
  translations: Record<string, TranslationResource>,
  params?: Record<string, string | number>,
  namespace = "common",
): string {
  const namespaceKey = `${namespace}`;
  const resource = translations[namespaceKey];

  if (!resource) {
    return key;
  }

  const keys = key.split(".");
  let value: unknown = resource;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  if (typeof value !== "string") {
    return key;
  }

  // 简单的参数替换
  if (params) {
    return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
      return params[paramKey] !== undefined ? String(params[paramKey]) : match;
    });
  }

  return value;
}

// 加载翻译资源
async function loadTranslation(
  language: SupportedLanguage,
  namespace: string,
): Promise<TranslationResource> {
  const cacheKey = `${language}_${namespace}`;

  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  try {
    const response = await fetch(`/i18n/locales/${language}/${namespace}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load translations: ${response.status}`);
    }

    const data = await response.json();
    translationCache.set(cacheKey, data);
    return data;
  } catch (err) {
    console.error(
      `Failed to load translations for ${language}/${namespace}:`,
      err,
    );
    return {};
  }
}

// 全局语言提供者组件
export function GlobalLanguageProvider(
  { children }: { children: ComponentChildren },
) {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(
    DEFAULT_LANGUAGE,
  );
  const [translations, setTranslations] = useState<
    Record<string, TranslationResource>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  // 初始化语言
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("athena_language");
      if (stored && isSupportedLanguage(stored)) {
        setCurrentLanguage(stored);
      }
    }
  }, []);

  // 加载翻译资源
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);

      try {
        // 加载常用的命名空间
        const namespaces = ["common", "components"];
        const newTranslations: Record<string, TranslationResource> = {};

        for (const namespace of namespaces) {
          const resource = await loadTranslation(currentLanguage, namespace);
          newTranslations[namespace] = resource;
        }

        setTranslations(newTranslations);
      } catch (error) {
        console.error("Failed to load translations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [currentLanguage]);

  // 切换语言
  const changeLanguage = (language: SupportedLanguage) => {
    if (language === currentLanguage) return;

    setCurrentLanguage(language);

    if (typeof window !== "undefined") {
      localStorage.setItem("athena_language", language);
    }
  };

  // 翻译函数
  const t = (
    key: string,
    params?: Record<string, string | number>,
    namespace = "common",
  ) => {
    return simpleTranslate(key, translations, params, namespace);
  };

  const contextValue: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    translations,
    isLoading,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

// 使用语言上下文的 Hook
export function useGlobalLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useGlobalLanguage must be used within a GlobalLanguageProvider",
    );
  }
  return context;
}

// 简化的翻译 Hook
export function useGlobalTranslation(namespace = "common") {
  const { t, currentLanguage, changeLanguage, isLoading } = useGlobalLanguage();

  return {
    t: (key: string, params?: Record<string, string | number>) =>
      t(key, params, namespace),
    currentLanguage,
    changeLanguage,
    isLoading,
  };
}

// 默认导出
export default GlobalLanguageProvider;
