/**
 * @file handler/pullRequest.ts
 * @description 默认仓库 pull request 事件处理
 * @since 1.0.0
 */

import type { Context } from "probot";

import { IssueStateLabel, ISLKey } from "./constant.ts";
import defaultUtils from "./utils.ts";

/**
 * @description 默认 pullRequest 处理函数 - pull_request opened 事件
 * @since 1.0.0
 * @param {Context<"pull_request.opened">} context probot context
 * @returns {Promise<void>} void
 */
async function pullRequestOpened(context: Context<"pull_request.opened">): Promise<void> {
  // @ts-ignore-error TS2590: Expression produces a union type that is too complex to represent.
  await defaultUtils.labelCheck(context);
  // 如果 issue 没有 assignee，自动 assign 给 repo owner
  if (
    context.payload.pull_request.assignee === undefined ||
    context.payload.pull_request.assignee === null
  ) {
    await context.octokit.issues.addAssignees({
      ...context.issue(),
      assignees: [context.repo().owner],
    });
  }
  if (context.payload.pull_request.labels.length === 0) {
    await context.octokit.issues.addLabels({
      ...context.issue(),
      labels: [IssueStateLabel.TODO],
    });
  }
}

/**
 * @description 默认 pull request 处理函数 - pull request closed 事件
 * @since 1.0.0
 * @param {Context<"pull_request.closed">} context probot context
 * @returns {Promise<void>} void
 */
async function pullRequestClosed(context: Context<"pull_request.closed">): Promise<void> {
  const payload = context.payload;
  if (!payload.pull_request.merged) {
    // 不处理未合并的 PR，todo: 添加未合并的 PR 的处理
    return;
  }
  const prLabels = payload.pull_request.labels.map((item) => item.name);
  const replaceLabels = defaultUtils.getReplaceLabel(prLabels, ISLKey.DONE);
  // @ts-ignore TS2590: Expression produces a union type that is too complex to represent.
  await defaultUtils.replaceLabel(context, replaceLabels);
}

const defaultPullRequest = {
  opened: pullRequestOpened,
  closed: pullRequestClosed,
};

export default defaultPullRequest;
