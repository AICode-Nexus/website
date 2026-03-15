---
title: 质量门禁与测试
description: 用 AI 生成后端实现后，必须用分层测试和发布门禁把行为收回来。
slug: /roles/backend/quality-and-testing
sidebar_label: 质量门禁与测试
tags: [ai-coding, backend, testing]
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

# 质量门禁与测试

后端 AI 协作最容易失控的阶段不是“生成代码”，而是“以为代码能跑就算完成”。真正可训练、可复用的后端交付，需要把 write-time、integration-time 和 release-time 三层门禁显式写出来，让 agent 和 reviewer 都知道什么算完成。

## 写代码时就该存在的门禁

- 类型和 schema 检查：DTO、OpenAPI、Pydantic/Zod model、ORM schema 要相互一致。
- 静态检查：lint、type-check、unsafe cast/nullable boundary 检查。
- 局部单测：关键 parser、mapper、policy、domain service 必须有最小单元测试。

如果一个改动连本地最小断言都没有，优先切到 [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test/runbook) 重新收敛，不要继续扩大 diff。

## 后端最关键的是集成与合同验证

### 集成测试

集成测试应该覆盖数据库、缓存、消息队列和关键外部 adapter，而不是只测 controller 函数。对 AI 产出的代码尤其如此，因为它往往在依赖交界处最容易出错。

### 合同测试

对外 API 至少要验证：

- 成功响应样例。
- 主要错误码和错误体结构。
- 鉴权失败、资源不存在、幂等冲突等边界情况。

如果接口给前端或外部客户使用，合同测试和示例 payload 最好和 [API 与契约](/docs/roles/backend/api-and-contracts) 放在同一处维护。

## 发布前门禁不能只剩“build 过了”

发布前至少需要回答：

- migration 是否 dry run 过。
- seed 或 fixture 是否覆盖关键回归路径。
- 日志、trace、指标和告警是否已存在。
- smoke test 是否覆盖最核心的用户路径和后台任务路径。

对于需要后台 agent 跑长链路验证的任务，直接切到 [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud/runbook) 会比手写一大段“待验证事项”更稳。

## 推荐的验证链条

下面是一个训练用的验证顺序示例，命令需要按你的栈替换：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:integration
pnpm build
pnpm smoke
```

或在 Python 栈里：

```bash
ruff check .
mypy .
pytest -q
pytest tests/integration -q
alembic upgrade head --sql
```

关键不是命令长什么样，而是每条命令都对应一个明确风险面。

## reviewer 应该追问什么

- 这次改动的最小行为边界是什么。
- 哪些测试是新增的，哪些风险仍然没覆盖。
- 如果上线后失败，第一条告警会在哪里出现。
- 回滚时需要撤回代码、迁移还是配置。

这些问题如果作者答不出来，就说明 [上下文与规则](/docs/roles/backend/context-and-rules) 还没准备充分。

## 下一步

- 准备把日志、指标和发布收口补齐：去 [观测性与运维协作](/docs/roles/backend/observability-and-operations)。
- 想把测试命令、contract 和 migration 放到更清楚的目录边界：去 [仓库结构与交付](/docs/roles/backend/architecture-and-delivery)。
- 准备给 agent 提供更稳定的任务上下文：去 [上下文与规则](/docs/roles/backend/context-and-rules)。
