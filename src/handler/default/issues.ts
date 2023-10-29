/**
 * @file handler/default/issues.ts
 * @description 默认仓库事件 issue 处理函数
 * @since 1.0.0
 */

import type { Context } from "probot";

import { islDetail, ISLKey, IssueStateLabel } from "./constant.ts";
import defaultUtils from "./utils.ts";

/**
 * @description 默认 issue 处理函数 - issue opened 事件
 * @since 1.0.0
 * @param {Context<"issues.opened">} context probot context
 * @returns {Promise<void>} void
 */
async function issuesOpened(context: Context<"issues.opened">): Promise<void> {
  const repoLabels = await context.octokit.issues
    .listLabelsForRepo({
      ...context.repo(),
    })
    .then((res) => {
      return res.data.map((item) => item.name);
    });
  for (const label of Object.values(IssueStateLabel)) {
    if (!repoLabels.includes(label)) {
      const labelKey = defaultUtils.getLabelKey(label);
      await context.octokit.issues.createLabel({
        ...context.issue(),
        ...islDetail[labelKey],
      });
    }
  }
  const issueInfo = context.issue();
  const issueAll = await context.octokit.issues
    .listForRepo({
      ...issueInfo,
      state: "open",
    })
    .then((res) => {
      return res.data;
    });
  const issueWIP = issueAll.filter((issue) => {
    return !!issue.labels.some((item) => {
      if (typeof item === "string") {
        return item === IssueStateLabel.WIP;
      } else if (item.name !== undefined && item.name !== null) {
        return item.name === IssueStateLabel.WIP;
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
