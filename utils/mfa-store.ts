/**
 * MFA数据存储
 * 临时内存存储，实际项目中应该使用数据库
 */

import type { MFASettings } from "./mfa.ts";

// 全局MFA设置存储
const mfaSettings = new Map<string, MFASettings>();

/**
 * 获取用户MFA设置
 */
export function getMFASettings(userId: string): MFASettings | undefined {
  return mfaSettings.get(userId);
}

/**
 * 设置用户MFA配置
 */
export function setMFASettings(userId: string, settings: MFASettings): void {
  mfaSettings.set(userId, settings);
}

/**
 * 删除用户MFA设置
 */
export function deleteMFASettings(userId: string): boolean {
  return mfaSettings.delete(userId);
}

/**
 * 检查用户是否启用了MFA
 */
export function isMFAEnabled(userId: string): boolean {
  const settings = mfaSettings.get(userId);
  return settings?.enabled || false;
}

/**
 * 获取所有MFA设置（用于调试）
 */
export function getAllMFASettings(): Map<string, MFASettings> {
  return new Map(mfaSettings);
}
