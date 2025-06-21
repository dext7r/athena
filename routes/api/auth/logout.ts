/**
 * 用户退出登录路由
 * POST /api/auth/logout
 */

import { HandlerContext } from "$fresh/server.ts";
import { clearAuthCookie } from "@utils/jwt.ts";

export const handler = {
  POST(req: Request, _ctx: HandlerContext): Response {
    try {
      // 获取重定向 URL
      const url = new URL(req.url);
      const redirectTo = url.searchParams.get("redirect") || "/";

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
  GET(req: Request, _ctx: HandlerContext): Response {
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
