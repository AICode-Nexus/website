---
title: API 与契约
description: 用 AI 处理后端接口时，先固定 contract、示例和兼容性边界。
slug: /roles/backend/api-and-contracts
sidebar_label: API 与契约
tags: [ai-coding, backend, api]
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

# API 与契约

AI 最适合处理“边界已经被定义”的接口工作，而不是凭一句“帮我生成一个 API”去猜需求。对后端来说，真正能让产出稳定的不是模型多聪明，而是 request、response、error model、auth scope 和兼容性要求有没有先变成明确制品。

## 先让 AI 看什么

在让 agent 动手之前，至少给出这几类信息：

- 路由与方法：路径、HTTP 方法、版本策略、是否需要幂等键。
- 请求与响应：字段定义、必填项、分页/排序/过滤规则、示例 payload。
- 错误模型：业务错误码、HTTP 状态码、客户端可恢复/不可恢复的分界。
- 权限边界：谁能调用、资源级鉴权在哪一层做、哪些字段需要脱敏。

如果这些内容还没写出来，先走 [Spec-First](/docs/workflows/patterns/spec-first/runbook)；等 contract 稳定后，再把实现和测试交给 AI，会比“先写代码再回头补文档”便宜得多。

## REST、GraphQL、内部 RPC 怎么选

### 对外接口，默认优先显式 REST contract

当团队还在建设训练材料时，REST + OpenAPI 往往最适合做默认入口，因为 review、mock、SDK 生成和跨团队 handoff 都更稳定。AI 也更容易围绕 status code、schema 和示例做增量改动。

### GraphQL 适合多消费者，但要先固定 ownership

如果你确实在做 BFF 或多端聚合，GraphQL 没问题，但必须先明确 schema owner、字段演进策略和性能预算，否则 AI 很容易把 resolver 改成“能跑但不可控”的状态。

### 内部 RPC 适合强类型边界，不适合替代公开契约

内部 service-to-service 通信如果已经有稳定的 protobuf 或 typed contract，可以让 agent围绕既有 schema 修改；但不要把“内部 RPC 很清晰”误当成“对外接口也不需要文档化”。

## 合同优先的交付物

推荐把这几类产出视为和实现代码同等重要：

- OpenAPI 或等价 schema 文件。
- DTO / model 定义与示例请求、响应。
- 错误码表、rate limit 规则和鉴权说明。
- 变更日志：新增字段、废弃字段、默认值变化、兼容性说明。

这类文档最好和 [仓库结构与交付](/docs/roles/backend/architecture-and-delivery) 里的 contract package、SDK 输出或 docs 目录放在一起，这样 AI 修改接口时不会只改 controller 忘记改契约。

## AI 输出必须补的审查点

### 兼容性

- 新字段是否有默认值。
- 删除或重命名字段是否会破坏旧客户端。
- 错误码是否发生语义漂移。

### 安全性

- 是否把内部异常直接暴露给客户端。
- 是否漏掉 tenant、owner、scope 等鉴权条件。
- 是否在日志里泄露 token、PII 或敏感 payload。

### 可运维性

- 是否补了 request ID、trace、关键 error log。
- 是否定义了慢请求、失败率或队列堆积的监控信号。

这些检查项通常要和 [质量门禁与测试](/docs/roles/backend/quality-and-testing) 以及 [观测性与运维协作](/docs/roles/backend/observability-and-operations) 一起读，才能形成闭环。

## 默认工作流

- 新接口或版本升级：先走 [Spec-First](/docs/workflows/patterns/spec-first/runbook)。
- 已知 contract 上的小步增量：走 [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。
- 线上问题回收成最小 patch：走 [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

## 下一步

- 契约已经清楚，准备落到 schema 和迁移：去 [数据与存储](/docs/roles/backend/data-and-storage)。
- 契约已经发布，准备补验证：去 [质量门禁与测试](/docs/roles/backend/quality-and-testing)。
- 契约涉及 SDK、文档和发布制品：去 [仓库结构与交付](/docs/roles/backend/architecture-and-delivery)。
