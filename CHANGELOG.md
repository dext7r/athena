# 更新日志

本文件记录了 Athena 项目的所有重要更改。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [未发布]

### 最近更改

#### 🚀 重大升级

- **Fresh V2 迁移完成** - 成功升级到 Fresh 2.0
  - 更新所有 API 路由语法 (HandlerContext → FreshContext)
  - 修复 Tailwind CSS 配置和插件集成
  - 解决所有类型检查错误
  - 增强剪贴板复制功能，支持降级方案
  - 完善开发工具链配置

#### ✨ 新增功能

- **增强的复制功能** - 支持现代 Clipboard API 和传统 execCommand 降级
- **测试页面** - 添加 `/test-copy` 页面用于测试复制功能

#### 🐛 问题修复

- 修复剪贴板 API 在非 HTTPS 环境下的兼容性问题
- 修复 Fresh V2 中的类型错误和 API 路由问题
- 修复 Tailwind CSS 在 Fresh V2 中的配置问题

## [0.0.1] - 2025-06-21

### 新增

- 🚀 基于 Fresh 2.0 的项目架构
- 🎨 完整的 UI 组件库
  - Button 组件（多种变体和状态）
  - Card 组件（支持多种样式）
  - Input 组件（表单输入）
  - Modal 组件（模态框）
- 🔧 实用的自定义 Hooks
  - useLocalStorage - 本地存储管理
  - useDebounce - 防抖处理
  - useFetch - 数据获取
  - useMediaQuery - 媒体查询
  - useTheme - 主题管理
  - useToggle - 开关状态
  - useCounter - 计数器状态
- 🌙 完整的主题系统
  - 亮色主题
  - 暗色主题
  - 系统主题自动切换
  - 主题状态持久化
- 💾 状态管理系统
  - 基于 Zustand 4.4.7
  - 应用状态管理 (useAppStore)
  - 主题状态管理 (useThemeStore)
  - 用户状态管理 (useUserStore)
- 🎨 样式系统
  - TailwindCSS 3.4.1 原子化样式
  - Sass 1.69.5 预处理器
  - 响应式设计支持
  - 自定义主题变量
- 📱 Islands 架构
  - 客户端交互组件
  - 服务端渲染优化
  - 按需加载
- 🛣️ 路由系统
  - 基于文件系统的路由
  - 动态路由支持
  - API 路由
  - 错误状态页面 (401, 403, 500, 502, 503)
- 📋 页面和演示
  - 首页 - 项目介绍和特性展示
  - 组件页面 - UI 组件演示
  - Hooks 页面 - 自定义 Hooks 演示
  - 状态管理页面 - Zustand 状态演示
  - 关于页面 - 项目信息
- 🔧 开发工具配置
  - TypeScript 支持
  - Deno 任务脚本
  - 代码格式化和 Lint
  - 热重载开发服务器
- 📦 依赖管理
  - Preact 10.22.0 作为 React 替代
  - Preact Signals 1.2.2 响应式状态
  - Deno Standard Library 0.216.0
  - 自动 node_modules 管理

### 技术栈

- **运行时**: Deno 2.0+
- **框架**: Fresh 2.0
- **UI 库**: Preact 10.22.0
- **样式**: TailwindCSS 3.4.1 + Sass 1.69.5
- **状态管理**: Zustand 4.4.7
- **类型系统**: TypeScript
- **构建工具**: Fresh 内置构建系统

### 项目结构

```
athena/
├── components/     # 可复用组件
├── islands/        # Fresh Islands (客户端组件)
├── routes/         # 路由页面和 API
├── hooks/          # 自定义 Hooks
├── stores/         # Zustand 状态管理
├── styles/         # Sass 样式文件
├── static/         # 静态资源
├── types/          # TypeScript 类型定义
└── utils/          # 工具函数
```

---

## 版本说明

- **[未发布]** - 即将发布的更改
- **[0.0.1]** - 初始版本发布

## 贡献

如果您想为此项目做出贡献，请查看我们的 [贡献指南](CONTRIBUTING.md)。

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。
