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

## 这页适合处理什么任务

- 任务以终端内维护、巡检、验证说明为主。
- 你想依赖最小 context file 和真实命令，而不是复杂工作台。
- 这次任务不需要多阶段并行推进。

## 前置条件

- 已完成 [Gemini CLI 快速开始](/docs/tools/terminal-agents/gemini-cli/quick-start)。
- 你准备处理的是小到中等规模任务，而不是复杂多阶段 feature。
- 你能要求 CLI 回传真实命令和结果。

## 使用前先固定三件事

- context file 只保留目录边界、验证命令和必须回报的证据。
- 每次任务都要有一个真实可执行命令。
- 一旦任务开始变成长链路，就立刻切换入口。

## 步骤

### 任务 1：脚本驱动的 bugfix

适合已经能复现的问题。让 Gemini CLI 先解释问题范围，再执行最小修复并跑脚本验证。这类任务通常直接对应 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

开始前先准备：

- 最小 context file
- 复现命令或测试命令
- 这轮明确不碰的目录

默认要求：

```text
请先根据 context file 复述任务范围和禁止修改区。
解释当前 bug 的影响面，只做最小修复。
结束后必须给出真实命令结果、改动摘要和剩余风险。
```

成功信号：

- 修复和命令结果能够互相验证
- 输出里没有脱离仓库上下文的空泛解释
- 你能快速复跑同一条命令

切换条件：

- 如果修复需要跨模块多轮推进，改去 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)
- 如果需要更强 repo pairing，可比较 [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks)

### 任务 2：仓库巡检与风险清单

适合让 CLI 在终端里读配置、跑检查命令、输出简短风险摘要。重点不是“给结论”，而是把命令、发现和风险一并回传。

开始前先准备：

- 本轮要跑的检查命令
- 风险输出格式
- 哪些结果必须人工确认

默认要求：

```text
请按顺序执行列出的检查命令。
每条命令都回报真实输出摘要。
最后整理成风险清单，区分“已确认问题”“待人工确认”“本轮未覆盖”三类。
```

成功信号：

- 风险项都能追溯到具体命令或文件
- 摘要足够短，但不丢关键证据
- 不会把“可能有问题”包装成“已经确定的问题”

切换条件：

- 如果巡检后马上变成多阶段整改任务，拆成新任务再交更强入口
- 如果结果要直接收进 PR，补上任务 3 的交付说明模板

### 任务 3：为 PR 准备验证说明

适合本地改动已经完成，需要补一份简洁交付说明的任务。执行完后可以接 [Issue / Jira -> Draft PR Runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook) 进入平台收口。

开始前先准备：

- 本轮改动摘要
- 已执行命令及结果
- 剩余风险和未做项

默认要求：

```text
请根据当前改动和命令结果，整理一份可放进 PR 的验证说明。
必须包含：改了什么、怎么验证、还有什么风险。
不要发明没有执行过的验证步骤。
```

成功信号：

- 说明足够 reviewer 快速判断
- 不会夸大已完成范围
- 命令、结果、风险三者能对上

切换条件：

- 如果 PR 本身还需要平台内大量交接，就接 [GitHub Copilot 常见任务](/docs/tools/platforms/github-copilot/common-tasks)

## 验收清单

- 每个任务都留下了真实命令证据。
- 输出不是泛泛总结，而是和当前仓库、当前改动对应。
- 只要任务开始变长或变复杂，你会主动换到更合适的入口。
- context file 没有膨胀成一整套难维护的隐含规则。

## 常见误用

- 用 Gemini CLI 处理本质上需要多阶段执行的大任务
- context file 越写越长，最后每轮都在重复解释
- 巡检任务只给结论，不保留命令证据
- PR 说明里出现没有实际执行过的验证

## 下一步

- 去 [Gemini CLI 排错](/docs/tools/terminal-agents/gemini-cli/troubleshooting)。
- 去 [Gemini CLI 最佳实践](/docs/tools/terminal-agents/gemini-cli/best-practices)。
- 如果任务开始需要更强并行与阶段推进，转去 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)。

## 来源

- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [Gemini CLI Context Files](https://google-gemini.github.io/gemini-cli/docs/cli/configuration/#context-files)
