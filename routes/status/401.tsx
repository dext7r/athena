export default function Error401() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob">
          </div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000">
          </div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000">
          </div>
        </div>

        {/* 主要内容 */}
        <div className="relative flex items-center justify-center min-h-screen px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            {/* 401 大数字 */}
            <div className="mb-8">
              <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-red-800 dark:from-red-400 dark:via-orange-400 dark:to-red-600 animate-pulse">
                401
              </h1>
            </div>

            {/* 锁定图标 */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
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
                访问被拒绝
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                您没有权限访问此资源
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                请登录后重试或联系管理员获取权限
              </p>
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="/login"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-red-600 to-orange-600 border border-transparent rounded-lg shadow-lg hover:from-red-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform transition-all duration-200 hover:scale-105"
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                立即登录
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

            {/* 帮助信息 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                需要帮助？
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <p>• 确认您已经登录系统</p>
                <p>• 检查您的账户权限设置</p>
                <p>• 联系系统管理员获取访问权限</p>
                <p>• 如果问题持续存在，请联系技术支持</p>
              </div>
            </div>

            {/* 底部信息 */}
            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              <p>错误代码: 401 - Unauthorized</p>
              <p className="mt-1">
                技术支持:{" "}
                <a
                  href="mailto:h7ml@qq.com"
                  className="text-red-600 dark:text-red-400 hover:underline"
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
