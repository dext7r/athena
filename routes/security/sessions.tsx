/**
 * 会话管理页面
 * 显示和管理用户的活跃会话
 */

import { Head } from "$fresh/runtime.ts";
import { HandlerContext, PageProps } from "$fresh/server.ts";
import Layout from "@components/layout/Layout.tsx";
import { getAuthContext } from "@utils/middleware.ts";
import type { AppUser } from "@utils/auth.ts";
import SessionManager from "@islands/SessionManager.tsx";

interface SessionsPageProps {
  user: Partial<AppUser>;
}

export const handler = {
  async GET(req: Request, ctx: HandlerContext) {
    const authContext = await getAuthContext(req);

    if (!authContext.isAuthenticated) {
      // 未登录，重定向到登录页面
      const loginUrl = `/api/auth/github?redirect=${
        encodeURIComponent(req.url)
      }`;
      return new Response(null, {
        status: 302,
        headers: { "Location": loginUrl },
      });
    }

    return ctx.render({ user: authContext.user });
  },
};

export default function SessionsPage({ data }: PageProps<SessionsPageProps>) {
  const user = data?.user;

  return (
    <>
      <Head>
        <title>会话管理 - Athena</title>
        <meta
          name="description"
          content="管理您的登录设备和活跃会话，确保账户安全"
        />
      </Head>
      <Layout title="会话管理">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-600/20 rounded-full blur-3xl animate-pulse">
          </div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-yellow-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse delay-1000">
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* 页面标题 */}
          <div className="text-center py-12">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-full blur-xl opacity-30 animate-pulse">
              </div>
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full shadow-xl">
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
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {/* 面包屑导航 */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <a
                href="/security"
                className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                安全设置
              </a>
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
              <span className="text-orange-600 dark:text-orange-400">
                会话管理
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-900 to-red-800 dark:from-orange-200 dark:to-red-200 bg-clip-text text-transparent mb-6">
              会话管理中心
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              管理您的登录设备和活跃会话，监控账户安全状态
            </p>

            {/* 装饰性分割线 */}
            <div className="flex items-center justify-center mt-8">
              <div className="h-px bg-gradient-to-r from-transparent via-orange-300 dark:via-orange-600 to-transparent w-64">
              </div>
              <div className="mx-4 w-2 h-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full">
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-orange-300 dark:via-orange-600 to-transparent w-64">
              </div>
            </div>
          </div>

          {/* 安全提示 */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  安全提醒
                </h3>
                <div className="text-yellow-700 dark:text-yellow-300 space-y-2">
                  <p>• 定期检查您的活跃会话，确保所有登录都是您本人操作</p>
                  <p>• 如果发现可疑的登录活动，请立即删除相关会话</p>
                  <p>• 建议在使用公共设备后及时删除会话</p>
                  <p>• 启用多因素认证可以进一步提高账户安全性</p>
                </div>
              </div>
            </div>
          </div>

          {/* 会话管理组件 */}
          <SessionManager />

          {/* 安全建议 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  最佳实践
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 使用强密码和多因素认证</li>
                <li>• 定期检查和清理不活跃的会话</li>
                <li>• 避免在公共网络上登录敏感账户</li>
                <li>• 及时更新浏览器和操作系统</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  可疑活动
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 来自未知位置的登录</li>
                <li>• 异常的设备或浏览器</li>
                <li>• 非正常时间的活动</li>
                <li>• 多个同时活跃的会话</li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
