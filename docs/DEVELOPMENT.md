# 🔧 开发指南

本文档提供 Athena 项目的完整开发指南，包括环境搭建、开发流程、代码规范等。

## 📋 目录

- [环境搭建](#环境搭建)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [组件开发](#组件开发)
- [API 开发](#api-开发)
- [测试开发](#测试开发)
- [调试技巧](#调试技巧)

## 🛠️ 环境搭建

### 必需软件

| 软件        | 版本要求 | 下载链接                                                | 说明                         |
| ----------- | -------- | ------------------------------------------------------- | ---------------------------- |
| **Deno**    | 2.0+     | [deno.land](https://deno.land/)                         | JavaScript/TypeScript 运行时 |
| **Git**     | 2.0+     | [git-scm.com](https://git-scm.com/)                     | 版本控制系统                 |
| **VS Code** | 最新版   | [code.visualstudio.com](https://code.visualstudio.com/) | 推荐编辑器                   |

### VS Code 扩展

```json
{
  "recommendations": [
    "denoland.vscode-deno",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### 项目初始化

```bash
# 1. 克隆项目
git clone https://github.com/dext7r/athena.git
cd athena

# 2. 配置 VS Code
code .

# 3. 启用 Deno 扩展
# Ctrl+Shift+P -> "Deno: Initialize Workspace Configuration"

# 4. 安装依赖（Deno 会自动处理）
deno task check

# 5. 启动开发服务器
deno task dev
```

## 🔄 开发流程

### Git 工作流

#### 分支策略

```
main (生产分支)
├── develop (开发分支)
├── feature/功能名称 (功能分支)
├── hotfix/修复名称 (热修复分支)
└── release/版本号 (发布分支)
```

#### 开发步骤

```bash
# 1. 从 develop 分支创建功能分支
git checkout develop
git pull origin develop
git checkout -b feature/新功能名称

# 2. 开发功能
# ... 编写代码 ...

# 3. 提交代码
git add .
git commit -m "feat: 添加新功能描述"

# 4. 推送分支
git push origin feature/新功能名称

# 5. 创建 Pull Request
# 在 GitHub 上创建 PR，目标分支为 develop
```

### 提交规范

#### 提交信息格式

```
<类型>(<范围>): <描述>

[可选的正文]

[可选的脚注]
```

#### 提交类型

| 类型       | 说明     | 示例                        |
| ---------- | -------- | --------------------------- |
| `feat`     | 新功能   | `feat: 添加用户认证功能`    |
| `fix`      | 问题修复 | `fix: 修复登录页面样式问题` |
| `docs`     | 文档更新 | `docs: 更新 API 文档`       |
| `style`    | 代码格式 | `style: 格式化代码`         |
| `refactor` | 代码重构 | `refactor: 重构用户服务`    |
| `test`     | 测试相关 | `test: 添加单元测试`        |
| `chore`    | 构建过程 | `chore: 更新依赖包`         |

## 📝 代码规范

### TypeScript 规范

#### 类型定义

```typescript
// ✅ 推荐：明确的类型定义
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// ✅ 推荐：使用泛型
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// ❌ 避免：使用 any 类型
const userData: any = {};

// ✅ 推荐：使用 unknown 或具体类型
const userData: unknown = {};
```

#### 函数规范

```typescript
// ✅ 推荐：明确的参数和返回类型
async function fetchUser(id: string): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

// ✅ 推荐：使用箭头函数处理简单逻辑
const formatDate = (date: Date): string => date.toLocaleDateString("zh-CN");
```

### React/Preact 规范

#### 组件定义

```tsx
// ✅ 推荐：函数组件 + TypeScript
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  children,
  variant = "primary",
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

#### Hooks 使用

```tsx
// ✅ 推荐：自定义 Hook
function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUser(id)
      .then(setUser)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { user, loading, error };
}
```

### CSS/TailwindCSS 规范

#### 类名组织

```tsx
// ✅ 推荐：使用 clsx 组织类名
import { clsx } from "clsx";

function Card({ className, children, variant }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-lg shadow-md p-4",
        variant === "primary" && "bg-blue-500 text-white",
        variant === "secondary" && "bg-gray-100 text-gray-900",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

#### 响应式设计

```tsx
// ✅ 推荐：移动优先的响应式设计
<div className="
  w-full p-4
  sm:w-1/2 sm:p-6
  md:w-1/3 md:p-8
  lg:w-1/4 lg:p-10
">
  内容
</div>;
```

## 🎨 组件开发

### 组件分类

#### 基础组件 (`components/ui/`)

```tsx
// 示例：Button 组件
export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button(props: ButtonProps) {
  // 组件实现
}
```

#### 业务组件 (`components/`)

```tsx
// 示例：UserProfile 组件
export interface UserProfileProps {
  user: User;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function UserProfile(props: UserProfileProps) {
  // 组件实现
}
```

#### 交互组件 (`islands/`)

```tsx
// 示例：SearchBox 组件
export default function SearchBox() {
  const [query, setQuery] = useState("");

  // 客户端交互逻辑

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="搜索..."
    />
  );
}
```

### 组件测试

```tsx
// 组件测试示例
import { fireEvent, render, screen } from "@testing-library/preact";
import { Button } from "./Button.tsx";

Deno.test("Button 组件测试", async (t) => {
  await t.step("应该渲染按钮文本", () => {
    render(<Button>点击我</Button>);
    expect(screen.getByText("点击我")).toBeInTheDocument();
  });

  await t.step("应该处理点击事件", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>点击我</Button>);

    fireEvent.click(screen.getByText("点击我"));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

## 🛣️ API 开发

### API 路由结构

```
routes/api/
├── auth/
│   ├── login.ts
│   ├── logout.ts
│   └── callback.ts
├── users/
│   ├── index.ts
│   ├── [id].ts
│   └── profile.ts
└── admin/
    ├── users.ts
    └── settings.ts
```

### API 处理器

```typescript
// 示例：用户 API
import { FreshContext } from "fresh";

export const handler = {
  async GET(ctx: FreshContext): Promise<Response> {
    try {
      const users = await getUserList();
      return new Response(JSON.stringify({
        success: true,
        data: users,
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        message: error.message,
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },

  async POST(ctx: FreshContext): Promise<Response> {
    try {
      const userData = await ctx.req.json();
      const user = await createUser(userData);
      return new Response(JSON.stringify({
        success: true,
        data: user,
      }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        message: error.message,
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
```

### 中间件

```typescript
// 认证中间件示例
export async function authMiddleware(req: Request, ctx: any) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return Response.json({
      message: "未授权访问",
    }, { status: 401 });
  }

  try {
    const user = await verifyToken(token);
    ctx.state.user = user;
    return await ctx.next();
  } catch (error) {
    return Response.json({
      message: "无效的访问令牌",
    }, { status: 401 });
  }
}
```

## 🧪 测试开发

### 测试结构

```
test/
├── components/     # 组件测试
├── hooks/         # Hooks 测试
├── utils/         # 工具函数测试
├── api/           # API 测试
├── integration/   # 集成测试
└── performance/   # 性能测试
```

### 测试示例

```typescript
// 工具函数测试
import { assertEquals } from "jsr:@std/assert@1";
import { formatDate } from "@utils/date.ts";

Deno.test("formatDate 函数测试", () => {
  const date = new Date("2024-01-01");
  const formatted = formatDate(date);
  assertEquals(formatted, "2024年1月1日");
});

// API 测试
Deno.test("用户 API 测试", async () => {
  const response = await fetch("http://localhost:8000/api/users");
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(data.success, true);
});
```

## 🐛 调试技巧

### 开发工具

#### VS Code 调试配置

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Deno Debug",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "deno",
      "runtimeArgs": ["task", "dev", "--inspect"],
      "attachSimplePort": 9229
    }
  ]
}
```

#### 浏览器调试

```typescript
// 使用 console 调试
console.log("调试信息:", data);
console.table(users);
console.time("性能测试");
// ... 代码 ...
console.timeEnd("性能测试");

// 使用 debugger 断点
function complexFunction(data: any) {
  debugger; // 浏览器会在此处暂停
  // ... 逻辑 ...
}
```

### 常见问题

#### 类型错误

```typescript
// 问题：Property 'xxx' does not exist on type 'unknown'
// 解决：使用类型断言或类型守卫
const data = response as User;
// 或
if (isUser(response)) {
  // TypeScript 现在知道 response 是 User 类型
}
```

#### 导入错误

```typescript
// 问题：Module not found
// 解决：检查 deno.json 中的路径映射
import { Button } from "@components/ui/Button.tsx"; // ✅
import { Button } from "./components/ui/Button.tsx"; // ❌
```

## 📚 学习资源

### 官方文档

- [Deno 官方文档](https://deno.land/manual)
- [Fresh 框架文档](https://fresh.deno.dev/docs)
- [Preact 文档](https://preactjs.com/guide/v10/getting-started)
- [TailwindCSS 文档](https://tailwindcss.com/docs)

### 推荐阅读

- [TypeScript 最佳实践](https://typescript-eslint.io/rules/)
- [React Hooks 指南](https://react.dev/reference/react)
- [Web 性能优化](https://web.dev/performance/)
- [无障碍设计指南](https://www.w3.org/WAI/WCAG21/quickref/)

---

<div align="center">

**🔧 开发愉快！如有问题请查看 [FAQ](./FAQ.md) 或
[提交 Issue](https://github.com/dext7r/athena/issues)**

</div>
