/**
 * MFA设置组件
 * 处理多因素认证的设置和管理
 */

import { useEffect, useState } from "preact/hooks";
import { useCopy } from "../hooks/useCopy.ts";

interface MFAStatus {
  enabled: boolean;
  hasBackupCodes: boolean;
  backupCodesCount: number;
  lastUsedAt?: string;
  createdAt: string;
}

interface MFASetupData {
  secret: string;
  qrCodeDataURL: string;
  totpUri: string;
  backupCodes: string[];
  issuer: string;
  accountName: string;
}

export default function MFASetup() {
  const [status, setStatus] = useState<MFAStatus | null>(null);
  const [setupData, setSetupData] = useState<MFASetupData | null>(null);
  const [loading, setLoading] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [step, setStep] = useState<"status" | "setup" | "verify" | "complete">(
    "status",
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 使用 useCopy hook 替代手动复制逻辑
  const { copy, copied, error: copyError } = useCopy({
    timeout: 2000,
    onSuccess: () => {
      setSuccess("密钥已复制到剪贴板");
    },
    onError: (err) => {
      setError(`复制失败: ${err.message}`);
    },
  });

  // 加载MFA状态
  const loadMFAStatus = async () => {
    try {
      const response = await fetch("/api/auth/mfa/setup", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setStatus(data);
        setStep(data.enabled ? "status" : "status");
      }
    } catch (error) {
      console.error("Failed to load MFA status:", error);
    } finally {
      setLoading(false);
    }
  };

  // 初始化MFA设置
  const initializeMFA = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch("/api/auth/mfa/setup", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setSetupData(data);
        setStep("setup");
        setSuccess("MFA设置已初始化，请扫描二维码或手动输入密钥");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "初始化MFA失败，请稍后重试");
      }
    } catch (error) {
      console.error("Failed to initialize MFA:", error);
      setError("网络错误，请检查网络连接后重试");
    } finally {
      setLoading(false);
    }
  };

  // 验证并启用MFA
  const verifyAndEnable = async () => {
    if (!verificationCode.trim()) {
      setError("请输入6位验证码");
      return;
    }

    if (verificationCode.trim().length !== 6) {
      setError("验证码必须是6位数字");
      return;
    }

    if (!/^\d{6}$/.test(verificationCode.trim())) {
      setError("验证码只能包含数字");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch("/api/auth/mfa/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          code: verificationCode.trim(),
          type: "totp",
        }),
      });

      if (response.ok) {
        setSuccess("验证成功！MFA已启用");
        setStep("complete");
        await loadMFAStatus();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "验证码错误，请检查您的认证应用并重新输入");
      }
    } catch (error) {
      console.error("Failed to verify MFA:", error);
      setError("网络错误，请检查网络连接后重试");
    } finally {
      setLoading(false);
    }
  };

  // 禁用MFA
  const disableMFA = async () => {
    if (
      !confirm(
        "⚠️ 确定要禁用多因素认证吗？\n\n这会显著降低您账户的安全性，建议只在必要时禁用。",
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch("/api/auth/mfa/setup", {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setSuccess("MFA已成功禁用");
        await loadMFAStatus();
        setStep("status");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "禁用MFA失败，请稍后重试");
      }
    } catch (error) {
      console.error("Failed to disable MFA:", error);
      setError("网络错误，请检查网络连接后重试");
    } finally {
      setLoading(false);
    }
  };

  // 复制密钥到剪贴板
  const copySecret = async () => {
    if (!setupData?.secret) return;
    await copy(setupData.secret);
  };

  useEffect(() => {
    loadMFAStatus();
  }, []);

  if (loading && step === "status") {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600">
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6"
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
            <div>
              <h2 className="text-xl font-bold">多因素认证 (MFA)</h2>
              <p className="text-blue-100">增强您账户的安全性</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* 错误和成功消息 */}
          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-red-800 dark:text-red-200">
                    操作失败
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {error}
                  </p>
                </div>
                <button
                  onClick={() => setError("")}
                  className="ml-auto text-red-400 hover:text-red-600 transition-colors"
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
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-green-600 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-200">
                    操作成功
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {success}
                  </p>
                </div>
                <button
                  onClick={() => setSuccess("")}
                  className="ml-auto text-green-400 hover:text-green-600 transition-colors"
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
            </div>
          )}

          {step === "status" && status && (
            <div className="space-y-6">
              {status.enabled
                ? (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-800 dark:text-green-200">
                          MFA 已启用
                        </h3>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          您的账户已受到多因素认证保护
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-green-700 dark:text-green-300">
                      <p>备用恢复码: {status.backupCodesCount} 个可用</p>
                      {status.lastUsedAt && (
                        <p>
                          最后使用:{" "}
                          {new Date(status.lastUsedAt).toLocaleString()}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={disableMFA}
                      disabled={loading}
                      className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                    >
                      {loading ? "处理中..." : "禁用 MFA"}
                    </button>
                  </div>
                )
                : (
                  <div className="space-y-4">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                            MFA 未启用
                          </h3>
                          <p className="text-sm text-yellow-600 dark:text-yellow-400">
                            建议启用多因素认证以提高账户安全性
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        什么是多因素认证？
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        多因素认证 (MFA)
                        为您的账户添加额外的安全层。除了密码之外，您还需要提供来自认证应用的验证码。
                      </p>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• 防止未经授权的访问</li>
                        <li>• 即使密码泄露也能保护账户</li>
                        <li>• 支持 Google Authenticator、Authy 等应用</li>
                      </ul>
                    </div>

                    <button
                      onClick={initializeMFA}
                      disabled={loading}
                      className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
                    >
                      {loading ? "初始化中..." : "启用多因素认证"}
                    </button>
                  </div>
                )}
            </div>
          )}

          {step === "setup" && setupData && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  扫描二维码
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  使用您的认证应用扫描下方二维码
                </p>
              </div>

              <div className="flex justify-center">
                <img
                  src={setupData.qrCodeDataURL}
                  alt="MFA QR Code"
                  className="border border-gray-200 dark:border-gray-700 rounded-lg"
                />
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  手动输入密钥
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  如果无法扫描二维码，请手动输入以下密钥：
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-sm font-mono break-all">
                    {setupData.secret}
                  </code>
                  <button
                    onClick={copySecret}
                    className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                      copied
                        ? "bg-green-600 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                    title="复制密钥"
                  >
                    {copied
                      ? (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )
                      : (
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
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  在认证应用中选择"手动输入密钥"，然后输入上述密钥
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  输入验证码
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => {
                      const value = e.currentTarget.value.replace(/\D/g, ""); // 只允许数字
                      if (value.length <= 6) {
                        setVerificationCode(value);
                        setError(""); // 清除错误信息
                      }
                    }}
                    placeholder="请输入6位验证码"
                    className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-center text-lg font-mono tracking-widest"
                    maxLength={6}
                    autoComplete="off"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-xs text-gray-400">
                      {verificationCode.length}/6
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  从您的认证应用（如 Google Authenticator）中获取6位验证码
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("status")}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={verifyAndEnable}
                  disabled={loading || !verificationCode.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? "验证中..." : "验证并启用"}
                </button>
              </div>
            </div>
          )}

          {step === "complete" && setupData && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  MFA 启用成功！
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  您的账户现在受到多因素认证保护
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                  重要：保存备用恢复码
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                  请将以下恢复码保存在安全的地方。如果您丢失了认证设备，可以使用这些代码恢复账户访问。
                </p>

                {!showBackupCodes
                  ? (
                    <button
                      onClick={() => setShowBackupCodes(true)}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      显示恢复码
                    </button>
                  )
                  : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        {setupData.backupCodes.map((code, index) => (
                          <code
                            key={index}
                            className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-sm font-mono text-center"
                          >
                            {code}
                          </code>
                        ))}
                      </div>
                      <p className="text-xs text-yellow-600 dark:text-yellow-400">
                        每个恢复码只能使用一次。使用后将自动失效。
                      </p>
                    </div>
                  )}
              </div>

              <button
                onClick={() => setStep("status")}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                完成设置
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
