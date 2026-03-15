---
title: 仓库结构与交付
description: 用清晰的目录边界和发布制品，让 AI 修改后端代码时更可控、更易 review。
slug: /roles/backend/architecture-and-delivery
sidebar_label: 仓库结构与交付
tags: [ai-coding, backend, architecture]
track: cross-track
kind: guide
content_form: guide
audience: backend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
---

# 仓库结构与交付

AI 在后端仓库里最怕的是边界含糊。controller、domain、migration、SDK、job、ops script 全混在一起时，agent 很容易改到“本来不该动的层”。所以训练后端团队时，目录结构本身就是一种质量门禁。

## 先选适合当前阶段的仓库形状

### 单服务仓库

适合团队还在稳定单个 API 或单个后台服务的阶段。优点是上下文集中、依赖关系简单；缺点是 contract、client、ops artifact 容易和业务代码搅在一起。

### 模块化单体

如果你已经有多个业务域，但部署节奏还没独立，模块化单体通常比过早微服务更适合 AI 协作，因为 agent 可以在清晰模块里改动，而不用跨很多仓库追踪上下文。

### monorepo 或多 package 仓库

当你需要共享 contract、SDK、schema 或 testing utilities 时，monorepo 会更有价值，但前提是 package boundary 清楚，不能靠随意相对路径互相穿透。

## 目录边界应该把什么分开

无论用哪种仓库形状，至少把这几类职责分开：

- `contracts`：OpenAPI、schema、SDK 或 typed client。
- `db`：migration、seed、query utility、fixture。
- `services` 或 `domain`：核心业务逻辑。
- `infra`：adapter、外部服务 client、queue consumer、job runner。
- `ops`：smoke script、release checklist、dashboard/runbook 引用。

这样设计的好处是：当你让 AI 改 [API 与契约](/docs/roles/backend/api-and-contracts) 或 [数据与存储](/docs/roles/backend/data-and-storage) 时，修改范围自然落在对应层，而不是在整个仓库横跳。

## 交付制品不要只剩下代码 diff

一次完整后端交付最好至少带上其中几项：

- contract 文档或 SDK 更新。
- migration 与回滚说明。
- 新增 env var、secret 或 provider 配置项。
- 测试证据、smoke 结果和观测指标链接。

如果这些产出没有稳定位置，review 很快就会退化成“看 controller 改了什么”，这对 AI 改动尤其危险。

## PR 应该长什么样

后端 PR 最好按风险面组织，而不是按文件树组织。推荐说明：

- 改了哪条接口、哪条数据路径或哪条任务链路。
- 新增了哪些验证和告警。
- 剩余风险和人工接管点是什么。

这比一大段“修改了 A/B/C 文件”更适合 reviewer 快速判断是否越界。

## 默认工作流建议

- 目录边界不清时：先走 [Spec-First](/docs/workflows/patterns/spec-first/runbook)，不要直接让 agent 大范围重构。
- 目录边界清楚、只是做局部改动：优先 [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。
- 需要多阶段验证、后台任务或云端执行：切到 [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。

## 下一步

- 准备把规则、任务上下文和工具职责写清：去 [上下文与规则](/docs/roles/backend/context-and-rules)。
- 想把目录边界落到测试和发布门禁：去 [质量门禁与测试](/docs/roles/backend/quality-and-testing)。
- 想把运行指标和上线协作补齐：去 [观测性与运维协作](/docs/roles/backend/observability-and-operations)。
