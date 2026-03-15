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

## 先判断是不是该升级结构

不要一开始就把 `monorepo` 当成熟标配。更稳的顺序是：

1. 先判断单应用是不是还够用
2. 再判断要不要上 `pnpm workspace`
3. 最后才判断 `monorepo + task runner` 是否真的值得

对 AI 来说，层级越多，边界说明就越重要；如果你没有准备好写清规则，就不该急着升级骨架。

## 什么时候单应用足够

如果你的场景是：

- 单一站点或单一后台
- 没有共享 UI 包
- 没有多个 app
- 团队规模不大
- 发布链路也只有一条

那单应用结构通常最省心。对 AI 来说，这种结构最容易读懂，也最不容易出现“跨 package 误改”。

## 什么时候升级到 pnpm workspace

当你开始出现这些需求时，就该认真考虑 workspace 了：

- 多个 package 共用依赖
- 共享组件库
- 设计 token 包
- 工具脚本和业务代码要分层
- 你想把 `app / ui / config / tooling` 这些东西从一锅粥里拆开

AI 在这类结构里最适合做：

- 对齐依赖声明
- 生成 workspace 脚本
- 明确 app / lib / tool 三类目录职责

我更推荐把 `pnpm workspace` 当作前端 AI 协作的默认升级路线，因为它比直接跳进大而全的 monorepo 更容易控制复杂度。

## 什么时候真的值得 monorepo

当你已经同时满足下面几件事时，monorepo 才更像“工程收益”而不是“组织表演”：

- 有多个 app 同时存在
- 有共享 UI、token、配置或工具链
- 团队希望统一 lint、typecheck、test、build 流程
- 跨项目改动经常要一起提交和验证

monorepo 对 AI 不是天然友好，前提是你先把边界写清楚。

至少要让 AI 知道：

- 哪些包负责 UI
- 哪些包负责业务
- 哪些包只是工具或配置
- 哪些命令由 `turbo run` 驱动

## 为什么优先考虑 pnpm

前端 AI 协作里，`pnpm` 的好处很实际：

- workspace 语义清楚
- 依赖声明更容易被统一检查
- 根脚本和包脚本的层次更好理解
- 多包项目里更容易写出稳定的安装、构建和验证命令

不是说 `npm` 或 `yarn` 不能用，而是如果你要写给 AI 一套统一规则，`pnpm workspace` 往往更容易讲清楚。

## Turborepo 和 Nx 怎么选

`Turborepo` 更适合这类前端团队：

- 主要是 `JS / TS` 项目
- 关注 build、lint、test、typecheck 任务编排
- 想让 AI 顺着一条清楚的任务链执行

`Nx` 更适合这类场景：

- 你不只是前端 repo
- 你想要更强的 graph、约束和生成器能力
- 团队已经接受更重的工程治理模型

`Turborepo` 的价值在 AI 协作里很直接：

- 任务链清晰
- 缓存路径明确
- build / lint / test / typecheck 的顺序更容易被固定

如果团队已经在用 `Nx` 或其他任务系统，也可以参考同样原则：任务和边界要清楚，别让 AI 用猜的。

## 哪些包值得单独拆出来

对前端 AI 协作最常见、也最值得拆的包通常是：

- `apps/*`：真实业务应用
- `packages/ui`：共享 UI 组件
- `packages/tokens`：设计 token 或主题变量
- `packages/config`：ESLint、TypeScript、构建配置
- `packages/tooling`：脚本、生成器、辅助命令

有些团队还会拆：

- `packages/app-shell`：多应用共享导航、布局、鉴权壳层
- `packages/docs` 或 `playground`：组件预览、设计系统演示或内部文档

## 共享 UI 包还是页面内组件

这类问题是 AI 最容易“过度抽象”的地方。

更稳的原则是：

- 先页面内稳定，再提共享
- 没有至少两个真实消费方，不急着抽公共包
- 共享 UI 包必须有清晰公开 API
- `design token` 包可以比共享 UI 更早抽，因为它本来就是跨页面约束

## app shell 和 design system 包什么时候值得拆

更适合拆 `app shell` 的场景：

- 多个 app 共用导航、权限壳、布局骨架
- 这些壳层逻辑足够稳定，不会每个 app 各改各的

更适合拆 `design system` 或 token 包的场景：

- 品牌和主题已经开始跨页面、跨产品复用
- 团队希望先统一视觉约束，再让 AI 在这个约束里工作

如果这些前提都还没稳定，过早拆包通常只会让 AI 在多个 package 之间来回搬东西。

## 仓库边界要怎么写给 AI

你要明确告诉它：

- 哪些目录只允许消费公开导出
- 哪些 package 不允许相互直连
- 哪些跨包改动必须改文档和验证脚本
- 根目录命令、包级命令、受影响包命令分别是什么
- 哪些改动只允许在 `apps/*`，哪些需要同步更新 `packages/*`

更适合承接这类任务的入口：

- [`Terminal-First Repo Pairing` 工作流](/docs/workflows/patterns/terminal-first-repo-pairing)
- [`Parallel Worktrees / Multi-Agent` runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)

## 推荐默认组合

如果你在做前端主导的项目，可以把这些当作更稳的默认组合：

- `单产品 / 单应用`：单应用 repo + 清晰目录边界 + 根脚本验证
- `一条主应用 + 少量共享包`：`pnpm workspace` + `apps/web` + `packages/ui` + `packages/tokens` + `packages/config`
- `多应用前端平台`：`pnpm workspace + Turborepo`，再补 `apps/*`、`packages/ui`、`packages/tokens`、`packages/config`
- `治理要求更重的跨团队仓库`：在已有组织约束下考虑 `Nx`

## 不建议的混搭

下面这些模式最容易让 AI 在仓库层面犯错：

- 只有一个应用，却先上重型 monorepo
- 同时混用多个包管理器或多个任务编排器
- 共享包没有公开 API，却允许跨包直接引用 `src/*`
- 没有稳定消费方，就先抽一堆“未来会复用”的公共包
- 根命令、包命令、CI 命令各写各的，导致 AI 无法判断该跑哪条链路

## 最少验证清单

如果你已经进入 workspace 或 monorepo，至少要把下面这两层验证固定下来：

```bash
# 根级验证，按项目实际脚本替换
pnpm lint
pnpm typecheck
pnpm build
```

```bash
# 任务编排验证，按项目实际脚本替换
turbo run lint typecheck build test
```

如果是单应用，也至少保留一条“根目录完整验证命令”，不要让 AI 每次都猜验证入口。

## 这页后面接什么

- 要继续看 `CLAUDE.md`、`AGENTS.md` 和规则文件：去 [上下文与规则](/docs/roles/frontend/context-and-rules)
- 要继续看构建、测试和 PR 交付：去 [测试与交付](/docs/roles/frontend/testing-and-delivery)
- 要继续看 lint、类型和门禁：去 [质量门禁](/docs/roles/frontend/quality-gates)
