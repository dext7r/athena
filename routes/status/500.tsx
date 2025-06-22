

export default function Error500() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob">
          </div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000">
          </div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000">
          </div>
        </div>

        {/* 主要内容 */}
        <div className="relative flex items-center justify-center min-h-screen px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            {/* 500 大数字 */}
            <div className="mb-8">
              <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-600 to-red-800 dark:from-red-400 dark:via-pink-400 dark:to-red-600 animate-pulse">
                500
              </h1>
            </div>

            {/* 服务器错误图标 */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
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
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div className="absolute inset-0 w-32 h-32 border-4 border-red-200 dark:border-red-800 rounded-full animate-ping">
                </div>
              </div>
            </div>

            {/* 标题和描述 */}
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                服务器开小差了
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                服务器遇到了一个意外错误
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                我们正在努力修复这个问题，请稍后再试
              </p>
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="javascript:location.reload()"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-red-600 to-pink-600 border border-transparent rounded-lg shadow-lg hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform transition-all duration-200 hover:scale-105"
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                刷新页面
              </a>

              <a
                href="/"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform transition-all duration-200 hover:scale-105"
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

            {/* 错误信息 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                可能的解决方案
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <p>• 刷新页面重新尝试</p>
                <p>• 检查网络连接是否正常</p>
                <p>• 稍后再试，服务器可能正在维护</p>
                <p>• 如果问题持续存在，请联系技术支持</p>
              </div>
            </div>

            {/* 底部信息 */}
            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              <p>错误代码: 500 - Internal Server Error</p>
              <p className="mt-1">
                技术支持:{" "}
                <a
                  href="mailto:h7ml@qq.com"
                  className="text-red-600 dark:text-red-400 hover:underline"
                >
                  h7ml@qq.com
                </a>
              </p>
              <p className="mt-1 text-xs">
                错误时间: {new Date().toLocaleString("zh-CN")}
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
