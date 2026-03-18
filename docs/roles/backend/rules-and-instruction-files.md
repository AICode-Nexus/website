---
title: 规则与规范文档
description: 把 AGENTS.md、CLAUDE.md、repo contract、任务 brief 和后端交付模板拆开治理，避免把所有约束都压进一段对话。
slug: /roles/backend/rules-and-instruction-files
sidebar_label: 规则与规范文档
tags: [ai-coding, backend, rules]
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

# 规则与规范文档

后端任务里最昂贵的错误，往往不是一段代码写错，而是 contract、migration、测试、发布和 observability 的责任没有写进稳定文档。结果是模型每次都在重新猜 controller、schema、job、告警和回滚到底要不要一起改。

## 后端规则文件怎么分层

| 载体 | 应该承载什么 | 后端最典型的内容 |
| --- | --- | --- |
| `AGENTS.md` | 仓库长期合同 | 目录边界、migration 纪律、测试门禁、发布规则 |
| `CLAUDE.md` 或等价说明 | 工具工作方式 | 默认命令、输出格式、优先探索路径 |
| 任务 brief | 本次改动合同 | 受影响服务、contract、migration、env、验证要求 |
| PR / handoff 模板 | 交付证据 | 命令、风险、兼容性、回滚说明 |

## 最值得写进后端长期规则的内容

- controller / service / repository / job / migration 各层边界。
- 新接口必须同时更新 contract、错误模型和示例 payload。
- schema 变化必须伴随迁移、回滚或兼容期说明。
- 发布前必须明确 smoke path、日志/指标信号和回滚入口。

## 任务 brief 最少字段

```yaml
task:
  goal: "为 billing webhook 增加幂等校验与失败重试"
  scope:
    - "services/billing-webhook"
    - "contracts/billing"
  must_update:
    - "错误模型"
    - "integration test"
    - "告警说明"
  verification:
    - "pnpm lint"
    - "pnpm test --filter billing-webhook"
    - "pnpm smoke:billing-webhook"
```

想直接复制：去 [接口改动 Brief 模板](/docs/roles/backend/templates/api-change-brief)、[Migration 变更模板](/docs/roles/backend/templates/migration-change-brief) 和 [外部集成任务模板](/docs/roles/backend/templates/integration-task-brief)。

## 最常见的失败方式

1. repo 真实约束只写在某个工具 rules 里。
2. migration、contract、测试和发布门禁没有写进同一个长期合同。
3. 任务 brief 没说明兼容性和回滚要求。
4. PR 只写“测试通过”，没写哪些风险仍未覆盖。

## 可直接复制的后端模板

- [仓库合同模板](/docs/roles/backend/templates/repo-contract-template)
- [接口改动 Brief 模板](/docs/roles/backend/templates/api-change-brief)
- [Migration 变更模板](/docs/roles/backend/templates/migration-change-brief)
- [外部集成任务模板](/docs/roles/backend/templates/integration-task-brief)
- [命令与验证模板](/docs/roles/backend/templates/commands-and-validation)
- [PR / Handoff / Rollback 模板](/docs/roles/backend/templates/pr-handoff-and-rollback)

## 下一步

- 想继续把能力映射到文档与上下文能力：去 [Skills 与 MCP](/docs/roles/backend/skills-and-mcp)。
- 想先判断不同后端任务该走哪个入口：去 [工具匹配与选型](/docs/roles/backend/tool-fit-and-selection)。
- 想回到后端机制总览：去 [上下文与规则](/docs/roles/backend/context-and-rules)。
