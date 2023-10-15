/**
 * @file index.ts
 * @description 应用入口
 * @since 1.0.0
 */

import process from "node:process";

import { Probot, run } from "probot";

import { readBotConfig } from "./core/readBotConfig.ts";
import { runProbot } from "./core/runProbot.ts";

Probot.defaults(readBotConfig());

run(runProbot).catch((err) => {
  console.error(err);
  process.exit(1);
});
