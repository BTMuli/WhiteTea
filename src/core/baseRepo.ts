/**
 * @file repo/base/index.ts
 * @description 仓库类 - 基类
 * @since 1.0.0
 */

import appRootPath from "app-root-path";
import fs from "fs-extra";
import type { Context } from "probot";
import { parse } from "yaml";

import defaultHandler from "../handler/handler.ts";
import { logger } from "../utils/logger.ts";

/**
 * @description 仓库类 - 基类
 * @since 1.0.0
 * @class BaseRepo
 */
export class BaseRepo {
  /**
   * @description 仓库配置对应的 key 名称
   * @member {string}
   * @since 1.0.0
   * @default
   * @protected
   */
  protected keyName: string = "default";

  /**
   * @description 仓库配置
   * @member {MuBot.RepoClass.Config}
   * @since 1.0.0
   * @protected
   */
  protected config: MuBot.RepoClass.Config;

  /**
   * @description 构造函数
   * @since 1.0.0
   * @constructor
   * @param {string} key 仓库配置对应的 key 名称
   */
  constructor(key?: string) {
    if (key !== undefined && key !== null) {
      this.keyName = key;
    }
    this.config = this.getConfig();
  }

  /**
   * @description 获取仓库配置
   * @since 1.0.0
   * @return MuBot.RepoClass.Config 仓库配置
   */
  public getConfig(): MuBot.RepoClass.Config {
    const configPath = appRootPath.resolve("config/repo.yml");
    const configFile = fs.readFileSync(configPath, "utf8");
    const configAll: MuBot.RepoClass.ConfigAll = parse(configFile);
    return configAll[this.keyName];
  }

  /**
   * @description Log
   * @since 1.0.0
   * @param {string} message Log 信息
   * @param {string[]} args Log 参数
   * @return {void}
   */
  log(message: string, ...args: string[]): void {
    const logStr = `[${this.config.repoName}] ${message}`;
    if (args.length > 0) {
      logger.log(logStr, args.join(", "));
      return;
    }
    logger.log(logStr);
  }

  /**
   * @description 判断是否处理
   * @since 1.0.0
   * @param {Context} context Context 对象
   * @return {Promise<boolean>} 是否处理
   */
  async isHandle(context: Context): Promise<boolean> {
    // 不包含 release 事件
    if (context.isBot && context.name !== "release") {
      this.log("isBot");
      return false;
    }
    if (context.repo().owner !== this.config.ownerName) {
      this.log("ownerNameError", context.repo().owner, this.config.ownerName);
      return false;
    }
    if (context.repo().repo !== this.config.repoName) {
      this.log("repoNameError", context.repo().repo, this.config.repoName);
      return false;
    }
    return true;
  }

  /**
   * @description 事务处理 - 中转
   * @since 1.0.0
   * @param {Context} context Context 对象
   * @return {Promise<void>}
   */
  async handle(context: Context): Promise<void> {
    switch (context.name) {
      case "issues": {
        // @ts-ignore-error TS2590: Expression produces a union type that is too complex to represent.
        const issueContext = <Context<"issues">>context;
        await this.issues(issueContext);
        break;
      }
      case "issue_comment": {
        const issueCommentContext = <Context<"issue_comment">>context;
        await this.issueComment(issueCommentContext);
        break;
      }
      case "pull_request": {
        const pullRequestContext = <Context<"pull_request">>context;
        await this.pullRequest(pullRequestContext);
        break;
      }
      case "release": {
        const releaseContext = <Context<"release">>context;
        await this.release(releaseContext);
        break;
      }
      default: {
        break;
      }
    }
  }

  /**
   * @description 事务处理 - issues
   * @since 1.0.0
   * @param {Context<"issues">} context Context 对象
   * @return {Promise<void>}
   */
  private async issues(context: Context<"issues">): Promise<void> {
    const action = context.payload.action;
    this.log(`issues.${action}`, context.repo().repo, context.payload.issue.title);
    switch (action) {
      case "opened": {
        const issuesOpenedContext = <Context<"issues.opened">>context;
        await this.issuesOpened(issuesOpenedContext);
        break;
      }
      case "closed": {
        const issuesClosedContext = <Context<"issues.closed">>context;
        await this.issuesClosed(issuesClosedContext);
        break;
      }
      default: {
        this.log("issuesActionError", action);
        break;
      }
    }
  }

  /**
   * @description 事务处理 - issues.opened
   * @since 1.0.0
   * @param {Context<"issues.opened">} context Context 对象
   * @return {Promise<void>}
   */
  protected async issuesOpened(context: Context<"issues.opened">): Promise<void> {
    await defaultHandler.issues.opened(context);
  }

  /**
   * @description 事务处理 - issues.closed
   * @since 1.0.0
   * @param {Context<"issues.closed">} context Context 对象
   * @return {Promise<void>}
   */
  protected async issuesClosed(context: Context<"issues.closed">): Promise<void> {
    await defaultHandler.issues.closed(context);
  }

  /**
   * @description 事务处理 - issue_comment
   * @since 1.0.0
   * @param {Context<"issue_comment">} context Context 对象
   * @return {Promise<void>}
   */
  private async issueComment(context: Context<"issue_comment">): Promise<void> {
    const action = context.payload.action;
    this.log(
      `issue_comment.${action}`,
      context.repo().repo,
      `#${context.payload.issue.id}`,
      context.payload.comment.body,
    );
    switch (action) {
      case "created": {
        const issueCommentCreatedContext = <Context<"issue_comment.created">>context;
        await this.issueCommentCreated(issueCommentCreatedContext);
        break;
      }
      default: {
        this.log("issueCommentActionError", action);
        break;
      }
    }
  }

  /**
   * @description 事务处理 - issue_comment.created
   * @since 1.0.0
   * @param {Context<"issue_comment.created">} context Context 对象
   * @return {Promise<void>}
   */
  protected async issueCommentCreated(context: Context<"issue_comment.created">): Promise<void> {
    await defaultHandler.issueComment.created(context);
  }

  /**
   * @description 事务处理 - pull_request
   * @since 1.0.0
   * @param {Context<"pull_request">} context Context 对象
   * @return {Promise<void>}
   */
  private async pullRequest(context: Context<"pull_request">): Promise<void> {
    const action = context.payload.action;
    this.log(`pull_request.${action}`, context.repo().repo, context.payload.pull_request.title);
    switch (action) {
      case "opened": {
        const pullRequestOpenedContext = <Context<"pull_request.opened">>context;
        await this.pullRequestOpened(pullRequestOpenedContext);
        break;
      }
      case "closed": {
        const pullRequestClosedContext = <Context<"pull_request.closed">>context;
        await this.pullRequestClosed(pullRequestClosedContext);
        break;
      }
      default: {
        this.log("pullRequestActionError", action);
        break;
      }
    }
  }

  /**
   * @description 事务处理 - pull_request.opened
   * @since 1.0.0
   * @param {Context<"pull_request.opened">} context Context 对象
   * @return {Promise<void>}
   */
  protected async pullRequestOpened(context: Context<"pull_request.opened">): Promise<void> {
    await defaultHandler.pullRequest.opened(context);
  }

  /**
   * @description 事务处理 - pull_request.closed
   * @since 1.0.0
   * @param {Context<"pull_request.closed">} context Context 对象
   * @return {Promise<void>}
   */
  protected async pullRequestClosed(context: Context<"pull_request.closed">): Promise<void> {
    await defaultHandler.pullRequest.closed(context);
  }

  /**
   * @description 事务处理 - release
   * @since 1.0.0
   * @param {Context<"release">} context Context 对象
   * @return {Promise<void>}
   */
  private async release(context: Context<"release">): Promise<void> {
    const action = context.payload.action;
    this.log(`release.${action}`, context.repo().repo, context.payload.release.name);
    switch (action) {
      case "published": {
        const releasePublishedContext = <Context<"release.published">>context;
        await this.releasePublished(releasePublishedContext);
        break;
      }
      default: {
        this.log("releaseActionError", action);
        break;
      }
    }
  }

  /**
   * @description 事务处理 - release.published
   * @since 1.0.0
   * @param {Context<"release.published">} context Context 对象
   * @return {Promise<void>}
   */
  protected async releasePublished(context: Context<"release.published">): Promise<void> {
    await defaultHandler.release.published(context);
  }
}
