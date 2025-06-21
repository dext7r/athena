import { Head } from "$fresh/runtime.ts";
import Layout from "@components/layout/Layout.tsx";
import HooksDemo from "@islands/HooksDemo.tsx";

export default function HooksPage() {
  return (
    <>
      <Head>
        <title>Hooks演示 - Athena</title>
        <meta
          name="description"
          content="展示各种实用的自定义 Hooks 及其使用方法，包括useLocalStorage、useDebounce、useFetch、useMediaQuery等。"
        />
        <meta
          name="keywords"
          content="React Hooks, useLocalStorage, useDebounce, useFetch, useMediaQuery, 自定义Hooks"
        />
        <meta property="og:title" content="Hooks演示 - Athena " />
        <meta
          property="og:description"
          content="展示各种实用的自定义 Hooks 及其使用方法，包括useLocalStorage、useDebounce、useFetch、useMediaQuery等。"
        />
        <meta property="og:type" content="website" />
      </Head>
      <Layout title="Hooks演示">
        <div className="space-y-16">
          {/* 页面标题 */}
          <div className="relative overflow-hidden">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-green-900/20 dark:to-teal-900/20">
            </div>
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse">
              </div>
              <div className="absolute top-0 right-1/4 w-64 h-64 bg-teal-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000">
              </div>
            </div>

            <div className="relative text-center space-y-6 py-16 px-4">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-800 dark:text-green-200 text-sm font-medium">
                🔧 自定义Hooks
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold">
                <span className="bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Hooks演示
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                展示各种实用的{" "}
                <span className="font-semibold text-green-600 dark:text-green-400">
                  自定义 Hooks
                </span>{" "}
                及其使用方法， 包括{" "}
                <span className="font-semibold text-teal-600 dark:text-teal-400">
                  useLocalStorage、useDebounce、useFetch
                </span>{" "}
                等
              </p>
            </div>
          </div>

          <HooksDemo />
        </div>
      </Layout>
    </>
  );
}
