---
title: Incident / Handoff 模板
description: 用于值班交接、事故跟进和跨团队运维 handoff 的模板。
slug: /roles/devops/templates/incident-handoff
sidebar_label: Incident / Handoff 模板
tags: [ai-coding, devops, templates]
track: cross-track
kind: template
content_form: template
audience: devops-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# Incident / Handoff 模板

```md
# {事件 / 交接主题}

## 1. 当前状态
- 是否已恢复
- 当前风险等级
- 下一观察窗口

## 2. 已做动作
- 已执行的命令 / 变更
- 已确认的现象

## 3. 待继续的事项
- 还没做什么
- 需要谁接手
- 截止时间

## 4. 关键链接
- dashboard
- 日志检索
- runbook
- issue / PR / 变更单

## 5. 升级与止损条件
- 何时升级
- 升级给谁
- 何时触发更大范围回滚
```

## 使用提醒

- 交接时要写“下一观察窗口”，避免接手人不知道何时再看。
- `关键链接` 至少要覆盖 dashboard、日志和变更记录三类。
