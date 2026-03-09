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

## 默认组合

| 角色 | 默认工具 | 作用 |
| --- | --- | --- |
| 本地发现 | [VS Code Agents](/docs/tools/control-planes/vscode-agents) | 在本地读代码、缩边界、写 brief。 |
| 后台执行 | [OpenAI Codex](/docs/tools/execution-stacks/openai-codex) | 承担更长执行链和异步推进。 |
| 平台收口 | [GitHub Copilot](/docs/tools/platforms/github-copilot) | 在 PR、任务系统和 review 流里收口。 |

## 选择顺序

1. 先确认 discovery 发生在哪里。
2. 再确认后台执行入口和验证要求。
3. 最后确认最终 review 和 merge 发生在哪里。

## 组合建议

- 不要让后台阶段重新做 discovery。
- 不要让平台阶段承担理解任务边界的责任。
- 三层之间传递的核心产物始终是 brief、日志、diff 和验证结果。

## 下一步

- [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start)
- [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)
- [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)
