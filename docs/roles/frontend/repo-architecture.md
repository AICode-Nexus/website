---
title: 仓库结构
description: 用单应用、workspace、monorepo 和任务编排边界，让 AI 在正确目录里做正确改动。
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

# 仓库结构

前端 AI 的稳定性，很大程度上由仓库骨架决定。目录越混乱，模型越容易改错文件、误抽共享层或遗漏跨包验证。比“用什么工具”更重要的问题是：你有没有把 app、package、脚本、配置和交付边界讲清楚。

## 仓库演进图

![仓库结构演进图](/img/roles/frontend/repo-architecture-stages.svg)

## 单应用、workspace、monorepo 怎么判断

| 结构 | 适合什么时候 | 优点 | 风险 |
| --- | --- | --- | --- |
| 单应用 | 只有一个前端产品、共享层很薄 | 心智简单，AI 最容易理解 | 后期共享资产会堆在同一个目录里 |
| `pnpm workspace` | 已出现共享 UI、token、工具脚本 | 适合平滑拆分 app 与 packages | 如果边界没写清，容易演变成“大仓库小 monorepo” |
| `monorepo + Turborepo/Nx` | 多个 app、共享包和统一验证链同时存在 | 跨项目改动可统一验证 | 治理成本显著上升，需要更强规则文件 |

## 一个前端仓库最重要的不是层级多，而是边界清楚

至少要让 AI 和团队成员都能回答这些问题：

- 页面私有组件应该放在哪里。
- 哪些包负责 UI、哪些包负责 tokens、哪些包负责 tooling。
- 哪些命令在根目录跑，哪些必须进包内跑。
- 跨包改动时，哪些包需要跟着验证。

## 代码案例：典型 workspace 目录与根配置

```text
apps/
  marketing-site/
  admin-console/
packages/
  ui/
  tokens/
  eslint-config/
  tsconfig/
```

```json
{
  "name": "frontend-workspace",
  "private": true,
  "packageManager": "pnpm@10",
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "test": "turbo run test",
    "build": "turbo run build"
  }
}
```

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {"dependsOn": ["^build"], "outputs": ["dist/**", ".next/**"]},
    "lint": {"outputs": []},
    "typecheck": {"outputs": []},
    "test": {"dependsOn": ["^build"], "outputs": ["coverage/**"]}
  }
}
```

## 共享 UI 包和页面私有组件的分界

| 问题 | 应该落在哪一层 |
| --- | --- |
| 仅服务某个业务页面的布局骨架 | 页面目录或 feature 目录 |
| 跨多个 app 复用的基础按钮、表单、对话框 | `packages/ui` |
| 颜色、字号、间距、品牌变量 | `packages/tokens` |
| lint、tsconfig、测试工具配置 | `packages/config-*` 或独立配置包 |

如果一个组件只在一个页面里用了一次，就不要为了“看起来很架构”而把它塞进共享包。

## 最容易让 AI 误改的 4 个结构问题

- 没有写清哪些目录可改，导致脚手架、配置和业务代码混改。
- 用相对路径随意跨层导入，导致边界在代码里失真。
- 共享 UI 包和业务组件混在一个 package 里，后续重构扩散范围过大。
- monorepo 已经存在，却没有统一根命令和跨包验证说明。

## 仓库合同建议写进哪里

- repo 级长期真相写进 [Repo Instruction Files](/docs/repo-instruction-files) 对应的 `AGENTS.md` 或等价规则文件。
- 复杂改动的实施顺序写进 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook) 或项目计划文档。
- 跨包验证命令和发布纪律写进 [测试与交付](/docs/roles/frontend/testing-and-delivery) 对应的 checklist。

## 配套图片与视频

- 本页顶部已补仓库演进图，适合用来给团队解释为什么不能盲目上 monorepo。
- 想看多仓/多代理协作演示：去 [实战演示](/docs/resources/hands-on-demos) 搜 `worktree`、`monorepo`。
- 想看并行协作工作流：去 [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。
- 想继续把仓库结构和规则落到工具里：下一页看 [上下文与规则](/docs/roles/frontend/context-and-rules)。
