# GitHub OAuth 设置指南

本指南将帮助您设置 GitHub OAuth App，以便在 Athena 中使用 GitHub 登录功能。

## 📋 前置要求

- GitHub 账户
- 已部署的 Athena 应用（或本地开发环境）

## 🔧 创建 GitHub OAuth App

### 1. 访问 GitHub 设置

1. 登录 GitHub
2. 点击右上角头像 → **Settings**
3. 在左侧菜单中选择 **Developer settings**
4. 选择 **OAuth Apps**
5. 点击 **New OAuth App**

### 2. 填写应用信息

| 字段                           | 值                                          | 说明             |
| ------------------------------ | ------------------------------------------- | ---------------- |
| **Application name**           | `Athena`                                    | 应用名称         |
| **Homepage URL**               | `https://your-domain.com`                   | 应用主页 URL     |
| **Application description**    | `Modern React + Deno full-stack template`   | 应用描述（可选） |
| **Authorization callback URL** | `https://your-domain.com/api/auth/callback` | OAuth 回调 URL   |

### 3. 开发环境配置

如果是本地开发，请使用以下配置：

| 字段                           | 值                                        |
| ------------------------------ | ----------------------------------------- |
| **Homepage URL**               | `http://localhost:8000`                   |
| **Authorization callback URL** | `http://localhost:8000/api/auth/callback` |

### 4. 获取凭据

创建成功后，您将获得：

- **Client ID** - 公开的应用标识符
- **Client Secret** - 私密的应用密钥（点击 "Generate a new client secret"）

⚠️ **重要**: Client Secret 只显示一次，请立即保存！

## 🔐 配置环境变量

### 1. 复制环境变量模板

```bash
cp .env.example .env
```

### 2. 填写 OAuth 配置

编辑 `.env` 文件：

```bash
# GitHub OAuth 配置
GITHUB_CLIENT_ID=your_actual_client_id_here
GITHUB_CLIENT_SECRET=your_actual_client_secret_here

# 应用基础 URL
APP_BASE_URL=http://localhost:8000  # 开发环境
# APP_BASE_URL=https://your-domain.com  # 生产环境

# JWT 密钥（生成一个安全的随机字符串）
JWT_SECRET=your_super_secret_jwt_key_here

# 会话过期时间（秒，默认24小时）
SESSION_EXPIRE_TIME=86400
```

### 3. 生成安全的 JWT 密钥

您可以使用以下方法生成安全的 JWT 密钥：

```bash
# 方法1: 使用 openssl
openssl rand -base64 32

# 方法2: 使用 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# 方法3: 在线生成器
# 访问 https://generate-secret.vercel.app/32
```

## 🚀 测试配置

### 1. 启动应用

```bash
deno task start
```

### 2. 验证配置

访问 `http://localhost:8000`，您应该能看到：

- 登录按钮
- 点击登录按钮会跳转到 GitHub 授权页面

### 3. 完成授权流程

1. 点击 "Login with GitHub"
2. 在 GitHub 页面授权应用
3. 自动跳转回应用并完成登录

## 🔒 安全最佳实践

### 1. 环境变量安全

- ✅ 永远不要将 `.env` 文件提交到版本控制
- ✅ 在生产环境使用环境变量或密钥管理服务
- ✅ 定期轮换 Client Secret 和 JWT Secret

### 2. OAuth 配置安全

- ✅ 确保回调 URL 使用 HTTPS（生产环境）
- ✅ 限制 OAuth 应用的权限范围
- ✅ 定期审查授权的应用

### 3. JWT 安全

- ✅ 使用强随机密钥
- ✅ 设置合理的过期时间
- ✅ 在生产环境启用 Secure Cookie

## 🌐 生产环境部署

### 1. 更新 OAuth App 设置

在 GitHub OAuth App 设置中：

- 将 Homepage URL 更新为生产域名
- 将 Authorization callback URL 更新为生产回调地址

### 2. 环境变量配置

```bash
# 生产环境配置
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
APP_BASE_URL=https://your-production-domain.com
JWT_SECRET=your_production_jwt_secret
SESSION_EXPIRE_TIME=86400
NODE_ENV=production
```

## 🐛 常见问题

### Q: 授权后跳转到错误页面

**A**: 检查 OAuth App 的回调 URL 是否与 `APP_BASE_URL` 匹配

### Q: 登录后立即退出

**A**: 检查 JWT_SECRET 是否正确设置，确保不是默认值

### Q: 无法获取用户信息

**A**: 检查 GitHub API 权限，确保 OAuth scope 包含 `user:email`

### Q: 本地开发无法登录

**A**: 确保 GitHub OAuth App 配置了正确的本地回调 URL

## 📚 相关文档

- [GitHub OAuth Apps 文档](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [OAuth 2.0 规范](https://tools.ietf.org/html/rfc6749)
- [JWT 规范](https://tools.ietf.org/html/rfc7519)
