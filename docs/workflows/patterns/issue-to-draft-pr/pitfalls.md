---
title: "Issue / Jira -> Draft PR 风险与切换条件"
description: "当任务系统和 PR 流不再稳定时，判断什么时候停下，什么时候切到其他工作流。"
slug: "/workflows/patterns/issue-to-draft-pr/pitfalls"
sidebar_label: "风险与切换"
sidebar_position: 4
tags: ["ai-coding", "workflow", "issue-to-pr"]
track: "prompting-workflows"
kind: "guide"
content_form: "guide"
audience: "mixed"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "development-planning"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
---

# Issue / Jira -> Draft PR 风险与切换条件

## 最容易出问题的地方

- issue 不清晰，却想直接生成 PR。
- PR 只有代码，没有验证和风险说明。
- 平台并不是当前团队真正的交付中心。

## 什么时候停下

- 任务还需要更多需求澄清。
- 需要先写规格或阶段计划。
- 评审人已经无法从 PR 理解改动意图。

## 应该切到哪里

- 需求未收口时回 [30 分钟上手](/docs/start/30-minute-quick-start) 或 [开始这里](/docs/start/start-here)。
- 需要更重方案设计时切到 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 需要仓库内直接执行时切到 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。

## 继续阅读

- [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)
- [Issue / Jira -> Draft PR 示例](/docs/workflows/patterns/issue-to-draft-pr/examples)
- [Issue / Jira -> Draft PR Tooling](/docs/workflows/patterns/issue-to-draft-pr/tooling)

