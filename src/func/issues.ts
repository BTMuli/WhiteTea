/**
 * @file src/func/issuesHandle.ts
 * @description 默认 issue 处理函数
 * @since 1.0.0
 */

import type { Context } from "probot";

import type { BaseRepo } from "../repo/base.ts";

/**
 * @description 默认 issue 处理函数 - issue opened 事件
 * @since 1.0.0
 * @param {Context<"issues.opened">} context probot context
 * @param {BaseRepo} repo 仓库类
 * @returns {Promise<void>} void
 */
async function issuesOpened(context: Context<"issues.opened">, repo: BaseRepo): Promise<void> {
  const issueInfo = context.issue();
  const { data: issueAll } = await context.octokit.issues.listForRepo({
    ...issueInfo,
    state: "open",
  });
  const labelWIP = repo.getConfig().labels.WIP ?? "计划中";
  const labelUndo = repo.getConfig().labels.Undo ?? "待处理";
  const issueWIP = issueAll.filter((issue) => {
    return !!issue.labels.some((item) => {
      if (typeof item === "string") {
        return item === labelWIP;
      } else if (item.name !== undefined && item.name !== null) {
        return item.name.includes(labelWIP);
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
    labels: [labelUndo],
  });
}

/**
 * @description 默认 issue 处理函数 - issue closed 事件
 * @since 1.0.0
 * @param {Context<"issues.closed">} context probot context
 * @param {BaseRepo} repo 仓库类
 * @returns {Promise<void>} void
 */
async function issuesClosed(context: Context<"issues.closed">, repo: BaseRepo): Promise<void> {
  const issueInfo = context.issue();
  const repoLabels = context.payload.issue.labels;
  const labels = repo.getConfig().labels;
  if (repoLabels === undefined) return;
  if (
    repoLabels.some((item) => {
      return item.name === labels.WIP ?? "计划中";
    })
  ) {
    await context.octokit.issues.removeLabel({
      ...issueInfo,
      name: labels.WIP ?? "计划中",
    });
    await context.octokit.issues.addLabels({
      ...issueInfo,
      labels: [labels.Done ?? "待发布"],
    });
  }
}

const issues = {
  opened: issuesOpened,
  closed: issuesClosed,
};

export default issues;
