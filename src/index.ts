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

run(runProbot)
  .then(() =>
    // 定时，每 5min 执行一次
    setInterval(
      () => {
        logger.log("定时任务");
      },
      5 * 60 * 1000,
    ),
  )
  .catch((err) => {
    logger.log(<string>err);
    process.exit(1);
  });
