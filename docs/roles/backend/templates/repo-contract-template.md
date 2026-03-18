---
title: 仓库合同模板
description: 复制一份后端仓库级规则模板，把目录边界、migration 纪律、测试门禁和回滚要求固定下来。
slug: /roles/backend/templates/repo-contract-template
sidebar_label: 仓库合同模板
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

# 仓库合同模板

适用场景：后端仓库还没有稳定 `AGENTS.md`，或需要把长期规则从聊天里回写成仓库真相。

```md
## Backend Engineering Rules

- Keep API contracts explicit and versioned.
- Require schema or migration review for every persistent-data change.
- Do not merge new external integrations without timeout, retry, and idempotency rules.
- Treat lint, type-check, integration tests, and smoke paths as required release evidence.
- Use structured logs, request IDs, and traceable background-job identifiers.
- Document rollback conditions for migrations, config changes, and async consumers.
```

## 至少再补两件事

| 补什么 | 为什么 |
| --- | --- |
| 目录边界 | 不写清 controller / service / repository / job 的边界，agent 很快会越层改动 |
| 发布与回滚纪律 | 不写清 smoke、告警和 rollback，PR 只会停在“测试通过” |

## 配套页面

- [上下文与规则](/docs/roles/backend/context-and-rules)
- [规则与规范文档](/docs/roles/backend/rules-and-instruction-files)
