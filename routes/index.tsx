// Head component is now handled in _app.tsx in Fresh V2
import Layout from "@components/layout/Layout.tsx";
import Button from "@components/ui/Button.tsx";
import CounterDemo from "@islands/CounterDemo.tsx";
import ThemeToggle from "@islands/ThemeToggle.tsx";

export default function Home() {
  return (
    <>
      <Layout title="Athena - 现代化全栈开发模板">
        <div className="space-y-12 max-h-full overflow-y-auto">
          {/* Hero区域 - 全新设计 */}
          <section className="relative overflow-hidden">
            {/* 复杂背景层 */}
            <div className="absolute inset-0">
              {/* 主背景渐变 */}
              <div
                className="absolute inset-0 opacity-90"
                style={{
                  background: `
                    radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 50% 100%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
                    linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.6) 100%)
                  `,
                }}
              >
              </div>

              {/* 深色模式背景 */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-blue-950/95 dark:opacity-100 opacity-0 transition-opacity duration-300">
              </div>

              {/* 动态网格 */}
              <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59, 130, 246, 0.4) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              >
              </div>

              {/* 动画装饰元素 */}
              <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-gradient-to-br from-blue-400/10 via-indigo-400/8 to-purple-400/10 dark:from-blue-500/5 dark:via-indigo-500/4 dark:to-purple-500/5 rounded-full blur-3xl animate-pulse">
              </div>
              <div className="absolute top-1/3 right-1/6 w-80 h-80 bg-gradient-to-br from-purple-400/8 via-pink-400/6 to-rose-400/8 dark:from-purple-500/4 dark:via-pink-500/3 dark:to-rose-500/4 rounded-full blur-3xl animate-pulse delay-1000">
              </div>
              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-emerald-400/8 via-teal-400/6 to-cyan-400/8 dark:from-emerald-500/4 dark:via-teal-500/3 dark:to-cyan-500/4 rounded-full blur-2xl animate-pulse delay-2000">
              </div>

              {/* 装饰线条 */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 via-purple-500/40 via-pink-500/30 to-transparent">
              </div>
            </div>

            {/* Hero内容 */}
            <div className="relative text-center space-y-8 py-12 md:py-16 px-6 max-w-6xl mx-auto">
              {/* 徽章 */}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-sm rounded-full text-blue-800 dark:text-blue-200 text-sm font-semibold border border-blue-200/50 dark:border-blue-700/50 shadow-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse">
                </div>
                <span>🚀 现代化全栈开发模板</span>
                <div className="w-1 h-4 bg-blue-300 dark:bg-blue-600 rounded-full">
                </div>
                <span className="text-green-600 dark:text-green-400 font-bold">
                  v2.0
                </span>
              </div>

              {/* 主标题 */}
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black tracking-tight">
                  <span
                    className="bg-gradient-to-r from-blue-600 via-purple-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent"
                    style={{
                      backgroundSize: "200% 200%",
                      animation: "gradient-flow 6s ease-in-out infinite",
                    }}
                  >
                    Athena
                  </span>
                </h1>

                <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-200 max-w-5xl mx-auto leading-relaxed font-medium">
                  基于{" "}
                  <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
                    Fresh + Deno
                  </span>{" "}
                  的现代化全栈开发模板
                  <br className="hidden md:block" />
                  集成{" "}
                  <span className="font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                    TailwindCSS + Zustand
                  </span>， 为您的下一个项目提供完美起点
                </p>
              </div>

              {/* 技术栈标签 */}
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {[
                  {
                    name: "Fresh",
                    color: "from-emerald-500 to-teal-500",
                    icon: "🌱",
                  },
                  {
                    name: "Deno",
                    color: "from-gray-700 to-gray-900",
                    icon: "🦕",
                  },
                  {
                    name: "TypeScript",
                    color: "from-blue-500 to-blue-700",
                    icon: "📘",
                  },
                  {
                    name: "TailwindCSS",
                    color: "from-cyan-500 to-blue-500",
                    icon: "🎨",
                  },
                  {
                    name: "Zustand",
                    color: "from-orange-500 to-red-500",
                    icon: "🐻",
                  },
                ].map((tech, index) => (
                  <div
                    key={tech.name}
                    className={`inline-flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl text-sm font-semibold border border-gray-200/50 dark:border-gray-700/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-lg">{tech.icon}</span>
                    <span
                      className={`text-transparent bg-gradient-to-r ${tech.color} bg-clip-text`}
                    >
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA按钮组 - 重新设计 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <a href="/components" className="group">
                  <button
                    type="button"
                    className="relative px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-3xl hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-500 flex items-center gap-3 overflow-hidden"
                  >
                    {/* 按钮背景动画 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent group-hover:animate-shimmer">
                    </div>

                    <span className="relative z-10">开始探索</span>
                    <svg
                      className="relative z-10 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </a>

                <a
                  href="https://github.com/dext7r/athena.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <button
                    type="button"
                    className="relative px-10 py-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white font-bold text-lg rounded-2xl border-2 border-gray-200/60 dark:border-gray-700/60 hover:border-blue-300 dark:hover:border-blue-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 flex items-center gap-3"
                  >
                    <svg
                      className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>查看源码</span>
                  </button>
                </a>
              </div>
            </div>
          </section>

          {/* 特性展示 - 全新布局 */}
          <section className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                为什么选择{" "}
                <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  Athena
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                集成最新技术栈，提供开箱即用的现代化开发体验
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* 现代化技术栈 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 group-hover:scale-105">
                </div>
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      🚀
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      现代化技术栈
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Fresh (Deno + Preact)",
                        color: "from-emerald-500 to-teal-500",
                      },
                      {
                        name: "TailwindCSS + Sass",
                        color: "from-cyan-500 to-blue-500",
                      },
                      {
                        name: "Zustand 状态管理",
                        color: "from-orange-500 to-red-500",
                      },
                      {
                        name: "TypeScript 支持",
                        color: "from-blue-500 to-indigo-500",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center group/item">
                        <div
                          className={`w-3 h-3 bg-gradient-to-r ${item.color} rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200`}
                        >
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 丰富的组件库 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-rose-500/15 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 group-hover:scale-105">
                </div>
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      🎨
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      丰富的组件库
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        name: "按钮、卡片、输入框",
                        color: "from-pink-500 to-rose-500",
                      },
                      {
                        name: "模态框、侧边栏",
                        color: "from-rose-500 to-orange-500",
                      },
                      {
                        name: "主题切换支持",
                        color: "from-orange-500 to-amber-500",
                      },
                      {
                        name: "响应式设计",
                        color: "from-amber-500 to-yellow-500",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center group/item">
                        <div
                          className={`w-3 h-3 bg-gradient-to-r ${item.color} rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200`}
                        >
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 实用 Hooks */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 group-hover:scale-105">
                </div>
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      🔧
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      实用 Hooks
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        name: "useLocalStorage",
                        color: "from-emerald-500 to-teal-500",
                      },
                      {
                        name: "useDebounce",
                        color: "from-teal-500 to-cyan-500",
                      },
                      { name: "useFetch", color: "from-cyan-500 to-blue-500" },
                      {
                        name: "useMediaQuery",
                        color: "from-blue-500 to-indigo-500",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center group/item">
                        <div
                          className={`w-3 h-3 bg-gradient-to-r ${item.color} rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-200`}
                        >
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 交互演示 - 重新设计 */}
          <section className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                在线体验{" "}
                <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                  演示
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                实时体验组件效果和交互功能
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* 计数器演示 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-indigo-500/20 rounded-4xl blur-2xl group-hover:blur-3xl transition-all duration-700 group-hover:scale-105">
                </div>
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-10 rounded-4xl shadow-2xl border border-white/60 dark:border-gray-700/60 hover:shadow-3xl transition-all duration-700 group-hover:-translate-y-3">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                        🎯
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        计数器演示
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      体验状态管理和交互效果
                    </p>
                  </div>
                  <CounterDemo />
                </div>
              </div>

              {/* 按钮演示 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-pink-500/20 rounded-4xl blur-2xl group-hover:blur-3xl transition-all duration-700 group-hover:scale-105">
                </div>
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-10 rounded-4xl shadow-2xl border border-white/60 dark:border-gray-700/60 hover:shadow-3xl transition-all duration-700 group-hover:-translate-y-3">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                        🎨
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        按钮组件演示
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      多种样式和状态的按钮组件
                    </p>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        基础样式
                      </h4>
                      <div className="flex flex-wrap gap-4">
                        <Button variant="primary">主要按钮</Button>
                        <Button variant="secondary">次要按钮</Button>
                        <Button variant="outline">边框按钮</Button>
                        <Button variant="ghost">幽灵按钮</Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full">
                        </div>
                        特殊效果
                      </h4>
                      <div className="flex flex-wrap gap-4">
                        <Button variant="gradient">渐变按钮</Button>
                        <Button variant="glass">玻璃态按钮</Button>
                        <Button loading>加载中...</Button>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-gray-200/60 dark:border-gray-700/60">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full">
                          </div>
                          主题切换：
                        </span>
                        <ThemeToggle />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 快速开始 - 重新设计 */}
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-800 dark:to-blue-900/20 rounded-4xl">
            </div>
            <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-12 rounded-4xl shadow-2xl border border-white/80 dark:border-gray-700/80 text-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                    准备好开始了吗？
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    探索更多功能和组件演示，开始您的现代化开发之旅
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <a href="/components" className="group">
                    <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto">
                      <span>查看组件</span>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </a>
                  <a href="/hooks" className="group">
                    <button className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white font-bold text-lg rounded-2xl border-2 border-gray-200/60 dark:border-gray-700/60 hover:border-blue-300 dark:hover:border-blue-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                      Hooks演示
                    </button>
                  </a>
                  <a href="/state" className="group">
                    <button className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white font-bold text-lg rounded-2xl border-2 border-gray-200/60 dark:border-gray-700/60 hover:border-purple-300 dark:hover:border-purple-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                      状态管理
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
