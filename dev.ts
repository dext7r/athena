#!/usr/bin/env -S deno run -A --watch=static/,routes/

import { tailwind } from "@fresh/plugin-tailwind";
import { initDevelopmentEnvironment } from "@utils/env.ts";
import { Builder } from "fresh/dev";
import { app } from "./main.ts";

// 初始化环境变量
await initDevelopmentEnvironment();

// Pass development only configuration here
const builder = new Builder({ target: "safari12" });

// Configure Tailwind plugin for development
tailwind(builder, app, {});

// Create optimized assets for the browser when
// running `deno run -A dev.ts build`
if (Deno.args.includes("build")) {
  await builder.build(app);
} else {
  // ...otherwise start the development server
  await builder.listen(app);
}
