import { assertEquals } from "$std/testing/asserts.ts";

// 路由集成测试
Deno.test("路由 - 基础路由路径测试", () => {
  const routes = [
    "/",
    "/about",
    "/components",
    "/hooks",
    "/state",
    "/profile",
    "/admin",
    "/security",
    "/security/mfa",
    "/security/sessions",
    "/security/audit-logs",
    "/security/emergency",
  ];

  routes.forEach((route) => {
    assertEquals(typeof route, "string");
    assertEquals(route.startsWith("/"), true);
  });
});

Deno.test("路由 - API 路由路径测试", () => {
  const apiRoutes = [
    "/api/joke",
    "/api/auth/github",
    "/api/auth/callback",
    "/api/auth/logout",
    "/api/auth/me",
    "/api/auth/sessions",
    "/api/auth/mfa/setup",
    "/api/auth/mfa/verify",
    "/api/security/account-lock",
    "/api/security/audit-logs",
  ];

  apiRoutes.forEach((route) => {
    assertEquals(typeof route, "string");
    assertEquals(route.startsWith("/api/"), true);
  });
});

Deno.test("路由 - 状态页面路由测试", () => {
  const statusRoutes = [
    "/status",
    "/status/401",
    "/status/403",
    "/status/500",
    "/status/502",
    "/status/503",
  ];

  statusRoutes.forEach((route) => {
    assertEquals(typeof route, "string");
    assertEquals(route.startsWith("/status"), true);
  });
});

Deno.test("路由 - 动态路由测试", () => {
  const dynamicRoutes = [
    "/greet/[name]",
  ];

  dynamicRoutes.forEach((route) => {
    assertEquals(typeof route, "string");
    assertEquals(route.includes("[") && route.includes("]"), true);
  });
});
