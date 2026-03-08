---
title: AI 写作流程
description: 站点维护文档：如何使用统一结构让 AI 协助生成可编辑、可发布、可沉淀的 Markdown 文档。
slug: /site-admin/ai-writing-workflow
sidebar_label: AI 写作流程
tags: [site-admin, writing]
track: cross-track
kind: guide
content_form: guide
domain: standards
journey_stage: implementation
entry_role: admin
audience: advanced
stage: intermediate
featured: false
---

# AI 写作流程

## 目标

用统一模板和固定结构生成可编辑、可审核、可发布、可沉淀的 Markdown 初稿，避免“生成很快，但无法维护”。

## 适用场景

- 站点长期知识文档写作
- Daily Brief、Weekly Roundup 草稿生成
- 把研究笔记改写成可发布 docs

## 推荐结构

### `guide`

- 背景或适用场景
- 结论先行
- 推荐做法
- 风险与边界
- 延伸阅读

### `comparison`

- 先看结论
- 对比维度
- 怎么选
- 风险与边界

### `playbook`

- 适用场景
- 前置准备
- 执行步骤
- 验收清单

### `insight`

- 核心判断
- 关键信号
- 现在该做什么
- 还要继续观察什么

### `daily-brief`

- `TL;DR`
- `What changed today`
- `Why it matters`
- `What to test`
- `Watchlist`
- `Sources`
- `Related docs`

## 写作流程

1. 明确受众和使用场景
2. 先选文档类型，再套对应结构
3. 写清标题、描述、slug 与 frontmatter
4. 用 AI 生成初稿，但保留边界和证据字段
5. 人工补充判断、风险和内部链接
6. 通过内容校验后再进入发布或 PR

## 审核清单

- 标题和描述是否明确
- 结构是否匹配文档类型
- 是否有足够正文密度，而不是只剩目录提纲
- 结论、做法、边界和链接是否完整
- 时效型文章是否补齐日期与来源

## 不要做

- 不要先让 AI 自由写，再反向猜结构
- 不要把会议记录或脑暴提纲直接发布
- 不要缺少“风险与边界”或“现在该做什么”
- 不要让短文长期占据核心知识方向入口

## 相关文档

- [每日更新工作流](/docs/site-admin/editorial-workflow)
- [网站实施计划](/docs/site-admin/site-roadmap)
- [知识新鲜度治理](/docs/freshness-governance)
