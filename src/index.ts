/**
 * @file index.ts
 * @description 应用入口
 * @since 1.0.0
 */

import * as process from "process";

import { Probot, run } from "probot";

import { readBotConfig } from "./core/readBotConfig.ts";
import { runProbot } from "./core/runProbot.ts";
import { writeErrLog } from "./utils/simpleLog.ts";

Probot.defaults(readBotConfig());

let tryTime = 0;

function RunApp(): void {
  run(runProbot).catch((err) => {
    writeErrLog(err);
    tryTime++;
    if (tryTime < 5) {
      RunApp();
    } else {
      // todo 发送邮件给管理员
      process.exit(1);
    }
  });
}

RunApp();
