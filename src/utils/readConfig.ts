/**
 * @file src/utils/readConfig.ts
 * @description 读取配置文件
 * @since 1.0.0
 */

import {Options as ProbotOptions} from "probot";
import {readEnv} from "./readEnv";


/**
 * @description 读取配置文件，返回 Probot 配置对象
 * @return {ProbotOptions} Probot 配置对象
 */
export function readConfig(): ProbotOptions {
    const env = readEnv();
    return {
        privateKey: env?.PRIVATE_KEY,
        githubToken: env?.GITHUB_TOKEN,
        appId: env?.APP_ID,
        secret: env?.WEBHOOK_SECRET,
        logLevel: env?.LOG_LEVEL as "trace" | "debug" | "info" | "warn" | "error" | "fatal",
        port: isNaN(Number(env?.PORT)) ? 3000 : Number(env?.PORT),
    };
}