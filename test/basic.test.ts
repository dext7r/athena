import { assertEquals } from "$std/testing/asserts.ts";

Deno.test("测试加法", () => {
  assertEquals(1 + 1, 2);
});

Deno.test("测试字符串相等", () => {
  assertEquals("hello", "hello");
});
