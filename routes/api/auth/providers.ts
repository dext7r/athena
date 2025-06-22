/**
 * OAuth 提供商列表 API
 * GET /api/auth/providers
 * 返回可用的 OAuth 提供商列表
 */

import { OAUTH_PROVIDERS } from "@utils/auth.ts";
import { OAuthProviderFactory } from "@utils/oauth-providers.ts";

export const handler = {
  GET(): Response {
    try {
      // 获取所有可用的提供商
      const availableProviders = OAuthProviderFactory.getAvailableProviders();
      
      // 获取已配置的提供商
      const configuredProviders = OAuthProviderFactory.getConfiguredProviders();
      
      // 构建提供商信息列表
      const providers = availableProviders.map((provider) => {
        const config = OAUTH_PROVIDERS[provider];
        const isConfigured = configuredProviders.includes(provider);
        
        return {
          name: provider,
          displayName: config.displayName,
          icon: config.icon,
          color: config.color,
          available: isConfigured,
          configured: isConfigured,
        };
      });

      // 只返回已配置的提供商
      const enabledProviders = providers.filter(p => p.available);

      return new Response(
        JSON.stringify({
          success: true,
          providers: enabledProviders,
          total: enabledProviders.length,
          available: availableProviders.length,
          configured: configuredProviders.length,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=300", // 缓存5分钟
          },
        },
      );
    } catch (error) {
      console.error("Failed to get OAuth providers:", error);
      
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to get OAuth providers",
          message: error instanceof Error ? error.message : "Unknown error",
          providers: [],
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
