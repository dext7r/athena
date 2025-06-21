/**
 * 认证菜单 Island 组件
 * 在客户端处理用户认证状态和交互
 */

import { useEffect, useState } from "preact/hooks";
import { LoginButton } from "../components/auth/index.ts";

// 用户信息接口
interface User {
  id: number;
  username: string;
  name: string | null;
  email: string | null;
  avatar: string;
}

// 简单的认证状态接口
interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

export default function AuthMenu() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  // 检查认证状态
  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setAuthState({
          isAuthenticated: data.authenticated,
          isLoading: false,
          user: data.user || null,
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
        });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
    }
  };

  // 组件挂载时检查认证状态
  useEffect(() => {
    checkAuth();

    // 监听页面可见性变化，当用户回到页面时重新检查认证状态
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkAuth();
      }
    };

    // 监听焦点事件，当窗口获得焦点时重新检查认证状态
    const handleFocus = () => {
      checkAuth();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    globalThis.addEventListener("focus", handleFocus);

    // 定期检查认证状态（每30秒）
    const interval = setInterval(() => {
      if (!document.hidden) {
        checkAuth();
      }
    }, 30000);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      globalThis.removeEventListener("focus", handleFocus);
      clearInterval(interval);
    };
  }, []);

  // 如果正在加载，显示加载状态
  if (authState.isLoading) {
    return (
      <div className="flex items-center justify-center w-8 h-8">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600">
        </div>
      </div>
    );
  }

  // 如果用户已登录，显示用户信息和下拉菜单
  if (authState.isAuthenticated && authState.user) {
    return <UserProfileDropdown user={authState.user} onLogout={checkAuth} />;
  }

  // 如果用户未登录，显示登录按钮
  return (
    <LoginButton
      variant="outline"
      size="sm"
      className="text-sm"
    >
      登录
    </LoginButton>
  );
}

// 用户资料下拉菜单组件
function UserProfileDropdown(
  { user, onLogout }: { user: User; onLogout: () => void },
) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setIsOpen(false);
        onLogout(); // 重新检查认证状态
        // 延迟刷新页面，让状态更新先完成
        setTimeout(() => {
          globalThis.location.reload();
        }, 100);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="relative">
      {/* 用户头像按钮 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img
          src={`${user.avatar}&s=32`}
          alt={`${user.name || user.username}'s avatar`}
          className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-700"
          loading="lazy"
        />
        <span className="text-sm font-medium text-gray-900 dark:text-white hidden sm:block max-w-24 truncate">
          {user.name || user.username}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* 菜单内容 */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            {/* 用户信息头部 */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <img
                  src={`${user.avatar}&s=48`}
                  alt={`${user.name || user.username}'s avatar`}
                  className="w-12 h-12 rounded-full"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.name || user.username}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    @{user.username}
                  </p>
                  {user.email && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 菜单项 */}
            <div className="py-2">
              <a
                href="/profile"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                用户资料
              </a>

              <a
                href="/security"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                安全设置
              </a>

              {/* 管理员链接（仅对管理员显示） */}
              {user.username === "h7ml" && (
                <a
                  href="/admin"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  管理员面板
                </a>
              )}

              <a
                href={`https://github.com/${user.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                查看 GitHub 资料
              </a>

              <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                退出登录
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
