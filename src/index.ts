/**
 * @file index.ts
 * @description 应用入口
 * @since 1.0.0
 */

import process from "node:process";

import { Probot, run } from "probot";

import { probotSetup } from "./utils/probotSetup.ts";
import { readConfig } from "./utils/readConfig.ts";

Probot.defaults(readConfig());

run(probotSetup).catch((err) => {
  console.error(err);
  process.exit(1);
});
