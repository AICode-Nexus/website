---
title: 组件状态合同模板
description: 用于固定组件状态、变体、交互和异常路径的设计合同模板。
slug: /roles/design/templates/component-state-contract
sidebar_label: 组件状态合同模板
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

# 组件状态合同模板

```md
# {组件名}

## 1. 组件职责
- 组件解决什么问题
- 不负责什么

## 2. 状态与变体
- 默认态
- hover / active / focus
- disabled / loading / error
- size / theme / density 变体

## 3. 内容规则
- 文案长度限制
- icon 使用规则
- 空状态或异常状态

## 4. 交互规则
- 点击 / hover / 键盘行为
- 动效要求
- 可访问性要求

## 5. 验收方式
- 需要对照的截图
- 需要验证的页面
- 不通过条件
```

## 使用提醒

- 状态不能只列 happy path。
- `组件职责` 写不清时，前端实现和测试范围都会漂移。
