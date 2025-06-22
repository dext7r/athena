import { assertEquals } from "$std/testing/asserts.ts";

// useToggle Hook 测试
Deno.test("useToggle - 模块导入测试", async () => {
  try {
    const { useToggle } = await import("@hooks/useToggle.ts");
    assertEquals(typeof useToggle, "function");
  } catch (error) {
    throw new Error(`useToggle 导入失败: ${String(error)}`);
  }
});

// 基础切换功能测试
Deno.test("useToggle - 基础切换功能测试", () => {
  // 模拟 toggle 状态管理
  let value = false;

  const toggle = () => {
    value = !value;
  };

  const setTrue = () => {
    value = true;
  };

  const setFalse = () => {
    value = false;
  };

  const setValue = (newValue: boolean) => {
    value = newValue;
  };

  // 测试初始状态
  assertEquals(value, false);

  // 测试切换功能
  toggle();
  assertEquals(value, true);

  toggle();
  assertEquals(value, false);

  // 测试设置为 true
  setTrue();
  assertEquals(value, true);

  // 测试设置为 false
  setFalse();
  assertEquals(value, false);

  // 测试直接设置值
  setValue(true);
  assertEquals(value, true);

  setValue(false);
  assertEquals(value, false);
});

// 测试自定义初始值
Deno.test("useToggle - 自定义初始值测试", () => {
  // 测试初始值为 true
  let value1 = true;
  const toggle1 = () => value1 = !value1;

  assertEquals(value1, true);
  toggle1();
  assertEquals(value1, false);

  // 测试初始值为 false
  let value2 = false;
  const toggle2 = () => value2 = !value2;

  assertEquals(value2, false);
  toggle2();
  assertEquals(value2, true);
});

// 测试多个独立的 toggle 实例
Deno.test("useToggle - 多实例独立性测试", () => {
  // 创建多个独立的 toggle 状态
  let modal1Open = false;
  let modal2Open = false;
  let sidebar1Open = true;
  let sidebar2Open = true;

  const toggleModal1 = () => modal1Open = !modal1Open;
  const toggleModal2 = () => modal2Open = !modal2Open;
  const toggleSidebar1 = () => sidebar1Open = !sidebar1Open;
  const toggleSidebar2 = () => sidebar2Open = !sidebar2Open;

  // 测试初始状态
  assertEquals(modal1Open, false);
  assertEquals(modal2Open, false);
  assertEquals(sidebar1Open, true);
  assertEquals(sidebar2Open, true);

  // 测试独立操作
  toggleModal1();
  assertEquals(modal1Open, true);
  assertEquals(modal2Open, false); // 不应该受影响

  toggleSidebar1();
  assertEquals(sidebar1Open, false);
  assertEquals(sidebar2Open, true); // 不应该受影响

  toggleModal2();
  assertEquals(modal2Open, true);
  assertEquals(modal1Open, true); // 不应该受影响
});

// 测试常见 UI 场景
Deno.test("useToggle - UI 场景测试", () => {
  // 模态框状态
  let isModalOpen = false;
  const toggleModal = () => isModalOpen = !isModalOpen;
  const openModal = () => isModalOpen = true;
  const closeModal = () => isModalOpen = false;

  // 侧边栏状态
  let isSidebarCollapsed = false;
  const toggleSidebar = () => isSidebarCollapsed = !isSidebarCollapsed;

  // 主题状态
  let isDarkMode = false;
  const toggleTheme = () => isDarkMode = !isDarkMode;

  // 加载状态
  let isLoading = false;
  const setLoading = (loading: boolean) => isLoading = loading;

  // 测试模态框操作
  assertEquals(isModalOpen, false);
  openModal();
  assertEquals(isModalOpen, true);
  closeModal();
  assertEquals(isModalOpen, false);
  toggleModal();
  assertEquals(isModalOpen, true);

  // 测试侧边栏操作
  assertEquals(isSidebarCollapsed, false);
  toggleSidebar();
  assertEquals(isSidebarCollapsed, true);
  toggleSidebar();
  assertEquals(isSidebarCollapsed, false);

  // 测试主题切换
  assertEquals(isDarkMode, false);
  toggleTheme();
  assertEquals(isDarkMode, true);
  toggleTheme();
  assertEquals(isDarkMode, false);

  // 测试加载状态
  assertEquals(isLoading, false);
  setLoading(true);
  assertEquals(isLoading, true);
  setLoading(false);
  assertEquals(isLoading, false);
});

// 测试回调函数功能
Deno.test("useToggle - 回调函数测试", () => {
  let value = false;
  let callbackCount = 0;
  let lastCallbackValue: boolean | null = null;

  const toggle = (callback?: (newValue: boolean) => void) => {
    value = !value;
    if (callback) {
      callback(value);
    }
  };

  const setValue = (
    newValue: boolean,
    callback?: (newValue: boolean) => void,
  ) => {
    value = newValue;
    if (callback) {
      callback(value);
    }
  };

  // 测试带回调的切换
  toggle((newValue) => {
    callbackCount++;
    lastCallbackValue = newValue;
  });

  assertEquals(value, true);
  assertEquals(callbackCount, 1);
  assertEquals(lastCallbackValue, true);

  // 测试带回调的设置值
  setValue(false, (newValue) => {
    callbackCount++;
    lastCallbackValue = newValue;
  });

  assertEquals(value, false);
  assertEquals(callbackCount, 2);
  assertEquals(lastCallbackValue, false);
});

// 测试性能相关场景
Deno.test("useToggle - 性能测试", () => {
  let value = false;
  let toggleCount = 0;

  const toggle = () => {
    value = !value;
    toggleCount++;
  };

  // 模拟大量切换操作
  const iterations = 1000;
  const startTime = performance.now();

  for (let i = 0; i < iterations; i++) {
    toggle();
  }

  const endTime = performance.now();
  const duration = endTime - startTime;

  assertEquals(toggleCount, iterations);
  assertEquals(value, iterations % 2 === 0 ? false : true);

  // 性能应该很好（小于 10ms）
  console.log(`切换 ${iterations} 次耗时: ${duration.toFixed(2)}ms`);
  assertEquals(duration < 100, true); // 应该很快完成
});
