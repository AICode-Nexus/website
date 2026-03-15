---
title: 前端 AI 工作台：框架与组件生态
description: 在 React / Vue、渲染模式、组件基座和状态层之间做更适合 AI 协作的技术选择。
sidebar_label: 框架与组件生态
tags: [ai-coding, frontend, react, vue]
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
slug: /roles/frontend/frameworks-and-components
---

# 前端 AI 工作台：框架与组件生态

这页回答的不是“哪个框架最好”，而是“哪个组合更容易被 AI 稳定修改、审查和长期维护”。

## React / Next.js

### 默认适合 AI 协作的组合

- `React + TypeScript`
- 需要 SSR / SSG / hybrid 时用 `Next.js`
- 偏纯前端单页或中后台时可配 `Vite`
- 组件基座优先考虑 `Radix UI / shadcn/ui`
- 数据和缓存层常见组合是 `TanStack Query`
- 客户端局部状态常见组合是 `Zustand`

### React 这条线为什么适合 AI

- 组件边界和文件边界容易固定
- `TypeScript`、hooks、组件 props 都容易加规则
- `Radix UI / shadcn/ui` 让 AI 更容易在可预测源码上工作
- Next.js 的 App Router、Server / Client 组件能把边界讲清楚

### React 这条线要特别盯住什么

- 不要为了“优化”无脑加入 `memo / useMemo`
- 不要让 AI 擅自改 Server / Client 边界
- 不要让 AI 直接重构共享组件而不先读上下文

## Vue / Nuxt

### 默认适合 AI 协作的组合

- `Vue 3 + TypeScript`
- 需要 SSR / SSG / hybrid 时用 `Nuxt`
- 偏前台站点或标准 SPA 时可配 `Vite`
- 状态层优先用 `Pinia`
- 组件方案优先选“源码可控、变体清晰、主题可控”的体系

### Vue 这条线为什么适合 AI

- `SFC` 对页面级迭代很友好
- `Composition API` 便于把业务逻辑抽到 `composables`
- `props / emits / slots` 结构对 AI 来说相对清晰
- Nuxt 对路由和渲染模式的工程约束比较明确

### Vue 这条线要特别盯住什么

- 不要把一个页面拆成过多碎片化 `composables`
- `Pinia` store、路由守卫和页面生命周期要先划清职责
- 不要让 AI 跨 SFC 和共享逻辑目录乱搬文件

## 组件基座怎么选

对 AI 来说，最友好的组件基座有几个共同点：

- 源码可读，不是黑盒
- 变体模式清晰
- 主题和 token 容易接入
- 无障碍和交互逻辑有可靠基座

React 生态里，这通常意味着：

- `Radix UI`
- `shadcn/ui`

Vue 生态里，不一定非要追同名库，但原则一样：

- 优先选可定制、可维护、可读源码的方案
- 避免把样式覆盖战当作组件定制方案

## 渲染模式怎么影响 AI 协作

AI 最适合在边界清晰的渲染模式里工作：

- `SPA`：最容易上手，但要自己守住数据获取和首屏策略
- `SSR / SSG`：更利于页面级约束，但数据与渲染边界要讲清
- `Hybrid`：适合真实业务，但更需要写清规则文件和目录职责

如果你还没定栈，优先选：

- 能让组件边界清晰的框架
- 能让类型和 lint 约束自然落地的工具链
- 能让共享组件源码真正留在 repo 里的方案

## 这页后面接什么

- 要继续看 token、主题和 Tailwind：去 [样式与设计系统](/docs/roles/frontend/styling-and-design-systems)
- 要继续看 TypeScript、ESLint、Oxlint：去 [质量门禁](/docs/roles/frontend/quality-gates)
- 要继续看 pnpm、workspace、monorepo：去 [仓库结构](/docs/roles/frontend/repo-architecture)
