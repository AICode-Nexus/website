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
title: "Parallel Worktrees / Multi-Agent：流程与产物"
description: "Parallel Worktrees / Multi-Agent 的输入、输出、标准步骤和验收证据。"
slug: "/workflows/patterns/parallel-worktrees-multi-agent/loop-and-artifacts"
sidebar_label: "补充：流程产物"
sidebar_position: 7
tags: ["ai-coding", "workflow", "parallel-worktrees-multi-agent"]
---

# Parallel Worktrees / Multi-Agent：流程与产物

## 现在先做什么

- 想先跑标准闭环：去 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。
- 想先看完整示例：去 [Parallel Worktrees / Multi-Agent 示例](/docs/workflows/patterns/parallel-worktrees-multi-agent/examples)。
- 想先选默认组合：去 [Parallel Worktrees / Multi-Agent Tooling](/docs/workflows/patterns/parallel-worktrees-multi-agent/tooling)。

## 最小产物清单

- lane 拆分图、依赖顺序和每条 lane 的目录边界。
- 每条 lane 的验证命令，以及最终集成验证命令。
- owner 的合流顺序、冲突处理原则和风险摘要。

## 交接时必须看见什么

- 每条 lane 都有自己的 diff、日志和验证结果，不能只看最终大合并。
- owner 能解释哪些内容已合并、哪些冲突手动处理过、哪些风险被延期。
- 最终集成分支要能回到一页 summary，而不是散落在多个会话里。

## 最容易断裂的地方

- lane 看似独立，实际上都在改同一份合同。
- 每条 lane 都宣布“完成”，但没有统一 owner 做最后回归。
- 拆分时没先写边界，合流时再把全部成本补回来。

## 读完回哪里

- 想按标准步骤走：回 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。
- 想看完整样例：去 [Parallel Worktrees / Multi-Agent 示例](/docs/workflows/patterns/parallel-worktrees-multi-agent/examples)。
- 想先选入口组合：去 [Parallel Worktrees / Multi-Agent Tooling](/docs/workflows/patterns/parallel-worktrees-multi-agent/tooling)。

## 来源

- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
