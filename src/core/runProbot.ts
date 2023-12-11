/**
 * @file src/core/runProbot.ts
 * @description Probot 转换器
 * @since 1.0.0
 */

import type { Context, Probot } from "probot";

import { BaseRepo } from "./baseRepo.ts";

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
  await defaultRepo.handle(context);
}

/**
 * @description 事件操作中转
 * @since 1.0.0
 * @param {Probot} app Probot 实例
 * @return {void}
 */
export function runProbot(app: Probot): void {
  app.on("push", async (context) => {
    context.log.info("push");
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
}
