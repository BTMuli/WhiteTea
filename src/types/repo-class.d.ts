/**
 * @file src/types/repo-class.d.ts
 * @description 仓库类
 * @since 1.0.0
 */

/**
 * @description 仓库类 namespace
 * @since 1.0.0
 * @namespace MuBot.RepoClass
 * @memberof MuBot
 */
declare namespace MuBot.RepoClass {
  /**
   * @description 仓库类 - 配置
   * @since 1.0.0
   * @interface Config
   * @memberof MuBot.RepoClass
   * @property {string} repoName 仓库名称
   * @property {number} repoId 仓库 ID
   * @property {string} ownerName 仓库拥有者名称
   * @property {number} ownerId 仓库拥有者 ID
   * @property {number} botId 机器人 ID
   * @property {Record<string, string>} labels 仓库标签
   * @return Config
   */
  interface Config {
    repoName: string;
    repoId: number;
    ownerName: string;
    ownerId: number;
    botId: number;
    labels: Record<string, string>;
  }

  /**
   * @description 仓库类 - 全部配置
   * @since 1.0.0
   * @interface ConfigAll
   * @memberof MuBot.RepoClass
   * @property {Record<string, MuBot.RepoClass.Config>} repos 仓库配置
   * @return ConfigAll
   */
  type ConfigAll = Record<string, MuBot.RepoClass.Config>;
}
