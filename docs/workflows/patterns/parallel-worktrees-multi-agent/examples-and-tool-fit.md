---
title: "Parallel Worktrees / Multi-Agent：案例与工具组合"
description: "Parallel Worktrees / Multi-Agent 的代表案例，以及最适合搭配的工具或框架。"
slug: "/workflows/patterns/parallel-worktrees-multi-agent/examples-and-tool-fit"
sidebar_label: "案例与工具组合"
tags: ["ai-coding", "workflow", "parallel-worktrees-multi-agent"]
track: "prompting-workflows"
kind: "guide"
audience: "advanced"
stage: "advanced"
featured: false
pillar: "workflows"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Parallel Worktrees / Multi-Agent：案例与工具组合

没有一种工具能自动修正糟糕的 workflow，但合适的入口确实能让同一条交付链更稳。这一页的目标，是把代表案例、工具组合和常见误配放在一起看。

## 代表案例

- **实现、测试和文档三路并行**：功能实现、回归测试和文档更新分别在独立 worktree 推进，最后统一集成。
- **迁移脚本与适配器分 lane**：迁移脚本一条 lane，运行时适配器一条 lane，集成测试最后统一跑。

## 案例与工具组合矩阵

| 案例 | 为什么适合这个流程 | 优先搭配 |
| --- | --- | --- |
| 实现、测试和文档三路并行 | 功能实现、回归测试和文档更新分别在独立 worktree 推进，最后统一集成。 | OpenAI Codex |
| 迁移脚本与适配器分 lane | 迁移脚本一条 lane，运行时适配器一条 lane，集成测试最后统一跑。 | Claude Code |

## 推荐工具组合

- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：并行 task 与 worktree 是它最强的场景之一。
- [Claude Code](/docs/tools/terminal-agents/claude-code)：官方 common workflows 已明确 worktree 并行。
- [VS Code Agents](/docs/tools/control-planes/vscode-agents)：适合把后台 agent 和本地 owner 组合起来。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：适合把 worktree、subagent、TDD 和 review 固化成日常习惯。

## 常见组合误区

- 把工具当成 workflow 本身，而不是 workflow 的承载入口。
- 同时上多个重流程和多个重工具，最后先死在上下文和治理成本上。
- 只看生成速度，不看证据是否能回流到 diff、测试和 review。

## 什么时候切到更重或更轻的流程

- 如果任务开始涉及更多角色、更多产物或更长审批链，应切到框架层。
- 如果任务降级成单点修复或纯配置修订，应切回更轻量的维护流。
- 如果案例看起来很像，但团队没有任何验证命令，先补基础设施再谈流程。

## 下一步怎么读

- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：并行 task 与 worktree 是它最强的场景之一。
- [Claude Code](/docs/tools/terminal-agents/claude-code)：官方 common workflows 已明确 worktree 并行。
- [VS Code Agents](/docs/tools/control-planes/vscode-agents)：适合把后台 agent 和本地 owner 组合起来。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：适合把 worktree、subagent、TDD 和 review 固化成日常习惯。

## 来源

- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
