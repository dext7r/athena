<div align="center">

# 🏛️ Athena

**现代化的 Deno Fresh 全栈开发模板**

_基于 Fresh 2.0 + TypeScript + TailwindCSS 构建的企业级 Web 应用模板_

---

<!-- 版本和技术栈徽章 -->
<p>
  <img src="https://img.shields.io/github/v/release/dext7r/athena?style=flat&color=brightgreen&logo=github&label=Latest%20Release" alt="Latest Release">
  <img src="https://img.shields.io/github/release-date/dext7r/athena?style=flat&color=blue&logo=calendar&label=Release%20Date" alt="Release Date">
  <img src="https://img.shields.io/badge/Deno-2.0+-000000?style=flat&logo=deno&logoColor=white" alt="Deno">
  <img src="https://img.shields.io/badge/Fresh-2.0-00D2FF?style=flat&logo=fresh&logoColor=white" alt="Fresh">
  <img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript">
</p>

<!-- 构建状态和质量徽章 -->
<p>
  <img src="https://github.com/dext7r/athena/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI Status">
  <img src="https://github.com/dext7r/athena/actions/workflows/test.yml/badge.svg?branch=main" alt="Test Status">
  <img src="https://github.com/dext7r/athena/actions/workflows/release.yml/badge.svg" alt="Release Status">
  <img src="https://codecov.io/gh/dext7r/athena/branch/main/graph/badge.svg" alt="Coverage">
</p>

<!-- 社区和下载徽章 -->
<p>
  <img src="https://img.shields.io/github/license/dext7r/athena?style=flat&color=green&logo=license" alt="License">
  <img src="https://img.shields.io/github/stars/dext7r/athena?style=flat&color=yellow&logo=star" alt="Stars">
  <img src="https://img.shields.io/github/forks/dext7r/athena?style=flat&color=blue&logo=fork" alt="Forks">
  <img src="https://img.shields.io/github/issues/dext7r/athena?style=flat&color=red&logo=github" alt="Issues">
</p>

<!-- 快速链接 -->
<p>
  <a href="https://athena.deno.dev">🌐 在线演示</a> •
  <a href="https://github.com/dext7r/athena/releases">🚀 Releases</a> •
  <a href="https://athena.deno.dev/docs">📚 文档</a> •
  <a href="https://dext7r.github.io/athena/html/index.html">📊 测试报告</a> •
  <a href="https://github.com/dext7r/athena/issues">🐛 问题反馈</a>
</p>

</div>

---

## ✨ 项目特色

Athena 是一个现代化的全栈 Web 应用开发模板，基于 Deno Fresh 2.0
构建，提供企业级的开发体验和最佳实践。

### 🎯 **核心亮点**

- 🚀 **现代技术栈** - Deno 2.0 + Fresh 2.0 + TypeScript 5.0+
- ⚡ **极致性能** - Islands 架构 + SSR + 边缘计算优化
- 🎨 **精美 UI** - TailwindCSS + 响应式设计 + 暗色主题
- 🔐 **企业安全** - 多提供商 OAuth + JWT + MFA + 审计日志
- 🧪 **质量保证** - 完整测试套件 + 自动化 CI/CD + 代码覆盖率
- 📦 **开箱即用** - 丰富组件库 + Hooks + 状态管理 + 工具函数

<details>
<summary>📋 <strong>完整特性列表</strong></summary>

### 🎨 **UI & 设计**

- ✅ 响应式设计系统
- ✅ 暗色/亮色主题切换
- ✅ 丰富的 UI 组件库
- ✅ TailwindCSS + Sass 样式
- ✅ 自定义图标系统
- ✅ 动画和过渡效果

### 🔧 **开发体验**

- ✅ TypeScript 类型安全
- ✅ 热重载开发服务器
- ✅ 代码格式化和 Lint
- ✅ 自动化 CI/CD
- ✅ 完整的文档系统
- ✅ 开发工具集成

### ⚡ **性能优化**

- ✅ Islands 架构
- ✅ 服务端渲染 (SSR)
- ✅ 静态资源优化
- ✅ 代码分割和懒加载
- ✅ 缓存策略
- ✅ 边缘计算支持

### 🛡️ **安全特性**

- ✅ 多提供商 OAuth 认证
- ✅ JWT 会话管理
- ✅ 多因素认证 (MFA)
- ✅ 账户锁定保护
- ✅ 审计日志系统
- ✅ 安全中间件

### 🧪 **测试 & 质量**

- ✅ 单元测试 + 集成测试
- ✅ 性能测试 + 基准测试
- ✅ 代码覆盖率报告
- ✅ 自动化测试流水线
- ✅ 质量门禁
- ✅ 持续集成

### 🚀 **部署 & 运维**

- ✅ 自动化发布流程
- ✅ 版本管理工具
- ✅ 环境配置管理
- ✅ 监控和日志
- ✅ 多平台部署支持
- ✅ Docker 容器化

</details>

---

## 🚀 快速开始

### 📋 **环境要求**

- [Deno](https://deno.land/) 2.0+
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/) (推荐)

### ⚡ **一键启动**

```bash
# 1. 克隆项目
git clone https://github.com/dext7r/athena.git
cd athena

# 2. 启动开发服务器
deno task start

# 🎉 打开浏览器访问 http://localhost:8000
```

<details>
<summary>🔧 <strong>详细安装步骤</strong></summary>

### 1. **克隆项目**

```bash
git clone https://github.com/dext7r/athena.git
cd athena
```

### 2. **配置环境变量**

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件，配置 OAuth 提供商（可选）
# 至少需要配置一个 OAuth 提供商才能使用登录功能
```

### 3. **启动项目**

```bash
# 开发模式（推荐）
deno task dev

# 或生产模式
deno task start
```

### 4. **验证安装**

- 访问 http://localhost:8000
- 查看控制台输出确认无错误
- 尝试登录功能（需要配置 OAuth）

</details>

---

## 📚 文档导航

<div align="center">

### 🎯 **快速导航**

| 类型 | 文档                                    | 描述                 |
| ---- | --------------------------------------- | -------------------- |
| 📋   | [项目概览](docs/PROJECT_OVERVIEW.md)    | 架构设计和技术选型   |
| 🔧   | [开发指南](docs/DEVELOPMENT.md)         | 完整的开发流程和规范 |
| 🚀   | [快速发布](docs/QUICK_START_RELEASE.md) | 5分钟学会发布流程    |
| 📦   | [发布指南](docs/RELEASE.md)             | 完整的版本管理文档   |
| 🔐   | [环境配置](docs/ENVIRONMENT.md)         | 环境变量配置指南     |
| 🧪   | [测试指南](docs/TESTING.md)             | 测试框架和最佳实践   |
| 🚀   | [部署指南](docs/DEPLOYMENT.md)          | 部署到各种平台       |
| 🤝   | [贡献指南](CONTRIBUTING.md)             | 如何参与项目开发     |

### 🔗 **重要链接**

| 资源 | 链接                                                         | 说明         |
| ---- | ------------------------------------------------------------ | ------------ |
| 🌐   | [在线演示](https://athena.deno.dev)                          | 体验完整功能 |
| 📦   | [GitHub Releases](https://github.com/dext7r/athena/releases) | 查看所有版本 |
| 🤖   | [GitHub Actions](https://github.com/dext7r/athena/actions)   | CI/CD 状态   |
| 📊   | [测试报告](https://dext7r.github.io/athena/html/index.html)  | 代码覆盖率   |
| 🐛   | [问题反馈](https://github.com/dext7r/athena/issues)          | 报告 Bug     |
| 💬   | [讨论区](https://github.com/dext7r/athena/discussions)       | 社区交流     |

</div>

---

## 🛠️ 开发命令

<details>
<summary>📋 <strong>常用命令列表</strong></summary>

### 🚀 **启动命令**

```bash
deno task start      # 启动生产服务器
deno task dev        # 启动开发服务器（热重载）
```

### 🧪 **测试命令**

```bash
deno task test       # 运行所有测试
deno task test:watch # 监视模式运行测试
deno task test:coverage # 生成覆盖率报告
```

### 🔧 **开发工具**

```bash
deno task check      # 类型检查
deno task lint       # 代码检查
deno task fmt        # 代码格式化
deno task build      # 构建项目
```

### 📦 **版本管理**

```bash
deno task version:patch      # 发布修复版本
deno task version:minor      # 发布功能版本
deno task version:major      # 发布重大版本
deno task version:dry-run    # 预览版本更新
```

</details>

---

## 🤝 贡献

我们欢迎所有形式的贡献！请查看 [贡献指南](CONTRIBUTING.md) 了解详情。

### 🌟 **贡献方式**

- 🐛
  [报告 Bug](https://github.com/dext7r/athena/issues/new?template=bug_report.md)
- 💡
  [提出功能建议](https://github.com/dext7r/athena/issues/new?template=feature_request.md)
- 📖 [改进文档](https://github.com/dext7r/athena/edit/main/README.md)
- 🔧 [提交代码](https://github.com/dext7r/athena/pulls)

---

## 📄 许可证

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**本项目采用 MIT 许可证** - 查看 [LICENSE](LICENSE) 文件了解详情

</div>

---

<div align="center">

### 🌟 如果这个项目对您有帮助，请给我们一个 Star

[![GitHub stars](https://img.shields.io/github/stars/dext7r/athena?style=social)](https://github.com/dext7r/athena/stargazers)

**感谢您的支持！** 🙏

---

**Made with ❤️ by [h7ml](https://github.com/h7ml)**

</div>
