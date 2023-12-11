/**
 * @file index.ts
 * @description 应用入口
 * @since 1.0.0
 */
import { Probot, run } from "probot";

import { readBotConfig } from "./core/readBotConfig.ts";
import { runProbot } from "./core/runProbot.ts";
import { logger } from "./utils/logger.ts";

Probot.defaults(readBotConfig());

function RunApp(): void {
  // 定时，每 5min 写一次日志
  setInterval(
    () => {
      logger.log("定时器触发");
    },
    1000 * 60 * 5,
  );
  run(runProbot).catch((err) => {
    logger.log(err);
  });
}

RunApp();
