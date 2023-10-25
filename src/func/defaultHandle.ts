/**
 * @file src/func/index.ts
 * @description 默认事件处理函数
 * @since 1.0.0
 */

import issueComment from "./issueComment.ts";
import issues from "./issues.ts";

const defaultHandle = {
  issues,
  issueComment,
};

export default defaultHandle;
