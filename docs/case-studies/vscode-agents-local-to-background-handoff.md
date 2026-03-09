---
title: VS Code Agents 本地到后台交接案例
description: 用 VS Code Agents 做本地 discovery、用 OpenAI Codex 承接后台执行，再回到平台完成一次可 review 的交付收口。
slug: /case-studies/vscode-agents-local-to-background-handoff
sidebar_label: VS Code Agents 交接
tags: [ai-coding, case-study, vscode-agents, local-to-background-to-cloud]
track: cross-track
kind: case-study
content_form: case-study
audience: mixed
stage: intermediate
featured: true
domain: workflows
journey_stage: implementation
entry_role: resource
reviewed_at: 2026-03-08
source_window_end: 2026-03-08
market_status: current
case_type: "local-to-background-handoff"
scenario: "任务先需要本地读代码与缩边界，再把长执行段交给后台，并在平台里完成最终 review。"
tool_stack: [VS Code Agents, OpenAI Codex, GitHub Copilot, Local -> Background -> Cloud]
verification: "discovery brief、后台日志、diff 和最终平台说明能串成同一条证据链。"
---

# VS Code Agents 本地到后台交接案例

## 背景

团队遇到的是一类典型长任务：一开始必须在本地读代码、跑命令、看依赖，确认真正问题面；但一旦边界收敛后，后半段实现又很适合交给后台持续推进。之前最大的问题不是“没有工具”，而是 discovery 和 execution 之间没有稳定 handoff，最后 reviewer 只能看到一堆 diff，不知道前提和判断是怎么来的。

## 输入约束

- 本地控制面固定为 [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start)。
- 后台执行固定为 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)。
- 工作流固定为 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
- 最终平台收口固定为 GitHub draft PR 或等价 review 流。
- 本次任务只允许改一个服务目录、对应测试和一段导出逻辑。

## 执行过程

1. 先在 VS Code Agents 里读代码、跑验证命令，写出一页 discovery brief。
2. brief 里明确当前根因、允许修改的目录、必须补的验证和停止条件。
3. 再把已经收敛的执行段交给 Codex，只允许它推进这次授权范围内的改动。
4. 后台执行完成后，回到平台查看 diff、测试日志和交付说明，而不是只看一句“任务完成”。
5. 最终由 owner 把 discovery brief、后台日志和 PR 说明收成一页可 review 交付。

这个案例里，VS Code Agents 真正承担的是控制面与交接面，不是替代全部执行；Codex 承担的是长阶段执行，不是重新理解任务；平台承担的是最终审阅，而不是第一次澄清问题。

## 结果

- discovery 与 execution 之间有了稳定手递手，不再靠口头补充上下文。
- reviewer 能同时看到“为什么这样改”和“改完验证了什么”，而不是只看到结果。
- 一旦后台跑偏，owner 能快速定位是 brief 不清，还是执行超边界。

## 复盘

- VS Code Agents 的价值在这种案例里非常清楚：把本地探索、后台执行和编辑器审阅收成一个控制面。
- 如果 discovery brief 没写好，再强的后台执行只会把噪音放大。
- 这条链路适合复杂但边界可收敛的任务；如果任务很小，直接走 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook) 更划算。

## 下一步

- 回到 [VS Code Agents 常见任务](/docs/tools/control-planes/vscode-agents/common-tasks)。
- 回到 [Local -> Background -> Cloud 示例](/docs/workflows/patterns/local-to-background-to-cloud/examples)。
- 如果下一次任务已经可拆多条 lane，切到 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。
