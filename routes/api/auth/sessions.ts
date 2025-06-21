/**
 * 会话管理API端点
 * 处理用户会话的查看、管理和删除
 */

import { HandlerContext } from "$fresh/server.ts";
import { getAuthContext, validateUserId } from "@utils/middleware.ts";
import {
  cleanupExpiredSessions,
  deleteAllUserSessions,
  deleteOtherUserSessions,
  deleteSession,
  getSession,
  getUserSessions,
  getUserSessionStats,
} from "@utils/session.ts";
import { extractTokenFromRequest } from "@utils/jwt.ts";

export const handler = {
  // 获取用户会话列表
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

      // 获取当前会话ID（从JWT令牌中提取）
      const token = extractTokenFromRequest(req);
      let currentSessionId: string | undefined;

      // 这里简化处理，实际项目中应该在JWT中包含会话ID
      // 或者通过其他方式关联JWT和会话

      // 清理过期会话
      cleanupExpiredSessions();

      // 获取用户会话
      const sessions = getUserSessions(userId!, currentSessionId);
      const stats = getUserSessionStats(userId!);

      return new Response(
        JSON.stringify({
          sessions,
          stats,
          currentSessionId,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Sessions GET error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },

  // 删除会话
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

      const url = new URL(req.url);
      const sessionId = url.searchParams.get("sessionId");
      const action = url.searchParams.get("action"); // "single", "others", "all"

      let deletedCount = 0;
      let message = "";

      if (action === "all") {
        // 删除所有会话
        deletedCount = deleteAllUserSessions(userId!);
        message = `已删除所有 ${deletedCount} 个会话`;
      } else if (action === "others") {
        // 删除其他会话（保留当前会话）
        const currentSessionId = url.searchParams.get("currentSessionId") || "";
        deletedCount = deleteOtherUserSessions(userId!, currentSessionId);
        message = `已删除其他 ${deletedCount} 个会话`;
      } else if (sessionId) {
        // 删除指定会话
        const session = getSession(sessionId);
        if (!session || session.userId !== userId) {
          return new Response(
            JSON.stringify({ error: "Session not found or access denied" }),
            { status: 404, headers: { "Content-Type": "application/json" } },
          );
        }

        if (deleteSession(sessionId)) {
          deletedCount = 1;
          message = "会话已删除";
        } else {
          return new Response(
            JSON.stringify({ error: "Failed to delete session" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      } else {
        return new Response(
          JSON.stringify({ error: "Invalid request parameters" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          message,
          deletedCount,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Sessions DELETE error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },

  // 更新会话信息（如添加位置信息）
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
      const body = await req.json();
      const { sessionId, location } = body;

      if (!sessionId) {
        return new Response(
          JSON.stringify({ error: "Session ID is required" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      const session = getSession(sessionId);
      if (!session || session.userId !== userId) {
        return new Response(
          JSON.stringify({ error: "Session not found or access denied" }),
          { status: 404, headers: { "Content-Type": "application/json" } },
        );
      }

      // 更新会话信息
      if (location) {
        session.location = location;
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "Session updated successfully",
          session,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Sessions PUT error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};
