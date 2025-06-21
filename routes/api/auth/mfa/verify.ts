/**
 * MFA验证API端点
 * 处理多因素认证的验证
 */

import { HandlerContext } from "$fresh/server.ts";
import { getAuthContext, validateUserId } from "@utils/middleware.ts";
import { type MFASettings, verifyBackupCode, verifyTOTP } from "@utils/mfa.ts";
import { getMFASettings, setMFASettings } from "@utils/mfa-store.ts";

export const handler = {
  // 验证MFA代码并启用MFA
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
      const userIdError = validateUserId(userId);
      if (userIdError) return userIdError;

      const body = await req.json();
      const { code, type = "totp" } = body;

      if (!code) {
        return new Response(
          JSON.stringify({ error: "Verification code is required" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      const userMFA = getMFASettings(userId!);
      if (!userMFA || !userMFA.secret) {
        return new Response(
          JSON.stringify({ error: "MFA not initialized" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      let isValid = false;
      let updatedMFA = { ...userMFA };

      if (type === "totp") {
        // 验证TOTP代码
        isValid = verifyTOTP(userMFA.secret, code);
      } else if (type === "backup") {
        // 验证备用恢复码
        if (!userMFA.backupCodes) {
          return new Response(
            JSON.stringify({ error: "No backup codes available" }),
            { status: 400, headers: { "Content-Type": "application/json" } },
          );
        }

        const result = verifyBackupCode(userMFA.backupCodes, code);
        isValid = result.valid;

        if (isValid) {
          updatedMFA.backupCodes = result.remainingCodes;
        }
      }

      if (!isValid) {
        return new Response(
          JSON.stringify({ error: "Invalid verification code" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      // 启用MFA并更新最后使用时间
      updatedMFA.enabled = true;
      updatedMFA.lastUsedAt = new Date();
      setMFASettings(userId!, updatedMFA);

      return new Response(
        JSON.stringify({
          success: true,
          message: "MFA enabled successfully",
          backupCodesRemaining: updatedMFA.backupCodes?.length || 0,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("MFA verify error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },

  // 验证已启用的MFA（用于登录时验证）
  async PUT(req: Request, ctx: HandlerContext): Promise<Response> {
    try {
      const authContext = await getAuthContext(req);

      if (!authContext.isAuthenticated || !authContext.user) {
        return new Response(
          JSON.stringify({ error: "Authentication required" }),
          { status: 401, headers: { "Content-Type": "application/json" } },
        );
      }

      const userId = authContext.user.id;
      const userIdError = validateUserId(userId);
      if (userIdError) return userIdError;

      const body = await req.json();
      const { code, type = "totp" } = body;

      if (!code) {
        return new Response(
          JSON.stringify({ error: "Verification code is required" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      const userMFA = getMFASettings(userId!);
      if (!userMFA || !userMFA.enabled || !userMFA.secret) {
        return new Response(
          JSON.stringify({ error: "MFA not enabled" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      let isValid = false;
      let updatedMFA = { ...userMFA };

      if (type === "totp") {
        // 验证TOTP代码
        isValid = verifyTOTP(userMFA.secret, code);
      } else if (type === "backup") {
        // 验证备用恢复码
        if (!userMFA.backupCodes || userMFA.backupCodes.length === 0) {
          return new Response(
            JSON.stringify({ error: "No backup codes available" }),
            { status: 400, headers: { "Content-Type": "application/json" } },
          );
        }

        const result = verifyBackupCode(userMFA.backupCodes, code);
        isValid = result.valid;

        if (isValid) {
          updatedMFA.backupCodes = result.remainingCodes;
        }
      }

      if (!isValid) {
        return new Response(
          JSON.stringify({ error: "Invalid verification code" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      // 更新最后使用时间
      updatedMFA.lastUsedAt = new Date();
      setMFASettings(userId!, updatedMFA);

      return new Response(
        JSON.stringify({
          success: true,
          message: "MFA verification successful",
          backupCodesRemaining: updatedMFA.backupCodes?.length || 0,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("MFA verify error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};
