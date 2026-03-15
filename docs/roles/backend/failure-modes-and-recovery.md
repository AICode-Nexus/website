---
title: 失败模式与止损
description: 总结后端 AI 协作中最常见的失控方式，以及如何在接口、数据、验证和发布阶段及时止损。
slug: /roles/backend/failure-modes-and-recovery
sidebar_label: 失败模式与止损
tags: [ai-coding, backend, risk]
track: cross-track
kind: guide
content_form: guide
audience: backend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: defect-optimization
entry_role: domain
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
---

# 失败模式与止损

后端 AI 协作最危险的地方，不是输出一段坏代码，而是团队直到上线前都没意识到它已经偏航。这页不讨论抽象“风险意识”，而是列出最常见的后端失败模式，以及每种失败模式出现时，应该立即停在哪一层、回补什么产物。

## 怎么使用这页

- 如果你在带后端培训，用它做复盘模板，比“这次感觉哪里不太对”更有效。
- 如果你已经在真实任务里踩坑，用它判断当前应该回退到 contract、migration、验证还是发布说明层。
- 如果你只是想提前避坑，把这页和 [交付检查表](/docs/roles/backend/delivery-checklists) 一起用。

## 失败模式一：接口能跑，但契约失真

### 典型症状

- controller 已经能返回 200，但请求/响应结构和调用方预期不一致。
- 错误码是现编的，review 时才发现前端没法消费。
- AI 修改了接口字段，却没有同步 contract 或示例 payload。

### 为什么会发生

任务一开始就让 agent“先把接口写出来”，而没有先固定 contract。

### 立即止损动作

- 停止继续扩实现层改动。
- 回到 [API 与契约](/docs/roles/backend/api-and-contracts)，先补 request/response/error/auth 说明。
- 把当前 diff 按 contract 重新裁剪，不要让实现继续领先于约束。

## 失败模式二：migration 写出来了，但上线策略没有

### 典型症状

- 有 up migration，没有兼容期说明或回滚方案。
- 回填脚本要在线上跑时，才意识到会锁表或扫描全量。
- 新旧代码需要并存，却没人明确双写/双读策略。

### 为什么会发生

团队把数据变更理解成“写一段 SQL”，而不是“设计一次线上演进”。

### 立即止损动作

- 暂停合并 migration。
- 回到 [数据与存储](/docs/roles/backend/data-and-storage)，补齐 backfill、索引、兼容期和回滚说明。
- 如果任务已跨多个模块，切回 [Spec-First](/docs/workflows/patterns/spec-first/runbook)。

## 失败模式三：接上第三方服务，但失败恢复完全空白

### 典型症状

- SDK 调用直接散落在业务逻辑里。
- 超时、重试、幂等和死信规则没有定义。
- Webhook 只处理 happy path，没有签名校验或重复事件处理。

### 为什么会发生

团队把“先接上接口”当成阶段性胜利，忽略了生产环境真正难的是失败路径。

### 立即止损动作

- 把直接散落的 SDK 调用收回 adapter/client 层。
- 回到 [服务集成与异步任务](/docs/roles/backend/services-and-integrations) 补失败分类与补偿策略。
- 如果已经进入评审，要求 PR 明确 dead-letter、人工接管和告警信号。

## 失败模式四：测试很多，但没有证据链

### 典型症状

- 作者说“本地都过了”，却拿不出真实命令结果。
- 有很多测试，但 reviewer 无法判断它们是否覆盖这次风险。
- build 通过被误当作交付完成。

### 为什么会发生

团队把测试当作勾选项，而不是把验证结果当作交付证据。

### 立即止损动作

- 回到 [质量门禁与测试](/docs/roles/backend/quality-and-testing) 按风险面重建验证链。
- 要求作者补真实命令结果、未覆盖项和剩余风险。
- 对高风险改动，用 [交付检查表](/docs/roles/backend/delivery-checklists) 重新收口。

## 失败模式五：本地没问题，但生产不可观察

### 典型症状

- 代码逻辑已经正确，但没有 request ID、关键日志字段或 metrics。
- 上线后失败了，只能靠翻代码猜是哪一步坏了。
- 队列、后台任务或 provider 调用没有任何告警信号。

### 为什么会发生

交付标准停留在“本地能跑”，没有把生产可观察性纳入 done definition。

### 立即止损动作

- 暂停发布或灰度扩大。
- 回到 [观测性与运维协作](/docs/roles/backend/observability-and-operations)，先补日志、trace、指标和告警。
- 给运维和测试补一份最小 handoff 包，说明要看哪些信号。

## 失败模式六：评审时才发现任务早就越界

### 典型症状

- 原本是小修小补，最后变成跨模块大 diff。
- 作者一边修 bug，一边顺手重构、改命名、改目录。
- reviewer 无法判断哪些改动是必要，哪些是“顺便做了”。

### 为什么会发生

开始任务时没有明确允许修改范围和禁止项，或者没有在过程中持续收边界。

### 立即止损动作

- 停止继续堆改动。
- 用 [模板与交付资产](/docs/roles/backend/templates-and-handoffs) 里的范围模板重写任务输入。
- 必要时拆成两次交付：一次只收当前风险，一次再做后续重构。

## 失败模式七：团队做过训练，但无法稳定复制

### 典型症状

- 演练时表现不错，换一个人或换一个任务就又回到自由发挥。
- 讲师知道该怎么做，但规则、模板和评分标准没有沉淀下来。
- 培训结束后，失败模式没有回流进文档。

### 为什么会发生

训练只停留在“讲过”和“看过”，没有把经验固化成资产。

### 立即止损动作

- 回到 [培训路线](/docs/roles/backend/training-roadmap) 和 [能力评估矩阵](/docs/roles/backend/assessment-rubric)。
- 把复盘结论回写到 [模板与交付资产](/docs/roles/backend/templates-and-handoffs) 与 [交付检查表](/docs/roles/backend/delivery-checklists)。
- 下次带练时优先用 [演练与案例地图](/docs/roles/backend/labs-and-case-maps) 里的固定场景，而不是重新编题。

## 一个简单判断标准

如果你发现问题后，第一反应仍然是“让 AI 再试一次”，而不是先问“缺的是 contract、migration 说明、验证证据还是发布信号”，那通常说明你还没有真正控制这次后端交付。

## 下一步

- 想把失败模式纳入评分：去 [能力评估矩阵](/docs/roles/backend/assessment-rubric)。
- 想把失败模式纳入检查项：去 [交付检查表](/docs/roles/backend/delivery-checklists)。
- 想把失败模式回流成更好的任务输入：去 [模板与交付资产](/docs/roles/backend/templates-and-handoffs)。
