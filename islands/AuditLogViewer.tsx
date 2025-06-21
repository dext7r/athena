/**
 * 安全审计日志查看器组件
 * 显示和过滤安全审计日志
 */

import { useEffect, useState } from "preact/hooks";

interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId?: number;
  username?: string;
  eventType: string;
  level: string;
  message: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
  resource?: string;
  success: boolean;
}

interface AuditLogStats {
  total: number;
  byLevel: Record<string, number>;
  byEventType: Record<string, number>;
  recentActivity: AuditLogEntry[];
}

interface AuditLogData {
  logs: AuditLogEntry[];
  total: number;
  query: unknown;
}

export default function AuditLogViewer() {
  const [data, setData] = useState<AuditLogData | null>(null);
  const [stats, setStats] = useState<AuditLogStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 过滤参数
  const [filters, setFilters] = useState({
    eventType: "",
    level: "",
    startDate: "",
    endDate: "",
    limit: 50,
    offset: 0,
  });

  // 加载审计日志
  const loadAuditLogs = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams({
        action: "logs",
        limit: filters.limit.toString(),
        offset: filters.offset.toString(),
      });

      if (filters.eventType) params.append("eventType", filters.eventType);
      if (filters.level) params.append("level", filters.level);
      if (filters.startDate) params.append("startDate", filters.startDate);
      if (filters.endDate) params.append("endDate", filters.endDate);

      const response = await fetch(`/api/security/audit-logs?${params}`, {
        credentials: "include",
      });

      if (response.ok) {
        const auditData = await response.json();
        setData(auditData);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "加载审计日志失败");
      }
    } catch (error) {
      console.error("Failed to load audit logs:", error);
      setError("网络错误，请检查网络连接后重试");
    } finally {
      setLoading(false);
    }
  };

  // 加载统计信息
  const loadStats = async () => {
    try {
      const response = await fetch("/api/security/audit-logs?action=stats", {
        credentials: "include",
      });

      if (response.ok) {
        const statsData = await response.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  // 清理旧日志
  const cleanupOldLogs = async () => {
    if (!confirm("确定要清理90天前的旧日志吗？此操作不可撤销。")) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch("/api/security/audit-logs?days=90", {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message);
        await loadAuditLogs();
        await loadStats();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "清理日志失败");
      }
    } catch (error) {
      console.error("Failed to cleanup logs:", error);
      setError("网络错误，请稍后重试");
    }
  };

  // 获取事件类型的中文名称
  const getEventTypeName = (eventType: string) => {
    const names: Record<string, string> = {
      login_success: "登录成功",
      login_failed: "登录失败",
      logout: "登出",
      mfa_enabled: "启用MFA",
      mfa_disabled: "禁用MFA",
      mfa_verify_success: "MFA验证成功",
      mfa_verify_failed: "MFA验证失败",
      session_created: "创建会话",
      session_deleted: "删除会话",
      session_expired: "会话过期",
      account_locked: "账户锁定",
      account_unlocked: "账户解锁",
      suspicious_activity: "可疑活动",
      brute_force_attempt: "暴力破解尝试",
    };
    return names[eventType] || eventType;
  };

  // 获取级别的样式
  const getLevelStyle = (level: string) => {
    const styles: Record<string, string> = {
      info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      warning:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      critical:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    };
    return styles[level] || styles.info;
  };

  // 获取级别的中文名称
  const getLevelName = (level: string) => {
    const names: Record<string, string> = {
      info: "信息",
      warning: "警告",
      error: "错误",
      critical: "严重",
    };
    return names[level] || level;
  };

  // 格式化时间
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("zh-CN");
  };

  // 处理过滤器变化
  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value, offset: 0 }));
  };

  // 应用过滤器
  const applyFilters = () => {
    loadAuditLogs();
  };

  // 重置过滤器
  const resetFilters = () => {
    setFilters({
      eventType: "",
      level: "",
      startDate: "",
      endDate: "",
      limit: 50,
      offset: 0,
    });
  };

  useEffect(() => {
    loadAuditLogs();
    loadStats();
  }, []);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600">
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 text-white">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">安全审计日志</h2>
              <p className="text-green-100">查看您的账户安全活动记录</p>
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

          {/* 统计信息 */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.total}
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  总记录数
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.byLevel.info || 0}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  信息级别
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {stats.byLevel.warning || 0}
                </div>
                <div className="text-sm text-yellow-700 dark:text-yellow-300">
                  警告级别
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {(stats.byLevel.error || 0) + (stats.byLevel.critical || 0)}
                </div>
                <div className="text-sm text-red-700 dark:text-red-300">
                  错误级别
                </div>
              </div>
            </div>
          )}

          {/* 过滤器 */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              过滤条件
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  事件类型
                </label>
                <select
                  value={filters.eventType}
                  onChange={(e) =>
                    handleFilterChange("eventType", e.currentTarget.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">全部</option>
                  <option value="login_success">登录成功</option>
                  <option value="login_failed">登录失败</option>
                  <option value="logout">登出</option>
                  <option value="mfa_enabled">启用MFA</option>
                  <option value="mfa_disabled">禁用MFA</option>
                  <option value="suspicious_activity">可疑活动</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  级别
                </label>
                <select
                  value={filters.level}
                  onChange={(e) =>
                    handleFilterChange("level", e.currentTarget.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">全部</option>
                  <option value="info">信息</option>
                  <option value="warning">警告</option>
                  <option value="error">错误</option>
                  <option value="critical">严重</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  开始日期
                </label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) =>
                    handleFilterChange("startDate", e.currentTarget.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  结束日期
                </label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) =>
                    handleFilterChange("endDate", e.currentTarget.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                应用过滤
              </button>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                重置
              </button>
              <button
                onClick={cleanupOldLogs}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                清理旧日志
              </button>
            </div>
          </div>

          {/* 日志列表 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              审计日志 ({data?.total || 0})
            </h3>

            {data && data.logs.length === 0
              ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  暂无审计日志记录
                </div>
              )
              : (
                data?.logs.map((log) => (
                  <div
                    key={log.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getLevelStyle(log.level)
                          }`}
                        >
                          {getLevelName(log.level)}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {getEventTypeName(log.eventType)}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            log.success ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatTime(log.timestamp)}
                      </span>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      {log.message}
                    </p>

                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {log.ipAddress && <div>IP地址: {log.ipAddress}</div>}
                      {log.sessionId && (
                        <div>会话ID: {log.sessionId.substring(0, 16)}...</div>
                      )}
                      {log.details && Object.keys(log.details).length > 0 && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-blue-600 dark:text-blue-400">
                            详细信息
                          </summary>
                          <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-x-auto">
                          {JSON.stringify(log.details, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                ))
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
