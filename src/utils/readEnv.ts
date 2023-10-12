/**
 * @file src/utils/readEnv.ts
 * @description 读取环境变量
 * @since 1.0.0
 */

import path from "node:path";

import appRootPath from "app-root-path";
import { configDotenv, type DotenvParseOutput } from "dotenv";

/**
 * @description 读取环境变量，返回变量对象
 * @return {Record<string, string>} 变量对象
 */
export function readEnv(): DotenvParseOutput | undefined {
  const rootPath = appRootPath.path;
  const env = configDotenv({
    path: path.resolve(rootPath, ".env.probot"),
  });
  return env.parsed;
}
