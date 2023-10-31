/**
 * @file handler/default/handler.ts
 * @description 默认仓库事件处理函数
 * @since 1.0.0
 */

import defaultIssueComment from "./issueComment.ts";
import defaultIssue from "./issues.ts";
import defaultPullRequest from "./pullRequest.ts";

const defaultHandler = {
  issues: defaultIssue,
  issueComment: defaultIssueComment,
  pullRequest: defaultPullRequest,
};

export default defaultHandler;
