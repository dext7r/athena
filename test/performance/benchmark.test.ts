import { assertEquals } from "$std/testing/asserts.ts";

// 性能基准测试
Deno.test("性能测试 - 数组操作性能", () => {
  const arraySize = 10000;
  const testArray = Array.from({ length: arraySize }, (_, i) => i);

  // 测试 map 操作性能
  const startTime = performance.now();
  const mappedArray = testArray.map((x) => x * 2);
  const endTime = performance.now();

  const executionTime = endTime - startTime;

  // 验证结果正确性
  assertEquals(mappedArray.length, arraySize);
  assertEquals(mappedArray[0], 0);
  assertEquals(mappedArray[1], 2);
  assertEquals(mappedArray[arraySize - 1], (arraySize - 1) * 2);

  // 性能断言 - 10000个元素的map操作应该在合理时间内完成
  assertEquals(
    executionTime < 100,
    true,
    `数组操作耗时 ${executionTime}ms，可能存在性能问题`,
  );
});

Deno.test("性能测试 - 字符串操作性能", () => {
  const iterations = 1000;
  const baseString = "Hello World ";

  // 测试字符串连接性能
  const startTime = performance.now();
  let result = "";
  for (let i = 0; i < iterations; i++) {
    result += baseString;
  }
  const endTime = performance.now();

  const executionTime = endTime - startTime;

  // 验证结果正确性
  assertEquals(result.length, baseString.length * iterations);
  assertEquals(result.startsWith(baseString), true);

  // 性能断言
  assertEquals(
    executionTime < 50,
    true,
    `字符串操作耗时 ${executionTime}ms，可能存在性能问题`,
  );
});

Deno.test("性能测试 - 对象创建性能", () => {
  const iterations = 10000;

  // 测试对象创建性能
  const startTime = performance.now();
  const objects = [];
  for (let i = 0; i < iterations; i++) {
    objects.push({
      id: i,
      name: `Object ${i}`,
      timestamp: Date.now(),
      active: i % 2 === 0,
    });
  }
  const endTime = performance.now();

  const executionTime = endTime - startTime;

  // 验证结果正确性
  assertEquals(objects.length, iterations);
  assertEquals(objects[0].id, 0);
  assertEquals(objects[0].name, "Object 0");
  assertEquals(typeof objects[0].timestamp, "number");
  assertEquals(typeof objects[0].active, "boolean");

  // 性能断言
  assertEquals(
    executionTime < 100,
    true,
    `对象创建耗时 ${executionTime}ms，可能存在性能问题`,
  );
});

Deno.test("性能测试 - JSON 序列化性能", () => {
  const testData = {
    users: Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      profile: {
        age: 20 + (i % 50),
        city: `City ${i % 10}`,
        preferences: {
          theme: i % 2 === 0 ? "dark" : "light",
          language: "zh-CN",
        },
      },
    })),
  };

  // 测试 JSON 序列化性能
  const startTime = performance.now();
  const jsonString = JSON.stringify(testData);
  const parsedData = JSON.parse(jsonString);
  const endTime = performance.now();

  const executionTime = endTime - startTime;

  // 验证结果正确性
  assertEquals(parsedData.users.length, 1000);
  assertEquals(parsedData.users[0].name, "User 0");
  assertEquals(typeof jsonString, "string");
  assertEquals(jsonString.length > 0, true);

  // 性能断言
  assertEquals(
    executionTime < 200,
    true,
    `JSON 序列化耗时 ${executionTime}ms，可能存在性能问题`,
  );
});
