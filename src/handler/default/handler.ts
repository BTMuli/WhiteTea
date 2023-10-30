/**
 * @file handler/default/handler.ts
 * @description 默认仓库事件处理函数
 * @since 1.0.0
 */

import defaultIssueComment from "./issueComment.ts";
import defaultIssue from "./issues.ts";

const defaultHandler = {
  issues: defaultIssue,
  issueComment: defaultIssueComment,
};

export default defaultHandler;