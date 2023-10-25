/**
 * @file src/repo/teyvat-guide.ts
 * @description 原神指南仓库类
 * @since 1.0.0
 */

import type { Context } from "probot";

import { BaseRepo } from "./base.ts";
import defaultHandle from "../func/defaultHandle.ts";

/**
 * @description 原神指南仓库类
 * @since 1.0.0
 * @class TeyvatGuideRepo
 * @extends {BaseRepo}
 */
class TeyvatGuideRepo extends BaseRepo {
  /**
   * @func issuesOpened
   * @description issue opened 事件
   * @since 1.0.0
   * @param {Context<"issues.opened">} context probot context
   * @returns {Promise<void>} void
   */
  protected async issuesOpened(context: Context<"issues.opened">): Promise<void> {
    await defaultHandle.issues.opened(context, this);
  }

  /**
   * @func issuesClosed
   * @description issue closed 事件
   * @since 1.0.0
   * @param {Context<"issues.closed">} context probot context
   * @returns {Promise<void>} void
   */
  protected async issuesClosed(context: Context<"issues.closed">): Promise<void> {
    await defaultHandle.issues.closed(context, this);
  }

  /**
   * @func issueCommentCreated
   * @description issue comment created 事件
   * @since 1.0.0
   * @param {Context<"issue_comment.created">} context probot context
   * @returns {Promise<void>} void
   */
  protected async issueCommentCreated(context: Context<"issue_comment.created">): Promise<void> {
    await defaultHandle.issueComment.created(context, this);
  }

  /**
   * @func pullRequestOpened
   * @description pull request opened 事件
   * @since 1.0.0
   * @param {Context<"pull_request.opened">} context probot context
   * @returns {Promise<void>} void
   */
  protected async pullRequestOpened(context: Context<"pull_request.opened">): Promise<void> {
    await defaultHandle.pullRequest.opened(context, this);
  }

  /**
   * @func releasePublished
   * @description release published 事件
   * @since 1.0.0
   * @param {Context<"release.published">} context probot context
   * @returns {Promise<void>} void
   */
  protected async releasePublished(context: Context<"release.published">): Promise<void> {
    await defaultHandle.release.published(context, this);
  }
}

const TeyvatGuide = new TeyvatGuideRepo();

export { TeyvatGuide };
