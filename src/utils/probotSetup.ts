/**
 * @file src/utils/probotSetup.ts
 * @description 事件操作
 * @since 1.0.0
 */

import type { Context, Probot } from "probot";

import { Constant } from "../tools/Constant.ts";

/**
 * @description 事件操作中转
 * @param {Probot} app Probot 实例
 * @return {void}
 */
export function probotSetup(app: Probot): void {
  app.on("issues.opened", async (context) => {
    await issuesOpened(context);
  });
  app.on("issue_comment", async (context) => {
    await issueComment(context);
  });
}

/**
 * @description issues.opened 事件操作
 * @since 1.0.0
 * @param {Context} context Context 对象
 * @return {Promise<void>}
 */
async function issuesOpened(context: Context): Promise<void> {
  const issueInfo = context.issue();
  const issuePayload = <MuBot.Comment.IssuePayload>context.payload;
  if (issuePayload.sender.id === Constant.User.Bot) {
    return;
  }
  const { data: issues } = await context.octokit.issues.listForRepo({
    ...issueInfo,
    state: "open",
  });
  const issueWIP = issues.filter((item) => item.labels.includes("计划中")).length;
  const issueTotal = issues.length;
  await context.octokit.issues.addLabels({
    ...issueInfo,
    labels: ["待处理"],
  });
  await context.octokit.issues.createComment({
    ...issueInfo,
    body: `等待处理，当前有 ${issueWIP} 个 issue 正在处理中，共有 ${issueTotal} 个 issue`,
  });
}

/**
 * @description issue_comment.created 事件操作
 * @since 1.0.0
 * @param {Context} context Context 对象
 * @return {Promise<void>}
 */
async function issueComment(context: Context): Promise<void> {
  const issueInfo = context.issue();
  const commentPayload = <MuBot.Comment.IssuePayload>context.payload;
  if (commentPayload.sender.id === Constant.User.Bot) {
    return;
  }
  const comment = commentPayload.comment.body;
  if (commentPayload.sender.id === Constant.User.Admin) {
    await operAdminComment(context, issueInfo, comment);
  }
}

/**
 * @description 处理管理员评论
 * @since 1.0.0
 * @param {Context} context Context 对象
 * @param {Context} issueInfo issue 信息
 * @param {string} comment 评论内容
 * @return {Promise<void>}
 */
async function operAdminComment(context: Context, issueInfo: any, comment: string): Promise<void> {
  if (comment.startsWith("/WIP")) {
    await context.octokit.issues.removeLabel({
      ...issueInfo,
      name: "待处理",
    });
    await context.octokit.issues.addLabels({
      ...issueInfo,
      labels: ["计划中"],
    });
  } else if (comment.startsWith("/done")) {
    await context.octokit.issues.removeLabel({
      ...issueInfo,
      name: "计划中",
    });
    await context.octokit.issues.addLabels({
      ...issueInfo,
      labels: ["待发布"],
    });
  } else if (comment.startsWith("/delay")) {
    await context.octokit.issues.removeLabel({
      ...issueInfo,
      name: "计划中",
    });
    await context.octokit.issues.addLabels({
      ...issueInfo,
      labels: ["待处理"],
    });
  }
}
