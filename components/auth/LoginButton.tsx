/**
 * GitHub 登录按钮组件
 */

import { JSX } from "preact";

interface LoginButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  redirectTo?: string;
  className?: string;
  children?: JSX.Element | string;
}

export default function LoginButton({
  variant = "primary",
  size = "md",
  redirectTo = "/",
  className = "",
  children,
}: LoginButtonProps) {
  const handleLogin = () => {
    const loginUrl = `/api/auth/github?redirect=${
      encodeURIComponent(redirectTo)
    }`;
    globalThis.location.href = loginUrl;
  };

  // 按钮样式映射
  const variantStyles = {
    primary:
      "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
    outline:
      "border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-gray-900",
    ghost:
      "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500";

  return (
    <button
      type="button"
      onClick={handleLogin}
      className={`${baseStyles} ${variantStyles[variant]} ${
        sizeStyles[size]
      } ${className}`}
    >
      {/* GitHub 图标 */}
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>

      {/* 按钮文本 */}
      {children || "使用 GitHub 登录"}
    </button>
  );
}

// 预设样式的登录按钮变体
export function GitHubLoginButton(
  { className = "", ...props }: Omit<LoginButtonProps, "children">,
) {
  return (
    <LoginButton
      variant="primary"
      className={`bg-[#24292f] hover:bg-[#1c2128] text-white dark:bg-[#f6f8fa] dark:text-[#24292f] dark:hover:bg-[#e1e4e8] ${className}`}
      {...props}
    >
      使用 GitHub 继续
    </LoginButton>
  );
}

// 简洁的登录按钮
export function SimpleLoginButton(
  { className = "", ...props }: Omit<LoginButtonProps, "children">,
) {
  return (
    <LoginButton
      variant="outline"
      size="sm"
      className={className}
      {...props}
    >
      登录
    </LoginButton>
  );
}
