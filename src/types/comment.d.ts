/**
 * @file src/types/comment.d.ts
 * @description issue comment 事件类型
 * @since 1.0.0
 */

/**
 * @description comment namespace
 * @since 1.0.0
 * @namespace MuBot.Comment
 * @memberof MuBot.Common
 */
declare namespace MuBot.Comment {
  /**
   * @description issue comment 数据结构
   * @since 1.0.0
   * @interface IssueComment
   * @extends {MuBot.Payload.FullData}
   * @property {IssuePayload} payload 事件 payload
   * @return IssueComment
   */
  interface IssueComment extends MuBot.Payload.FullData {
    payload: IssuePayload;
  }

  /**
   * @description issue comment payload 数据结构
   * @since 1.0.0
   * @interface IssuePayload
   * @property {string} action 事件动作
   * @property {MuBot.Common.Issue} issue issue 信息
   * @property {MuBot.Common.Comment} comment comment 信息
   * @property {MuBot.Common.Repository} repository 仓库信息
   * @property {MuBot.Common.User} sender 发送者信息
   * @property {MuBot.Common.Installation} installation 安装信息
   * @return IssuePayload
   */
  interface IssuePayload {
    action: string;
    issue: MuBot.Common.Issue;
    comment: MuBot.Common.Comment;
    repository: MuBot.Common.Repository;
    sender: MuBot.Common.User;
    installation: MuBot.Common.Installation;
  }
}
