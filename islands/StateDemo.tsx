import Button from "@components/ui/Button.tsx";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/ui/Card.tsx";
import { useAppStore, useThemeStore, useUserStore } from "@stores/index.ts";

export default function StateDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 应用状态 */}
      <AppStateDemo />

      {/* 主题状态 */}
      <ThemeStateDemo />

      {/* 用户状态 */}
      <UserStateDemo />

      {/* 状态持久化演示 */}
      <PersistenceDemo />
    </div>
  );
}

// 应用状态演示
function AppStateDemo() {
  const {
    isLoading,
    error,
    sidebarOpen,
    setLoading,
    setError,
    toggleSidebar,
    setSidebarOpen,
  } = useAppStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>应用状态 (useAppStore)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">加载状态:</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={isLoading ? "primary" : "outline"}
                  onClick={() => setLoading(!isLoading)}
                >
                  {isLoading ? "停止加载" : "开始加载"}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">侧边栏:</span>
              <div className="flex gap-2">
                <Button size="sm" onClick={toggleSidebar}>
                  切换
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSidebarOpen(true)}
                >
                  打开
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSidebarOpen(false)}
                >
                  关闭
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm">错误信息:</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setError("这是一个测试错误")}
                >
                  设置错误
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setError(null)}
                >
                  清除错误
                </Button>
              </div>
            </div>
          </div>

          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm space-y-1">
            <div>加载中: {isLoading ? "是" : "否"}</div>
            <div>侧边栏: {sidebarOpen ? "打开" : "关闭"}</div>
            <div>错误: {error || "无"}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 主题状态演示
function ThemeStateDemo() {
  const { theme, isDark, setTheme, toggleTheme } = useThemeStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>主题状态 (useThemeStore)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
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

            <Button size="sm" variant="secondary" onClick={toggleTheme}>
              快速切换
            </Button>
          </div>

          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm space-y-1">
            <div>主题模式: {theme}</div>
            <div>当前是暗色: {isDark ? "是" : "否"}</div>
            <div>HTML类名: {isDark ? "dark" : "light"}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 用户状态演示
function UserStateDemo() {
  const {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser,
  } = useUserStore();

  const handleLogin = () => {
    login({
      id: "1",
      name: "张三",
      email: "zhangsan@example.com",
      role: "user",
    });
  };

  const handleUpdateName = () => {
    if (user) {
      updateUser({ name: "李四" });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>用户状态 (useUserStore)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">登录状态:</span>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  isAuthenticated
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                }`}
              >
                {isAuthenticated ? "已登录" : "未登录"}
              </span>
            </div>

            <div className="flex gap-2">
              {!isAuthenticated
                ? (
                  <Button size="sm" onClick={handleLogin}>
                    模拟登录
                  </Button>
                )
                : (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleUpdateName}
                    >
                      更新姓名
                    </Button>
                    <Button size="sm" variant="secondary" onClick={logout}>
                      退出登录
                    </Button>
                  </>
                )}
            </div>
          </div>

          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm space-y-1">
            {user
              ? (
                <>
                  <div>ID: {user.id}</div>
                  <div>姓名: {user.name}</div>
                  <div>邮箱: {user.email}</div>
                  <div>角色: {user.role}</div>
                </>
              )
              : <div>未登录</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 状态持久化演示
function PersistenceDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>状态持久化</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            以下状态会自动保存到本地存储：
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>侧边栏开关状态</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>主题偏好设置</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>用户登录信息</span>
            </div>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 刷新页面或重新打开浏览器，这些状态都会被保持。
            </p>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              localStorage.clear();
              globalThis.location.reload();
            }}
          >
            清除所有本地数据
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
