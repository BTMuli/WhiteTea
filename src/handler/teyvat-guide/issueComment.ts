/**
 * @file handler/teyvat-guide/issueComment.ts
 * @description 原神指南仓库 issueComment 事件处理函数
 * @since 1.0.0
 */

import type { Context } from "probot";

import { IssueState } from "./constant.ts";
import { replaceLabel } from "./utils.ts";
import type { BaseRepo } from "../../repo/base.ts";

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
  const issueLabels = context.payload.issue.labels.map((item) => item.name);
  let labelsReplace: [string[], string[]] = [[], []];
  if (comment.startsWith("/WIP")) {
    labelsReplace = replaceLabel(issueLabels, IssueState.TODO);
  } else if (comment.startsWith("/done")) {
    labelsReplace = replaceLabel(issueLabels, IssueState.DONE);
  } else if (comment.startsWith("/delay")) {
    labelsReplace = replaceLabel(issueLabels, IssueState.WIP);
  }
  if (labelsReplace[0].length !== 0) {
    for (const label of labelsReplace[0]) {
      await context.octokit.issues.removeLabel({
        ...issueInfo,
        name: label,
      });
    }
  }
  if (labelsReplace[1].length !== 0) {
    await context.octokit.issues.addLabels({
      ...issueInfo,
      labels: labelsReplace[1],
    });
  }
}

const issueComment = {
  created: issueCommentCreated,
};

export default issueComment;
