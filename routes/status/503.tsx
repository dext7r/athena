

export default function Error503() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob">
          </div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000">
          </div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000">
          </div>
        </div>

        {/* 主要内容 */}
        <div className="relative flex items-center justify-center min-h-screen px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            {/* 503 大数字 */}
            <div className="mb-8">
              <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 dark:from-purple-400 dark:via-blue-400 dark:to-purple-600 animate-pulse">
                503
              </h1>
            </div>

            {/* 维护图标 */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="absolute inset-0 w-32 h-32 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-ping">
                </div>
              </div>
            </div>

            {/* 标题和描述 */}
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                服务维护中
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                服务暂时不可用，正在进行维护升级
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                预计很快就会恢复正常，感谢您的耐心等待
              </p>
            </div>

            {/* 维护信息 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                维护信息
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-3">
                <div className="flex items-center justify-between">
                  <span>维护状态:</span>
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs">
                    进行中
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>预计完成:</span>
                  <span className="text-purple-600 dark:text-purple-400">
                    约30分钟
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>影响范围:</span>
                  <span>全部服务</span>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="javascript:location.reload()"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 border border-transparent rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform transition-all duration-200 hover:scale-105"
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
                检查状态
              </a>

              <a
                href="/"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform transition-all duration-200 hover:scale-105"
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

            {/* 联系信息 */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                需要紧急支持？
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                如果您有紧急业务需求，请联系我们的技术支持团队
              </p>
              <a
                href="mailto:h7ml@qq.com"
                className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline"
              >
                <svg
                  className="w-4 h-4 mr-1"
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
                h7ml@qq.com
              </a>
            </div>

            {/* 底部信息 */}
            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              <p>错误代码: 503 - Service Unavailable</p>
              <p className="mt-1 text-xs">
                维护开始时间: {new Date().toLocaleString("zh-CN")}
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
