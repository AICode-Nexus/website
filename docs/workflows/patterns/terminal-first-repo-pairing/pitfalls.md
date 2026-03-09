---
title: "Terminal-First Repo Pairing 风险与切换条件"
description: "当终端主入口开始失去边界时，判断什么时候缩小任务，什么时候切到别的流程。"
slug: "/workflows/patterns/terminal-first-repo-pairing/pitfalls"
sidebar_label: "风险与切换"
sidebar_position: 4
tags: ["ai-coding", "workflow", "terminal-first"]
track: "prompting-workflows"
kind: "guide"
content_form: "guide"
audience: "mixed"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
---

# Terminal-First Repo Pairing 风险与切换条件

## 最容易出问题的地方

- 终端任务一开始就跨太多目录。
- 没有真实验证命令，终端优势发挥不出来。
- 本该平台交接的任务，硬放在终端里推进。

## 什么时候停下

- 任务已经变成平台协作或 PR 流驱动。
- 任务需要多阶段 spec 和长期计划。
- 人类 reviewer 已经无法从命令结果理解风险。

## 应该切到哪里

- 平台交接切到 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。
- 长链路重构切到 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 纯维护小步闭环则留在 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

## 继续阅读

- [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)
- [Terminal-First Repo Pairing 示例](/docs/workflows/patterns/terminal-first-repo-pairing/examples)
- [Terminal-First Repo Pairing 工具组合](/docs/workflows/patterns/terminal-first-repo-pairing/tooling)

