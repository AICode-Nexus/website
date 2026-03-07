---
title: "Parallel Worktrees / Multi-Agent：流程与产物"
description: "Parallel Worktrees / Multi-Agent 的输入、输出、标准步骤和验收证据。"
slug: "/workflows/patterns/parallel-worktrees-multi-agent/loop-and-artifacts"
sidebar_label: "流程与产物"
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
