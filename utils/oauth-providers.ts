/**
 * OAuth 提供商抽象层
 * 统一处理不同 OAuth 提供商的认证流程
 */

import type {
  AppUser,
  GiteeUser,
  GitHubUser,
  GoogleUser,
  MicrosoftUser,
  OAuthConfig,
  OAuthProvider,
  OAuthUser,
} from "./auth.ts";
import { OAUTH_PROVIDERS } from "./auth.ts";

/**
 * OAuth 提供商抽象类
 */
export abstract class BaseOAuthProvider {
  protected config: OAuthConfig;

  constructor(provider: OAuthProvider) {
    this.config = OAUTH_PROVIDERS[provider];
  }

  /**
   * 生成授权 URL
   */
  generateAuthUrl(state: string, redirectUri?: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: redirectUri || this.config.redirectUri,
      scope: this.config.scope,
      state,
      response_type: "code",
    });

    return `${this.config.authorizeUrl}?${params.toString()}`;
  }

  /**
   * 使用授权码获取访问令牌
   */
  async exchangeCodeForToken(code: string): Promise<string> {
    const response = await fetch(this.config.tokenUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: this.config.redirectUri,
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
        `OAuth error: ${data.error_description || data.error}`,
      );
    }

    return data.access_token;
  }

  /**
   * 获取用户信息（抽象方法）
   */
  abstract fetchUser(accessToken: string): Promise<OAuthUser>;

  /**
   * 转换用户信息为应用用户格式（抽象方法）
   */
  abstract transformUser(user: OAuthUser): AppUser;

  /**
   * 验证配置是否完整
   */
  validateConfig(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.config.clientId) {
      errors.push(`${this.config.name.toUpperCase()}_CLIENT_ID is required`);
    }

    if (!this.config.clientSecret) {
      errors.push(
        `${this.config.name.toUpperCase()}_CLIENT_SECRET is required`,
      );
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

/**
 * GitHub OAuth 提供商
 */
export class GitHubOAuthProvider extends BaseOAuthProvider {
  constructor() {
    super("github");
  }

  async fetchUser(accessToken: string): Promise<GitHubUser> {
    const response = await fetch(this.config.userApiUrl, {
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

  transformUser(user: GitHubUser): AppUser {
    return {
      id: user.id.toString(),
      username: user.login,
      name: user.name,
      email: user.email,
      avatar: user.avatar_url,
      profileUrl: user.html_url,
      bio: user.bio,
      location: user.location,
      company: user.company,
      website: user.blog,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      joinedAt: user.created_at,
      lastLoginAt: new Date().toISOString(),
      provider: "github",
    };
  }
}

/**
 * Google OAuth 提供商
 */
export class GoogleOAuthProvider extends BaseOAuthProvider {
  constructor() {
    super("google");
  }

  async fetchUser(accessToken: string): Promise<GoogleUser> {
    const response = await fetch(this.config.userApiUrl, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.statusText}`);
    }

    return await response.json();
  }

  transformUser(user: GoogleUser): AppUser {
    return {
      id: user.id,
      username: user.email.split("@")[0], // 使用邮箱前缀作为用户名
      name: user.name,
      email: user.email,
      avatar: user.picture,
      profileUrl: `https://plus.google.com/${user.id}`,
      bio: null,
      location: null,
      company: null,
      website: null,
      joinedAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      provider: "google",
    };
  }
}

/**
 * Microsoft OAuth 提供商
 */
export class MicrosoftOAuthProvider extends BaseOAuthProvider {
  constructor() {
    super("microsoft");
  }

  async fetchUser(accessToken: string): Promise<MicrosoftUser> {
    const response = await fetch(this.config.userApiUrl, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.statusText}`);
    }

    return await response.json();
  }

  transformUser(user: MicrosoftUser): AppUser {
    return {
      id: user.id,
      username: user.userPrincipalName?.split("@")[0] || user.displayName,
      name: user.displayName,
      email: user.mail || user.userPrincipalName,
      avatar: `https://graph.microsoft.com/v1.0/users/${user.id}/photo/$value`,
      profileUrl: `https://outlook.live.com/people/profile/${user.id}`,
      bio: null,
      location: null,
      company: null,
      website: null,
      joinedAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      provider: "microsoft",
    };
  }
}

/**
 * Gitee OAuth 提供商
 */
export class GiteeOAuthProvider extends BaseOAuthProvider {
  constructor() {
    super("gitee");
  }

  async fetchUser(accessToken: string): Promise<GiteeUser> {
    const response = await fetch(
      `${this.config.userApiUrl}?access_token=${accessToken}`,
      {
        headers: {
          "User-Agent": "Athena",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.statusText}`);
    }

    return await response.json();
  }

  transformUser(user: GiteeUser): AppUser {
    return {
      id: user.id.toString(),
      username: user.login,
      name: user.name,
      email: user.email,
      avatar: user.avatar_url,
      profileUrl: user.html_url,
      bio: user.bio,
      location: user.location,
      company: null,
      website: user.blog,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      joinedAt: user.created_at,
      lastLoginAt: new Date().toISOString(),
      provider: "gitee",
    };
  }
}

/**
 * OAuth 提供商工厂
 */
export class OAuthProviderFactory {
  private static providers: Record<OAuthProvider, BaseOAuthProvider> = {
    github: new GitHubOAuthProvider(),
    google: new GoogleOAuthProvider(),
    microsoft: new MicrosoftOAuthProvider(),
    gitee: new GiteeOAuthProvider(),
  };

  /**
   * 获取 OAuth 提供商实例
   */
  static getProvider(provider: OAuthProvider): BaseOAuthProvider {
    const providerInstance = this.providers[provider];
    if (!providerInstance) {
      throw new Error(`Unsupported OAuth provider: ${provider}`);
    }
    return providerInstance;
  }

  /**
   * 获取所有可用的提供商
   */
  static getAvailableProviders(): OAuthProvider[] {
    return Object.keys(this.providers) as OAuthProvider[];
  }

  /**
   * 获取已配置的提供商
   */
  static getConfiguredProviders(): OAuthProvider[] {
    return this.getAvailableProviders().filter((provider) => {
      const providerInstance = this.getProvider(provider);
      return providerInstance.validateConfig().valid;
    });
  }
}
