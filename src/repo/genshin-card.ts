/**
 * @file repo/genshin-card.ts
 * @description 原神卡片仓库类
 * @since 1.0.0
 */

import type { Context } from "probot";

import { BaseRepo } from "./base.ts";
import handler from "../handler/teyvat-guide/handler.ts";

/**
 * @description 原神卡片仓库类
 * @since 1.0.0
 * @class GenshinCardRepo
 * @extends {BaseRepo}
 */
class GenshinCardRepo extends BaseRepo {
  /**
   * @description 构造函数
   * @since 1.0.0
   * @memberof GenshinCardRepo
   * @constructor
   * @param {string} [key="GenshinCard"] 仓库配置对应的 key 名称
   */
  constructor(key: string = "GenshinCard") {
    super(key);
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

export const genshinCard = new GenshinCardRepo();
