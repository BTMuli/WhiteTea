/**
 * @file src/func/issueComment.ts
 * @description 默认 issueComment 处理函数
 * @since 1.0.0
 */

import type { Context } from "probot";

import type { BaseRepo } from "../repo/base.ts";

/**
 * @description 默认 issueComment 处理函数 - issue_comment created 事件
 * @since 1.0.0
 * @param {Context<"issue_comment.created">} context probot context
 * @param {BaseRepo} repo 仓库类
 * @returns {Promise<void>} void
 */
async function issueCommentCreated(
  context: Context<"issue_comment.created">,
  repo: BaseRepo,
): Promise<void> {
  if (context.payload.sender.id !== repo.getConfig().ownerId) {
    repo.log(
      "senderIdError",
      context.payload.sender.id.toString(),
      repo.getConfig().ownerId.toString(),
    );
    return;
  }
  const comment = context.payload.comment.body;
  const issueInfo = context.issue();
  const labels = repo.getConfig().labels;
  const issueLabels = context.payload.issue.labels;
  if (comment.startsWith("/WIP")) {
    if (
      issueLabels.some((item) => {
        return item.name === labels.Undo ?? "待处理";
      })
    ) {
      await context.octokit.issues.removeLabel({
        ...issueInfo,
        name: labels.Undo ?? "待处理",
      });
    }
    await context.octokit.issues.addLabels({
      ...issueInfo,
      labels: [labels.WIP ?? "计划中"],
    });
    return;
  }
  if (comment.startsWith("/done")) {
    await context.octokit.issues.removeLabel({
      ...issueInfo,
      name: labels.WIP ?? "计划中",
    });
    await context.octokit.issues.addLabels({
      ...issueInfo,
      labels: [labels.Done ?? "待发布"],
    });
    return;
  }
  if (comment.startsWith("/delay")) {
    await context.octokit.issues.removeLabel({
      ...issueInfo,
      name: labels.WIP ?? "计划中",
    });
    await context.octokit.issues.addLabels({
      ...issueInfo,
      labels: [labels.Undo ?? "待处理"],
    });
  }
}

const issueComment = {
  created: issueCommentCreated,
};

export default issueComment;
