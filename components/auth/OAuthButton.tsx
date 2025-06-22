/**
 * OAuth 提供商登录按钮组件
 */

import { JSX } from "preact";
import type { OAuthProvider } from "@utils/auth.ts";

interface OAuthButtonProps {
  provider: OAuthProvider;
  displayName: string;
  color: string;
  variant?: "default" | "outline" | "minimal";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick: () => void;
}

export default function OAuthButton({
  provider,
  displayName,
  color,
  variant = "default",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  onClick,
}: OAuthButtonProps) {
  // 获取提供商图标
  const getProviderIcon = () => {
    const iconClass = "w-5 h-5";
    
    switch (provider) {
      case "github":
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case "google":
        return (
          <svg className={iconClass} viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        );
      case "microsoft":
        return (
          <svg className={iconClass} viewBox="0 0 24 24">
            <path fill="#f25022" d="M1 1h10v10H1z"/>
            <path fill="#00a4ef" d="M13 1h10v10H13z"/>
            <path fill="#7fba00" d="M1 13h10v10H1z"/>
            <path fill="#ffb900" d="M13 13h10v10H13z"/>
          </svg>
        );
      case "gitee":
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296z"/>
          </svg>
        );
      default:
        return (
          <div className={`${iconClass} bg-gray-400 rounded`}></div>
        );
    }
  };

  // 尺寸样式
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // 变体样式
  const getVariantStyles = () => {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    switch (variant) {
      case "outline":
        return `${baseStyles} border-2 bg-transparent hover:bg-opacity-10 focus:ring-opacity-50`;
      case "minimal":
        return `${baseStyles} bg-transparent hover:bg-opacity-10 focus:ring-opacity-50`;
      default:
        return `${baseStyles} text-white hover:opacity-90 focus:ring-opacity-50`;
    }
  };

  // 动态样式
  const getButtonStyles = () => {
    let styles = getVariantStyles();
    
    if (variant === "outline") {
      styles += ` border-[${color}] text-[${color}] hover:bg-[${color}] focus:ring-[${color}]`;
    } else if (variant === "minimal") {
      styles += ` text-[${color}] hover:bg-[${color}] focus:ring-[${color}]`;
    } else {
      styles += ` bg-[${color}] focus:ring-[${color}]`;
    }
    
    if (disabled || loading) {
      styles += " opacity-50 cursor-not-allowed";
    } else {
      styles += " hover:scale-105 active:scale-95";
    }
    
    return styles;
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`${getButtonStyles()} ${sizeStyles[size]} ${className}`}
      style={{
        backgroundColor: variant === "default" ? color : undefined,
        borderColor: variant === "outline" ? color : undefined,
        color: variant !== "default" ? color : undefined,
      }}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
      ) : (
        getProviderIcon()
      )}
      <span>使用 {displayName} 登录</span>
    </button>
  );
}

// 预设的提供商按钮组件
export function GitHubButton(props: Omit<OAuthButtonProps, "provider" | "displayName" | "color">) {
  return (
    <OAuthButton
      provider="github"
      displayName="GitHub"
      color="#24292f"
      {...props}
    />
  );
}

export function GoogleButton(props: Omit<OAuthButtonProps, "provider" | "displayName" | "color">) {
  return (
    <OAuthButton
      provider="google"
      displayName="Google"
      color="#4285f4"
      {...props}
    />
  );
}

export function MicrosoftButton(props: Omit<OAuthButtonProps, "provider" | "displayName" | "color">) {
  return (
    <OAuthButton
      provider="microsoft"
      displayName="Microsoft"
      color="#0078d4"
      {...props}
    />
  );
}

export function GiteeButton(props: Omit<OAuthButtonProps, "provider" | "displayName" | "color">) {
  return (
    <OAuthButton
      provider="gitee"
      displayName="Gitee"
      color="#c71d23"
      {...props}
    />
  );
}
