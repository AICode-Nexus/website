---
title: 命令与证据模板
description: 固定前端任务中的 commands、截图、录屏和验证位置，避免证据散落。
slug: /roles/frontend/templates/commands-and-evidence
sidebar_label: 命令与证据
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

# 命令与证据模板

适用场景：任务开始后就准备验证目录，不等到 PR 阶段才临时找证据。

## 推荐目录

```text
verification/
  commands.md
  artifacts/
    desktop.png
    mobile.png
    flow.mp4
```

## `commands.md`

```md
# Commands

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run test:unit`
- [ ] `npx playwright test`

## Not Run

- Command:
- Reason:
```

## `artifacts/`

| 文件 | 用途 |
| --- | --- |
| `desktop.png` | 桌面端关键断点 |
| `mobile.png` | 移动端关键断点 |
| `flow.mp4` | 最短关键交互路径 |

## 使用提醒

- 配套说明页： [质量门禁](/docs/roles/frontend/quality-gates)
- 交付时要和 [PR / Handoff 模板](/docs/roles/frontend/templates/pr-handoff) 一起用
