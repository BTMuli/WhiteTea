/**
 * @file handler/default/issues.ts
 * @description 默认仓库事件 issue 处理函数
 * @since 1.0.0
 */

import type { Context } from "probot";

import { ISLKey, IssueStateLabel } from "./constant.ts";
import defaultUtils from "./utils.ts";

/**
 * @description 默认 issue 处理函数 - issue opened 事件
 * @since 1.0.0
 * @param {Context<"issues.opened">} context probot context
 * @returns {Promise<void>} void
 */
async function issuesOpened(context: Context<"issues.opened">): Promise<void> {
  // @ts-ignore-error TS2590: Expression produces a union type that is too complex to represent.
  await defaultUtils.labelCheck(context);
  // 如果没有 assignee，自动 assign 给 owner
  if (context.payload.issue.assignee === undefined || context.payload.issue.assignee === null) {
    await context.octokit.issues.addAssignees({
      ...context.issue(),
      assignees: [context.payload.issue.user.login],
    });
  }
  const issueInfo = context.issue();
  await defaultUtils.getStatus(context);
  await context.octokit.issues.addLabels({
    ...issueInfo,
    labels: [IssueStateLabel.TODO],
  });
}

/**
 * @description 默认 issue 处理函数 - issue closed 事件
 * @since 1.0.0
 * @param {Context<"issues.closed">} context probot context
 * @returns {Promise<void>} void
 */
async function issuesClosed(context: Context<"issues.closed">): Promise<void> {
  const issueInfo = context.issue();
  const repoLabels = context.payload.issue.labels?.map((item) => item.name) ?? [];
  const replaceLabels = defaultUtils.replaceLabel(repoLabels, ISLKey.DONE);
  if (replaceLabels[0].length > 0) {
    for (const label of replaceLabels[0]) {
      await context.octokit.issues.removeLabel({
        ...issueInfo,
        name: label,
      });
    }
  }
  if (replaceLabels[1].length > 0) {
    for (const label of replaceLabels[1]) {
      await context.octokit.issues.addLabels({
        ...issueInfo,
        labels: [label],
      });
    }
  }
}

const defaultIssue = {
  opened: issuesOpened,
  closed: issuesClosed,
};

export default defaultIssue;
