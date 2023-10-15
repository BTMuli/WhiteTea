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
   * @description 仓库类 - label 枚举
   * @since 1.0.0
   * @todo 目前只写了用到的，后续有需要再补充
   * @enum {number}
   * @memberof MuBot.RepoClass
   * @property {number} WIP WIP
   * @property {number} Done Done
   * @property {number} Undo Undo
   * @return {number} label 枚举
   */
  enum Label {
    WIP,
    Done,
    Undo,
  }

  /**
   * @description 仓库类 - label 枚举的 key
   * @since 1.0.0
   * @return LabelKey
   */
  type LabelKey = keyof typeof Label;

  /**
   * @description 仓库类 - 配置
   * @since 1.0.0
   * @interface Config
   * @memberof MuBot.RepoClass
   * @property {string} repoName 仓库名称
   * @property {number} repoId 仓库 ID
   * @property {string} ownerName 仓库拥有者名称
   * @property {number} ownerId 仓库拥有者 ID
   * @property {Record<LabelKey, string>} labels 仓库标签
   * @return Config
   */
  interface Config {
    repoName: string;
    repoId: number;
    ownerName: string;
    ownerId: number;
    labels: {
      [key in LabelKey]: string;
    };
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
