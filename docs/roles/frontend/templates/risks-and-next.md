---
title: Risks / Next 模板
description: 单独记录前端任务中的未覆盖风险、回滚入口和下一步建议，避免交付时假装全覆盖。
slug: /roles/frontend/templates/risks-and-next
sidebar_label: Risks / Next
tags: [ai-coding, frontend, templates]
track: cross-track
kind: template
content_form: template
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

# Risks / Next 模板

适用场景：需要单独交付风险说明、上线观察项或下一步 handoff 建议。

```md
# Risks / Next

## Not Covered Yet

- 路径：
- 原因：

## Watch After Merge

- 指标 / 页面：
- 关注窗口：

## Rollback Entry

- 代码：
- 配置：
- 数据 / 资源：

## Next Owner

- 谁继续接：
- 下一步动作：
```

## 最适合什么时候单独拆出来

| 场景 | 为什么要单独写 |
| --- | --- |
| 共享层改动 | 影响面大，不能只埋在 PR 正文里 |
| 浏览器回归风险 | 上线后观察项通常比本次命令更重要 |
| 多人交接 | 下一个 owner 需要明确接力点 |

## 使用提醒

- 配套说明页： [测试与交付](/docs/roles/frontend/testing-and-delivery)
- 如果只是轻量任务，也可以合并回 [PR / Handoff 模板](/docs/roles/frontend/templates/pr-handoff)
