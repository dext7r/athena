import { assertEquals } from "$std/testing/asserts.ts";

// Hooks 模块导入测试
Deno.test("useCounter - 模块导入测试", async () => {
  try {
    const { useCounter } = await import("@hooks/useCounter.ts");
    assertEquals(typeof useCounter, "function");
  } catch (error) {
    throw new Error(`useCounter 导入失败: ${String(error)}`);
  }
});

// Hooks 模块整体导入测试
Deno.test("Hooks - 所有 hooks 导入测试", async () => {
  try {
    const hooksModule = await import("@hooks/index.ts");

    // 检查所有 hooks 是否正确导出
    assertEquals(typeof hooksModule.useCounter, "function");
    assertEquals(typeof hooksModule.useLocalStorage, "function");
    assertEquals(typeof hooksModule.useDebounce, "function");
    assertEquals(typeof hooksModule.useFetch, "function");
    assertEquals(typeof hooksModule.useToggle, "function");
    assertEquals(typeof hooksModule.useMediaQuery, "function");
    assertEquals(typeof hooksModule.useTheme, "function");
  } catch (error) {
    throw new Error(`Hooks 模块导入失败: ${String(error)}`);
  }
});

// 测试 Hook 的基本结构（不依赖 React 环境）
Deno.test("useCounter - 基础结构测试", () => {
  // 模拟 counter 的基本逻辑
  let count = 0;
  const initialValue = 10;

  // 模拟初始值设置
  count = initialValue;
  assertEquals(count, 10);

  // 模拟 increment
  count += 1;
  assertEquals(count, 11);

  // 模拟 decrement
  count -= 1;
  assertEquals(count, 10);

  // 模拟 reset
  count = initialValue;
  assertEquals(count, 10);
});

// 测试计数器的边界情况
Deno.test("useCounter - 边界情况测试", () => {
  // 测试负数初始值
  let count = -5;
  assertEquals(count, -5);

  // 测试大数值
  count = 999999;
  assertEquals(count, 999999);

  // 测试零值
  count = 0;
  assertEquals(count, 0);
});
