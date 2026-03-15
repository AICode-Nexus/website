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

## 仓库合同分层图

![仓库合同分层图](/img/roles/frontend/repo-contract-layers.svg)

这张图想解决的是一个常见误区：很多团队以为“把目录分多一点”就等于架构更好。真正重要的是每一层负责什么、不能负责什么，以及跨层改动时谁来验证。

## 目录合同模板

如果你希望 AI 在仓库里改得更稳，推荐直接把目录合同写成类似下面的形式：

```text
apps/
  marketing-site/     # 页面、路由、页面私有组件、页面级测试
  admin-console/      # 后台业务页面、feature 目录、页面配置
packages/
  ui/                 # 基础组件、无业务知识
  tokens/             # 颜色、字号、间距、语义变量
  config-eslint/      # lint 规则
  config-ts/          # tsconfig 与类型基线
tooling/
  scripts/            # 构建、生成、检查脚本
```

关键不在于目录名字，而在于注释里的责任边界。只要边界写清楚，AI 就更容易在正确目录里做局部修改；边界不清楚，它就会把“方便改”误当成“应该放”。

## 包与目录的裁剪原则

| 场景 | 应该怎么裁剪 | 不应该怎么裁剪 |
| --- | --- | --- |
| 只有一个 app，但已有共享 UI 与 token | 先上 `pnpm workspace`，让共享资产独立 | 为了“看起来先进”直接上大型 monorepo 治理 |
| 两个 app 共享一套 UI 和工具链 | 把 UI、token、config 与脚本包拆开 | 继续在单 app 下用相对路径偷渡共享 |
| 团队成员多、包数量多、验证链复杂 | 再引入 `Turborepo / Nx` 编排任务 | 在没有统一命令和合同前先堆工具 |
| 页面专有组件仅服务一个页面 | 继续留在 app 或 feature 下 | 为了复用想象把它提到共享包 |

这类裁剪原则能直接减少 AI 的误改范围，因为它让“放哪一层”变成一个可复述的判断，而不是凭感觉。

## 升级到 workspace 或 monorepo 前必须回答的 8 个问题

1. 现在是否真的存在两个以上 app 或独立部署单元。
2. 共享 UI、token、config 和脚本是否已经稳定，不再是一次性复制。
3. 根命令是否已经能清楚表达 `lint`、`typecheck`、`test`、`build`。
4. 跨包改动时，受影响包和验证范围是否可被列举。
5. 发布节奏是统一发布还是每个 app 独立发布。
6. 团队是否接受为目录治理和工具配置付出额外心智。
7. 是否已经有 `AGENTS.md` 或等价规则文件告诉 AI 哪些目录能改。
8. 是否有能力在 PR 中提供跨包验证证据。

如果其中一半都答不清楚，先别急着上 monorepo。AI 时代更需要的是清晰边界，而不是更复杂的目录树。

## 训练任务与交付物

| 训练任务 | 目标 | 交付物 |
| --- | --- | --- |
| 任务 1：给现有单应用补目录合同 | 练清楚“放哪里” | 目录注释版结构图、规则片段 |
| 任务 2：把共享 UI 和 token 从 app 中拆出 | 练 workspace 边界 | 迁移计划、受影响列表、验证结果 |
| 任务 3：设计根命令与跨包验证 | 练从仓库骨架到交付闭环 | 根 `scripts`、任务图、PR 证据包 |

## 跨包改动检查表

| 检查项 | 为什么必须检查 |
| --- | --- |
| 受影响的 app 和 package 是否列全 | 防止只验证当前目录，遗漏共享层回归 |
| 根命令与包内命令是否都说明清楚 | 防止 reviewer 不知道应在根目录还是包目录复现 |
| 共享 UI、token、config 是否一起更新 | 防止代码已经迁移，文档和工具配置却还停在旧边界 |
| PR 是否说明了发布影响面 | 防止 monorepo 中一个小改动影响多个部署单元 |

这份检查表能显著提高仓库结构页的实操价值，因为它把“结构合理”变成了真实交付中的复盘问题，而不是只停留在目录美观层面。

## 视频化学习路径

如果你想把仓库结构这页讲给新人或团队看，建议按照这个顺序：

1. 先讲仓库演进图和合同分层图，让大家知道为什么不能把所有东西都塞进 `src/`。
2. 再配合 [Claude Code 实战：搭建 Vue3 工程级项目脚手架](/docs/resources/videos?video=bilibili-bv1lbakzme1a-极简前端) 看真实工程目录的组织方式。
3. 最后回到本页的“跨包改动检查表”，要求大家把视频里的做法映射成自己仓库可执行的规则。

## 目录树讲解脚本

带新人过仓库结构时，建议不要从根目录一路念到尾，而是只围绕三个问题讲：页面代码放哪、共享代码放哪、验证命令从哪跑。这样目录树不会变成枯燥的名词表，而会变成大家理解协作边界的入口。

## 根命令设计原则

好的前端仓库结构，最终要落到根命令上。推荐至少保证这四件事：

1. `lint`、`typecheck`、`test`、`build` 在根目录都有统一入口。
2. 每个 app 或 package 也能单独执行对应命令，方便局部调试。
3. 文档里明确写出“什么时候跑根命令，什么时候跑包内命令”。
4. PR 描述里能把本次真正执行过的命令精确列出来。

没有统一根命令时，仓库再漂亮也只是目录图；有了统一根命令，结构才真正开始为交付服务。

这也是为什么仓库结构页不能只讲目录树。目录只是表象，命令约定和验证入口才是团队每天真正会碰到的协作接口。

当团队把这一点真正讲清楚之后，AI 才会在“正确目录 + 正确命令 + 正确验证”的轨道里工作。

这也是仓库结构真正的工程价值。

## 配套图片与视频

- 本页顶部已补仓库演进图，适合用来给团队解释为什么不能盲目上 monorepo。
- 想看多仓/多代理协作演示：去 [实战演示](/docs/resources/hands-on-demos) 搜 `worktree`、`monorepo`。
- 想看并行协作工作流：去 [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。
- 想继续把仓库结构和规则落到工具里：下一页看 [上下文与规则](/docs/roles/frontend/context-and-rules)。
