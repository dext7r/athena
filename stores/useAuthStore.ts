/**
 * 用户认证状态管理 Store
 * 使用 Zustand 管理用户登录状态和用户信息
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppUser } from "../utils/auth.ts";

// 认证状态接口
export interface AuthState {
  // 状态
  isAuthenticated: boolean;
  isLoading: boolean;
  user: Partial<AppUser> | null;
  error: string | null;

  // 操作方法
  login: (user: Partial<AppUser>) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  updateUser: (updates: Partial<AppUser>) => void;

  // 异步操作
  checkAuth: () => Promise<void>;
  performLogout: (redirectTo?: string) => Promise<void>;
}

// 创建认证状态 Store
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 初始状态
      isAuthenticated: false,
      isLoading: false,
      user: null,
      error: null,

      // 登录操作
      login: (user: Partial<AppUser>) => {
        set({
          isAuthenticated: true,
          user,
          error: null,
          isLoading: false,
        });
      },

      // 退出登录操作
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          error: null,
          isLoading: false,
        });
      },

      // 设置加载状态
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // 设置错误信息
      setError: (error: string | null) => {
        set({ error, isLoading: false });
      },

      // 清除错误信息
      clearError: () => {
        set({ error: null });
      },

      // 更新用户信息
      updateUser: (updates: Partial<AppUser>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates },
          });
        }
      },

      // 检查认证状态
      checkAuth: async () => {
        const { setLoading, login, logout, setError } = get();

        setLoading(true);

        try {
          const response = await fetch("/api/auth/me", {
            method: "GET",
            credentials: "include",
          });

          if (response.ok) {
            const data = await response.json();
            if (data.authenticated && data.user) {
              login(data.user);
            } else {
              logout();
            }
          } else {
            logout();
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          setError("Failed to check authentication status");
          logout();
        } finally {
          setLoading(false);
        }
      },

      // 执行退出登录
      performLogout: async (redirectTo = "/") => {
        const { setLoading, logout, setError } = get();

        setLoading(true);

        try {
          const response = await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
          });

          if (response.ok) {
            logout();
            // 重定向到指定页面
            if (typeof globalThis.location !== "undefined") {
              globalThis.location.href = redirectTo;
            }
          } else {
            setError("Failed to logout");
          }
        } catch (error) {
          console.error("Logout failed:", error);
          setError("Logout failed");
          // 即使请求失败，也清除本地状态
          logout();
        } finally {
          setLoading(false);
        }
      },
    }),
    {
      name: "auth-storage", // 本地存储键名
      partialize: (state) => ({
        // 只持久化必要的状态，不包括 isLoading 和 error
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    },
  ),
);

// 认证相关的工具函数
export const authUtils = {
  /**
   * 检查用户是否已登录
   */
  isLoggedIn: (): boolean => {
    return useAuthStore.getState().isAuthenticated;
  },

  /**
   * 获取当前用户信息
   */
  getCurrentUser: (): Partial<AppUser> | null => {
    return useAuthStore.getState().user;
  },

  /**
   * 检查用户是否有特定权限（扩展功能）
   */
  hasPermission: (_permission: string): boolean => {
    const user = useAuthStore.getState().user;
    // 这里可以根据实际需求实现权限检查逻辑
    // 例如检查用户角色、权限列表等
    return !!user; // 简单实现：只要登录就有权限
  },

  /**
   * 获取用户头像 URL
   */
  getUserAvatar: (size = 40): string => {
    const user = useAuthStore.getState().user;
    if (user?.avatar) {
      return `${user.avatar}&s=${size}`;
    }
    return `https://github.com/identicons/${
      user?.username || "anonymous"
    }.png?size=${size}`;
  },

  /**
   * 获取用户显示名称
   */
  getDisplayName: (): string => {
    const user = useAuthStore.getState().user;
    return user?.name || user?.username || "Anonymous";
  },

  /**
   * 启动 GitHub 登录流程
   */
  startGitHubLogin: (redirectTo = "/") => {
    const loginUrl = `/api/auth/github?redirect=${
      encodeURIComponent(redirectTo)
    }`;
    if (typeof globalThis.location !== "undefined") {
      globalThis.location.href = loginUrl;
    }
  },
};
