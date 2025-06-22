# 🔐 环境变量配置指南

本文档介绍 Athena 项目所需的环境变量配置，包括开发环境、CI/CD 和部署环境。

## 📋 目录

- [GitHub Actions 环境变量](#github-actions-环境变量)
- [开发环境变量](#开发环境变量)
- [部署环境变量](#部署环境变量)
- [安全配置](#安全配置)
- [故障排除](#故障排除)

## 🤖 GitHub Actions 环境变量

### 自动提供的环境变量

GitHub Actions 会自动提供以下环境变量，**无需手动配置**：

| 变量名              | 描述                        | 用途                             |
| ------------------- | --------------------------- | -------------------------------- |
| `GITHUB_TOKEN`      | GitHub 自动生成的访问令牌   | 访问仓库、创建 Release、推送代码 |
| `GITHUB_REPOSITORY` | 仓库名称 (格式: owner/repo) | 识别当前仓库                     |
| `GITHUB_REF`        | 当前分支或标签引用          | 确定触发的分支/标签              |
| `GITHUB_SHA`        | 当前提交的 SHA              | 标识具体的提交                   |
| `GITHUB_ACTOR`      | 触发工作流的用户            | 记录操作者                       |

### 权限配置

在 GitHub Actions 工作流中，我们已经配置了必要的权限：

```yaml
permissions:
  contents: write # 读写仓库内容
  pull-requests: read # 读取 PR 信息
```

### 验证 GitHub Token 权限

如果遇到权限问题，请检查：

1. **仓库设置** → **Actions** → **General**
2. 确保 "Workflow permissions" 设置为：
   - ✅ "Read and write permissions"
   - ✅ "Allow GitHub Actions to create and approve pull requests"

## 🛠️ 开发环境变量

### 可选环境变量

开发环境中可以设置以下环境变量来自定义行为：

```bash
# .env.local (可选)
# Deno 相关
DENO_DIR=/path/to/custom/deno/cache    # 自定义 Deno 缓存目录
DENO_NO_UPDATE_CHECK=1                 # 禁用更新检查

# 开发服务器
PORT=8000                              # 开发服务器端口
HOST=localhost                         # 开发服务器主机

# 调试模式
DEBUG=true                             # 启用调试模式
LOG_LEVEL=debug                        # 日志级别
```

### 设置开发环境变量

```bash
# 方法1: 在 shell 中设置
export PORT=3000
export DEBUG=true

# 方法2: 使用 .env 文件 (需要额外配置)
echo "PORT=3000" > .env.local
echo "DEBUG=true" >> .env.local

# 方法3: 在命令行中临时设置
PORT=3000 DEBUG=true deno task start
```

## 🚀 部署环境变量

### Deno Deploy

如果使用 Deno Deploy，可能需要配置：

```bash
# 生产环境变量
NODE_ENV=production
DENO_ENV=production

# 自定义域名 (可选)
CUSTOM_DOMAIN=athena.example.com

# API 密钥 (如果有外部服务)
API_KEY=your_api_key_here
DATABASE_URL=your_database_url_here
```

### 在 Deno Deploy 中设置环境变量

1. 访问 [Deno Deploy Dashboard](https://dash.deno.com/)
2. 选择你的项目
3. 进入 "Settings" → "Environment Variables"
4. 添加所需的环境变量

### GitHub Pages

GitHub Pages 部署通常不需要额外的环境变量，但可以配置：

```yaml
# .github/workflows/ci.yml 中的环境变量
env:
  NODE_ENV: production
  PUBLIC_URL: https://dext7r.github.io/athena
```

## 🔒 安全配置

### 敏感信息处理

**❌ 不要在代码中硬编码敏感信息**：

```typescript
// ❌ 错误做法
const apiKey = "sk-1234567890abcdef";
const databaseUrl = "postgresql://user:password@host:5432/db";
```

**✅ 正确做法**：

```typescript
// ✅ 使用环境变量
const apiKey = Deno.env.get("API_KEY");
const databaseUrl = Deno.env.get("DATABASE_URL");

// ✅ 提供默认值和验证
const port = parseInt(Deno.env.get("PORT") || "8000");
if (!apiKey) {
  throw new Error("API_KEY environment variable is required");
}
```

### GitHub Secrets

对于敏感的环境变量，使用 GitHub Secrets：

1. 访问仓库 → **Settings** → **Secrets and variables** → **Actions**
2. 点击 "New repository secret"
3. 添加密钥名称和值
4. 在工作流中使用：

```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

## 🔧 故障排除

### 常见问题

#### 1. GitHub Token 权限不足

**错误信息**：

```
Error: Resource not accessible by integration
```

**解决方案**：

1. 检查仓库的 Actions 权限设置
2. 确保工作流中的 `permissions` 配置正确
3. 验证 `GITHUB_TOKEN` 的作用域

#### 2. 环境变量未定义

**错误信息**：

```
Error: Environment variable 'VARIABLE_NAME' is not defined
```

**解决方案**：

```typescript
// 添加环境变量检查
const requiredEnvVars = ["API_KEY", "DATABASE_URL"];
for (const envVar of requiredEnvVars) {
  if (!Deno.env.get(envVar)) {
    console.error(`❌ 缺少必需的环境变量: ${envVar}`);
    Deno.exit(1);
  }
}
```

#### 3. 版本管理脚本权限问题

**错误信息**：

```
Error: Permission denied (os error 13)
```

**解决方案**：

```bash
# 确保脚本有执行权限
chmod +x scripts/version.ts

# 或者使用完整的 deno 命令
deno run --allow-read --allow-write --allow-run scripts/version.ts
```

### 调试环境变量

```typescript
// 调试脚本：列出所有环境变量
console.log("🔍 当前环境变量:");
for (const [key, value] of Object.entries(Deno.env.toObject())) {
  // 隐藏敏感信息
  const displayValue = key.toLowerCase().includes("token") ||
      key.toLowerCase().includes("key") ||
      key.toLowerCase().includes("secret")
    ? "***"
    : value;
  console.log(`  ${key}=${displayValue}`);
}
```

### 验证配置

创建一个验证脚本来检查环境配置：

```typescript
// scripts/check-env.ts
const requiredForDevelopment = ["PORT"];
const requiredForProduction = ["NODE_ENV"];
const requiredForCI = ["GITHUB_TOKEN", "GITHUB_REPOSITORY"];

function checkEnvironment(env: string) {
  console.log(`🔍 检查 ${env} 环境配置...`);

  let required: string[] = [];
  switch (env) {
    case "development":
      required = requiredForDevelopment;
      break;
    case "production":
      required = requiredForProduction;
      break;
    case "ci":
      required = requiredForCI;
      break;
  }

  const missing = required.filter((key) => !Deno.env.get(key));

  if (missing.length > 0) {
    console.error(`❌ 缺少环境变量: ${missing.join(", ")}`);
    return false;
  }

  console.log(`✅ ${env} 环境配置正确`);
  return true;
}

// 使用方法
// deno run --allow-env scripts/check-env.ts development
```

## 📚 相关资源

- [Deno 环境变量文档](https://deno.land/manual/getting_started/environment_variables)
- [GitHub Actions 环境变量](https://docs.github.com/en/actions/learn-github-actions/environment-variables)
- [GitHub Secrets 管理](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Deno Deploy 环境变量](https://deno.com/deploy/docs/environment-variables)

## ✅ 检查清单

在部署前，请确认：

- [ ] GitHub Actions 权限配置正确
- [ ] 所有必需的环境变量已设置
- [ ] 敏感信息使用 GitHub Secrets 管理
- [ ] 开发和生产环境变量分离
- [ ] 环境变量验证逻辑已实现
- [ ] 文档和团队成员已同步配置信息

---

<div align="center">

**🔐 安全提醒：永远不要在公开仓库中提交包含敏感信息的文件**

</div>
