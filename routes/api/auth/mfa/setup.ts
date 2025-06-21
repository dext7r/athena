/**
 * MFA设置API端点
 * 处理多因素认证的设置和配置
 */

import { HandlerContext } from "$fresh/server.ts";
import { getAuthContext } from "@utils/middleware.ts";
import {
  createTOTPConfig,
  generateBackupCodes,
  generateQRCodeDataURL,
  generateSecret,
  generateTOTPUri,
  type MFASettings,
} from "@utils/mfa.ts";
import {
  deleteMFASettings,
  getMFASettings,
  setMFASettings,
} from "@utils/mfa-store.ts";

export const handler = {
  // 获取MFA设置状态
  async GET(req: Request, ctx: HandlerContext): Promise<Response> {
    try {
      const authContext = await getAuthContext(req);

      if (!authContext.isAuthenticated || !authContext.user) {
        return new Response(
          JSON.stringify({ error: "Authentication required" }),
          { status: 401, headers: { "Content-Type": "application/json" } },
        );
      }

      const userId = authContext.user.id;
      if (!userId) {
        return new Response(
          JSON.stringify({ error: "User ID not found" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      const userMFA = getMFASettings(userId) || {
        enabled: false,
        createdAt: new Date(),
      };

      return new Response(
        JSON.stringify({
          enabled: userMFA.enabled,
          hasBackupCodes: userMFA.backupCodes && userMFA.backupCodes.length > 0,
          backupCodesCount: userMFA.backupCodes?.length || 0,
          lastUsedAt: userMFA.lastUsedAt,
          createdAt: userMFA.createdAt,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("MFA setup GET error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },

  // 初始化MFA设置
  async POST(req: Request, ctx: HandlerContext): Promise<Response> {
    try {
      const authContext = await getAuthContext(req);

      if (!authContext.isAuthenticated || !authContext.user) {
        return new Response(
          JSON.stringify({ error: "Authentication required" }),
          { status: 401, headers: { "Content-Type": "application/json" } },
        );
      }

      const userId = authContext.user.id;
      if (!userId) {
        return new Response(
          JSON.stringify({ error: "User ID not found" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      const user = authContext.user;

      // 检查是否已经启用MFA
      const existingMFA = getMFASettings(userId);
      if (existingMFA?.enabled) {
        return new Response(
          JSON.stringify({ error: "MFA already enabled" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      // 生成新的密钥和备用码
      const secret = generateSecret();
      const backupCodes = generateBackupCodes();

      // 创建TOTP配置
      const totpConfig = createTOTPConfig(
        secret,
        "Athena ", // 应用名称
        user.username || user.name || `user-${userId}`,
      );

      // 生成TOTP URI和QR码
      const totpUri = generateTOTPUri(totpConfig);
      const qrCodeDataURL = await generateQRCodeDataURL(totpUri);

      // 临时存储设置（未启用状态）
      setMFASettings(userId, {
        enabled: false,
        secret,
        backupCodes,
        createdAt: new Date(),
      });

      return new Response(
        JSON.stringify({
          secret,
          qrCodeDataURL,
          totpUri,
          backupCodes,
          issuer: totpConfig.issuer,
          accountName: totpConfig.accountName,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("MFA setup POST error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },

  // 禁用MFA
  async DELETE(req: Request, ctx: HandlerContext): Promise<Response> {
    try {
      const authContext = await getAuthContext(req);

      if (!authContext.isAuthenticated || !authContext.user) {
        return new Response(
          JSON.stringify({ error: "Authentication required" }),
          { status: 401, headers: { "Content-Type": "application/json" } },
        );
      }

      const userId = authContext.user.id;
      if (!userId) {
        return new Response(
          JSON.stringify({ error: "User ID not found" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      // 删除MFA设置
      deleteMFASettings(userId);

      return new Response(
        JSON.stringify({ success: true, message: "MFA disabled successfully" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("MFA setup DELETE error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};
