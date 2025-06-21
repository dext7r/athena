import { useState } from "preact/hooks";
import Button from "@components/ui/Button.tsx";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/ui/Card.tsx";
import Input from "@components/ui/Input.tsx";
import {
  useBreakpoint,
  useCounter,
  useDebounce,
  useLocalStorage,
  useToggle,
} from "@hooks/index.ts";

export default function HooksDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* useLocalStorage Hook */}
      <LocalStorageDemo />

      {/* useDebounce Hook */}
      <DebounceDemo />

      {/* useToggle Hook */}
      <ToggleDemo />

      {/* useCounter Hook */}
      <CounterHookDemo />

      {/* useBreakpoint Hook */}
      <BreakpointDemo />
    </div>
  );
}

// useLocalStorage 演示
function LocalStorageDemo() {
  const [name, setName, removeName] = useLocalStorage("demo-name", "");
  const [count, setCount] = useLocalStorage("demo-count", 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>useLocalStorage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            自动同步状态到本地存储
          </p>

          <div className="space-y-3">
            <Input
              label="姓名"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="输入你的姓名"
            />

            <div className="flex items-center gap-3">
              <span className="text-sm">计数: {count}</span>
              <Button size="sm" onClick={() => setCount(count + 1)}>+1</Button>
              <Button size="sm" variant="outline" onClick={() => setCount(0)}>
                重置
              </Button>
            </div>

            <Button size="sm" variant="secondary" onClick={removeName}>
              清除姓名
            </Button>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 p-2 bg-gray-100 dark:bg-gray-800 rounded">
            刷新页面数据仍然保持
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// useDebounce 演示
function DebounceDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <Card>
      <CardHeader>
        <CardTitle>useDebounce</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            防抖处理，延迟500ms更新
          </p>

          <Input
            label="搜索"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            placeholder="输入搜索内容..."
          />

          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">实时值:</span> {searchTerm}
            </div>
            <div>
              <span className="font-medium">防抖值:</span> {debouncedSearchTerm}
            </div>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 p-2 bg-gray-100 dark:bg-gray-800 rounded">
            停止输入500ms后防抖值才会更新
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// useToggle 演示
function ToggleDemo() {
  const [isVisible, toggleVisible, setTrue, setFalse] = useToggle(false);
  const [isEnabled, toggleEnabled] = useToggle(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>useToggle</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            布尔值状态切换管理
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm">
                可见性: {isVisible ? "显示" : "隐藏"}
              </span>
              <Button size="sm" onClick={toggleVisible}>切换</Button>
              <Button size="sm" variant="outline" onClick={setTrue}>
                显示
              </Button>
              <Button size="sm" variant="outline" onClick={setFalse}>
                隐藏
              </Button>
            </div>

            {isVisible && (
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg animate-fade-in">
                这个内容是可切换的！
              </div>
            )}

            <div className="flex items-center gap-3">
              <span className="text-sm">
                启用状态: {isEnabled ? "开启" : "关闭"}
              </span>
              <Button
                size="sm"
                variant={isEnabled ? "primary" : "secondary"}
                onClick={toggleEnabled}
              >
                {isEnabled ? "关闭" : "开启"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// useCounter Hook 演示
function CounterHookDemo() {
  const { count, increment, decrement, reset, set } = useCounter(10, {
    min: 0,
    max: 20,
    step: 2,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>useCounter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            带限制的计数器 (0-20, 步长2)
          </p>

          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              {count}
            </div>

            <div className="flex justify-center gap-2">
              <Button size="sm" onClick={decrement} disabled={count <= 0}>
                -2
              </Button>
              <Button size="sm" onClick={increment} disabled={count >= 20}>
                +2
              </Button>
              <Button size="sm" variant="outline" onClick={reset}>
                重置
              </Button>
              <Button size="sm" variant="ghost" onClick={() => set(15)}>
                设为15
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// useBreakpoint 演示
function BreakpointDemo() {
  const { breakpoint, isSm, isMd, isLg, isXl } = useBreakpoint();

  return (
    <Card>
      <CardHeader>
        <CardTitle>useBreakpoint</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            响应式断点检测
          </p>

          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">当前断点:</span>
              <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded text-blue-800 dark:text-blue-200">
                {breakpoint}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div
                className={`p-2 rounded ${
                  isSm
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                SM: {isSm ? "✓" : "✗"}
              </div>
              <div
                className={`p-2 rounded ${
                  isMd
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                MD: {isMd ? "✓" : "✗"}
              </div>
              <div
                className={`p-2 rounded ${
                  isLg
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                LG: {isLg ? "✓" : "✗"}
              </div>
              <div
                className={`p-2 rounded ${
                  isXl
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                XL: {isXl ? "✓" : "✗"}
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 p-2 bg-gray-100 dark:bg-gray-800 rounded">
            调整浏览器窗口大小查看变化
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
