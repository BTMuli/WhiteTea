/**
 * @file handler/teyvat-guide/index.ts
 * @description 原神指南仓库事件处理函数
 * @since 1.0.0
 */

import pullRequest from "./pullRequest.ts";
import release from "./release.ts";

const teyvatGuideHandler = {
  pullRequest,
  release,
};

export default teyvatGuideHandler;
