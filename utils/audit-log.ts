/**
 * 安全审计日志工具函数
 * 记录用户操作和安全事件
 */

// 审计日志级别
export enum AuditLevel {
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
  CRITICAL = "critical",
}

// 审计事件类型
export enum AuditEventType {
  // 认证相关
  LOGIN_SUCCESS = "login_success",
  LOGIN_FAILED = "login_failed",
  LOGOUT = "logout",

  // MFA相关
  MFA_ENABLED = "mfa_enabled",
  MFA_DISABLED = "mfa_disabled",
  MFA_VERIFY_SUCCESS = "mfa_verify_success",
  MFA_VERIFY_FAILED = "mfa_verify_failed",

  // 会话相关
  SESSION_CREATED = "session_created",
  SESSION_DELETED = "session_deleted",
  SESSION_EXPIRED = "session_expired",

  // 账户相关
  ACCOUNT_LOCKED = "account_locked",
  ACCOUNT_UNLOCKED = "account_unlocked",
  PASSWORD_CHANGED = "password_changed",

  // 权限相关
  PERMISSION_GRANTED = "permission_granted",
  PERMISSION_DENIED = "permission_denied",

  // 数据相关
  DATA_ACCESSED = "data_accessed",
  DATA_MODIFIED = "data_modified",
  DATA_DELETED = "data_deleted",

  // 安全事件
  SUSPICIOUS_ACTIVITY = "suspicious_activity",
  BRUTE_FORCE_ATTEMPT = "brute_force_attempt",
  IP_BLOCKED = "ip_blocked",
}

// 审计日志条目接口
export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  userId?: string;
  username?: string;
  eventType: AuditEventType;
  level: AuditLevel;
  message: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
  resource?: string;
  success: boolean;
}

// 审计日志查询参数
export interface AuditLogQuery {
  userId?: string;
  eventType?: AuditEventType;
  level?: AuditLevel;
  startDate?: Date;
  endDate?: Date;
  ipAddress?: string;
  limit?: number;
  offset?: number;
}

// 临时存储审计日志（实际项目中应该使用数据库）
const auditLogs: AuditLogEntry[] = [];

/**
 * 生成审计日志ID
 */
function generateAuditId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  return `audit_${timestamp}_${random}`;
}

/**
 * 记录审计日志
 */
export function logAuditEvent(
  eventType: AuditEventType,
  level: AuditLevel,
  message: string,
  options: {
    userId?: string;
    username?: string;
    details?: Record<string, unknown>;
    ipAddress?: string;
    userAgent?: string;
    sessionId?: string;
    resource?: string;
    success?: boolean;
  } = {},
): AuditLogEntry {
  const entry: AuditLogEntry = {
    id: generateAuditId(),
    timestamp: new Date(),
    eventType,
    level,
    message,
    success: options.success ?? true,
    ...options,
  };

  auditLogs.push(entry);

  // 控制台输出（开发环境）
  if (Deno.env.get("NODE_ENV") !== "production") {
    const levelEmoji = {
      [AuditLevel.INFO]: "ℹ️",
      [AuditLevel.WARNING]: "⚠️",
      [AuditLevel.ERROR]: "❌",
      [AuditLevel.CRITICAL]: "🚨",
    };

    console.log(
      `${
        levelEmoji[level]
      } [AUDIT] ${entry.timestamp.toISOString()} - ${eventType}: ${message}`,
      options.details
        ? `\nDetails: ${JSON.stringify(options.details, null, 2)}`
        : "",
    );
  }

  return entry;
}

/**
 * 查询审计日志
 */
export function queryAuditLogs(query: AuditLogQuery = {}): AuditLogEntry[] {
  let filteredLogs = [...auditLogs];

  // 按用户ID过滤
  if (query.userId !== undefined) {
    filteredLogs = filteredLogs.filter((log) => log.userId === query.userId);
  }

  // 按事件类型过滤
  if (query.eventType) {
    filteredLogs = filteredLogs.filter((log) =>
      log.eventType === query.eventType
    );
  }

  // 按级别过滤
  if (query.level) {
    filteredLogs = filteredLogs.filter((log) => log.level === query.level);
  }

  // 按IP地址过滤
  if (query.ipAddress) {
    filteredLogs = filteredLogs.filter((log) =>
      log.ipAddress === query.ipAddress
    );
  }

  // 按时间范围过滤
  if (query.startDate) {
    filteredLogs = filteredLogs.filter((log) =>
      log.timestamp >= query.startDate!
    );
  }
  if (query.endDate) {
    filteredLogs = filteredLogs.filter((log) =>
      log.timestamp <= query.endDate!
    );
  }

  // 按时间倒序排序
  filteredLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  // 分页
  const offset = query.offset || 0;
  const limit = query.limit || 100;

  return filteredLogs.slice(offset, offset + limit);
}

/**
 * 获取审计日志统计
 */
export function getAuditLogStats(query: AuditLogQuery = {}): {
  total: number;
  byLevel: Record<AuditLevel, number>;
  byEventType: Record<string, number>;
  recentActivity: AuditLogEntry[];
} {
  const logs = queryAuditLogs({ ...query, limit: 10000 }); // 获取所有匹配的日志用于统计

  const byLevel: Record<AuditLevel, number> = {
    [AuditLevel.INFO]: 0,
    [AuditLevel.WARNING]: 0,
    [AuditLevel.ERROR]: 0,
    [AuditLevel.CRITICAL]: 0,
  };

  const byEventType: Record<string, number> = {};

  logs.forEach((log) => {
    byLevel[log.level]++;
    byEventType[log.eventType] = (byEventType[log.eventType] || 0) + 1;
  });

  return {
    total: logs.length,
    byLevel,
    byEventType,
    recentActivity: logs.slice(0, 10), // 最近10条活动
  };
}

/**
 * 清理旧的审计日志
 */
export function cleanupOldAuditLogs(daysToKeep: number = 90): number {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

  const initialCount = auditLogs.length;

  // 移除旧日志
  for (let i = auditLogs.length - 1; i >= 0; i--) {
    if (auditLogs[i].timestamp < cutoffDate) {
      auditLogs.splice(i, 1);
    }
  }

  const removedCount = initialCount - auditLogs.length;

  if (removedCount > 0) {
    logAuditEvent(
      AuditEventType.DATA_DELETED,
      AuditLevel.INFO,
      `Cleaned up ${removedCount} old audit log entries`,
      {
        details: { daysToKeep, removedCount },
        success: true,
      },
    );
  }

  return removedCount;
}

/**
 * 记录登录成功事件
 */
export function logLoginSuccess(
  userId: string,
  username: string,
  ipAddress: string,
  userAgent: string,
  sessionId?: string,
): void {
  logAuditEvent(
    AuditEventType.LOGIN_SUCCESS,
    AuditLevel.INFO,
    `用户 ${username} 登录成功`,
    {
      userId,
      username,
      ipAddress,
      userAgent,
      sessionId,
      success: true,
    },
  );
}

/**
 * 记录登录失败事件
 */
export function logLoginFailed(
  username: string,
  reason: string,
  ipAddress: string,
  userAgent: string,
): void {
  logAuditEvent(
    AuditEventType.LOGIN_FAILED,
    AuditLevel.WARNING,
    `用户 ${username} 登录失败: ${reason}`,
    {
      username,
      ipAddress,
      userAgent,
      details: { reason },
      success: false,
    },
  );
}

/**
 * 记录登出事件
 */
export function logLogout(
  userId: string,
  username: string,
  ipAddress: string,
  sessionId?: string,
): void {
  logAuditEvent(
    AuditEventType.LOGOUT,
    AuditLevel.INFO,
    `用户 ${username} 登出`,
    {
      userId,
      username,
      ipAddress,
      sessionId,
      success: true,
    },
  );
}

/**
 * 记录MFA事件
 */
export function logMFAEvent(
  eventType:
    | AuditEventType.MFA_ENABLED
    | AuditEventType.MFA_DISABLED
    | AuditEventType.MFA_VERIFY_SUCCESS
    | AuditEventType.MFA_VERIFY_FAILED,
  userId: string,
  username: string,
  ipAddress: string,
  details?: Record<string, unknown>,
): void {
  const messages = {
    [AuditEventType.MFA_ENABLED]: "启用了多因素认证",
    [AuditEventType.MFA_DISABLED]: "禁用了多因素认证",
    [AuditEventType.MFA_VERIFY_SUCCESS]: "MFA验证成功",
    [AuditEventType.MFA_VERIFY_FAILED]: "MFA验证失败",
  };

  const level = eventType === AuditEventType.MFA_VERIFY_FAILED
    ? AuditLevel.WARNING
    : AuditLevel.INFO;
  const success = eventType !== AuditEventType.MFA_VERIFY_FAILED;

  logAuditEvent(
    eventType,
    level,
    `用户 ${username} ${messages[eventType]}`,
    {
      userId,
      username,
      ipAddress,
      details,
      success,
    },
  );
}

/**
 * 记录可疑活动
 */
export function logSuspiciousActivity(
  description: string,
  ipAddress: string,
  userAgent?: string,
  userId?: string,
  username?: string,
  details?: Record<string, unknown>,
): void {
  logAuditEvent(
    AuditEventType.SUSPICIOUS_ACTIVITY,
    AuditLevel.WARNING,
    `检测到可疑活动: ${description}`,
    {
      userId,
      username,
      ipAddress,
      userAgent,
      details,
      success: false,
    },
  );
}
