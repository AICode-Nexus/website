---
title: Cline 并行 Worktree 收口案例
description: 用 Cline 管理开放式 lane、用 OpenAI Codex 推进执行，再由 owner 收口成一份可 review 的并行交付。
slug: /case-studies/cline-parallel-worktree-owner-loop
sidebar_label: Cline 并行收口
tags: [ai-coding, case-study, cline, parallel-worktrees]
track: cross-track
kind: case-study
content_form: case-study
audience: advanced
stage: advanced
featured: true
domain: workflows
journey_stage: implementation
entry_role: resource
reviewed_at: 2026-03-08
source_window_end: 2026-03-08
market_status: current
case_type: "parallel-worktrees"
scenario: "任务可以拆成实现、测试和文档等低耦合 lane，需要开放式工具能力但仍由统一 owner 收口。"
tool_stack: [Cline, OpenAI Codex, Parallel Worktrees / Multi-Agent, git worktree]
verification: "lane map、每 lane 验证结果、冲突处理说明和最终集成回归都被保留下来。"
---

# Cline 并行 Worktree 收口案例

## 背景

这类任务的问题不是“有没有 agent”，而是多个 lane 一起跑时，谁来控制开放工具能力、谁来负责回退、谁来最终合流。团队之前试过直接并行开干，结果每条 lane 都以为自己只改一点，最后 owner 面前是一堆互相咬住的改动和不完整的验证记录。

## 输入约束

- 工作流固定为 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。
- 开放式控制壳固定为 [Cline 快速开始](/docs/tools/terminal-agents/cline/quick-start)。
- 长任务执行栈由 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start) 补位。
- 每条 lane 必须在独立 worktree 中推进，并保留自己的验证证据。
- owner 负责 lane map、合流顺序与最终回归，不能把收尾责任下放给执行 lane。

## 执行过程

1. owner 先在主分支写 lane map，明确“实现 lane / 测试 lane / 文档 lane”的边界和依赖顺序。
2. 用 Cline 控制每条 lane 的权限和 checkpoint，避免开放能力直接越过当前边界。
3. 把实现和测试 lane 分别交给 Codex 推进长任务，文档 lane 留在轻量会话里完成。
4. 每条 lane 完成后先提交自己的命令结果、diff 说明和剩余风险。
5. owner 按依赖顺序合并 worktree，并记录冲突处理与最终回归结果。

这个案例的关键不是“多 agent 同时工作很酷”，而是 owner 能始终知道每条 lane 在做什么、为什么这样拆、哪里可以回退。

## 结果

- 并行执行不再等于责任分散，owner 的收口责任仍然清楚。
- checkpoint 和 worktree 把错误留在单独 lane 内，没有滚成一团。
- reviewer 最终看到的是一条完整并行证据链，而不是多个互相解释不清的分支。

## 复盘

- Cline 适合承担这种开放式 lane 控制，因为它能明确管理权限、工具和 checkpoint。
- 真正决定成败的不是并行数量，而是 lane 是否低耦合、owner 是否有合流纪律。
- 如果任务根本拆不清 lane，继续并行只会制造更多冲突，应该退回 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook) 或更轻流程。

## 下一步

- 回到 [Cline 常见任务](/docs/tools/terminal-agents/cline/common-tasks)。
- 回到 [Parallel Worktrees / Multi-Agent 示例](/docs/workflows/patterns/parallel-worktrees-multi-agent/examples)。
- 如果你下一次不是多 lane 并行，而是本地 discovery 后再异步交接，切到 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
