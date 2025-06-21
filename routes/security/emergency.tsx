/**
 * 紧急锁定页面
 * 账户紧急锁定和安全管理
 */

import { Head } from "$fresh/runtime.ts";
import { HandlerContext, PageProps } from "$fresh/server.ts";
import Layout from "@components/layout/Layout.tsx";
import { getAuthContext } from "@utils/middleware.ts";
import type { AppUser } from "@utils/auth.ts";
import AccountLockManager from "@islands/AccountLockManager.tsx";

interface EmergencyPageProps {
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

export default function EmergencyPage({ data }: PageProps<EmergencyPageProps>) {
  const user = data?.user;

  return (
    <>
      <Head>
        <title>紧急锁定 - Athena</title>
        <meta
          name="description"
          content="紧急情况下立即锁定账户，保护您的数据安全"
        />
      </Head>
      <Layout title="紧急锁定">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse">
          </div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-red-600/20 rounded-full blur-3xl animate-pulse delay-1000">
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* 页面标题 */}
          <div className="text-center py-12">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur-xl opacity-30 animate-pulse">
              </div>
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full shadow-xl">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>

            {/* 面包屑导航 */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <a
                href="/security"
                className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
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
              <span className="text-red-600 dark:text-red-400">紧急锁定</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-900 to-pink-800 dark:from-red-200 dark:to-pink-200 bg-clip-text text-transparent mb-6">
              紧急账户锁定
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              紧急情况下立即锁定账户，保护您的数据和隐私安全
            </p>

            {/* 装饰性分割线 */}
            <div className="flex items-center justify-center mt-8">
              <div className="h-px bg-gradient-to-r from-transparent via-red-300 dark:via-red-600 to-transparent w-64">
              </div>
              <div className="mx-4 w-2 h-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-full">
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-red-300 dark:via-red-600 to-transparent w-64">
              </div>
            </div>
          </div>

          {/* 紧急情况说明 */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600 dark:text-red-400"
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
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                  什么时候需要紧急锁定？
                </h3>
                <div className="text-red-700 dark:text-red-300 space-y-2">
                  <p>• 发现账户有异常登录活动或可疑行为</p>
                  <p>• 怀疑密码或认证信息已被泄露</p>
                  <p>• 设备丢失或被盗，担心账户安全</p>
                  <p>• 收到未知的安全警告或通知</p>
                  <p>• 发现账户中有未经授权的操作</p>
                </div>
              </div>
            </div>
          </div>

          {/* 账户锁定管理组件 */}
          <AccountLockManager />

          {/* 锁定后的操作指南 */}
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
                  锁定后的安全措施
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 立即更改所有相关密码</li>
                <li>• 检查其他账户的安全状态</li>
                <li>• 启用多因素认证 (MFA)</li>
                <li>• 检查最近的登录记录</li>
                <li>• 联系相关服务提供商</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-yellow-600 dark:text-yellow-400"
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
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  解锁前的检查
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 确认威胁已经消除</li>
                <li>• 验证设备和网络安全</li>
                <li>• 更新所有安全设置</li>
                <li>• 检查账户活动日志</li>
                <li>• 确保认证应用正常</li>
              </ul>
            </div>
          </div>

          {/* 联系支持 */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                需要帮助？
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                如果您在账户安全方面遇到问题，或需要额外的帮助，请联系我们的支持团队
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  联系支持
                </button>
                <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  查看帮助文档
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
