import { assertEquals } from "$std/testing/asserts.ts";

// 简单的状态管理测试
Deno.test("useAppStore - 基础导入测试", async () => {
  try {
    const { useAppStore } = await import("@stores/useAppStore.ts");
    assertEquals(typeof useAppStore, "function");
  } catch (error) {
    // 如果导入失败，说明模块存在问题
    throw new Error(`useAppStore 导入失败: ${String(error)}`);
  }
});

// 测试状态管理的基本结构
Deno.test("状态管理 - 模块导出检查", async () => {
  try {
    const storeModule = await import("@stores/index.ts");

    // 检查主要的 store 是否都已导出
    assertEquals(typeof storeModule.useAppStore, "function");
    assertEquals(typeof storeModule.useThemeStore, "function");
    assertEquals(typeof storeModule.useUserStore, "function");
    assertEquals(typeof storeModule.useAuthStore, "function");
  } catch (error) {
    throw new Error(`状态管理模块导入失败: ${String(error)}`);
  }
});
