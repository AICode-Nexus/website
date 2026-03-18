---
title: 命令与复现模板
description: 用于记录 SQL、脚本、notebook 与导出步骤的数据分析复现模板。
slug: /roles/data-analysis/templates/commands-and-repro
sidebar_label: 命令与复现模板
tags: [ai-coding, data-analysis, templates]
track: cross-track
kind: template
content_form: template
audience: data-analyst
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# 命令与复现模板

~~~~md
# {分析主题}

## 1. 环境与依赖
- Python / R / SQL 环境
- 关键库版本
- 数据连接说明

## 2. 执行步骤
1. 拉取或导出数据
2. 运行清洗脚本
3. 生成图表或报表

## 3. 关键命令 / 查询
```bash
# 命令
```

```sql
-- 关键 SQL
```

## 4. 输出位置
- notebook / script 路径
- 导出表格 / 图表位置

## 5. 复现限制
- 依赖的权限
- 无法公开的数据
- 手工步骤
~~~~

## 使用提醒

- SQL 或脚本不能只贴最终版本，最好说明执行顺序。
- `复现限制` 要单独列，否则接手人会误以为可以一键重跑。
