/**
 * 环境变量加载和验证工具
 * 支持可选的环境变量，避免 dotenv 的严格检查
 */

import { load } from "$std/dotenv/mod.ts";

/**
 * 安全加载环境变量，允许空值
 */
export async function loadEnvSafely(): Promise<void> {
  try {
    // 使用 allowEmptyValues 选项允许空值
    await load({
      allowEmptyValues: true,
      defaultsPath: null, // 不使用默认文件
      examplePath: null, // 不强制检查示例文件
    });

    console.log("✅ 环境变量加载成功");
  } catch (error) {
    console.warn(
      "⚠️ 环境变量加载警告:",
      error instanceof Error ? error.message : String(error),
    );
    // 不抛出错误，允许应用继续运行
  }
}

/**
 * 获取环境变量，支持默认值
 */
export function getEnv(key: string, defaultValue: string = ""): string {
  const value = Deno.env.get(key);
  return value || defaultValue;
}

/**
 * 获取必需的环境变量，如果不存在则抛出错误
 */
export function getRequiredEnv(key: string): string {
  const value = Deno.env.get(key);
  if (!value) {
    throw new Error(`❌ 必需的环境变量 ${key} 未设置`);
  }
  return value;
}

/**
 * 获取布尔类型的环境变量
 */
export function getBoolEnv(
  key: string,
  defaultValue: boolean = false,
): boolean {
  const value = Deno.env.get(key);
  if (!value) return defaultValue;

  return value.toLowerCase() === "true" || value === "1";
}

/**
 * 获取数字类型的环境变量
 */
export function getNumberEnv(
  key: string,
  defaultValue?: number,
): number | undefined {
  const value = Deno.env.get(key);
  if (!value) return defaultValue;

  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    console.warn(`⚠️ 环境变量 ${key} 不是有效数字: ${value}`);
    return defaultValue;
  }

  return parsed;
}

/**
 * 检查 OAuth 提供商是否已配置
 */
export function isOAuthProviderConfigured(provider: string): boolean {
  const clientId = Deno.env.get(`${provider.toUpperCase()}_CLIENT_ID`);
  const clientSecret = Deno.env.get(`${provider.toUpperCase()}_CLIENT_SECRET`);

  return !!(clientId && clientSecret &&
    clientId !== `your_${provider}_client_id`);
}

/**
 * 获取已配置的 OAuth 提供商列表
 */
export function getConfiguredOAuthProviders(): string[] {
  const providers = ["github", "google", "microsoft", "gitee"];
  return providers.filter((provider) => isOAuthProviderConfigured(provider));
}

/**
 * 验证基础环境配置
 */
export function validateBaseEnvironment(): void {
  const errors: string[] = [];

  // 检查基础配置
  if (!getEnv("APP_BASE_URL")) {
    console.warn("⚠️ APP_BASE_URL 未设置，使用默认值: http://localhost:8000");
  }

  if (!getEnv("JWT_SECRET")) {
    console.warn("⚠️ JWT_SECRET 未设置，使用默认值（生产环境不安全）");
  }

  // 检查至少有一个 OAuth 提供商配置
  const configuredProviders = getConfiguredOAuthProviders();
  if (configuredProviders.length === 0) {
    console.warn("⚠️ 没有配置任何 OAuth 提供商，用户将无法登录");
    console.warn(
      "请配置至少一个 OAuth 提供商：GITHUB, GOOGLE, MICROSOFT, GITEE",
    );
  } else {
    console.log(`✅ 已配置的 OAuth 提供商: ${configuredProviders.join(", ")}`);
  }

  if (errors.length > 0) {
    console.error("❌ 环境配置错误:");
    errors.forEach((error) => console.error(`  - ${error}`));
    throw new Error("环境配置验证失败");
  }
}

/**
 * 获取环境信息摘要
 */
export function getEnvironmentSummary(): Record<string, unknown> {
  return {
    nodeEnv: getEnv("NODE_ENV", "development"),
    appBaseUrl: getEnv("APP_BASE_URL", "http://localhost:8000"),
    hasJwtSecret: !!getEnv("JWT_SECRET"),
    sessionExpireTime: getNumberEnv("SESSION_EXPIRE_TIME", 86400),
    configuredOAuthProviders: getConfiguredOAuthProviders(),
    isDevelopment: getEnv("NODE_ENV") !== "production",
    isProduction: getEnv("NODE_ENV") === "production",
  };
}

/**
 * 打印环境配置状态
 */
export function printEnvironmentStatus(): void {
  const summary = getEnvironmentSummary();

  console.log("🔍 环境配置状态:");
  console.log(`  - 环境: ${summary.nodeEnv}`);
  console.log(`  - 基础URL: ${summary.appBaseUrl}`);
  console.log(
    `  - JWT密钥: ${summary.hasJwtSecret ? "✅ 已配置" : "❌ 未配置"}`,
  );
  console.log(`  - 会话过期时间: ${summary.sessionExpireTime}秒`);
  console.log(
    `  - OAuth提供商: ${
      (summary.configuredOAuthProviders as string[]).join(", ") || "无"
    }`,
  );
}

/**
 * 开发环境初始化
 */
export async function initDevelopmentEnvironment(): Promise<void> {
  await loadEnvSafely();

  if (getEnv("NODE_ENV") !== "production") {
    printEnvironmentStatus();
  }

  validateBaseEnvironment();
}
