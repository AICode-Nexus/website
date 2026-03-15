---
title: Frontend Role Stack Depth Design
description: 为前端 AI 工作台补强框架选型与仓库架构两页的深度内容设计。
slug: /site-admin/superpowers/specs/frontend-role-stack-depth-design
tags: [site-admin, design, superpowers]
track: cross-track
kind: guide
content_form: guide
domain: standards
journey_stage: development-design
entry_role: admin
audience: advanced
stage: intermediate
featured: false
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
unlisted: true
---

# Frontend Role Stack Depth Design

## Goal

在不继续拆目录的前提下，补强前端 AI 工作台中最薄的两页：

- `docs/roles/frontend/frameworks-and-components.md`
- `docs/roles/frontend/repo-architecture.md`

让它们从“概览型说明”升级为“可用来做技术选型判断”的主题页。

## Scope

这次只补两类内容：

1. `框架与组件生态`
重点补 `React / Next.js / Vue / Nuxt / Vite / TanStack Query / Zustand / Pinia / Radix UI / shadcn/ui / Headless UI` 这类在 AI 协作下的适配性、边界和默认组合。

2. `仓库结构`
重点补 `单应用 / pnpm workspace / monorepo / shared packages / Turborepo / Nx` 这类工程骨架在 AI 协作下的适用场景、风险和推荐做法。

## Non-Goals

这次不做这些事：

- 不新增更多子页
- 不改现有路由和侧边栏结构
- 不把每个技术栈都扩成专题教程
- 不补大量命令模板和逐工具操作手册

## Content Shape

两页都统一补成四层结构：

1. 现有概览段保留
2. 新增更细的技术选型分组
3. 新增 `推荐默认组合`
4. 新增 `不建议的混搭` 和 `最少验证清单`

## Design Notes

### Frameworks And Components

页面要回答这些问题：

- React 和 Vue 各自更适合什么 AI 协作场景
- Next.js / Nuxt / Vite 这些脚手架型选择怎么落
- TanStack Query、Zustand、Pinia 这类状态层该怎么配
- Radix UI、shadcn/ui、Headless UI 这类组件基座怎么选
- 什么组合适合作为团队默认栈
- 哪些混搭会让 AI 难以稳定修改

### Repo Architecture

页面要回答这些问题：

- 什么规模还应该坚持单应用
- 什么规模开始用 `pnpm workspace`
- 什么时候真的值得上 monorepo
- `Turborepo` 和 `Nx` 在 AI 协作里分别更适合什么语境
- 共享 UI 包、design token 包、app shell 这些东西什么时候该拆
- 怎样把包边界、任务边界和依赖边界写给 AI

## Success Criteria

- 两页内容明显更像“技术选型手册”，而不是概览页
- React / Vue 仍然保持同权重，不出现主次化写法
- 页面里明确出现更多前端生态关键词，但不堆砌名词
- 文档 build 和 content check 继续通过
