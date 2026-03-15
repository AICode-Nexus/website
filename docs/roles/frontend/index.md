---
title: 前端 AI 工作台：总览
description: 从设计稿到工程交付，按工作流和工程主题进入前端 AI 工作台。
slug: /roles/frontend
sidebar_label: 总览
tags: [ai-coding, frontend, role-based]
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
---

# 前端 AI 工作台：总览

这组文档不是普通的“岗位介绍”，而是前端工程师在 AI 加持下的工作台入口。它覆盖的不是某一个工具，而是一整条链路：

`设计输入 -> 框架实现 -> 样式系统 -> 质量门禁 -> 仓库结构 -> 测试交付 -> 上下文与规则`

如果你想把 AI 真正用进前端日常，而不是偶尔拿来写一个 demo，这里应该成为你的阅读入口。

## 两种阅读方式

你可以按两种方式进入这组文档：

- `按工作流阅读`：适合想顺着任务推进的人
- `按工程主题阅读`：适合已经知道自己要解决哪一类问题的人

## 按工作流阅读

### 1. 设计到实现

推荐顺序：

1. [设计到代码](/docs/roles/frontend/design-to-code)
2. [框架与组件生态](/docs/roles/frontend/frameworks-and-components)
3. [样式与设计系统](/docs/roles/frontend/styling-and-design-systems)

适合：

- 刚拿到 Figma 设计稿
- 要快速搭出页面骨架
- 正在把 token、组件和样式系统对齐

### 2. 开发到交付

推荐顺序：

1. [框架与组件生态](/docs/roles/frontend/frameworks-and-components)
2. [质量门禁](/docs/roles/frontend/quality-gates)
3. [测试与交付](/docs/roles/frontend/testing-and-delivery)

适合：

- 已经有页面或组件代码
- 正在补类型、lint、测试、验收和 PR 输出

### 3. 团队落地

推荐顺序：

1. [仓库结构](/docs/roles/frontend/repo-architecture)
2. [上下文与规则](/docs/roles/frontend/context-and-rules)
3. [测试与交付](/docs/roles/frontend/testing-and-delivery)

适合：

- 团队准备长期引入 AI
- 正在建设 `pnpm workspace`、`monorepo`、规则文件和验证链路

## 按工程主题阅读

| 主题 | 解决什么问题 | 入口 |
| --- | --- | --- |
| 设计到代码 | 如何把 Figma、token 和设计描述变成页面骨架 | [设计到代码](/docs/roles/frontend/design-to-code) |
| 框架与组件生态 | React / Vue / Next.js / Nuxt / 组件基座怎么选 | [框架与组件生态](/docs/roles/frontend/frameworks-and-components) |
| 样式与设计系统 | Tailwind、主题 token、设计系统一致性如何落地 | [样式与设计系统](/docs/roles/frontend/styling-and-design-systems) |
| 质量门禁 | TypeScript、ESLint、Oxlint 和 review 门禁怎么接入 | [质量门禁](/docs/roles/frontend/quality-gates) |
| 仓库结构 | pnpm、workspace、monorepo、Turborepo 怎么配合 AI | [仓库结构](/docs/roles/frontend/repo-architecture) |
| 测试与交付 | Playwright、单测、PR 验收怎么进入默认流程 | [测试与交付](/docs/roles/frontend/testing-and-delivery) |
| 上下文与规则 | Context7、Plan First、`CLAUDE.md`、`AGENTS.md` 怎么分工 | [上下文与规则](/docs/roles/frontend/context-and-rules) |

## AI 友好的前端栈快照

### React / Next.js 路线

适合 AI 协作的常见组合：

- `React / Next.js`
- `TypeScript`
- `Tailwind CSS`
- `Radix UI / shadcn/ui`
- `TanStack Query / Zustand`
- `Vitest / Testing Library / Playwright`

这条路线的优点是：

- 组件模式清晰
- 类型边界容易固定
- 样式与无障碍基座容易约束
- AI 对这些工具链的训练覆盖度通常更高

### Vue / Nuxt 路线

适合 AI 协作的常见组合：

- `Vue 3 / Nuxt`
- `TypeScript`
- `Tailwind CSS` 或同类 utility-first 方案
- `Pinia`
- `Vitest / Playwright`

这条路线的优点是：

- `SFC` 结构天然适合页面级迭代
- `Composition API` 便于拆逻辑
- Nuxt 的 SSR / SSG / hybrid 路径清晰
- 对内容站、后台页和中后台平台型产品很友好

## 你该先看哪一页

- 如果你是 `React` 业务前端：先看 [框架与组件生态](/docs/roles/frontend/frameworks-and-components)
- 如果你是 `Vue` 或 `Nuxt` 前端：先看 [框架与组件生态](/docs/roles/frontend/frameworks-and-components)
- 如果你正在做设计稿落地：先看 [设计到代码](/docs/roles/frontend/design-to-code)
- 如果你在补工程纪律：先看 [质量门禁](/docs/roles/frontend/quality-gates)
- 如果你在推进团队级接入：先看 [仓库结构](/docs/roles/frontend/repo-architecture) 和 [上下文与规则](/docs/roles/frontend/context-and-rules)

## 下一步

- 工具入口：[Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)、[Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)、[Windsurf 快速开始](/docs/tools/ide-first/windsurf/quick-start)
- 工作流入口：[Spec-First](/docs/workflows/patterns/spec-first/runbook)、[Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test/runbook)、[Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing)
- 规则文件说明：[Repo instruction files](/docs/repo-instruction-files)
- 案例入口：[Claude Code bugfix 案例](/docs/case-studies/claude-code-bugfix-loop)
