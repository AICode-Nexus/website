---
title: "Terminal-First Repo Pairing Runbook"
description: "把终端、仓库边界和命令验证收成一条默认的 repo pairing 工作流。"
slug: "/workflows/patterns/terminal-first-repo-pairing/runbook"
sidebar_label: "Runbook"
sidebar_position: 2
tags: ["ai-coding", "workflow", "terminal-first", "tutorial"]
track: "prompting-workflows"
kind: "tutorial"
content_form: "tutorial"
audience: "mixed"
stage: "starter"
featured: true
domain: "workflows"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["workflow-runbook", "terminal-first-repo-pairing"]
estimated_time: 25
prerequisites: ["终端是默认工作环境", "仓库规则与验证命令已存在", "本次任务范围明确"]
deliverable: "一份在仓库内可验证、可 review 的终端任务记录"
---

# Terminal-First Repo Pairing Runbook

## 前置条件

- 你愿意把终端当主入口，而不是补位工具。
- 仓库边界和验证命令已经写清楚。
- 当前任务更适合在本地 repo 内推进。

## 执行表

| 阶段 | 要做什么 | 产出 |
| --- | --- | --- |
| 定边界 | 写任务范围和验证命令。 | 清晰任务说明。 |
| 先复述 | 让工具复述任务并给最小计划。 | 可执行计划。 |
| 小步执行 | 只推进一轮最小改动。 | 小 patch。 |
| 立即验证 | 跑命令并记录结果。 | 命令结果和风险说明。 |

## 步骤

1. 先写任务范围和验证命令。
2. 在终端里让工具先复述任务，再给计划。
3. 只推进一轮最小改动。
4. 立即跑命令验证，并记录结果。
5. 把根因、diff、命令输出和风险整理成可交付材料。

推荐入口：

- [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)
- [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)

## 默认停点

- 边界不清，先停，回任务定义。
- 命令不稳定，先停，修验证环境。
- 改动开始变大，先停，拆任务或切 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。

## 验证

- 命令结果真实可见。
- 仓库边界没有失控。
- 人类 reviewer 能看懂这轮改动为什么成立。

## 交付检查

- 是否能用一组命令和一份 diff 解释这轮改动。
- 是否留下了 reviewer 需要的风险说明。
- 是否真的只做了这轮该做的事。
- 若需回平台收口，材料是否已足够。

## 下一步

- 看 [Terminal-First Repo Pairing 示例](/docs/workflows/patterns/terminal-first-repo-pairing/examples)。
- 看 [Terminal-First Repo Pairing 工具组合](/docs/workflows/patterns/terminal-first-repo-pairing/tooling)。
- 如果任务变成长链路阶段推进，切到 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。

## 来源

- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)

