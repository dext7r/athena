/**
 * 用户退出登录路由
 * POST /api/auth/logout
 */

import { clearAuthCookie } from "@utils/jwt.ts";
import { getAuthContext } from "@utils/middleware.ts";
import { deleteSession } from "@utils/session.ts";
import { FreshContext } from "fresh";

export const handler = {
  async POST(ctx: FreshContext): Promise<Response> {
    const req = ctx.req;

    try {
      // 获取认证上下文
      const authContext = await getAuthContext(req);

      // 获取重定向 URL
      const url = new URL(req.url);
      const redirectTo = url.searchParams.get("redirect") || "/";

      // 如果用户已登录，删除会话
      if (authContext.isAuthenticated && authContext.sessionId) {
        try {
          const deleted = deleteSession(authContext.sessionId);
          console.log(
            `Session ${authContext.sessionId} deletion:`,
            deleted ? "success" : "failed",
          );
        } catch (error) {
          console.error("Failed to delete session:", error);
        }
      }

      // 创建响应，清除认证 Cookie
      const response = new Response(
        JSON.stringify({
          success: true,
          message: "Successfully logged out",
          redirectTo,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": clearAuthCookie(),
          },
        },
      );

      return response;
    } catch (error) {
      console.error("Logout error:", error);
      return new Response(
        JSON.stringify({
          error: "Logout failed",
          message: error instanceof Error ? error.message : "Unknown error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },

  // 支持 GET 请求进行重定向退出
  GET(ctx: FreshContext): Response {
    const req = ctx.req;

    try {
      const url = new URL(req.url);
      const redirectTo = url.searchParams.get("redirect") || "/";

      // 创建重定向响应，清除认证 Cookie
      const response = new Response(null, {
        status: 302,
        headers: {
          "Location": redirectTo,
          "Set-Cookie": clearAuthCookie(),
        },
      });

      return response;
    } catch (error) {
      console.error("Logout redirect error:", error);
      return new Response(null, {
        status: 302,
        headers: {
          "Location": "/?error=logout_failed",
          "Set-Cookie": clearAuthCookie(),
        },
      });
    }
  },
};
