/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import { initDevelopmentEnvironment } from "@utils/env.ts";
import config from "./fresh.config.ts";
import manifest from "./fresh.gen.ts";

// 初始化环境变量
await initDevelopmentEnvironment();

await start(manifest, config);
