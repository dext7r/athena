
import Layout from "@components/layout/Layout.tsx";

export default function StatusCodesPage() {
  const statusCodes = [
    {
      code: "401",
      title: "未授权访问",
      description: "需要身份验证才能访问此资源",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-600 dark:text-red-400",
      icon: "🔒",
      category: "客户端错误",
    },
    {
      code: "403",
      title: "禁止访问",
      description: "服务器理解请求但拒绝执行",
      color: "from-yellow-500 to-red-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      textColor: "text-yellow-600 dark:text-yellow-400",
      icon: "🚫",
      category: "客户端错误",
    },
    {
      code: "404",
      title: "页面未找到",
      description: "请求的资源在服务器上不存在",
      color: "from-blue-500 to-purple-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
      icon: "🔍",
      category: "客户端错误",
    },
    {
      code: "500",
      title: "服务器错误",
      description: "服务器遇到意外情况无法完成请求",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-600 dark:text-red-400",
      icon: "💥",
      category: "服务器错误",
    },
    {
      code: "502",
      title: "网关错误",
      description: "作为网关的服务器从上游服务器收到无效响应",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-600 dark:text-orange-400",
      icon: "🌐",
      category: "服务器错误",
    },
    {
      code: "503",
      title: "服务不可用",
      description: "服务器暂时过载或维护中无法处理请求",
      color: "from-purple-500 to-blue-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
      icon: "🔧",
      category: "服务器错误",
    },
  ];

  return (
    <>
      <Layout title="HTTP状态码演示">
        <div className="space-y-32">
          {/* Hero区域 - 全新设计 */}
          <section className="relative overflow-hidden min-h-screen flex items-center">
            {/* 复杂背景层 */}
            <div className="absolute inset-0">
              {/* 主背景渐变 */}
              <div
                className="absolute inset-0 opacity-95"
                style={{
                  background: `
                    radial-gradient(circle at 25% 25%, rgba(245, 101, 101, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 75% 25%, rgba(251, 146, 60, 0.12) 0%, transparent 50%),
                    radial-gradient(circle at 50% 75%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 25% 75%, rgba(220, 38, 38, 0.08) 0%, transparent 50%),
                    linear-gradient(135deg, rgba(254, 242, 242, 0.9) 0%, rgba(255, 237, 213, 0.7) 50%, rgba(253, 230, 138, 0.8) 100%)
                  `,
                }}
              >
              </div>

              {/* 深色模式背景 */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/98 via-red-950/95 via-orange-950/92 to-yellow-950/95 dark:opacity-100 opacity-0 transition-opacity duration-500">
              </div>

              {/* 动态网格 */}
              <div
                className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(245, 101, 101, 0.5) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(245, 101, 101, 0.5) 1px, transparent 1px),
                    linear-gradient(rgba(251, 146, 60, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(251, 146, 60, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: "60px 60px, 60px 60px, 20px 20px, 20px 20px",
                }}
              >
              </div>

              {/* 动画装饰元素 */}
              <div className="absolute top-1/6 left-1/8 w-96 h-96 bg-gradient-to-br from-red-400/12 via-orange-400/10 to-yellow-400/12 dark:from-red-500/8 dark:via-orange-500/6 dark:to-yellow-500/8 rounded-full blur-3xl animate-pulse">
              </div>
              <div className="absolute top-1/4 right-1/8 w-80 h-80 bg-gradient-to-br from-orange-400/10 via-yellow-400/8 to-amber-400/10 dark:from-orange-500/6 dark:via-yellow-500/4 dark:to-amber-500/6 rounded-full blur-3xl animate-pulse delay-1000">
              </div>
              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-gradient-to-br from-yellow-400/10 via-amber-400/8 to-orange-400/10 dark:from-yellow-500/6 dark:via-amber-500/4 dark:to-orange-500/6 rounded-full blur-2xl animate-pulse delay-2000">
              </div>
              <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-gradient-to-br from-red-400/8 via-pink-400/6 to-rose-400/8 dark:from-red-500/4 dark:via-pink-500/3 dark:to-rose-500/4 rounded-full blur-2xl animate-pulse delay-3000">
              </div>

              {/* 装饰线条和形状 */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 via-orange-500/50 via-yellow-500/40 to-transparent">
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/40 via-yellow-500/50 via-amber-500/40 to-transparent">
              </div>

              {/* 浮动几何形状 */}
              <div className="absolute top-1/3 left-1/5 w-4 h-4 bg-red-500/30 rotate-45 animate-bounce delay-500">
              </div>
              <div className="absolute top-1/2 right-1/5 w-6 h-6 bg-orange-500/25 rounded-full animate-ping delay-1500">
              </div>
              <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-yellow-500/35 rotate-12 animate-pulse delay-2500">
              </div>
            </div>

            {/* Hero内容 */}
            <div className="relative text-center space-y-16 py-32 md:py-40 px-6 max-w-7xl mx-auto w-full">
              {/* 动态徽章 */}
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-50/80 to-orange-50/80 dark:from-red-900/40 dark:to-orange-900/40 backdrop-blur-md rounded-2xl text-red-800 dark:text-red-200 text-base font-bold border border-red-200/60 dark:border-red-700/60 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse">
                </div>
                <span className="text-lg">🚨</span>
                <span>HTTP状态码</span>
                <div className="w-1 h-6 bg-red-300 dark:bg-red-600 rounded-full">
                </div>
                <span className="text-orange-600 dark:text-orange-400 font-black text-lg">
                  错误页面
                </span>
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse delay-500">
                </div>
              </div>

              {/* 主标题 */}
              <div className="space-y-8">
                <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tight leading-none">
                  <span
                    className="bg-gradient-to-r from-red-600 via-orange-600 via-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent"
                    style={{
                      backgroundSize: "300% 300%",
                      animation: "gradient-flow 8s ease-in-out infinite",
                    }}
                  >
                    状态码
                  </span>
                  <br />
                  <span
                    className="bg-gradient-to-r from-orange-500 via-yellow-500 via-amber-500 to-red-500 bg-clip-text text-transparent"
                    style={{
                      backgroundSize: "300% 300%",
                      animation:
                        "gradient-flow 8s ease-in-out infinite reverse",
                    }}
                  >
                    演示
                  </span>
                </h1>

                <div className="space-y-6">
                  <p className="text-2xl md:text-3xl lg:text-4xl text-gray-700 dark:text-gray-200 max-w-6xl mx-auto leading-relaxed font-semibold">
                    展示常见的{" "}
                    <span className="font-black text-transparent bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text">
                      HTTP错误状态码
                    </span>{" "}
                    页面设计
                  </p>
                  <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed">
                    包括{" "}
                    <span className="font-bold text-transparent bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text">
                      401、403、404、500、502、503
                    </span>{" "}
                    等状态码
                    <br className="hidden md:block" />
                    提供用户友好的错误页面体验
                  </p>
                </div>
              </div>

              {/* 状态码分类标签 */}
              <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
                {[
                  {
                    name: "4xx错误",
                    color: "from-red-500 to-orange-500",
                    icon: "⚠️",
                    desc: "客户端错误",
                  },
                  {
                    name: "5xx错误",
                    color: "from-orange-500 to-yellow-500",
                    icon: "💥",
                    desc: "服务器错误",
                  },
                  {
                    name: "用户友好",
                    color: "from-yellow-500 to-amber-500",
                    icon: "😊",
                    desc: "友好的错误提示",
                  },
                  {
                    name: "美观设计",
                    color: "from-amber-500 to-orange-500",
                    icon: "🎨",
                    desc: "现代化设计",
                  },
                  {
                    name: "响应式",
                    color: "from-orange-500 to-red-500",
                    icon: "📱",
                    desc: "多端适配",
                  },
                ].map((category, index) => (
                  <div
                    key={category.name}
                    className={`group inline-flex flex-col items-center gap-3 px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl text-sm font-bold border border-gray-200/60 dark:border-gray-700/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 cursor-pointer`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                        {category.icon}
                      </span>
                      <span
                        className={`text-transparent bg-gradient-to-r ${category.color} bg-clip-text text-lg`}
                      >
                        {category.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                      {category.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* 导航按钮 */}
              <div className="flex flex-wrap justify-center gap-6 pt-12">
                <a
                  href="#status-codes"
                  className="group transform hover:scale-105 transition-all duration-300"
                >
                  <button className="px-8 py-4 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 transition-all duration-500 flex items-center gap-3 text-lg">
                    <span className="text-xl">📋</span>
                    <span>查看状态码</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
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
                  href="#error-guide"
                  className="group transform hover:scale-105 transition-all duration-300"
                >
                  <button className="px-8 py-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-500 flex items-center gap-3 text-lg">
                    <span className="text-xl">📚</span>
                    <span>错误处理指南</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
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
              </div>

              {/* 滚动指示器 */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-red-500/50 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-red-500 rounded-full mt-2 animate-pulse">
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 错误处理指南 */}
          <section id="error-guide" className="relative py-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center space-y-8 mb-20">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-full text-red-800 dark:text-red-200 font-semibold">
                  <span className="text-xl">📚</span>
                  <span>错误处理指南</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white">
                  如何设计{" "}
                  <span className="text-transparent bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text">
                    友好的错误页面
                  </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
                  良好的错误页面设计能显著提升用户体验
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "清晰的错误信息",
                    icon: "💬",
                    description: "用简单易懂的语言解释发生了什么问题",
                    gradient: "from-red-500 to-orange-500",
                    bgGradient:
                      "from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20",
                    tips: [
                      "避免技术术语",
                      "提供具体原因",
                      "使用友好语调",
                      "保持简洁明了",
                    ],
                  },
                  {
                    title: "提供解决方案",
                    icon: "🛠️",
                    description: "告诉用户可以采取什么行动来解决问题",
                    gradient: "from-orange-500 to-yellow-500",
                    bgGradient:
                      "from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20",
                    tips: [
                      "明确的行动指引",
                      "多种解决路径",
                      "联系方式",
                      "返回选项",
                    ],
                  },
                  {
                    title: "保持品牌一致性",
                    icon: "🎨",
                    description: "错误页面应该与网站整体设计风格保持一致",
                    gradient: "from-yellow-500 to-amber-500",
                    bgGradient:
                      "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20",
                    tips: [
                      "统一的色彩方案",
                      "一致的字体",
                      "相同的导航",
                      "品牌元素",
                    ],
                  },
                  {
                    title: "添加人性化元素",
                    icon: "😊",
                    description: "使用插图、动画或幽默来缓解用户的挫败感",
                    gradient: "from-amber-500 to-orange-500",
                    bgGradient:
                      "from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
                    tips: ["有趣的插图", "适度的幽默", "表情符号", "动画效果"],
                  },
                  {
                    title: "提供导航选项",
                    icon: "🧭",
                    description: "帮助用户快速找到他们想要的内容",
                    gradient: "from-orange-500 to-red-500",
                    bgGradient:
                      "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
                    tips: ["返回首页", "热门页面", "搜索功能", "网站地图"],
                  },
                  {
                    title: "监控和改进",
                    icon: "📊",
                    description: "跟踪错误页面的表现并持续优化",
                    gradient: "from-red-500 to-pink-500",
                    bgGradient:
                      "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20",
                    tips: ["错误统计", "用户反馈", "A/B测试", "定期更新"],
                  },
                ].map((guide, index) => (
                  <div
                    key={guide.title}
                    className={`group relative p-8 bg-gradient-to-br ${guide.bgGradient} rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="space-y-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${guide.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {guide.icon}
                      </div>
                      <div className="space-y-3">
                        <h3
                          className={`text-2xl font-bold text-transparent bg-gradient-to-r ${guide.gradient} bg-clip-text`}
                        >
                          {guide.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {guide.description}
                        </p>
                      </div>
                      <div className="space-y-2">
                        {guide.tips.map((tip, tipIndex) => (
                          <div
                            key={tipIndex}
                            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
                          >
                            <div
                              className={`w-2 h-2 bg-gradient-to-r ${guide.gradient} rounded-full`}
                            >
                            </div>
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${guide.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
                    >
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 状态码展示 */}
          <section
            id="status-codes"
            className="relative py-24 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center space-y-8 mb-16">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-full text-red-800 dark:text-red-200 font-semibold">
                  <span className="text-xl">📋</span>
                  <span>状态码展示</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white">
                  常见的{" "}
                  <span className="text-transparent bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text">
                    HTTP状态码
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {statusCodes.map((status, index) => (
                  <a
                    key={status.code}
                    href={`/status/${status.code}`}
                    className="group block"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`relative p-8 ${status.bgColor} rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2`}
                    >
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-16 h-16 bg-gradient-to-r ${status.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                          >
                            {status.icon}
                          </div>
                          <div>
                            <div
                              className={`text-3xl font-black ${status.textColor}`}
                            >
                              {status.code}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {status.category}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h3
                            className={`text-2xl font-bold ${status.textColor}`}
                          >
                            {status.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {status.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                          <span>查看演示页面</span>
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
                        </div>
                      </div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${status.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
                      >
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* 自定义样式 */}
        <style jsx>
          {`
          @keyframes gradient-flow {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
        `}
        </style>
      </Layout>
    </>
  );
}
