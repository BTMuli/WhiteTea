/**
 * @file src/handler/default/utils.ts
 * @description 默认仓库事件处理函数工具函数
 * @since 1.0.0
 */

import type { Context } from "probot";

import { type ISKType, islDetail, ISLKey, IssueStateLabel } from "./constant.ts";

/**
 * @description 替换label
 * @since 1.0.0
 * @param {string[]} labels issue 中包括的 label
 * @param {ISKType} state 目标状态
 * @returns {[string[],string[]]} [需要删除的 label, 需要添加的 label]
 */
function replaceLabelByState(labels: string[], state: ISKType): [string[], string[]] {
  const changeList: string[] = Object.values(IssueStateLabel);
  const stillList: string[] = [];
  labels.forEach((label) => {
    if (!changeList.includes(label)) {
      stillList.push(label);
    }
  });
  stillList.push(IssueStateLabel[state]);
  const deleteList = labels.filter((label) => {
    return !stillList.includes(label);
  });
  const addList = stillList.filter((label) => {
    return !labels.includes(label);
  });
  return [deleteList, addList];
}

/**
 * @description 根据 label 名称获取 label key
 * @since 1.0.0
 * @param {IssueStateLabel} label label 名称
 * @returns {IssueState} label key
 */
function getLabelKeyByName(label: IssueStateLabel): ISKType {
  switch (label) {
    case IssueStateLabel.TODO:
      return ISLKey.TODO;
    case IssueStateLabel.WIP:
      return ISLKey.WIP;
    case IssueStateLabel.DONE:
      return ISLKey.DONE;
    default:
      throw new Error("label name error");
  }
}

/**
 * @description label 前置检查
 * @since 1.0.0
 * @param {Context} context probot context
 * @return {Promise<void>} void
 */
async function labelCheckDefault(context: Context): Promise<void> {
  const repoLabels = await context.octokit.issues
    .listLabelsForRepo({
      ...context.repo(),
    })
    .then((res) => {
      return res.data.map((item) => item.name);
    });
  for (const label of Object.values(IssueStateLabel)) {
    if (!repoLabels.includes(label)) {
      const labelKey = getLabelKeyByName(label);
      await context.octokit.issues.createLabel({
        ...context.issue(),
        ...islDetail[labelKey],
      });
    }
  }
}

/**
 * @description 获取当前 WIP issue 并评论
 * @since 1.0.0
 * @param {Context} context probot context
 * @return {Promise<void>} void
 */
async function getWIPIssues(context: Context): Promise<void> {
  const issueAll = await context.octokit.issues
    .listForRepo({
      ...context.repo(),
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
    ...context.issue(),
    body: `等待处理，当前有 ${issueWIP.length} 个 issue 正在处理中，共有 ${issueAll.length} 个 issue`,
  });
}

const defaultUtils = {
  replaceLabel: replaceLabelByState,
  getLabelKey: getLabelKeyByName,
  labelCheck: labelCheckDefault,
  getStatus: getWIPIssues,
};

export default defaultUtils;
