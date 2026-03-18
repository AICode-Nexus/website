---
title: 任务 Brief 模板
description: 用统一的前端任务 brief 锁定范围、设计输入、验收条件和媒体证据。
slug: /roles/frontend/templates/task-brief
sidebar_label: 任务 Brief
tags: [ai-coding, frontend, templates]
track: cross-track
kind: guide
content_form: guide
audience: frontend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# 任务 Brief 模板

适用场景：页面任务启动、组件改造 kickoff、共享层重构前的范围锁定。

```yaml
task:
  goal: ""
  scope:
    - ""
  non_goals:
    - ""
  route_or_entry: ""
  framework: ""
  design_input:
    figma_node: ""
    screenshots:
      - ""
    tokens: ""
  constraints:
    component_base: ""
    style_system: ""
    shared_boundary: ""
  acceptance:
    - ""
  artifacts:
    - "desktop screenshot"
    - "mobile screenshot"
    - "15-30s recording"
    - "risk note"
  verification:
    - ""
```

## 最少别漏的字段

| 字段 | 为什么不能漏 |
| --- | --- |
| `scope` | 不锁范围，shared/ui 很容易被顺手污染 |
| `design_input` | 只给文字目标，视觉和交互会重新靠猜 |
| `acceptance` | 不写验收，返工会延后到 review |
| `artifacts` | 不写截图和录屏要求，证据包通常补不齐 |

## 使用提醒

- 配套机制页： [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files)
- 配套能力页： [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp)
