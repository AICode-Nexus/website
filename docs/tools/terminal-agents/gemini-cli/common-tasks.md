---
title: "Gemini CLI 常见任务"
description: "把 Gemini CLI 最常见的终端内维护型任务固定成可复用 SOP。"
slug: "/tools/terminal-agents/gemini-cli/common-tasks"
sidebar_label: "常见任务"
sidebar_position: 3
tags: ["ai-coding", "tool", "gemini-cli", "tutorial"]
track: "cross-track"
kind: "tutorial"
content_form: "tutorial"
audience: "mixed"
stage: "starter"
featured: false
domain: "tools"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["tool-common-tasks", "gemini-cli"]
estimated_time: 25
prerequisites: ["已跑通 Gemini CLI 快速开始", "仓库验证命令可稳定执行", "当前任务以终端内维护为主"]
deliverable: "三个适合 Gemini CLI 的终端任务 SOP"
---

# Gemini CLI 常见任务

## 前置条件

- 已完成 [Gemini CLI 快速开始](/docs/tools/terminal-agents/gemini-cli/quick-start)。
- 你准备处理的是小到中等规模任务，而不是复杂多阶段 feature。
- 你能要求 CLI 回传真实命令和结果。

## 步骤

### 任务 1：脚本驱动的 bugfix

适合已经能复现的问题。让 Gemini CLI 先解释问题范围，再执行最小修复并跑脚本验证。这类任务通常直接对应 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

### 任务 2：仓库巡检与风险清单

适合让 CLI 在终端里读配置、跑检查命令、输出简短风险摘要。重点不是“给结论”，而是把命令、发现和风险一并回传。

### 任务 3：为 PR 准备验证说明

适合本地改动已经完成，需要补一份简洁交付说明的任务。执行完后可以接 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook) 进入平台收口。

## 验证

- 每个任务都留下了真实命令证据。
- 输出不是泛泛总结，而是和当前仓库、当前改动对应。
- 只要任务开始变长或变复杂，你会主动换到更合适的入口。

## 下一步

- 去 [Gemini CLI 排错](/docs/tools/terminal-agents/gemini-cli/troubleshooting)。
- 去 [Gemini CLI 最佳实践](/docs/tools/terminal-agents/gemini-cli/best-practices)。
- 如果任务开始需要更强并行与阶段推进，转去 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)。

## 来源

- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [Gemini CLI Context Files](https://google-gemini.github.io/gemini-cli/docs/cli/configuration/#context-files)
