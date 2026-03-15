---
title: 能力评估矩阵
description: 用后端训练阶段、可观察行为、风险控制和交付证据来评估学员是否真正掌握 AI 协作能力。
slug: /roles/backend/assessment-rubric
sidebar_label: 能力评估矩阵
tags: [ai-coding, backend, assessment]
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

# 能力评估矩阵

有了训练路线、模板和演练题之后，培训最容易失控的地方就变成了“大家都感觉做过了，但没人说得清到底有没有学会”。这页把后端 AI 培训拆成 5 个维度，并定义每个维度的可观察行为、常见失误和最低交付证据。

## 怎么用这份矩阵

- 讲师带练时，不要只看代码结果，要按下面的维度逐项观察。
- 学员自评时，不要只给“会/不会”，而要说明自己拿得出哪些证据。
- 团队复盘时，把失败模式回写到 [模板与交付资产](/docs/roles/backend/templates-and-handoffs)、[交付检查表](/docs/roles/backend/delivery-checklists) 和 [上下文与规则](/docs/roles/backend/context-and-rules)。
- 如果你还说不清团队到底会在哪一步翻车，先看 [失败模式与止损](/docs/roles/backend/failure-modes-and-recovery)。

## 五个核心维度

| 维度 | 看什么 | 最低证据 |
| --- | --- | --- |
| 契约表达 | 是否能先写清 request/response/error/auth 边界 | contract、payload 示例、兼容性说明 |
| 数据与集成边界 | 是否能提前说清 migration、backfill、重试、幂等与回滚 | migration 计划、adapter 说明、失败分类 |
| 验证证据 | 是否能把 lint、test、integration、smoke 和风险绑定 | 命令结果、测试覆盖、未覆盖说明 |
| 运行与协作 | 是否能把日志、trace、告警和 handoff 做成显式交付物 | 发布说明、指标清单、跨团队 handoff 包 |
| 风险控制 | 是否能在 AI 协作中守住不越界、不顺手扩 diff、不隐藏风险 | PR 风险说明、范围声明、人工接管点 |

## 等级定义

### L1：能在指导下完成

- 能照着模板填写输入和输出。
- 能在明确边界内让 AI 生成初稿。
- 需要他人指出明显漏项，例如缺 contract、缺验证或缺回滚说明。

### L2：能独立完成单条链路

- 能自己选择合适工作流，不再把所有任务都塞进一个入口。
- 能交付最小闭环产物，而不是只交一段代码。
- 能在 reviewer 提问前给出主要风险和验证结果。

### L3：能带别人做并收口

- 能为他人设计任务输入、模板和验收方式。
- 能把失败模式回流到规则、模板和 checklist。
- 能在多角色协作里把前端、测试、运维的 handoff 一并收口。

## 维度一：契约表达

### 达标表现

- 在动手实现前，先写清接口 contract。
- 能区分“需求没定清”与“contract 已经足够开始实现”。
- 知道什么时候该先转 [Spec-First](/docs/workflows/patterns/spec-first/runbook)。

### 常见失误

- 让 AI 直接写接口实现，却没有请求/响应与错误模型。
- 把兼容性问题留到联调阶段才暴露。

### 推荐对照材料

- [API 与契约](/docs/roles/backend/api-and-contracts)
- [培训路线](/docs/roles/backend/training-roadmap)
- [演练与案例地图](/docs/roles/backend/labs-and-case-maps)

## 维度二：数据与集成边界

### 达标表现

- 能把 schema 变更、backfill、缓存、队列和 provider 行为写清楚。
- 能在实现前说明幂等、重试、死信和回滚路径。
- 不会把 migration、adapter 和业务逻辑混成一层。

### 常见失误

- 把 migration 当成孤立 SQL，不说明兼容期。
- 把外部 SDK 直接散落进业务代码。
- 忽略失败恢复和告警信号。

### 推荐对照材料

- [数据与存储](/docs/roles/backend/data-and-storage)
- [服务集成与异步任务](/docs/roles/backend/services-and-integrations)
- [仓库结构与交付](/docs/roles/backend/architecture-and-delivery)

## 维度三：验证证据

### 达标表现

- 知道不同验证命令分别覆盖哪种风险。
- 能用最小 patch + 命令结果 + 风险说明组成评审材料。
- 不会把“build 过了”当作交付完成。

### 常见失误

- 只贴自然语言总结，不贴真实命令结果。
- 测试很多，但和这次风险不对应。
- 没有明确未覆盖项和人工兜底范围。

### 推荐对照材料

- [质量门禁与测试](/docs/roles/backend/quality-and-testing)
- [交付检查表](/docs/roles/backend/delivery-checklists)
- [Claude Code Bugfix 闭环案例](/docs/case-studies/claude-code-bugfix-loop)

## 维度四：运行与协作

### 达标表现

- 能把日志、trace、metrics、告警和发布说明接到同一条交付链上。
- 能给前端、测试、运维提供可直接消费的 handoff 包。
- 知道什么时候需要灰度、回滚和人工接管点。

### 常见失误

- 只在本地跑通，不考虑生产可观察性。
- 联调信息只存在聊天记录里。
- 发布失败时没人知道先看哪条信号。

### 推荐对照材料

- [观测性与运维协作](/docs/roles/backend/observability-and-operations)
- [模板与交付资产](/docs/roles/backend/templates-and-handoffs)
- [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff)

## 维度五：风险控制

### 达标表现

- 能在任务开始前声明范围和禁止项。
- 能在 AI 输出看起来“差不多能用”时，仍然坚持验证和 review。
- 能把失败模式回流到规则、工作流和模板，而不是只靠记忆避免重犯。

### 常见失误

- 顺手扩 diff，导致任务边界失控。
- 发现风险后只在口头提醒，不回写文档。
- 只比较首次输出速度，不看返工和回滚成本。

### 推荐对照材料

- [指标与风险](/docs/standards/evaluation-risk-metrics)
- [AI 开发规范](/docs/ai-development-standards)
- [上下文与规则](/docs/roles/backend/context-and-rules)

## 训练后的最低合格线

一个完成后端 AI 基础训练的人，至少应该满足：

- 能独立完成一次接口 contract 收敛。
- 能说清一次 schema 或集成改动的回滚与失败恢复。
- 能交付一份带真实验证结果的最小 patch。
- 能在发布前说明 handoff 对象、监控信号和人工接管点。

如果以上任何一条做不到，就不该说“已经会用 AI 做后端交付”。

## 继续阅读

- 想回到阶段化训练：去 [培训路线](/docs/roles/backend/training-roadmap)。
- 想回到真实演练：去 [演练与案例地图](/docs/roles/backend/labs-and-case-maps)。
- 想把评估结果回流成模板与检查项：去 [模板与交付资产](/docs/roles/backend/templates-and-handoffs) 和 [交付检查表](/docs/roles/backend/delivery-checklists)。
- 想先识别最常见的失控方式：去 [失败模式与止损](/docs/roles/backend/failure-modes-and-recovery)。
