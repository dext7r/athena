/**
 * 多因素认证设置页面
 */


import { FreshContext, PageProps } from "fresh";
import Layout from "@components/layout/Layout.tsx";
import { getAuthContext } from "@utils/middleware.ts";
import type { AppUser } from "@utils/auth.ts";
import MFASetup from "@islands/MFASetup.tsx";

interface MFAPageProps {
  user: Partial<AppUser>;
}

export const handler = {
  async GET(ctx: FreshContext) {
    const req = ctx.req;
    const authContext = await getAuthContext(req);

    if (!authContext.isAuthenticated) {
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

export default function MFAPage({ data }: PageProps<MFAPageProps>) {
  return (
    <>
      <Layout title="多因素认证">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse">
          </div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000">
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* 页面标题 */}
          <div className="text-center py-12">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-xl opacity-30 animate-pulse">
              </div>
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-xl">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>

            {/* 面包屑导航 */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <a
                href="/security"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
              <span className="text-blue-600 dark:text-blue-400">
                多因素认证
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-900 to-indigo-800 dark:from-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-6">
              多因素认证设置
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              为您的账户添加额外的安全保护层，防止未经授权的访问
            </p>

            {/* 装饰性分割线 */}
            <div className="flex items-center justify-center mt-8">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-600 to-transparent w-64">
              </div>
              <div className="mx-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-600 to-transparent w-64">
              </div>
            </div>
          </div>

          {/* MFA信息卡片 */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
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
                  关于多因素认证 (MFA)
                </h3>
                <div className="text-blue-700 dark:text-blue-300 space-y-2">
                  <p>• 多因素认证为您的账户提供额外的安全保护层</p>
                  <p>• 即使密码被泄露，攻击者也无法访问您的账户</p>
                  <p>
                    • 支持 Google Authenticator、Microsoft Authenticator、Authy
                    等认证应用
                  </p>
                  <p>• 基于时间的一次性密码 (TOTP) 标准，每30秒更新一次</p>
                </div>
              </div>
            </div>
          </div>

          <MFASetup />
        </div>
      </Layout>
    </>
  );
}
