import { Head } from "$fresh/runtime.ts";
import Layout from "@components/layout/Layout.tsx";
import CodeBlock from "@islands/CodeBlock.tsx";
import HooksDemo from "@islands/HooksDemo.tsx";

export default function HooksPage() {
  return (
    <>
      <Head>
        <title>Hooks演示 - Athena 自定义Hooks集合</title>
        <meta
          name="description"
          content="探索 Athena 强大的自定义 Hooks 集合，包括 useLocalStorage、useDebounce、useFetch、useMediaQuery 等实用工具。提高开发效率，简化状态管理。"
        />
        <meta
          name="keywords"
          content="React Hooks, 自定义Hooks, useLocalStorage, useDebounce, useFetch, useMediaQuery, useToggle, useCounter, Fresh框架, Preact Hooks"
        />
        <meta
          property="og:title"
          content="Hooks演示 - Athena 自定义Hooks集合"
        />
        <meta
          property="og:description"
          content="探索 Athena 强大的自定义 Hooks 集合，提高开发效率，简化状态管理。"
        />
        <meta property="og:type" content="website" />
      </Head>
      <Layout title="Hooks演示">
        <div className="space-y-16 max-w-7xl mx-auto px-6">
          {/* Hero区域 - 简化版 */}
          <section className="relative text-center py-16 animate-fade-in">
            {/* 背景装饰 */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-success-400/20 rounded-full blur-3xl animate-float">
              </div>
              <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-accent-400/20 rounded-full blur-2xl animate-float-delayed">
              </div>
              <div className="absolute bottom-1/4 left-1/2 w-28 h-28 bg-primary-400/20 rounded-full blur-2xl animate-float-small">
              </div>
            </div>

            <div className="space-y-8">
              {/* 徽章 */}
              <div className="inline-flex items-center gap-3 px-6 py-3 glass rounded-2xl animate-slide-up">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse">
                </div>
                <span className="text-lg">🔧</span>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                  自定义 Hooks 工具集
                </span>
                <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-600">
                </div>
                <span className="font-bold text-success-600 dark:text-success-400">
                  实用工具
                </span>
              </div>

              {/* 主标题 */}
              <div className="space-y-4 animate-slide-up animate-delay-100">
                <h1 className="text-5xl md:text-7xl font-display font-black text-gradient-secondary">
                  Hooks 演示
                </h1>
                <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                  探索{" "}
                  <span className="font-bold text-success-600 dark:text-success-400">
                    Athena Hooks
                  </span>{" "}
                  的强大功能
                </p>
              </div>

              {/* 特性标签 */}
              <div className="flex flex-wrap justify-center gap-3 animate-slide-up animate-delay-200">
                {[
                  {
                    name: "状态管理",
                    icon: "📊",
                    color: "from-primary-500 to-primary-600",
                  },
                  {
                    name: "性能优化",
                    icon: "⚡",
                    color: "from-secondary-500 to-secondary-600",
                  },
                  {
                    name: "数据持久化",
                    icon: "💾",
                    color: "from-accent-500 to-accent-600",
                  },
                  {
                    name: "响应式设计",
                    icon: "📱",
                    color: "from-success-500 to-success-600",
                  },
                  {
                    name: "TypeScript",
                    icon: "🔷",
                    color: "from-warning-500 to-warning-600",
                  },
                ].map((feature, index) => (
                  <div
                    key={feature.name}
                    className="glass px-4 py-2 rounded-xl hover:shadow-glow transition-all duration-300 hover:scale-105 magnetic-element cursor-none"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{feature.icon}</span>
                      <span
                        className={`font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                      >
                        {feature.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 演示区域 */}
          <section className="space-y-12">
            <div className="text-center space-y-4 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 dark:text-white">
                实时演示
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                体验各种自定义 Hooks
                的强大功能，包括状态管理、性能优化和数据持久化
              </p>
            </div>

            {/* 演示组件 */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* 左侧：交互演示 */}
              <div className="space-y-6">
                <div className="card glass p-6 animate-slide-right">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                    Hooks 功能演示
                  </h3>
                  <HooksDemo />
                </div>

                <div className="card glass p-6 animate-slide-right animate-delay-100">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                    可用的 Hooks
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        icon: "💾",
                        name: "useLocalStorage",
                        desc: "本地存储状态管理",
                      },
                      {
                        icon: "⏱️",
                        name: "useDebounce",
                        desc: "防抖处理优化性能",
                      },
                      { icon: "🔄", name: "useToggle", desc: "布尔值状态切换" },
                      {
                        icon: "🔢",
                        name: "useCounter",
                        desc: "计数器状态管理",
                      },
                      {
                        icon: "📱",
                        name: "useMediaQuery",
                        desc: "响应式媒体查询",
                      },
                      { icon: "🌐", name: "useFetch", desc: "数据获取和缓存" },
                    ].map((hook, index) => (
                      <div
                        key={hook.name}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                      >
                        <span className="text-xl">{hook.icon}</span>
                        <div>
                          <h4 className="font-semibold text-neutral-900 dark:text-white">
                            {hook.name}
                          </h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {hook.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 右侧：代码示例 */}
              <div className="space-y-6">
                <div className="animate-slide-left">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                    useLocalStorage Hook
                  </h3>
                  <CodeBlock
                    filePath="/examples/useLocalStorage.ts"
                    showLineNumbers
                  />
                </div>

                <div className="animate-slide-left animate-delay-100">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                    useDebounce Hook
                  </h3>
                  <CodeBlock
                    filePath="/examples/useDebounce.ts"
                    showLineNumbers
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 使用示例 */}
          <section className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 dark:text-white">
                使用示例
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                在实际项目中如何使用这些 Hooks
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <CodeBlock
                filePath="/examples/hooks-usage.tsx"
                showLineNumbers
              />
            </div>
          </section>

          {/* Hooks 分类 */}
          <section className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 dark:text-white">
                Hooks 分类
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                按功能分类的自定义 Hooks 集合
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  category: "状态管理",
                  icon: "📊",
                  color: "from-primary-500 to-primary-600",
                  hooks: [
                    "useLocalStorage",
                    "useSessionStorage",
                    "useToggle",
                    "useCounter",
                  ],
                  desc: "管理组件状态和数据持久化",
                },
                {
                  category: "性能优化",
                  icon: "⚡",
                  color: "from-secondary-500 to-secondary-600",
                  hooks: [
                    "useDebounce",
                    "useThrottle",
                    "useMemo",
                    "useCallback",
                  ],
                  desc: "优化性能和减少不必要的渲染",
                },
                {
                  category: "网络请求",
                  icon: "🌐",
                  color: "from-accent-500 to-accent-600",
                  hooks: ["useFetch", "useAsync", "useApi", "useWebSocket"],
                  desc: "处理异步数据获取和网络通信",
                },
                {
                  category: "DOM 操作",
                  icon: "🖱️",
                  color: "from-success-500 to-success-600",
                  hooks: [
                    "useClickOutside",
                    "useEventListener",
                    "useIntersection",
                    "useScroll",
                  ],
                  desc: "与 DOM 元素和浏览器事件交互",
                },
                {
                  category: "响应式设计",
                  icon: "📱",
                  color: "from-warning-500 to-warning-600",
                  hooks: [
                    "useMediaQuery",
                    "useBreakpoint",
                    "useWindowSize",
                    "useOrientation",
                  ],
                  desc: "响应不同屏幕尺寸和设备特性",
                },
                {
                  category: "工具类",
                  icon: "🔧",
                  color: "from-error-500 to-error-600",
                  hooks: [
                    "useClipboard",
                    "useInterval",
                    "useTimeout",
                    "useRandomId",
                  ],
                  desc: "提供常用的工具函数和实用功能",
                },
              ].map((category, index) => (
                <div
                  key={category.category}
                  className="card glass p-6 hover:shadow-glow transition-all duration-300 hover:scale-105 magnetic-element cursor-none"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-xl shadow-colored`}
                      >
                        {category.icon}
                      </div>
                      <h3 className="font-bold text-neutral-900 dark:text-white">
                        {category.category}
                      </h3>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
                      {category.desc}
                    </p>
                    <div className="space-y-2">
                      {category.hooks.map((hook) => (
                        <div
                          key={hook}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color}`}
                          >
                          </div>
                          <code className="text-neutral-700 dark:text-neutral-300 font-mono">
                            {hook}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 更多资源 */}
          <section className="text-center space-y-8 py-16 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 dark:text-white">
                了解更多
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                深入学习自定义 Hooks 和最佳实践
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://react.dev/reference/react"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary magnetic-element cursor-none"
              >
                📚 React 官方文档
              </a>
              <a
                href="https://preactjs.com/guide/v10/hooks"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary magnetic-element cursor-none"
              >
                🔗 Preact Hooks
              </a>
              <a
                href="/state"
                className="btn-ghost magnetic-element cursor-none"
              >
                🎯 查看状态管理
              </a>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
