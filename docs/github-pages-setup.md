# GitHub Pages 部署指南

## 🚀 自动部署测试覆盖率报告到 GitHub Pages

本项目已配置自动将测试覆盖率报告部署到 GitHub
Pages，让团队成员可以方便地查看项目的测试覆盖率情况。

## 📋 前置条件

1. **GitHub 仓库设置**
   - 确保仓库是公开的（或者有 GitHub Pro/Team 账户）
   - 拥有仓库的管理员权限

2. **分支要求**
   - 代码推送到 `main` 分支才会触发部署
   - 确保所有测试通过

## ⚙️ GitHub Pages 配置步骤

### 1. 启用 GitHub Pages

1. 进入 GitHub 仓库页面
2. 点击 **Settings** 选项卡
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**

### 2. 配置权限（重要！）

在仓库的 **Settings** → **Actions** → **General** 中：

1. 找到 **Workflow permissions** 部分
2. 选择 **Read and write permissions**
3. 勾选 **Allow GitHub Actions to create and approve pull requests**
4. 点击 **Save** 保存设置

### 3. 验证部署

推送代码到 `main` 分支后：

1. 进入 **Actions** 选项卡查看工作流状态
2. 等待 `CI` 工作流完成（包括测试和部署步骤）
3. 部署成功后，访问 `https://athena.deno.dev`

## 📊 覆盖率报告功能

### 主要特性

- **📱 响应式设计**: 支持桌面端和移动端访问
- **📈 实时统计**: 显示测试用例数量、覆盖率等关键指标
- **🔗 快速导航**: 直接链接到详细覆盖率报告和源代码
- **⏰ 自动更新**: 每次推送代码后自动更新报告

### 访问方式

1. **详细报告**: `https://dext7r.github.io/athena/html/index.html`

### 实际部署地址

- **测试覆盖率报告**:
  [https://dext7r.github.io/athena/html/index.html](https://dext7r.github.io/athena/html/index.html)

## 🔧 自定义配置

### 修改部署条件

如果需要从其他分支部署，修改 `.github/workflows/ci.yml`：

```yaml
# 当前配置：仅 main 分支
if: github.ref == 'refs/heads/main'

# 修改为：main 或 develop 分支
if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'
```

### 自定义报告样式

编辑 `coverage/index.html` 文件来自定义：

- 页面标题和描述
- 统计数据显示
- 颜色主题和样式
- 链接和按钮

### 添加自定义域名

1. 在仓库根目录创建 `CNAME` 文件
2. 在文件中写入你的域名（如：`reports.yourdomain.com`）
3. 在域名提供商处配置 DNS 记录

## 📈 工作流程说明

### 自动化流程

```mermaid
graph LR
    A[推送到 main] --> B[运行测试]
    B --> C[生成覆盖率报告]
    C --> D[部署到 GitHub Pages]
    D --> E[更新在线报告]
```

### 部署步骤详解

1. **代码检查**: Lint 和格式化检查
2. **运行测试**: 执行所有测试用例
3. **生成报告**: 创建 HTML 格式的覆盖率报告
4. **上传构件**: 准备部署文件
5. **部署页面**: 发布到 GitHub Pages

## 🚨 故障排除

### 常见问题

#### 1. 部署失败：权限不足

**解决方案**:

- 检查仓库的 Actions 权限设置
- 确保选择了 "Read and write permissions"

#### 2. 页面显示 404

**解决方案**:

- 确认 GitHub Pages 源设置为 "GitHub Actions"
- 检查工作流是否成功完成
- 等待几分钟让 DNS 生效

#### 3. 覆盖率报告链接失效

**解决方案**:

- 检查 `coverage/html/index.html` 文件是否存在
- 确认测试覆盖率生成步骤是否成功

#### 4. 样式显示异常

**解决方案**:

- 清除浏览器缓存
- 检查 CSS 文件路径是否正确
- 验证 HTML 语法是否有误

### 调试工具

```bash
# 本地生成覆盖率报告
deno task test:coverage

# 检查生成的文件
ls -la coverage/
ls -la coverage/html/

# 本地预览（需要 HTTP 服务器）
cd coverage && python -m http.server 8080
# 或者使用 Deno
deno run --allow-net --allow-read https://deno.land/std/http/file_server.ts coverage/
```

## 📚 相关文档

- [GitHub Pages 官方文档](https://docs.github.com/pages)
- [GitHub Actions 工作流语法](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)
- [Deno 测试覆盖率](https://deno.land/manual/testing/coverage)

## 🎯 最佳实践

1. **定期检查**: 定期查看覆盖率报告，确保测试质量
2. **设置阈值**: 在 CI 中设置最低覆盖率要求
3. **团队协作**: 将报告链接分享给团队成员
4. **持续改进**: 根据报告结果优化测试策略

---

**💡 提示**: 首次设置后，每次推送到 main
分支都会自动更新覆盖率报告，无需手动操作。
