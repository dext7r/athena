/**
 * 安全审计日志页面
 * 显示用户的安全活动记录
 */

import { Head } from "fresh/runtime";
import { HandlerContext, PageProps } from "fresh";
import Layout from "@components/layout/Layout.tsx";
import { getAuthContext } from "@utils/middleware.ts";
import type { AppUser } from "@utils/auth.ts";
import AuditLogViewer from "@islands/AuditLogViewer.tsx";

interface AuditLogsPageProps {
  user: Partial<AppUser>;
}

export const handler = {
  async GET(ctx: HandlerContext) {
    const req = ctx.req;
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

export default function AuditLogsPage({ data }: PageProps<AuditLogsPageProps>) {
  const user = data?.user;

  return (
    <>
      <Head>
        <title>安全审计日志 - Athena</title>
        <meta name="description" content="查看您的账户安全活动记录和审计日志" />
      </Head>
      <Layout title="安全审计日志">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse">
          </div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-green-600/20 rounded-full blur-3xl animate-pulse delay-1000">
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* 页面标题 */}
          <div className="text-center py-12">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-full blur-xl opacity-30 animate-pulse">
              </div>
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full shadow-xl">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>

            {/* 面包屑导航 */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <a
                href="/security"
                className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
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
              <span className="text-green-600 dark:text-green-400">
                安全日志
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-900 to-blue-800 dark:from-green-200 dark:to-blue-200 bg-clip-text text-transparent mb-6">
              安全审计日志
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              查看您的账户安全活动记录，监控登录、操作和安全事件
            </p>

            {/* 装饰性分割线 */}
            <div className="flex items-center justify-center mt-8">
              <div className="h-px bg-gradient-to-r from-transparent via-green-300 dark:via-green-600 to-transparent w-64">
              </div>
              <div className="mx-4 w-2 h-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-full">
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-green-300 dark:via-green-600 to-transparent w-64">
              </div>
            </div>
          </div>

          {/* 安全提示 */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  关于审计日志
                </h3>
                <div className="text-blue-700 dark:text-blue-300 space-y-2">
                  <p>• 审计日志记录了您账户的所有重要安全活动</p>
                  <p>• 包括登录、登出、MFA操作、会话管理等事件</p>
                  <p>• 可以帮助您发现异常活动和潜在的安全威胁</p>
                  <p>• 建议定期检查日志，确保所有活动都是您本人操作</p>
                </div>
              </div>
            </div>
          </div>

          {/* 审计日志查看器 */}
          <AuditLogViewer />

          {/* 安全建议 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600 dark:text-green-400"
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
                  正常活动
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 登录成功记录</li>
                <li>• 正常的会话创建和删除</li>
                <li>• MFA验证成功</li>
                <li>• 账户设置更改</li>
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
                  需要关注
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 登录失败记录</li>
                <li>• MFA验证失败</li>
                <li>• 可疑活动警告</li>
                <li>• 异常IP地址登录</li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
