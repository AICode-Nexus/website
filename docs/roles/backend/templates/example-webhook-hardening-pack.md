---
title: 示例：Webhook 加固训练包
description: 一份已填写的后端训练包示例，演示 contract、集成、验证和 rollback 说明如何组合。
slug: /roles/backend/templates/example-webhook-hardening-pack
sidebar_label: 示例：Webhook 加固
tags: [ai-coding, backend, templates, examples]
track: cross-track
kind: guide
content_form: guide
audience: backend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# 示例：Webhook 加固训练包

这个示例把 [仓库合同模板](/docs/roles/backend/templates/repo-contract-template)、[接口改动 Brief 模板](/docs/roles/backend/templates/api-change-brief)、[外部集成任务模板](/docs/roles/backend/templates/integration-task-brief)、[命令与验证模板](/docs/roles/backend/templates/commands-and-validation) 和 [PR / Handoff / Rollback 模板](/docs/roles/backend/templates/pr-handoff-and-rollback) 串成一个真实后端改造包。

## 场景

- 目标：为 `billing webhook` 增加幂等校验、超时重试和失败告警。
- 风险：重复消费、旧客户端兼容、provider 重试风暴。

## 1. Repo Contract 摘要

```md
## 长期规则
- webhook adapter 不得直接散落在业务 service
- 所有 provider 重试必须显式配置 timeout / retry / dead-letter
- webhook 失败必须打结构化日志并带 request_id
```

## 2. 接口 / 集成 Brief 摘要

```md
## 请求 schema
- event_id
- event_type
- signature

## 鉴权与幂等
- HMAC signature
- idempotency_key = provider + event_id
```

## 3. 命令与验证摘要

```md
## 验证
- pnpm lint
- pnpm test:contract
- pnpm test:integration webhook
- pnpm smoke:webhook

## 证据
- sandbox callback log
- duplicate replay test result
- rollback note
```

## 4. PR / Rollback 摘要

```md
## Risk boundary
- 不改 provider 计费逻辑
- 不变更已有 webhook path

## Rollback
- revert webhook consumer
- disable retry flag
- keep idempotency table schema
```

## 配套 workflow 与案例

- 先走 [Spec-First](/docs/workflows/patterns/spec-first/runbook)。
- 实现与验证阶段回到 [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。
- 想看验证闭环的产物组织方式：去 [Codex Refactor with Verification](/docs/case-studies/codex-refactor-with-verification)。
