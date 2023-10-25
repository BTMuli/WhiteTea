/**
 * @file src/func/pullRequest.ts
 * @description 默认 pull request 处理函数
 * @since 1.0.0
 */

import type { Context } from "probot";

import type { BaseRepo } from "../repo/base.ts";

/**
 * @description 默认 pull request 处理函数 - pull request opened 事件
 * @since 1.0.0
 * @param {Context<"pull_request.opened">} context probot context
 * @param {BaseRepo} repo 仓库类
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

const pullRequest = {
  opened: pullRequestOpened,
};

export default pullRequest;
