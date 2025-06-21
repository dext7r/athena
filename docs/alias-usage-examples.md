# @别名使用示例

项目现已支持@别名，可以使用更简洁的导入路径。

## 可用的别名

| 别名           | 指向目录        | 说明         |
| -------------- | --------------- | ------------ |
| `@/`           | `./`            | 项目根目录   |
| `@components/` | `./components/` | 组件目录     |
| `@islands/`    | `./islands/`    | Islands 目录 |
| `@hooks/`      | `./hooks/`      | 自定义 Hooks |
| `@stores/`     | `./stores/`     | 状态管理     |
| `@utils/`      | `./utils/`      | 工具函数     |
| `@styles/`     | `./styles/`     | 样式文件     |
| `@types/`      | `./types/`      | 类型定义     |
| `@routes/`     | `./routes/`     | 路由文件     |
| `@static/`     | `./static/`     | 静态资源     |

## 使用示例

### 组件导入

```tsx
// 之前的相对路径导入
import Button from "../components/ui/Button.tsx";
import Layout from "../../components/layout/Layout.tsx";

// 现在可以使用@别名
import Button from "@components/ui/Button.tsx";
import Layout from "@components/layout/Layout.tsx";
```

### Hooks 导入

```tsx
// 之前
import { useCounter } from "../hooks/useCounter.ts";
import { useTheme } from "../../hooks/useTheme.ts";

// 现在
import { useCounter } from "@hooks/useCounter.ts";
import { useTheme } from "@hooks/useTheme.ts";
```

### 状态管理导入

```tsx
// 之前
import { useAppStore } from "../stores/useAppStore.ts";

// 现在
import { useAppStore } from "@stores/useAppStore.ts";
```

### 工具函数导入

```tsx
// 之前
import { auth } from "../../utils/auth.ts";

// 现在
import { auth } from "@utils/auth.ts";
```

### 样式导入

```tsx
// 之前
import "../styles/components/button.scss";

// 现在
import "@styles/components/button.scss";
```

## 配置说明

别名配置在以下文件中：

1. **deno.json** - Deno 运行时的导入映射
2. **tsconfig.json** - TypeScript 编译器的路径映射（用于IDE智能提示）

这样配置确保了运行时和开发时的一致性。
