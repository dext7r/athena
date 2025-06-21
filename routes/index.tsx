import { Head } from "$fresh/runtime.ts";
import Layout from "@components/layout/Layout.tsx";
import Button from "@components/ui/Button.tsx";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/ui/Card.tsx";
import CounterDemo from "@islands/CounterDemo.tsx";
import ThemeToggle from "@islands/ThemeToggle.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Athena - 首页</title>
        <meta
          name="description"
          content="一个现代化的 React + Deno + TailwindCSS + Sass + Zustand 模板项目，集成了完整的组件库、状态管理、自定义Hooks和开发工具配置。"
        />
        <meta
          name="keywords"
          content="React, Deno, TailwindCSS, Sass, Zustand, Fresh, TypeScript, 模板, 组件库"
        />
        <meta property="og:title" content="Athena  - 首页" />
        <meta
          property="og:description"
          content="一个现代化的 React + Deno + TailwindCSS + Sass + Zustand 模板项目，集成了完整的组件库、状态管理、自定义Hooks和开发工具配置。"
        />
        <meta property="og:type" content="website" />
      </Head>
      <Layout title="Athena  - 首页">
        <div className="space-y-16">
          {/* Hero区域 */}
          <div className="relative overflow-hidden">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
            </div>
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse">
              </div>
              <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000">
              </div>
              <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000">
              </div>
            </div>

            {/* Hero内容 */}
            <div className="relative text-center space-y-8 py-20 px-4">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-800 dark:text-blue-200 text-sm font-medium">
                  🚀 现代化全栈开发模板
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Athena
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  一个现代化的{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    React + Deno
                  </span>{" "}
                  全栈开发模板， 集成了{" "}
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    TailwindCSS + Sass + Zustand
                  </span>， 为您提供完整的项目基础架构。
                </p>
              </div>

              {/* CTA按钮组 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="/components" className="group">
                  <button
                    type="button"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    <span>开始探索</span>
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
                <a
                  href="https://github.com/dext7r/athena.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <button
                    type="button"
                    className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>查看源码</span>
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* 特性展示 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 现代化技术栈 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200">
              </div>
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mr-4">
                    🚀
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    现代化技术栈
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3">
                    </div>
                    <span>
                      <strong className="text-blue-600 dark:text-blue-400">
                        Fresh
                      </strong>{" "}
                      (Deno + Preact)
                    </span>
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3">
                    </div>
                    <span>
                      <strong className="text-purple-600 dark:text-purple-400">
                        TailwindCSS
                      </strong>{" "}
                      + Sass
                    </span>
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3">
                    </div>
                    <span>
                      <strong className="text-indigo-600 dark:text-indigo-400">
                        Zustand
                      </strong>{" "}
                      状态管理
                    </span>
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3">
                    </div>
                    <span>
                      <strong className="text-blue-600 dark:text-blue-400">
                        TypeScript
                      </strong>{" "}
                      支持
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 丰富的组件库 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200">
              </div>
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mr-4">
                    🎨
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    丰富的组件库
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-3">
                    </div>
                    <span>按钮、卡片、输入框</span>
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3">
                    </div>
                    <span>模态框、侧边栏</span>
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span>主题切换支持</span>
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-3">
                    </div>
                    <span>响应式设计</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 实用 Hooks */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200">
              </div>
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mr-4">
                    🔧
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    实用 Hooks
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3">
                    </div>
                    <span>
                      <strong className="text-green-600 dark:text-green-400">
                        useLocalStorage
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3">
                    </div>
                    <span>
                      <strong className="text-teal-600 dark:text-teal-400">
                        useDebounce
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3">
                    </div>
                    <span>
                      <strong className="text-emerald-600 dark:text-emerald-400">
                        useFetch
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3">
                    </div>
                    <span>
                      <strong className="text-green-600 dark:text-green-400">
                        useMediaQuery
                      </strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 交互演示 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 计数器演示 */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur opacity-20">
              </div>
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    🎯 计数器演示
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    体验状态管理和交互效果
                  </p>
                </div>
                <CounterDemo />
              </div>
            </div>

            {/* 按钮演示 */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl blur opacity-20">
              </div>
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    🎨 按钮组件演示
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    多种样式和状态的按钮组件
                  </p>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      基础样式
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="primary">主要按钮</Button>
                      <Button variant="secondary">次要按钮</Button>
                      <Button variant="outline">边框按钮</Button>
                      <Button variant="ghost">幽灵按钮</Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      特殊效果
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="gradient">渐变按钮</Button>
                      <Button variant="glass">玻璃态按钮</Button>
                      <Button loading>加载中...</Button>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        主题切换：
                      </span>
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 快速开始 */}
          <Card variant="glass" className="text-center">
            <CardHeader>
              <CardTitle>快速开始</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                探索更多功能和组件演示
              </p>
              <div className="flex justify-center gap-4">
                <a href="/components">
                  <Button variant="primary">查看组件</Button>
                </a>
                <a href="/hooks">
                  <Button variant="outline">Hooks演示</Button>
                </a>
                <a href="/state">
                  <Button variant="outline">状态管理</Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
}
