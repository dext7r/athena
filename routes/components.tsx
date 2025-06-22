import { Head } from "fresh/runtime";
import Layout from "@components/layout/Layout.tsx";
import ComponentsDemo from "@islands/ComponentsDemo.tsx";

export default function ComponentsPage() {
  return (
    <>
      <Head>
        <title>组件展示 - Athena UI 组件库</title>
        <meta
          name="description"
          content="探索 Athena 完整的 UI 组件库，包括按钮、卡片、输入框、模态框等现代化组件。每个组件都提供多种变体、尺寸和状态。"
        />
        <meta
          name="keywords"
          content="UI组件库, React组件, 按钮组件, 卡片组件, 输入框组件, 模态框组件, Fresh框架, Deno, TypeScript组件"
        />
        <meta property="og:title" content="组件展示 - Athena UI 组件库" />
        <meta
          property="og:description"
          content="探索 Athena 完整的 UI 组件库，包括按钮、卡片、输入框、模态框等现代化组件。"
        />
        <meta property="og:type" content="website" />
      </Head>
      <Layout title="组件展示 - Athena UI 组件库">
        <div className="space-y-24">
          {/* Hero区域 - 重新设计 */}
          <section className="relative overflow-hidden">
            {/* 复杂背景层 */}
            <div className="absolute inset-0">
              {/* 主背景渐变 */}
              <div
                className="absolute inset-0 opacity-90"
                style={{
                  background: `
                    radial-gradient(circle at 20% 30%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 50% 10%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                    linear-gradient(135deg, rgba(252, 231, 243, 0.8) 0%, rgba(240, 244, 255, 0.6) 100%)
                  `,
                }}
              >
              </div>

              {/* 深色模式背景 */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-pink-950/90 to-purple-950/95 dark:opacity-100 opacity-0 transition-opacity duration-300">
              </div>

              {/* 动态网格 */}
              <div
                className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(236, 72, 153, 0.4) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(236, 72, 153, 0.4) 1px, transparent 1px)
                  `,
                  backgroundSize: "32px 32px",
                }}
              >
              </div>

              {/* 动画装饰元素 */}
              <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-gradient-to-br from-pink-400/10 via-rose-400/8 to-purple-400/10 dark:from-pink-500/5 dark:via-rose-500/4 dark:to-purple-500/5 rounded-full blur-3xl animate-pulse">
              </div>
              <div className="absolute top-1/3 right-1/6 w-72 h-72 bg-gradient-to-br from-purple-400/8 via-indigo-400/6 to-blue-400/8 dark:from-purple-500/4 dark:via-indigo-500/3 dark:to-blue-500/4 rounded-full blur-3xl animate-pulse delay-1000">
              </div>
              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-violet-400/8 via-fuchsia-400/6 to-pink-400/8 dark:from-violet-500/4 dark:via-fuchsia-500/3 dark:to-pink-500/4 rounded-full blur-2xl animate-pulse delay-2000">
              </div>

              {/* 装饰线条 */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500/40 via-purple-500/40 via-indigo-500/30 to-transparent">
              </div>
            </div>

            {/* Hero内容 */}
            <div className="relative text-center space-y-12 py-24 md:py-32 px-6 max-w-6xl mx-auto">
              {/* 徽章 */}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/30 dark:to-purple-900/30 backdrop-blur-sm rounded-full text-pink-800 dark:text-pink-200 text-sm font-semibold border border-pink-200/50 dark:border-pink-700/50 shadow-lg">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse">
                </div>
                <span>🎨 UI 组件库</span>
                <div className="w-1 h-4 bg-pink-300 dark:bg-pink-600 rounded-full">
                </div>
                <span className="text-purple-600 dark:text-purple-400 font-bold">
                  全功能
                </span>
              </div>

              {/* 主标题 */}
              <div className="space-y-6">
                <h1 className="text-6xl md:text-8xl font-black tracking-tight">
                  <span
                    className="bg-gradient-to-r from-pink-600 via-purple-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent"
                    style={{
                      backgroundSize: "200% 200%",
                      animation: "gradient-flow 6s ease-in-out infinite",
                    }}
                  >
                    组件展示
                  </span>
                </h1>

                <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-200 max-w-5xl mx-auto leading-relaxed font-medium">
                  探索{" "}
                  <span className="font-bold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text">
                    Athena UI
                  </span>{" "}
                  组件库的强大功能
                  <br className="hidden md:block" />
                  包含{" "}
                  <span className="font-bold text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">
                    按钮、卡片、输入框、模态框
                  </span>{" "}
                  等丰富组件
                </p>
              </div>

              {/* 组件特性标签 */}
              <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
                {[
                  {
                    name: "响应式设计",
                    color: "from-pink-500 to-rose-500",
                    icon: "📱",
                  },
                  {
                    name: "多种变体",
                    color: "from-purple-500 to-violet-500",
                    icon: "🎨",
                  },
                  {
                    name: "主题适配",
                    color: "from-indigo-500 to-blue-500",
                    icon: "🌓",
                  },
                  {
                    name: "无障碍访问",
                    color: "from-emerald-500 to-teal-500",
                    icon: "♿",
                  },
                  {
                    name: "动画效果",
                    color: "from-orange-500 to-red-500",
                    icon: "✨",
                  },
                ].map((feature, index) => (
                  <div
                    key={feature.name}
                    className={`inline-flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl text-sm font-semibold border border-gray-200/50 dark:border-gray-700/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-lg">{feature.icon}</span>
                    <span
                      className={`text-transparent bg-gradient-to-r ${feature.color} bg-clip-text`}
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* 导航按钮 */}
              <div className="flex flex-wrap justify-center gap-4 pt-8">
                <a href="#buttons" className="group">
                  <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    <span>按钮组件</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                <a href="#cards" className="group">
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    <span>卡片组件</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                <a href="#inputs" className="group">
                  <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    <span>输入组件</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                <a href="#modals" className="group">
                  <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    <span>模态框</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
              </div>
            </div>
          </section>

          {/* 组件演示区域 */}
          <section className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                组件{" "}
                <span className="text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text">
                  演示
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                实时体验每个组件的功能和样式变化
              </p>
            </div>

            <ComponentsDemo />
          </section>

          {/* 使用指南 */}
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-gray-800 dark:to-purple-900/20 rounded-4xl">
            </div>
            <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-12 rounded-4xl shadow-2xl border border-white/80 dark:border-gray-700/80">
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                    开始使用组件
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    所有组件都采用 TypeScript 编写，提供完整的类型定义和 API
                    文档
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      📋
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      复制代码
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      直接复制组件代码到您的项目中使用
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      ⚙️
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      自定义样式
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      通过 props 轻松自定义组件的外观和行为
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      🚀
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      快速开发
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      开箱即用的组件，加速您的开发流程
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
                  <a
                    href="https://github.com/dext7r/athena.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <button className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span>查看源码</span>
                    </button>
                  </a>
                  <a href="/hooks" className="group">
                    <button className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white font-bold text-lg rounded-2xl border-2 border-gray-200/60 dark:border-gray-700/60 hover:border-pink-300 dark:hover:border-pink-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                      探索 Hooks
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
