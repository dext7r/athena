/**
 * 账户锁定管理工具函数
 * 处理账户锁定、解锁和安全措施
 */

import { AuditEventType, AuditLevel, logAuditEvent } from "./audit-log.ts";
import { deleteAllUserSessions } from "./session.ts";

// 账户锁定原因
export enum LockReason {
  USER_REQUEST = "user_request",
  SUSPICIOUS_ACTIVITY = "suspicious_activity",
  BRUTE_FORCE = "brute_force",
  SECURITY_BREACH = "security_breach",
  ADMIN_ACTION = "admin_action",
  MFA_FAILURES = "mfa_failures",
}

// 账户锁定状态接口
export interface AccountLockStatus {
  isLocked: boolean;
  lockedAt?: Date;
  lockedBy?: number; // 锁定操作者的用户ID
  reason?: LockReason;
  description?: string;
  unlockAt?: Date; // 自动解锁时间
  attemptCount?: number; // 失败尝试次数
  lastAttemptAt?: Date;
}

// 临时存储账户锁定状态（实际项目中应该使用数据库）
const accountLocks = new Map<number, AccountLockStatus>();

/**
 * 检查账户是否被锁定
 */
export function isAccountLocked(userId: number): boolean {
  const lockStatus = accountLocks.get(userId);

  if (!lockStatus || !lockStatus.isLocked) {
    return false;
  }

  // 检查是否到了自动解锁时间
  if (lockStatus.unlockAt && new Date() >= lockStatus.unlockAt) {
    unlockAccount(userId, "自动解锁");
    return false;
  }

  return true;
}

/**
 * 获取账户锁定状态
 */
export function getAccountLockStatus(userId: number): AccountLockStatus {
  const lockStatus = accountLocks.get(userId);

  if (!lockStatus) {
    return { isLocked: false };
  }

  // 检查是否到了自动解锁时间
  if (lockStatus.unlockAt && new Date() >= lockStatus.unlockAt) {
    unlockAccount(userId, "自动解锁");
    return { isLocked: false };
  }

  return lockStatus;
}

/**
 * 锁定账户
 */
export function lockAccount(
  userId: number,
  reason: LockReason,
  description: string,
  options: {
    lockedBy?: number;
    duration?: number; // 锁定时长（分钟）
    ipAddress?: string;
    username?: string;
  } = {},
): AccountLockStatus {
  const now = new Date();
  const unlockAt = options.duration
    ? new Date(now.getTime() + options.duration * 60 * 1000)
    : undefined;

  const lockStatus: AccountLockStatus = {
    isLocked: true,
    lockedAt: now,
    lockedBy: options.lockedBy,
    reason,
    description,
    unlockAt,
  };

  accountLocks.set(userId, lockStatus);

  // 删除用户的所有会话
  deleteAllUserSessions(userId);

  // 记录审计日志
  logAuditEvent(
    AuditEventType.ACCOUNT_LOCKED,
    AuditLevel.WARNING,
    `账户被锁定: ${description}`,
    {
      userId,
      username: options.username,
      ipAddress: options.ipAddress,
      details: {
        reason,
        duration: options.duration,
        unlockAt: unlockAt?.toISOString(),
        lockedBy: options.lockedBy,
      },
      success: true,
    },
  );

  return lockStatus;
}

/**
 * 解锁账户
 */
export function unlockAccount(
  userId: number,
  description: string,
  options: {
    unlockedBy?: number;
    ipAddress?: string;
    username?: string;
  } = {},
): boolean {
  const lockStatus = accountLocks.get(userId);

  if (!lockStatus || !lockStatus.isLocked) {
    return false;
  }

  // 删除锁定状态
  accountLocks.delete(userId);

  // 记录审计日志
  logAuditEvent(
    AuditEventType.ACCOUNT_UNLOCKED,
    AuditLevel.INFO,
    `账户已解锁: ${description}`,
    {
      userId,
      username: options.username,
      ipAddress: options.ipAddress,
      details: {
        previousLockReason: lockStatus.reason,
        lockedDuration: lockStatus.lockedAt
          ? Math.round((Date.now() - lockStatus.lockedAt.getTime()) / 1000 / 60)
          : undefined,
        unlockedBy: options.unlockedBy,
      },
      success: true,
    },
  );

  return true;
}

/**
 * 记录失败尝试
 */
export function recordFailedAttempt(
  userId: number,
  attemptType: string,
  ipAddress?: string,
  username?: string,
): { shouldLock: boolean; attemptCount: number } {
  const lockStatus = accountLocks.get(userId) || { isLocked: false };

  const attemptCount = (lockStatus.attemptCount || 0) + 1;
  const now = new Date();

  // 更新失败尝试记录
  accountLocks.set(userId, {
    ...lockStatus,
    attemptCount,
    lastAttemptAt: now,
  });

  // 记录审计日志
  logAuditEvent(
    AuditEventType.LOGIN_FAILED,
    AuditLevel.WARNING,
    `${attemptType}失败 (第${attemptCount}次尝试)`,
    {
      userId,
      username,
      ipAddress,
      details: {
        attemptType,
        attemptCount,
      },
      success: false,
    },
  );

  // 检查是否需要锁定账户
  const shouldLock = attemptCount >= 5; // 5次失败后锁定

  if (shouldLock && !lockStatus.isLocked) {
    lockAccount(
      userId,
      LockReason.BRUTE_FORCE,
      `连续${attemptCount}次${attemptType}失败`,
      {
        duration: 30, // 锁定30分钟
        ipAddress,
        username,
      },
    );
  }

  return { shouldLock, attemptCount };
}

/**
 * 重置失败尝试计数
 */
export function resetFailedAttempts(userId: number): void {
  const lockStatus = accountLocks.get(userId);

  if (lockStatus) {
    accountLocks.set(userId, {
      ...lockStatus,
      attemptCount: 0,
      lastAttemptAt: undefined,
    });
  }
}

/**
 * 紧急锁定账户（用户主动请求）
 */
export function emergencyLockAccount(
  userId: number,
  username: string,
  ipAddress: string,
  reason?: string,
): AccountLockStatus {
  const description = reason || "用户主动请求紧急锁定";

  return lockAccount(
    userId,
    LockReason.USER_REQUEST,
    description,
    {
      lockedBy: userId,
      ipAddress,
      username,
    },
  );
}

/**
 * 检测可疑活动并锁定账户
 */
export function lockForSuspiciousActivity(
  userId: number,
  username: string,
  activityDescription: string,
  ipAddress?: string,
  duration: number = 60, // 默认锁定1小时
): AccountLockStatus {
  // 记录可疑活动
  logAuditEvent(
    AuditEventType.SUSPICIOUS_ACTIVITY,
    AuditLevel.CRITICAL,
    `检测到可疑活动: ${activityDescription}`,
    {
      userId,
      username,
      ipAddress,
      details: { activityDescription },
      success: false,
    },
  );

  return lockAccount(
    userId,
    LockReason.SUSPICIOUS_ACTIVITY,
    `可疑活动: ${activityDescription}`,
    {
      duration,
      ipAddress,
      username,
    },
  );
}

/**
 * 获取锁定原因的中文描述
 */
export function getLockReasonDescription(reason: LockReason): string {
  const descriptions: Record<LockReason, string> = {
    [LockReason.USER_REQUEST]: "用户主动请求",
    [LockReason.SUSPICIOUS_ACTIVITY]: "检测到可疑活动",
    [LockReason.BRUTE_FORCE]: "暴力破解尝试",
    [LockReason.SECURITY_BREACH]: "安全漏洞",
    [LockReason.ADMIN_ACTION]: "管理员操作",
    [LockReason.MFA_FAILURES]: "多因素认证失败",
  };

  return descriptions[reason] || "未知原因";
}

/**
 * 获取所有锁定的账户（管理员功能）
 */
export function getAllLockedAccounts(): Array<
  { userId: number; status: AccountLockStatus }
> {
  const lockedAccounts: Array<{ userId: number; status: AccountLockStatus }> =
    [];

  for (const [userId, status] of accountLocks) {
    if (status.isLocked) {
      // 检查是否到了自动解锁时间
      if (status.unlockAt && new Date() >= status.unlockAt) {
        unlockAccount(userId, "自动解锁");
      } else {
        lockedAccounts.push({ userId, status });
      }
    }
  }

  return lockedAccounts;
}

/**
 * 清理过期的锁定记录
 */
export function cleanupExpiredLocks(): number {
  let cleanedCount = 0;

  for (const [userId, status] of accountLocks) {
    if (status.unlockAt && new Date() >= status.unlockAt) {
      unlockAccount(userId, "自动解锁");
      cleanedCount++;
    }
  }

  return cleanedCount;
}
