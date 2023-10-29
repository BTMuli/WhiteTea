/**
 * @file src/handler/default/utils.ts
 * @description 默认仓库事件处理函数工具函数
 * @since 1.0.0
 */

import { type ISKType, ISLKey, IssueStateLabel } from "./constant.ts";

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

const defaultUtils = {
  replaceLabel: replaceLabelByState,
  getLabelKey: getLabelKeyByName,
};

export default defaultUtils;
