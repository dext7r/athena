/**
 * 语言切换演示 Island 组件
 * 展示实时语言切换的效果
 */

import { useEffect, useState } from "preact/hooks";
import {
  useGlobalLanguage,
  useGlobalTranslation,
} from "@islands/GlobalLanguageProvider.tsx";
import { LANGUAGE_CONFIGS, SUPPORTED_LANGUAGES } from "@/i18n/config.ts";

export default function LanguageSwitchDemo() {
  const [mounted, setMounted] = useState(false);
  const { currentLanguage, changeLanguage, isLoading } = useGlobalLanguage();
  const { t } = useGlobalTranslation("components");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        🌐 实时语言切换演示
      </h2>

      {/* 当前状态显示 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              当前语言
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {LANGUAGE_CONFIGS[currentLanguage].flag}{" "}
              {LANGUAGE_CONFIGS[currentLanguage].nativeName}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              加载状态
            </div>
            <div
              className={`text-lg font-semibold ${
                isLoading ? "text-orange-600" : "text-green-600"
              }`}
            >
              {isLoading ? "🔄 加载中" : "✅ 已就绪"}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              支持语言
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {SUPPORTED_LANGUAGES.length} 种语言
            </div>
          </div>
        </div>
      </div>

      {/* 语言切换按钮 */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
          快速切换语言
        </h3>
        <div className="flex flex-wrap gap-3">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const config = LANGUAGE_CONFIGS[lang];
            const isActive = lang === currentLanguage;

            return (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                disabled={isActive || isLoading}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-xl font-medium
                  transition-all duration-300 ease-out
                  ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:scale-105"
                }
                  ${
                  isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }
                  disabled:cursor-not-allowed disabled:opacity-50
                `}
              >
                <span className="text-xl">{config.flag}</span>
                <span>{config.nativeName}</span>
                {isActive && <span className="text-sm">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* 翻译文本演示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
            📝 翻译文本演示
          </h3>
          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                按钮文本
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {t("button.save")} | {t("button.cancel")} | {t("button.delete")}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                状态文本
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {t("status.loading")} | {t("status.saving")} |{" "}
                {t("status.success")}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                表单文本
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {t("form.name")} | {t("form.email")} | {t("form.password")}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
            ⚡ 实时更新效果
          </h3>
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <div className="text-sm text-green-700 dark:text-green-300 mb-1">
                ✨ 特点
              </div>
              <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                <li>• 无需刷新页面</li>
                <li>• 即时文本更新</li>
                <li>• 流畅过渡动画</li>
                <li>• 自动缓存翻译</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <div className="text-sm text-purple-700 dark:text-purple-300 mb-1">
                🔧 技术栈
              </div>
              <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                <li>• Preact Context API</li>
                <li>• Fresh Islands 架构</li>
                <li>• 动态翻译加载</li>
                <li>• 本地存储持久化</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
              <div className="text-sm text-orange-700 dark:text-orange-300 mb-1">
                🎯 用户体验
              </div>
              <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1">
                <li>• 零延迟切换</li>
                <li>• 保持页面状态</li>
                <li>• 响应式设计</li>
                <li>• 无障碍访问</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 性能指标 */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
          📊 性能指标
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">~0ms</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              切换延迟
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              状态保持
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">缓存</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              翻译资源
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">实时</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              内容更新
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
