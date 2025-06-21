import { useEffect } from "preact/hooks";
import { useThemeStore } from "@stores/useThemeStore.ts";

/**
 * 主题Hook - 结合Zustand状态管理
 * @returns 主题相关状态和方法
 */
export function useTheme() {
  const {
    theme,
    isDark,
    setTheme,
    toggleTheme,
    initializeTheme,
  } = useThemeStore();

  // 初始化主题
  useEffect(() => {
    initializeTheme();

    // 监听系统主题变化
    if (typeof globalThis.matchMedia !== "undefined" && theme === "system") {
      const mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = () => {
        if (theme === "system") {
          initializeTheme();
        }
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      } else {
        // 兼容旧版本浏览器
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, [theme, initializeTheme]);

  return {
    theme,
    isDark,
    isLight: !isDark,
    setTheme,
    toggleTheme,
    setLightTheme: () => setTheme("light"),
    setDarkTheme: () => setTheme("dark"),
    setSystemTheme: () => setTheme("system"),
  };
}
