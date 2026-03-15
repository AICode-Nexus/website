---
title: 培训路线
description: 把后端 AI 协作拆成可执行的训练阶段，逐步固定契约、数据、集成、验证和发布能力。
slug: /roles/backend/training-roadmap
sidebar_label: 培训路线
tags: [ai-coding, backend, training]
track: cross-track
kind: guide
content_form: guide
audience: backend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: development-planning
entry_role: domain
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
---

# 培训路线

后端 AI 培训最怕两种失衡：一种是只会让 agent 写代码，不会定义 contract 和验证；另一种是只会看概念页，始终没有真正跑出一条接口到上线的闭环。这份路线把训练拆成 4 个阶段，每个阶段都要求产出真实文档、命令和交付证据。

## 怎么使用这份路线

- 如果你是第一次给后端团队做 AI 培训，按阶段顺序推进，不要跳过验证与发布阶段。
- 如果团队已经能稳定生成接口，但经常在 migration、回归或上线时失控，直接从对应阶段补课。
- 每个阶段都要选一个真实任务做练习，而不是只读完文档。

## 阶段一：把接口边界写清

### 训练目标

- 能把请求、响应、错误码、鉴权和兼容性要求写成显式 contract。
- 能区分“需求还没清楚，先做 spec”与“contract 已经清楚，可以让 AI 实现”。

### 对应文档

- [API 与契约](/docs/roles/backend/api-and-contracts)
- [Spec-First](/docs/workflows/patterns/spec-first/runbook)
- [Prompt Contracts](/docs/workflows/prompt-contracts)

### 练习任务

- 为一个已有接口补齐 OpenAPI 或等价 schema。
- 为一个新接口写出错误码表、鉴权说明和示例 payload。

### 达标信号

- 评审时讨论的是 contract 是否正确，而不是“controller 到底想干嘛”。
- 前端和测试能直接根据接口文档开始准备联调与回归。

## 阶段二：把数据和异步边界写清

### 训练目标

- 能把 schema 变更、索引、回填、缓存和队列策略说清楚。
- 能给第三方集成、Webhook 和后台任务补上幂等、重试和补偿规则。

### 对应文档

- [数据与存储](/docs/roles/backend/data-and-storage)
- [服务集成与异步任务](/docs/roles/backend/services-and-integrations)
- [仓库结构与交付](/docs/roles/backend/architecture-and-delivery)

### 练习任务

- 设计一次带兼容期的 schema 变更，并写出 migration 与回填计划。
- 为一个外部 provider 接入写出 adapter 边界、重试策略和失败分类。

### 达标信号

- 团队在 PR 前就能说明回滚路径，而不是上线后才补救。
- 对缓存、队列和异步任务不再用“先接上再说”的方式推进。

## 阶段三：把验证链固定下来

### 训练目标

- 能把 lint、type-check、unit、integration、contract、smoke 串成固定门禁。
- 能在 reviewer 提问前主动给出测试证据和剩余风险。

### 对应文档

- [质量门禁与测试](/docs/roles/backend/quality-and-testing)
- [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test/runbook)
- [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)

### 练习任务

- 选一个真实 bugfix，要求用最小 patch + 验证命令 + 风险说明完成。
- 给一个接口补 contract test 与 integration test，并记录 smoke path。

### 达标信号

- “build 过了”不再被当作完成标准。
- 作者能明确说明哪些风险已覆盖、哪些风险仍未覆盖。

## 阶段四：把生产运行与协作收口

### 训练目标

- 能把日志、trace、metrics、告警和回滚要求接到交付链上。
- 能把后端交付物稳定 handoff 给前端、测试和运维。

### 对应文档

- [观测性与运维协作](/docs/roles/backend/observability-and-operations)
- [上下文与规则](/docs/roles/backend/context-and-rules)
- [运维工程师](/docs/roles/devops)
- [测试工程师](/docs/roles/qa)

### 练习任务

- 为一个关键链路补 request ID、trace 和告警指标。
- 为一次发布写出 smoke、灰度、回滚和人工接管条件。

### 达标信号

- 发布前就知道出了问题先看哪条告警、回滚哪层制品。
- 跨团队 handoff 不再依赖口头解释或聊天记录。

## 推荐训练节奏

| 时间 | 重点 | 产出 |
| --- | --- | --- |
| 第 1 周 | 接口 contract 与 prompt contract | 接口文档、错误码表、任务合同 |
| 第 2 周 | migration、数据回填、provider 集成 | migration 计划、adapter 说明、失败分类 |
| 第 3 周 | 测试与验证链 | 可执行验证命令、integration/contract test、smoke 说明 |
| 第 4 周 | 观测性、发布、跨团队交付 | 日志/指标清单、发布检查项、handoff 模板 |

## 继续阅读

- 想直接按主题学：回 [后端 AI 工作台](/docs/roles/backend)。
- 想用统一检查项带练：去 [交付检查表](/docs/roles/backend/delivery-checklists)。
- 想直接复制 prompt、规则和 PR 模板：去 [模板与交付资产](/docs/roles/backend/templates-and-handoffs)。
- 想把四个训练阶段落到具体演练题：去 [演练与案例地图](/docs/roles/backend/labs-and-case-maps)。
- 想定义讲师和学员的达标标准：去 [能力评估矩阵](/docs/roles/backend/assessment-rubric)。
- 想先明确不同任务应该用哪类入口：去 [工具匹配与选型](/docs/roles/backend/tool-fit-and-selection)。
- 想看整个站点的默认学习顺序：去 [AI Coding 学习路径](/docs/start/learning-paths)。
