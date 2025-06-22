/**
 * Cookie政策页面
 */

import Layout from "@components/layout/Layout.tsx";
import LegalNavigation from "@components/legal/LegalNavigation.tsx";
import CookiePreferences from "@islands/CookiePreferences.tsx";

export default function CookiePolicyPage() {
  return (
    <>
      <Layout title="Cookie政策" backToTopVariant="warning">
        <div className="max-w-4xl mx-auto">
          {/* 页面头部 */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
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
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cookie政策
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              我们重视您的隐私。本政策说明我们如何使用Cookie和类似技术来改善您的浏览体验。
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              最后更新时间：2025年6月22日
            </p>
          </div>

          {/* 目录导航 */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              目录
            </h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <a
                href="#overview"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                1. 什么是Cookie
              </a>
              <a
                href="#types"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                2. Cookie类型
              </a>
              <a
                href="#specific"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                3. 具体Cookie列表
              </a>
              <a
                href="#third-party"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                4. 第三方Cookie
              </a>
              <a
                href="#management"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                5. 管理设置
              </a>
              <a
                href="#impact"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                6. Cookie影响
              </a>
              <a
                href="#updates"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                7. 政策更新
              </a>
              <a
                href="#contact"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                8. 联系我们
              </a>
            </nav>
          </div>

          {/* 政策内容 */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section id="overview" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                1. 什么是Cookie
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Cookie是存储在您设备上的小型文本文件，用于改善您的浏览体验。
                  本政策解释了我们如何使用Cookie和类似技术。
                </p>
                <div className="bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
                  <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                    重要提示
                  </h3>
                  <p className="text-orange-800 dark:text-orange-200 text-sm">
                    我们使用Cookie来提供更好的用户体验，您可以通过浏览器设置管理Cookie偏好。
                  </p>
                </div>
              </div>
            </section>

            <section id="types" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                2. Cookie类型
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    必要Cookie
                  </h3>
                  <p className="text-blue-800 dark:text-blue-200 text-sm mb-3">
                    这些Cookie对网站正常运行是必需的，无法禁用。
                  </p>
                  <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                    <li>• 身份验证令牌</li>
                    <li>• 会话管理</li>
                    <li>• 安全设置</li>
                    <li>• 基本功能</li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                    功能Cookie
                  </h3>
                  <p className="text-green-800 dark:text-green-200 text-sm mb-3">
                    这些Cookie用于记住您的偏好和设置。
                  </p>
                  <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
                    <li>• 主题偏好（深色/浅色模式）</li>
                    <li>• 语言设置</li>
                    <li>• 界面布局</li>
                    <li>• 用户偏好</li>
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    分析Cookie
                  </h3>
                  <p className="text-purple-800 dark:text-purple-200 text-sm mb-3">
                    这些Cookie帮助我们了解网站使用情况。
                  </p>
                  <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1">
                    <li>• 页面访问统计</li>
                    <li>• 用户行为分析</li>
                    <li>• 性能监控</li>
                    <li>• 错误追踪</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                    营销Cookie
                  </h3>
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm mb-3">
                    目前我们不使用营销Cookie。
                  </p>
                  <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                    <li>• 暂未使用</li>
                    <li>• 如有变更会通知</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="specific" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                3. 我们使用的具体Cookie
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                        Cookie名称
                      </th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                        用途
                      </th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                        类型
                      </th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                        过期时间
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">
                        auth_token
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                        用户身份验证
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                        必要
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                        24小时
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">
                        theme
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                        主题偏好设置
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                        功能
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                        1年
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">
                        session_id
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                        会话管理
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                        必要
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                        浏览器关闭时
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">
                        preferences
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                        用户偏好设置
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                        功能
                      </td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                        6个月
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="third-party" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                4. 第三方Cookie
              </h2>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                我们可能使用以下第三方服务，它们可能设置自己的Cookie：
              </p>

              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    OAuth提供商
                  </h3>
                  <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                    <li>
                      • <strong>GitHub</strong>：用于GitHub登录认证
                    </li>
                    <li>
                      • <strong>Google</strong>：用于Google登录认证
                    </li>
                    <li>
                      • <strong>Microsoft</strong>：用于Microsoft登录认证
                    </li>
                    <li>
                      • <strong>Gitee</strong>：用于Gitee登录认证
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    分析服务
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    目前我们不使用第三方分析服务。如果将来使用，会在此处更新并通知用户。
                  </p>
                </div>
              </div>
            </section>

            <section id="management" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                5. 管理Cookie设置
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                4.1 浏览器设置
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                您可以通过浏览器设置来管理Cookie：
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Chrome
                  </h4>
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    设置 → 隐私设置和安全性 → Cookie及其他网站数据
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                    Firefox
                  </h4>
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    选项 → 隐私与安全 → Cookie和网站数据
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    Safari
                  </h4>
                  <p className="text-purple-800 dark:text-purple-200 text-sm">
                    偏好设置 → 隐私 → 管理网站数据
                  </p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                    Edge
                  </h4>
                  <p className="text-orange-800 dark:text-orange-200 text-sm">
                    设置 → Cookie和站点权限 → 管理和删除Cookie
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                4.2 Cookie偏好中心
              </h3>
              <CookiePreferences />
            </section>

            <section id="impact" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                6. Cookie的影响
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    禁用Cookie的影响
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li>无法保持登录状态</li>
                    <li>主题偏好无法保存</li>
                    <li>某些功能可能无法正常工作</li>
                    <li>用户体验可能下降</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    启用Cookie的好处
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li>自动保持登录状态</li>
                    <li>记住您的偏好设置</li>
                    <li>提供个性化体验</li>
                    <li>改善网站性能</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="updates" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                7. 政策更新
              </h2>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                我们可能会不时更新此Cookie政策。重大变更时，我们会：
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>在网站上发布更新的政策</li>
                <li>通过邮件或站内通知告知变更</li>
                <li>在适当情况下重新获取您的同意</li>
                <li>提供合理的过渡期</li>
              </ul>
            </section>

            <section id="contact" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                8. 联系我们
              </h2>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                如果您对我们的Cookie使用有任何疑问，请联系我们：
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>邮箱</strong>：<a
                      href="mailto:h7ml@qq.com"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      h7ml@qq.com
                    </a>
                  </li>
                  <li>
                    <strong>GitHub</strong>：<a
                      href="https://github.com/dext7r/athena.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      https://github.com/dext7r/athena.git
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* 法律页面导航 */}
          <LegalNavigation currentPage="cookies" />
        </div>
      </Layout>
    </>
  );
}
