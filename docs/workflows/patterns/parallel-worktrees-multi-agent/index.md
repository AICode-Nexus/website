---
audience: "advanced"
stage: "advanced"
featured: true
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "implementation"
title: "Parallel Worktrees / Multi-Agent"
description: "Parallel Worktrees / Multi-Agent 的定位、适合任务和默认人工接管点。"
slug: "/workflows/patterns/parallel-worktrees-multi-agent"
sidebar_label: "概览"
tags: ["ai-coding", "workflow", "parallel-worktrees-multi-agent"]
---

# Parallel Worktrees / Multi-Agent

这条主线的价值不在“多开几个 agent”，而在把长任务拆成多个低耦合 lane，再由 owner 用 worktree、分支和统一回归把它们收回来。

## 现在先做什么

- 直接按并行步骤执行：去 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。
- 想先看 lane 如何拆：去 [Parallel Worktrees / Multi-Agent 示例](/docs/workflows/patterns/parallel-worktrees-multi-agent/examples)。
- 想先选默认工具组合：去 [Parallel Worktrees / Multi-Agent Tooling](/docs/workflows/patterns/parallel-worktrees-multi-agent/tooling)。

## 60 秒定位

只有当任务真的能拆成低耦合 lane，而且团队已经有明确 owner、验证命令和合流顺序时，这条主线才赚得回来。它适合实现、测试、文档、迁移或适配器等可以独立推进的长链路任务。

如果所有改动都集中在同一份合同、同一组类型或同一批热点文件上，就不该并行。那样只会把串行成本推迟到合流阶段，一次性补回来。

## 默认进入顺序

1. 先用 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook) 跑通拆 lane、验证和合流的最小闭环。
2. 再看 [Parallel Worktrees / Multi-Agent 示例](/docs/workflows/patterns/parallel-worktrees-multi-agent/examples) 对照真实 lane 切法和 owner 收口方式。
3. 然后按入口选择 [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)、[Claude Code](/docs/tools/terminal-agents/claude-code) 或 [VS Code Agents](/docs/tools/control-planes/vscode-agents)。
4. 最后再补 [Parallel Worktrees / Multi-Agent 风险与切换条件](/docs/workflows/patterns/parallel-worktrees-multi-agent/pitfalls) 和补充页。

## 快速判断矩阵

| 判断维度 | 如果你满足这个条件 | 默认建议 |
| --- | --- | --- |
| 任务边界 | 任务可以拆成多个低耦合 lane，而且每条 lane 都有自己的验证命令。 | 直接进入 [Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。 |
| 协作方式 | 已经有明确 owner，能控制拆分、合流和回归顺序。 | 用 owner 驱动的 worktree 并行，而不是各自开工。 |
| 验收要求 | 需要缩短长链路任务等待时间，而不是写更长 prompt。 | 用并行 lane 换时间，但证据必须分别保留。 |
| 切换信号 | 改动都围绕同一份合同，或团队根本没有合流 owner。 | 回到串行主线，不要为了并行而并行。 |

## 默认人工接管点

- 拆分标准必须由 owner 先定，不应让多个 agent 各自理解任务边界。
- 每条 lane 都要先完成自己的验证，再进入合流和集成测试。
- 最终回归必须回到统一 owner，而不是让各 lane 自己宣布完成。

## 下一步怎么读

- 想直接开跑：去 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。
- 想看标准例子：去 [Parallel Worktrees / Multi-Agent 示例](/docs/workflows/patterns/parallel-worktrees-multi-agent/examples)。
- 想看真实 owner 收口：去 [Cline 并行 Worktree 收口案例](/docs/case-studies/cline-parallel-worktree-owner-loop)。
- 想看它和终端/执行栈怎么分工：去 [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)。

## 来源

- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
