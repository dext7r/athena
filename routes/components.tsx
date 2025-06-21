import { Head } from "$fresh/runtime.ts";
import Layout from "@components/layout/Layout.tsx";
import ComponentsDemo from "@islands/ComponentsDemo.tsx";

export default function ComponentsPage() {
  return (
    <>
      <Head>
        <title>组件展示 - Athena</title>
        <meta
          name="description"
          content="展示所有可用的UI组件及其不同变体，包括按钮、卡片、输入框、模态框等丰富的组件库。"
        />
        <meta
          name="keywords"
          content="UI组件, 按钮, 卡片, 输入框, 模态框, React组件, 组件库"
        />
        <meta property="og:title" content="组件展示 - Athena " />
        <meta
          property="og:description"
          content="展示所有可用的UI组件及其不同变体，包括按钮、卡片、输入框、模态框等丰富的组件库。"
        />
        <meta property="og:type" content="website" />
      </Head>
      <Layout title="组件展示">
        <div className="space-y-16">
          {/* 页面标题 */}
          <div className="relative overflow-hidden">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-pink-900/20 dark:to-purple-900/20">
            </div>
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-pink-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse">
              </div>
              <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000">
              </div>
            </div>

            <div className="relative text-center space-y-6 py-16 px-4">
              <div className="inline-flex items-center px-4 py-2 bg-pink-100 dark:bg-pink-900/30 rounded-full text-pink-800 dark:text-pink-200 text-sm font-medium">
                🎨 UI组件库
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold">
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  组件展示
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                展示所有可用的{" "}
                <span className="font-semibold text-pink-600 dark:text-pink-400">
                  UI组件
                </span>{" "}
                及其不同变体， 包括{" "}
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  按钮、卡片、输入框、模态框
                </span>{" "}
                等丰富的组件库
              </p>
            </div>
          </div>

          <ComponentsDemo />
        </div>
      </Layout>
    </>
  );
}
