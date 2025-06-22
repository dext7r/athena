/**
 * 认证菜单 Island 组件
 * 在客户端处理用户认证状态和交互
 */

import { LoginButton } from "@components/auth/index.ts";
import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

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
      {/* 用户头像按钮 - 现代化设计 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-2 p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:shadow-md hover:scale-105 transition-all duration-300 group overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* 悬停时的动画背景 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 transform origin-center scale-0 group-hover:scale-100 transition-transform duration-300 ease-out rounded-xl opacity-50">
        </div>

        <div className="relative z-10 flex items-center gap-2">
          {/* 头像容器 */}
          <div className="relative">
            <img
              src={`${user.avatar}&s=32`}
              alt={`${user.name || user.username}'s avatar`}
              className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-colors duration-300"
              loading="lazy"
            />
            {/* 在线状态指示器 */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full">
            </div>
          </div>

          <span className="text-sm font-medium text-gray-900 dark:text-white hidden sm:block max-w-24 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {user.name || user.username}
          </span>

          <svg
            className={`w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 ${
              isOpen ? "rotate-180 scale-110" : "group-hover:scale-110"
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
        </div>
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 z-10 backdrop-blur-sm bg-black/10"
            onClick={() => setIsOpen(false)}
          />

          {/* 菜单内容 - 现代化设计 */}
          <div className="absolute right-0 top-full mt-2 w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-[9999] overflow-hidden">
            {/* 装饰性渐变背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 dark:from-blue-400/10 dark:to-purple-400/10">
            </div>

            {/* 用户信息头部 */}
            <div className="relative p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-transparent via-blue-50/30 to-transparent dark:via-blue-900/20">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={`${user.avatar}&s=48`}
                    alt={`${user.name || user.username}'s avatar`}
                    className="w-12 h-12 rounded-full border-2 border-blue-200 dark:border-blue-700 shadow-lg"
                    loading="lazy"
                  />
                  {/* 装饰性发光效果 */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-md">
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 truncate">
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
            <div className="relative py-2">
              <MenuItem
                href="/profile"
                icon={
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
                }
                label="用户资料"
                onClick={() => setIsOpen(false)}
              />

              <MenuItem
                href="/security"
                icon={
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
                }
                label="安全设置"
                onClick={() => setIsOpen(false)}
              />

              {/* 管理员链接（仅对管理员显示） */}
              {user.username === "h7ml" && (
                <MenuItem
                  href="/admin"
                  icon={
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
                  }
                  label="管理员面板"
                  onClick={() => setIsOpen(false)}
                />
              )}

              <MenuItem
                href={`https://github.com/${user.username}`}
                target="_blank"
                rel="noopener noreferrer"
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                }
                label="查看 GitHub 资料"
                onClick={() => setIsOpen(false)}
              />

              {/* 分割线 */}
              <div className="my-2 mx-4 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600">
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-50 dark:hover:from-red-900/30 dark:hover:to-red-900/30 transition-all duration-200 group relative overflow-hidden font-medium"
              >
                {/* 悬停背景动画 */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-red-100 dark:from-red-800/30 dark:to-red-800/30 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out">
                </div>

                <div className="relative z-10 p-1 rounded transition-all duration-300 group-hover:bg-red-100 dark:group-hover:bg-red-900/50">
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
                </div>
                <span className="relative z-10 tracking-wide">退出登录</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// 菜单项组件
interface MenuItemProps {
  href: string;
  icon: JSX.Element;
  label: string;
  target?: string;
  rel?: string;
  onClick: () => void;
}

const MenuItem = (
  { href, icon, label, target, rel, onClick }: MenuItemProps,
) => (
  <a
    href={href}
    target={target}
    rel={rel}
    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 group relative overflow-hidden font-medium"
    onClick={onClick}
  >
    {/* 悬停背景动画 */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out">
    </div>

    <div className="relative z-10 p-1 rounded transition-all duration-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50">
      {icon}
    </div>
    <span className="relative z-10 tracking-wide">{label}</span>
  </a>
);
