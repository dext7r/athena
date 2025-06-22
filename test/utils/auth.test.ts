import { OAUTH_PROVIDERS, type OAuthProvider } from "@utils/auth.ts";
import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts";

Deno.test("Auth Utils - OAUTH_PROVIDERS 配置测试", () => {
  // 测试所有支持的 OAuth 提供商
  const expectedProviders: OAuthProvider[] = [
    "github",
    "google",
    "microsoft",
    "gitee",
  ];

  expectedProviders.forEach((provider) => {
    assertExists(OAUTH_PROVIDERS[provider], `${provider} 提供商配置应该存在`);

    const config = OAUTH_PROVIDERS[provider];
    assertExists(config.displayName, `${provider} 应该有显示名称`);
    assertExists(config.icon, `${provider} 应该有图标`);
    assertExists(config.color, `${provider} 应该有颜色`);
    assertExists(config.authorizeUrl, `${provider} 应该有认证 URL`);
    assertExists(config.tokenUrl, `${provider} 应该有令牌 URL`);
    assertExists(config.userApiUrl, `${provider} 应该有用户信息 URL`);
    assertExists(config.scope, `${provider} 应该有权限范围`);
  });
});

Deno.test("Auth Utils - GitHub 配置验证", () => {
  const github = OAUTH_PROVIDERS.github;

  assertEquals(github.displayName, "GitHub");
  assertEquals(github.icon, "github");
  assertEquals(github.color, "#24292f");
  assertEquals(github.authorizeUrl, "https://github.com/login/oauth/authorize");
  assertEquals(github.tokenUrl, "https://github.com/login/oauth/access_token");
  assertEquals(github.userApiUrl, "https://api.github.com/user");
  assertEquals(github.scope, "user:email");
});

Deno.test("Auth Utils - Google 配置验证", () => {
  const google = OAUTH_PROVIDERS.google;

  assertEquals(google.displayName, "Google");
  assertEquals(google.icon, "google");
  assertEquals(google.color, "#4285f4");
  assertEquals(
    google.authorizeUrl,
    "https://accounts.google.com/o/oauth2/v2/auth",
  );
  assertEquals(google.tokenUrl, "https://oauth2.googleapis.com/token");
  assertEquals(
    google.userApiUrl,
    "https://www.googleapis.com/oauth2/v2/userinfo",
  );
  assertEquals(google.scope, "openid email profile");
});

Deno.test("Auth Utils - Microsoft 配置验证", () => {
  const microsoft = OAUTH_PROVIDERS.microsoft;

  assertEquals(microsoft.displayName, "Microsoft");
  assertEquals(microsoft.icon, "microsoft");
  assertEquals(microsoft.color, "#0078d4");
  assertEquals(
    microsoft.authorizeUrl,
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
  );
  assertEquals(
    microsoft.tokenUrl,
    "https://login.microsoftonline.com/common/oauth2/v2.0/token",
  );
  assertEquals(microsoft.userApiUrl, "https://graph.microsoft.com/v1.0/me");
  assertEquals(microsoft.scope, "openid email profile");
});

Deno.test("Auth Utils - Gitee 配置验证", () => {
  const gitee = OAUTH_PROVIDERS.gitee;

  assertEquals(gitee.displayName, "Gitee");
  assertEquals(gitee.icon, "gitee");
  assertEquals(gitee.color, "#c71d23");
  assertEquals(gitee.authorizeUrl, "https://gitee.com/oauth/authorize");
  assertEquals(gitee.tokenUrl, "https://gitee.com/oauth/token");
  assertEquals(gitee.userApiUrl, "https://gitee.com/api/v5/user");
  assertEquals(gitee.scope, "user_info");
});

Deno.test("Auth Utils - 配置完整性检查", () => {
  const providers = Object.keys(OAUTH_PROVIDERS) as OAuthProvider[];

  // 确保至少有基本的提供商
  assertEquals(providers.length >= 4, true, "应该至少有 4 个 OAuth 提供商");

  // 确保所有提供商都有必需的字段
  providers.forEach((provider) => {
    const config = OAUTH_PROVIDERS[provider];

    // 检查字符串字段不为空
    assertEquals(typeof config.displayName, "string");
    assertEquals(config.displayName.length > 0, true);

    assertEquals(typeof config.icon, "string");
    assertEquals(config.icon.length > 0, true);

    assertEquals(typeof config.color, "string");
    assertEquals(config.color.length > 0, true);

    assertEquals(typeof config.authorizeUrl, "string");
    assertEquals(config.authorizeUrl.startsWith("https://"), true);

    assertEquals(typeof config.tokenUrl, "string");
    assertEquals(config.tokenUrl.startsWith("https://"), true);

    assertEquals(typeof config.userApiUrl, "string");
    assertEquals(config.userApiUrl.startsWith("https://"), true);

    assertEquals(typeof config.scope, "string");
    assertEquals(config.scope.length > 0, true);
  });
});
