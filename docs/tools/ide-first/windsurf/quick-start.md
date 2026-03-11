---
title: "Windsurf 快速开始"
description: "用 rules、memories 和编辑器内验证，在 Windsurf 里完成第一次一体化 IDE 闭环。"
slug: "/tools/ide-first/windsurf/quick-start"
sidebar_label: "快速开始"
sidebar_position: 2
tags: ["ai-coding", "tool", "windsurf", "tutorial"]
track: "cross-track"
kind: "tutorial"
content_form: "tutorial"
audience: "individual"
stage: "starter"
featured: false
domain: "tools"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["tool-quick-start", "windsurf"]
estimated_time: 20
prerequisites: ["Windsurf 已可使用", "本地仓库能运行验证命令", "你愿意先写清 rules 和记忆边界"]
deliverable: "一次在 IDE 内完成、可解释 rules 和记忆作用的最小任务闭环"
---

# Windsurf 快速开始

## 这页适合什么场景

- 你想用一体化 IDE 工作台推进高频维护任务。
- 你愿意明确 rules 和记忆边界，而不是把所有知识都塞进产品内。
- 你要验证的是 workspace 习惯能不能稳定复用，而不是一次性生成效果。

## 前置条件

- 你已经看过 [Windsurf 概览](/docs/tools/ide-first/windsurf)，知道它更适合作为产品化 workspace。
- 当前任务最好是高频维护型任务，方便观察 rules 和记忆是否真正帮到当前仓库。
- 你不会把所有长期知识都塞进 product memory。

## 20 分钟交付目标

第一次 quick start 只需要做到：

- 写清这次任务真正需要的 rules。
- 明确哪些信息可以留在 memory，哪些必须写回 repo。
- 在 IDE 内完成一轮最小改动、验证和说明。

## 推荐第一条任务

优先选：

- 修一个局部 bug
- 补一个测试
- 调整一个小型实现细节

第一次不要选：

- 需要长阶段推进的大改造
- 还没有验证命令的仓库
- 本质上应该交给平台或执行栈收口的多人协作任务

## 步骤

### 第 1 步：先定义这次只让规则解决什么

第一次只固定三类信息：

- 当前仓库目录边界
- 默认验证命令
- 本次任务不要做什么

如果这些规则还没有落回仓库文件，先参考 [仓库规则文件体系](/docs/repo-instruction-files)。

第一次最好顺手把记忆边界也写清：

```text
规则负责：
记忆负责：
必须写回仓库：
```

### 第 2 步：用一个高频维护任务试跑

优先选：

- 修一个局部 bug
- 补一个测试
- 调整一个小型实现细节

这类任务最容易对照 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook) 判断结果是否靠谱。

### 第 3 步：只保留当前任务真正需要的记忆

第一次不要把产品内记忆当知识库。只保留对当前仓库长期有价值、且可以被解释的稳定规则。

### 第 4 步：在 IDE 内看 diff、跑验证、写说明

最后一定要在 IDE 里完成三件事：

1. 看 diff 是否仍在范围内
2. 跑验证命令
3. 写简短交付说明

如果任务变成长链路，再转到 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。

## 验收清单

- 规则和记忆确实减少了重复解释，而不是制造第二套隐含知识。
- diff 和验证结果都能回到当前仓库语境里解释。
- 你能说明哪些知识应该留在 product memory，哪些必须写回 repo。
- 你能判断这次是否仍适合继续留在一体化工作台里。

## 常见失误

- 第一次就把大量长期知识塞进 memory，结果没人知道哪些还有效。
- rules 和 repo 事实分叉，但没有及时写回仓库文件。
- 只看 IDE 里的回答，不看 diff 和验证命令。
- 任务已经需要更长执行链路，却还坚持把所有步骤留在工作台里。

## 下一步

- 去 [Windsurf 常见任务](/docs/tools/ide-first/windsurf/common-tasks) 固定高频 SOP。
- 如果记忆或规则开始失控，去 [Windsurf 排错](/docs/tools/ide-first/windsurf/troubleshooting)。
- 如果要把一体化工作台变成长期系统，去 [Windsurf 最佳实践](/docs/tools/ide-first/windsurf/best-practices)。

## 来源

- [Windsurf AGENTS.md Discovery](https://docs.windsurf.com/windsurf/cascade/agents-md)
- [Windsurf Memories](https://docs.windsurf.com/windsurf/cascade/memories)
- [Windsurf Cascade](https://docs.windsurf.com/windsurf/cascade/cascade)
