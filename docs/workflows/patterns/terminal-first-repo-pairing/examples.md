---
title: "Terminal-First Repo Pairing 示例"
description: "用一个真实仓库内任务示例，说明终端主入口如何把计划、执行和验证放到一条线里。"
slug: "/workflows/patterns/terminal-first-repo-pairing/examples"
sidebar_label: "示例"
sidebar_position: 3
tags: ["ai-coding", "workflow", "terminal-first", "tutorial"]
track: "prompting-workflows"
kind: "tutorial"
content_form: "tutorial"
audience: "mixed"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["workflow-examples", "terminal-first-repo-pairing"]
estimated_time: 20
prerequisites: ["已阅读 runbook", "当前任务能在本地 repo 内完成", "验证命令可运行"]
deliverable: "一个终端内 repo pairing 的完整示例"
---

# Terminal-First Repo Pairing 示例

## 前置条件

- 已经读过 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。
- 当前任务不是平台交接型任务，而是仓库内执行型任务。

## 示例卡片

| 项目 | 本例内容 |
| --- | --- |
| 任务类型 | 修复一个脚本问题并补验证。 |
| 工作面 | 终端、仓库、命令输出。 |
| 关键证据 | 计划、命令、diff、风险说明。 |
| 最终交付 | 可 review 的终端任务记录。 |

## 步骤

1. 先写边界、禁止修改区和验证命令。
2. 让终端工具给出最小计划，并确认它理解了仓库边界。
3. 先改脚本，再跑命令验证。
4. 记录结果和剩余风险，不把终端输出留成黑盒。
5. 若需回平台收口，再把结果整理进 PR 或 issue。

## 这个示例里最重要的判断

- 终端主线不是边改边猜，而是边改边验证。
- 计划、执行和证据都应该在 repo 语境内可见。
- 如果任务中途升级，不要死守终端，要及时切流程。

## 验证

- 改动只发生在允许范围。
- 命令输出足够支撑 review。
- 如果任务升级，也能在中途切换流程。
- 根因、结果和风险三者能互相对上。

## 下一步

- 看 [Terminal-First Repo Pairing 风险与切换条件](/docs/workflows/patterns/terminal-first-repo-pairing/pitfalls)。
- 看 [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks)。
- 看 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)。

