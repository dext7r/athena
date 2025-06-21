/**
 * 会话管理组件
 * 显示和管理用户的活跃会话
 */

import { useEffect, useState } from "preact/hooks";

interface DeviceInfo {
  userAgent: string;
  browser: string;
  os: string;
  device: string;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

interface LocationInfo {
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
  isp?: string;
}

interface SessionInfo {
  id: string;
  userId: number;
  deviceInfo: DeviceInfo;
  ipAddress: string;
  location?: LocationInfo;
  createdAt: string;
  lastActiveAt: string;
  expiresAt: string;
  isActive: boolean;
  isCurrent?: boolean;
}

interface SessionStats {
  totalSessions: number;
  activeSessions: number;
  uniqueDevices: number;
  uniqueLocations: number;
  lastLoginAt?: string;
}

interface SessionData {
  sessions: SessionInfo[];
  stats: SessionStats;
  currentSessionId?: string;
}

export default function SessionManager() {
  const [data, setData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 加载会话数据
  const loadSessions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/sessions", {
        credentials: "include",
      });

      if (response.ok) {
        const sessionData = await response.json();
        setData(sessionData);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "加载会话数据失败");
      }
    } catch (error) {
      console.error("Failed to load sessions:", error);
      setError("网络错误，请检查网络连接后重试");
    } finally {
      setLoading(false);
    }
  };

  // 删除单个会话
  const deleteSession = async (sessionId: string) => {
    if (!confirm("确定要删除这个会话吗？该设备将被强制登出。")) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/auth/sessions?sessionId=${sessionId}&action=single`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.ok) {
        setSuccess("会话已删除");
        await loadSessions();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "删除会话失败");
      }
    } catch (error) {
      console.error("Failed to delete session:", error);
      setError("网络错误，请稍后重试");
    }
  };

  // 删除其他会话
  const deleteOtherSessions = async () => {
    if (
      !confirm(
        "确定要删除所有其他会话吗？其他设备将被强制登出，但当前设备保持登录状态。",
      )
    ) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/auth/sessions?action=others&currentSessionId=${
          data?.currentSessionId || ""
        }`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message);
        await loadSessions();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "删除其他会话失败");
      }
    } catch (error) {
      console.error("Failed to delete other sessions:", error);
      setError("网络错误，请稍后重试");
    }
  };

  // 删除所有会话
  const deleteAllSessions = async () => {
    if (
      !confirm(
        "⚠️ 确定要删除所有会话吗？\n\n这将强制登出所有设备，包括当前设备。您需要重新登录。",
      )
    ) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch("/api/auth/sessions?action=all", {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        // 删除所有会话后重定向到首页
        globalThis.location.href = "/";
      } else {
        const errorData = await response.json();
        setError(errorData.error || "删除所有会话失败");
      }
    } catch (error) {
      console.error("Failed to delete all sessions:", error);
      setError("网络错误，请稍后重试");
    }
  };

  // 获取设备图标
  const getDeviceIcon = (deviceInfo: DeviceInfo) => {
    if (deviceInfo.isMobile) {
      return (
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
            d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"
          />
        </svg>
      );
    } else if (deviceInfo.isTablet) {
      return (
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
            d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      );
    } else {
      return (
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
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    }
  };

  // 格式化时间
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "刚刚";
    if (diffMins < 60) return `${diffMins} 分钟前`;
    if (diffHours < 24) return `${diffHours} 小时前`;
    if (diffDays < 7) return `${diffDays} 天前`;

    return date.toLocaleDateString();
  };

  useEffect(() => {
    loadSessions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600">
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white">
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
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">会话管理</h2>
              <p className="text-orange-100">管理您的登录设备和会话</p>
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

          {data && (
            <div className="space-y-6">
              {/* 会话统计 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {data.stats.activeSessions}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    活跃会话
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {data.stats.uniqueDevices}
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    设备数量
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {data.stats.uniqueLocations}
                  </div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">
                    登录位置
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {data.stats.totalSessions}
                  </div>
                  <div className="text-sm text-orange-700 dark:text-orange-300">
                    总会话数
                  </div>
                </div>
              </div>

              {/* 批量操作 */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={deleteOtherSessions}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  删除其他会话
                </button>
                <button
                  onClick={deleteAllSessions}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  删除所有会话
                </button>
                <button
                  onClick={loadSessions}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  刷新列表
                </button>
              </div>

              {/* 会话列表 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  活跃会话 ({data.sessions.length})
                </h3>

                {data.sessions.length === 0
                  ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      暂无活跃会话
                    </div>
                  )
                  : (
                    data.sessions.map((session) => (
                      <div
                        key={session.id}
                        className={`border rounded-lg p-4 ${
                          session.isCurrent
                            ? "border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700"
                            : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div
                              className={`p-2 rounded-lg ${
                                session.isCurrent
                                  ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-400"
                                  : "bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              {getDeviceIcon(session.deviceInfo)}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {session.deviceInfo.browser} on{" "}
                                  {session.deviceInfo.os}
                                </h4>
                                {session.isCurrent && (
                                  <span className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 text-xs rounded-full">
                                    当前设备
                                  </span>
                                )}
                              </div>

                              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                <div>设备类型: {session.deviceInfo.device}</div>
                                <div>IP 地址: {session.ipAddress}</div>
                                <div>
                                  最后活动: {formatTime(session.lastActiveAt)}
                                </div>
                                <div>
                                  创建时间: {formatTime(session.createdAt)}
                                </div>
                              </div>
                            </div>
                          </div>

                          {!session.isCurrent && (
                            <button
                              onClick={() => deleteSession(session.id)}
                              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                            >
                              删除
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
