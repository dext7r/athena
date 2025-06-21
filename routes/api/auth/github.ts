/**
 * GitHub OAuth 登录路由
 * GET /api/auth/github
 */

import { HandlerContext } from "$fresh/server.ts";
import {
  generateGitHubAuthUrl,
  validateOAuthConfig,
} from "../../../utils/auth.ts";

export const handler = {
  GET(req: Request, _ctx: HandlerContext): Response {
    try {
      // 验证 OAuth 配置
      const configValidation = validateOAuthConfig();
      if (!configValidation.valid) {
        console.error(
          "❌ OAuth configuration errors:",
          configValidation.errors,
        );
        return new Response(
          JSON.stringify({
            error: "OAuth configuration error",
            details: configValidation.errors,
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      // 生成状态参数用于防止 CSRF 攻击
      const state = crypto.randomUUID();

      // 获取重定向 URL（如果有）
      const url = new URL(req.url);
      const redirectTo = url.searchParams.get("redirect") || "/";

      // 生成 GitHub 授权 URL
      const authUrl = generateGitHubAuthUrl(state);
      // 创建响应，设置状态和重定向信息到 Cookie
      const response = new Response(null, {
        status: 302,
        headers: new Headers({
          "Location": authUrl,
        }),
      });

      // 设置多个 Cookie，每个都需要单独的 Set-Cookie 头
      response.headers.append(
        "Set-Cookie",
        `oauth_state=${state}; Max-Age=600; Path=/; HttpOnly; SameSite=lax`,
      );
      response.headers.append(
        "Set-Cookie",
        `oauth_redirect=${
          encodeURIComponent(redirectTo)
        }; Max-Age=600; Path=/; HttpOnly; SameSite=lax`,
      );
      return response;
    } catch (error) {
      console.error("GitHub OAuth initiation error:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to initiate GitHub OAuth",
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
