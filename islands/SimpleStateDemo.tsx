import { useState } from "preact/hooks";
import Button from "@components/ui/Button.tsx";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/ui/Card.tsx";

export default function SimpleStateDemo() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );

  const handleLogin = () => {
    setUser({
      name: "张三",
      email: "zhangsan@example.com",
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 计数器状态 */}
      <Card>
        <CardHeader>
          <CardTitle>计数器状态演示</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                {count}
              </div>
              <div className="flex justify-center gap-3">
                <Button size="sm" onClick={() => setCount(count - 1)}>
                  -1
                </Button>
                <Button size="sm" onClick={() => setCount(count + 1)}>
                  +1
                </Button>
                <Button size="sm" variant="outline" onClick={() => setCount(0)}>
                  重置
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 可见性切换 */}
      <Card>
        <CardHeader>
          <CardTitle>可见性切换演示</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm">
                状态: {isVisible ? "显示" : "隐藏"}
              </span>
              <Button size="sm" onClick={() => setIsVisible(!isVisible)}>
                切换
              </Button>
            </div>

            {isVisible && (
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg animate-fade-in">
                这个内容是可切换的！
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 主题状态 */}
      <Card>
        <CardHeader>
          <CardTitle>主题状态演示</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">当前主题:</span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded text-blue-800 dark:text-blue-200 text-sm">
                {theme}
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant={theme === "light" ? "primary" : "outline"}
                onClick={() => setTheme("light")}
              >
                亮色
              </Button>
              <Button
                size="sm"
                variant={theme === "dark" ? "primary" : "outline"}
                onClick={() => setTheme("dark")}
              >
                暗色
              </Button>
              <Button
                size="sm"
                variant={theme === "system" ? "primary" : "outline"}
                onClick={() => setTheme("system")}
              >
                系统
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 用户状态 */}
      <Card>
        <CardHeader>
          <CardTitle>用户状态演示</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">登录状态:</span>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  user
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                }`}
              >
                {user ? "已登录" : "未登录"}
              </span>
            </div>

            <div className="flex gap-2">
              {!user
                ? (
                  <Button size="sm" onClick={handleLogin}>
                    模拟登录
                  </Button>
                )
                : (
                  <Button size="sm" variant="secondary" onClick={handleLogout}>
                    退出登录
                  </Button>
                )}
            </div>

            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm space-y-1">
              {user
                ? (
                  <>
                    <div>姓名: {user.name}</div>
                    <div>邮箱: {user.email}</div>
                  </>
                )
                : <div>未登录</div>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 状态说明 */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>状态管理说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              这个演示展示了基本的React状态管理功能：
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">本地状态 (useState)</h4>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• 计数器状态</li>
                  <li>• 可见性切换</li>
                  <li>• 主题选择</li>
                  <li>• 用户信息</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">状态特点</h4>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• 组件内部状态</li>
                  <li>• 实时响应更新</li>
                  <li>• 条件渲染</li>
                  <li>• 状态重置</li>
                </ul>
              </div>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡
                这是一个简化的状态管理演示。在实际项目中，可以使用Zustand、Redux等状态管理库来处理复杂的全局状态。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
