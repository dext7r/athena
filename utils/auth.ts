/**
 * 多提供商 OAuth 认证工具
 */

import { getEnv } from "@utils/env.ts";

// OAuth 提供商类型
export type OAuthProvider = "github" | "google" | "microsoft" | "gitee";

// OAuth 提供商配置接口
export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string;
  authorizeUrl: string;
  tokenUrl: string;
  userApiUrl: string;
  name: string;
  displayName: string;
  icon: string;
  color: string;
}

// 基础重定向 URI
const getBaseRedirectUri = () =>
  `${getEnv("APP_BASE_URL", "http://localhost:8000")}/api/auth/callback`;

// OAuth 提供商配置
export const OAUTH_PROVIDERS: Record<OAuthProvider, OAuthConfig> = {
  github: {
    clientId: getEnv("GITHUB_CLIENT_ID", ""),
    clientSecret: getEnv("GITHUB_CLIENT_SECRET", ""),
    redirectUri: getBaseRedirectUri(),
    scope: "user:email",
    authorizeUrl: "https://github.com/login/oauth/authorize",
    tokenUrl: "https://github.com/login/oauth/access_token",
    userApiUrl: "https://api.github.com/user",
    name: "github",
    displayName: "GitHub",
    icon: "github",
    color: "#24292f",
  },
  google: {
    clientId: getEnv("GOOGLE_CLIENT_ID"),
    clientSecret: getEnv("GOOGLE_CLIENT_SECRET"),
    redirectUri: getBaseRedirectUri(),
    scope: "openid email profile",
    authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    userApiUrl: "https://www.googleapis.com/oauth2/v2/userinfo",
    name: "google",
    displayName: "Google",
    icon: "google",
    color: "#4285f4",
  },
  microsoft: {
    clientId: getEnv("MICROSOFT_CLIENT_ID"),
    clientSecret: getEnv("MICROSOFT_CLIENT_SECRET"),
    redirectUri: getBaseRedirectUri(),
    scope: "openid email profile",
    authorizeUrl:
      "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    userApiUrl: "https://graph.microsoft.com/v1.0/me",
    name: "microsoft",
    displayName: "Microsoft",
    icon: "microsoft",
    color: "#0078d4",
  },
  gitee: {
    clientId: getEnv("GITEE_CLIENT_ID"),
    clientSecret: getEnv("GITEE_CLIENT_SECRET"),
    redirectUri: getBaseRedirectUri(),
    scope: "user_info",
    authorizeUrl: "https://gitee.com/oauth/authorize",
    tokenUrl: "https://gitee.com/oauth/token",
    userApiUrl: "https://gitee.com/api/v5/user",
    name: "gitee",
    displayName: "Gitee",
    icon: "gitee",
    color: "#c71d23",
  },
};

// 向后兼容的 GitHub 配置
export const GITHUB_OAUTH_CONFIG = OAUTH_PROVIDERS.github;

// JWT 配置
export const JWT_CONFIG = {
  secret: getEnv("JWT_SECRET", "default_secret_key"),
  expiresIn: parseInt(getEnv("SESSION_EXPIRE_TIME", "86400")), // 24小时
};

/**
 * 获取已配置的 OAuth 提供商
 */
export function getAvailableOAuthProviders(): OAuthConfig[] {
  return Object.values(OAUTH_PROVIDERS).filter((provider) =>
    provider.clientId && provider.clientSecret &&
    provider.clientId !== `your_${provider.name}_client_id`
  );
}

/**
 * 检查特定 OAuth 提供商是否已配置
 */
export function isProviderConfigured(provider: OAuthProvider): boolean {
  const config = OAUTH_PROVIDERS[provider];
  return !!(config.clientId && config.clientSecret &&
    config.clientId !== `your_${provider}_client_id`);
}

// OAuth 用户信息通用接口
export interface OAuthUser {
  id: string | number;
  username?: string;
  name?: string | null;
  email?: string | null;
  avatar?: string;
  profileUrl?: string;
  [key: string]: unknown; // 允许提供商特定的字段
}

// GitHub 用户信息接口
export interface GitHubUser extends OAuthUser {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

// Google 用户信息接口
export interface GoogleUser extends OAuthUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

// Microsoft 用户信息接口
export interface MicrosoftUser extends OAuthUser {
  id: string;
  displayName: string;
  givenName: string;
  surname: string;
  userPrincipalName: string;
  mail: string;
}

// Gitee 用户信息接口
export interface GiteeUser extends OAuthUser {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  url: string;
  html_url: string;
  email: string;
  bio: string;
  blog: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

// 应用用户信息接口
export interface AppUser {
  id: string;
  username: string;
  name: string | null;
  email: string | null;
  avatar: string;
  profileUrl: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  website: string | null;
  publicRepos?: number;
  followers?: number;
  following?: number;
  joinedAt: string;
  lastLoginAt: string;
  provider: OAuthProvider; // 添加提供商信息
}

/**
 * 生成 GitHub OAuth 授权 URL
 */
export function generateGitHubAuthUrl(state?: string): string {
  const params = new URLSearchParams({
    client_id: GITHUB_OAUTH_CONFIG.clientId,
    redirect_uri: GITHUB_OAUTH_CONFIG.redirectUri,
    scope: GITHUB_OAUTH_CONFIG.scope,
    state: state || crypto.randomUUID(),
  });

  return `${GITHUB_OAUTH_CONFIG.authorizeUrl}?${params.toString()}`;
}

/**
 * 使用授权码获取访问令牌
 */
export async function exchangeCodeForToken(code: string): Promise<string> {
  const response = await fetch(GITHUB_OAUTH_CONFIG.tokenUrl, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: GITHUB_OAUTH_CONFIG.clientId,
      client_secret: GITHUB_OAUTH_CONFIG.clientSecret,
      code,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to exchange code for token: ${response.statusText}`,
    );
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(
      `GitHub OAuth error: ${data.error_description || data.error}`,
    );
  }

  return data.access_token;
}

/**
 * 使用访问令牌获取用户信息
 */
export async function fetchGitHubUser(
  accessToken: string,
): Promise<GitHubUser> {
  const response = await fetch(GITHUB_OAUTH_CONFIG.userApiUrl, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Accept": "application/vnd.github.v3+json",
      "User-Agent": "Athena",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user info: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * 转换 GitHub 用户信息为应用用户信息
 */
export function transformGitHubUser(githubUser: GitHubUser): AppUser {
  return {
    id: githubUser.id.toString(),
    username: githubUser.login,
    name: githubUser.name,
    email: githubUser.email,
    avatar: githubUser.avatar_url,
    profileUrl: githubUser.html_url,
    bio: githubUser.bio,
    location: githubUser.location,
    company: githubUser.company,
    website: githubUser.blog,
    publicRepos: githubUser.public_repos,
    followers: githubUser.followers,
    following: githubUser.following,
    joinedAt: githubUser.created_at,
    lastLoginAt: new Date().toISOString(),
    provider: "github",
  };
}

/**
 * 验证 OAuth 配置是否完整
 */
export function validateOAuthConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!GITHUB_OAUTH_CONFIG.clientId) {
    errors.push("GITHUB_CLIENT_ID is required");
  }

  if (!GITHUB_OAUTH_CONFIG.clientSecret) {
    errors.push("GITHUB_CLIENT_SECRET is required");
  }

  if (!JWT_CONFIG.secret || JWT_CONFIG.secret === "default_secret_key") {
    errors.push("JWT_SECRET should be set to a secure random string");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
