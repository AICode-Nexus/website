---
title: "Parallel Worktrees / Multi-Agent Runbook"
description: "把长任务拆成低耦合 lane，在独立 worktree 或 agent 会话中并行推进，再由 owner 收口验证。"
slug: "/workflows/patterns/parallel-worktrees-multi-agent/runbook"
sidebar_label: "Runbook"
sidebar_position: 2
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
tutorial_series: ["workflow-runbook", "parallel-worktrees-multi-agent"]
estimated_time: 35
prerequisites: ["任务可以拆成低耦合子任务", "有明确 owner 和合流顺序", "每条 lane 都有独立验证方式"]
deliverable: "一份包含 lane 拆分、每 lane 证据和最终集成结果的并行交付记录"
---

# Parallel Worktrees / Multi-Agent Runbook

## 前置条件

- 当前任务已经明显超过单线程推进的舒适区。
- 你能明确拆出低耦合 lane，而不是把同一组核心文件硬拆给多人。
- 每个 lane 都能有自己的验证方式和 owner 收口顺序。

## 步骤

1. 先写 lane map：说明每条 lane 做什么、依赖谁、什么时候合流。
2. 再为每条 lane 建独立 worktree 或独立 agent 会话，确保上下文互不污染。
3. 每条 lane 先在自己的边界内通过验证，再交给 owner 合流。
4. owner 按依赖顺序合并、解决冲突，并做最终回归。

最常见的 lane 组合是：

- 实现 lane
- 测试 lane
- 文档或迁移 lane

如果你需要更强的执行栈，可以把 lane 交给 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)；如果你需要更开放的壳层和工具权限，可以用 [Cline 快速开始](/docs/tools/terminal-agents/cline/quick-start)。

## 验证

至少留下四类证据：

- lane map 与依赖顺序
- 每条 lane 的命令或检查结果
- 合流时解决过的冲突说明
- 最终集成验证结果

## 下一步

- 去看 [Parallel Worktrees / Multi-Agent 示例](/docs/workflows/patterns/parallel-worktrees-multi-agent/examples)。
- 去看 [Parallel Worktrees / Multi-Agent 风险与切换条件](/docs/workflows/patterns/parallel-worktrees-multi-agent/pitfalls)。
- 去看 [Parallel Worktrees / Multi-Agent Tooling](/docs/workflows/patterns/parallel-worktrees-multi-agent/tooling)。

## 来源

- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
