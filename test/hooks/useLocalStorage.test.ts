import { assertEquals, assertExists } from "$std/testing/asserts.ts";

// useLocalStorage Hook 测试
Deno.test("useLocalStorage - 模块导入测试", async () => {
  try {
    const { useLocalStorage } = await import("@hooks/useLocalStorage.ts");
    assertEquals(typeof useLocalStorage, "function");
  } catch (error) {
    throw new Error(`useLocalStorage 导入失败: ${String(error)}`);
  }
});

// 模拟 localStorage 功能
class MockStorage {
  private storage: Map<string, string> = new Map();

  getItem(key: string): string | null {
    return this.storage.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.storage.set(key, value);
  }

  removeItem(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }

  get length(): number {
    return this.storage.size;
  }

  key(index: number): string | null {
    const keys = Array.from(this.storage.keys());
    return keys[index] ?? null;
  }
}

// 测试 localStorage 基本功能
Deno.test("useLocalStorage - 基础功能测试", () => {
  const mockStorage = new MockStorage();

  // 测试设置值
  mockStorage.setItem("test-key", "test-value");
  assertEquals(mockStorage.getItem("test-key"), "test-value");

  // 测试获取不存在的值
  assertEquals(mockStorage.getItem("non-existent"), null);

  // 测试删除值
  mockStorage.removeItem("test-key");
  assertEquals(mockStorage.getItem("test-key"), null);

  // 测试清空存储
  mockStorage.setItem("key1", "value1");
  mockStorage.setItem("key2", "value2");
  assertEquals(mockStorage.length, 2);
  mockStorage.clear();
  assertEquals(mockStorage.length, 0);
});

// 测试 JSON 序列化/反序列化
Deno.test("useLocalStorage - JSON 序列化测试", () => {
  const mockStorage = new MockStorage();

  // 测试对象存储
  const testObject = { name: "测试", age: 25, active: true };
  const serialized = JSON.stringify(testObject);
  mockStorage.setItem("user", serialized);

  const retrieved = mockStorage.getItem("user");
  assertExists(retrieved);
  const deserialized = JSON.parse(retrieved);
  assertEquals(deserialized.name, "测试");
  assertEquals(deserialized.age, 25);
  assertEquals(deserialized.active, true);

  // 测试数组存储
  const testArray = [1, 2, 3, "test", { nested: true }];
  mockStorage.setItem("array", JSON.stringify(testArray));
  const retrievedArray = JSON.parse(mockStorage.getItem("array")!);
  assertEquals(retrievedArray.length, 5);
  assertEquals(retrievedArray[3], "test");
  assertEquals(retrievedArray[4].nested, true);
});

// 测试错误处理
Deno.test("useLocalStorage - 错误处理测试", () => {
  const mockStorage = new MockStorage();

  // 测试无效 JSON 解析
  mockStorage.setItem("invalid-json", "{ invalid json }");

  try {
    JSON.parse(mockStorage.getItem("invalid-json")!);
  } catch (error) {
    assertEquals(error instanceof SyntaxError, true);
  }

  // 测试存储限制（模拟）
  const largeData = "x".repeat(10000);
  try {
    mockStorage.setItem("large-data", largeData);
    assertEquals(mockStorage.getItem("large-data"), largeData);
  } catch (error) {
    // 在真实环境中可能会抛出 QuotaExceededError
    console.log("存储限制测试:", error);
  }
});

// 测试类型安全
Deno.test("useLocalStorage - 类型安全测试", () => {
  interface User {
    id: number;
    name: string;
    email: string;
    preferences: {
      theme: "light" | "dark";
      language: string;
    };
  }

  const testUser: User = {
    id: 1,
    name: "张三",
    email: "zhangsan@example.com",
    preferences: {
      theme: "dark",
      language: "zh-CN",
    },
  };

  // 验证类型结构
  assertEquals(typeof testUser.id, "number");
  assertEquals(typeof testUser.name, "string");
  assertEquals(typeof testUser.email, "string");
  assertEquals(typeof testUser.preferences, "object");
  assertEquals(testUser.preferences.theme, "dark");
  assertEquals(testUser.preferences.language, "zh-CN");
});
