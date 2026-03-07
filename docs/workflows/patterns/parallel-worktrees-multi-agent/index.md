---
title: "Parallel Worktrees / Multi-Agent"
description: "Parallel Worktrees / Multi-Agent 的定位、适合任务和默认人工接管点。"
slug: "/workflows/patterns/parallel-worktrees-multi-agent"
sidebar_label: "概览"
tags: ["ai-coding", "workflow", "parallel-worktrees-multi-agent"]
track: "prompting-workflows"
kind: "guide"
audience: "advanced"
stage: "advanced"
featured: true
pillar: "workflows"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Parallel Worktrees / Multi-Agent

把长任务拆成多个低耦合子任务，在独立 worktree 或独立 agent 会话中并行推进，再由 owner 收口 review。

## 适合的任务

- 实现、测试、文档、迁移或适配器等低耦合子任务并存的长链路任务。
- 需要利用后台 agent、并行 branch 或 worktree 来缩短等待时间的场景。
- 团队已经有明确 owner，能控制拆分和合流顺序。

## 最小闭环

1. **先拆任务**：用 spec、plan 或 owner 判断把任务拆成低耦合子任务，并定义依赖顺序。
   产物：task map
2. **按 lane 建 worktree 或 agent session**：每条 lane 独立目录、独立上下文、独立验证，避免互相污染。
   产物：isolated worktrees
3. **分别验证**：每条 lane 先在自己的边界内通过验证，再进入集成阶段。
   产物：per-lane evidence
4. **owner 合流**：由统一 owner 按依赖顺序合并、解决冲突，并做最终回归。
   产物：integrated branch

## 默认人工接管点

- 拆分标准要先由 owner 定，不应让多个 agent 各自理解任务边界。
- 每个 lane 要先完成自己的验证，再进入合流和集成测试。
- 最终回归必须回到统一 owner，而不是让各 lane 自己宣布完成。

## 推荐入口

- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：并行 task 与 worktree 是它最强的场景之一。
- [Claude Code](/docs/tools/terminal-agents/claude-code)：官方 common workflows 已明确 worktree 并行。
- [VS Code Agents](/docs/tools/control-planes/vscode-agents)：适合把后台 agent 和本地 owner 组合起来。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：适合把 worktree、subagent、TDD 和 review 固化成日常习惯。

## 来源

- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
