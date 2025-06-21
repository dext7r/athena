/**
 * 账户锁定API端点
 * 处理账户锁定和解锁操作
 */

import { HandlerContext } from "$fresh/server.ts";
import { getAuthContext, validateUserId } from "../../../utils/middleware.ts";
import { getClientIP } from "../../../utils/session.ts";
import {
  emergencyLockAccount,
  getAccountLockStatus,
  getAllLockedAccounts,
  getLockReasonDescription,
  isAccountLocked,
  unlockAccount,
} from "../../../utils/account-lock.ts";

export const handler = {
  // 获取账户锁定状态
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
      const userIdError = validateUserId(userId);
      if (userIdError) return userIdError;

      const lockStatus = getAccountLockStatus(userId!);

      return new Response(
        JSON.stringify({
          ...lockStatus,
          reasonDescription: lockStatus.reason
            ? getLockReasonDescription(lockStatus.reason)
            : undefined,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Account lock GET error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },

  // 紧急锁定账户
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

      const user = authContext.user;
      const ipAddress = getClientIP(req);

      // 检查账户是否已经被锁定
      if (isAccountLocked(userId!)) {
        return new Response(
          JSON.stringify({ error: "Account is already locked" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      const body = await req.json();
      const { reason } = body;

      // 紧急锁定账户
      const lockStatus = emergencyLockAccount(
        userId!,
        user.username || user.name || `user-${userId}`,
        ipAddress,
        reason || "用户主动请求紧急锁定账户",
      );

      return new Response(
        JSON.stringify({
          success: true,
          message: "账户已紧急锁定",
          lockStatus: {
            ...lockStatus,
            reasonDescription: lockStatus.reason
              ? getLockReasonDescription(lockStatus.reason)
              : undefined,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Account lock POST error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },

  // 解锁账户
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
      const userIdError = validateUserId(userId);
      if (userIdError) return userIdError;

      const user = authContext.user;
      const ipAddress = getClientIP(req);

      // 检查账户是否被锁定
      if (!isAccountLocked(userId!)) {
        return new Response(
          JSON.stringify({ error: "Account is not locked" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      const body = await req.json();
      const { reason } = body;

      // 解锁账户
      const success = unlockAccount(
        userId!,
        reason || "用户请求解锁账户",
        {
          unlockedBy: userId,
          ipAddress,
          username: user.username || user.name || `user-${userId}`,
        },
      );

      if (!success) {
        return new Response(
          JSON.stringify({ error: "Failed to unlock account" }),
          { status: 500, headers: { "Content-Type": "application/json" } },
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "账户已成功解锁",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Account lock DELETE error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};
