# 🚀 Release 快速开始指南

本指南帮助您快速上手 Athena 项目的自动化发布系统。

## 📋 快速发布流程

### 🎯 **方法1：使用版本管理脚本（推荐）**

```bash
# 1. 修复版本发布 (0.0.1 → 0.0.2)
deno task version:patch

# 2. 功能版本发布 (0.0.1 → 0.1.0)
deno task version:minor

# 3. 重大版本发布 (0.0.1 → 1.0.0)
deno task version:major

# 4. 预发布版本 (0.0.1 → 0.0.1-beta.1)
deno task version:prerelease
```

### 🖱️ **方法2：GitHub Actions 手动触发**

1. 访问
   [GitHub Actions](https://github.com/dext7r/athena/actions/workflows/release.yml)
2. 点击 "Run workflow"
3. 填写参数：
   - **Version**: `v1.0.0`
   - **Pre-release**: `false`
   - **Draft**: `false`
4. 点击 "Run workflow"

### 🏷️ **方法3：Git 标签触发**

```bash
# 创建并推送标签
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

## ✅ 发布前检查清单

- [ ] 所有测试通过：`deno task test`
- [ ] 代码检查通过：`deno task check`
- [ ] 工作目录干净：`git status`
- [ ] 在正确分支：`git branch`

## 📝 提交信息规范

为了更好地生成 changelog，请使用规范的提交信息：

```bash
# ✨ 新功能
git commit -m "feat: 添加用户认证功能"
git commit -m "add: 新增主题切换组件"

# 🐛 问题修复
git commit -m "fix: 修复登录页面样式问题"
git commit -m "bug: 解决内存泄漏问题"

# 🔧 改进优化
git commit -m "improve: 优化页面加载性能"
git commit -m "enhance: 改进用户体验"

# 📚 文档更新
git commit -m "docs: 更新 API 文档"
git commit -m "doc: 添加使用示例"

# 🧪 测试相关
git commit -m "test: 添加单元测试"
git commit -m "测试: 完善集成测试"
```

## 🔧 常用命令

```bash
# 查看当前版本
cat deno.json | grep version

# 预览版本更新
deno task version:dry-run

# 查看版本管理帮助
deno task version --help

# 指定具体版本
deno task version --version 1.2.3

# 查看发布历史
git tag -l

# 查看最新发布
git describe --tags --abbrev=0
```

## 📊 发布后验证

发布完成后，请验证以下内容：

1. **GitHub Releases**:
   [查看发布页面](https://github.com/dext7r/athena/releases)
2. **Changelog**: 检查
   [CHANGELOG.md](https://github.com/dext7r/athena/blob/main/CHANGELOG.md)
3. **徽章状态**: 确认 README.md 中的徽章更新
4. **Actions 状态**: [查看构建状态](https://github.com/dext7r/athena/actions)

## 🚨 故障排除

### 问题1：权限错误

```bash
Error: Permission denied (os error 13)
```

**解决方案**：

```bash
chmod +x scripts/version.ts
```

### 问题2：Git 状态不干净

```bash
❌ 工作目录有未提交的更改
```

**解决方案**：

```bash
git add .
git commit -m "chore: 提交未保存的更改"
```

### 问题3：标签已存在

```bash
❌ Tag v1.0.0 already exists
```

**解决方案**：

```bash
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
```

## 🎯 最佳实践

### 📅 发布频率

- **修复版本**: 每周发布
- **功能版本**: 每月发布
- **主版本**: 按需发布

### 🔄 发布流程

1. 开发 → 测试 → 代码审查
2. 合并到 main 分支
3. 运行发布命令
4. 验证发布结果
5. 通知团队

### 📝 发布说明

- 使用清晰的标题
- 列出主要变更
- 包含破坏性变更警告
- 提供升级指南

## 🔗 相关链接

- 📚 [完整发布指南](./RELEASE.md)
- 🔐 [环境变量配置](./ENVIRONMENT.md)
- 📦 [GitHub Releases](https://github.com/dext7r/athena/releases)
- 🤖 [GitHub Actions](https://github.com/dext7r/athena/actions)

---

<div align="center">

**🎉 现在您已经掌握了 Athena 项目的发布流程！**

如有问题，请查看 [完整文档](./RELEASE.md) 或
[提交 Issue](https://github.com/dext7r/athena/issues)

</div>
