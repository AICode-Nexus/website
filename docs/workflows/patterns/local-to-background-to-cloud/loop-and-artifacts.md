---
audience: "advanced"
stage: "intermediate"
featured: false
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "implementation"
title: "Local -> Background -> Cloud：流程与产物"
description: "Local -> Background -> Cloud 的输入、输出、标准步骤和验收证据。"
slug: "/workflows/patterns/local-to-background-to-cloud/loop-and-artifacts"
sidebar_label: "流程与产物"
tags: ["ai-coding", "workflow", "local-to-background-to-cloud"]
---

# Local -> Background -> Cloud：流程与产物

Local -> Background -> Cloud 的价值，不在于步骤名字好看，而在于每一步都有清晰输入、输出和可 review 的证据。只要其中一环变成“相信我已经做了”，流程就会失真。

## 输入

- 本地探索结果、风险假设和目录边界。
- 后台任务说明、验证命令和审批规则。
- 最终合并所需的平台检查项和 reviewer 列表。

## 输出

- 本地 discovery note、后台执行结果和平台中的 review 产物。
- 可比较的 diff、日志、验证结果和风险说明。
- 必要时的回退计划或重试决策。

## 阶段与产物总表

| 阶段 | 目标 | 主要产物 |
| --- | --- | --- |
| 本地探索 | 在本地读代码、跑命令、缩小问题面，并把发现沉淀成 brief。 | discovery brief |
| 后台执行 | 把已经收敛的任务交给 background agent 或云端执行环境。 | background branch or task |
| 平台收口 | 通过 PR、任务面板或 cloud task 查看进度、日志和 diff，准备 review。 | review-ready change set |
| 最终验证 | 由 owner 合并各阶段证据，完成最终判断。 | final verification summary |

## 标准步骤

1. **本地探索**：在本地读代码、跑命令、缩小问题面，并把发现沉淀成 brief。
   产物：discovery brief
2. **后台执行**：把已经收敛的任务交给 background agent 或云端执行环境。
   产物：background branch or task
3. **平台收口**：通过 PR、任务面板或 cloud task 查看进度、日志和 diff，准备 review。
   产物：review-ready change set
4. **最终验证**：由 owner 合并各阶段证据，完成最终判断。
   产物：final verification summary

## 验收证据

- 本地阶段要说明为什么可以交给后台，而不是继续本地执行。
- 后台阶段要保留日志和 diff，不可只靠口头汇报。
- 最终平台收口要把本地与后台证据合并成一页可 review 摘要。

## 最容易断裂的地方

- 本地探索阶段必须输出结构化 brief，否则后台只是在放大噪音。
- 后台执行阶段应有清晰 owner，避免“没人知道谁该收尾”。
- 本地、后台和云端三份上下文分裂，导致重复劳动。

## 下一步怎么读

- [VS Code Agents](/docs/tools/control-planes/vscode-agents)：最适合作为本地与后台 agent 的控制面。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：适合本地探索后转交 cloud task 或并行执行。
- [GitHub Copilot](/docs/tools/platforms/github-copilot)：适合最终在 PR 与 review 流里收口。

## 来源

- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
