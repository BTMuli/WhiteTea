/**
 * @file utils/logger.ts
 * @desc 日志记录
 * @since 1.0.0
 */

import log4js from "log4js";

const logConfig: log4js.Configuration = {
  appenders: {
    console: {
      type: "console",
    },
    file: {
      type: "dateFile",
      filename: "logs/log",
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true,
    },
  },
  categories: {
    default: {
      appenders: ["console", "file"],
      level: "debug",
    },
  },
};

log4js.configure(logConfig);

export const logger = log4js.getLogger();
