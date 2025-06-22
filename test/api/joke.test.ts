import { handler } from "@routes/api/joke.ts";
import { FreshContext } from "fresh";
import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts";

Deno.test("API Joke - 返回笑话", () => {
  const request = new Request("http://localhost:8000/api/joke", {
    method: "GET",
  });

  // 创建模拟的 FreshContext
  const ctx = { req: request } as FreshContext;

  const response = handler(ctx);

  assertEquals(response.status, 200, "应该返回 200 状态码");
});

Deno.test("API Joke - 返回文本内容", async () => {
  const request = new Request("http://localhost:8000/api/joke", {
    method: "GET",
  });

  const ctx = { req: request } as FreshContext;
  const response = handler(ctx);

  const joke = await response.text();
  assertExists(joke, "响应应该包含笑话");
  assertEquals(typeof joke, "string", "笑话应该是字符串");
  assertEquals(joke.length > 0, true, "笑话不应该为空");
});

Deno.test("API Joke - 笑话内容验证", async () => {
  const request = new Request("http://localhost:8000/api/joke", {
    method: "GET",
  });

  // 多次请求验证笑话的随机性
  const jokes = new Set();
  const requestCount = 10;

  for (let i = 0; i < requestCount; i++) {
    const ctx = { req: request } as FreshContext;
    const response = handler(ctx);
    const joke = await response.text();
    jokes.add(joke);
  }

  // 至少应该有一些不同的笑话（考虑到随机性）
  assertEquals(jokes.size >= 1, true, "应该返回笑话内容");

  // 验证每个笑话都是有效的字符串
  jokes.forEach((joke) => {
    assertEquals(typeof joke, "string", "每个笑话都应该是字符串");
    assertEquals((joke as string).length > 10, true, "笑话应该有合理的长度");
  });
});

Deno.test("API Joke - 响应格式验证", async () => {
  const request = new Request("http://localhost:8000/api/joke", {
    method: "GET",
  });

  const ctx = { req: request } as FreshContext;
  const response = handler(ctx);

  // 验证响应是 Response 对象
  assertEquals(response instanceof Response, true, "应该返回 Response 对象");
  assertEquals(response.status, 200, "状态码应该是 200");

  const joke = await response.text();
  assertEquals(typeof joke, "string", "内容应该是字符串");
});

Deno.test("API Joke - 性能测试", async () => {
  const request = new Request("http://localhost:8000/api/joke", {
    method: "GET",
  });

  const startTime = performance.now();
  const ctx = { req: request } as FreshContext;
  const response = handler(ctx);
  const endTime = performance.now();

  const responseTime = endTime - startTime;

  assertEquals(response.status, 200, "请求应该成功");
  assertEquals(responseTime < 100, true, "响应时间应该少于 100ms");

  // 验证响应内容
  const joke = await response.text();
  assertExists(joke, "应该返回笑话内容");
});

Deno.test("API Joke - 并发请求测试", async () => {
  const request = new Request("http://localhost:8000/api/joke", {
    method: "GET",
  });

  // 并发发送多个请求
  const promises = Array.from({ length: 5 }, () => {
    const ctx = { req: request } as FreshContext;
    return handler(ctx);
  });
  const responses = await Promise.all(promises);

  // 验证所有请求都成功
  responses.forEach((response, index) => {
    assertEquals(response.status, 200, `请求 ${index + 1} 应该成功`);
  });

  // 验证所有响应都包含有效内容
  const dataPromises = responses.map((response) => response.text());
  const dataArray = await Promise.all(dataPromises);

  dataArray.forEach((joke, index) => {
    assertExists(joke, `响应 ${index + 1} 应该包含笑话`);
    assertEquals(typeof joke, "string", `笑话 ${index + 1} 应该是字符串`);
  });
});

Deno.test("API Joke - 内容质量检查", async () => {
  const request = new Request("http://localhost:8000/api/joke", {
    method: "GET",
  });

  const ctx = { req: request } as FreshContext;
  const response = handler(ctx);
  const joke = await response.text();

  // 基本质量检查
  assertEquals(joke.length >= 10, true, "笑话应该有合理的最小长度");
  assertEquals(joke.length <= 1000, true, "笑话不应该过长");
  assertEquals(
    joke.trim().length === joke.length,
    true,
    "笑话不应该有前后空格",
  );

  // 检查是否包含基本的标点符号或结构
  const hasBasicStructure = /[.!?]/.test(joke) || joke.includes(" ");
  assertEquals(hasBasicStructure, true, "笑话应该有基本的语言结构");
});

Deno.test("API Joke - 随机性验证", async () => {
  const request = new Request("http://localhost:8000/api/joke", {
    method: "GET",
  });

  const jokes = new Set();
  const attempts = 50; // 增加尝试次数以更好地测试随机性

  for (let i = 0; i < attempts; i++) {
    const ctx = { req: request } as FreshContext;
    const response = handler(ctx);
    const joke = await response.text();
    jokes.add(joke);
  }

  // 应该有多个不同的笑话
  assertEquals(jokes.size > 1, true, "应该返回多个不同的笑话");
  assertEquals(jokes.size <= 10, true, "笑话数量应该在合理范围内");
});
