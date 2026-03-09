---
title: "Spec-First 风险与切换条件"
description: "当 spec 写得过重或阶段拆得过细时，判断什么时候收缩，什么时候切换工作流。"
slug: "/workflows/patterns/spec-first/pitfalls"
sidebar_label: "风险与切换"
sidebar_position: 4
tags: ["ai-coding", "workflow", "spec-first"]
track: "prompting-workflows"
kind: "guide"
content_form: "guide"
audience: "mixed"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "solution-design"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
---

# Spec-First 风险与切换条件

## 最容易出问题的地方

- spec 写得太大，迟迟进不了执行。
- 阶段拆得太碎，交接成本反而升高。
- 明明只是小 bug，却硬套 spec-first。

## 什么时候停下

- 任务已经回落成单点维护。
- 当前 spec 不能真正驱动下一步执行。
- review 人已经看不出 spec 与实际改动的关系。

## 应该切到哪里

- 小步维护切回 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 平台交接切到 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。
- 终端仓库执行则结合 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。

## 继续阅读

- [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)
- [Spec-First 示例](/docs/workflows/patterns/spec-first/examples)
- [Spec-First Tooling](/docs/workflows/patterns/spec-first/tooling)

