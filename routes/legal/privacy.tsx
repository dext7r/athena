/**
 * 隐私政策页面
 */

import { Head } from "fresh/runtime";
import Layout from "@components/layout/Layout.tsx";
import LegalNavigation from "@components/legal/LegalNavigation.tsx";

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>隐私政策 - Athena</title>
        <meta
          name="description"
          content="Athena 隐私政策 - 了解我们如何收集、使用和保护您的个人信息"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <Layout
        title="隐私政策"
        backToTopVariant="success"
        backToTopThreshold={200}
      >
        <div className="max-w-4xl mx-auto">
          {/* 页面头部 */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              隐私政策
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              我们重视您的隐私。本政策说明我们如何收集、使用、披露和保护您的个人信息。
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
                1. 概述
              </a>
              <a
                href="#collection"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                2. 信息收集
              </a>
              <a
                href="#usage"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                3. 信息使用
              </a>
              <a
                href="#sharing"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                4. 信息共享
              </a>
              <a
                href="#storage"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                5. 数据存储
              </a>
              <a
                href="#security"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                6. 安全保护
              </a>
              <a
                href="#cookies"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                7. Cookie政策
              </a>
              <a
                href="#rights"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                8. 您的权利
              </a>
              <a
                href="#children"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                9. 儿童隐私
              </a>
              <a
                href="#changes"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                10. 政策变更
              </a>
              <a
                href="#contact"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                11. 联系我们
              </a>
            </nav>
          </div>

          {/* 政策内容 */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section id="overview" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                1. 概述
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Athena（"我们"、"我们的"或"本服务"）致力于保护您的隐私。本隐私政策解释了我们如何收集、使用、披露和保护您在使用我们服务时的信息。
                </p>
                <p>
                  通过使用我们的服务，您同意按照本隐私政策收集和使用信息。除非本隐私政策另有定义，否则本隐私政策中使用的术语与我们的服务条款中的含义相同。
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    重要提示
                  </h3>
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    我们承诺不会出售、交易或以其他方式转让您的个人身份信息给外部方，除非我们提前通知您或法律要求。
                  </p>
                </div>
              </div>
            </section>

            <section id="collection" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                2. 信息收集
              </h2>
              <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    2.1 您主动提供的信息
                  </h3>
                  <p>
                    当您使用我们的服务时，我们可能会收集您主动提供的信息，包括：
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>注册账户时提供的姓名、邮箱地址</li>
                    <li>个人资料信息，如头像、个人简介</li>
                    <li>您发布的内容、评论和反馈</li>
                    <li>与我们的客服沟通记录</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    2.2 自动收集的信息
                  </h3>
                  <p>当您访问我们的服务时，我们可能会自动收集某些信息：</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>设备信息（设备类型、操作系统、浏览器类型）</li>
                    <li>使用数据（访问时间、页面浏览、功能使用）</li>
                    <li>网络信息（IP地址、网络连接类型）</li>
                    <li>位置信息（如果您授权）</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    2.3 第三方服务信息
                  </h3>
                  <p>
                    如果您选择通过第三方服务（如GitHub、Google）登录，我们可能会收集：
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>第三方账户的公开信息</li>
                    <li>您授权我们访问的信息</li>
                    <li>第三方服务提供的唯一标识符</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="usage" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                3. 信息使用
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>我们使用收集的信息用于以下目的：</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      服务提供
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>创建和管理您的账户</li>
                      <li>提供个性化服务</li>
                      <li>处理您的请求和交易</li>
                      <li>提供客户支持</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      服务改进
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>分析服务使用情况</li>
                      <li>改进用户体验</li>
                      <li>开发新功能</li>
                      <li>进行安全监控</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      沟通联系
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>发送服务通知</li>
                      <li>回应您的询问</li>
                      <li>发送重要更新</li>
                      <li>营销推广（需您同意）</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      法律合规
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>遵守法律义务</li>
                      <li>保护权利和财产</li>
                      <li>防止欺诈和滥用</li>
                      <li>解决争议</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section id="sharing" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                4. 信息共享
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  我们不会出售、交易或租赁您的个人信息。我们可能在以下情况下共享您的信息：
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      服务提供商
                    </h3>
                    <p className="text-sm mt-1">
                      与帮助我们运营服务的第三方服务提供商，如云存储、分析服务等。
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      法律要求
                    </h3>
                    <p className="text-sm mt-1">
                      当法律要求或为了保护我们的权利、财产或安全时。
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      业务转让
                    </h3>
                    <p className="text-sm mt-1">
                      在合并、收购或资产出售的情况下，您的信息可能会被转让。
                    </p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      您的同意
                    </h3>
                    <p className="text-sm mt-1">
                      在获得您明确同意的其他情况下。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="storage" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                5. 数据存储
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>我们采取合理措施保护您的个人信息：</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      存储位置
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>数据存储在安全的云服务器上</li>
                      <li>遵循数据本地化要求</li>
                      <li>使用可信的第三方服务提供商</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      保留期限
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>账户信息：账户存续期间</li>
                      <li>使用数据：最多2年</li>
                      <li>日志数据：最多1年</li>
                      <li>法律要求的其他期限</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section id="security" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                6. 安全保护
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>我们实施多层安全措施来保护您的个人信息：</p>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
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
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        数据加密
                      </h3>
                      <p className="text-sm">传输和存储时使用SSL/TLS加密</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
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
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        访问控制
                      </h3>
                      <p className="text-sm">严格的员工访问权限管理</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
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
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        安全监控
                      </h3>
                      <p className="text-sm">24/7安全监控和威胁检测</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm">
                  尽管我们采取了合理的安全措施，但请注意，没有任何通过互联网传输或电子存储的方法是100%安全的。
                </p>
              </div>
            </section>

            <section id="cookies" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                7. Cookie政策
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>我们使用Cookie和类似技术来改善您的体验：</p>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Cookie类型
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          必要Cookie
                        </h4>
                        <p className="text-sm mt-1">
                          网站正常运行所必需的Cookie
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          功能Cookie
                        </h4>
                        <p className="text-sm mt-1">记住您的偏好设置</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          分析Cookie
                        </h4>
                        <p className="text-sm mt-1">帮助我们了解网站使用情况</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          营销Cookie
                        </h4>
                        <p className="text-sm mt-1">
                          用于个性化广告（需您同意）
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm">
                    您可以通过浏览器设置管理Cookie偏好。请注意，禁用某些Cookie可能会影响网站功能。
                  </p>
                </div>
              </div>
            </section>

            <section id="rights" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                8. 您的权利
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>根据适用的数据保护法律，您拥有以下权利：</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      访问权
                    </h3>
                    <p className="text-sm">
                      请求获取我们持有的您的个人信息副本
                    </p>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      更正权
                    </h3>
                    <p className="text-sm">请求更正不准确或不完整的个人信息</p>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      删除权
                    </h3>
                    <p className="text-sm">在某些情况下请求删除您的个人信息</p>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      限制权
                    </h3>
                    <p className="text-sm">请求限制对您个人信息的处理</p>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      可携权
                    </h3>
                    <p className="text-sm">请求以结构化格式获取您的数据</p>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      反对权
                    </h3>
                    <p className="text-sm">反对基于合法利益的数据处理</p>
                  </div>
                </div>
                <p className="text-sm">
                  要行使这些权利，请通过本政策末尾提供的联系方式与我们联系。
                </p>
              </div>
            </section>

            <section id="children" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                9. 儿童隐私
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                        重要提醒
                      </h3>
                      <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                        我们的服务不面向13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。
                      </p>
                    </div>
                  </div>
                </div>
                <p>
                  如果您是父母或监护人，并且您知道您的孩子向我们提供了个人信息，请联系我们。如果我们发现我们在未经父母同意的情况下收集了13岁以下儿童的个人信息，我们会采取措施从我们的服务器中删除该信息。
                </p>
              </div>
            </section>

            <section id="changes" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                10. 政策变更
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  我们可能会不时更新我们的隐私政策。我们将通过在此页面上发布新的隐私政策来通知您任何更改。
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                    变更通知
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-blue-800 dark:text-blue-200 text-sm">
                    <li>重大变更：提前30天通过邮件通知</li>
                    <li>一般变更：在网站上发布通知</li>
                    <li>紧急变更：立即生效并通知用户</li>
                  </ul>
                </div>
                <p>
                  建议您定期查看此隐私政策以了解任何更改。在此页面上发布修订后的隐私政策时，更改即生效。
                </p>
              </div>
            </section>

            <section id="contact" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                11. 联系我们
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  如果您对此隐私政策有任何疑问或建议，请通过以下方式联系我们：
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        联系方式
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <strong>邮箱：</strong> h7ml@qq.com
                        </li>
                        <li className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          <strong>GitHub：</strong>
                          <a
                            href="https://github.com/dext7r/athena"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            dext7r/athena
                          </a>
                        </li>
                        <li className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                            />
                          </svg>
                          <strong>网站：</strong>
                          <a
                            href="https://athena.deno.dev"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            athena.deno.dev
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        响应时间
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>• 一般咨询：1-3个工作日</li>
                        <li>• 隐私权利请求：7-14个工作日</li>
                        <li>• 紧急安全问题：24小时内</li>
                        <li>• 数据删除请求：30天内</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* 相关链接 */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              相关文档
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/legal/terms"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                服务条款
              </a>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <a
                href="/about"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                关于我们
              </a>
            </div>
          </div>

          {/* 法律页面导航 */}
          <LegalNavigation currentPage="privacy" />
        </div>
      </Layout>
    </>
  );
}
