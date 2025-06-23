/**
 * Header 语言切换器演示页面
 * 展示 Header 组件中集成的语言切换功能
 */

import Header from "@components/layout/Header.tsx";
import GlobalLanguageProvider from "@islands/GlobalLanguageProvider.tsx";
import { PageProps } from "fresh";

/**
 * Renders a demonstration page showcasing the Header component with integrated language switcher functionality.
 *
 * The page includes feature descriptions, usage instructions, technical highlights, and a navigation link to a full internationalization demo. It is styled with responsive layouts and supports both light and dark modes.
 */
export default function HeaderDemoPage(_props: PageProps) {
  return (
    <GlobalLanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header 组件演示 */}
        <Header
          title="Header 语言切换演示"
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
                Header 语言切换器演示
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                这个页面展示了集成在 Header 组件中的语言切换器功能。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    🖥️ 桌面端特性
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• 下拉菜单模式</li>
                    <li>• 显示语言标志和名称</li>
                    <li>• 悬停动画效果</li>
                    <li>• 玻璃态设计风格</li>
                    <li>• 磁性交互效果</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    📱 移动端特性
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• 切换按钮模式</li>
                    <li>• 紧凑型设计</li>
                    <li>• 一键快速切换</li>
                    <li>• 响应式适配</li>
                    <li>• 触摸友好</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 功能说明 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                使用方法
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                    1. 在 Header 组件中启用语言切换器
                  </h3>
                  <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm overflow-x-auto">
{`<Header
  showLanguageSwitcher={true}
  showThemeToggle={true}
  showUserMenu={true}
/>`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                    2. 自定义语言切换器属性
                  </h3>
                  <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm overflow-x-auto">
{`<HeaderLanguageSwitcher
  size="md"           // sm | md | lg
  showText={true}     // 是否显示文本
  variant="dropdown"  // dropdown | toggle
  className="custom-class"
/>`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                    3. 语言切换行为
                  </h3>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-blue-800 dark:text-blue-200">
                      <strong>注意：</strong>{" "}
                      切换语言后页面会自动刷新以应用新的语言设置。
                      语言偏好会保存在浏览器的本地存储中。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 技术特性 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                技术特性
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Islands 架构
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    客户端水合，服务端渲染兼容
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    用户体验
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    流畅动画，直观交互
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    响应式设计
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    桌面端和移动端优化
                  </p>
                </div>
              </div>
            </div>

            {/* 返回链接 */}
            <div className="text-center">
              <a
                href="/i18n-demo"
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
                查看完整国际化演示
              </a>
            </div>
          </div>
        </div>
      </div>
    </GlobalLanguageProvider>
  );
}
