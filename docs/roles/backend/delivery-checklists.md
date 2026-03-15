---
title: 交付检查表
description: 用统一检查表训练后端团队在接口、迁移、集成和发布中稳定收口 AI 产出。
slug: /roles/backend/delivery-checklists
sidebar_label: 交付检查表
tags: [ai-coding, backend, checklist]
track: cross-track
kind: guide
content_form: guide
audience: backend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: testing-validation
entry_role: domain
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
---

# 交付检查表

这页不是为了增加流程负担，而是把后端 AI 产出中最常漏掉的风险显式列出来。训练时可以把它当课堂练习模板，交付时可以把它当 PR、自测或发布前的统一检查项。

## 接口变更检查表

- contract 是否已经更新，包括请求、响应、错误码和鉴权说明。
- 是否说明了新增字段默认值、废弃字段策略和版本兼容性。
- 是否给了至少一个成功样例和一个失败样例。
- 是否定义了调用方需要感知的 rate limit、幂等或分页规则。

详细背景可以回看 [API 与契约](/docs/roles/backend/api-and-contracts)。

## 数据迁移检查表

- migration 是否有前进和回退说明。
- 是否明确兼容期内的新旧代码如何共存。
- 是否写清回填策略、执行窗口和失败恢复方式。
- 是否评估索引、锁、慢查询和批处理成本。

相关说明见 [数据与存储](/docs/roles/backend/data-and-storage)。

## 外部集成与异步任务检查表

- provider 边界是否封装在独立 adapter 或 client 层。
- 是否定义超时、限流、重试、幂等和死信策略。
- Webhook 是否有签名校验、重放保护和重复事件处理。
- 队列或 job 是否有状态流转、补偿动作和人工接管点。

相关说明见 [服务集成与异步任务](/docs/roles/backend/services-and-integrations)。

## 测试与验证检查表

- lint、type-check、unit test、integration test 是否明确。
- contract test 或示例 payload 是否覆盖关键成功/失败路径。
- smoke path 是否覆盖真实高价值链路，而不是只测健康检查。
- PR 描述里是否写明新增验证、剩余风险和未覆盖项。

相关说明见 [质量门禁与测试](/docs/roles/backend/quality-and-testing)。

## 观测与发布检查表

- 是否补了 request ID、关键日志字段、trace 和基础指标。
- 是否写清灰度方式、回滚方式和触发人工接管的阈值。
- 是否给运维提供环境变量、告警和 dashboard 变更点。
- 是否给前端和测试提供联调文档、错误结构和 sandbox 说明。

相关说明见 [观测性与运维协作](/docs/roles/backend/observability-and-operations)。

## 仓库与规则检查表

- contract、migration、adapter、ops artifact 是否在清晰目录边界里。
- 任务上下文里是否附了运行命令、关键文件和禁止越界项。
- 仓库级规则是否写在统一说明文件里，而不是只写在单一工具 rules。
- reviewer 是否能从 PR 和文档里直接找到验证证据。

相关说明见 [仓库结构与交付](/docs/roles/backend/architecture-and-delivery) 和 [上下文与规则](/docs/roles/backend/context-and-rules)。

## 训练用法建议

### 一对一带练

让学员挑一个真实任务，要求按这页清单逐条填写“已覆盖 / 未覆盖 / 风险说明”。如果很多项回答不出来，说明不是代码问题，而是任务上下文还没准备好。

### 团队评审

把这页当 review 前置模板。比起让 reviewer 在 diff 里猜风险，先让作者用统一清单声明边界，评审效率会高很多。

### 发布前收口

把最关键的 8 到 12 项沉淀成团队自己的 release checklist，再结合 [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud/runbook) 或现有 CI/CD 流程执行。

## 下一步

- 想先按阶段推进训练：去 [培训路线](/docs/roles/backend/training-roadmap)。
- 想先回主题总览：去 [后端 AI 工作台](/docs/roles/backend)。
- 想把 checklist 变成真实任务模板：去 [模板与交付资产](/docs/roles/backend/templates-and-handoffs)。
- 想挑一类典型演练场景开练：去 [演练与案例地图](/docs/roles/backend/labs-and-case-maps)。
- 想把检查项进一步变成讲师评分标准：去 [能力评估矩阵](/docs/roles/backend/assessment-rubric)。
- 想先看这些检查项最常在哪些场景失效：去 [失败模式与止损](/docs/roles/backend/failure-modes-and-recovery)。
- 想先补更底层的统一规范：去 [AI 开发规范](/docs/ai-development-standards)。
