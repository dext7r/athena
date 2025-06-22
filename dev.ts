#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import { initDevelopmentEnvironment } from "@utils/env.ts";
import config from "./fresh.config.ts";

// 初始化环境变量
await initDevelopmentEnvironment();

await dev(import.meta.url, "./main.ts", config);
