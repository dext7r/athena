/**
 * 获取当前用户信息路由
 * GET /api/auth/me
 */

import { HandlerContext } from "$fresh/server.ts";
import {
  extractTokenFromRequest,
  userFromJWTPayload,
  verifyJWT,
} from "../../../utils/jwt.ts";

export const handler = {
  async GET(req: Request, _ctx: HandlerContext): Promise<Response> {
    try {
      // 从请求中提取 JWT 令牌
      const token = extractTokenFromRequest(req);
      if (!token) {
        return new Response(
          JSON.stringify({
            error: "No authentication token provided",
            authenticated: false,
          }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // 验证 JWT 令牌
      const payload = await verifyJWT(token);

      if (!payload) {
        return new Response(
          JSON.stringify({
            error: "Invalid or expired token",
            authenticated: false,
          }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // 从 JWT 载荷重建用户信息
      const user = userFromJWTPayload(payload);

      const response = {
        authenticated: true,
        user,
        expiresAt: new Date(payload.exp * 1000).toISOString(),
      };

      return new Response(
        JSON.stringify(response),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Get user info error:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to get user information",
          authenticated: false,
          message: error instanceof Error ? error.message : "Unknown error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
