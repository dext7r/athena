/**
 * 法律页面统一导航组件
 * 提供隐私政策、服务条款、Cookie政策之间的导航
 */

interface LegalNavigationProps {
  currentPage: "privacy" | "terms" | "cookies";
}

export default function LegalNavigation({ currentPage }: LegalNavigationProps) {
  const pages = [
    {
      key: "privacy" as const,
      title: "隐私政策",
      href: "/legal/privacy",
      description: "了解我们如何收集、使用和保护您的个人信息",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
      color: "blue",
    },
    {
      key: "terms" as const,
      title: "服务条款",
      href: "/legal/terms",
      description: "了解使用我们服务的规则和条件",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      color: "green",
    },
    {
      key: "cookies" as const,
      title: "Cookie政策",
      href: "/legal/cookies",
      description: "了解我们如何使用Cookie和类似技术",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
      color: "orange",
    },
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const colorMap = {
      blue: {
        active:
          "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/25",
        inactive:
          "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/50",
      },
      green: {
        active:
          "bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/25",
        inactive:
          "bg-green-50 text-green-600 border-green-200 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/50",
      },
      orange: {
        active:
          "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/25",
        inactive:
          "bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800 dark:hover:bg-orange-900/50",
      },
    };

    return colorMap[color as keyof typeof colorMap]
      ?.[isActive ? "active" : "inactive"] || "";
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          法律政策导航
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          查看我们的完整法律政策文档
        </p>
      </div>

      {/* 桌面端：卡片式布局 */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {pages.map((page) => {
          const isActive = page.key === currentPage;
          return (
            <div
              key={page.key}
              className={`
                relative group rounded-2xl border-2 p-6 transition-all duration-300
                ${getColorClasses(page.color, isActive)}
                ${
                isActive
                  ? "transform scale-105"
                  : "hover:scale-105 hover:shadow-lg"
              }
              `}
            >
              {isActive && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              )}

              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`p-2 rounded-lg ${
                    isActive ? "bg-white/20" : "bg-current/10"
                  }`}
                >
                  {page.icon}
                </div>
                <h4 className="font-semibold text-lg">
                  {page.title}
                </h4>
              </div>

              <p
                className={`text-sm mb-4 ${
                  isActive ? "text-white/90" : "text-current/80"
                }`}
              >
                {page.description}
              </p>

              {!isActive && (
                <a
                  href={page.href}
                  className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all duration-200"
                >
                  查看详情
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              )}

              {isActive && (
                <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  当前页面
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 移动端：紧凑式布局 */}
      <div className="md:hidden space-y-3">
        {pages.map((page) => {
          const isActive = page.key === currentPage;
          return (
            <div
              key={page.key}
              className={`
                relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300
                ${getColorClasses(page.color, isActive)}
              `}
            >
              {isActive && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                </div>
              )}

              <div
                className={`p-2 rounded-lg flex-shrink-0 ${
                  isActive ? "bg-white/20" : "bg-current/10"
                }`}
              >
                {page.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-base mb-1">
                  {page.title}
                </h4>
                <p
                  className={`text-xs ${
                    isActive ? "text-white/90" : "text-current/80"
                  }`}
                >
                  {page.description}
                </p>
              </div>

              {!isActive && (
                <a
                  href={page.href}
                  className="flex-shrink-0 p-2 rounded-lg hover:bg-current/10 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              )}

              {isActive && (
                <div className="flex-shrink-0 p-2">
                  <svg
                    className="w-4 h-4 text-white/90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 底部提示 */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          这些政策共同构成了我们的法律框架，保护您的权益并规范服务使用
        </p>
      </div>
    </div>
  );
}
