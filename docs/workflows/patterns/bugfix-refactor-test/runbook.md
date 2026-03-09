---
title: "Bugfix / Refactor / Test Runbook"
description: "把日常维护任务收成一条最小闭环：先复现、再最小改动、最后回归验证。"
slug: "/workflows/patterns/bugfix-refactor-test/runbook"
sidebar_label: "Runbook"
sidebar_position: 2
tags: ["ai-coding", "workflow", "bugfix-refactor-test", "tutorial"]
track: "prompting-workflows"
kind: "tutorial"
content_form: "tutorial"
audience: "mixed"
stage: "starter"
featured: true
domain: "workflows"
journey_stage: "testing-validation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["workflow-runbook", "bugfix-refactor-test"]
estimated_time: 25
prerequisites: ["已有可复现问题或明确行为边界", "至少一个验证命令", "允许修改范围已写清"]
deliverable: "一份带根因说明和回归证据的最小维护交付"
---

# Bugfix / Refactor / Test Runbook

## 前置条件

- 问题已经可复现，或者至少有明确行为差异。
- 你知道本次允许改哪些文件。
- 你能运行最小验证命令。

## 步骤

1. 先写问题、范围、不要做什么、验收方式。
2. 再要求工具解释根因，而不是直接改代码。
3. 只做最小修复、小步重构或补测试。
4. 跑验证并记录结果。

最适合搭配：

- [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)
- [Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)

## 验证

至少留下三样东西：

- 根因说明
- 真正执行过的命令结果
- 剩余风险说明

## 下一步

- 看 [Bugfix / Refactor / Test 示例](/docs/workflows/patterns/bugfix-refactor-test/examples)。
- 看 [Bugfix / Refactor / Test 风险与切换条件](/docs/workflows/patterns/bugfix-refactor-test/pitfalls)。
- 如果任务已经不是维护型小步改动，切到 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。

## 来源

- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)

