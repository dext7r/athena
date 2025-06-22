/**
 * 通用 OAuth 提供商登录路由
 * GET /api/auth/[provider]
 * 支持 github, google, microsoft, gitee
 */

import { FreshContext } from "fresh";
import type { OAuthProvider } from "@utils/auth.ts";
import { OAuthProviderFactory } from "@utils/oauth-providers.ts";

export const handler = {
  GET(ctx: FreshContext): Response {
    const req = ctx.req;

    try {
      // 获取提供商名称
      const provider = ctx.params.provider as OAuthProvider;

      // 验证提供商是否支持
      const availableProviders = OAuthProviderFactory.getAvailableProviders();
      if (!availableProviders.includes(provider)) {
        return new Response(
          JSON.stringify({
            error: "Unsupported OAuth provider",
            provider,
            available: availableProviders,
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // 获取提供商实例
      const oauthProvider = OAuthProviderFactory.getProvider(provider);

      // 验证提供商配置
      const configValidation = oauthProvider.validateConfig();
      if (!configValidation.valid) {
        console.error(
          `❌ ${provider} OAuth configuration errors:`,
          configValidation.errors,
        );
        return new Response(
          JSON.stringify({
            error: "OAuth configuration error",
            provider,
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

      // 生成授权 URL
      const authUrl = oauthProvider.generateAuthUrl(state);

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
        `oauth_provider=${provider}; Max-Age=600; Path=/; HttpOnly; SameSite=lax`,
      );
      response.headers.append(
        "Set-Cookie",
        `oauth_redirect=${
          encodeURIComponent(redirectTo)
        }; Max-Age=600; Path=/; HttpOnly; SameSite=lax`,
      );

      return response;
    } catch (error) {
      console.error(`${ctx.params.provider} OAuth initiation error:`, error);
      return new Response(
        JSON.stringify({
          error: `Failed to initiate ${ctx.params.provider} OAuth`,
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
