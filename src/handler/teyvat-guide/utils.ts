/**
 * @file src/handler/teyvat-guide/utils.ts
 * @description 原神指南仓库事件处理函数工具函数
 * @since 1.0.0
 */

import { IssueLabel, IssueState } from "./constant.ts";

/**
 * @description 替换label
 * @since 1.0.0
 * @param {string[]} labels issue 中包括的 label
 * @param {IssueState} state 目标状态
 * @returns {[string[],string[]]} [需要删除的 label, 需要添加的 label]
 */
export function replaceLabel(labels: string[], state: IssueState): [string[], string[]] {
  const changeList: string[] = [IssueLabel.WIP, IssueLabel.TODO, IssueLabel.DONE];
  const stillList: string[] = [];
  labels.forEach((label) => {
    if (!changeList.includes(label)) {
      stillList.push(label);
    }
  });
  switch (state) {
    case IssueState.TODO:
      stillList.push(IssueLabel.TODO);
      break;
    case IssueState.WIP:
      stillList.push(IssueLabel.WIP);
      break;
    case IssueState.DONE:
      stillList.push(IssueLabel.DONE);
      break;
    default:
      break;
  }
  // labels -> stillList
  const deleteList = labels.filter((label) => {
    return !stillList.includes(label);
  });
  const addList = stillList.filter((label) => {
    return !labels.includes(label);
  });
  return [deleteList, addList];
}
