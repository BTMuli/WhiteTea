/**
 * @file handler/release.ts
 * @description 默认仓库 release 事件处理函数
 * @since 1.0.0
 */

import type { Context } from "probot";

import { IssueStateLabel } from "./constant.ts";

/**
 * @description 默认仓库 release 事件处理函数 - published
 * @since 1.0.0
 * @param {Context<"release.published">} context probot context
 * @returns {Promise<void>} void
 */
async function releasePublished(context: Context<"release.published">): Promise<void> {
  const { data: issueAllClosed } = await context.octokit.issues.listForRepo({
    ...context.repo(),
    state: "closed",
  });
  const issueComment = `该 issue 已在 [${context.payload.release.name}](${context.payload.release.html_url}) 中解决。`;
  for (const issue of issueAllClosed) {
    const issueLabels = issue.labels.map((label) => {
      if (typeof label === "string") {
        return label;
      } else {
        return label.name;
      }
    });
    if (issueLabels.includes(IssueStateLabel.DONE)) {
      await context.octokit.issues.createComment({
        ...context.repo(),
        issue_number: issue.number,
        body: issueComment,
      });
      await context.octokit.issues.removeLabel({
        ...context.repo(),
        issue_number: issue.number,
        name: IssueStateLabel.DONE,
      });
    }
  }
  const { data: prAllClosed } = await context.octokit.pulls.list({
    ...context.repo(),
    state: "closed",
  });
  const prComment = `该 pr 已在 [${context.payload.release.name}](${context.payload.release.html_url}) 中发布。`;
  for (const pr of prAllClosed) {
    const prLabels = pr.labels.map((label) => {
      return label.name;
    });
    if (prLabels.includes(IssueStateLabel.DONE)) {
      await context.octokit.issues.removeLabel({
        ...context.repo(),
        issue_number: pr.number,
        name: IssueStateLabel.DONE,
      });
      await context.octokit.issues.createComment({
        ...context.repo(),
        issue_number: pr.number,
        body: prComment,
      });
    }
  }
}

const defaultRelease = {
  published: releasePublished,
};

export default defaultRelease;
