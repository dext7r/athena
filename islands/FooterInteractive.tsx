import { useState } from "preact/hooks";

interface FooterInteractiveProps {
  className?: string;
}

export default function FooterInteractive(
  { className = "" }: FooterInteractiveProps,
) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    console.log("Footer toggle clicked, current state:", isExpanded);
    setIsExpanded(!isExpanded);
  };

  return (
    <footer
      className={`relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 border-t border-gray-200/60 dark:border-gray-700/60 overflow-hidden ${className}`}
    >
      {/* 高级背景效果 */}
      <div className="absolute inset-0">
        {/* 主渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-indigo-50/30 to-purple-50/40 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-purple-950/30">
        </div>

        {/* 玻璃态效果 */}
        <div className="absolute inset-0 backdrop-blur-[1px] bg-white/10 dark:bg-black/10">
        </div>

        {/* 顶部装饰线 - 彩虹渐变 */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/60 via-purple-500/60 via-pink-500/60 to-transparent dark:via-blue-400/40 dark:via-purple-400/40 dark:via-pink-400/40">
        </div>

        {/* 动态光效 */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-blue-400/10 to-purple-400/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-full blur-3xl animate-pulse">
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-400/10 to-pink-400/10 dark:from-purple-500/5 dark:to-pink-500/5 rounded-full blur-2xl animate-pulse delay-1000">
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-indigo-400/8 to-blue-400/8 dark:from-indigo-500/4 dark:to-blue-500/4 rounded-full blur-xl animate-pulse delay-500">
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 紧凑模式：默认显示的品牌介绍区域 */}
        <div
          className={`transition-all duration-500 ${
            isExpanded ? "py-8 md:py-12" : "py-4 md:py-6"
          }`}
        >
          {/* 品牌介绍区域 - 始终显示 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <button
                  onClick={handleToggle}
                  className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-300 hover:scale-105 group cursor-pointer"
                  title={isExpanded ? "收起详细信息" : "展开详细信息"}
                >
                  <span className="text-white font-bold text-lg md:text-xl">
                    A
                  </span>
                  {/* 展开/收起指示器 */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                    <svg
                      className={`w-3 h-3 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl md:rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Athena Template
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  现代化的 Fresh + Deno 开发模板
                </p>
              </div>
            </div>

            {/* 右侧快速链接 - 紧凑模式 */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/dext7r/athena.git"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:from-gray-900 hover:to-gray-800 dark:hover:from-gray-200 dark:hover:to-gray-100 hover:text-white dark:hover:text-gray-900 transition-all duration-300 hover:scale-105"
                title="GitHub"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="mailto:h7ml@qq.com"
                className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 hover:from-blue-500 hover:to-blue-600 dark:hover:from-blue-400 dark:hover:to-blue-300 hover:text-white dark:hover:text-blue-900 transition-all duration-300 hover:scale-105"
                title="Email"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                © 2025{" "}
                <a
                  href="mailto:h7ml@qq.com"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  h7ml
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 展开模式：完整的 Footer 内容 */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-gray-200/60 dark:border-gray-700/60 pt-8">
            {/* 移动端：优化的紧凑布局 */}
            <div className="md:hidden space-y-6">
              {/* 品牌区域 - 紧凑版 */}
              <div className="text-center">
                <div className="relative group inline-block mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-105">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                  </div>
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                  Athena Template
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  现代化的 Fresh + Deno 开发模板
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
                  高效、安全、可扩展的全栈解决方案
                </p>
              </div>

              {/* 快速导航 - 紧凑网格 */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-1">
                    <div className="w-0.5 h-3 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full">
                    </div>
                    产品功能
                  </h4>
                  <div className="space-y-1.5">
                    <a
                      href="/components"
                      className="block text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      UI 组件库
                    </a>
                    <a
                      href="/hooks"
                      className="block text-xs text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      React Hooks
                    </a>
                    <a
                      href="/state"
                      className="block text-xs text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      状态管理
                    </a>
                    <a
                      href="/security"
                      className="block text-xs text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      安全设置
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-1">
                    <div className="w-0.5 h-3 bg-gradient-to-b from-green-500 to-blue-600 rounded-full">
                    </div>
                    支持帮助
                  </h4>
                  <div className="space-y-1.5">
                    <a
                      href="/about"
                      className="block text-xs text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      关于我们
                    </a>
                    <a
                      href="https://github.com/dext7r/athena.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      GitHub 仓库
                    </a>
                    <a
                      href="mailto:h7ml@qq.com"
                      className="block text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      联系我们
                    </a>
                    <a
                      href="#"
                      className="block text-xs text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                    >
                      使用文档
                    </a>
                  </div>
                </div>
              </div>

              {/* 社交媒体 - 紧凑版 */}
              <div className="text-center">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-3 flex items-center justify-center gap-1">
                  <div className="w-0.5 h-3 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full">
                  </div>
                  关注我们
                </h4>
                <div className="flex justify-center gap-2">
                  <a
                    href="https://github.com/dext7r/athena.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:from-gray-900 hover:to-gray-800 dark:hover:from-gray-200 dark:hover:to-gray-100 hover:text-white dark:hover:text-gray-900 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
                    title="GitHub"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:h7ml@qq.com"
                    className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 hover:from-blue-500 hover:to-blue-600 dark:hover:from-blue-400 dark:hover:to-blue-300 hover:text-white dark:hover:text-blue-900 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
                    title="Email"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-700 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 hover:from-purple-500 hover:to-purple-600 dark:hover:from-purple-400 dark:hover:to-purple-300 hover:text-white dark:hover:text-purple-900 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
                    title="Twitter"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-500">
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse">
                    </div>
                    <span>开源项目，持续维护</span>
                  </div>
                </div>
              </div>

              {/* 移动端版权信息 */}
              <div className="border-t border-gray-200/60 dark:border-gray-700/60 pt-4">
                <div className="text-center space-y-2">
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    © 2025 Athena Template •{" "}
                    <a
                      href="mailto:h7ml@qq.com"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors ml-1"
                    >
                      h7ml
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                    <a
                      href="#"
                      className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      隐私政策
                    </a>
                    <span>•</span>
                    <a
                      href="#"
                      className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      服务条款
                    </a>
                    <span>•</span>
                    <a
                      href="#"
                      className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      Cookie
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 桌面端：企业级四栏布局 */}
            <div className="hidden md:block">
              {/* 主要内容区域 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 mb-8">
                {/* 第一栏：品牌和介绍 */}
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative group">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30 group-hover:shadow-2xl group-hover:shadow-blue-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <span className="text-white font-bold text-2xl">A</span>
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        Athena
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Template
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    现代化的 Fresh + Deno
                    全栈开发模板，为开发者提供高效、安全、可扩展的解决方案。
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse">
                    </div>
                    <span>持续更新中</span>
                  </div>
                </div>

                {/* 第二栏：产品功能 */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full">
                    </div>
                    产品功能
                  </h4>
                  <div className="space-y-3">
                    <a
                      href="/components"
                      className="group flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                    >
                      <div className="w-2 h-2 bg-blue-500/60 rounded-full group-hover:bg-blue-500 group-hover:scale-125 transition-all duration-300">
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        UI 组件库
                      </span>
                    </a>
                    <a
                      href="/hooks"
                      className="group flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300"
                    >
                      <div className="w-2 h-2 bg-green-500/60 rounded-full group-hover:bg-green-500 group-hover:scale-125 transition-all duration-300">
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        React Hooks
                      </span>
                    </a>
                    <a
                      href="/state"
                      className="group flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
                    >
                      <div className="w-2 h-2 bg-purple-500/60 rounded-full group-hover:bg-purple-500 group-hover:scale-125 transition-all duration-300">
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        状态管理
                      </span>
                    </a>
                    <a
                      href="/security"
                      className="group flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300"
                    >
                      <div className="w-2 h-2 bg-red-500/60 rounded-full group-hover:bg-red-500 group-hover:scale-125 transition-all duration-300">
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        安全设置
                      </span>
                    </a>
                  </div>
                </div>

                {/* 第三栏：支持帮助 */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-4 bg-gradient-to-b from-green-500 to-blue-600 rounded-full">
                    </div>
                    支持帮助
                  </h4>
                  <div className="space-y-3">
                    <a
                      href="/about"
                      className="group flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300"
                    >
                      <div className="w-2 h-2 bg-indigo-500/60 rounded-full group-hover:bg-indigo-500 group-hover:scale-125 transition-all duration-300">
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        关于我们
                      </span>
                    </a>
                    <a
                      href="https://github.com/dext7r/athena.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                    >
                      <div className="w-2 h-2 bg-gray-500/60 rounded-full group-hover:bg-gray-500 group-hover:scale-125 transition-all duration-300">
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        GitHub 仓库
                      </span>
                    </a>
                    <a
                      href="mailto:h7ml@qq.com"
                      className="group flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                    >
                      <div className="w-2 h-2 bg-blue-500/60 rounded-full group-hover:bg-blue-500 group-hover:scale-125 transition-all duration-300">
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        联系我们
                      </span>
                    </a>
                    <a
                      href="#"
                      className="group flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300"
                    >
                      <div className="w-2 h-2 bg-orange-500/60 rounded-full group-hover:bg-orange-500 group-hover:scale-125 transition-all duration-300">
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        使用文档
                      </span>
                    </a>
                  </div>
                </div>

                {/* 第四栏：社交媒体和订阅 */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full">
                    </div>
                    关注我们
                  </h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <a
                        href="https://github.com/dext7r/athena.git"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:from-gray-900 hover:to-gray-800 dark:hover:from-gray-200 dark:hover:to-gray-100 hover:text-white dark:hover:text-gray-900 transition-all duration-300 hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-xl"
                        title="GitHub"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                      <a
                        href="mailto:h7ml@qq.com"
                        className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 hover:from-blue-500 hover:to-blue-600 dark:hover:from-blue-400 dark:hover:to-blue-300 hover:text-white dark:hover:text-blue-900 transition-all duration-300 hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-xl"
                        title="Email"
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
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-700 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 hover:from-purple-500 hover:to-purple-600 dark:hover:from-purple-400 dark:hover:to-purple-300 hover:text-white dark:hover:text-purple-900 transition-all duration-300 hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-xl"
                        title="Twitter"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      <p className="mb-2">获取最新更新和技术资讯</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse">
                        </div>
                        <span>开源项目，持续维护</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 底部版权区域 */}
              <div className="border-t border-gray-200/60 dark:border-gray-700/60 pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>© 2025 Athena Template</span>
                    <span className="hidden md:inline">•</span>
                    <a
                      href="mailto:h7ml@qq.com"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                      h7ml
                    </a>
                  </div>
                  <div className="flex items-center gap-6 text-xs text-gray-500 dark:text-gray-500">
                    <a
                      href="#"
                      className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      隐私政策
                    </a>
                    <a
                      href="#"
                      className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      服务条款
                    </a>
                    <a
                      href="#"
                      className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      Cookie 政策
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
