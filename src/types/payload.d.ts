/**
 * @file src/types/payload.d.ts
 * @description Payload 类型
 * @since 1.0.0
 */

/**
 * @description payload namespace
 * @since 1.0.0
 * @namespace MuBot.Payload
 */
declare namespace MuBot.Payload {
  /**
   * @description payload 数据结构
   * @since 1.0.0
   * @interface FullData
   * @property {string} event 事件名称 // todo 后续换成枚举
   * @property {any} payload 事件 payload
   * @return FullData
   */
  interface FullData {
    event: string;
    payload: any;
  }
}
