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
  protected getConfig(): MuBot.RepoClass.Config {
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
      case "issues":
        this.log("issuesHandle");
        // @ts-expect-error TS2590: Expression produces a union type that is too complex to represent.
        await this.issues(context);
        break;
      case "issue_comment":
        this.log("issueCommentHandle");
        await this.issueComment(context);
        break;
      default:
        break;
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
      await this.issuesOpened(context);
    }
  }

  /**
   * @description 事物处理 - issues.opened
   * @since 1.0.0
   * @param {Context<"issues.opened">} context Context 对象
   * @return {Promise<void>}
   */
  private async issuesOpened(context: Context<"issues.opened">): Promise<void> {
    const issueInfo = context.issue();
    const { data: issueAll } = await context.octokit.issues.listForRepo({
      ...issueInfo,
      state: "open",
    });
    const labelWIP = this.config.labels.WIP ?? "计划中";
    const issueWIP = issueAll.filter((issue) => {
      return !!issue.labels.some((item) => {
        if (typeof item === "string") {
          return item === labelWIP;
        } else if (item.name !== undefined && item.name !== null) {
          return item.name.includes(labelWIP);
        }
        return false;
      });
    });
    await context.octokit.issues.createComment({
      ...issueInfo,
      body: `等待处理，当前有 ${issueWIP.length} 个 issue 正在处理中，共有 ${issueAll.length} 个 issue`,
    });
  }

  /**
   * @description 事物处理 - issue_comment
   * @since 1.0.0
   * @param {Context<"issue_comment">} context Context 对象
   * @return {Promise<void>}
   */
  private async issueComment(context: Context<"issue_comment">): Promise<void> {
    if (context.payload.action === "created") {
      await this.issueCommentCreated(context);
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
  private async issueCommentCreated(context: Context<"issue_comment.created">): Promise<void> {
    if (context.payload.sender.id !== this.config.ownerId) {
      this.log(
        "senderIdError",
        context.payload.sender.id.toString(),
        this.config.ownerId.toString(),
      );
      return;
    }
    const comment = context.payload.comment.body;
    const issueInfo = context.issue();
    const labelWIP = this.config.labels.WIP ?? "计划中";
    const labelDone = this.config.labels.Done ?? "待发布";
    const labelUndo = this.config.labels.Undo ?? "待处理";
    if (comment.startsWith("/WIP")) {
      await context.octokit.issues.removeLabel({
        ...issueInfo,
        name: labelUndo,
      });
      await context.octokit.issues.addLabels({
        ...issueInfo,
        labels: [labelWIP],
      });
    } else if (comment.startsWith("/done")) {
      await context.octokit.issues.removeLabel({
        ...issueInfo,
        name: labelWIP,
      });
      await context.octokit.issues.addLabels({
        ...issueInfo,
        labels: [labelDone],
      });
    } else if (comment.startsWith("/delay")) {
      await context.octokit.issues.removeLabel({
        ...issueInfo,
        name: labelWIP,
      });
      await context.octokit.issues.addLabels({
        ...issueInfo,
        labels: [labelUndo],
      });
    }
  }
}
