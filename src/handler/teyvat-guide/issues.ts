/**
 * @file handler/teyvat-guide/issues.ts
 * @description 原神指南仓库 issues 事件处理函数
 * @since 1.0.0
 */

import type { Context } from "probot";

import { IssueLabel, IssueState } from "./constant.ts";
import { replaceLabel } from "./utils.ts";

/**
 * @description 默认 issue 处理函数 - issue opened 事件
 * @since 1.0.0
 * @param {Context<"issues.opened">} context probot context
 * @returns {Promise<void>} void
 */
async function issuesOpened(context: Context<"issues.opened">): Promise<void> {
  const issueInfo = context.issue();
  const { data: issueAll } = await context.octokit.issues.listForRepo({
    ...issueInfo,
    state: "open",
  });
  const issueWIP = issueAll.filter((issue) => {
    return !!issue.labels.some((item) => {
      if (typeof item === "string") {
        return item === IssueLabel.WIP;
      } else if (item.name !== undefined && item.name !== null) {
        return item.name === IssueLabel.WIP;
      }
      return false;
    });
  });
  await context.octokit.issues.createComment({
    ...issueInfo,
    body: `等待处理，当前有 ${issueWIP.length} 个 issue 正在处理中，共有 ${issueAll.length} 个 issue`,
  });
  await context.octokit.issues.addLabels({
    ...issueInfo,
    labels: [IssueLabel.TODO],
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
  const replaceLabels = replaceLabel(repoLabels, IssueState.DONE);
  if (replaceLabels[0].length > 0) {
    for (const label of replaceLabels[0]) {
      await context.octokit.issues.removeLabel({
        ...issueInfo,
        name: label,
      });
    }
  }
  if (replaceLabels[1].length > 0) {
    await context.octokit.issues.addLabels({
      ...issueInfo,
      labels: [...replaceLabels[1]],
    });
  }
}

const issues = {
  opened: issuesOpened,
  closed: issuesClosed,
};

export default issues;
