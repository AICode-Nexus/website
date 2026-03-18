---
title: Token 与约束模板
description: 用于沉淀颜色、间距、字号、命名和可访问性约束的设计系统模板。
slug: /roles/design/templates/tokens-and-constraints
sidebar_label: Token 与约束模板
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

# Token 与约束模板

```md
# {系统 / 页面名}

## 1. Token 范围
- color
- spacing
- typography
- radius / shadow

## 2. 命名规则
- token 命名模式
- alias 与 semantic token
- 禁止项

## 3. 约束
- 可访问性要求
- 响应式断点
- 平台差异

## 4. 例外情况
- 暂时允许的特例
- 何时回收

## 5. 输出位置
- Figma variables
- 文档页
- 前端主题文件
```

## 使用提醒

- `例外情况` 不写，特例就会永久留在系统里。
- `输出位置` 要同时覆盖设计和代码两边，避免只在 Figma 有记录。
