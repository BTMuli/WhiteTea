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
   * @return Config
   */
  interface Config {
    repoName: string;
    repoId: number;
    ownerName: string;
    ownerId: number;
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

  /**
   * @description 仓库类 - label
   * @since 1.0.0
   * @interface Label
   * @memberof MuBot.RepoClass
   * @property {string} name label 名称
   * @property {string} color label 颜色
   * @property {string} description label 描述
   * @return Label
   */
  interface Label {
    name: string;
    color: string;
    description: string;
  }
}
