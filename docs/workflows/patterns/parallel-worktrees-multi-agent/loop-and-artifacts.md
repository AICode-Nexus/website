---
audience: "advanced"
stage: "advanced"
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
title: "Parallel Worktrees / Multi-Agent：流程与产物"
description: "Parallel Worktrees / Multi-Agent 的输入、输出、标准步骤和验收证据。"
slug: "/workflows/patterns/parallel-worktrees-multi-agent/loop-and-artifacts"
sidebar_label: "流程与产物"
tags: ["ai-coding", "workflow", "parallel-worktrees-multi-agent"]
---

# Parallel Worktrees / Multi-Agent：流程与产物

Parallel Worktrees / Multi-Agent 的价值，不在于步骤名字好看，而在于每一步都有清晰输入、输出和可 review 的证据。只要其中一环变成“相信我已经做了”，流程就会失真。

## 输入

- 任务拆分图、依赖顺序、每条 lane 的目录范围。
- worktree 命名、branch 策略和合流顺序。
- 每条 lane 的验证命令，以及最终集成验证命令。

## 输出

- 独立 worktree 或 session 中的子任务结果。
- 每条 lane 的测试/构建/说明证据。
- 最终合流后的统一 diff 和风险总结。

## 阶段与产物总表

| 阶段 | 目标 | 主要产物 |
| --- | --- | --- |
| 先拆任务 | 用 spec、plan 或 owner 判断把任务拆成低耦合子任务，并定义依赖顺序。 | task map |
| 按 lane 建 worktree 或 agent session | 每条 lane 独立目录、独立上下文、独立验证，避免互相污染。 | isolated worktrees |
| 分别验证 | 每条 lane 先在自己的边界内通过验证，再进入集成阶段。 | per-lane evidence |
| owner 合流 | 由统一 owner 按依赖顺序合并、解决冲突，并做最终回归。 | integrated branch |

## 标准步骤

1. **先拆任务**：用 spec、plan 或 owner 判断把任务拆成低耦合子任务，并定义依赖顺序。
   产物：task map
2. **按 lane 建 worktree 或 agent session**：每条 lane 独立目录、独立上下文、独立验证，避免互相污染。
   产物：isolated worktrees
3. **分别验证**：每条 lane 先在自己的边界内通过验证，再进入集成阶段。
   产物：per-lane evidence
4. **owner 合流**：由统一 owner 按依赖顺序合并、解决冲突，并做最终回归。
   产物：integrated branch

## 验收证据

- 每条 lane 都要有自己的验证证据，不能只看最终集成结果。
- 合流阶段要明确解决了哪些冲突、保留了哪些风险。
- 如果有子任务被放弃或延后，要明确记录而不是静默消失。

## 最容易断裂的地方

- 拆分标准要先由 owner 定，不应让多个 agent 各自理解任务边界。
- 每个 lane 要先完成自己的验证，再进入合流和集成测试。
- 拆分不合理，最后在合流阶段把全部成本补回来。

## 下一步怎么读

- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：并行 task 与 worktree 是它最强的场景之一。
- [Claude Code](/docs/tools/terminal-agents/claude-code)：官方 common workflows 已明确 worktree 并行。
- [VS Code Agents](/docs/tools/control-planes/vscode-agents)：适合把后台 agent 和本地 owner 组合起来。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：适合把 worktree、subagent、TDD 和 review 固化成日常习惯。

## 来源

- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
