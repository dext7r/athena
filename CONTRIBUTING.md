# 贡献指南

感谢您对 Athena 项目的关注！我们欢迎所有形式的贡献，包括但不限于：

- 🐛 Bug 报告
- 💡 功能建议
- 📝 文档改进
- 🔧 代码贡献
- 🎨 设计改进

## 开始之前

在开始贡献之前，请确保您已经：

1. 阅读了项目的 [README.md](README.md)
2. 查看了现有的 [Issues](https://github.com/dext7r/athena/issues)
3. 阅读了我们的 [行为准则](CODE_OF_CONDUCT.md)

## 开发环境设置

### 前置要求

- [Deno](https://deno.land/) 2.0+
- Git
- 代码编辑器（推荐 VS Code）

### 本地开发

1. **Fork 并克隆仓库**

```bash
git clone https://github.com/dext7r/athena.git
cd athena
```

2. **启动开发服务器**

```bash
deno task start
```

3. **运行代码检查**

```bash
deno task check
```

## 贡献流程

### 1. 创建 Issue

在开始编码之前，请先创建一个 Issue 来描述您要解决的问题或添加的功能。这有助于：

- 避免重复工作
- 获得社区反馈
- 确保贡献符合项目方向

### 2. 创建分支

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

### 3. 开发和测试

- 遵循项目的代码风格
- 确保代码通过所有检查：`deno task check`
- 添加必要的文档
- 测试您的更改

### 4. 提交代码

使用清晰的提交信息：

```bash
git commit -m "feat: add new component Button"
git commit -m "fix: resolve theme toggle issue"
git commit -m "docs: update installation guide"
```

### 5. 推送并创建 Pull Request

```bash
git push origin your-branch-name
```

然后在 GitHub 上创建 Pull Request。

## 代码规范

### TypeScript/JavaScript

- 使用 TypeScript 进行类型安全
- 遵循 Deno 的代码风格
- 使用 `deno fmt` 格式化代码
- 使用 `deno lint` 检查代码质量

### 组件开发

- 组件应该是可复用的
- 提供清晰的 Props 接口
- 支持主题切换
- 响应式设计

### 样式规范

- 优先使用 TailwindCSS 类
- 复杂样式使用 Sass
- 遵循 BEM 命名规范（Sass 部分）
- 支持暗色主题

## 文档规范

- 使用中文编写文档
- 代码示例要完整可运行
- 包含必要的截图或演示
- 保持文档与代码同步

## Pull Request 指南

### PR 标题格式

```
type(scope): description

例如：
feat(components): add Modal component
fix(hooks): resolve useLocalStorage bug
docs(readme): update installation guide
```

### PR 描述

请在 PR 描述中包含：

- 🎯 **目的**：解决了什么问题或添加了什么功能
- 🔧 **更改**：具体做了哪些修改
- 🧪 **测试**：如何测试这些更改
- 📸 **截图**：如果有 UI 更改，请提供截图
- 📝 **备注**：其他需要注意的事项

### 代码审查

所有 PR 都需要经过代码审查。审查者会检查：

- 代码质量和风格
- 功能正确性
- 性能影响
- 文档完整性
- 测试覆盖率

## 发布流程

项目维护者会定期发布新版本：

1. 更新 `CHANGELOG.md`
2. 更新版本号
3. 创建 Git 标签
4. 发布到相关平台

## 获得帮助

如果您在贡献过程中遇到问题，可以：

- 在相关 Issue 中提问
- 创建新的 Discussion
- 联系项目维护者：h7ml@qq.com

## 致谢

感谢所有为 Athena 做出贡献的开发者！您的贡献让这个项目变得更好。

---

再次感谢您的贡献！🎉
