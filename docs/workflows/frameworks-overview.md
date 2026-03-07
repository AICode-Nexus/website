---
title: AI 工作流框架总览
description: 用复杂度、适用场景和产出物来比较 BMAD、Spec Kit 与 OpenSpec，避免一上来就照搬最重方案。
slug: /workflows/frameworks-overview
sidebar_label: 工作流框架总览
tags: [ai-coding, workflow, framework]
track: prompting-workflows
kind: guide
audience: advanced
stage: intermediate
featured: false
pillar: workflows
reviewed_at: 2026-03-07
source_window_end: 2026-03-07
market_status: current
---

# AI 工作流框架总览

## 结论先行

BMAD、Spec Kit 和 OpenSpec 解决的不是同一个问题。它们分别更偏向：

- `BMAD`: 多角色、多阶段、完整协作流程
- `Spec Kit`: 规格与计划产物链
- `OpenSpec`: 轻量变更和 Brownfield 场景

选型的关键不是谁“更先进”，而是谁更接近你当前的团队规模、任务复杂度和治理成熟度。

## 适用场景

- 团队想引入结构化 AI 工作流
- 需要决定工作流该轻还是该重
- 希望明确哪些框架适合新功能、哪些适合日常变更

## 三个框架怎么区分

| 维度 | BMAD | Spec Kit | OpenSpec |
| --- | --- | --- | --- |
| 核心关注点 | 多角色协作与完整交付 | 规格与计划产物 | 轻量变更和提案管理 |
| 更适合 | 中大型任务、多人协作 | 新功能、跨模块改动 | 小功能、现有项目改造 |
| 进入门槛 | 高 | 中 | 低 |
| 主要产出 | 角色化工作流、阶段产物 | spec、plan、tasks | proposal、changes、archive |
| 最佳用法 | 作为团队流程骨架 | 作为规格驱动主线 | 作为轻量变更层 |

## 怎么选

### 选 BMAD，如果你需要角色化协作

适合：

- 任务跨多个阶段和角色
- 需要 PM、架构、开发、测试的明确 handoff
- 希望把 AI 流程做成团队制度

### 选 Spec Kit，如果你最缺的是规格链路

适合：

- 新功能开发
- 需求复杂、容易在实现期跑偏
- 需要“先说明做什么，再说明怎么做”

### 选 OpenSpec，如果你最缺的是轻量控制

适合：

- Brownfield 项目
- 高频小改动
- 需要显式记录变更，但不想引入太重流程

## 推荐的组合方式

### 方案一：Spec Kit + 仓库级 contract

适合多数中小团队。先用 Spec Kit 固定规格，再用当前仓库自己的 contract、门禁和 review 流程承接执行。

### 方案二：OpenSpec + Bugfix / Refactor / Test 模板

适合日常迭代密集的现有项目。用轻量变更管理配合固定任务模板，先把高频任务稳定住。

### 方案三：BMAD + 仓库级规范

适合平台团队或多角色团队。BMAD 解决角色与阶段，仓库规范负责权限、验证和内容治理。

## 推荐做法

1. 不要直接照搬最重框架，先用一个月试跑真实任务
2. 先选择与当前任务规模匹配的框架，再补缺失环节
3. 框架选定后，把验证命令、review 清单和规则文件落回仓库

## 风险与边界

- 工作流框架不能替代仓库规则和质量门禁
- 同一个团队同时上多套重流程，通常会先死在维护成本上
- 不要把框架文档当作一次性引入项目，必须跟实际任务一起迭代

## 延伸阅读

- [Spec-driven AI Delivery](/docs/spec-driven-ai-delivery)
- [任务工作流目录](/docs/workflows/workflow-catalog)
- [AI 规范](/docs/standards)
