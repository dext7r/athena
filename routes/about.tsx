import { Head } from "$fresh/runtime.ts";
import Layout from "@components/layout/Layout.tsx";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/ui/Card.tsx";
import Button from "@components/ui/Button.tsx";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>关于项目 - Athena</title>
        <meta
          name="description"
          content="Athena 是一个现代化的全栈开发模板，集成了Fresh、Preact、TailwindCSS、Sass、Zustand等最新技术栈和最佳实践。"
        />
        <meta
          name="keywords"
          content="Athena , Fresh, Preact, TailwindCSS, Sass, Zustand, Deno, TypeScript, 全栈开发, 模板"
        />
        <meta property="og:title" content="关于项目 - Athena " />
        <meta
          property="og:description"
          content="Athena 是一个现代化的全栈开发模板，集成了Fresh、Preact、TailwindCSS、Sass、Zustand等最新技术栈和最佳实践。"
        />
        <meta property="og:type" content="website" />
        <meta name="author" content="h7ml <h7ml@qq.com>" />
      </Head>
      <Layout title="关于项目">
        <div className="space-y-16">
          {/* 页面标题 */}
          <div className="relative overflow-hidden">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-blue-900/20">
            </div>
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse">
              </div>
              <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000">
              </div>
              <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-cyan-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000">
              </div>
            </div>

            <div className="relative text-center space-y-8 py-20 px-4">
              <div className="inline-flex items-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-800 dark:text-indigo-200 text-sm font-medium">
                📖 项目介绍
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold">
                <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Athena
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                一个现代化的{" "}
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  全栈开发模板
                </span>， 集成了最新的技术栈和最佳实践，为开发者提供完整的{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  项目基础架构
                </span>{" "}
                和丰富的组件库
              </p>
            </div>
          </div>

          {/* 技术栈 */}
          <Card>
            <CardHeader>
              <CardTitle>🚀 技术栈</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    前端框架
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>
                      • <strong>Fresh</strong> - Deno的现代Web框架
                    </li>
                    <li>
                      • <strong>Preact</strong> - 轻量级React替代方案
                    </li>
                    <li>
                      • <strong>Islands架构</strong> - 最佳性能的渲染策略
                    </li>
                    <li>
                      • <strong>TypeScript</strong> - 类型安全的JavaScript
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    样式系统
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>
                      • <strong>TailwindCSS</strong> - 原子化CSS框架
                    </li>
                    <li>
                      • <strong>Sass</strong> - CSS预处理器
                    </li>
                    <li>
                      • <strong>CSS变量</strong> - 动态主题支持
                    </li>
                    <li>
                      • <strong>响应式设计</strong> - 移动端优先
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    状态管理
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>
                      • <strong>Zustand</strong> - 轻量级状态管理
                    </li>
                    <li>
                      • <strong>持久化</strong> - 自动本地存储
                    </li>
                    <li>
                      • <strong>DevTools</strong> - 开发调试支持
                    </li>
                    <li>
                      • <strong>TypeScript</strong> - 完整类型支持
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    开发工具
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>
                      • <strong>Deno</strong> - 现代JavaScript运行时
                    </li>
                    <li>
                      • <strong>热重载</strong> - 快速开发体验
                    </li>
                    <li>
                      • <strong>ESLint</strong> - 代码质量检查
                    </li>
                    <li>
                      • <strong>Prettier</strong> - 代码格式化
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 特性介绍 */}
          <Card>
            <CardHeader>
              <CardTitle>✨ 核心特性</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="text-3xl mb-3">🎨</div>
                  <h4 className="font-semibold mb-2">丰富的UI组件</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    包含按钮、卡片、输入框、模态框等常用组件，支持多种样式变体
                  </p>
                </div>

                <div className="text-center p-4">
                  <div className="text-3xl mb-3">🔧</div>
                  <h4 className="font-semibold mb-2">实用Hooks库</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    提供useLocalStorage、useDebounce、useFetch等实用hooks
                  </p>
                </div>

                <div className="text-center p-4">
                  <div className="text-3xl mb-3">🌙</div>
                  <h4 className="font-semibold mb-2">主题切换</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    支持亮色、暗色和系统主题，自动保存用户偏好
                  </p>
                </div>

                <div className="text-center p-4">
                  <div className="text-3xl mb-3">📱</div>
                  <h4 className="font-semibold mb-2">响应式设计</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    完美适配桌面端、平板和移动端设备
                  </p>
                </div>

                <div className="text-center p-4">
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="font-semibold mb-2">高性能</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    基于Islands架构，实现最佳的加载性能和用户体验
                  </p>
                </div>

                <div className="text-center p-4">
                  <div className="text-3xl mb-3">🔒</div>
                  <h4 className="font-semibold mb-2">类型安全</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    全面的TypeScript支持，提供完整的类型检查和智能提示
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 项目结构 */}
          <Card>
            <CardHeader>
              <CardTitle>📁 项目结构</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`athena/
├── components/          # UI组件
│   ├── ui/             # 基础UI组件
│   ├── layout/         # 布局组件
│   └── forms/          # 表单组件
├── hooks/              # 自定义Hooks
├── islands/            # 客户端交互组件
├── routes/             # 页面路由
├── static/             # 静态资源
├── stores/             # Zustand状态管理
├── styles/             # Sass样式
│   ├── base/           # 基础样式
│   ├── components/     # 组件样式
│   ├── utilities/      # 工具类
│   └── variables/      # 变量定义
├── types/              # TypeScript类型
├── utils/              # 工具函数
├── deno.json           # Deno配置
├── fresh.config.ts     # Fresh配置
└── tailwind.config.ts  # TailwindCSS配置`}</pre>
              </div>
            </CardContent>
          </Card>

          {/* 快速开始 */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle>🚀 快速开始</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm">
                  <div className="space-y-2">
                    <div># 克隆项目</div>
                    <div>git clone https://github.com/dext7r/athena.git</div>
                    <div></div>
                    <div># 进入项目目录</div>
                    <div>cd athena</div>
                    <div></div>
                    <div># 启动开发服务器</div>
                    <div>deno task start</div>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <a
                    href="https://github.com/dext7r/athena.git"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="primary">查看源码</Button>
                  </a>
                  <a
                    href="https://fresh.deno.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline">Fresh文档</Button>
                  </a>
                  <a
                    href="https://tailwindcss.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline">TailwindCSS</Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
}
