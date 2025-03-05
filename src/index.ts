/**
 * @file index.ts
 * @description 应用入口
 * @since 1.1.0
 */

import { Probot, run } from "probot";

import { readBotConfig } from "./core/readBotConfig.ts";
import { runProbot } from "./core/runProbot.ts";

Probot.defaults(readBotConfig());

await run(runProbot);
