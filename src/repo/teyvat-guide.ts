/**
 * @file src/repo/teyvat-guide.ts
 * @description 原神指南仓库类
 * @since 1.0.0
 */

import type { Context } from "probot";

import { BaseRepo } from "./base.ts";
import handler from "../handler/teyvat-guide/handler.ts";

/**
 * @description 原神指南仓库类
 * @since 1.0.0
 * @class TeyvatGuideRepo
 * @extends {BaseRepo}
 */
class TeyvatGuideRepo extends BaseRepo {
  /**
   * @description 构造函数
   * @since 1.0.0
   * @memberof TeyvatGuideRepo
   * @constructor
   * @param {string} [key="TeyvatGuide"] 仓库配置对应的 key 名称
   */
  constructor(key: string = "TeyvatGuide") {
    super(key);
  }

  /**
   * @func issuesOpened
   * @description issue opened 事件
   * @since 1.0.0
   * @param {Context<"issues.opened">} context probot context
   * @returns {Promise<void>} void
   */
  protected async issuesOpened(context: Context<"issues.opened">): Promise<void> {
    await handler.issues.opened(context);
  }

  /**
   * @func issuesClosed
   * @description issue closed 事件
   * @since 1.0.0
   * @param {Context<"issues.closed">} context probot context
   * @returns {Promise<void>} void
   */
  protected async issuesClosed(context: Context<"issues.closed">): Promise<void> {
    await handler.issues.closed(context);
  }

  /**
   * @func issueCommentCreated
   * @description issue comment created 事件
   * @since 1.0.0
   * @param {Context<"issue_comment.created">} context probot context
   * @returns {Promise<void>} void
   */
  protected async issueCommentCreated(context: Context<"issue_comment.created">): Promise<void> {
    await handler.issueComment.created(context, this);
  }

  /**
   * @func pullRequestOpened
   * @description pull request opened 事件
   * @since 1.0.0
   * @param {Context<"pull_request.opened">} context probot context
   * @returns {Promise<void>} void
   */
  protected async pullRequestOpened(context: Context<"pull_request.opened">): Promise<void> {
    await handler.pullRequest.opened(context, this);
  }

  /**
   * @func pullRequestClosed
   * @description pull request closed 事件
   * @since 1.0.0
   * @param {Context<"pull_request.closed">} context probot context
   * @returns {Promise<void>} void
   */
  protected async pullRequestClosed(context: Context<"pull_request.closed">): Promise<void> {
    await handler.pullRequest.closed(context);
  }

  /**
   * @func releasePublished
   * @description release published 事件
   * @since 1.0.0
   * @param {Context<"release.published">} context probot context
   * @returns {Promise<void>} void
   */
  protected async releasePublished(context: Context<"release.published">): Promise<void> {
    await handler.release.published(context);
  }
}

export const teyvatGuide = new TeyvatGuideRepo();
