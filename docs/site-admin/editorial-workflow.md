---
title: 每日更新工作流
description: 站点维护文档：如何为 AICode-Nexus 持续产出 Daily Brief，并保持日期、来源、草稿状态和回流路径一致。
slug: /site-admin/editorial-workflow
sidebar_label: 每日更新工作流
tags: [site-admin, editorial]
track: cross-track
kind: guide
audience: advanced
stage: intermediate
featured: false
---

# 每日更新工作流

## 目标

Daily Brief 是站点的时效层，负责发现变化、给出初步判断，并把值得沉淀的主题回流到长期 docs。它不是为了追热点数量，而是为了给工程师和平台负责人提供可执行的每日判断。

## 适用场景

- 生成每日 AI coding 观察草稿
- 把快讯内容与长期知识库分层管理
- 为周报、月报和专题改写提供稳定选题源

## 标准流程

1. 先确认日期范围与选题范围
2. 再准备来源清单与 source manifest
3. 运行 Daily Brief 生成脚本产出草稿
4. 人工补齐判断、测试建议与相关 docs
5. 审核通过后去掉草稿状态并发布
6. 周度 / 月度复盘时决定哪些内容要回流 docs

## Daily Brief 固定结构

每日文章统一使用以下 7 段：

1. `TL;DR`
2. `What changed today`
3. `Why it matters`
4. `What to test`
5. `Watchlist`
6. `Sources`
7. `Related docs`

任何缺段、无来源或没有行动建议的文章，都不应该直接发布。

## 草稿与发布规则

- 自动生成的文章默认使用 `draft: true`
- 草稿可以进入 PR，但不应直接作为正式发布内容上线
- 正式发布前必须人工确认标题、日期、来源和相关文档链接
- 如果当天没有足够信号，可以发布短版 no-signal brief，但不能强行拼凑热点

## 回流长期知识的规则

只有满足下面任一条件的 Daily Brief，才应该回流 docs：

- 同一主题连续一周都出现重要变化
- 已经形成稳定做法、规范或选型判断
- 能明确归属到某个支柱文档

回流时要把“快讯表述”改写成“长期知识表述”，并补上复核日期、事实截止和市场状态。

## 审核清单

- 标题是否包含准确日期和主题
- 是否只覆盖 AI coding 相关变化
- 是否有清晰的行动建议或测试建议
- 来源是否可追溯
- Related docs 是否能把读者带回长期知识层

## 不要做

- 不要把 Daily Brief 当作长期文档直接堆进 docs
- 不要省略日期和来源
- 不要让自动脚本直接发布正式文章
- 不要把站外热点原样复制成站内内容

## 相关文档

- [AI 写作流程](/docs/site-admin/ai-writing-workflow)
- [网站实施计划](/docs/site-admin/site-roadmap)
- [Daily Brief](/blog)
