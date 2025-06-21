import { Head } from "$fresh/runtime.ts";
import Layout from "@components/layout/Layout.tsx";
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
        <div className="space-y-16">
          {/* 页面标题 */}
          <div className="relative overflow-hidden">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-red-900/20">
            </div>
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse">
              </div>
              <div className="absolute top-0 right-1/4 w-64 h-64 bg-red-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000">
              </div>
            </div>

            <div className="relative text-center space-y-6 py-16 px-4">
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-800 dark:text-orange-200 text-sm font-medium">
                📊 状态管理
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold">
                <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  状态管理演示
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                展示{" "}
                <span className="font-semibold text-orange-600 dark:text-orange-400">
                  React状态管理
                </span>{" "}
                的基本使用方法， 包括{" "}
                <span className="font-semibold text-red-600 dark:text-red-400">
                  Zustand状态管理库
                </span>{" "}
                的实际应用示例
              </p>
            </div>
          </div>

          <SimpleStateDemo />
        </div>
      </Layout>
    </>
  );
}
