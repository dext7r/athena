/**
 * 无刷新语言切换演示页面
 * 展示实时语言切换功能
 */

import { PageProps } from "fresh";
import Header from "@components/layout/Header.tsx";
import GlobalLanguageProvider from "@islands/GlobalLanguageProvider.tsx";
import I18nButton from "@islands/I18nButton.tsx";
import LanguageSwitchDemo from "@islands/LanguageSwitchDemo.tsx";

/**
 * Renders a demonstration page for real-time language switching without page refresh.
 *
 * The page showcases global language state management, instant translation updates, and internationalized UI components. It includes interactive demos, usage instructions, and various styled buttons to illustrate dynamic translation capabilities.
 */
export default function LanguageSwitchDemoPage(_props: PageProps) {
  return (
    <GlobalLanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header 组件演示 */}
        <Header
          title="实时语言切换演示"
          showLanguageSwitcher
          showThemeToggle
          showUserMenu
          showSidebarToggle={false}
        />

        {/* 页面内容 */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* 介绍卡片 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                🚀 无刷新语言切换演示
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                这个页面展示了无需刷新页面的实时语言切换功能。所有文本内容会立即更新为新语言。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    ✨ 核心特性
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• 无刷新页面切换</li>
                    <li>• 实时内容翻译</li>
                    <li>• 全局状态管理</li>
                    <li>• 自动缓存翻译</li>
                    <li>• 流畅用户体验</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    🔧 技术实现
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• GlobalLanguageProvider</li>
                    <li>• Preact Context API</li>
                    <li>• 动态翻译加载</li>
                    <li>• 本地存储持久化</li>
                    <li>• Islands 架构</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 交互演示区域 */}
            <LanguageSwitchDemo />

            {/* 按钮演示 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                国际化按钮演示
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    基础按钮
                  </h3>
                  <div className="space-y-3">
                    <I18nButton
                      i18nKey="button.save"
                      i18nFallback="保存"
                      variant="primary"
                      className="w-full"
                    />
                    <I18nButton
                      i18nKey="button.cancel"
                      i18nFallback="取消"
                      variant="outline"
                      className="w-full"
                    />
                    <I18nButton
                      i18nKey="button.delete"
                      i18nFallback="删除"
                      variant="error"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    状态按钮
                  </h3>
                  <div className="space-y-3">
                    <I18nButton
                      i18nKey="button.submit"
                      i18nFallback="提交"
                      variant="success"
                      className="w-full"
                    />
                    <I18nButton
                      i18nKey="button.reset"
                      i18nFallback="重置"
                      variant="warning"
                      className="w-full"
                    />
                    <I18nButton
                      loading
                      i18nKey="button.submit"
                      i18nFallback="提交"
                      loadingI18nKey="status.saving"
                      loadingText="保存中..."
                      variant="primary"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    特殊效果
                  </h3>
                  <div className="space-y-3">
                    <I18nButton
                      i18nKey="button.save"
                      i18nFallback="保存"
                      variant="gradient"
                      className="w-full"
                    />
                    <I18nButton
                      i18nKey="button.cancel"
                      i18nFallback="取消"
                      variant="glass"
                      className="w-full"
                    />
                    <I18nButton
                      i18nKey="button.submit"
                      i18nFallback="提交"
                      variant="rainbow"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 使用说明 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                使用方法
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                    1. 包装 GlobalLanguageProvider
                  </h3>
                  <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm overflow-x-auto">
{`<GlobalLanguageProvider>
  <YourApp />
</GlobalLanguageProvider>`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                    2. 使用全局翻译 Hook
                  </h3>
                  <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm overflow-x-auto">
{`const { t, currentLanguage, changeLanguage } = useGlobalTranslation('components');
const text = t('button.save'); // 获取翻译文本`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                    3. 使用国际化按钮
                  </h3>
                  <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm overflow-x-auto">
{`<I18nButton
  i18nKey="button.save"
  i18nFallback="保存"
  variant="primary"
/>`}
                  </pre>
                </div>
              </div>
            </div>

            {/* 返回链接 */}
            <div className="text-center">
              <a
                href="/header-demo"
                className="
                  inline-flex items-center gap-2 px-6 py-3
                  bg-blue-600 hover:bg-blue-700 text-white
                  rounded-xl font-medium transition-colors duration-200
                  shadow-lg hover:shadow-xl
                "
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                查看 Header 演示
              </a>
            </div>
          </div>
        </div>
      </div>
    </GlobalLanguageProvider>
  );
}
