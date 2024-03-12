---
Author: 目棃
Description: 说明文档
Date: 2023-10-12
Update: 2024-03-12
---

> 本文档 [`Frontmatter`](https://github.com/BTMuli/MuCli#Frontmatter) 由 [MuCli](https://github.com/BTMuli/Mucli) 自动生成于 `2023-10-12 19:03:28`
>
> 更新于 `2024-03-12 19:11:08`

# WhiteTea

> A GitHub App built with [Probot](https://github.com/probot/probot) for TeyvatGuide.

辅助 [TeyvatGuide](https://github.com/BTMuli/TeyvatGuide) 的 GitHub App。

## Setup

```sh
# Install dependencies
bun install

# Run the bot with forever
bun start

# Run the bot locally
bun dev
```

## Important

由于未知原因，应用仅能保持数天的正常运行（详见 [`#3`](https://github.com/BTMuli/WhiteTea/issues/3)）。

为保证应用正常运行，需要设置定时任务，每天重启一次应用。

以下代码以 **代码目录为 `/Code`，运行环境为 Linux** 为例：

> 需要在运行 `bun start` 后执行。

```sh
# 编辑定时任务
corntab -e
# 添加以下内容
30 2 * * * cd Code;bun reload
```

此后，应用将在每天凌晨 2:30 重启。

## License

[ISC](./LICENSE) © 2023 BTMuli
