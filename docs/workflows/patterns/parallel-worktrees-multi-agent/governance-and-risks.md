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
title: "Parallel Worktrees / Multi-Agent：治理与风险"
description: "Parallel Worktrees / Multi-Agent 需要的权限边界、验证方式和失败模式。"
slug: "/workflows/patterns/parallel-worktrees-multi-agent/governance-and-risks"
sidebar_label: "补充：治理与风险"
sidebar_position: 8
tags: ["ai-coding", "workflow", "parallel-worktrees-multi-agent"]
---

# Parallel Worktrees / Multi-Agent：治理与风险

## 现在先做什么

- 想先跑并行主线：去 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。
- 想知道什么时候该停下或切流程：去 [Parallel Worktrees / Multi-Agent 风险与切换条件](/docs/workflows/patterns/parallel-worktrees-multi-agent/pitfalls)。
- 想先补 review 与验证门禁：去 [Review Quality Gates](/docs/standards/review-quality-gates)。

## 权限与 owner

- lane 谁能开、谁能合并、谁有最终回归责任，先写清再执行。
- 高耦合核心目录默认归 owner 串行处理，外围任务再并行。
- 不要让多个 agent 各自理解 spec，再由 owner 事后猜哪个才是准的。

## 验证与 review

- 每条 lane 先过自己的验证，再进入合流和集成测试。
- 合流时必须说明冲突怎么解、保留了哪些风险、还有哪些延期项。
- review 要看证据链，不要只看“模型说已经做完”。

## 失败信号

- lane 越开越多，但 nobody owns final merge。
- 多条 lane 在同一份合同上反复冲突。
- 最终只能拿到一个“大 diff”，拿不到每条 lane 的独立证据。

## 读完回哪里

- 想先按稳态流程执行：回 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。
- 想知道什么时候该停：去 [Parallel Worktrees / Multi-Agent 风险与切换条件](/docs/workflows/patterns/parallel-worktrees-multi-agent/pitfalls)。
- 想先补 review 门禁：去 [Review Quality Gates](/docs/standards/review-quality-gates)。

## 来源

- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
