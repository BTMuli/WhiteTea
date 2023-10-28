/**
 * @file handler/teyvat-guide/constant.ts
 * @description 原神指南仓库事件处理函数常量
 * @since 1.0.0
 */

/**
 * @description label 常量
 * @since 1.0.0
 * @enum {string}
 * @property {string} WIP “计划中”标签
 * @property {string} TODO “待处理"标签
 * @property {string} DONE “待发布”标签
 * @returns {string} label
 */
export enum IssueLabel {
  WIP = "计划中",
  TODO = "待处理",
  DONE = "待发布",
}

/**
 * @description issue 状态常量
 * @since 1.0.0
 * @enum {string}
 * @property {string} WIP “计划中”状态
 * @property {string} TODO “待处理"状态
 * @property {string} DONE “待发布”状态
 * @returns {string} issue 状态
 */
export enum IssueState {
  WIP = "WIP",
  TODO = "TODO",
  DONE = "DONE",
}
