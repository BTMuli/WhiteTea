/**
 * @file src/handler/default/issue_comment.ts
 * @description 默认仓库事件 issue_comment 处理函数
 * @since 1.0.0
 */

import type { Context } from "probot";

import { ISLKey, IssueStateLabel } from "./constant.ts";
import defaultUtils from "./utils.ts";

/**
 * @description 默认 issueComment 处理函数 - issue_comment created 事件
 * @since 1.0.0
 * @param {Context<"issue_comment.created">} context probot context
 * @returns {Promise<void>} void
 */
async function issueCommentCreated(context: Context<"issue_comment.created">): Promise<void> {
  // @ts-ignore-error TS2590: Expression produces a union type that is too complex to represent.
  await defaultUtils.labelCheck(context);
  // 如果 issue 没有 assignee，自动 assign 给 repo owner
  if (context.payload.issue.assignee === undefined || context.payload.issue.assignee === null) {
    await context.octokit.issues.addAssignees({
      ...context.issue(),
      assignees: [context.repo().owner],
    });
  }
  if (context.payload.issue.labels.length === 0) {
    await context.octokit.issues.addLabels({
      ...context.issue(),
      labels: [IssueStateLabel.TODO],
    });
  }
  // 根据 comment 内容修改 issue label
  const comment = context.payload.comment.body;
  const issueLabels = context.payload.issue.labels.map((item) => item.name);
  let labelsReplace: [string[], string[]] = [[], []];
  if (comment.startsWith("/WIP")) {
    labelsReplace = defaultUtils.getReplaceLabel(issueLabels, ISLKey.TODO);
  } else if (comment.startsWith("/done")) {
    labelsReplace = defaultUtils.getReplaceLabel(issueLabels, ISLKey.DONE);
  } else if (comment.startsWith("/delay")) {
    labelsReplace = defaultUtils.getReplaceLabel(issueLabels, ISLKey.WIP);
  } else if (comment.startsWith("/status")) {
    await defaultUtils.getStatus(context);
  }
  await defaultUtils.replaceLabel(context, labelsReplace);
}

const defaultIssueComment = {
  created: issueCommentCreated,
};

export default defaultIssueComment;
