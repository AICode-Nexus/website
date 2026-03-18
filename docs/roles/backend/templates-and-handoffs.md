---
title: 模板与交付资产
description: 汇总后端 AI 培训中最常复用的规则模板、prompt 模板、验证命令和跨团队 handoff 资产。
slug: /roles/backend/templates-and-handoffs
sidebar_label: 模板与交付资产
tags: [ai-coding, backend, templates]
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

# 模板与交付资产

训练后端团队时，最值得复用的不是“某次聊得很顺的 prompt”，而是能跨任务重复使用的结构化资产。这页把最常用的四类资产放在一起：规则模板、任务 prompt、验证命令和跨团队交付物。

![后端训练包图板](/img/roles/backend/backend-training-pack-board.svg)

## 可直接复制的模板目录

如果你不想先读整页说明，下面这几份可以直接复制后改字段：

| 模板 | 适合什么时候用 |
| --- | --- |
| [仓库合同模板](/docs/roles/backend/templates/repo-contract-template) | 刚开始沉淀 repo contract 时 |
| [接口改动 Brief 模板](/docs/roles/backend/templates/api-change-brief) | contract 已明确，准备实现接口改动 |
| [Migration 变更模板](/docs/roles/backend/templates/migration-change-brief) | schema、索引、回填、回滚任务 |
| [外部集成任务模板](/docs/roles/backend/templates/integration-task-brief) | Webhook、队列、第三方 API、后台 job |
| [命令与验证模板](/docs/roles/backend/templates/commands-and-validation) | 固定 lint、test、smoke 和 release evidence |
| [PR / Handoff / Rollback 模板](/docs/roles/backend/templates/pr-handoff-and-rollback) | review、handoff、发布与回滚说明 |

## 已填写示例

- 想直接看一份 contract、集成、验证和 rollback 都填过的成品：去 [示例：Webhook 加固训练包](/docs/roles/backend/templates/example-webhook-hardening-pack)。

## 仓库级规则模板

下面这份模板适合放进仓库级规则文件，再按团队栈细化：

```markdown
## Backend Engineering Rules

- Keep API contracts explicit and versioned.
- Require schema or migration review for every persistent-data change.
- Do not merge new external integrations without timeout, retry, and idempotency rules.
- Treat lint, type-check, integration tests, and smoke paths as required release evidence.
- Use structured logs, request IDs, and traceable background-job identifiers.
- Document rollback conditions for migrations, config changes, and async consumers.
```

如果你还没有稳定的规则文件边界，先回 [上下文与规则](/docs/roles/backend/context-and-rules) 和 [仓库 instruction files 规范](/docs/repo-instruction-files)。

想直接复制：去 [仓库合同模板](/docs/roles/backend/templates/repo-contract-template)。

## 接口实现 prompt 模板

适合在 contract 已经清楚、准备进入实现阶段时使用：

```text
任务：实现一个后端接口改动
接口路径：
HTTP 方法：
请求 schema：
响应 schema：
错误码与状态码：
鉴权与租户边界：
需要兼容的旧客户端行为：
允许修改的文件：
必须补的验证：
- lint
- type-check
- contract test
- integration test
- smoke path
输出要求：
- 代码改动
- contract 或 schema 更新
- 风险说明
- 验证结果
```

如果你连 contract 都还没定清，先回 [API 与契约](/docs/roles/backend/api-and-contracts)。

想直接复制：去 [接口改动 Brief 模板](/docs/roles/backend/templates/api-change-brief)。

## migration 与数据变更 prompt 模板

适合 schema、索引、回填或缓存一致性相关任务：

```text
任务：设计并实现一次数据结构变更
当前 schema / 表：
变更目标：
兼容期策略：
是否需要 backfill：
索引与性能风险：
回滚策略：
允许修改的文件：
- migration
- model / repository
- integration tests
- release notes
必须给出的证据：
- migration 说明
- backfill 计划
- explain / 性能判断
- dry run 或测试结果
```

这类任务的真正边界在 [数据与存储](/docs/roles/backend/data-and-storage)，不要只把它当成“生成一段 SQL”。

想直接复制：去 [Migration 变更模板](/docs/roles/backend/templates/migration-change-brief)。

## 外部集成与异步任务 prompt 模板

适合第三方 API、Webhook、队列和后台 job：

```text
任务：实现或调整一个外部服务集成
集成对象：
鉴权方式：
超时与重试策略：
幂等键或去重规则：
失败分类：
告警与观测要求：
允许修改的层：
- adapter / client
- queue consumer / job runner
- config / env manifest
- integration tests
禁止直接做的事：
- 在业务代码里散落 SDK 调用
- 省略 timeout / retry / dead-letter 规则
- 缺少 sandbox 或 fake 测试路径
```

和这份模板配套的是 [服务集成与异步任务](/docs/roles/backend/services-and-integrations)。

想直接复制：去 [外部集成任务模板](/docs/roles/backend/templates/integration-task-brief)。

## 默认验证命令模板

后端培训时，建议先给出一个“按风险层分组”的验证顺序，而不是简单写“跑测试”：

```bash
# 静态与类型层
pnpm lint
pnpm typecheck

# 单元与合同层
pnpm test
pnpm test:contract

# 集成与发布前层
pnpm test:integration
pnpm build
pnpm smoke
```

Python 栈可以改成：

```bash
ruff check .
mypy .
pytest -q
pytest tests/contracts -q
pytest tests/integration -q
alembic upgrade head --sql
```

关键不是命令字面量，而是每条命令都和某个风险面绑定。更多说明见 [质量门禁与测试](/docs/roles/backend/quality-and-testing)。

想直接复制：去 [命令与验证模板](/docs/roles/backend/templates/commands-and-validation)。

## PR / 变更说明模板

后端 PR 最值得训练的是“风险导向说明”，不是文件清单：

```markdown
## What changed
- 改动的接口 / schema / 任务链路

## Why
- 业务背景与触发原因

## Risk boundary
- 不会改什么
- 哪些客户端 / 数据路径会受影响

## Validation
- lint / type-check / tests / smoke

## Rollback
- 回滚代码、migration、配置或消费链路的方法
```

这份说明最好和 [交付检查表](/docs/roles/backend/delivery-checklists) 一起用。

想直接复制：去 [PR / Handoff / Rollback 模板](/docs/roles/backend/templates/pr-handoff-and-rollback)。

## 跨团队 handoff 资产

### 给前端工程师

- 接口文档、示例 payload、错误码说明。
- 联调需要的 sandbox 数据和限流/幂等约束。
- 任何字段废弃、默认值变化或兼容期说明。

### 给测试工程师

- 关键成功/失败路径。
- contract test 范围、integration test 范围和未覆盖项。
- sandbox 凭证、mock 数据、重试与补偿预期。

### 给运维工程师

- 新增环境变量、密钥与 provider 配置项。
- 指标、告警、dashboard 或日志字段变化。
- 发布窗口、灰度条件、回滚条件和人工接管点。

### 给产品经理

- 功能边界、兼容性影响和已知风险。
- 为什么这次需要 migration、provider 变更或异步处理。
- 交付节奏和上线后关注指标。

## 训练建议

- 新人训练：先从这页模板复制，再回到主题文档理解每个字段为什么存在。
- 团队统一：把这里最常用的模板沉淀进 repo contract、issue template 或 PR template。
- 高风险任务：不要只复制模板，必须先用 [培训路线](/docs/roles/backend/training-roadmap) 判断当前任务落在哪个训练阶段。

## 下一步

- 想先按阶段训练：去 [培训路线](/docs/roles/backend/training-roadmap)。
- 想先按统一检查项验收：去 [交付检查表](/docs/roles/backend/delivery-checklists)。
- 想先挑一题真实带练：去 [演练与案例地图](/docs/roles/backend/labs-and-case-maps)。
- 想知道这些模板最终该按什么标准打分：去 [能力评估矩阵](/docs/roles/backend/assessment-rubric)。
- 想先看这些模板最容易在哪些地方失效：去 [失败模式与止损](/docs/roles/backend/failure-modes-and-recovery)。
- 想回主题总览选择入口：去 [后端 AI 工作台](/docs/roles/backend)。
