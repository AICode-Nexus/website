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
title: "Issue / Jira -> Draft PR：适用信号与边界"
description: "什么时候优先用 Issue / Jira -> Draft PR，什么时候不要用。"
slug: "/workflows/patterns/issue-to-draft-pr/fit-and-signals"
sidebar_label: "补充：适用信号"
sidebar_position: 6
tags: ["ai-coding", "workflow", "issue-to-draft-pr"]
---

# Issue / Jira -> Draft PR：适用信号与边界

## 现在先做什么

- 想直接按平台主线执行：去 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。
- 想先看完整示例：去 [Issue / Jira -> Draft PR 示例](/docs/workflows/patterns/issue-to-draft-pr/examples)。
- 想先看真实 draft PR 交接：去 [GitHub Copilot Draft PR Handoff 案例](/docs/case-studies/github-copilot-draft-pr-handoff)。

## 什么时候该上

- 任务目标、验收标准和允许修改的目录都能写进 issue。
- 团队已经有分支保护、PR 模板和 reviewer 机制。
- 负责人更关心交付节奏和可追踪，而不是全程同步盯执行。

## 什么时候别上

- 问题仍需要大量探索、实时讨论或反复试错。
- 没有 issue hygiene，连验收标准都写不清。
- 高风险变更却无人负责最终收口和回归。

## 切回更轻或更重

- 如果只是局部修复，回 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 如果本地探索价值很高，再切到 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
- 如果先要把目标、非目标和验收条件写清，再切到 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。

## 读完回哪里

- 想直接执行平台主线：回 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。
- 想看标准例子：去 [Issue / Jira -> Draft PR 示例](/docs/workflows/patterns/issue-to-draft-pr/examples)。
- 想看真实 draft PR 交接：去 [GitHub Copilot Draft PR Handoff 案例](/docs/case-studies/github-copilot-draft-pr-handoff)。

## 来源

- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
- [GitHub Copilot for Jira](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/integrate-coding-agent-with-jira)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
