/**
 * @file utils/clean.ts
 * @description 清除过往 log
 * @since 1.0.0
 */

import { path } from "app-root-path";
import fs from "fs-extra";

const logDir = `${path}/logs`;
// 删除 logDir 下的所有文件
fs.removeSync(logDir);
// 创建 logDir
fs.mkdirSync(logDir);
// 创建 log 文件
const logList = ["err", "forever", "out"];
for (const log of logList) {
  const logFile = `${logDir}/${log}.log`;
  fs.createFileSync(logFile);
}
