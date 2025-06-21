/**
 * 认证守卫组件
 * 保护需要登录才能访问的内容
 */

import { JSX } from "preact";
import { useEffect } from "preact/hooks";
import { useAuthStore } from "../../stores/useAuthStore.ts";
import LoginButton from "./LoginButton.tsx";

interface AuthGuardProps {
  children: JSX.Element;
  fallback?: JSX.Element;
  redirectTo?: string;
  requireAuth?: boolean;
  showLoginPrompt?: boolean;
}

export default function AuthGuard({
  children,
  fallback,
  redirectTo,
  requireAuth = true,
  showLoginPrompt = true,
}: AuthGuardProps) {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  // 组件挂载时检查认证状态
  useEffect(() => {
    checkAuth();
  }, []);

  // 如果正在加载，显示加载状态
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600">
        </div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          Checking authentication...
        </span>
      </div>
    );
  }

  // 如果需要认证但用户未登录
  if (requireAuth && !isAuthenticated) {
    // 如果提供了自定义 fallback，使用它
    if (fallback) {
      return fallback;
    }

    // 如果需要显示登录提示
    if (showLoginPrompt) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
          <div className="max-w-md">
            {/* 锁定图标 */}
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-600 dark:text-gray-400"
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
            </div>

            {/* 标题和描述 */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Authentication Required
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You need to sign in with your GitHub account to access this
              content.
            </p>

            {/* 登录按钮 */}
            <LoginButton
              variant="primary"
              size="lg"
              redirectTo={redirectTo ||
                (typeof globalThis.location !== "undefined"
                  ? globalThis.location.pathname
                  : "/")}
              className="w-full max-w-xs"
            />

            {/* 额外信息 */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              We use GitHub OAuth for secure authentication.
              <br />
              Your data is safe and we only access basic profile information.
            </p>
          </div>
        </div>
      );
    }

    // 如果不显示登录提示，返回空内容
    return <div></div>;
  }

  // 如果不需要认证或用户已登录，显示子组件
  return children;
}

// 内联认证守卫组件（用于小块内容）
export function InlineAuthGuard({
  children,
  fallback,
  className = "",
}: {
  children: JSX.Element;
  fallback?: JSX.Element;
  className?: string;
}) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600">
        </div>
        <span className="text-sm text-gray-500">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className={`text-center p-4 ${className}`}>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Sign in to access this feature
        </p>
        <LoginButton variant="outline" size="sm" />
      </div>
    );
  }

  return children;
}

// 反向认证守卫（只对未登录用户显示）
export function GuestOnlyGuard({
  children,
  redirectTo = "/",
}: {
  children: JSX.Element;
  redirectTo?: string;
}) {
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    // 如果用户已登录，重定向到指定页面
    if (isAuthenticated && typeof globalThis.location !== "undefined") {
      globalThis.location.href = redirectTo;
    }
  }, [isAuthenticated, redirectTo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600">
        </div>
      </div>
    );
  }

  // 只对未登录用户显示内容
  return isAuthenticated ? <div></div> : children;
}
