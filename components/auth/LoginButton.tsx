/**
 * 登录按钮组件 - 支持弹出式多提供商登录
 */

import { JSX } from "preact";
import { useState } from "preact/hooks";
import LoginModal from "./LoginModal.tsx";

interface LoginButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  redirectTo?: string;
  className?: string;
  children?: JSX.Element | string;
  useModal?: boolean; // 是否使用弹出式登录
}

export default function LoginButton({
  variant = "primary",
  size = "md",
  redirectTo = "/",
  className = "",
  children,
  useModal = true, // 默认使用弹出式登录
}: LoginButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const handleLogin = () => {
    if (useModal) {
      setShowModal(true);
    } else {
      // 向后兼容：直接跳转到 GitHub 登录
      const loginUrl = `/api/auth/github?redirect=${
        encodeURIComponent(redirectTo)
      }`;
      globalThis.location.href = loginUrl;
    }
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
    <>
      <button
        type="button"
        onClick={handleLogin}
        className={`${baseStyles} ${variantStyles[variant]} ${
          sizeStyles[size]
        } ${className}`}
      >
        {/* 登录图标 */}
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          />
        </svg>

        {/* 按钮文本 */}
        {children || (useModal ? "登录" : "使用 GitHub 登录")}
      </button>

      {/* 登录模态框 */}
      {useModal && (
        <LoginModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          redirectTo={redirectTo}
        />
      )}
    </>
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
