---
title: "Local -> Background -> Cloud Tooling"
description: "为三层 handoff 选择默认工具组合：谁负责本地发现，谁负责后台执行，谁负责平台收口。"
slug: "/workflows/patterns/local-to-background-to-cloud/tooling"
sidebar_label: "工具组合"
sidebar_position: 5
tags: ["ai-coding", "workflow", "local-to-background-to-cloud"]
track: "prompting-workflows"
kind: "guide"
content_form: "guide"
audience: "advanced"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
---

# Local -> Background -> Cloud Tooling

这条主线的工具组合不是“哪个最强”，而是“哪一个最适合 discovery，哪一个最适合长执行，哪一个最适合正式收口”。三层只要有一层选错，handoff 成本就会抵消全部收益。

## 默认组合

| 角色 | 默认工具 | 作用 | 什么时候切换 |
| --- | --- | --- | --- |
| 本地发现 | [VS Code Agents](/docs/tools/control-planes/vscode-agents) | 在本地读代码、缩边界、写 brief。 | 如果 discovery 主要发生在终端，改用 [Claude Code](/docs/tools/terminal-agents/claude-code)。 |
| 后台执行 | [OpenAI Codex](/docs/tools/execution-stacks/openai-codex) | 承担更长执行链和异步推进。 | 只做轻量后台补位时可用更轻入口。 |
| 平台收口 | [GitHub Copilot](/docs/tools/platforms/github-copilot) | 在 PR、任务系统和 review 流里收口。 | 若团队不以 GitHub 为主系统，则需换平台层。 |

## 选择顺序

1. 先确认 discovery 发生在哪里，是 IDE、终端还是平台。
2. 再确认后台执行入口和验证要求。
3. 最后确认最终 review 和 merge 发生在哪里。

## 默认搭配建议

- 不要让后台阶段重新做 discovery。
- 不要让平台阶段承担理解任务边界的责任。
- 三层之间传递的核心产物始终是 brief、日志、diff 和验证结果。
- 如果本地和后台边界切不出来，就别强行套三层模型。

## 最小落地包

- 一个本地阶段输出模板。
- 一个后台阶段日志和阶段总结模板。
- 一个平台层 PR 或任务更新模板。
- 一套明确的“什么时候停、什么时候交、什么时候切回本地”的规则。

## 什么时候换组合

- discovery 需要强 IDE 控制面时，VS Code Agents 更自然。
- 长链路推进和并行执行更重时，Codex 之类执行栈更合适。
- 团队最终收口不在 GitHub 时，平台层要按真实工作系统调整。
- 如果三层模型开始拖慢节奏，改回 [Terminal-First Repo Pairing Tooling](/docs/workflows/patterns/terminal-first-repo-pairing/tooling) 或 [Bugfix / Refactor / Test Tooling](/docs/workflows/patterns/bugfix-refactor-test/tooling)。

## 下一步

- [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start)
- [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)
- [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)
