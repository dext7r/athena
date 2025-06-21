import { assertEquals } from "$std/testing/asserts.ts";
import { isClient, isServer } from "@utils/clientOnly.tsx";

Deno.test("isServer - 在 Deno 环境中应该返回 true", () => {
  assertEquals(isServer, true);
});

Deno.test("isClient - 在 Deno 环境中应该返回 false", () => {
  assertEquals(isClient, false);
});

Deno.test("环境检测 - isClient 和 isServer 应该互斥", () => {
  // 在任何环境中，isClient 和 isServer 应该互斥
  assertEquals(isClient && isServer, false);
  assertEquals(isClient || isServer, true);
});

Deno.test("环境检测 - 验证环境变量", () => {
  // 在 Deno 环境中，window 应该是 undefined
  assertEquals(typeof globalThis.window, "undefined");
  assertEquals(typeof window === "undefined", true);
});
