/**
 * 翻译资源加载器
 * 负责动态加载和缓存翻译资源
 */

import {
  CACHE_CONFIG,
  ERROR_CONFIG,
  PERFORMANCE_CONFIG,
  TRANSLATION_PATHS,
} from "./config.ts";
import type {
  SupportedLanguage,
  TranslationLoader,
  TranslationNamespace,
  TranslationResource,
} from "./types.ts";

/**
 * 缓存管理器
 */
class CacheManager {
  private cache = new Map<string, {
    data: TranslationResource;
    timestamp: number;
  }>();

  /**
   * 获取缓存键
   */
  private getCacheKey(
    language: SupportedLanguage,
    namespace: TranslationNamespace,
  ): string {
    return `${CACHE_CONFIG.prefix}${language}_${namespace}`;
  }

  /**
   * 获取缓存数据
   */
  get(
    language: SupportedLanguage,
    namespace: TranslationNamespace,
  ): TranslationResource | null {
    if (!CACHE_CONFIG.enabled) return null;

    const key = this.getCacheKey(language, namespace);
    const cached = this.cache.get(key);

    if (!cached) return null;

    // 检查是否过期
    if (Date.now() - cached.timestamp > CACHE_CONFIG.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  /**
   * 设置缓存数据
   */
  set(
    language: SupportedLanguage,
    namespace: TranslationNamespace,
    data: TranslationResource,
  ): void {
    if (!CACHE_CONFIG.enabled) return;

    const key = this.getCacheKey(language, namespace);

    // 检查缓存大小限制
    if (this.cache.size >= CACHE_CONFIG.maxEntries) {
      // 删除最旧的条目
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * 清除所有缓存
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * 清除特定语言的缓存
   */
  clearLanguage(language: SupportedLanguage): void {
    const keysToDelete = Array.from(this.cache.keys())
      .filter((key) => key.includes(`${language}_`));

    keysToDelete.forEach((key) => this.cache.delete(key));
  }
}

/**
 * 翻译资源加载器实现
 */
export class TranslationLoaderImpl implements TranslationLoader {
  private cacheManager = new CacheManager();
  private loadingPromises = new Map<string, Promise<TranslationResource>>();

  /**
   * 加载指定命名空间的翻译资源
   */
  async loadNamespace(
    language: SupportedLanguage,
    namespace: TranslationNamespace,
  ): Promise<TranslationResource> {
    // 检查缓存
    const cached = this.cacheManager.get(language, namespace);
    if (cached) {
      return cached;
    }

    // 检查是否正在加载
    const loadingKey = `${language}_${namespace}`;
    const existingPromise = this.loadingPromises.get(loadingKey);
    if (existingPromise) {
      return existingPromise;
    }

    // 开始加载
    const loadPromise = this.loadFromSource(language, namespace);
    this.loadingPromises.set(loadingKey, loadPromise);

    try {
      const resource = await loadPromise;

      // 缓存结果
      this.cacheManager.set(language, namespace, resource);

      return resource;
    } catch (error) {
      console.error(
        `Failed to load translation resource: ${language}/${namespace}`,
        error,
      );

      // 如果启用了回退机制，尝试加载回退语言
      if (ERROR_CONFIG.useFallbackOnLoadError && language !== "en") {
        console.warn(`Falling back to English for namespace: ${namespace}`);
        return this.loadNamespace("en", namespace);
      }

      // 返回空对象避免应用崩溃
      return {};
    } finally {
      this.loadingPromises.delete(loadingKey);
    }
  }

  /**
   * 预加载多个命名空间
   */
  async preloadNamespaces(
    language: SupportedLanguage,
    namespaces: TranslationNamespace[],
  ): Promise<void> {
    const chunks = this.chunkArray(
      namespaces,
      PERFORMANCE_CONFIG.maxConcurrentLoads,
    );

    for (const chunk of chunks) {
      const loadPromises = chunk.map((namespace) =>
        this.loadNamespace(language, namespace)
      );

      await Promise.all(loadPromises);
    }
  }

  /**
   * 清除缓存
   */
  clearCache(): void {
    this.cacheManager.clear();
    this.loadingPromises.clear();
  }

  /**
   * 从源加载翻译资源
   */
  private async loadFromSource(
    language: SupportedLanguage,
    namespace: TranslationNamespace,
  ): Promise<TranslationResource> {
    const path = TRANSLATION_PATHS.getPath(language, namespace);

    try {
      const response = await fetch(path, {
        headers: {
          "Accept": "application/json",
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const resource = await response.json();

      // 验证资源格式
      if (!this.isValidTranslationResource(resource)) {
        throw new Error("Invalid translation resource format");
      }

      return resource;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 验证翻译资源格式
   */
  private isValidTranslationResource(
    resource: unknown,
  ): resource is TranslationResource {
    return typeof resource === "object" && resource !== null;
  }

  /**
   * 将数组分块
   */
  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
}

// 创建默认的翻译加载器实例
export const translationLoader = new TranslationLoaderImpl();

/**
 * Loads a translation resource for the specified language and namespace.
 *
 * @returns A promise that resolves to the loaded translation resource object.
 */
export function loadNamespace(
  language: SupportedLanguage,
  namespace: TranslationNamespace,
): Promise<TranslationResource> {
  return translationLoader.loadNamespace(language, namespace);
}

/**
 * Preloads multiple translation namespaces for a given language.
 *
 * Loads the specified namespaces in controlled concurrent batches to optimize resource fetching and caching.
 *
 * @param language - The target language for which to preload translations
 * @param namespaces - An array of namespaces to preload
 */
export function preloadNamespaces(
  language: SupportedLanguage,
  namespaces: TranslationNamespace[],
): Promise<void> {
  return translationLoader.preloadNamespaces(language, namespaces);
}

/**
 * Clears all cached translation resources and ongoing loading promises.
 */
export function clearTranslationCache(): void {
  translationLoader.clearCache();
}
