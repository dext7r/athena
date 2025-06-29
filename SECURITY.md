# 安全政策

## 支持的版本

我们目前支持以下版本的安全更新：

| 版本  | 支持状态 |
| ----- | -------- |
| 0.0.x | ✅       |

## 报告安全漏洞

我们非常重视 Athena 的安全性。如果您发现了安全漏洞，请负责任地向我们披露。

### 如何报告

**请不要通过公开的 GitHub Issues 报告安全漏洞。**

相反，请通过以下方式之一报告：

1. **推荐方式**: 使用 GitHub 的私密安全报告功能
   - 访问
     [Security Advisories](https://github.com/dext7r/athena/security/advisories/new)
   - 点击 "Report a vulnerability"
   - 填写详细信息

2. **邮件报告**: 发送邮件至 h7ml@qq.com
   - 邮件主题：`[SECURITY] Athena  安全漏洞报告`
   - 请在邮件中包含尽可能多的信息

### 报告内容

请在您的报告中包含以下信息：

- **漏洞类型** (例如：XSS、CSRF、注入攻击等)
- **受影响的组件或文件**
- **漏洞的详细描述**
- **重现步骤** (如果可能)
- **潜在影响** 的评估
- **建议的修复方案** (如果有)
- **您的联系信息** (用于后续沟通)

### 示例报告格式

```
漏洞类型: [例如：XSS]
受影响版本: [例如：0.0.1]
受影响组件: [例如：components/ui/Input.tsx]

描述:
[详细描述漏洞]

重现步骤:
1. [步骤 1]
2. [步骤 2]
3. [步骤 3]

潜在影响:
[描述可能的安全影响]

建议修复:
[如果有修复建议]
```

## 响应时间

我们承诺：

- **确认收到**: 在 48 小时内确认收到您的报告
- **初步评估**: 在 7 天内提供初步评估
- **修复时间**: 根据漏洞严重程度，在 30 天内发布修复

## 漏洞严重程度

我们使用以下标准评估漏洞严重程度：

### 🔴 严重 (Critical)

- 可能导致完全系统妥协
- 远程代码执行
- 数据泄露影响所有用户

### 🟠 高危 (High)

- 可能导致重要数据泄露
- 权限提升
- 影响多个用户的安全问题

### 🟡 中危 (Medium)

- 可能导致有限的数据泄露
- 需要用户交互的攻击
- 影响单个用户的安全问题

### 🟢 低危 (Low)

- 信息泄露
- 需要复杂条件的攻击
- 影响有限的安全问题

## 安全最佳实践

### 对于贡献者

- 始终使用最新版本的依赖项
- 遵循安全编码实践
- 对用户输入进行适当的验证和清理
- 使用 HTTPS 进行所有网络通信
- 定期运行安全扫描

### 对于用户

- 保持 Deno 和依赖项更新到最新版本
- 定期检查安全公告
- 在生产环境中使用 HTTPS
- 实施适当的访问控制
- 定期备份数据

## 安全更新

安全更新将通过以下渠道发布：

- GitHub Security Advisories
- GitHub Releases
- 项目 README 和 CHANGELOG
- 邮件通知（如果您提供了联系信息）

## 致谢

我们感谢安全研究人员和用户帮助保持 Athena
的安全。负责任地报告安全问题的研究人员将在修复发布后得到适当的致谢（除非他们希望保持匿名）。

## 联系信息

如果您对我们的安全政策有任何疑问，请联系：

- **邮箱**: h7ml@qq.com
- **GitHub**: [@h7ml](https://github.com/h7ml)

---

**最后更新**: 2025-06-21
