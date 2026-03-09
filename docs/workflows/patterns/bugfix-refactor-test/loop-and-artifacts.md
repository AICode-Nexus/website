---
audience: "mixed"
stage: "starter"
featured: false
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "testing-validation"
title: "Bugfix / Refactor / Test：流程与产物"
description: "Bugfix / Refactor / Test 的输入、输出、标准步骤和验收证据。"
slug: "/workflows/patterns/bugfix-refactor-test/loop-and-artifacts"
sidebar_label: "补充：流程产物"
sidebar_position: 7
tags: ["ai-coding", "workflow", "bugfix-refactor-test"]
---

# Bugfix / Refactor / Test：流程与产物

## 现在先做什么

- 想按标准闭环执行：去 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 想先看完整示例：去 [Bugfix / Refactor / Test 示例](/docs/workflows/patterns/bugfix-refactor-test/examples)。
- 想先选入口组合：去 [Bugfix / Refactor / Test Tooling](/docs/workflows/patterns/bugfix-refactor-test/tooling)。

## 最小产物清单

- 失败信号或复现说明，明确本次到底修什么。
- 根因说明、允许修改的范围和本次不做什么。
- 回归结果、剩余风险和必要时的后续任务。

## 交接时必须看见什么

- 修复前后的失败/成功信号对照，不能只有最终 diff。
- 真正执行过的命令、测试和人工验证摘要。
- 如果没有补测试或只做局部重构，要明确写出原因。

## 最容易断裂的地方

- 根因没说清就开始大改，最后 review 无法判断边界。
- 把局部修复顺手扩成大重构，导致没人敢 merge。
- 只修症状不修根因，问题很快复发。

## 读完回哪里

- 想按主线执行：回 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 想看标准例子：去 [Bugfix / Refactor / Test 示例](/docs/workflows/patterns/bugfix-refactor-test/examples)。
- 想先选工具入口：去 [Bugfix / Refactor / Test Tooling](/docs/workflows/patterns/bugfix-refactor-test/tooling)。

## 来源

- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [Cline Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act)
- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
