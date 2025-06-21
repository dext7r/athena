import { Head } from "$fresh/runtime.ts";

export default function Error403() {
  return (
    <>
      <Head>
        <title>403 - 禁止访问 | Athena</title>
        <meta
          name="description"
          content="403错误页面 - 您的权限不足，无法访问此资源，请联系管理员申请相应权限。"
        />
        <meta
          name="keywords"
          content="403错误, 禁止访问, 权限不足, 访问被拒绝, 权限申请"
        />
        <meta property="og:title" content="403 - 禁止访问 | Athena " />
        <meta
          property="og:description"
          content="403错误页面 - 您的权限不足，无法访问此资源，请联系管理员申请相应权限。"
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob">
          </div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000">
          </div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000">
          </div>
        </div>

        {/* 主要内容 */}
        <div className="relative flex items-center justify-center min-h-screen px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            {/* 403 大数字 */}
            <div className="mb-8">
              <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-red-600 to-yellow-800 dark:from-yellow-400 dark:via-red-400 dark:to-yellow-600 animate-pulse">
                403
              </h1>
            </div>

            {/* 禁止图标 */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-yellow-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                    />
                  </svg>
                </div>
                <div className="absolute inset-0 w-32 h-32 border-4 border-yellow-200 dark:border-yellow-800 rounded-full animate-ping">
                </div>
              </div>
            </div>

            {/* 标题和描述 */}
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                禁止访问
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                您的权限不足，无法访问此资源
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                请联系管理员申请相应权限
              </p>
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-yellow-600 to-red-600 border border-transparent rounded-lg shadow-lg hover:from-yellow-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transform transition-all duration-200 hover:scale-105"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                联系管理员
              </a>

              <a
                href="/"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transform transition-all duration-200 hover:scale-105"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                返回首页
              </a>
            </div>

            {/* 权限说明 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                权限说明
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <p>• 此资源需要特殊权限才能访问</p>
                <p>• 您当前的账户级别不足</p>
                <p>• 请联系系统管理员申请权限升级</p>
                <p>• 或者尝试访问其他允许的资源</p>
              </div>
            </div>

            {/* 底部信息 */}
            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              <p>错误代码: 403 - Forbidden</p>
              <p className="mt-1">
                技术支持:{" "}
                <a
                  href="mailto:h7ml@qq.com"
                  className="text-yellow-600 dark:text-yellow-400 hover:underline"
                >
                  h7ml@qq.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 自定义CSS动画 */}
      <style>
        {`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}
      </style>
    </>
  );
}
