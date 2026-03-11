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

## 示例卡片

| 项目 | 本例内容 |
| --- | --- |
| 任务类型 | 修复表单校验 bug，并补一条回归测试。 |
| 边界 | 只动表单校验逻辑和对应测试，不改整体交互设计。 |
| 执行入口 | 终端或 IDE 任选其一，但只保留一个主入口。 |
| 最终交付 | 根因说明、最小 patch、测试结果、剩余风险。 |

## 步骤

示例任务：修复一个表单校验 bug，并补一条回归测试。

1. 先写清复现步骤、允许修改范围和本轮不要做什么。
2. 让工具先解释根因，而不是直接生成一大段改动。
3. 做最小修复，只处理触发 bug 的那一层逻辑。
4. 补一条能锁定回归的测试，避免以后同类问题再出现。
5. 运行测试并记录结果，再决定是否需要额外人工检查。

## 这个示例里最重要的判断

- 修复不是从“怎么改”开始，而是从“为什么坏”开始。
- 测试不是附带品，而是这次交付的一部分。
- 如果修复过程中暴露出更大的结构问题，本轮先记风险，不顺手做大。

## 验证

- bug 行为从失败变为通过。
- 新增测试能锁住这次修复。
- 没有顺手扩大结构改动。
- reviewer 能从结果里看出“修了什么”和“没修什么”。

## 如果这个示例开始失控

- 如果根因越来越复杂，切回 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 如果问题需要更长执行链，补看 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)。
- 如果只是在平台里收口 review，再补 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)。

## 下一步

- 看 [Bugfix / Refactor / Test Tooling](/docs/workflows/patterns/bugfix-refactor-test/tooling)。
- 如果经常越界，回到 [Bugfix / Refactor / Test 风险与切换条件](/docs/workflows/patterns/bugfix-refactor-test/pitfalls)。
- 如果你在终端里执行，配合 [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks)。

