import type { TranslationNamespace, TranslationParams } from "@/i18n/types.ts";
import { JSX } from "preact";
import { forwardRef } from "preact/compat";

interface ButtonProps
  extends
    Omit<JSX.HTMLAttributes<HTMLButtonElement>, "size" | "loading" | "icon"> {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "outline"
    | "ghost"
    | "gradient"
    | "glass"
    | "success"
    | "warning"
    | "error"
    | "rainbow";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  disabled?: boolean;
  children?: JSX.Element | JSX.Element[] | string;
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  animate?: boolean;
  magnetic?: boolean;

  // 国际化相关属性
  i18nKey?: string;
  i18nParams?: TranslationParams;
  i18nNamespace?: TranslationNamespace;
  i18nFallback?: string;

  // 加载状态文本国际化
  loadingText?: string;
  loadingI18nKey?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  children,
  icon,
  iconPosition = "left",
  fullWidth = false,
  animate = true,
  magnetic = false,
  className = "",

  // 国际化属性
  i18nKey,
  i18nParams,
  i18nNamespace = "components",
  i18nFallback,
  loadingText,
  loadingI18nKey = "status.loading",

  ...props
}, ref) => {
  // 简化的文本处理（避免服务端 Hook 问题）
  const getButtonText = () => {
    // 如果有 i18nKey，在服务端使用回退文本
    if (i18nKey) {
      return i18nFallback || i18nKey;
    }

    // 否则使用 children
    return children;
  };

  // 获取加载状态文本
  const getLoadingText = () => {
    if (loadingText) return loadingText;
    return "Loading..."; // 简单的加载文本
  };

  const buttonText = getButtonText();
  const loadingDisplayText = getLoadingText();
  const baseClasses = `
    inline-flex items-center justify-center gap-2 
    font-medium tracking-wide
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    relative overflow-hidden
    cursor-none
    ${fullWidth ? "w-full" : ""}
    ${animate ? "hover:scale-105 active:scale-95" : ""}
    ${magnetic ? "magnetic-element" : ""}
  `;

  const variantClasses = {
    primary: `
      btn-primary bg-gradient-to-r from-primary-500 to-primary-600
      text-white font-semibold
      shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30
      border border-primary-500/20 hover:border-primary-400/30
      focus:ring-primary-500
      ${animate ? "btn-animate ripple" : ""}
    `,
    secondary: `
      btn-secondary bg-gradient-to-r from-secondary-500 to-secondary-600
      text-white font-semibold
      shadow-lg shadow-secondary-500/25 hover:shadow-xl hover:shadow-secondary-500/30
      border border-secondary-500/20 hover:border-secondary-400/30
      focus:ring-secondary-500
      ${animate ? "btn-animate ripple" : ""}
    `,
    accent: `
      bg-gradient-to-r from-accent-500 to-accent-600
      text-white font-semibold
      shadow-lg shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/30
      border border-accent-500/20 hover:border-accent-400/30
      focus:ring-accent-500
      ${animate ? "btn-animate ripple" : ""}
    `,
    outline: `
      border-2 border-primary-500 text-primary-600 dark:text-primary-400
      hover:bg-primary-50 dark:hover:bg-primary-900/20
      active:bg-primary-100 dark:active:bg-primary-900/30
      hover:border-primary-600 hover:shadow-lg hover:shadow-primary-500/20
      focus:ring-primary-500
      ${animate ? "hover-glow" : ""}
    `,
    ghost: `
      text-primary-600 dark:text-primary-400
      hover:bg-primary-50 dark:hover:bg-primary-900/20
      active:bg-primary-100 dark:active:bg-primary-900/30
      hover:shadow-lg hover:shadow-primary-500/10
      focus:ring-primary-500
      ${animate ? "hover-lift" : ""}
    `,
    gradient: `
      bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500
      bg-size-200 animate-gradient-shift
      text-white font-semibold
      shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-secondary-500/30
      border border-white/20
      focus:ring-primary-500
      ${animate ? "btn-animate ripple" : ""}
    `,
    glass: `
      glass backdrop-blur-xl
      bg-white/10 dark:bg-neutral-900/10
      border border-white/20 dark:border-neutral-700/20
      text-neutral-800 dark:text-neutral-200
      hover:bg-white/20 dark:hover:bg-neutral-800/20
      hover:shadow-glass
      focus:ring-primary-500
      ${animate ? "hover-glow" : ""}
    `,
    success: `
      bg-gradient-to-r from-success-500 to-success-600
      text-white font-semibold
      shadow-lg shadow-success-500/25 hover:shadow-xl hover:shadow-success-500/30
      border border-success-500/20 hover:border-success-400/30
      focus:ring-success-500
      ${animate ? "btn-animate ripple" : ""}
    `,
    warning: `
      bg-gradient-to-r from-warning-500 to-warning-600
      text-white font-semibold
      shadow-lg shadow-warning-500/25 hover:shadow-xl hover:shadow-warning-500/30
      border border-warning-500/20 hover:border-warning-400/30
      focus:ring-warning-500
      ${animate ? "btn-animate ripple" : ""}
    `,
    error: `
      bg-gradient-to-r from-error-500 to-error-600
      text-white font-semibold
      shadow-lg shadow-error-500/25 hover:shadow-xl hover:shadow-error-500/30
      border border-error-500/20 hover:border-error-400/30
      focus:ring-error-500
      ${animate ? "btn-animate ripple" : ""}
    `,
    rainbow: `
      bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500
      bg-size-200 animate-gradient-flow
      text-white font-bold
      shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-blue-500/30
      border border-white/30
      focus:ring-purple-500
      ${animate ? "btn-animate ripple" : ""}
    `,
  };

  const sizeClasses = {
    xs: "px-2 py-1 text-xs rounded-lg",
    sm: "px-3 py-1.5 text-sm rounded-xl",
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-2xl",
    xl: "px-8 py-4 text-lg rounded-2xl",
  };

  const iconSizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${
    sizeClasses[size]
  } ${className}`;

  const renderIcon = (position: "left" | "right") => {
    if (!icon || iconPosition !== position) return null;

    return (
      <span
        className={`${iconSizeClasses[size]} flex-shrink-0 ${
          animate
            ? "group-hover:scale-110 transition-transform duration-300"
            : ""
        }`}
      >
        {icon}
      </span>
    );
  };

  const renderLoadingSpinner = () => (
    <svg
      className={`animate-spin ${iconSizeClasses[size]} flex-shrink-0`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      ref={ref}
      className={`${classes} group`}
      disabled={disabled || loading}
      {...props}
    >
      {/* 背景动画效果 */}
      {animate && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out">
        </div>
      )}

      {/* 左侧图标 */}
      {loading ? renderLoadingSpinner() : renderIcon("left")}

      {/* 按钮文本 */}
      <span
        className={`${
          animate
            ? "group-hover:scale-105 transition-transform duration-300"
            : ""
        }`}
      >
        {loading ? loadingDisplayText : buttonText}
      </span>

      {/* 右侧图标 */}
      {!loading && renderIcon("right")}

      {/* 发光效果 */}
      {animate && !disabled && (
        <div className="absolute inset-0 rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm">
          </div>
        </div>
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
