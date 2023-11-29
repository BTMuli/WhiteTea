/**
 * @file index.ts
 * @description 日志记录
 * @since 1.0.0
 */

import path from "node:path";

import appRootPath from "app-root-path";
import fs from "fs-extra";

/**
 * @description 写入时间及报错
 * @since 1.0.0
 * @param {any} error
 * @return {void}
 */
export function writeErrLog(error: any): void {
  const divider = "===========================\n";
  const rootPath = appRootPath.path;
  const logFilePath = path.resolve(rootPath, "logs", "error.log");
  if (!fs.existsSync(logFilePath)) {
    fs.createFileSync(logFilePath);
  }
  fs.appendFileSync(logFilePath, divider);
  const time = new Date().toLocaleString() + "\n";
  fs.appendFileSync(logFilePath, time);
  fs.appendFileSync(logFilePath, `${error}\n`);
}
