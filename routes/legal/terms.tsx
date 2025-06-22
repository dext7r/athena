/**
 * 服务条款页面
 */

import Layout from "@components/layout/Layout.tsx";
import LegalNavigation from "@components/legal/LegalNavigation.tsx";

export default function TermsPage() {
  return (
    <>
      <Layout
        title="服务条款"
        backToTopVariant="primary"
        backToTopThreshold={200}
      >
        <div className="max-w-4xl mx-auto">
          {/* 页面头部 */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              服务条款
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              欢迎使用 Athena
              服务。请仔细阅读以下条款，使用我们的服务即表示您同意这些条款。
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
                href="#acceptance"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                1. 条款接受
              </a>
              <a
                href="#services"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                2. 服务描述
              </a>
              <a
                href="#accounts"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                3. 用户账户
              </a>
              <a
                href="#conduct"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                4. 用户行为
              </a>
              <a
                href="#content"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                5. 内容政策
              </a>
              <a
                href="#privacy"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                6. 隐私保护
              </a>
              <a
                href="#intellectual"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                7. 知识产权
              </a>
              <a
                href="#termination"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                8. 服务终止
              </a>
              <a
                href="#liability"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                9. 责任限制
              </a>
              <a
                href="#changes"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                10. 条款变更
              </a>
              <a
                href="#contact"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                11. 联系我们
              </a>
            </nav>
          </div>

          {/* 条款内容 */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section id="acceptance" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                1. 条款接受
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  欢迎使用
                  Athena（以下简称"我们"或"本服务"）。通过访问或使用我们的服务，您同意受本服务条款（以下简称"条款"）的约束。
                </p>
                <p>
                  如果您不同意这些条款的任何部分，请不要使用我们的服务。这些条款适用于所有访问者、用户和其他使用本服务的人员。
                </p>
                <p>
                  我们保留随时修改或替换这些条款的权利。如果修订是重大的，我们将在新条款生效前至少提前30天通知您。
                </p>
              </div>
            </section>

            <section id="services" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                2. 服务描述
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Athena 是一个现代化的全栈开发模板和工具平台，提供以下服务：
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>基于 Fresh + Deno 的开发模板</li>
                  <li>完整的 UI 组件库</li>
                  <li>自定义 Hooks 和状态管理工具</li>
                  <li>开发工具和配置</li>
                  <li>文档和教程资源</li>
                  <li>社区支持和交流</li>
                </ul>
                <p>
                  我们保留随时修改、暂停或终止服务的任何部分的权利，恕不另行通知。我们不对任何修改、价格变更、暂停或终止服务承担责任。
                </p>
              </div>
            </section>

            <section id="accounts" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                3. 用户账户
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  当您在我们的服务上创建账户时，您必须提供准确、完整和最新的信息。您有责任保护您的账户密码和您账户下发生的所有活动。
                </p>
                <p>
                  您同意：
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>提供真实、准确、最新和完整的注册信息</li>
                  <li>维护和及时更新注册信息以保持其真实、准确、最新和完整</li>
                  <li>对您的密码和账户的安全负责</li>
                  <li>立即通知我们任何未经授权使用您账户的情况</li>
                </ul>
                <p>
                  我们保留拒绝服务、终止账户或删除或编辑内容的权利，恕不另行通知。
                </p>
              </div>
            </section>

            <section id="conduct" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                4. 用户行为
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  您同意不会使用本服务：
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>进行任何非法或未经授权的目的</li>
                  <li>
                    违反您所在司法管辖区的任何国际、联邦、省或州法律或法规
                  </li>
                  <li>传输或发送计算机病毒、蠕虫或任何破坏性代码</li>
                  <li>收集或跟踪他人的个人信息</li>
                  <li>发送垃圾邮件、钓鱼邮件或其他不受欢迎的邮件</li>
                  <li>干扰或破坏服务或连接到服务的服务器和网络</li>
                </ul>
                <p>
                  违反任何这些条款将导致立即终止您的服务使用权。
                </p>
              </div>
            </section>

            <section id="content" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                5. 内容政策
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  我们的服务允许您发布、链接、存储、分享和以其他方式提供某些信息、文本、图形、视频或其他材料（"内容"）。您对通过服务发布的内容负责。
                </p>
                <p>
                  通过发布内容到服务，您声明并保证：
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>您拥有内容或有权使用内容</li>
                  <li>您的内容不侵犯第三方的权利</li>
                  <li>您的内容不违反这些条款或适用法律</li>
                </ul>
                <p>
                  我们保留删除任何我们认为违反这些条款或其他不当内容的权利。
                </p>
              </div>
            </section>

            <section id="privacy" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                6. 隐私保护
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  您的隐私对我们很重要。请查看我们的<a
                    href="/legal/privacy"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    隐私政策
                  </a>，该政策也管辖您对服务的使用，以了解我们如何收集、使用和保护您的信息。
                </p>
              </div>
            </section>

            <section id="intellectual" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                7. 知识产权
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  服务及其原始内容、功能和特性是并将继续是 Athena
                  及其许可方的专有财产。服务受版权、商标和其他法律保护。我们的商标和商业外观不得用于与任何产品或服务的连接。
                </p>
                <p>
                  我们的开源代码遵循相应的开源许可证。您可以根据许可证条款使用、修改和分发代码。
                </p>
              </div>
            </section>

            <section id="termination" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                8. 服务终止
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  我们可能会立即终止或暂停您的账户，恕不另行通知或承担责任，无论出于何种原因，包括但不限于您违反条款的情况。
                </p>
                <p>
                  终止后，您使用服务的权利将立即停止。如果您希望终止您的账户，您可以简单地停止使用服务。
                </p>
              </div>
            </section>

            <section id="liability" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                9. 责任限制
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  在任何情况下，Athena
                  及其董事、员工、合作伙伴、代理、供应商或关联公司都不对任何间接、附带、特殊、后果性或惩罚性损害承担责任。
                </p>
                <p>
                  服务按"原样"和"可用"基础提供。我们不保证服务将不间断、及时、安全或无错误。
                </p>
              </div>
            </section>

            <section id="changes" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                10. 条款变更
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  我们保留随时自行决定修改或替换这些条款的权利。如果修订是重大的，我们将在新条款生效前至少提前30天提供通知。
                </p>
                <p>
                  在任何此类修改生效后继续访问或使用我们的服务即构成对这些修订条款的同意。
                </p>
              </div>
            </section>

            <section id="contact" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                11. 联系我们
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  如果您对这些服务条款有任何疑问，请通过以下方式联系我们：
                </p>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                  <ul className="space-y-2">
                    <li>
                      <strong>邮箱：</strong> h7ml@qq.com
                    </li>
                    <li>
                      <strong>GitHub：</strong>{" "}
                      <a
                        href="https://github.com/dext7r/athena"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        https://github.com/dext7r/athena
                      </a>
                    </li>
                    <li>
                      <strong>网站：</strong>{" "}
                      <a
                        href="https://athena.deno.dev"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        https://athena.deno.dev
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
          {/* 法律页面导航 */}
          <LegalNavigation currentPage="terms" />
        </div>
      </Layout>
    </>
  );
}
