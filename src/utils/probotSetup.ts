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
    console.log(context.payload);
    await issuesOpened(context);
  });
  app.on("issue_comment", async (context) => {
    console.log(context.payload);
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
  const issueComment = context.issue({
    body: "Thanks for opening this issue!",
  });
  await context.octokit.issues.createComment(issueComment);
}

/**
 * @description issue_comment.created 事件操作
 * @since 1.0.0
 * @param {Context} context Context 对象
 * @return {Promise<void>}
 */
async function issueComment(context: Context): Promise<void> {
  const issueInfo = context.issue();
  const commentPayload = <MuBot.Comment.IssueCommentPayload>context.payload;
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
  if (comment.startsWith("/label")) {
    const labels = comment.split(" ");
    labels.shift();
    await context.octokit.issues.addLabels({
      ...issueInfo,
      labels,
    });
  }
}
