/**
 * @file index.ts
 * @description 应用入口
 * @since 1.0.0
 */
import process from "process";

import { Probot, run } from "probot";

import { readBotConfig } from "./core/readBotConfig.ts";
import { runProbot } from "./core/runProbot.ts";
import { logger } from "./utils/logger.ts";

Probot.defaults(readBotConfig());

function RunApp(): void {
  run(runProbot).catch((err) => {
    logger.log(err);
    process.exit(1);
  });
}

RunApp();
