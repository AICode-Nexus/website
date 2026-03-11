---
audience: "advanced"
stage: "advanced"
featured: false
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "implementation"
title: "Parallel Worktrees / Multi-Agent：适用信号与边界"
description: "什么时候优先用 Parallel Worktrees / Multi-Agent，什么时候不要用。"
slug: "/workflows/patterns/parallel-worktrees-multi-agent/fit-and-signals"
sidebar_label: "补充：适用信号"
sidebar_position: 6
tags: ["ai-coding", "workflow", "parallel-worktrees-multi-agent"]
---

# Parallel Worktrees / Multi-Agent：适用信号与边界

并行 lane 的价值，不在“同时开很多 agent”，而在“任务真的可以拆、真的值得拆、拆完还能收回来”。只要 lane 之间共享同一份热点合同、同一批高耦合文件，所谓并行就只是把冲突和协调成本放大。

## 现在先做什么

- 想直接按并行步骤执行：去 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。
- 想先看 lane 如何拆和合流：去 [Parallel Worktrees / Multi-Agent 示例](/docs/workflows/patterns/parallel-worktrees-multi-agent/examples)。
- 想先看 owner 如何收口真实案例：去 [Cline 并行 Worktree 收口案例](/docs/case-studies/cline-parallel-worktree-owner-loop)。

## 快速判断表

| 判断点 | 适合上这条主线 | 更该切走的时候 |
| --- | --- | --- |
| lane 独立性 | 每条 lane 都能独立验证。 | 所有改动都围绕同一组热点文件。 |
| owner | 已有明确 owner 管拆分和合流。 | 没人负责最终收口。 |
| 等待成本 | 串行执行确实拖慢整体交付。 | 主要问题仍是需求不清。 |
| 团队能力 | 团队熟悉 worktree、冲突和回归节奏。 | 团队不会用 worktree 或没人敢合流。 |

## 什么时候该上

- 任务可以拆成多个低耦合 lane，而且每条 lane 都有自己的验证命令。
- 已经有明确 owner，能控制拆分、合流和回归顺序。
- 等待时间主要来自串行执行，而不是需求本身还没收敛。
- lane 之间可以通过共享合同协作，而不是靠口头同步。

## 什么时候别上

- 所有改动都围绕同一组接口、同一份类型或同一批热点文件。
- 还没有 spec、目录边界或统一 owner。
- 团队不会用 worktree，也没有人负责最终合流。
- 这轮问题的主要瓶颈其实是目标和验收没定清。

## 常见切换条件

- 如果只剩单点修复，回 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 如果需要更多角色、更多审批和更长产物链，切到框架层而不是继续硬拆 lane。
- 如果边界还没定，先回到单 owner 模式把合同写清再并行。
- 如果真正需要的是执行栈，不是 lane 管理，补看 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)。

## 开始前自测

- 每条 lane 能不能写出自己的目标、输入、输出和验证。
- owner 能不能说清合流顺序和冲突处理原则。
- 如果某一条 lane 失败，剩下 lane 是否还能继续推进。
- 并行带来的节省，是否真的大于协调成本。

## 读完回哪里

- 想直接执行：回 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。
- 想看 lane 拆法：去 [Parallel Worktrees / Multi-Agent 示例](/docs/workflows/patterns/parallel-worktrees-multi-agent/examples)。
- 想看真实 owner 收口：去 [Cline 并行 Worktree 收口案例](/docs/case-studies/cline-parallel-worktree-owner-loop)。

## 来源

- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
