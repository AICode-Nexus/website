---
title: "Bugfix / Refactor / Test 示例"
description: "通过一个完整维护任务示例，说明 bugfix、补测试和小步重构如何串成最小闭环。"
slug: "/workflows/patterns/bugfix-refactor-test/examples"
sidebar_label: "示例"
sidebar_position: 3
tags: ["ai-coding", "workflow", "bugfix-refactor-test", "tutorial"]
track: "prompting-workflows"
kind: "tutorial"
content_form: "tutorial"
audience: "mixed"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "testing-validation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["workflow-examples", "bugfix-refactor-test"]
estimated_time: 20
prerequisites: ["已阅读 runbook", "有一个明确维护任务", "知道当前验证命令"]
deliverable: "一份可复盘的维护任务样例"
---

# Bugfix / Refactor / Test 示例

## 前置条件

- 已经读过 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 问题是小步维护，而不是需求探索。
- 验收方式已经存在。

## 步骤

示例任务：修复一个表单校验 bug，并补一条回归测试。

1. 写清复现步骤和允许修改范围。
2. 让工具先解释根因。
3. 做最小修复。
4. 补一条能锁定回归的测试。
5. 运行测试并记录结果。

## 验证

- bug 行为从失败变为通过。
- 新增测试能锁住这次修复。
- 没有顺手扩大结构改动。

## 下一步

- 看 [Bugfix / Refactor / Test Tooling](/docs/workflows/patterns/bugfix-refactor-test/tooling)。
- 如果经常越界，回到 [Bugfix / Refactor / Test 风险与切换条件](/docs/workflows/patterns/bugfix-refactor-test/pitfalls)。
- 如果你在终端里执行，配合 [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks)。

