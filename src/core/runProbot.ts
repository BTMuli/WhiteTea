/**
 * @file src/core/runProbot.ts
 * @description Probot 转换器
 * @since 1.0.0
 */

import type { Context, Probot } from "probot";

import type { BaseRepo } from "../repo/base.ts";
import { TeyvatGuide } from "../repo/teyvat-guide.ts";

/**
 * @description 事物处理
 * @since 1.0.0
 * @param {BaseRepo[]} repos 仓库类列表
 * @param {Context} context Probot 上下文
 * @return {Promise<void>} 无返回值
 */
async function contextHandle(repos: BaseRepo[], context: Context): Promise<void> {
  for (const repo of repos) {
    if (await repo.isHandle(context)) {
      await repo.handle(context);
      return;
    }
  }
}

/**
 * @description 事件操作中转
 * @since 1.0.0
 * @param {Probot} app Probot 实例
 * @return {void}
 */
export function runProbot(app: Probot): void {
  const repos: BaseRepo[] = [TeyvatGuide];
  app.on("issues", async (context) => {
    await contextHandle(repos, context);
  });
  app.on("issue_comment", async (context) => {
    await contextHandle(repos, context);
  });
}
