---
title: 命令与验证模板
description: 固定后端任务中的 lint、type-check、contract、integration 和 smoke 命令，避免“测试通过”没有上下文。
slug: /roles/backend/templates/commands-and-validation
sidebar_label: 命令与验证
tags: [ai-coding, backend, templates]
track: cross-track
kind: guide
content_form: guide
audience: backend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: testing-validation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# 命令与验证模板

适用场景：后端任务开做后，先把验证顺序和证据位置固定下来。

```bash
# Static / Type
pnpm lint
pnpm typecheck

# Unit / Contract
pnpm test
pnpm test:contract

# Integration / Release
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

## 使用提醒

- 每条命令都要能映射到某个风险面
- 如果某条命令没跑，要明确说明原因
- 最好配一份独立 `commands.md`

## 配套页面

- [质量门禁与测试](/docs/roles/backend/quality-and-testing)
- [交付检查表](/docs/roles/backend/delivery-checklists)
