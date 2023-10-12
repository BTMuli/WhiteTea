/**
 * @file src/utils/probotSetup.ts
 * @description 事件操作
 * @since 1.0.0
 */

import {Context, Probot} from "probot";

/**
 * @description 事件操作中转
 * @param {Probot} app Probot 实例
 * @return {void}
 */
export function probotSetup(app: Probot): void {
    app.on("issues.opened", async (context) => {
        await issuesOpened(context);
    });
}

/**
 * @description issues.opened 事件操作
 * @since 1.0.0
 * @param {Context} context Context 对象
 * @return {Promise<void>}
 */
async function issuesOpened(context: Context): Promise<void> {
    const issueComment = context.issue({
        body: "Thanks for opening this issue!",
    });
    await context.octokit.issues.createComment(issueComment);
}
