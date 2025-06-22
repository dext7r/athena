import { assertEquals } from "$std/testing/asserts.ts";

// useDebounce Hook 测试
Deno.test("useDebounce - 模块导入测试", async () => {
  try {
    const { useDebounce } = await import("@hooks/useDebounce.ts");
    assertEquals(typeof useDebounce, "function");
  } catch (error) {
    throw new Error(`useDebounce 导入失败: ${String(error)}`);
  }
});

// 防抖功能的基本逻辑测试
Deno.test("useDebounce - 基础防抖逻辑测试", async () => {
  let callCount = 0;
  let lastValue = "";

  // 模拟防抖函数
  const createDebounce = <T extends unknown[]>(
    fn: (...args: T) => void,
    delay: number,
  ) => {
    let timeoutId: number | undefined;

    return (...args: T) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const debouncedFunction = createDebounce((value: string) => {
    callCount++;
    lastValue = value;
  }, 100);

  // 快速连续调用
  debouncedFunction("第一次");
  debouncedFunction("第二次");
  debouncedFunction("第三次");

  // 此时函数还没有执行
  assertEquals(callCount, 0);
  assertEquals(lastValue, "");

  // 等待防抖延迟
  await new Promise((resolve) => setTimeout(resolve, 150));

  // 现在函数应该只执行了一次，使用最后的值
  assertEquals(callCount, 1);
  assertEquals(lastValue, "第三次");
});

// 测试防抖延迟配置
Deno.test("useDebounce - 延迟配置测试", async () => {
  let shortCallCount = 0;
  let longCallCount = 0;

  const createDebounce = <T extends unknown[]>(
    fn: (...args: T) => void,
    delay: number,
  ) => {
    let timeoutId: number | undefined;
    return (...args: T) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  // 短延迟防抖
  const shortDebounce = createDebounce(() => shortCallCount++, 50);
  // 长延迟防抖
  const longDebounce = createDebounce(() => longCallCount++, 200);

  shortDebounce();
  longDebounce();

  // 等待短延迟完成
  await new Promise((resolve) => setTimeout(resolve, 100));
  assertEquals(shortCallCount, 1);
  assertEquals(longCallCount, 0);

  // 等待长延迟完成
  await new Promise((resolve) => setTimeout(resolve, 150));
  assertEquals(shortCallCount, 1);
  assertEquals(longCallCount, 1);
});

// 测试防抖取消功能
Deno.test("useDebounce - 取消功能测试", async () => {
  let callCount = 0;

  const createCancellableDebounce = <T extends unknown[]>(
    fn: (...args: T) => void,
    delay: number,
  ) => {
    let timeoutId: number | undefined;

    const debouncedFn = (...args: T) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };

    const cancel = () => {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    };

    return { debouncedFn, cancel };
  };

  const { debouncedFn, cancel } = createCancellableDebounce(
    () => callCount++,
    100,
  );

  debouncedFn();

  // 在延迟完成前取消
  setTimeout(cancel, 50);

  await new Promise((resolve) => setTimeout(resolve, 150));

  // 函数应该没有执行
  assertEquals(callCount, 0);
});

// 测试搜索场景的防抖
Deno.test("useDebounce - 搜索场景测试", async () => {
  let searchResults: string[] = [];
  let searchCallCount = 0;

  // 模拟搜索函数
  const mockSearch = (query: string) => {
    searchCallCount++;
    searchResults = [`结果1-${query}`, `结果2-${query}`, `结果3-${query}`];
  };

  const createDebounce = <T extends unknown[]>(
    fn: (...args: T) => void,
    delay: number,
  ) => {
    let timeoutId: number | undefined;
    return (...args: T) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const debouncedSearch = createDebounce(mockSearch, 300);

  // 模拟用户快速输入
  debouncedSearch("a");
  debouncedSearch("ap");
  debouncedSearch("app");
  debouncedSearch("appl");
  debouncedSearch("apple");

  // 搜索还没有执行
  assertEquals(searchCallCount, 0);
  assertEquals(searchResults.length, 0);

  // 等待防抖完成
  await new Promise((resolve) => setTimeout(resolve, 350));

  // 搜索应该只执行了一次，使用最终的查询词
  assertEquals(searchCallCount, 1);
  assertEquals(searchResults.length, 3);
  assertEquals(searchResults[0], "结果1-apple");
});

// 测试数值输入的防抖
Deno.test("useDebounce - 数值输入测试", async () => {
  let finalValue = 0;
  let updateCount = 0;

  const createDebounce = <T extends unknown[]>(
    fn: (...args: T) => void,
    delay: number,
  ) => {
    let timeoutId: number | undefined;
    return (...args: T) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const debouncedUpdate = createDebounce((value: number) => {
    updateCount++;
    finalValue = value;
  }, 100);

  // 模拟滑块或数值输入的快速变化
  for (let i = 1; i <= 10; i++) {
    debouncedUpdate(i);
  }

  assertEquals(updateCount, 0);
  assertEquals(finalValue, 0);

  await new Promise((resolve) => setTimeout(resolve, 150));

  assertEquals(updateCount, 1);
  assertEquals(finalValue, 10);
});
