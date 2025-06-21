# 快速开始

本指南将帮助您在 5 分钟内快速上手 Athena 。

## 🚀 第一步：环境准备

### 安装 Deno

如果您还没有安装 Deno，请访问 [Deno 官网](https://deno.land/) 下载安装。

```bash
# macOS/Linux
curl -fsSL https://deno.land/install.sh | sh

# Windows (PowerShell)
irm https://deno.land/install.ps1 | iex
```

验证安装：

```bash
deno --version
```

## 📦 第二步：获取项目

```bash
# 克隆项目
git clone https://github.com/dext7r/athena.git
cd athena

# 或者使用 GitHub CLI
gh repo clone dext7r/athena
cd athena
```

## 🏃‍♂️ 第三步：启动项目

```bash
# 启动开发服务器
deno task start
```

项目将在 [http://localhost:8000](http://localhost:8000) 启动。

## 🎯 第四步：探索功能

### 查看首页

访问 [http://localhost:8000](http://localhost:8000) 查看项目首页，了解项目特性。

### 组件演示

访问 [http://localhost:8000/components](http://localhost:8000/components)
查看所有 UI 组件。

### Hooks 演示

访问 [http://localhost:8000/hooks](http://localhost:8000/hooks) 体验自定义
Hooks。

### 状态管理

访问 [http://localhost:8000/state](http://localhost:8000/state)
了解状态管理功能。

## 🛠️ 第五步：开始开发

### 创建新页面

1. 在 `routes/` 目录下创建新文件：

```tsx
// routes/my-page.tsx
import { Head } from "$fresh/runtime.ts";
import Layout from "../components/layout/Layout.tsx";
import Button from "../components/ui/Button.tsx";

export default function MyPage() {
  return (
    <>
      <Head>
        <title>我的页面 - Athena</title>
      </Head>
      <Layout title="我的页面">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">欢迎来到我的页面</h1>
          <Button variant="primary">点击我</Button>
        </div>
      </Layout>
    </>
  );
}
```

2. 访问 [http://localhost:8000/my-page](http://localhost:8000/my-page)
   查看新页面。

### 创建新组件

1. 在 `components/ui/` 目录下创建新组件：

```tsx
// components/ui/MyComponent.tsx
interface MyComponentProps {
  title: string;
  children?: React.ComponentChildren;
}

export default function MyComponent({ title, children }: MyComponentProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
}
```

2. 在页面中使用：

```tsx
import MyComponent from "../components/ui/MyComponent.tsx";

// 在组件中使用
<MyComponent title="我的组件">
  <p>这是组件内容</p>
</MyComponent>;
```

### 使用自定义 Hooks

```tsx
import { useLocalStorage, useToggle } from "../hooks/index.ts";

export default function MyPage() {
  const [name, setName] = useLocalStorage("userName", "");
  const [isVisible, toggleVisible] = useToggle(false);

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="输入您的姓名"
      />
      <button onClick={toggleVisible}>
        {isVisible ? "隐藏" : "显示"}
      </button>
      {isVisible && <p>Hello, {name}!</p>}
    </div>
  );
}
```

### 使用状态管理

```tsx
import { useAppStore } from "../stores/useAppStore.ts";

export default function MyPage() {
  const { isLoading, setLoading } = useAppStore();

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? "加载中..." : "开始加载"}
    </button>
  );
}
```

## 🎨 样式定制

### 使用 TailwindCSS

```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors">
  TailwindCSS 样式
</div>;
```

### 使用 Sass

1. 在 `styles/components/` 下创建 `.scss` 文件
2. 在 `styles/main.scss` 中导入
3. 在组件中使用类名

## 🔧 常用命令

```bash
# 启动开发服务器
deno task start

# 代码检查
deno task check

# 构建项目
deno task build

# 预览生产版本
deno task preview

# 更新 Fresh 框架
deno task update
```

## 📚 下一步

- 阅读 [组件文档](components/README.md) 了解所有可用组件
- 查看 [Hooks 文档](hooks/README.md) 学习自定义 Hooks
- 了解 [状态管理](state-management/zustand.md) 最佳实践
- 学习 [样式系统](styling/theming.md) 定制主题

## 🆘 需要帮助？

- 查看 [常见问题](faq.md)
- 提交 [Issue](https://github.com/dext7r/athena/issues)
- 联系维护者：h7ml@qq.com

---

恭喜！您已经成功开始使用 Athena 了！🎉
