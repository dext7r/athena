/**
 * 现代化弹出式登录模态框组件
 * 支持OAuth登录、邮箱密码登录、注册和找回密码
 */

import Modal from "@components/ui/Modal.tsx";
import type { OAuthProvider } from "@utils/auth.ts";
import { useEffect, useState } from "preact/hooks";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectTo?: string;
}

interface ProviderInfo {
  name: OAuthProvider;
  displayName: string;
  icon: string;
  color: string;
  available: boolean;
}

type AuthMode = "login" | "register" | "forgot-password" | "oauth";

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

export default function LoginModal({
  isOpen,
  onClose,
  redirectTo = "/",
}: LoginModalProps) {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [providers, setProviders] = useState<ProviderInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // 获取可用的 OAuth 提供商
  useEffect(() => {
    if (isOpen) {
      fetchAvailableProviders();
      // 重置状态
      setAuthMode("login");
      setError(null);
      setSuccess(null);
      setFocusedField(null);
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
      });
    }
  }, [isOpen]);

  const fetchAvailableProviders = async () => {
    try {
      const response = await fetch("/api/auth/providers");
      if (response.ok) {
        const data = await response.json();
        setProviders(data.providers || []);
      } else {
        setError("无法获取登录提供商信息");
      }
    } catch (err) {
      console.error("Failed to fetch providers:", err);
      setError("网络错误，请稍后重试");
    }
  };

  // 处理表单输入
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  // 处理邮箱密码登录
  const handleEmailLogin = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 验证表单
      if (!formData.email || !formData.password) {
        throw new Error("请填写邮箱和密码");
      }

      // 这里应该调用实际的登录API
      // const response = await fetch("/api/auth/email-login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     email: formData.email,
      //     password: formData.password,
      //   }),
      // });

      // 模拟登录
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess("登录成功！");
      setTimeout(() => {
        onClose();
        globalThis.location.reload();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "登录失败");
    } finally {
      setLoading(false);
    }
  };

  // 处理注册
  const handleRegister = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 验证表单
      if (
        !formData.email || !formData.password || !formData.confirmPassword ||
        !formData.name
      ) {
        throw new Error("请填写所有必填字段");
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("两次输入的密码不一致");
      }

      if (formData.password.length < 6) {
        throw new Error("密码长度至少6位");
      }

      // 这里应该调用实际的注册API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess("注册成功！请查收邮箱验证邮件");
      setTimeout(() => setAuthMode("login"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "注册失败");
    } finally {
      setLoading(false);
    }
  };

  // 处理找回密码
  const handleForgotPassword = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.email) {
        throw new Error("请输入邮箱地址");
      }

      // 这里应该调用实际的找回密码API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess("重置密码邮件已发送，请查收邮箱");
      setTimeout(() => setAuthMode("login"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "发送失败");
    } finally {
      setLoading(false);
    }
  };

  const handleProviderLogin = (provider: OAuthProvider) => {
    setLoading(true);
    setError(null);

    try {
      const loginUrl = `/api/auth/${provider}?redirect=${
        encodeURIComponent(redirectTo)
      }`;

      // 在新窗口中打开登录页面
      const popup = globalThis.open(
        loginUrl,
        "oauth_login",
        "width=600,height=700,scrollbars=yes,resizable=yes,status=yes,location=yes,toolbar=no,menubar=no",
      );

      if (!popup) {
        throw new Error("无法打开登录窗口，请检查浏览器弹窗设置");
      }

      // 监听弹窗关闭
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          setLoading(false);
          // 检查登录状态
          checkAuthStatus();
        }
      }, 1000);

      // 监听来自弹窗的消息
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== globalThis.location.origin) return;

        if (event.data.type === "oauth_success") {
          clearInterval(checkClosed);
          popup.close();
          setLoading(false);
          onClose();
          // 刷新页面或更新状态
          globalThis.location.reload();
        } else if (event.data.type === "oauth_error") {
          clearInterval(checkClosed);
          popup.close();
          setLoading(false);
          setError(event.data.message || "登录失败");
        }
      };

      globalThis.addEventListener("message", handleMessage);

      // 清理事件监听器
      setTimeout(() => {
        globalThis.removeEventListener("message", handleMessage);
        clearInterval(checkClosed);
        if (!popup.closed) {
          popup.close();
          setLoading(false);
        }
      }, 300000); // 5分钟超时
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "登录失败");
    }
  };

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          onClose();
          globalThis.location.reload();
        }
      }
    } catch (err) {
      console.error("Failed to check auth status:", err);
    }
  };

  const getProviderIcon = (provider: OAuthProvider) => {
    const icons = {
      github: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      google: (
        <svg className="w-full h-full" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      ),
      microsoft: (
        <svg className="w-full h-full" viewBox="0 0 24 24">
          <path fill="#f25022" d="M1 1h10v10H1z" />
          <path fill="#00a4ef" d="M13 1h10v10H13z" />
          <path fill="#7fba00" d="M1 13h10v10H1z" />
          <path fill="#ffb900" d="M13 13h10v10H13z" />
        </svg>
      ),
      gitee: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296z" />
        </svg>
      ),
    };
    return icons[provider] || null;
  };

  // 获取动态头像
  const getAvatarExpression = () => {
    // 如果正在输入密码，显示闭眼表情
    if (focusedField === "password" || focusedField === "confirmPassword") {
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          {/* 脸部 */}
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="#FFE4B5"
            stroke="#DEB887"
            strokeWidth="2"
          />

          {/* 闭着的眼睛 */}
          <path
            d="M35 42 Q40 38 45 42"
            stroke="#8B4513"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M55 42 Q60 38 65 42"
            stroke="#8B4513"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* 嘴巴 - 微笑 */}
          <path
            d="M42 62 Q50 68 58 62"
            stroke="#8B4513"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* 腮红 */}
          <circle cx="30" cy="55" r="4" fill="#FFB6C1" opacity="0.6" />
          <circle cx="70" cy="55" r="4" fill="#FFB6C1" opacity="0.6" />
        </svg>
      );
    }

    // 如果正在输入邮箱或姓名，显示专注表情
    if (focusedField === "email" || focusedField === "name") {
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          {/* 脸部 */}
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="#FFE4B5"
            stroke="#DEB887"
            strokeWidth="2"
          />

          {/* 专注的眼睛 */}
          <circle cx="40" cy="42" r="3" fill="#4169E1" />
          <circle cx="60" cy="42" r="3" fill="#4169E1" />
          <circle cx="40" cy="42" r="1.5" fill="#FFFFFF" />
          <circle cx="60" cy="42" r="1.5" fill="#FFFFFF" />

          {/* 眉毛 - 专注 */}
          <path
            d="M35 35 L45 38"
            stroke="#8B4513"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M55 38 L65 35"
            stroke="#8B4513"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* 嘴巴 - 专注 */}
          <ellipse cx="50" cy="62" rx="3" ry="2" fill="#8B4513" />
        </svg>
      );
    }

    // 如果有错误，显示困惑表情
    if (error) {
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          {/* 脸部 */}
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="#FFE4B5"
            stroke="#DEB887"
            strokeWidth="2"
          />

          {/* 困惑的眼睛 */}
          <circle cx="40" cy="42" r="3" fill="#4169E1" />
          <circle cx="60" cy="42" r="3" fill="#4169E1" />
          <circle cx="39" cy="41" r="1.5" fill="#FFFFFF" />
          <circle cx="61" cy="41" r="1.5" fill="#FFFFFF" />

          {/* 困惑的眉毛 */}
          <path
            d="M33 35 Q38 32 43 35"
            stroke="#8B4513"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M57 35 Q62 32 67 35"
            stroke="#8B4513"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* 困惑的嘴巴 */}
          <path
            d="M45 62 Q50 58 55 62"
            stroke="#8B4513"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    // 如果成功，显示开心表情
    if (success) {
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          {/* 脸部 */}
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="#FFE4B5"
            stroke="#DEB887"
            strokeWidth="2"
          />

          {/* 开心的眼睛 */}
          <path
            d="M35 40 Q40 35 45 40"
            stroke="#8B4513"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M55 40 Q60 35 65 40"
            stroke="#8B4513"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* 大笑的嘴巴 */}
          <path
            d="M40 58 Q50 70 60 58"
            stroke="#8B4513"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M42 62 Q50 68 58 62"
            fill="#FF69B4"
            stroke="#8B4513"
            strokeWidth="1"
          />

          {/* 腮红 */}
          <circle cx="30" cy="55" r="5" fill="#FFB6C1" opacity="0.8" />
          <circle cx="70" cy="55" r="5" fill="#FFB6C1" opacity="0.8" />
        </svg>
      );
    }

    // 默认表情 - 友好
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
        {/* 脸部 */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="#FFE4B5"
          stroke="#DEB887"
          strokeWidth="2"
        />

        {/* 友好的眼睛 */}
        <circle cx="40" cy="42" r="4" fill="#4169E1" />
        <circle cx="60" cy="42" r="4" fill="#4169E1" />
        <circle cx="40" cy="42" r="2" fill="#FFFFFF" />
        <circle cx="60" cy="42" r="2" fill="#FFFFFF" />

        {/* 友好的嘴巴 */}
        <path
          d="M42 60 Q50 66 58 60"
          stroke="#8B4513"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  // 获取当前模式的标题
  const getTitle = () => {
    switch (authMode) {
      case "login":
        return "登录";
      case "register":
        return "注册";
      case "forgot-password":
        return "找回密码";
      case "oauth":
        return "选择登录方式";
      default:
        return "登录";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="sm"
      variant="glass"
      animate
      centered
      showCloseButton={false}
    >
      <div className="w-full max-w-sm mx-auto">
        {/* 头部 */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-3 transition-all duration-300 ease-in-out transform hover:scale-105">
            {getAvatarExpression()}
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {getTitle()}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {authMode === "login" && "欢迎回来！"}
            {authMode === "register" && "创建新账户"}
            {authMode === "forgot-password" && "找回您的密码"}
            {authMode === "oauth" && "选择登录方式"}
          </p>
        </div>

        {/* 错误和成功提示 */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-red-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-800 dark:text-red-200 text-xs">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-green-800 dark:text-green-200 text-xs">
                {success}
              </p>
            </div>
          </div>
        )}

        {/* 主要内容区域 */}
        <div className="space-y-4">
          {/* 邮箱密码登录表单 */}
          {(authMode === "login" || authMode === "register" ||
            authMode === "forgot-password") && (
            <form
              onSubmit={authMode === "login"
                ? handleEmailLogin
                : authMode === "register"
                ? handleRegister
                : handleForgotPassword}
              className="space-y-3"
            >
              {/* 姓名字段 (仅注册时显示) */}
              {authMode === "register" && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    姓名
                  </label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) =>
                      handleInputChange("name", e.currentTarget.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 text-sm"
                    placeholder="请输入您的姓名"
                    required
                  />
                </div>
              )}

              {/* 邮箱字段 */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  邮箱地址
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    handleInputChange("email", e.currentTarget.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 text-sm"
                  placeholder="请输入您的邮箱地址"
                  required
                />
              </div>

              {/* 密码字段 (找回密码时不显示) */}
              {authMode !== "forgot-password" && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    密码
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.currentTarget.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 text-sm"
                    placeholder="请输入您的密码"
                    required
                  />
                </div>
              )}

              {/* 确认密码字段 (仅注册时显示) */}
              {authMode === "register" && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    确认密码
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "confirmPassword",
                        e.currentTarget.value,
                      )}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 text-sm"
                    placeholder="请再次输入密码"
                    required
                  />
                </div>
              )}

              {/* 提交按钮 */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-sm"
              >
                {loading
                  ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2">
                      </div>
                      处理中...
                    </div>
                  )
                  : (
                    <>
                      {authMode === "login" && "登录"}
                      {authMode === "register" && "注册"}
                      {authMode === "forgot-password" && "发送重置邮件"}
                    </>
                  )}
              </button>
            </form>
          )}

          {/* OAuth 登录选项 */}
          {authMode === "login" && providers.length > 0 && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600">
                  </div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                    或者使用
                  </span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                {providers.map((provider) => (
                  <button
                    key={provider.name}
                    onClick={() => handleProviderLogin(provider.name)}
                    disabled={loading || !provider.available}
                    title={`使用 ${provider.displayName} 登录`}
                    className="w-12 h-12 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-110 active:scale-95"
                    style={{
                      borderColor: provider.available
                        ? provider.color + "40"
                        : undefined,
                    }}
                  >
                    <div className="w-6 h-6" style={{ color: provider.color }}>
                      {getProviderIcon(provider.name)}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* 底部链接 */}
          <div className="text-center space-y-2">
            {authMode === "login" && (
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setAuthMode("forgot-password")}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs font-medium transition-colors duration-200"
                >
                  忘记密码？
                </button>
                <div className="text-gray-600 dark:text-gray-400 text-xs">
                  还没有账户？{" "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("register")}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    立即注册
                  </button>
                </div>
              </div>
            )}

            {authMode === "register" && (
              <div className="text-gray-600 dark:text-gray-400 text-xs">
                已有账户？{" "}
                <button
                  type="button"
                  onClick={() => setAuthMode("login")}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  立即登录
                </button>
              </div>
            )}

            {authMode === "forgot-password" && (
              <div className="text-gray-600 dark:text-gray-400 text-xs">
                想起密码了？{" "}
                <button
                  type="button"
                  onClick={() => setAuthMode("login")}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  返回登录
                </button>
              </div>
            )}
          </div>

          {/* 服务条款 */}
          <div className="text-center pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {authMode === "register" ? "注册" : "登录"}即表示您同意我们的{" "}
              <a
                href="/terms"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                服务条款
              </a>{" "}
              和{" "}
              <a
                href="/privacy"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                隐私政策
              </a>
            </p>
          </div>
        </div>

        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </Modal>
  );
}
