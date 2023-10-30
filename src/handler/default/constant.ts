/**
 * @file handler/default/constant.ts
 * @description 默认仓库事件处理函数常量
 * @since 1.0.0
 */

/**
 * @description issue 状态常量 - 用于 issue 处理状态
 * @since 1.0.0
 * @enum {string}
 * @property {string} WIP “计划中”状态
 * @property {string} TODO “待处理"状态
 * @property {string} DONE “待发布”状态
 * @returns {string} issue 状态
 */
export enum IssueStateLabel {
  WIP = "计划中",
  TODO = "待处理",
  DONE = "待发布",
}

/**
 * @description issue 状态常量 - key
 * @since 1.0.0
 * @enum {string}
 * @property {string} WIP “计划中”状态
 * @property {string} TODO “待处理"状态
 * @property {string} DONE “待发布”状态
 * @returns {string} issue 状态
 */
export enum ISLKey {
  WIP = "WIP",
  TODO = "TODO",
  DONE = "DONE",
}

export type ISKType = keyof typeof ISLKey;

type ISLDetail = {
  [key in ISKType]: MuBot.RepoClass.Label;
};

export const islDetail: ISLDetail = {
  TODO: {
    name: IssueStateLabel.TODO,
    color: "FFCC00",
    description: "Something to do",
  },
  WIP: {
    name: IssueStateLabel.WIP,
    color: "8BC34A",
    description: "Something in progress",
  },
  DONE: {
    name: IssueStateLabel.DONE,
    color: "1E9CEF",
    description: "Something done",
  },
};
