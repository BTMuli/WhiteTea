/**
 * @file index.ts
 * @description 应用入口
 * @since 1.0.0
 */
import * as process from "process";

import { Probot, run } from "probot";

import { readBotConfig } from "./core/readBotConfig.ts";
import { runProbot } from "./core/runProbot.ts";
import { logger } from "./utils/logger.ts";

Probot.defaults(readBotConfig());

run(runProbot).catch((err) => {
  logger.log(<string>err);
  process.exit(1);
});
