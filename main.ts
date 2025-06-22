import { start } from "fresh";
import { initDevelopmentEnvironment } from "@utils/env.ts";
import config from "./fresh.config.ts";
import manifest from "./fresh.gen.ts";

// 初始化环境变量
await initDevelopmentEnvironment();

await start(manifest, config);
