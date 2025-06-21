/**
 * 账户锁定管理组件
 * 处理账户的紧急锁定和解锁
 */

import { useEffect, useState } from "preact/hooks";

interface AccountLockStatus {
  isLocked: boolean;
  lockedAt?: string;
  lockedBy?: number;
  reason?: string;
  reasonDescription?: string;
  description?: string;
  unlockAt?: string;
  attemptCount?: number;
  lastAttemptAt?: string;
}

export default function AccountLockManager() {
  const [lockStatus, setLockStatus] = useState<AccountLockStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reason, setReason] = useState("");

  // 加载账户锁定状态
  const loadLockStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/security/account-lock", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setLockStatus(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "加载账户状态失败");
      }
    } catch (error) {
      console.error("Failed to load lock status:", error);
      setError("网络错误，请检查网络连接后重试");
    } finally {
      setLoading(false);
    }
  };

  // 紧急锁定账户
  const emergencyLock = async () => {
    if (
      !confirm(
        "⚠️ 确定要紧急锁定您的账户吗？\n\n锁定后您将被强制登出，需要联系管理员或等待自动解锁。",
      )
    ) {
      return;
    }

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      const response = await fetch("/api/security/account-lock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          reason: reason || "用户主动请求紧急锁定",
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message);
        await loadLockStatus();

        // 锁定成功后，延迟跳转到首页
        setTimeout(() => {
          globalThis.location.href = "/";
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "锁定账户失败");
      }
    } catch (error) {
      console.error("Failed to lock account:", error);
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  // 解锁账户
  const unlockAccount = async () => {
    if (!confirm("确定要解锁您的账户吗？")) {
      return;
    }

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      const response = await fetch("/api/security/account-lock", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          reason: "用户请求解锁账户",
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message);
        await loadLockStatus();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "解锁账户失败");
      }
    } catch (error) {
      console.error("Failed to unlock account:", error);
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  // 格式化时间
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("zh-CN");
  };

  useEffect(() => {
    loadLockStatus();
  }, []);

  if (loading && !lockStatus) {
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
        <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6 text-white">
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
              <h2 className="text-xl font-bold">账户安全锁定</h2>
              <p className="text-red-100">紧急情况下保护您的账户安全</p>
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

          {lockStatus && (
            <div className="space-y-6">
              {/* 当前状态 */}
              <div
                className={`border rounded-lg p-4 ${
                  lockStatus.isLocked
                    ? "border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700"
                    : "border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      lockStatus.isLocked
                        ? "bg-red-100 dark:bg-red-800"
                        : "bg-green-100 dark:bg-green-800"
                    }`}
                  >
                    {lockStatus.isLocked
                      ? (
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
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      )
                      : (
                        <svg
                          className="w-4 h-4 text-green-600 dark:text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${
                        lockStatus.isLocked
                          ? "text-red-800 dark:text-red-200"
                          : "text-green-800 dark:text-green-200"
                      }`}
                    >
                      账户状态: {lockStatus.isLocked ? "已锁定" : "正常"}
                    </h3>
                  </div>
                </div>

                {lockStatus.isLocked && (
                  <div className="space-y-2 text-sm text-red-700 dark:text-red-300">
                    {lockStatus.reasonDescription && (
                      <p>锁定原因: {lockStatus.reasonDescription}</p>
                    )}
                    {lockStatus.description && (
                      <p>详细说明: {lockStatus.description}</p>
                    )}
                    {lockStatus.lockedAt && (
                      <p>锁定时间: {formatTime(lockStatus.lockedAt)}</p>
                    )}
                    {lockStatus.unlockAt && (
                      <p>自动解锁时间: {formatTime(lockStatus.unlockAt)}</p>
                    )}
                    {lockStatus.attemptCount && lockStatus.attemptCount > 0 && (
                      <p>失败尝试次数: {lockStatus.attemptCount}</p>
                    )}
                  </div>
                )}
              </div>

              {/* 操作区域 */}
              {!lockStatus.isLocked
                ? (
                  <div className="space-y-4">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                        紧急锁定账户
                      </h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-4">
                        如果您怀疑账户被盗用或发现异常活动，可以立即锁定账户以保护安全。
                      </p>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                          锁定原因（可选）
                        </label>
                        <textarea
                          value={reason}
                          onChange={(e) => setReason(e.currentTarget.value)}
                          placeholder="请描述锁定原因，如：发现异常登录、怀疑密码泄露等"
                          className="w-full px-3 py-2 border border-yellow-300 dark:border-yellow-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-yellow-900/20 dark:text-yellow-100"
                          rows={3}
                        />
                      </div>

                      <button
                        onClick={emergencyLock}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors font-medium"
                      >
                        {loading ? "处理中..." : "🚨 紧急锁定账户"}
                      </button>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        注意事项
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• 锁定后您将立即被登出所有设备</li>
                        <li>• 锁定期间无法登录账户</li>
                        <li>• 可以联系管理员或等待自动解锁</li>
                        <li>• 建议在安全环境下操作</li>
                      </ul>
                    </div>
                  </div>
                )
                : (
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                        解锁账户
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                        如果您确认账户安全，可以尝试解锁账户。
                      </p>

                      <button
                        onClick={unlockAccount}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
                      >
                        {loading ? "处理中..." : "🔓 解锁账户"}
                      </button>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                        安全提醒
                      </h4>
                      <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                        <li>• 解锁前请确认账户安全</li>
                        <li>• 检查是否有异常登录记录</li>
                        <li>• 建议更改密码并启用MFA</li>
                        <li>• 如有疑问请联系管理员</li>
                      </ul>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
