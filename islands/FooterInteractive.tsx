import { useState } from "preact/hooks";

interface FooterInteractiveProps {
  className?: string;
}

export default function FooterInteractive(
  { className = "" }: FooterInteractiveProps,
) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (isAnimating) return; // 防止动画期间重复点击

    setIsAnimating(true);
    setIsExpanded(!isExpanded);

    // 动画完成后重置状态
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // 键盘导航支持
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <footer
      className={`
        relative overflow-hidden 
        glass backdrop-blur-xl
        bg-gradient-to-br from-white/95 via-neutral-50/80 to-white/95
        dark:from-neutral-900/95 dark:via-neutral-800/80 dark:to-neutral-900/95
        border-t border-neutral-200/60 dark:border-neutral-700/60
        shadow-glass hover:shadow-glow-lg
        transition-all duration-500 ease-out
        ${className}
      `}
    >
      {/* 动态背景装饰 */}
      <div className="absolute inset-0 opacity-40">
        {/* 顶部装饰线 */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent animate-gradient-flow">
        </div>

        {/* 网格背景 */}
        <div className="absolute inset-0 particle-bg opacity-20">
        </div>
      </div>

      {/* 浮动装饰元素 */}
      <div className="absolute top-4 left-1/4 w-2 h-2 bg-primary-400/30 rounded-full animate-float">
      </div>
      <div className="absolute top-8 right-1/3 w-1.5 h-1.5 bg-secondary-400/40 rounded-full animate-float-delayed">
      </div>
      <div className="absolute bottom-6 left-2/3 w-1 h-1 bg-accent-400/50 rounded-full animate-float-small">
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* 紧凑模式：默认显示的品牌介绍区域 */}
        <div
          className={`transition-all duration-700 ease-out ${
            isExpanded ? "py-10 md:py-16" : "py-6 md:py-8"
          }`}
        >
          {/* 品牌介绍区域 - 始终显示 */}
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-6 cursor-pointer group/brand hover:bg-white/40 dark:hover:bg-gray-800/40 rounded-xl p-3 -m-3 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-400/5"
              onClick={handleToggle}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="button"
              aria-expanded={isExpanded}
              aria-label={isExpanded
                ? "收起Footer详细信息"
                : "展开Footer详细信息"}
            >
              <div className="relative group">
                <button
                  onClick={handleToggle}
                  onKeyDown={handleKeyDown}
                  disabled={isAnimating}
                  className={`
                    w-14 h-14 md:w-16 md:h-16 
                    ${
                    isExpanded
                      ? "bg-gradient-to-br from-success-500 via-success-600 to-accent-600"
                      : "bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600"
                  }
                    rounded-2xl md:rounded-3xl flex items-center justify-center 
                    shadow-colored hover:shadow-glow-lg
                    ${
                    isExpanded
                      ? "shadow-success-500/30"
                      : "shadow-primary-500/30"
                  }
                    hover:scale-110 active:scale-95
                    transition-all duration-500 ease-out
                    btn-animate magnetic-element cursor-none
                    group focus:outline-none focus:ring-2 focus:ring-primary-500/30
                    relative overflow-hidden
                    ${isAnimating ? "pointer-events-none opacity-90" : ""}
                  `}
                  title={isExpanded ? "收起详细信息" : "展开详细信息"}
                  aria-expanded={isExpanded}
                  aria-label={isExpanded
                    ? "收起Footer详细信息"
                    : "展开Footer详细信息"}
                >
                  {/* 背景动画效果 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl md:rounded-3xl">
                  </div>

                  <span
                    className={`text-white font-bold text-xl md:text-2xl transition-all duration-500 relative z-10 ${
                      isAnimating ? "animate-pulse scale-110" : ""
                    }`}
                    style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
                  >
                    A
                  </span>

                  {/* 展开/收起指示器 - 重新设计 */}
                  <div
                    className={`absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 border-2 border-white/50 dark:border-gray-600/50 ${
                      isExpanded
                        ? "bg-gradient-to-br from-emerald-100 to-green-200 dark:from-emerald-900 dark:to-green-800"
                        : "bg-gradient-to-br from-white to-gray-100 dark:from-gray-700 dark:to-gray-800"
                    }`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 transition-all duration-700 ${
                        isExpanded
                          ? "rotate-180 text-emerald-600 dark:text-emerald-400 scale-110"
                          : "text-gray-600 dark:text-gray-400"
                      } ${isAnimating ? "animate-spin" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                <div
                  className={`absolute -inset-2 bg-gradient-to-br rounded-2xl md:rounded-3xl blur-lg transition-all duration-500 ${
                    isExpanded
                      ? "from-emerald-500/40 to-green-500/40 opacity-40 group-hover:opacity-60"
                      : "from-blue-500/30 to-purple-500/30 opacity-25 group-hover:opacity-40"
                  }`}
                >
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg md:text-xl font-display font-bold text-gradient-primary animate-text-gradient">
                    Athena
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium transition-all duration-300 ${
                      isExpanded
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {isExpanded ? "已展开" : "点击展开"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  现代化的 Fresh + Deno 开发模板
                </p>
              </div>
            </div>

            {/* 右侧快速链接 - 紧凑模式 */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/dext7r/athena.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-300 hover:from-gray-900 hover:via-gray-800 hover:to-gray-900 dark:hover:from-slate-200 dark:hover:via-gray-100 dark:hover:to-slate-200 hover:text-white dark:hover:text-gray-900 transition-all duration-400 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/25 group"
                  title="查看 GitHub 源码"
                >
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="mailto:h7ml@qq.com"
                  className="w-10 h-10 bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200 dark:from-blue-900 dark:via-indigo-900 dark:to-blue-800 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600 dark:hover:from-blue-400 dark:hover:via-indigo-400 dark:hover:to-blue-300 hover:text-white dark:hover:text-blue-900 transition-all duration-400 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 group"
                  title="发送邮件联系"
                >
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
              </div>

              {/* 分隔线 */}
              <div className="w-px h-6 bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-600">
              </div>

              {/* 版权信息 */}
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                © 2025{" "}
                <a
                  href="mailto:h7ml@qq.com"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-semibold hover:underline decoration-2 underline-offset-2"
                >
                  h7ml
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 展开模式：完整的 Footer 内容 */}
        <div
          className={`transition-all duration-700 ease-in-out overflow-hidden ${
            isExpanded
              ? "max-h-[2000px] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4"
          }`}
          style={{
            transitionProperty: "max-height, opacity, transform",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
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
                  Athena
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
                    © 2025 Athena •{" "}
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
                    <span>© 2025 Athena</span>
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
