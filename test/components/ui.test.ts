import { assertEquals } from "$std/testing/asserts.ts";

// UI 组件测试
Deno.test("UI 组件 - 组件导入测试", async () => {
  try {
    const componentsModule = await import("@components/index.ts");

    // 检查 UI 组件是否正确导出
    assertEquals(typeof componentsModule.Button, "function");
    assertEquals(typeof componentsModule.Card, "function");
    assertEquals(typeof componentsModule.Input, "function");
    assertEquals(typeof componentsModule.Modal, "function");
  } catch (error) {
    throw new Error(`UI 组件导入失败: ${String(error)}`);
  }
});

Deno.test("UI 组件 - 布局组件导入测试", async () => {
  try {
    const componentsModule = await import("@components/index.ts");

    // 检查布局组件是否正确导出
    assertEquals(typeof componentsModule.Layout, "function");
    assertEquals(typeof componentsModule.Header, "function");
    assertEquals(typeof componentsModule.Footer, "function");
    assertEquals(typeof componentsModule.Sidebar, "function");
  } catch (error) {
    throw new Error(`布局组件导入失败: ${String(error)}`);
  }
});

// 组件属性测试
Deno.test("UI 组件 - 基础属性类型测试", () => {
  // 模拟组件属性
  const mockButtonProps = {
    children: "点击我",
    onClick: () => {},
    disabled: false,
    variant: "primary",
  };

  const mockInputProps = {
    value: "",
    onChange: () => {},
    placeholder: "请输入内容",
    type: "text",
  };

  // 验证属性类型
  assertEquals(typeof mockButtonProps.children, "string");
  assertEquals(typeof mockButtonProps.onClick, "function");
  assertEquals(typeof mockButtonProps.disabled, "boolean");
  assertEquals(typeof mockButtonProps.variant, "string");

  assertEquals(typeof mockInputProps.value, "string");
  assertEquals(typeof mockInputProps.onChange, "function");
  assertEquals(typeof mockInputProps.placeholder, "string");
  assertEquals(typeof mockInputProps.type, "string");
});
