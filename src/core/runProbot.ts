/**
 * @file src/core/runProbot.ts
 * @description Probot 转换器
 * @since 1.0.0
 */

import type { Context, Probot } from "probot";

import { BaseRepo } from "./baseRepo.ts";
import { logger } from "../utils/logger.ts";

const defaultRepo = new BaseRepo();

// const repoList: BaseRepo[] = [];

/**
 * @description 事物处理
 * @since 1.0.0
 * @param {Context} context Probot 上下文
 * @return {Promise<void>} 无返回值
 */
async function contextHandle(context: Context): Promise<void> {
  // for (const repo of repoList) {
  //   if (await repo.isHandle(context)) {
  //     repo.log("isHandle", context.name);
  //     await repo.handle(context);
  //     return;
  //   }
  // }
  // 运行的 bot 操作
  const whiteName = ["pull_request", "release"];
  if (context.isBot && !whiteName.includes(context.name)) {
    defaultRepo.log("isBot", context.name);
    return;
  }
  await defaultRepo.handle(context);
}

/**
 * @description 事件操作中转
 * @since 1.0.0
 * @param {Probot} app Probot 实例
 * @return {void}
 */
export function runProbot(app: Probot): void {
  logger.log("Probot is running...");
  app.onAny((context) => {
    logger.log("[onAny]", context.name);
  });
  app.on("push", (context) => {
    context.log.info("push");
    logger.log("info", "push", context.repo().repo, context.payload.commits.pop()?.message);
  });
  app.on("issues", async (context) => {
    await contextHandle(context);
  });
  app.on("issue_comment", async (context) => {
    await contextHandle(context);
  });
  app.on("pull_request", async (context) => {
    await contextHandle(context);
  });
  app.on("release", async (context) => {
    await contextHandle(context);
  });
  app.onError((context) => {
    logger.error("[onErr]", context.event, context.message);
  });
}
