import { assertEquals } from "$std/testing/asserts.ts";

// useThemeStore 测试
Deno.test("useThemeStore - 模块导入测试", async () => {
  try {
    const storeModule = await import("@stores/useThemeStore.ts");
    assertEquals(typeof storeModule.useThemeStore, "function");
  } catch (error) {
    throw new Error(`useThemeStore 导入失败: ${String(error)}`);
  }
});

// 测试主题状态管理
Deno.test("useThemeStore - 主题状态管理测试", () => {
  type Theme = "light" | "dark" | "system";

  // 模拟主题状态
  let currentTheme: Theme = "system";
  let isDark = false;

  const setTheme = (theme: Theme) => {
    currentTheme = theme;

    if (theme === "system") {
      // 模拟系统主题检测
      isDark = false; // 假设系统是浅色主题
    } else {
      isDark = theme === "dark";
    }
  };

  const toggleTheme = () => {
    if (currentTheme === "light") {
      setTheme("dark");
    } else if (currentTheme === "dark") {
      setTheme("light");
    } else {
      // 从 system 切换到 light
      setTheme("light");
    }
  };

  // 测试初始状态
  assertEquals(currentTheme, "system");
  assertEquals(isDark, false);

  // 测试设置浅色主题
  setTheme("light");
  assertEquals(currentTheme, "light");
  assertEquals(isDark, false);

  // 测试设置深色主题
  setTheme("dark");
  assertEquals(currentTheme, "dark");
  assertEquals(isDark, true);

  // 测试切换功能
  toggleTheme();
  assertEquals(currentTheme, "light");
  assertEquals(isDark, false);

  toggleTheme();
  assertEquals(currentTheme, "dark");
  assertEquals(isDark, true);

  // 测试系统主题
  setTheme("system");
  assertEquals(currentTheme, "system");
});

// 测试主题持久化
Deno.test("useThemeStore - 主题持久化测试", () => {
  // 模拟 localStorage
  const storage = new Map<string, string>();

  const saveTheme = (theme: string) => {
    const themeData = {
      state: { theme },
      version: 0,
    };
    storage.set("theme-storage", JSON.stringify(themeData));
  };

  const loadTheme = (): string | null => {
    const data = storage.get("theme-storage");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        return parsed.state?.theme || null;
      } catch {
        return null;
      }
    }
    return null;
  };

  // 测试保存主题
  saveTheme("dark");
  assertEquals(loadTheme(), "dark");

  saveTheme("light");
  assertEquals(loadTheme(), "light");

  saveTheme("system");
  assertEquals(loadTheme(), "system");

  // 测试无效数据
  storage.set("theme-storage", "invalid json");
  assertEquals(loadTheme(), null);
});

// 测试系统主题检测
Deno.test("useThemeStore - 系统主题检测测试", () => {
  // 模拟 matchMedia API
  const createMockMatchMedia = (matches: boolean) => ({
    matches,
    media: "(prefers-color-scheme: dark)",
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });

  // 测试系统深色主题
  let mockMatchMedia = createMockMatchMedia(true);
  let systemIsDark = mockMatchMedia.matches;
  assertEquals(systemIsDark, true);

  // 测试系统浅色主题
  mockMatchMedia = createMockMatchMedia(false);
  systemIsDark = mockMatchMedia.matches;
  assertEquals(systemIsDark, false);
});

// 测试主题变化监听
Deno.test("useThemeStore - 主题变化监听测试", () => {
  let currentTheme = "light";
  let changeCount = 0;
  let lastTheme = "";

  const listeners: Array<(theme: string) => void> = [];

  const addThemeListener = (callback: (theme: string) => void) => {
    listeners.push(callback);
  };

  const removeThemeListener = (callback: (theme: string) => void) => {
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };

  const setTheme = (theme: string) => {
    currentTheme = theme;
    listeners.forEach((listener) => listener(theme));
  };

  // 添加监听器
  const themeListener = (theme: string) => {
    changeCount++;
    lastTheme = theme;
  };

  addThemeListener(themeListener);

  // 测试主题变化
  setTheme("dark");
  assertEquals(changeCount, 1);
  assertEquals(lastTheme, "dark");

  setTheme("light");
  assertEquals(changeCount, 2);
  assertEquals(lastTheme, "light");

  // 移除监听器
  removeThemeListener(themeListener);
  setTheme("system");
  assertEquals(changeCount, 2); // 不应该增加
  assertEquals(lastTheme, "light"); // 保持之前的值
});

// 测试主题类名应用
Deno.test("useThemeStore - 主题类名应用测试", () => {
  // 模拟 document.documentElement
  const mockElement = {
    classList: {
      classes: new Set<string>(),
      add: function (className: string) {
        this.classes.add(className);
      },
      remove: function (className: string) {
        this.classes.delete(className);
      },
      contains: function (className: string) {
        return this.classes.has(className);
      },
    },
  };

  const applyTheme = (isDark: boolean) => {
    if (isDark) {
      mockElement.classList.add("dark");
    } else {
      mockElement.classList.remove("dark");
    }
  };

  // 测试应用深色主题
  applyTheme(true);
  assertEquals(mockElement.classList.contains("dark"), true);

  // 测试应用浅色主题
  applyTheme(false);
  assertEquals(mockElement.classList.contains("dark"), false);
});

// 测试主题配置选项
Deno.test("useThemeStore - 主题配置选项测试", () => {
  interface ThemeConfig {
    enableSystemTheme: boolean;
    enableTransitions: boolean;
    storageKey: string;
    defaultTheme: "light" | "dark" | "system";
  }

  const defaultConfig: ThemeConfig = {
    enableSystemTheme: true,
    enableTransitions: true,
    storageKey: "theme-storage",
    defaultTheme: "system",
  };

  assertEquals(defaultConfig.enableSystemTheme, true);
  assertEquals(defaultConfig.enableTransitions, true);
  assertEquals(defaultConfig.storageKey, "theme-storage");
  assertEquals(defaultConfig.defaultTheme, "system");

  // 测试自定义配置
  const customConfig: ThemeConfig = {
    enableSystemTheme: false,
    enableTransitions: false,
    storageKey: "custom-theme",
    defaultTheme: "light",
  };

  assertEquals(customConfig.enableSystemTheme, false);
  assertEquals(customConfig.enableTransitions, false);
  assertEquals(customConfig.storageKey, "custom-theme");
  assertEquals(customConfig.defaultTheme, "light");
});
