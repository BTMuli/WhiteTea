/**
 * @file src/handler/teyvat-guide/pullRequest.ts
 * @description 原神指南仓库 pull request 事件处理函数
 * @since 1.0.0
 */

import type { Context } from "probot";

import { IssueState } from "./constant.ts";
import { replaceLabel } from "./utils.ts";
import type { BaseRepo } from "../../repo/base.ts";

/**
 * @description 默认 pull request 处理函数 - pull request opened 事件
 * @since 1.0.0
 * @param {Context<"pull_request.opened">} context probot context
 * @param {TeyvatGuideRepo} repo 仓库类
 * @returns {Promise<void>} void
 */
async function pullRequestOpened(
  context: Context<"pull_request.opened">,
  repo: BaseRepo,
): Promise<void> {
  const pullRequestInfo = context.issue();
  const owner = repo.getConfig().ownerName;
  if (owner !== undefined && owner !== null) {
    // 添加 assignees
    await context.octokit.issues.addAssignees({
      ...pullRequestInfo,
      assignees: [owner],
    });
    // 添加 reviewers
    await context.octokit.pulls.requestReviewers({
      owner: pullRequestInfo.owner,
      repo: pullRequestInfo.repo,
      pull_number: pullRequestInfo.issue_number,
      reviewers: [owner],
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
  const replaceLabels = replaceLabel(prLabels, IssueState.DONE);
  if (replaceLabels[0].length > 0) {
    for (const label of replaceLabels[0]) {
      await context.octokit.issues.removeLabel({
        ...context.issue(),
        name: label,
      });
    }
  }
  if (replaceLabels[1].length > 0) {
    await context.octokit.issues.addLabels({
      ...context.issue(),
      labels: [...replaceLabels[1]],
    });
  }
}

const pullRequest = {
  opened: pullRequestOpened,
  closed: pullRequestClosed,
};

export default pullRequest;
