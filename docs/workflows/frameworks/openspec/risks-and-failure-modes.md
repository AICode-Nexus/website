---
title: "OpenSpec：误用与退出条件"
description: "OpenSpec 的常见误用、维护成本和退出信号。"
slug: "/workflows/frameworks/openspec/risks-and-failure-modes"
sidebar_label: "误用与退出条件"
tags: ["ai-coding", "workflow-framework", "openspec"]
track: "prompting-workflows"
kind: "guide"
audience: "mixed"
stage: "intermediate"
featured: false
pillar: "workflows"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# OpenSpec：误用与退出条件

框架最大的风险，不是它本身太差，而是团队把它用成“看起来很完整”的仪式，却没有把真实交付、验证和 review 绑进去。能不能及时退出错误用法，比一开始会不会写模板更重要。

## 常见误用

- 任何小 typo 都走 proposal，流程负担立刻超过收益。
- archive 永远不清理，导致没人再愿意看历史。
- proposal 写了很多，但实现和验证仍然全靠临场发挥。

## 维护成本

- proposal 模板与 archive 目录需要持续修剪。
- 需要有人判断哪些变化值得进入 OpenSpec，哪些不值得。
- 如果没有与 PR 和验证命令联动，就会变成孤立文档堆。

## 退出条件

- proposal 数量越来越多，但 merge 时没人再回看。
- 团队开始用 OpenSpec 包装大项目，最后流程既轻不下去也重不起来。
- archive 没有检索价值，成员只好回到聊天记录找上下文。

## 来源

- [OpenSpec](https://github.com/openspec-ai/openspec)
