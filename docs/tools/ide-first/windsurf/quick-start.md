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

## 前置条件

- 你已经看过 [Windsurf 概览](/docs/tools/ide-first/windsurf)，知道它更适合作为产品化 workspace。
- 当前任务最好是高频维护型任务，方便观察 rules 和记忆是否真正帮到当前仓库。
- 你不会把所有长期知识都塞进 product memory。

## 步骤

### 第 1 步：先定义这次只让规则解决什么

第一次只固定三类信息：

- 当前仓库目录边界
- 默认验证命令
- 本次任务不要做什么

如果这些规则还没有落回仓库文件，先参考 [仓库规则文件体系](/docs/repo-instruction-files)。

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

## 验证

- 规则和记忆确实减少了重复解释，而不是制造第二套隐含知识。
- diff 和验证结果都能回到当前仓库语境里解释。
- 你能说明哪些知识应该留在 product memory，哪些必须写回 repo。

## 下一步

- 去 [Windsurf 常见任务](/docs/tools/ide-first/windsurf/common-tasks) 固定高频 SOP。
- 如果记忆或规则开始失控，去 [Windsurf 排错](/docs/tools/ide-first/windsurf/troubleshooting)。
- 如果要把一体化工作台变成长期系统，去 [Windsurf 最佳实践](/docs/tools/ide-first/windsurf/best-practices)。

## 来源

- [Windsurf AGENTS.md Discovery](https://docs.windsurf.com/windsurf/cascade/agents-md)
- [Windsurf Memories](https://docs.windsurf.com/windsurf/cascade/memories)
- [Windsurf Cascade](https://docs.windsurf.com/windsurf/cascade/cascade)
