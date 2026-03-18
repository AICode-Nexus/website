---
title: Figma Handoff 包模板
description: 用于设计稿交付给前端或设计系统 owner 的 Figma 节点、资产和限制说明模板。
slug: /roles/design/templates/figma-handoff-pack
sidebar_label: Figma Handoff 包模板
tags: [ai-coding, design, templates]
track: cross-track
kind: template
content_form: template
audience: designer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# Figma Handoff 包模板

```md
# {页面 / 组件名称}

## 1. 设计入口
- Figma file / page / node 链接
- 版本说明
- owner

## 2. 必看节点
- 主路径节点
- 失败状态节点
- 响应式断点节点

## 3. 资产清单
- 图片 / icon
- 文案来源
- 设计 token

## 4. 限制条件
- 不做什么
- 当前已知缺口
- 需要前端确认的部分

## 5. 交付对象
- 前端
- QA
- 设计系统 owner
```

## 使用提醒

- 只给 file 链接不够，至少要列出关键 node。
- `限制条件` 要显式写，避免前端默认全部按视觉猜测补齐。
