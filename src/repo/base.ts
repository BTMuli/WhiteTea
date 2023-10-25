/**
 * @file src/repo/base/index.ts
 * @description 仓库类 - 基类
 * @since 1.0.0
 */

import * as console from "console";

import appRootPath from "app-root-path";
import fs from "fs-extra";
import type { Context } from "probot";
import { parse } from "yaml";

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
      console.log(logStr, args);
      return;
    }
    console.log(logStr);
  }

  /**
   * @description 获取仓库名称
   * @since 1.0.0
   * @return {string} 仓库名称
   */
  getRepoName(): string {
    return this.config.repoName;
  }

  /**
   * @description 判断是否处理
   * @since 1.0.0
   * @param {Context} context Context 对象
   * @return {Promise<boolean>} 是否处理
   */
  async isHandle(context: Context): Promise<boolean> {
    if (context.isBot) {
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
   * @description 事物处理 - 中转
   * @since 1.0.0
   * @param {Context} context Context 对象
   * @return {Promise<void>}
   */
  async handle(context: Context): Promise<void> {
    switch (context.name) {
      case "issues": {
        this.log("issuesHandle");
        // @ts-expect-error TS2590: Expression produces a union type that is too complex to represent.
        const issueContext = <Context<"issues">>context;
        await this.issues(issueContext);
        break;
      }
      case "issue_comment": {
        this.log("issueCommentHandle");
        const issueCommentContext = <Context<"issue_comment">>context;
        await this.issueComment(issueCommentContext);
        break;
      }
      default: {
        break;
      }
    }
  }

  /**
   * @description 事物处理 - issues
   * @since 1.0.0
   * @param {Context<"issues">} context Context 对象
   * @return {Promise<void>}
   */
  private async issues(context: Context<"issues">): Promise<void> {
    if (context.payload.action === "opened") {
      const issuesOpenedContext = <Context<"issues.opened">>context;
      await this.issuesOpened(issuesOpenedContext);
    }
  }

  /**
   * @description 事物处理 - issues.opened
   * @since 1.0.0
   * @param {Context<"issues.opened">} context Context 对象
   * @return {Promise<void>}
   */
  protected async issuesOpened(context: Context<"issues.opened">): Promise<void> {
    this.log(String(context.payload.issue.id));
  }

  /**
   * @description 事物处理 - issue_comment
   * @since 1.0.0
   * @param {Context<"issue_comment">} context Context 对象
   * @return {Promise<void>}
   */
  private async issueComment(context: Context<"issue_comment">): Promise<void> {
    if (context.payload.action === "created") {
      const issueCommentCreatedContext = <Context<"issue_comment.created">>context;
      await this.issueCommentCreated(issueCommentCreatedContext);
    } else {
      this.log("issueCommentActionError", context.payload.action);
    }
  }

  /**
   * @description 事物处理 - issue_comment.created
   * @since 1.0.0
   * @param {Context<"issue_comment.created">} context Context 对象
   * @return {Promise<void>}
   */
  protected async issueCommentCreated(context: Context<"issue_comment.created">): Promise<void> {
    this.log(context.payload.comment.body);
  }
}
