/**
 * @file index.ts
 * @description 应用入口
 * @since 1.0.0
 */

import {Probot, run} from "probot";
import {readConfig} from "./utils/readConfig";
import {probotSetup} from "./utils/probotSetup";

Probot.defaults(readConfig())

run(probotSetup).catch((err) => {
    console.error(err);
    process.exit(1);
});
