---
title: "Parallel Worktrees / Multi-Agent 示例"
description: "通过一个跨实现、测试和文档 lane 的例子，说明并行 worktree 如何收口成可 review 交付。"
slug: "/workflows/patterns/parallel-worktrees-multi-agent/examples"
sidebar_label: "示例"
sidebar_position: 3
tags: ["ai-coding", "workflow", "parallel-worktrees-multi-agent", "tutorial"]
track: "prompting-workflows"
kind: "tutorial"
content_form: "tutorial"
audience: "advanced"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["workflow-examples", "parallel-worktrees-multi-agent"]
estimated_time: 30
prerequisites: ["已阅读 runbook", "当前任务可以拆 lane", "每条 lane 有独立验证方式"]
deliverable: "一个包含 lane 拆分、验证与 owner 合流的完整示例"
---

# Parallel Worktrees / Multi-Agent 示例

## 前置条件

- 已阅读 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。
- 当前任务不是所有改动都压在同一组文件上。
- owner 能控制拆分与最终合流。

## 步骤

示例任务：为一个已有服务新增导出能力，同时补测试和文档。

1. owner 先把任务拆成实现 lane、测试 lane、文档 lane。
2. 三条 lane 各自进入独立 worktree 或 agent 会话推进。
3. 每条 lane 完成后先提交自己的验证证据。
4. owner 按“实现 -> 测试 -> 文档”的顺序合流并跑最终回归。

在这个例子里：

- 实现 lane 适合 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)
- 测试 lane 可以继续按 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook) 收小
- owner 也可以用 [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start) 作为控制面

## 验证

- 每条 lane 都能独立说明输入、改动和验证。
- 合流阶段没有把“谁解决了什么冲突”变成黑盒。
- 最终 reviewer 能清楚看到并行带来的收益，而不是只看到更复杂的 diff。

## 结果

- 任务等待时间被拆散，不需要所有事情串行完成。
- 风险被留在各自 lane 内，而不是最后一次性爆炸。
- owner 仍保留最终判断权，没有把收尾责任丢给并行执行者。

## 下一步

- 去看 [Parallel Worktrees / Multi-Agent Tooling](/docs/workflows/patterns/parallel-worktrees-multi-agent/tooling)。
- 去看 [Parallel Worktrees / Multi-Agent 风险与切换条件](/docs/workflows/patterns/parallel-worktrees-multi-agent/pitfalls)。
- 如果任务其实更像本地探索后再异步交接，切到 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
