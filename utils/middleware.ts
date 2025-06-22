/**
 * 路由保护中间件
 * 用于保护需要认证的路由
 */

import { FreshContext } from "fresh";
import type { AppUser } from "./auth.ts";
import {
  extractTokenFromRequest,
  userFromJWTPayload,
  verifyJWT,
} from "./jwt.ts";
import { updateSessionActivity } from "./session.ts";

// 认证上下文接口
export interface AuthContext {
  isAuthenticated: boolean;
  user: Partial<AppUser> | null;
  sessionId?: string;
  isAdmin?: boolean;
}

// 扩展 FreshContext 类型
interface MiddlewareHandlerContext extends FreshContext {
  state: {
    auth?: AuthContext;
  };
}

/**
 * 认证中间件
 * 检查用户是否已登录，如果未登录则重定向到登录页面
 */
export function requireAuth(redirectTo = "/") {
  return async function authMiddleware(
    ctx: MiddlewareHandlerContext,
  ): Promise<Response> {
    const authContext = await getAuthContext(ctx.req);

    if (!authContext.isAuthenticated) {
      // 未登录，重定向到登录页面
      const loginUrl = `/api/auth/github?redirect=${
        encodeURIComponent(ctx.req.url)
      }`;
      return new Response(null, {
        status: 302,
        headers: { "Location": loginUrl },
      });
    }

    // 已登录，将用户信息添加到上下文中
    ctx.state.auth = authContext;

    // 继续处理请求 - Fresh V2 中需要返回 ctx.next() 的结果
    return ctx.next();
  };
}

/**
 * 可选认证中间件
 * 检查用户是否已登录，但不强制要求登录
 */
export function optionalAuth() {
  return async function optionalAuthMiddleware(
    ctx: MiddlewareHandlerContext,
  ): Promise<Response> {
    const authContext = await getAuthContext(ctx.req);

    // 将认证信息添加到上下文中（无论是否登录）
    ctx.state.auth = authContext;

    // 继续处理请求
    return ctx.next();
  };
}

/**
 * 管理员权限中间件
 * 检查用户是否有管理员权限
 */
export function requireAdmin(adminUsers: string[] = []) {
  return async function adminMiddleware(
    ctx: MiddlewareHandlerContext,
  ): Promise<Response> {
    const authContext = await getAuthContext(ctx.req);

    if (!authContext.isAuthenticated || !authContext.user) {
      // 未登录，重定向到登录页面
      const loginUrl = `/api/auth/github?redirect=${
        encodeURIComponent(ctx.req.url)
      }`;
      return new Response(null, {
        status: 302,
        headers: { "Location": loginUrl },
      });
    }

    // 检查是否是管理员
    const isAdmin = adminUsers.includes(authContext.user.username || "");
    if (!isAdmin) {
      return new Response(
        JSON.stringify({
          error: "Access denied",
          message: "Administrator privileges required",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 是管理员，将认证信息添加到上下文中
    ctx.state.auth = { ...authContext, isAdmin: true };

    // 继续处理请求
    return ctx.next();
  };
}

/**
 * API 认证中间件
 * 用于保护 API 端点，返回 JSON 错误而不是重定向
 */
export function requireApiAuth() {
  return async function apiAuthMiddleware(
    ctx: MiddlewareHandlerContext,
  ): Promise<Response> {
    const authContext = await getAuthContext(ctx.req);

    if (!authContext.isAuthenticated) {
      return new Response(
        JSON.stringify({
          error: "Authentication required",
          authenticated: false,
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 已登录，将用户信息添加到上下文中
    ctx.state.auth = authContext;

    // 继续处理请求
    return ctx.next();
  };
}

/**
 * 获取认证上下文
 * 从请求中提取并验证用户认证信息
 */
export async function getAuthContext(req: Request): Promise<AuthContext> {
  try {
    // 从请求中提取 JWT 令牌
    const token = extractTokenFromRequest(req);

    if (!token) {
      return { isAuthenticated: false, user: null };
    }

    // 验证 JWT 令牌
    const payload = await verifyJWT(token);

    if (!payload) {
      return { isAuthenticated: false, user: null };
    }

    // 从 JWT 载荷重建用户信息
    const user = userFromJWTPayload(payload);

    // 获取会话ID（如果JWT中包含）
    const sessionId = payload.sessionId as string | undefined;

    // 更新会话活动时间（如果有会话ID）
    if (sessionId) {
      updateSessionActivity(sessionId);
    }

    return {
      isAuthenticated: true,
      user,
      sessionId,
    };
  } catch (error) {
    console.error("Auth context error:", error);
    return { isAuthenticated: false, user: null };
  }
}

/**
 * 从上下文中获取当前用户
 */
export function getCurrentUser(
  ctx: MiddlewareHandlerContext,
): Partial<AppUser> | null {
  return ctx.state.auth?.user || null;
}

/**
 * 从认证上下文中获取用户ID，确保类型安全
 */
export function getUserId(authContext: AuthContext): string | null {
  return authContext.user?.id || null;
}

/**
 * 验证用户ID是否有效，如果无效则返回错误响应
 */
export function validateUserId(
  userId: string | undefined | null,
): Response | null {
  if (!userId) {
    return new Response(
      JSON.stringify({ error: "User ID not found" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }
  return null;
}

/**
 * 检查当前用户是否已登录
 */
export function isAuthenticated(ctx: MiddlewareHandlerContext): boolean {
  return ctx.state.auth?.isAuthenticated || false;
}

/**
 * 检查当前用户是否是管理员
 */
export function isAdmin(ctx: MiddlewareHandlerContext): boolean {
  return ctx.state.auth?.isAdmin || false;
}
