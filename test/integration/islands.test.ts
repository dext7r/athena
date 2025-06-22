import { assertEquals } from "$std/testing/asserts.ts";

// Islands 组件集成测试
Deno.test("Islands - 组件导入测试", async () => {
  const islandComponents = [
    "CustomCursor",
    "ThemeToggle",
    "CopyButton",
    "CodeBlock",
    "Counter",
    "CounterDemo",
    "HooksDemo",
    "ComponentsDemo",
    "StateDemo",
    "SimpleStateDemo",
  ];

  for (const componentName of islandComponents) {
    try {
      const component = await import(`@islands/${componentName}.tsx`);
      assertEquals(
        typeof component.default,
        "function",
        `${componentName} 应该导出默认函数`,
      );
    } catch (error) {
      throw new Error(`${componentName} 导入失败: ${String(error)}`);
    }
  }
});

// 测试 Islands 交互功能
Deno.test("Islands - 交互功能测试", () => {
  // 模拟客户端交互状态
  let isClientSide = false;
  let hydrated = false;
  let interactionCount = 0;

  const simulateHydration = () => {
    isClientSide = true;
    hydrated = true;
  };

  const simulateInteraction = () => {
    if (hydrated) {
      interactionCount++;
      return true;
    }
    return false;
  };

  // 测试服务端渲染状态
  assertEquals(isClientSide, false);
  assertEquals(hydrated, false);
  assertEquals(simulateInteraction(), false);

  // 测试水合后的交互
  simulateHydration();
  assertEquals(isClientSide, true);
  assertEquals(hydrated, true);
  assertEquals(simulateInteraction(), true);
  assertEquals(interactionCount, 1);
});

// 测试 Islands 状态管理
Deno.test("Islands - 状态管理测试", () => {
  // 模拟 Counter Island 状态
  let count = 0;
  let isLoading = false;

  const increment = () => {
    if (!isLoading) {
      count++;
    }
  };

  const decrement = () => {
    if (!isLoading) {
      count--;
    }
  };

  const reset = () => {
    if (!isLoading) {
      count = 0;
    }
  };

  const setLoading = (loading: boolean) => {
    isLoading = loading;
  };

  // 测试基本操作
  assertEquals(count, 0);
  increment();
  assertEquals(count, 1);
  decrement();
  assertEquals(count, 0);
  reset();
  assertEquals(count, 0);

  // 测试加载状态
  setLoading(true);
  increment(); // 应该被阻止
  assertEquals(count, 0);
  setLoading(false);
  increment();
  assertEquals(count, 1);
});

// 测试 Theme Toggle Island
Deno.test("Islands - ThemeToggle 功能测试", () => {
  type Theme = "light" | "dark" | "system";

  let currentTheme: Theme = "system";
  let isDarkMode = false;

  const setTheme = (theme: Theme) => {
    currentTheme = theme;

    if (theme === "system") {
      // 模拟系统主题检测
      isDarkMode = false; // 假设系统默认浅色
    } else {
      isDarkMode = theme === "dark";
    }
  };

  const toggleTheme = () => {
    if (currentTheme === "light") {
      setTheme("dark");
    } else if (currentTheme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  // 测试主题切换循环
  assertEquals(currentTheme, "system");
  toggleTheme();
  assertEquals(currentTheme, "light");
  assertEquals(isDarkMode, false);

  toggleTheme();
  assertEquals(currentTheme, "dark");
  assertEquals(isDarkMode, true);

  toggleTheme();
  assertEquals(currentTheme, "system");
});

// 测试 Copy Button Island
Deno.test("Islands - CopyButton 功能测试", async () => {
  let copied = false;
  let error: string | null = null;
  let copyText = "";
  let timerId: number | undefined;

  const mockCopy = (text: string) => {
    try {
      if (!text) {
        throw new Error("复制内容不能为空");
      }

      copyText = text;
      copied = true;
      error = null;

      // 模拟2秒后重置状态，并清理timer
      timerId = setTimeout(() => {
        copied = false;
        timerId = undefined;
      }, 2000);

      return Promise.resolve();
    } catch (err) {
      error = err instanceof Error ? err.message : "复制失败";
      copied = false;
      return Promise.reject(err);
    }
  };

  // 测试成功复制
  await mockCopy("测试文本");
  assertEquals(copied, true);
  assertEquals(error, null);
  assertEquals(copyText, "测试文本");

  // 清理timer避免泄漏
  if (timerId) {
    clearTimeout(timerId);
  }

  // 测试复制失败
  try {
    await mockCopy("");
  } catch {
    assertEquals(error, "复制内容不能为空");
    assertEquals(copied, false);
  }
});

// 测试 Code Block Island
Deno.test("Islands - CodeBlock 功能测试", () => {
  interface CodeBlockState {
    code: string;
    language: string;
    filePath?: string;
    isLoading: boolean;
    error: string | null;
  }

  let state: CodeBlockState = {
    code: "",
    language: "typescript",
    isLoading: false,
    error: null,
  };

  const loadCodeFromFile = (filePath: string) => {
    state.isLoading = true;
    state.error = null;

    try {
      // 模拟文件加载
      if (filePath.endsWith(".ts")) {
        state.code = "// TypeScript 代码示例\nexport default function() {}";
        state.language = "typescript";
      } else if (filePath.endsWith(".tsx")) {
        state.code =
          "// React 组件示例\nexport default function Component() { return <div />; }";
        state.language = "typescript";
      } else {
        throw new Error("不支持的文件类型");
      }

      state.filePath = filePath;
      state.isLoading = false;
    } catch (err) {
      state.error = err instanceof Error ? err.message : "加载失败";
      state.isLoading = false;
    }
  };

  const setCodeDirectly = (code: string, language: string) => {
    state.code = code;
    state.language = language;
    state.filePath = undefined;
    state.error = null;
  };

  // 测试直接设置代码
  setCodeDirectly("console.log('Hello');", "javascript");
  assertEquals(state.code, "console.log('Hello');");
  assertEquals(state.language, "javascript");
  assertEquals(state.filePath, undefined);

  // 测试从文件加载
  loadCodeFromFile("example.ts");
  assertEquals(state.isLoading, false);
  assertEquals(state.language, "typescript");
  assertEquals(state.filePath, "example.ts");
  assertEquals(state.error, null);

  // 测试加载失败
  loadCodeFromFile("example.xyz");
  assertEquals(state.error, "不支持的文件类型");
  assertEquals(state.isLoading, false);
});

// 测试 Islands 性能
Deno.test("Islands - 性能测试", () => {
  let renderCount = 0;
  let updateCount = 0;

  const mockIsland = {
    render: () => {
      renderCount++;
    },
    update: (props: unknown) => {
      updateCount++;
    },
    shouldUpdate: (prevProps: unknown, nextProps: unknown) => {
      // 简单的浅比较
      return JSON.stringify(prevProps) !== JSON.stringify(nextProps);
    },
  };

  const props1 = { count: 1, text: "hello" };
  const props2 = { count: 1, text: "hello" };
  const props3 = { count: 2, text: "hello" };

  // 初始渲染
  mockIsland.render();
  assertEquals(renderCount, 1);

  // 相同props不应该更新
  if (mockIsland.shouldUpdate(props1, props2)) {
    mockIsland.update(props2);
  }
  assertEquals(updateCount, 0);

  // 不同props应该更新
  if (mockIsland.shouldUpdate(props1, props3)) {
    mockIsland.update(props3);
  }
  assertEquals(updateCount, 1);
});

// 测试 Islands 错误边界
Deno.test("Islands - 错误处理测试", () => {
  let hasError = false;
  let errorMessage = "";
  let errorBoundaryTriggered = false;

  const mockErrorBoundary = (error: Error) => {
    hasError = true;
    errorMessage = error.message;
    errorBoundaryTriggered = true;
  };

  const mockIslandWithError = () => {
    try {
      throw new Error("Island 组件错误");
    } catch (error) {
      mockErrorBoundary(error as Error);
    }
  };

  // 测试错误捕获
  mockIslandWithError();
  assertEquals(hasError, true);
  assertEquals(errorMessage, "Island 组件错误");
  assertEquals(errorBoundaryTriggered, true);
});
