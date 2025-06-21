import { Head } from "$fresh/runtime.ts";
import Layout from "@components/layout/Layout.tsx";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/ui/Card.tsx";

export default function StatusCodesPage() {
  const statusCodes = [
    {
      code: "401",
      title: "未授权访问",
      description: "需要身份验证才能访问此资源",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-600 dark:text-red-400",
      icon: (
        <svg
          className="w-8 h-8"
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
    },
    {
      code: "403",
      title: "禁止访问",
      description: "服务器理解请求但拒绝执行",
      color: "from-yellow-500 to-red-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      textColor: "text-yellow-600 dark:text-yellow-400",
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
    },
    {
      code: "404",
      title: "页面未找到",
      description: "请求的资源在服务器上不存在",
      color: "from-blue-500 to-purple-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      ),
    },
    {
      code: "500",
      title: "服务器错误",
      description: "服务器遇到意外情况无法完成请求",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-600 dark:text-red-400",
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
    },
    {
      code: "502",
      title: "网关错误",
      description: "作为网关的服务器从上游服务器收到无效响应",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-600 dark:text-orange-400",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
          />
        </svg>
      ),
    },
    {
      code: "503",
      title: "服务不可用",
      description: "服务器暂时过载或维护中无法处理请求",
      color: "from-purple-500 to-blue-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>HTTP状态码演示 - Athena</title>
        <meta
          name="description"
          content="展示常见的HTTP错误状态码页面设计，包括401、403、404、500、502、503等状态码的用户友好页面。"
        />
        <meta
          name="keywords"
          content="HTTP状态码, 错误页面, 401, 403, 404, 500, 502, 503, 用户体验"
        />
        <meta property="og:title" content="HTTP状态码演示 - Athena " />
        <meta
          property="og:description"
          content="展示常见的HTTP错误状态码页面设计，包括401、403、404、500、502、503等状态码的用户友好页面。"
        />
        <meta property="og:type" content="website" />
      </Head>
      <Layout title="HTTP状态码演示">
        <div className="space-y-16">
          {/* 页面标题 */}
          <div className="relative overflow-hidden">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-yellow-900/20 dark:to-orange-900/20">
            </div>
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-yellow-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse">
              </div>
              <div className="absolute top-0 right-1/4 w-64 h-64 bg-orange-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000">
              </div>
            </div>

            <div className="relative text-center space-y-6 py-16 px-4">
              <div className="inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-800 dark:text-yellow-200 text-sm font-medium">
                🚨 HTTP状态码
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold">
                <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  状态码演示
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                展示常见的{" "}
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  HTTP错误状态码
                </span>{" "}
                页面设计， 包括{" "}
                <span className="font-semibold text-orange-600 dark:text-orange-400">
                  401、403、404、500、502、503
                </span>{" "}
                等状态码的用户友好页面
              </p>
            </div>
          </div>

          {/* 状态码网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statusCodes.map((status) => (
              <a
                key={status.code}
                href={`/status/${status.code}`}
                className="group block"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 group-hover:shadow-2xl">
                  <CardHeader className={`${status.bgColor} rounded-t-lg`}>
                    <div className="flex items-center justify-between">
                      <div className={`${status.textColor}`}>
                        {status.icon}
                      </div>
                      <div
                        className={`text-2xl font-bold bg-gradient-to-r ${status.color} bg-clip-text text-transparent`}
                      >
                        {status.code}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {status.title}
                    </CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {status.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                      <span>查看演示页面</span>
                      <svg
                        className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
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
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          {/* 说明信息 */}
          <Card>
            <CardHeader>
              <CardTitle>关于HTTP状态码</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  HTTP状态码是服务器对客户端请求的响应代码，用于表示请求的处理结果。
                  这些页面展示了常见错误状态码的用户友好设计。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      4xx 客户端错误
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• 401 - 需要身份验证</li>
                      <li>• 403 - 服务器拒绝请求</li>
                      <li>• 404 - 资源不存在</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      5xx 服务器错误
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• 500 - 服务器内部错误</li>
                      <li>• 502 - 网关错误</li>
                      <li>• 503 - 服务不可用</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
}
