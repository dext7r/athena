# 🚀 Release 发布指南

本文档介绍如何使用 Athena 项目的自动化发布系统。

## 📋 目录

- [发布流程概述](#发布流程概述)
- [版本管理](#版本管理)
- [自动化发布](#自动化发布)
- [手动发布](#手动发布)
- [Changelog 管理](#changelog-管理)
- [最佳实践](#最佳实践)

## 🔄 发布流程概述

Athena 项目采用自动化的发布流程，支持以下特性：

- ✅ **语义化版本控制** - 遵循 [SemVer](https://semver.org/) 规范
- ✅ **自动化 Changelog** - 基于提交信息自动生成
- ✅ **GitHub Releases** - 自动创建 GitHub 发布页面
- ✅ **多种发布方式** - 支持自动和手动触发
- ✅ **版本验证** - 发布前自动运行测试

## 📦 版本管理

### 版本号格式

项目遵循语义化版本控制：

```
主版本号.次版本号.修订号[-预发布标识]

例如：
- 1.0.0      (正式版本)
- 1.0.1      (修复版本)
- 1.1.0      (功能版本)
- 2.0.0      (重大更新)
- 1.0.0-beta.1 (预发布版本)
```

### 版本类型说明

| 类型         | 说明       | 示例                 | 使用场景         |
| ------------ | ---------- | -------------------- | ---------------- |
| `patch`      | 修复版本   | 1.0.0 → 1.0.1        | Bug 修复、小改进 |
| `minor`      | 功能版本   | 1.0.0 → 1.1.0        | 新功能、向后兼容 |
| `major`      | 重大版本   | 1.0.0 → 2.0.0        | 破坏性变更       |
| `prerelease` | 预发布版本 | 1.0.0 → 1.0.1-beta.1 | 测试版本         |

### 使用版本管理脚本

```bash
# 查看帮助信息
deno task version --help

# 升级修复版本 (推荐用于 bug 修复)
deno task version:patch

# 升级功能版本 (推荐用于新功能)
deno task version:minor

# 升级主版本 (推荐用于重大更改)
deno task version:major

# 创建预发布版本 (推荐用于测试)
deno task version:prerelease

# 指定具体版本号
deno task version --version 1.2.3

# 预览模式 (不实际执行)
deno task version:dry-run
```

## 🤖 自动化发布

### 基于 Git Tags 的自动发布

当推送带有版本标签的提交时，会自动触发发布流程：

```bash
# 使用版本管理脚本（推荐）
deno task version:patch

# 或手动创建标签
git tag -a v1.0.1 -m "Release v1.0.1"
git push origin v1.0.1
```

### 自动发布流程

1. **触发条件**: 推送 `v*` 格式的 Git 标签
2. **版本验证**: 检查版本号格式是否正确
3. **代码检查**: 运行 `deno task check` 和测试
4. **构建项目**: 执行 `deno task build`
5. **生成 Changelog**: 基于提交历史自动生成
6. **创建 Release**: 在 GitHub 上创建发布页面
7. **更新文档**: 自动更新 CHANGELOG.md

## 🖱️ 手动发布

### GitHub Actions 手动触发

1. 访问
   [GitHub Actions](https://github.com/dext7r/athena/actions/workflows/release.yml)
2. 点击 "Run workflow"
3. 填写发布参数：
   - **Version**: 版本号 (例如: v1.0.1)
   - **Pre-release**: 是否为预发布版本
   - **Draft**: 是否创建草稿发布

### 手动发布步骤

```bash
# 1. 确保工作目录干净
git status

# 2. 更新版本号
deno task version --version 1.0.1

# 3. 推送更改和标签
git push origin main
git push origin v1.0.1

# 4. 在 GitHub 上编辑发布说明
```

## 📝 Changelog 管理

### 自动生成 Changelog

项目会根据提交信息自动分类生成 changelog：

| 提交类型 | 关键词                               | Changelog 分类 |
| -------- | ------------------------------------ | -------------- |
| 新功能   | `feat`, `feature`, `add`, `新增`     | ✨ 新增功能    |
| 问题修复 | `fix`, `bug`, `修复`                 | 🐛 问题修复    |
| 改进优化 | `improve`, `enhance`, `优化`, `改进` | 🔧 改进优化    |
| 文档更新 | `docs`, `doc`, `文档`                | 📚 文档更新    |
| 测试相关 | `test`, `测试`                       | 🧪 测试相关    |

### 提交信息规范

为了更好地生成 changelog，建议使用以下提交信息格式：

```bash
# 新功能
git commit -m "feat: 添加用户认证功能"
git commit -m "add: 新增主题切换组件"

# 问题修复
git commit -m "fix: 修复登录页面样式问题"
git commit -m "bug: 解决内存泄漏问题"

# 改进优化
git commit -m "improve: 优化页面加载性能"
git commit -m "enhance: 改进用户体验"

# 文档更新
git commit -m "docs: 更新 API 文档"
git commit -m "doc: 添加使用示例"

# 测试相关
git commit -m "test: 添加单元测试"
git commit -m "测试: 完善集成测试"
```

### 手动更新 Changelog

如果需要手动编辑 changelog：

1. 编辑 `CHANGELOG.md` 文件
2. 在 `## [未发布]` 部分添加更改
3. 提交更改：`git commit -m "docs: 更新 changelog"`

## 🎯 最佳实践

### 发布前检查清单

- [ ] 所有测试通过
- [ ] 代码已经过 review
- [ ] 文档已更新
- [ ] 版本号符合语义化规范
- [ ] Changelog 内容准确

### 版本发布策略

#### 🔄 定期发布

- **修复版本**: 每周发布，包含 bug 修复
- **功能版本**: 每月发布，包含新功能
- **主版本**: 按需发布，包含重大更改

#### 🚀 紧急发布

- 安全漏洞修复
- 严重 bug 修复
- 生产环境问题

### 分支策略

```
main (生产分支)
├── develop (开发分支)
├── feature/* (功能分支)
├── hotfix/* (热修复分支)
└── release/* (发布分支)
```

### 发布后操作

1. **验证发布**: 检查 GitHub Releases 页面
2. **更新文档**: 确保文档与新版本同步
3. **通知团队**: 在相关渠道通知发布信息
4. **监控反馈**: 关注用户反馈和问题报告

## 🔗 相关链接

- [GitHub Releases](https://github.com/dext7r/athena/releases)
- [GitHub Actions](https://github.com/dext7r/athena/actions)
- [Changelog](https://github.com/dext7r/athena/blob/main/CHANGELOG.md)
- [语义化版本控制](https://semver.org/lang/zh-CN/)
- [Keep a Changelog](https://keepachangelog.com/zh-CN/)

## ❓ 常见问题

### Q: 如何回滚发布？

A: 可以通过以下方式回滚：

1. 在 GitHub Releases 中删除错误的发布
2. 删除对应的 Git 标签：`git tag -d v1.0.1 && git push origin :refs/tags/v1.0.1`
3. 发布修复版本

### Q: 预发布版本如何处理？

A: 预发布版本会标记为 "Pre-release"，不会被标记为 "Latest"，适合用于测试和预览。

### Q: 如何自定义发布说明？

A: 可以在发布后手动编辑 GitHub Release 页面的说明，或者在
`.github/RELEASE_TEMPLATE.md` 中修改模板。

---

<div align="center">

**📚 更多信息请查看 [项目文档](https://athena.deno.dev/docs)**

</div>
