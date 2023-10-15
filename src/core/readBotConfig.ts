/**
 * @file src/utils/readConfig.ts
 * @description 读取配置文件
 * @since 1.0.0
 */

import path from "node:path";

import appRootPath from "app-root-path";
import { configDotenv, type DotenvParseOutput } from "dotenv";
import type { Options as ProbotOptions } from "probot";

/**
 * @description 读取环境变量，返回变量对象
 * @since 1.0.0
 * @return {Record<string, string>} 变量对象
 */
export function readBotEnv(): DotenvParseOutput | undefined {
  const rootPath = appRootPath.path;
  const env = configDotenv({
    path: path.resolve(rootPath, ".env.probot"),
  });
  return env.parsed;
}

/**
 * @description 读取配置文件，返回 Probot 配置对象
 * @since 1.0.0
 * @return {ProbotOptions} Probot 配置对象
 */
export function readBotConfig(): ProbotOptions {
  const env = readBotEnv();
  return {
    privateKey: env?.PRIVATE_KEY,
    githubToken: env?.GITHUB_TOKEN,
    appId: env?.APP_ID,
    secret: env?.WEBHOOK_SECRET,
    logLevel: <"trace" | "debug" | "info" | "warn" | "error" | "fatal">env?.LOG_LEVEL,
    port: isNaN(Number(env?.PORT)) ? 3000 : Number(env?.PORT),
  };
}
