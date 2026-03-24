---
title: 每日更新工作流
description: 站点维护文档：如何为 AICode-Nexus 持续产出 Daily Brief，并保持日期、来源、自动发布与回流路径一致。
slug: /site-admin/editorial-workflow
sidebar_label: 每日更新工作流
tags: [site-admin, editorial]
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

# 每日更新工作流

## 目标

Daily Brief 是站点的时效层，负责发现变化、给出初步判断，并把值得沉淀的主题回流到长期 docs。它不是为了追热点数量，而是为了给工程师和平台负责人提供可执行的每日判断。

## 适用场景

- 生成每日 AI coding 观察日报
- 自动从官方来源生成并发布每日 AI coding 简报
- 把仓库 issue 的高信号变化转成 blog 更新与长期 docs 判断
- 把快讯内容与长期知识库分层管理
- 为周报、月报和专题改写提供稳定选题源

## 标准流程

1. 定时工作流按当天日期抓取 GitHub、VS Code 和 OpenAI 的官方 feed
2. 自动筛选 AI coding 相关高信号条目，并生成 source manifest
3. 自动写入 Daily Brief 正式文章并直接发布
4. 如果当天没有足够信号，自动发布短版 no-signal brief
5. 周度 / 月度复盘时决定哪些内容要回流 docs

## Issue 监控补充流

除了官方 feed，这个站点还可以用 Codex automation 每天补一条 repo issue 观察流：

1. 检查过去 24 小时的 issue 变化，只保留对内容系统有复用价值的信号
2. 把原始 issue 输入写入 `content-sources/issues/`，保留 dated trace
3. 如有必要，生成当天的 issue-based blog，并更新长期 docs 页
4. 运行内容校验与构建，通过后自动 commit / push
5. 把结果回写到 inbox item

这条补充流的职责不是替代 Daily Brief，而是把“仓库内部真实维护压力”转成内容判断。更具体的规则见 [GitHub Issue 内容自动化](/docs/site-admin/github-issue-monitoring)。

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

## 自动发布规则

- 定时工作流默认直接生成正式发布内容，不再等待人工去掉 `draft`
- 自动发布只使用官方来源 feed，不依赖二手转载或社交媒体传闻
- 如果当天没有足够信号，工作流会发布短版 no-signal brief，而不是占位草稿
- 如果所有官方源抓取都失败，工作流应直接失败，而不是发布不可靠内容

## 回流长期知识的规则

只有满足下面任一条件的 Daily Brief，才应该回流 docs：

- 同一主题连续一周都出现重要变化
- 已经形成稳定做法、规范或选型判断
- 能明确归属到某个知识方向文档

回流时要把“快讯表述”改写成“长期知识表述”，并补上复核日期、事实截止和市场状态。

## 自动化检查清单

- 标题是否包含准确日期和主题
- 是否只覆盖 AI coding 相关变化
- 是否有清晰的行动建议或测试建议
- 来源是否可追溯且来自官方 feed
- Related docs 是否能把读者带回长期知识层

## 不要做

- 不要把 Daily Brief 当作长期文档直接堆进 docs
- 不要省略日期和来源
- 不要让自动脚本发布占位稿或“待补充”内容
- 不要把站外热点原样复制成站内内容

## 相关文档

- [AI 写作流程](/docs/site-admin/ai-writing-workflow)
- [GitHub Issue 内容自动化](/docs/site-admin/github-issue-monitoring)
- [网站实施计划](/docs/site-admin/site-roadmap)
- [Daily Brief](/blog)
