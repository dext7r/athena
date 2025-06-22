/**
 * 认证系统接入指南
 */

import Layout from "@components/layout/Layout.tsx";

export default function AuthDocsPage() {
  return (
    <>
      <Layout title="认证系统接入指南" backToTopVariant="primary">
        <div className="max-w-6xl mx-auto">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              认证系统接入指南
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              完整的 Athena 认证系统使用指南，包含 OAuth 配置、API
              使用、安全最佳实践和代码示例
            </p>
          </div>

          {/* 快速开始 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🚀 快速开始
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  配置 OAuth
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  设置 GitHub、Google 等 OAuth 应用
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  集成 API
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  使用认证 API 和中间件
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  部署上线
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  配置生产环境和安全设置
                </p>
              </div>
            </div>
          </div>

          {/* 目录导航 */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📖 文档目录
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <a
                href="#overview"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                系统概述
              </a>
              <a
                href="#oauth-config"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                OAuth 配置
              </a>
              <a
                href="#api-reference"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                API 参考
              </a>
              <a
                href="#middleware"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                中间件使用
              </a>
              <a
                href="#session-management"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                会话管理
              </a>
              <a
                href="#security"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                安全最佳实践
              </a>
              <a
                href="#examples"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                代码示例
              </a>
              <a
                href="#deployment"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                部署指南
              </a>
              <a
                href="#troubleshooting"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                故障排除
              </a>
            </div>
          </div>

          {/* 系统概述 */}
          <section id="overview" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
              📋 系统概述
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  认证架构
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Athena 采用基于 JWT 的无状态认证系统，支持多种 OAuth
                  提供商，提供完整的会话管理和安全控制。
                </p>

                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    核心特性
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        🔐 多提供商支持
                      </h5>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• GitHub OAuth</li>
                        <li>• Google OAuth</li>
                        <li>• Microsoft OAuth</li>
                        <li>• Gitee OAuth</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        🛡️ 安全特性
                      </h5>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• JWT 令牌认证</li>
                        <li>• 会话管理</li>
                        <li>• CSRF 保护</li>
                        <li>• 安全 Cookie</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        ⚡ 开发体验
                      </h5>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• 类型安全</li>
                        <li>• 中间件支持</li>
                        <li>• 简单集成</li>
                        <li>• 完整文档</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        📊 管理功能
                      </h5>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• 用户信息管理</li>
                        <li>• 会话监控</li>
                        <li>• 设备管理</li>
                        <li>• 安全日志</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  认证流程
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white text-sm">1</span>
                      </div>
                      <p className="text-sm font-medium">用户点击登录</p>
                    </div>
                    <div className="hidden md:block text-gray-400">→</div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white text-sm">2</span>
                      </div>
                      <p className="text-sm font-medium">重定向到 OAuth</p>
                    </div>
                    <div className="hidden md:block text-gray-400">→</div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white text-sm">3</span>
                      </div>
                      <p className="text-sm font-medium">授权回调</p>
                    </div>
                    <div className="hidden md:block text-gray-400">→</div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white text-sm">4</span>
                      </div>
                      <p className="text-sm font-medium">生成 JWT</p>
                    </div>
                    <div className="hidden md:block text-gray-400">→</div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white text-sm">5</span>
                      </div>
                      <p className="text-sm font-medium">设置 Cookie</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* OAuth 配置 */}
          <section id="oauth-config" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
              ⚙️ OAuth 配置
            </h2>

            <div className="space-y-8">
              {/* GitHub 配置 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    GitHub OAuth 配置
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      1. 创建 GitHub OAuth 应用
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400 ml-4">
                      <li>
                        访问{" "}
                        <a
                          href="https://github.com/settings/applications/new"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                          target="_blank"
                        >
                          GitHub Developer Settings
                        </a>
                      </li>
                      <li>点击 "New OAuth App"</li>
                      <li>
                        填写应用信息：
                        <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                          <li>Application name: 你的应用名称</li>
                          <li>
                            Homepage URL:{" "}
                            <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">
                              https://yourdomain.com
                            </code>
                          </li>
                          <li>
                            Authorization callback URL:{" "}
                            <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">
                              https://yourdomain.com/api/auth/callback?provider=github
                            </code>
                          </li>
                        </ul>
                      </li>
                      <li>获取 Client ID 和 Client Secret</li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      2. 环境变量配置
                    </h4>
                    <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`# GitHub OAuth 配置
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# 基础配置
BASE_URL=https://yourdomain.com
JWT_SECRET=your_jwt_secret_key
SESSION_EXPIRE_TIME=86400`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google 配置 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">G</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Google OAuth 配置
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      1. 创建 Google OAuth 应用
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400 ml-4">
                      <li>
                        访问{" "}
                        <a
                          href="https://console.cloud.google.com/"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                          target="_blank"
                        >
                          Google Cloud Console
                        </a>
                      </li>
                      <li>创建新项目或选择现有项目</li>
                      <li>启用 Google+ API</li>
                      <li>创建 OAuth 2.0 客户端 ID</li>
                      <li>
                        配置授权重定向 URI:{" "}
                        <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">
                          https://yourdomain.com/api/auth/callback?provider=google
                        </code>
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      2. 环境变量配置
                    </h4>
                    <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`# Google OAuth 配置
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* API 参考 */}
          <section id="api-reference" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
              🔌 API 参考
            </h2>

            <div className="space-y-8">
              {/* 认证端点 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  认证端点
                </h3>
                <div className="space-y-4">
                  {/* 登录 */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium rounded">
                        GET
                      </span>
                      <code className="text-lg font-mono">
                        /api/auth/[provider]
                      </code>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      启动 OAuth 登录流程
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          支持的提供商
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded">
                            github
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded">
                            google
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded">
                            microsoft
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded">
                            gitee
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          查询参数
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left py-2 text-gray-900 dark:text-white">
                                  参数
                                </th>
                                <th className="text-left py-2 text-gray-900 dark:text-white">
                                  类型
                                </th>
                                <th className="text-left py-2 text-gray-900 dark:text-white">
                                  说明
                                </th>
                              </tr>
                            </thead>
                            <tbody className="text-gray-700 dark:text-gray-300">
                              <tr className="border-b border-gray-100 dark:border-gray-800">
                                <td className="py-2 font-mono">redirect</td>
                                <td className="py-2">string</td>
                                <td className="py-2">
                                  登录成功后的重定向URL（可选）
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          示例
                        </h4>
                        <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-green-400 text-sm">
{`// 基础登录
GET /api/auth/github

// 带重定向的登录
GET /api/auth/github?redirect=/dashboard

// JavaScript 中使用
window.location.href = '/api/auth/github?redirect=' + encodeURIComponent(window.location.pathname);`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 获取用户信息 */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium rounded">
                        GET
                      </span>
                      <code className="text-lg font-mono">/api/auth/me</code>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      获取当前登录用户信息
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          请求头
                        </h4>
                        <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-green-400 text-sm">
{`Cookie: auth_token=your_jwt_token
# 或者
Authorization: Bearer your_jwt_token`}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          响应示例
                        </h4>
                        <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-green-400 text-sm">
{`{
  "authenticated": true,
  "user": {
    "id": "123456",
    "username": "johndoe",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://avatars.githubusercontent.com/u/123456",
    "profileUrl": "https://github.com/johndoe",
    "provider": "github",
    "joinedAt": "2024-01-01T00:00:00.000Z",
    "lastLoginAt": "2024-12-22T10:30:00.000Z"
  },
  "expiresAt": "2024-12-23T10:30:00.000Z"
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 会话管理 */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium rounded">
                        GET
                      </span>
                      <code className="text-lg font-mono">
                        /api/auth/sessions
                      </code>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      获取用户的所有活跃会话
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          响应示例
                        </h4>
                        <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-green-400 text-sm">
{`{
  "sessions": [
    {
      "id": "session_123",
      "deviceInfo": {
        "browser": "Chrome",
        "os": "macOS",
        "device": "Desktop"
      },
      "ipAddress": "192.168.1.100",
      "location": "北京, 中国",
      "createdAt": "2024-12-22T10:30:00.000Z",
      "lastActiveAt": "2024-12-22T15:45:00.000Z",
      "isCurrent": true
    }
  ],
  "stats": {
    "totalSessions": 3,
    "activeSessions": 2,
    "expiredSessions": 1
  }
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 中间件使用 */}
          <section id="middleware" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
              🛡️ 中间件使用
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  路由保护
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  使用认证中间件保护需要登录的路由
                </p>

                <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`// routes/protected-page.tsx
import { FreshContext } from "fresh";
import { getAuthContext } from "@utils/middleware.ts";
import type { AppUser } from "@utils/auth.ts";

interface ProtectedPageProps {
  user: AppUser;
}

export const handler = {
  async GET(ctx: FreshContext): Promise<Response> {
    const req = ctx.req;
    const authContext = await getAuthContext(req);

    if (!authContext.isAuthenticated) {
      // 未登录，重定向到登录页面
      const loginUrl = \`/api/auth/github?redirect=\${
        encodeURIComponent(req.url)
      }\`;
      return new Response(null, {
        status: 302,
        headers: { "Location": loginUrl },
      });
    }

    return new Response(null, { status: 200 });
  },
};

export default function ProtectedPage({ data }: PageProps<ProtectedPageProps>) {
  return (
    <div>
      <h1>欢迎, {data.user.name}!</h1>
      <p>这是一个受保护的页面</p>
    </div>
  );
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  API 路由保护
                </h3>
                <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`// routes/api/protected-endpoint.ts
import { FreshContext } from "fresh";
import { getAuthContext } from "@utils/middleware.ts";

export const handler = {
  async GET(ctx: FreshContext): Promise<Response> {
    const req = ctx.req;
    const authContext = await getAuthContext(req);

    if (!authContext.isAuthenticated) {
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // 处理已认证的请求
    return new Response(
      JSON.stringify({
        message: "Hello, " + authContext.user?.name,
        data: "sensitive data"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  },
};`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* 安全最佳实践 */}
          <section id="security" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
              🔒 安全最佳实践
            </h2>

            <div className="space-y-8">
              {/* JWT 安全 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  JWT 令牌安全
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">
                        ✅ 推荐做法
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• 使用强随机密钥（至少256位）</li>
                        <li>• 设置合理的过期时间（24小时内）</li>
                        <li>• 使用 HttpOnly Cookie 存储</li>
                        <li>• 启用 SameSite 保护</li>
                        <li>• 定期轮换密钥</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">
                        ❌ 避免做法
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• 在 localStorage 中存储令牌</li>
                        <li>• 使用弱密钥或默认密钥</li>
                        <li>• 设置过长的过期时间</li>
                        <li>• 在 URL 中传递令牌</li>
                        <li>• 忽略令牌验证</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      环境变量配置
                    </h4>
                    <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`# 生成强随机密钥
JWT_SECRET=$(openssl rand -base64 32)

# 设置合理的过期时间（秒）
SESSION_EXPIRE_TIME=86400  # 24小时

# 启用安全Cookie设置
SECURE_COOKIES=true
SAMESITE_STRICT=true`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* HTTPS 和 Cookie 安全 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  HTTPS 和 Cookie 安全
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Cookie 安全配置
                    </h4>
                    <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`// 安全的 Cookie 设置
const secureCookie = [
  "auth_token=jwt_token_here",
  "HttpOnly",                    // 防止 XSS 攻击
  "Secure",                      // 仅在 HTTPS 下传输
  "SameSite=Strict",            // 防止 CSRF 攻击
  "Max-Age=86400",              // 24小时过期
  "Path=/",                     // 全站有效
].join("; ");`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5"
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
                        <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                          重要提醒
                        </h4>
                        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                          生产环境必须使用 HTTPS。在开发环境中，Secure
                          标志会阻止 Cookie 在 HTTP 下工作。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 防护措施 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  常见攻击防护
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      CSRF 防护
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li>• 使用 SameSite Cookie 属性</li>
                      <li>• 验证 Referer 头</li>
                      <li>• 实施 CSRF 令牌</li>
                      <li>• 双重提交 Cookie</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      XSS 防护
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li>• 使用 HttpOnly Cookie</li>
                      <li>• 输入验证和转义</li>
                      <li>• 内容安全策略 (CSP)</li>
                      <li>• 避免 innerHTML 使用</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      会话劫持防护
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li>• 强制 HTTPS 传输</li>
                      <li>• 定期轮换会话ID</li>
                      <li>• 监控异常登录</li>
                      <li>• 实施会话超时</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      暴力破解防护
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li>• 实施速率限制</li>
                      <li>• 账户锁定机制</li>
                      <li>• 验证码保护</li>
                      <li>• 监控失败尝试</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 部署指南 */}
          <section id="deployment" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
              🚀 部署指南
            </h2>

            <div className="space-y-8">
              {/* 环境变量配置 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  环境变量配置
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      必需的环境变量
                    </h4>
                    <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`# 基础配置
BASE_URL=https://yourdomain.com
JWT_SECRET=your_super_secret_jwt_key_here
SESSION_EXPIRE_TIME=86400

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Microsoft OAuth
MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret

# Gitee OAuth
GITEE_CLIENT_ID=your_gitee_client_id
GITEE_CLIENT_SECRET=your_gitee_client_secret`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      可选的环境变量
                    </h4>
                    <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
{`# 安全配置
SECURE_COOKIES=true
SAMESITE_STRICT=true
CORS_ORIGIN=https://yourdomain.com

# 日志配置
LOG_LEVEL=info
ENABLE_AUTH_LOGS=true

# 会话配置
MAX_SESSIONS_PER_USER=10
SESSION_CLEANUP_INTERVAL=3600`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deno Deploy 部署 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Deno Deploy 部署
                </h3>
                <div className="space-y-4">
                  <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>连接 GitHub 仓库</strong>
                      <p className="text-sm mt-1 ml-6">
                        在 Deno Deploy 控制台中连接你的 GitHub 仓库
                      </p>
                    </li>
                    <li>
                      <strong>配置环境变量</strong>
                      <p className="text-sm mt-1 ml-6">
                        在项目设置中添加所有必需的环境变量
                      </p>
                    </li>
                    <li>
                      <strong>设置自定义域名</strong>
                      <p className="text-sm mt-1 ml-6">
                        配置你的域名并确保 HTTPS 证书正常工作
                      </p>
                    </li>
                    <li>
                      <strong>更新 OAuth 回调 URL</strong>
                      <p className="text-sm mt-1 ml-6">
                        在各个 OAuth 提供商中更新回调 URL 为生产域名
                      </p>
                    </li>
                  </ol>

                  <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                      部署检查清单
                    </h4>
                    <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                      <li>□ 所有环境变量已配置</li>
                      <li>□ OAuth 应用回调 URL 已更新</li>
                      <li>□ HTTPS 证书正常工作</li>
                      <li>□ 认证流程测试通过</li>
                      <li>□ 会话管理功能正常</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 故障排除 */}
          <section id="troubleshooting" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
              🔧 故障排除
            </h2>

            <div className="space-y-6">
              {/* 常见问题 */}
              <div className="space-y-4">
                {[
                  {
                    question: "OAuth 登录失败，显示 'invalid_client' 错误",
                    answer:
                      "检查 OAuth 应用的 Client ID 和 Client Secret 是否正确配置，确保回调 URL 与 OAuth 应用设置中的 URL 完全匹配。",
                  },
                  {
                    question: "用户登录后立即被重定向到登录页面",
                    answer:
                      "可能是 JWT 密钥配置错误或 Cookie 设置问题。检查 JWT_SECRET 环境变量，确保在生产环境中启用了 HTTPS。",
                  },
                  {
                    question: "会话管理 API 返回 401 错误",
                    answer:
                      "确保请求包含有效的认证 Cookie 或 Authorization 头，检查 JWT 令牌是否过期。",
                  },
                  {
                    question: "在开发环境中 Cookie 无法设置",
                    answer:
                      "在开发环境中禁用 Secure Cookie 标志，或使用 HTTPS 进行本地开发。",
                  },
                  {
                    question: "多个会话之间出现冲突",
                    answer:
                      "检查会话存储实现，确保会话 ID 的唯一性，考虑实施会话清理机制。",
                  },
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Q: {faq.question}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      A: {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              {/* 调试技巧 */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  调试技巧
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      启用详细日志
                    </h4>
                    <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-3 text-sm">
                      <pre className="text-green-400">
{`# 在 .env 中添加
LOG_LEVEL=debug
ENABLE_AUTH_LOGS=true`}
                      </pre>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      检查 JWT 令牌
                    </h4>
                    <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-3 text-sm">
                      <pre className="text-green-400">
{`// 在浏览器控制台中
document.cookie
  .split(';')
  .find(c => c.includes('auth_token'))`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
