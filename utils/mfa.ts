/**
 * 多因素认证(MFA)工具函数
 * 支持TOTP(Time-based One-Time Password)认证
 */

import { authenticator } from "otplib";
import QRCode from "qrcode";

// TOTP配置
export interface TOTPConfig {
  secret: string;
  period: number; // 时间窗口（秒）
  digits: number; // 验证码位数
  algorithm: string; // 哈希算法
  issuer: string; // 发行者
  accountName: string; // 账户名
}

// MFA设置状态
export interface MFASettings {
  enabled: boolean;
  secret?: string;
  backupCodes?: string[];
  lastUsedAt?: Date;
  createdAt: Date;
}

/**
 * 生成随机密钥
 */
export function generateSecret(): string {
  return authenticator.generateSecret();
}

/**
 * 生成备用恢复码
 */
export function generateBackupCodes(count: number = 10): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const bytes = new Uint8Array(5);
    crypto.getRandomValues(bytes);
    const code = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
    codes.push(code);
  }
  return codes;
}

/**
 * 生成TOTP URI（用于QR码）
 */
export function generateTOTPUri(config: TOTPConfig): string {
  return authenticator.keyuri(config.accountName, config.issuer, config.secret);
}

/**
 * 生成TOTP验证码
 */
export function generateTOTP(secret: string): string {
  return authenticator.generate(secret);
}

/**
 * 验证TOTP验证码
 */
export function verifyTOTP(
  secret: string,
  token: string,
  window: number = 1,
): boolean {
  try {
    authenticator.options = { window };
    return authenticator.verify({ token, secret });
  } catch (error) {
    console.error("TOTP verification error:", error);
    return false;
  }
}

/**
 * 验证备用恢复码
 */
export function verifyBackupCode(
  backupCodes: string[],
  code: string,
): { valid: boolean; remainingCodes: string[] } {
  const normalizedCode = code.toUpperCase().replace(/[^A-F0-9]/g, "");
  const index = backupCodes.findIndex((c) => c === normalizedCode);

  if (index === -1) {
    return { valid: false, remainingCodes: backupCodes };
  }

  // 移除已使用的恢复码
  const remainingCodes = backupCodes.filter((_, i) => i !== index);
  return { valid: true, remainingCodes };
}

/**
 * 生成QR码数据URL
 */
export async function generateQRCodeDataURL(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: 256,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });
  } catch (error) {
    console.error("QR Code generation error:", error);
    throw new Error("Failed to generate QR code");
  }
}

/**
 * 创建默认MFA配置
 */
export function createDefaultMFASettings(): MFASettings {
  return {
    enabled: false,
    createdAt: new Date(),
  };
}

/**
 * 创建TOTP配置
 */
export function createTOTPConfig(
  secret: string,
  issuer: string,
  accountName: string,
): TOTPConfig {
  return {
    secret,
    period: 30,
    digits: 6,
    algorithm: "SHA1",
    issuer,
    accountName,
  };
}
