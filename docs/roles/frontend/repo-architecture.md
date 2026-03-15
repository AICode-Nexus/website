---
title: 前端 AI 工作台：仓库结构
description: 让 pnpm、workspace、monorepo 和 Turborepo 成为 AI 更容易理解和执行的工程骨架。
sidebar_label: 仓库结构
tags: [ai-coding, frontend, monorepo, pnpm]
track: cross-track
kind: guide
content_form: guide
audience: frontend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
slug: /roles/frontend/repo-architecture
---

# 前端 AI 工作台：仓库结构

前端 AI 的稳定性，很大程度上取决于 repo 骨架是否清晰。结构乱，AI 就会在错误的目录里改错的文件。

## 什么时候单应用足够

如果你的场景是：

- 单一站点
- 没有共享 UI 包
- 没有多个 app
- 团队规模不大

那单应用结构通常最省心。对 AI 来说，这种结构最容易读懂。

## pnpm / workspace

当你开始出现这些需求时，就该认真考虑 workspace 了：

- 多个 package 共用依赖
- 共享组件库
- 设计 token 包
- 工具脚本和业务代码要分层

AI 在这类结构里最适合做：

- 对齐依赖声明
- 生成 workspace 脚本
- 明确 app / lib / tool 三类目录职责

## monorepo / Turborepo

monorepo 对 AI 不是天然友好，前提是你先把边界写清楚。

至少要让 AI 知道：

- 哪些包负责 UI
- 哪些包负责业务
- 哪些包只是工具或配置
- 哪些命令由 `turbo run` 驱动

`Turborepo` 的价值在 AI 协作里很直接：

- 任务链清晰
- 缓存路径明确
- build / lint / test / typecheck 的顺序更容易被固定

如果团队已经在用 `Nx` 或其他任务系统，也可以参考同样原则：任务和边界要清楚，别让 AI 用猜的。

## 共享 UI 包还是页面内组件

这类问题是 AI 最容易“过度抽象”的地方。

更稳的原则是：

- 先页面内稳定，再提共享
- 没有至少两个真实消费方，不急着抽公共包
- 共享 UI 包必须有清晰公开 API

## 仓库边界要怎么写给 AI

你要明确告诉它：

- 哪些目录只允许消费公开导出
- 哪些 package 不允许相互直连
- 哪些跨包改动必须改文档和验证脚本

更适合承接这类任务的入口：

- [`Terminal-First Repo Pairing` 工作流](/docs/workflows/patterns/terminal-first-repo-pairing)
- [`Parallel Worktrees / Multi-Agent` runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)

## 这页后面接什么

- 要继续看 `CLAUDE.md`、`AGENTS.md` 和规则文件：去 [上下文与规则](/docs/roles/frontend/context-and-rules)
- 要继续看构建、测试和 PR 交付：去 [测试与交付](/docs/roles/frontend/testing-and-delivery)
- 要继续看 lint、类型和门禁：去 [质量门禁](/docs/roles/frontend/quality-gates)
