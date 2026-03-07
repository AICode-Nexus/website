---
title: "Spec-First：适用信号与边界"
description: "什么时候优先用 Spec-First，什么时候不要用。"
slug: "/workflows/patterns/spec-first/fit-and-signals"
sidebar_label: "适用信号"
tags: ["ai-coding", "workflow", "spec-first"]
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

# Spec-First：适用信号与边界

Spec-First 不是“越先进越该上”的默认答案，而是一套适合特定任务结构和团队成熟度的做法。判断是否该上它，关键在于信号是否匹配，而不是产品名是否热门。

## 什么时候触发

- 需求边界模糊，稍不注意就会在实现阶段扩边界。
- 多个角色会 review 同一个改动，需要先对齐目标和非目标。
- 如果不先列验收标准，后续很难判断 agent 是否真的完成。

## 更适合谁

- 新功能、跨模块改动、需要显式验收的任务。
- 涉及 schema、API、权限、迁移或多端联动的需求。
- 组织希望先把“做什么”与“怎么做”分开审阅。

## 不适用场景

- 生产事故热修、单点配置修正或纯文案修订。
- 还没有基本验证命令、也没有人维护文档产物的团队。
- 明确只需一次性探索，不打算沉淀长期流程的场景。

## 默认切换条件

- 如果任务规模下降到只剩局部修复，应切回更轻的 bugfix / refactor / test 流。
- 如果任务规模升级到需要更多角色或更多产物，应切到更重的框架层，而不是硬撑当前模式。
- 如果团队没有 owner、没有验证命令或没有清晰边界，再好的工作流名词都不会救场。
