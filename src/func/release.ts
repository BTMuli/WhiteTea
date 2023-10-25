/**
 * @file src/func/release.ts
 * @description 默认 release 处理函数
 * @since 1.0.0
 */

import type { Context } from "probot";

import type { BaseRepo } from "../repo/base.ts";

/**
 * @description 默认 release 处理函数 - release published 事件
 * @since 1.0.0
 * @param {Context<"release.published">} context probot context
 * @param {BaseRepo} repo 仓库类
 * @returns {Promise<void>} void
 */
async function releasePublished(
  context: Context<"release.published">,
  repo: BaseRepo,
): Promise<void> {
  // 查找所有关闭且包含待发布标签的 issue
  const { data: issueAll } = await context.octokit.issues.listForRepo({
    ...context.repo(),
    state: "closed",
  });
  const labelDone = repo.getConfig().labels.Done ?? "待发布";
  const issueDone = issueAll.filter((issue) => {
    return !!issue.labels.some((item) => {
      if (typeof item === "string") {
        return item === labelDone;
      } else if (item.name !== undefined && item.name !== null) {
        return item.name.includes(labelDone);
      }
      return false;
    });
  });
  const issueComment = `该 issue 已在 [${context.payload.release.name}](${context.payload.release.html_url}) 中解决。`;
  // 遍历 issue，删除待发布标签
  for (const issue of issueDone) {
    await context.octokit.issues.removeLabel({
      ...context.repo(),
      issue_number: issue.number,
      name: labelDone,
    });
    await context.octokit.issues.createComment({
      ...context.repo(),
      issue_number: issue.number,
      body: issueComment,
    });
  }
  // 获取所有 close 的 pr
  const { data: prAll } = await context.octokit.pulls.list({
    ...context.repo(),
    state: "closed",
  });
  const prDone = prAll.filter((pr) => {
    return !!pr.labels.some((item) => {
      if (typeof item === "string") {
        return item === labelDone;
      } else if (item.name !== undefined && item.name !== null) {
        return item.name.includes(labelDone);
      }
      return false;
    });
  });
  const prComment = `该 pr 已在 [${context.payload.release.name}](${context.payload.release.html_url}) 中发布。`;
  // 遍历 pr，删除待发布标签
  for (const pr of prDone) {
    await context.octokit.issues.removeLabel({
      ...context.repo(),
      issue_number: pr.number,
      name: labelDone,
    });
    await context.octokit.issues.createComment({
      ...context.repo(),
      issue_number: pr.number,
      body: prComment,
    });
  }
}

const release = {
  published: releasePublished,
};

export default release;
