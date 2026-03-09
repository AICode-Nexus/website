---
title: "Bugfix / Refactor / Test 风险与切换条件"
description: "当维护任务开始失去边界时，判断什么时候停下、什么时候切换到更重的工作流。"
slug: "/workflows/patterns/bugfix-refactor-test/pitfalls"
sidebar_label: "风险与切换"
sidebar_position: 4
tags: ["ai-coding", "workflow", "bugfix-refactor-test"]
track: "prompting-workflows"
kind: "guide"
content_form: "guide"
audience: "mixed"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "testing-validation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
---

# Bugfix / Refactor / Test 风险与切换条件

## 最容易出问题的地方

- 借修 bug 的机会扩大架构改造。
- 没有可运行验证命令，却还强行推进。
- 根因没说清，就开始大规模改动。

## 什么时候停下

- 任务已经升级到跨模块设计调整。
- 你开始需要写 spec、阶段计划或多人交接。
- 当前验证方式不足以证明改动是安全的。

## 应该切到哪里

- 结构性改动切到 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 平台交付切到 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。
- 终端内维护仍然可以继续配合 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)。

## 继续阅读

- [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)
- [Bugfix / Refactor / Test 示例](/docs/workflows/patterns/bugfix-refactor-test/examples)
- [Bugfix / Refactor / Test Tooling](/docs/workflows/patterns/bugfix-refactor-test/tooling)

