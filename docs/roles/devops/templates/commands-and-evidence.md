---
title: 命令与证据模板
description: 用于记录 DevOps 变更验证命令、日志证据和监控截图的固定模板。
slug: /roles/devops/templates/commands-and-evidence
sidebar_label: 命令与证据模板
tags: [ai-coding, devops, templates]
track: cross-track
kind: guide
content_form: guide
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

# 命令与证据模板

~~~~md
# {变更名称}

## 1. 执行前证据
- 当前版本 / 当前参数
- 健康检查结果
- dashboard 截图链接

## 2. 执行命令
```bash
# 逐条记录执行过的命令
```

## 3. 执行后证据
- 新版本 / 新参数
- 健康检查结果
- 指标变化
- 日志样本

## 4. 例外情况
- 哪些检查没做
- 为什么没做
- 风险如何补偿
~~~~

## 使用提醒

- 不要只贴命令，不贴执行前后证据。
- 截图、日志片段和 dashboard 链接最好按同一顺序排列，方便 reviewer 快速核对。
