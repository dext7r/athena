/**
 * 管理员页面
 * 只有管理员才能访问
 */

import { Head } from "$fresh/runtime.ts";
import { HandlerContext, PageProps } from "$fresh/server.ts";
import Layout from "../components/layout/Layout.tsx";
import { getAuthContext } from "../utils/middleware.ts";
import type { AppUser } from "../utils/auth.ts";

// 管理员用户列表（在实际应用中应该从环境变量或数据库获取）
const ADMIN_USERS = ["h7ml"]; // 添加您的 GitHub 用户名

interface AdminPageProps {
  user: Partial<AppUser>;
}

export const handler = {
  async GET(req: Request, ctx: HandlerContext) {
    const authContext = await getAuthContext(req);

    if (!authContext.isAuthenticated || !authContext.user) {
      // 未登录，重定向到登录页面
      const loginUrl = `/api/auth/github?redirect=${
        encodeURIComponent(req.url)
      }`;
      return new Response(null, {
        status: 302,
        headers: { "Location": loginUrl },
      });
    }

    // 检查是否是管理员
    const isAdmin = ADMIN_USERS.includes(authContext.user.username || "");
    if (!isAdmin) {
      return new Response(
        `<!DOCTYPE html>
        <html>
        <head>
          <title>访问被拒绝 - Athena Template</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-100 dark:bg-gray-900">
          <div class="min-h-screen flex items-center justify-center">
            <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <div class="text-red-500 text-6xl mb-4">🚫</div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">访问被拒绝</h1>
              <p class="text-gray-600 dark:text-gray-400 mb-6">您没有访问此页面的权限。需要管理员权限。</p>
              <a href="/" class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                返回首页
              </a>
            </div>
          </div>
        </body>
        </html>`,
        {
          status: 403,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        },
      );
    }

    return ctx.render({ user: authContext.user });
  },
};

export default function AdminPage({ data }: PageProps<AdminPageProps>) {
  const user = data?.user;

  return (
    <>
      <Head>
        <title>管理员面板 - Athena Template</title>
        <meta name="description" content="系统管理员控制面板" />
      </Head>
      <Layout title="管理员面板">
        {/* 动态背景 */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse">
          </div>
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          >
          </div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-400/5 to-purple-600/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          >
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* 页面标题 */}
          <div className="text-center py-16">
            <div className="relative inline-block mb-8">
              {/* 外层光环 */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-2xl opacity-30 animate-pulse scale-150">
              </div>

              {/* 中层光环 */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-50 animate-pulse scale-125"
                style={{ animationDelay: "1s" }}
              >
              </div>

              {/* 图标容器 */}
              <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>

                {/* 装饰性粒子 */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce">
                </div>
                <div
                  className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                </div>
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent mb-6">
              管理员控制台
            </h1>

            <div className="max-w-4xl mx-auto mb-8">
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
                欢迎回来，
                <span className="inline-flex items-center gap-2 mx-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  {user?.name || user?.username}
                </span>
                ！
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-4">
                您拥有系统管理员权限，可以管理所有功能模块。请谨慎操作，确保系统安全稳定运行。
              </p>
            </div>

            {/* 装饰性分割线 */}
            <div className="flex items-center justify-center">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-600 to-transparent w-32">
              </div>
              <div className="mx-6 flex space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse">
                </div>
                <div
                  className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                >
                </div>
                <div
                  className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                >
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-600 to-transparent w-32">
              </div>
            </div>
          </div>

          {/* 管理员权限验证卡片 */}
          <div className="relative group">
            {/* 背景光效 */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500">
            </div>

            <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-teal-900/30 border-2 border-green-200 dark:border-green-700 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-6">
                {/* 图标容器 */}
                <div className="relative">
                  {/* 外层光环 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-lg opacity-50 animate-pulse scale-125">
                  </div>

                  <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>

                    {/* 验证徽章 */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-yellow-800"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-green-800 to-emerald-700 dark:from-green-200 dark:to-emerald-200 bg-clip-text text-transparent">
                      管理员权限已验证
                    </h2>
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-800 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse">
                      </div>
                      <span className="text-xs font-medium text-green-700 dark:text-green-300">
                        在线
                      </span>
                    </div>
                  </div>
                  <p className="text-green-700 dark:text-green-300 text-lg leading-relaxed">
                    您的身份已通过验证，可以访问所有管理功能和敏感数据。请谨慎操作，确保系统安全。
                  </p>

                  {/* 权限级别指示器 */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        权限级别:
                      </span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 bg-green-500 rounded-full"
                          >
                          </div>
                        ))}
                      </div>
                      <span className="text-sm font-bold text-green-700 dark:text-green-300">
                        超级管理员
                      </span>
                    </div>
                  </div>
                </div>

                {/* 状态指示器 */}
                <div className="hidden lg:flex flex-col items-center gap-2">
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg">
                  </div>
                  <div
                    className="w-3 h-3 bg-green-300 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  >
                  </div>
                  <div
                    className="w-2 h-2 bg-green-200 rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  >
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 管理功能网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* 用户管理 */}
            <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    用户管理
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    User Management
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                管理系统用户账户，查看用户统计数据，监控用户活动和权限分配
              </p>
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-105">
                进入用户管理
              </button>
            </div>

            {/* 系统设置 */}
            <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-600">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
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
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    系统设置
                  </h3>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                    System Settings
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                配置系统核心参数，管理应用程序设置，调整性能和功能选项
              </p>
              <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-105">
                进入系统设置
              </button>
            </div>

            {/* 安全管理 */}
            <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 hover:border-red-300 dark:hover:border-red-600">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
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
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    安全管理
                  </h3>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                    Security Management
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                管理访问权限控制，查看安全审计日志，监控系统安全状态
              </p>
              <button className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-105">
                进入安全管理
              </button>
            </div>

            {/* 数据分析 */}
            <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 hover:border-green-300 dark:hover:border-green-600">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    数据分析
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                    Data Analytics
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                查看系统统计报表，分析用户行为数据，生成业务洞察报告
              </p>
              <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-105">
                查看分析报告
              </button>
            </div>

            {/* 日志管理 */}
            <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 hover:border-yellow-300 dark:hover:border-yellow-600">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
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
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    日志管理
                  </h3>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                    Log Management
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                查看系统运行日志，监控应用程序状态，追踪错误和异常
              </p>
              <button className="w-full px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-105">
                查看系统日志
              </button>
            </div>

            {/* 备份管理 */}
            <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    备份管理
                  </h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                    Backup Management
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                管理数据备份策略，执行系统备份，恢复历史数据版本
              </p>
              <button className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-105">
                管理备份设置
              </button>
            </div>
          </div>

          {/* 快速操作面板 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  快速操作中心
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  常用的系统维护和管理操作
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button className="group flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 border border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-5 h-5 text-white"
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
                </div>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300 text-center">
                  清理缓存
                </span>
              </button>

              <button className="group flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-200 border border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-5 h-5 text-white"
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
                </div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300 text-center">
                  重启服务
                </span>
              </button>

              <button className="group flex flex-col items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-all duration-200 border border-yellow-200 dark:border-yellow-800 hover:border-yellow-300 dark:hover:border-yellow-700">
                <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300 text-center">
                  检查更新
                </span>
              </button>

              <button className="group flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-200 border border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300 text-center">
                  导出数据
                </span>
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
