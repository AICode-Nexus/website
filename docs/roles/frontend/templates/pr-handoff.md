---
title: PR / Handoff 模板
description: 用统一结构写前端 PR 摘要和 handoff，方便 reviewer 和下一个接手人快速进入状态。
slug: /roles/frontend/templates/pr-handoff
sidebar_label: PR / Handoff
tags: [ai-coding, frontend, templates]
track: cross-track
kind: guide
content_form: guide
audience: frontend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: testing-validation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# PR / Handoff 模板

适用场景：PR 描述、handoff 文档、review 收口说明。

```md
## Summary

- 改了什么
- 为什么现在改

## Scope

- 影响页面 / 组件 / 包
- 明确不改什么

## Verification

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Artifacts

- Desktop:
- Mobile:
- Recording:

## Risks

- 尚未覆盖：
- 上线后观察：

## Next

- 下一个接手动作：
- 回滚 / 排查入口：
```

## 快速检查

- reviewer 能不能在 3 到 5 分钟内看完
- 有没有把命令、截图、录屏和风险放在同一处

## 使用提醒

- 配套说明页： [测试与交付](/docs/roles/frontend/testing-and-delivery)
- 风险可拆到单独的 [Risks / Next 模板](/docs/roles/frontend/templates/risks-and-next)
