
import Layout from "@components/layout/Layout.tsx";
import Button from "@components/ui/Button.tsx";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/ui/Card.tsx";
import CopyButton from "@islands/CopyButton.tsx";

export default function AboutPage() {
  return (
    <>
      <Layout title="关于项目">
        <div className="space-y-32">
          {/* Hero区域 - 全新设计 */}
          <section className="relative overflow-hidden min-h-screen flex items-center">
            {/* 复杂背景层 */}
            <div className="absolute inset-0">
              {/* 主背景渐变 */}
              <div
                className="absolute inset-0 opacity-95"
                style={{
                  background: `
                    radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
                    radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 90% 70%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
                    linear-gradient(135deg, rgba(238, 242, 255, 0.9) 0%, rgba(239, 246, 255, 0.7) 50%, rgba(236, 254, 255, 0.8) 100%)
                  `,
                }}
              >
              </div>

              {/* 深色模式背景 */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/98 via-indigo-950/95 via-blue-950/92 to-cyan-950/95 dark:opacity-100 opacity-0 transition-opacity duration-500">
              </div>

              {/* 动态网格 */}
              <div
                className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px),
                    linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: "60px 60px, 60px 60px, 20px 20px, 20px 20px",
                }}
              >
              </div>

              {/* 动画装饰元素 */}
              <div className="absolute top-1/6 left-1/8 w-96 h-96 bg-gradient-to-br from-indigo-400/12 via-blue-400/10 to-cyan-400/12 dark:from-indigo-500/8 dark:via-blue-500/6 dark:to-cyan-500/8 rounded-full blur-3xl animate-pulse">
              </div>
              <div className="absolute top-1/4 right-1/8 w-80 h-80 bg-gradient-to-br from-blue-400/10 via-cyan-400/8 to-emerald-400/10 dark:from-blue-500/6 dark:via-cyan-500/4 dark:to-emerald-500/6 rounded-full blur-3xl animate-pulse delay-1000">
              </div>
              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-gradient-to-br from-cyan-400/10 via-emerald-400/8 to-green-400/10 dark:from-cyan-500/6 dark:via-emerald-500/4 dark:to-green-500/6 rounded-full blur-2xl animate-pulse delay-2000">
              </div>
              <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/8 via-indigo-400/6 to-blue-400/8 dark:from-purple-500/4 dark:via-indigo-500/3 dark:to-blue-500/4 rounded-full blur-2xl animate-pulse delay-3000">
              </div>

              {/* 装饰线条和形状 */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 via-blue-500/50 via-cyan-500/40 to-transparent">
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 via-cyan-500/50 via-emerald-500/40 to-transparent">
              </div>

              {/* 浮动几何形状 */}
              <div className="absolute top-1/3 left-1/5 w-4 h-4 bg-indigo-500/30 rotate-45 animate-bounce delay-500">
              </div>
              <div className="absolute top-1/2 right-1/5 w-6 h-6 bg-blue-500/25 rounded-full animate-ping delay-1500">
              </div>
              <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-cyan-500/35 rotate-12 animate-pulse delay-2500">
              </div>
            </div>

            {/* Hero内容 */}
            <div className="relative text-center space-y-16 py-32 md:py-40 px-6 max-w-7xl mx-auto w-full">
              {/* 动态徽章 */}
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-50/80 to-blue-50/80 dark:from-indigo-900/40 dark:to-blue-900/40 backdrop-blur-md rounded-2xl text-indigo-800 dark:text-indigo-200 text-base font-bold border border-indigo-200/60 dark:border-indigo-700/60 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse">
                </div>
                <span className="text-lg">🚀</span>
                <span>全栈开发模板</span>
                <div className="w-1 h-6 bg-indigo-300 dark:bg-indigo-600 rounded-full">
                </div>
                <span className="text-blue-600 dark:text-blue-400 font-black text-lg">
                  Athena
                </span>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-500">
                </div>
              </div>

              {/* 主标题 */}
              <div className="space-y-8">
                <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tight leading-none">
                  <span
                    className="bg-gradient-to-r from-indigo-600 via-blue-600 via-cyan-600 via-emerald-600 to-green-600 bg-clip-text text-transparent"
                    style={{
                      backgroundSize: "300% 300%",
                      animation: "gradient-flow 8s ease-in-out infinite",
                    }}
                  >
                    Athena
                  </span>
                </h1>

                <div className="space-y-6">
                  <p className="text-2xl md:text-3xl lg:text-4xl text-gray-700 dark:text-gray-200 max-w-6xl mx-auto leading-relaxed font-semibold">
                    现代化的{" "}
                    <span className="font-black text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text">
                      全栈开发模板
                    </span>
                  </p>
                  <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed">
                    集成了{" "}
                    <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
                      Fresh、Preact、TailwindCSS、Zustand
                    </span>{" "}
                    等最新技术栈
                    <br className="hidden md:block" />
                    为开发者提供完整的项目基础架构
                  </p>
                </div>
              </div>

              {/* 技术栈标签 */}
              <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
                {[
                  {
                    name: "Fresh",
                    color: "from-indigo-500 to-purple-500",
                    icon: "🍃",
                    desc: "现代Web框架",
                  },
                  {
                    name: "Preact",
                    color: "from-blue-500 to-indigo-500",
                    icon: "⚛️",
                    desc: "轻量级React",
                  },
                  {
                    name: "TailwindCSS",
                    color: "from-cyan-500 to-blue-500",
                    icon: "🎨",
                    desc: "原子化CSS",
                  },
                  {
                    name: "TypeScript",
                    color: "from-emerald-500 to-cyan-500",
                    icon: "🔷",
                    desc: "类型安全",
                  },
                  {
                    name: "Zustand",
                    color: "from-green-500 to-emerald-500",
                    icon: "🐻",
                    desc: "状态管理",
                  },
                ].map((tech, index) => (
                  <div
                    key={tech.name}
                    className={`group inline-flex flex-col items-center gap-3 px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl text-sm font-bold border border-gray-200/60 dark:border-gray-700/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 cursor-pointer`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                        {tech.icon}
                      </span>
                      <span
                        className={`text-transparent bg-gradient-to-r ${tech.color} bg-clip-text text-lg`}
                      >
                        {tech.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                      {tech.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* 导航按钮 */}
              <div className="flex flex-wrap justify-center gap-6 pt-12">
                <a
                  href="#features"
                  className="group transform hover:scale-105 transition-all duration-300"
                >
                  <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-indigo-500/25 transform hover:scale-105 transition-all duration-500 flex items-center gap-3 text-lg">
                    <span className="text-xl">✨</span>
                    <span>核心特性</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
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
                <a
                  href="#quickstart"
                  className="group transform hover:scale-105 transition-all duration-300"
                >
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-500 flex items-center gap-3 text-lg">
                    <span className="text-xl">🚀</span>
                    <span>快速开始</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
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

              {/* 滚动指示器 */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-indigo-500/50 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-indigo-500 rounded-full mt-2 animate-pulse">
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 技术栈 - 重新设计 */}
          <section className="relative py-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center space-y-8 mb-20">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-full text-indigo-800 dark:text-indigo-200 font-semibold">
                  <span className="text-xl">🚀</span>
                  <span>技术栈</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white">
                  现代化的{" "}
                  <span className="text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text">
                    技术架构
                  </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
                  精心挑选的技术栈，为现代Web开发提供最佳实践
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "前端框架",
                    icon: "⚛️",
                    gradient: "from-indigo-500 to-purple-500",
                    bgGradient:
                      "from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20",
                    technologies: [
                      { name: "Fresh", desc: "Deno的现代Web框架", icon: "🍃" },
                      {
                        name: "Preact",
                        desc: "轻量级React替代方案",
                        icon: "⚛️",
                      },
                      {
                        name: "Islands架构",
                        desc: "最佳性能的渲染策略",
                        icon: "🏝️",
                      },
                      {
                        name: "TypeScript",
                        desc: "类型安全的JavaScript",
                        icon: "🔷",
                      },
                    ],
                  },
                  {
                    title: "样式系统",
                    icon: "🎨",
                    gradient: "from-blue-500 to-cyan-500",
                    bgGradient:
                      "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
                    technologies: [
                      {
                        name: "TailwindCSS",
                        desc: "原子化CSS框架",
                        icon: "🎨",
                      },
                      { name: "Sass", desc: "CSS预处理器", icon: "💅" },
                      { name: "CSS变量", desc: "动态主题支持", icon: "🌈" },
                      { name: "响应式设计", desc: "移动端优先", icon: "📱" },
                    ],
                  },
                  {
                    title: "状态管理",
                    icon: "🐻",
                    gradient: "from-cyan-500 to-emerald-500",
                    bgGradient:
                      "from-cyan-50 to-emerald-50 dark:from-cyan-900/20 dark:to-emerald-900/20",
                    technologies: [
                      { name: "Zustand", desc: "轻量级状态管理", icon: "🐻" },
                      { name: "持久化", desc: "自动本地存储", icon: "💾" },
                      { name: "DevTools", desc: "开发调试支持", icon: "🔧" },
                      { name: "TypeScript", desc: "完整类型支持", icon: "🛡️" },
                    ],
                  },
                  {
                    title: "开发工具",
                    icon: "🛠️",
                    gradient: "from-emerald-500 to-green-500",
                    bgGradient:
                      "from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20",
                    technologies: [
                      {
                        name: "Deno",
                        desc: "现代JavaScript运行时",
                        icon: "🦕",
                      },
                      { name: "热重载", desc: "快速开发体验", icon: "🔥" },
                      { name: "ESLint", desc: "代码质量检查", icon: "✅" },
                      { name: "Prettier", desc: "代码格式化", icon: "✨" },
                    ],
                  },
                ].map((category, index) => (
                  <div
                    key={category.title}
                    className={`group relative p-8 bg-gradient-to-br ${category.bgGradient} rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          {category.icon}
                        </div>
                        <h3
                          className={`text-2xl font-bold text-transparent bg-gradient-to-r ${category.gradient} bg-clip-text`}
                        >
                          {category.title}
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {category.technologies.map((tech, techIndex) => (
                          <div
                            key={techIndex}
                            className="flex items-center gap-4 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300"
                          >
                            <span className="text-xl">{tech.icon}</span>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {tech.name}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {tech.desc}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
                    >
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 核心特性 - 重新设计 */}
          <section
            id="features"
            className="relative py-24 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center space-y-8 mb-20">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-full text-indigo-800 dark:text-indigo-200 font-semibold">
                  <span className="text-xl">✨</span>
                  <span>核心特性</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white">
                  强大的{" "}
                  <span className="text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text">
                    功能特性
                  </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
                  为现代Web开发精心设计的功能集合
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "丰富的UI组件",
                    icon: "🎨",
                    description:
                      "包含按钮、卡片、输入框、模态框等常用组件，支持多种样式变体",
                    gradient: "from-indigo-500 to-purple-500",
                    bgGradient:
                      "from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20",
                    features: [
                      "多种变体",
                      "响应式设计",
                      "主题适配",
                      "易于定制",
                    ],
                  },
                  {
                    title: "实用Hooks库",
                    icon: "🔧",
                    description:
                      "提供useLocalStorage、useDebounce、useFetch等实用hooks",
                    gradient: "from-blue-500 to-cyan-500",
                    bgGradient:
                      "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
                    features: ["性能优化", "类型安全", "易于使用", "可组合"],
                  },
                  {
                    title: "主题切换",
                    icon: "🌙",
                    description: "支持亮色、暗色和系统主题，自动保存用户偏好",
                    gradient: "from-cyan-500 to-emerald-500",
                    bgGradient:
                      "from-cyan-50 to-emerald-50 dark:from-cyan-900/20 dark:to-emerald-900/20",
                    features: ["三种模式", "自动保存", "平滑切换", "系统同步"],
                  },
                  {
                    title: "响应式设计",
                    icon: "📱",
                    description: "完美适配桌面端、平板和移动端设备",
                    gradient: "from-emerald-500 to-green-500",
                    bgGradient:
                      "from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20",
                    features: ["移动优先", "断点系统", "触摸友好", "性能优化"],
                  },
                  {
                    title: "高性能",
                    icon: "⚡",
                    description:
                      "基于Islands架构，实现最佳的加载性能和用户体验",
                    gradient: "from-green-500 to-lime-500",
                    bgGradient:
                      "from-green-50 to-lime-50 dark:from-green-900/20 dark:to-lime-900/20",
                    features: [
                      "Islands架构",
                      "按需加载",
                      "SSR优化",
                      "缓存策略",
                    ],
                  },
                  {
                    title: "类型安全",
                    icon: "🔒",
                    description:
                      "全面的TypeScript支持，提供完整的类型检查和智能提示",
                    gradient: "from-lime-500 to-yellow-500",
                    bgGradient:
                      "from-lime-50 to-yellow-50 dark:from-lime-900/20 dark:to-yellow-900/20",
                    features: ["完整类型", "智能提示", "编译检查", "重构安全"],
                  },
                ].map((feature, index) => (
                  <div
                    key={feature.title}
                    className={`group relative p-8 bg-gradient-to-br ${feature.bgGradient} rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="space-y-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {feature.icon}
                      </div>
                      <div className="space-y-3">
                        <h3
                          className={`text-2xl font-bold text-transparent bg-gradient-to-r ${feature.gradient} bg-clip-text`}
                        >
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {feature.features.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
                          >
                            <div
                              className={`w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full`}
                            >
                            </div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
                    >
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 项目结构 - 美化版 */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text">
                📁 项目结构
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                清晰的目录结构，模块化的架构设计
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* 目录树可视化 */}
              <Card variant="glass" className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center text-white text-lg">
                      🗂️
                    </div>
                    <span>目录结构</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 font-mono text-sm overflow-x-auto">
                    <div className="space-y-1 text-neutral-800 dark:text-neutral-200">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 dark:text-blue-400">
                          📁
                        </span>
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">
                          athena/
                        </span>
                      </div>
                      <div className="ml-4 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 dark:text-green-400">
                            ├── 📁
                          </span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            components/
                          </span>
                          <span className="text-xs text-neutral-500 bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded">
                            UI组件
                          </span>
                        </div>
                        <div className="ml-8 space-y-1 text-neutral-600 dark:text-neutral-400">
                          <div>
                            ├── ui/{" "}
                            <span className="text-xs opacity-75">
                              # 基础UI组件
                            </span>
                          </div>
                          <div>
                            ├── layout/{" "}
                            <span className="text-xs opacity-75">
                              # 布局组件
                            </span>
                          </div>
                          <div>
                            └── auth/{" "}
                            <span className="text-xs opacity-75">
                              # 认证组件
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-green-600 dark:text-green-400">
                            ├── 📁
                          </span>
                          <span className="font-semibold text-purple-600 dark:text-purple-400">
                            hooks/
                          </span>
                          <span className="text-xs text-neutral-500 bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded">
                            自定义Hooks
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-green-600 dark:text-green-400">
                            ├── 📁
                          </span>
                          <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                            islands/
                          </span>
                          <span className="text-xs text-neutral-500 bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded">
                            交互组件
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-green-600 dark:text-green-400">
                            ├── 📁
                          </span>
                          <span className="font-semibold text-orange-600 dark:text-orange-400">
                            routes/
                          </span>
                          <span className="text-xs text-neutral-500 bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded">
                            页面路由
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-green-600 dark:text-green-400">
                            ├── 📁
                          </span>
                          <span className="font-semibold text-pink-600 dark:text-pink-400">
                            static/
                          </span>
                          <span className="text-xs text-neutral-500 bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded">
                            静态资源
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-green-600 dark:text-green-400">
                            ├── 📁
                          </span>
                          <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                            stores/
                          </span>
                          <span className="text-xs text-neutral-500 bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded">
                            状态管理
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-green-600 dark:text-green-400">
                            ├── 📁
                          </span>
                          <span className="font-semibold text-teal-600 dark:text-teal-400">
                            styles/
                          </span>
                          <span className="text-xs text-neutral-500 bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded">
                            样式文件
                          </span>
                        </div>
                        <div className="ml-8 space-y-1 text-neutral-600 dark:text-neutral-400">
                          <div>
                            ├── base/{" "}
                            <span className="text-xs opacity-75">
                              # 基础样式
                            </span>
                          </div>
                          <div>
                            ├── components/{" "}
                            <span className="text-xs opacity-75">
                              # 组件样式
                            </span>
                          </div>
                          <div>
                            ├── utilities/{" "}
                            <span className="text-xs opacity-75"># 工具类</span>
                          </div>
                          <div>
                            └── variables/{" "}
                            <span className="text-xs opacity-75">
                              # 变量定义
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-green-600 dark:text-green-400">
                            ├── 📁
                          </span>
                          <span className="font-semibold text-red-600 dark:text-red-400">
                            utils/
                          </span>
                          <span className="text-xs text-neutral-500 bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded">
                            工具函数
                          </span>
                        </div>

                        <div className="mt-3 space-y-1 text-neutral-600 dark:text-neutral-400">
                          <div className="flex items-center gap-2">
                            <span className="text-green-600 dark:text-green-400">
                              ├── 📄
                            </span>
                            <span className="text-blue-600 dark:text-blue-400">
                              deno.json
                            </span>
                            <span className="text-xs opacity-75">
                              # Deno配置
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-green-600 dark:text-green-400">
                              ├── 📄
                            </span>
                            <span className="text-blue-600 dark:text-blue-400">
                              fresh.config.ts
                            </span>
                            <span className="text-xs opacity-75">
                              # Fresh配置
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-green-600 dark:text-green-400">
                              └── 📄
                            </span>
                            <span className="text-blue-600 dark:text-blue-400">
                              tailwind.config.ts
                            </span>
                            <span className="text-xs opacity-75">
                              # Tailwind配置
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 架构说明 */}
              <div className="space-y-6">
                {[
                  {
                    title: "组件架构",
                    icon: "🧩",
                    color: "from-indigo-500 to-purple-500",
                    description: "模块化的组件设计，易于维护和扩展",
                    items: ["UI组件库", "布局组件", "业务组件", "认证组件"],
                  },
                  {
                    title: "Islands架构",
                    icon: "🏝️",
                    color: "from-blue-500 to-cyan-500",
                    description: "客户端交互组件，实现最佳性能",
                    items: ["按需加载", "独立渲染", "状态隔离", "SEO友好"],
                  },
                  {
                    title: "样式系统",
                    icon: "🎨",
                    color: "from-cyan-500 to-emerald-500",
                    description: "模块化的样式管理，支持主题切换",
                    items: [
                      "Sass模块化",
                      "Tailwind原子化",
                      "主题变量",
                      "响应式设计",
                    ],
                  },
                  {
                    title: "状态管理",
                    icon: "🐻",
                    color: "from-emerald-500 to-green-500",
                    description: "轻量级状态管理，类型安全",
                    items: [
                      "Zustand集成",
                      "持久化存储",
                      "类型安全",
                      "开发工具",
                    ],
                  },
                ].map((item, index) => (
                  <Card
                    key={item.title}
                    variant="hover"
                    className="p-6 group hover:shadow-glow transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3
                          className={`text-xl font-bold text-transparent bg-gradient-to-r ${item.color} bg-clip-text`}
                        >
                          {item.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {item.items.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400"
                            >
                              <div
                                className={`w-1.5 h-1.5 bg-gradient-to-r ${item.color} rounded-full`}
                              >
                              </div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* 快速开始 - 美化版 */}
          <section id="quickstart" className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text">
                🚀 快速开始
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                三个步骤，快速启动你的开发之旅
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* 安装步骤 */}
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "克隆项目",
                    description: "从GitHub获取最新的项目代码",
                    command: "git clone https://github.com/dext7r/athena.git",
                    icon: "📥",
                    color: "from-emerald-500 to-green-500",
                  },
                  {
                    step: "02",
                    title: "进入目录",
                    description: "切换到项目根目录",
                    command: "cd athena",
                    icon: "📁",
                    color: "from-green-500 to-teal-500",
                  },
                  {
                    step: "03",
                    title: "启动服务",
                    description: "启动开发服务器，开始开发",
                    command: "deno task start",
                    icon: "🚀",
                    color: "from-teal-500 to-cyan-500",
                  },
                ].map((item, index) => (
                  <Card
                    key={item.step}
                    variant="glass"
                    className="p-6 group hover:shadow-glow transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex flex-col items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
                      >
                        <span className="text-xs font-bold opacity-80">
                          STEP
                        </span>
                        <span className="text-lg font-black">{item.step}</span>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <h3
                            className={`text-xl font-bold text-transparent bg-gradient-to-r ${item.color} bg-clip-text`}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 font-mono text-sm">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-1">
                              <span className="text-emerald-600 dark:text-emerald-400">
                                $
                              </span>
                              <span className="text-neutral-800 dark:text-neutral-200">
                                {item.command}
                              </span>
                            </div>
                            <CopyButton
                              text={item.command}
                              variant="ghost"
                              size="sm"
                              className="flex-shrink-0"
                            >
                              复制
                            </CopyButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* 一键复制命令 */}
              <Card variant="glass" className="p-8 h-fit">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center text-white text-lg">
                      ⚡
                    </div>
                    <span>一键启动命令</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                      <div className="space-y-3 font-mono text-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                            <span className="text-emerald-600 dark:text-emerald-400">
                              #
                            </span>
                            <span>快速启动脚本</span>
                          </div>
                          <CopyButton
                            text={`git clone https://github.com/dext7r/athena.git
cd athena
deno task start`}
                            variant="ghost"
                            size="sm"
                            className="text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                          >
                            全部复制
                          </CopyButton>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-2 flex-1">
                              <span className="text-emerald-600 dark:text-emerald-400">
                                $
                              </span>
                              <span className="text-neutral-800 dark:text-neutral-200">
                                git clone https://github.com/dext7r/athena.git
                              </span>
                            </div>
                            <CopyButton
                              text="git clone https://github.com/dext7r/athena.git"
                              variant="ghost"
                              size="sm"
                              className="text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </div>
                          <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-2 flex-1">
                              <span className="text-emerald-600 dark:text-emerald-400">
                                $
                              </span>
                              <span className="text-neutral-800 dark:text-neutral-200">
                                cd athena
                              </span>
                            </div>
                            <CopyButton
                              text="cd athena"
                              variant="ghost"
                              size="sm"
                              className="text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </div>
                          <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-2 flex-1">
                              <span className="text-emerald-600 dark:text-emerald-400">
                                $
                              </span>
                              <span className="text-neutral-800 dark:text-neutral-200">
                                deno task start
                              </span>
                            </div>
                            <CopyButton
                              text="deno task start"
                              variant="ghost"
                              size="sm"
                              className="text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <CopyButton
                        text={`git clone https://github.com/dext7r/athena.git
cd athena
deno task start`}
                        variant="default"
                        size="lg"
                        className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
                      >
                        复制所有命令
                      </CopyButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 相关链接 */}
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                📚 相关资源
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  {
                    name: "GitHub源码",
                    url: "https://github.com/dext7r/athena.git",
                    icon: "🔗",
                    variant: "primary" as const,
                  },
                  {
                    name: "Fresh文档",
                    url: "https://fresh.deno.dev",
                    icon: "📖",
                    variant: "secondary" as const,
                  },
                  {
                    name: "Deno官网",
                    url: "https://deno.land",
                    icon: "🦕",
                    variant: "outline" as const,
                  },
                  {
                    name: "TailwindCSS",
                    url: "https://tailwindcss.com",
                    icon: "🎨",
                    variant: "outline" as const,
                  },
                  {
                    name: "Preact文档",
                    url: "https://preactjs.com",
                    icon: "⚛️",
                    variant: "outline" as const,
                  },
                  {
                    name: "Zustand文档",
                    url: "https://docs.pmnd.rs/zustand",
                    icon: "🐻",
                    variant: "outline" as const,
                  },
                ].map((link, index) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-element cursor-none"
                  >
                    <Button variant={link.variant} size="lg" className="gap-2">
                      <span>{link.icon}</span>
                      <span>{link.name}</span>
                    </Button>
                  </a>
                ))}
              </div>
            </div>

            {/* 系统要求 */}
            <Card variant="glass" className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-lg">
                    ⚙️
                  </div>
                  <span>系统要求</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Deno运行时",
                      requirement: "v1.37+",
                      description: "现代化的JavaScript/TypeScript运行时",
                      icon: "🦕",
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      title: "Node.js (可选)",
                      requirement: "v18+",
                      description: "用于某些开发工具和依赖",
                      icon: "📦",
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      title: "现代浏览器",
                      requirement: "ES2020+",
                      description: "支持现代Web标准的浏览器",
                      icon: "🌐",
                      color: "from-purple-500 to-pink-500",
                    },
                  ].map((req, index) => (
                    <div key={req.title} className="text-center space-y-3">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${req.color} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto`}
                      >
                        {req.icon}
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-bold text-neutral-800 dark:text-neutral-200">
                          {req.title}
                        </h4>
                        <div
                          className={`inline-block px-3 py-1 bg-gradient-to-r ${req.color} text-white text-sm font-bold rounded-full`}
                        >
                          {req.requirement}
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {req.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* 自定义样式 */}
        <style jsx>
          {`
          @keyframes gradient-flow {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
        `}
        </style>
      </Layout>
    </>
  );
}
