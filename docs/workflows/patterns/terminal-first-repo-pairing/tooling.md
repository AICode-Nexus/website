---
title: "Terminal-First Repo Pairing Tooling"
description: "为终端主入口工作流选择默认工具组合：谁负责执行，谁负责补平台或长任务。"
slug: "/workflows/patterns/terminal-first-repo-pairing/tooling"
sidebar_label: "工具组合"
sidebar_position: 5
tags: ["ai-coding", "workflow", "terminal-first"]
track: "prompting-workflows"
kind: "guide"
content_form: "guide"
audience: "mixed"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
---

# Terminal-First Repo Pairing Tooling

终端主线的工具组合目标，是让执行入口尽量单纯，把长任务和平台收口放在需要时才接进来。先把主执行入口稳定下来，比一开始就堆满补位工具更重要。

## 默认组合

| 角色 | 默认工具 | 作用 | 什么时候切换 |
| --- | --- | --- | --- |
| 终端主入口 | [Claude Code](/docs/tools/terminal-agents/claude-code) | 仓库内读代码、跑命令、保留验证证据。 | 想要更轻 CLI 时换 [Gemini CLI](/docs/tools/terminal-agents/gemini-cli)。 |
| 长任务执行 | [OpenAI Codex](/docs/tools/execution-stacks/openai-codex) | 补阶段推进和更长链路执行。 | 任务仍是局部维护时没必要上重执行栈。 |
| 平台收口 | [GitHub Copilot](/docs/tools/platforms/github-copilot) | 收口 issue、PR 和 review。 | 平台不是主协作场景时换真实平台层。 |

## 选择顺序

1. 先看执行主要发生在哪里，通常先从终端入口开始。
2. 再看是否真的需要更长执行链或并行能力。
3. 最后再决定是否需要平台补位，而不是默认把平台和 IDE 混进来。

## 默认搭配建议

- 默认先把终端作为执行主线，不要一开始就把平台和 IDE 混进来。
- 需要长任务推进时再补 [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)。
- 需要最终平台收口时再补 [GitHub Copilot](/docs/tools/platforms/github-copilot)。
- 如果主要是 IDE 内局部修复，改读 [Bugfix / Refactor / Test Tooling](/docs/workflows/patterns/bugfix-refactor-test/tooling)。

## 最小落地包

- 一个终端规则文件，例如 `CLAUDE.md` 或等价说明。
- 一组稳定验证命令。
- 一种默认回报格式：根因、命令、结果、风险。
- 一种明确收口位置，例如 PR、issue comment 或变更说明。

## 什么时候换组合

- 需要更轻 context file 路线时，Gemini CLI 更合适。
- 需要更重长任务执行和并行 lane 时，Codex 更合适。
- 需要正式平台 review 和异步交接时，再加 GitHub Copilot。
- 如果终端流已经不再是主工作面，就别强行坚持，改回 IDE 或平台主线。

## 下一步

- [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)
- [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)
- [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)
