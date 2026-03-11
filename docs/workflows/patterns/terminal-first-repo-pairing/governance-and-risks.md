---
audience: "mixed"
stage: "intermediate"
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
title: "Terminal-First Repo Pairing：治理与风险"
description: "Terminal-First Repo Pairing 需要的权限边界、验证方式和失败模式。"
slug: "/workflows/patterns/terminal-first-repo-pairing/governance-and-risks"
sidebar_label: "补充：治理与风险"
sidebar_position: 8
tags: ["ai-coding", "workflow", "terminal-first-repo-pairing"]
---

# Terminal-First Repo Pairing：治理与风险

终端主线最容易被低估的，不是命令风险，而是“个人习惯和公共规则谁说了算”。当 shell 输出、worktree 和高风险命令都进入日常工作流时，owner、权限和证据纪律必须先定，否则团队只能靠经验行事。

## 现在先做什么

- 想先跑终端主线：去 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。
- 想知道什么时候该停：去 [Terminal-First Repo Pairing 风险与切换条件](/docs/workflows/patterns/terminal-first-repo-pairing/pitfalls)。
- 想先补 review 门禁：去 [Review Quality Gates](/docs/standards/review-quality-gates)。

## 治理检查表

| 治理面 | 最低要求 | 失控时会发生什么 |
| --- | --- | --- |
| 命令边界 | 哪些命令可跑、哪些需人工确认。 | 高风险命令直接执行。 |
| 仓库合同 | 目录边界、验证命令和 handoff 写回 repo。 | 团队越来越依赖个人习惯。 |
| review 证据 | diff、命令输出和风险说明齐全。 | shell 很忙，review 却看不懂。 |
| 收口 owner | branch、worktree 和 merge 有明确 owner。 | 没人能解释最终怎么合回主线。 |

## 权限与 owner

- 能执行哪些命令、能改哪些目录、谁负责最终 merge，先写清再执行。
- 高风险命令和敏感目录应有明确人工确认点。
- 终端主入口不等于可以跳过 repo 合同和 review 规则。
- 如果切 worktree 或 branch，最终必须有人统一收口和回归。

## 验证与 review

- 每次关键动作都要能映射到命令输出、测试或人工检查结果。
- review 要看 diff、命令证据和风险说明，而不是只看口头结论。
- 如果切 worktree 或 branch，最终必须有人统一收口和回归。
- 当命令只在某个人机器上有效时，应先修脚本和环境，而不是继续推进改动。

## 最常见失控模式

- shell 执行很多，但没人能说清到底改了什么、怎么验证的。
- 团队越来越依赖个人终端习惯，公共 repo 规则却越来越薄。
- 高风险命令直接执行，没有任何人工接管点。
- 根因、验证和交付说明只留在会话里，没有沉淀回 repo 或 PR。

## 什么时候先停下来

- 命令边界和目录边界还没写清。
- 验证命令不稳定，review 无法复现你的结论。
- 任务已经开始需要多 lane 或平台型审批。
- 当前改动主要靠人工试错，没有稳定证据链。

## 读完回哪里

- 想先按终端稳态流程执行：回 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。
- 想知道什么时候该停下：去 [Terminal-First Repo Pairing 风险与切换条件](/docs/workflows/patterns/terminal-first-repo-pairing/pitfalls)。
- 想补 review 门禁：去 [Review Quality Gates](/docs/standards/review-quality-gates)。

## 来源

- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
