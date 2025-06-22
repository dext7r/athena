import { Head } from "$fresh/runtime.ts";
import Layout from "@components/layout/Layout.tsx";
import CodeBlock from "@islands/CodeBlock.tsx";
import SimpleStateDemo from "@islands/SimpleStateDemo.tsx";

export default function StatePage() {
  return (
    <>
      <Head>
        <title>状态管理演示 - Athena</title>
        <meta
          name="description"
          content="展示React状态管理的基本使用方法，包括Zustand状态管理库的实际应用示例。"
        />
        <meta
          name="keywords"
          content="React状态管理, Zustand, 状态管理库, React状态, 状态持久化"
        />
        <meta property="og:title" content="状态管理演示 - Athena " />
        <meta
          property="og:description"
          content="展示React状态管理的基本使用方法，包括Zustand状态管理库的实际应用示例。"
        />
        <meta property="og:type" content="website" />
      </Head>
      <Layout title="状态管理演示">
        <div className="space-y-16 max-w-7xl mx-auto px-6">
          {/* 目录导航 */}
          <nav className="sticky top-20 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 animate-fade-in">
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <a
                href="#demo"
                className="px-3 py-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 magnetic-element cursor-none"
              >
                🎯 实时演示
              </a>
              <a
                href="#features"
                className="px-3 py-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 magnetic-element cursor-none"
              >
                ✨ 功能特点
              </a>
              <a
                href="#code-examples"
                className="px-3 py-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 magnetic-element cursor-none"
              >
                💻 代码示例
              </a>
              <a
                href="#best-practices"
                className="px-3 py-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 magnetic-element cursor-none"
              >
                📋 最佳实践
              </a>
              <a
                href="#resources"
                className="px-3 py-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 magnetic-element cursor-none"
              >
                📚 更多资源
              </a>
            </div>
          </nav>
          {/* Hero区域 - 简化版 */}
          <section className="relative text-center py-16 animate-fade-in">
            {/* 背景装饰 */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-400/20 rounded-full blur-3xl animate-float">
              </div>
              <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-secondary-400/20 rounded-full blur-2xl animate-float-delayed">
              </div>
              <div className="absolute bottom-1/4 left-1/2 w-28 h-28 bg-accent-400/20 rounded-full blur-2xl animate-float-small">
              </div>
            </div>

            <div className="space-y-8">
              {/* 徽章 */}
              <div className="inline-flex items-center gap-3 px-6 py-3 glass rounded-2xl animate-slide-up">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse">
                </div>
                <span className="text-lg">📊</span>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                  状态管理系统
                </span>
                <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-600">
                </div>
                <span className="font-bold text-primary-600 dark:text-primary-400">
                  Zustand
                </span>
              </div>

              {/* 主标题 */}
              <div className="space-y-4 animate-slide-up animate-delay-100">
                <h1 className="text-5xl md:text-7xl font-display font-black text-gradient-primary">
                  状态管理
                </h1>
                <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                  使用{" "}
                  <span className="font-bold text-primary-600 dark:text-primary-400">
                    Zustand
                  </span>{" "}
                  构建高效的状态管理系统
                </p>
              </div>

              {/* 特性标签 */}
              <div className="flex flex-wrap justify-center gap-3 animate-slide-up animate-delay-200">
                {[
                  {
                    name: "轻量级",
                    icon: "🪶",
                    color: "from-primary-500 to-primary-600",
                  },
                  {
                    name: "类型安全",
                    icon: "🛡️",
                    color: "from-secondary-500 to-secondary-600",
                  },
                  {
                    name: "易于使用",
                    icon: "🎯",
                    color: "from-accent-500 to-accent-600",
                  },
                  {
                    name: "状态持久化",
                    icon: "💾",
                    color: "from-success-500 to-success-600",
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
          <section id="demo" className="space-y-12">
            <div className="text-center space-y-4 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 dark:text-white">
                实时演示
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                体验 Zustand 状态管理的强大功能，包括状态持久化和实时更新
              </p>
            </div>

            {/* 演示组件 */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* 左侧：交互演示 */}
              <div className="space-y-6">
                <div className="card glass p-6 animate-slide-right">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                    计数器演示
                  </h3>
                  <SimpleStateDemo />
                </div>

                <div
                  id="features"
                  className="card glass p-6 animate-slide-right animate-delay-100"
                >
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                    功能特点
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        icon: "💾",
                        title: "自动持久化",
                        desc: "状态自动保存到 localStorage",
                      },
                      {
                        icon: "🔄",
                        title: "实时同步",
                        desc: "多个组件间状态实时同步",
                      },
                      {
                        icon: "🎯",
                        title: "简洁API",
                        desc: "直观易用的状态管理接口",
                      },
                      {
                        icon: "⚡",
                        title: "高性能",
                        desc: "最小化重渲染，优秀性能",
                      },
                    ].map((feature, index) => (
                      <div
                        key={feature.title}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                      >
                        <span className="text-xl">{feature.icon}</span>
                        <div>
                          <h4 className="font-semibold text-neutral-900 dark:text-white">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 右侧：代码示例 */}
              <div id="code-examples" className="space-y-6">
                <div className="animate-slide-left">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                    Store 定义
                  </h3>
                  <CodeBlock
                    filePath="/examples/counter-store.ts"
                    showLineNumbers
                  />
                </div>

                <div className="animate-slide-left animate-delay-100">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                    组件使用
                  </h3>
                  <CodeBlock
                    filePath="/examples/counter-component.tsx"
                    showLineNumbers
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 最佳实践 */}
          <section id="best-practices" className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 dark:text-white">
                最佳实践
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                遵循这些最佳实践，构建可维护和高性能的状态管理系统
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "🏗️",
                  title: "模块化设计",
                  desc: "将不同功能的状态分离到不同的 store 中",
                  color: "from-primary-500 to-primary-600",
                },
                {
                  icon: "🔒",
                  title: "类型安全",
                  desc: "使用 TypeScript 确保状态的类型安全",
                  color: "from-secondary-500 to-secondary-600",
                },
                {
                  icon: "⚡",
                  title: "性能优化",
                  desc: "使用选择器避免不必要的重渲染",
                  color: "from-accent-500 to-accent-600",
                },
                {
                  icon: "💾",
                  title: "持久化策略",
                  desc: "合理使用 persist 中间件保存重要状态",
                  color: "from-success-500 to-success-600",
                },
                {
                  icon: "🧪",
                  title: "易于测试",
                  desc: "保持 store 逻辑简单，便于单元测试",
                  color: "from-warning-500 to-warning-600",
                },
                {
                  icon: "📚",
                  title: "文档完善",
                  desc: "为复杂的状态逻辑添加清晰的注释",
                  color: "from-error-500 to-error-600",
                },
              ].map((practice, index) => (
                <div
                  key={practice.title}
                  className="card glass p-6 hover:shadow-glow transition-all duration-300 hover:scale-105 magnetic-element cursor-none"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${practice.color} flex items-center justify-center text-white text-xl shadow-colored`}
                      >
                        {practice.icon}
                      </div>
                      <h3 className="font-bold text-neutral-900 dark:text-white">
                        {practice.title}
                      </h3>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {practice.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 更多资源 */}
          <section
            id="resources"
            className="text-center space-y-8 py-16 animate-fade-in"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 dark:text-white">
                了解更多
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                深入学习 Zustand 和现代状态管理最佳实践
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/pmndrs/zustand"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary magnetic-element cursor-none"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub 仓库
              </a>
              <a
                href="https://docs.pmnd.rs/zustand/getting-started/introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary magnetic-element cursor-none"
              >
                📚 官方文档
              </a>
              <a
                href="/hooks"
                className="btn-ghost magnetic-element cursor-none"
              >
                🔗 查看 Hooks 演示
              </a>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
