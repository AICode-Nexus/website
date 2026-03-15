---
title: 前端 AI 培训营：总览
description: 面向前端工程师的 AI 培训首页，覆盖学习路径、模块地图、训练节奏与项目化练习。
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

# 前端 AI 培训营：总览

这组文档不再只是“岗位导航页”，而是一套给前端工程师使用的 AI 培训入口。它覆盖的不是某一个工具，而是一整条前端训练链路：

`设计输入 -> 框架实现 -> 样式系统 -> 质量门禁 -> 仓库结构 -> 测试交付 -> 上下文与规则`

如果你的目标是把 AI 真正纳入前端日常，而不是偶尔拿来写一个 demo，这里应该成为你的训练首页。

## 训练目标

完成这一组文档训练后，你至少应该能做到：

- 能把 `Figma / 设计 token / 页面结构` 转成前端实现骨架
- 能在 `React / Vue` 生态里为 AI 设定清楚的组件、状态和渲染边界
- 能约束 `Tailwind CSS`、组件基座和设计系统，避免产出“默认 AI 味”
- 能把 `TypeScript / ESLint / Oxlint / Playwright` 变成默认质量门禁
- 能在 `pnpm workspace / monorepo / Turborepo` 这类工程结构里稳定协作
- 能通过 `Context7 / CLAUDE.md / AGENTS.md` 把 AI 从聊天工具变成工程助手

## 适合谁学

这套培训内容主要服务 4 类读者：

- `前端新手或转岗工程师`：建立 AI 协作下的前端完整路径，而不是只学单个工具
- `React / Vue 业务前端`：把 AI 纳入日常开发、调试、重构、测试和交付流程
- `设计系统或组件库维护者`：让 AI 在组件源码、token、主题和规范约束里稳定工作
- `前端工程化负责人`：把 repo 结构、规则文件、验证链路和团队约束沉淀成组织资产

## 建议训练方式

推荐不要把这组文档当百科全书看完，而是按训练节奏推进：

### 7 天速训

适合已有前端经验、想快速接入 AI 的人：

1. 先读 [设计到代码](/docs/roles/frontend/design-to-code)
2. 再读 [框架与组件生态](/docs/roles/frontend/frameworks-and-components)
3. 接着读 [样式与设计系统](/docs/roles/frontend/styling-and-design-systems)
4. 最后补 [质量门禁](/docs/roles/frontend/quality-gates) 和 [测试与交付](/docs/roles/frontend/testing-and-delivery)

### 14 天标准训练

适合要把 AI 带进真实项目的人：

1. 完整走一遍 `设计到实现`
2. 再完整走一遍 `开发到交付`
3. 最后补 `团队落地`

### 28 天团队落地训练

适合前端负责人、架构师或组件库维护者：

1. 把 7 个模块全部过一遍
2. 给团队补 `CLAUDE.md / AGENTS.md / repo rules`
3. 补一套项目级验证链路
4. 至少完成一个项目化训练任务

## 分阶段学习路径

### 阶段 0：工具与环境准备

目标：把 AI 前端训练需要的工具、规则文件和工作流入口准备好。

推荐入口：

1. [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start) 或 [Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)
2. [Repo instruction files](/docs/repo-instruction-files)
3. [Spec-First](/docs/workflows/patterns/spec-first/runbook)

阶段产出：

- 一个可用的 AI 工具入口
- 一份最小 repo 规则文件认知
- 一条知道何时先计划、何时直接实现的工作流心智

### 阶段 1：设计到实现

目标：把设计稿和 token 稳定转成可维护的前端骨架。

推荐模块：

1. [设计到代码](/docs/roles/frontend/design-to-code)
2. [框架与组件生态](/docs/roles/frontend/frameworks-and-components)
3. [样式与设计系统](/docs/roles/frontend/styling-and-design-systems)

阶段产出：

- 一个从设计稿还原出的页面
- 一组拆分清楚的组件
- 一套初版 token / 主题约束

### 阶段 2：开发到交付

目标：把“能跑”提升为“能交付、能验证、能 review”。

推荐模块：

1. [框架与组件生态](/docs/roles/frontend/frameworks-and-components)
2. [质量门禁](/docs/roles/frontend/quality-gates)
3. [测试与交付](/docs/roles/frontend/testing-and-delivery)

阶段产出：

- 一套带类型、lint、测试、构建的前端改动
- 一份带验证结果的 PR 交付说明
- 至少一条关键路径的 Playwright 验证

### 阶段 3：团队落地

目标：让 AI 协作进入 repo、规范、任务链和团队约束。

推荐模块：

1. [仓库结构](/docs/roles/frontend/repo-architecture)
2. [上下文与规则](/docs/roles/frontend/context-and-rules)
3. [测试与交付](/docs/roles/frontend/testing-and-delivery)

阶段产出：

- 一套能讲清边界的仓库结构
- 一份 `CLAUDE.md / AGENTS.md / repo rules`
- 一条可重复执行的团队验证链路

## 模块训练地图

| 模块 | 学完能解决什么 | 典型交付物 | 入口 |
| --- | --- | --- | --- |
| 设计到代码 | 把 Figma、token 和结构化设计输入转成页面骨架 | 页面原型、组件拆分草图 | [设计到代码](/docs/roles/frontend/design-to-code) |
| 框架与组件生态 | 选清 React / Vue / Next.js / Nuxt / 状态层 / 组件基座 | 技术选型结论、默认组合 | [框架与组件生态](/docs/roles/frontend/frameworks-and-components) |
| 样式与设计系统 | 建立 token、主题和避免 AI 味的视觉约束 | 主题变量、设计系统规则 | [样式与设计系统](/docs/roles/frontend/styling-and-design-systems) |
| 质量门禁 | 把类型、lint 和 review 变成默认动作 | 质量门禁清单、验证命令 | [质量门禁](/docs/roles/frontend/quality-gates) |
| 仓库结构 | 理解单应用、workspace、monorepo 与任务链如何协作 | repo 结构方案、边界说明 | [仓库结构](/docs/roles/frontend/repo-architecture) |
| 测试与交付 | 把 Playwright、组件测试和 PR 验收接入流程 | 测试脚本、验收清单、PR 说明 | [测试与交付](/docs/roles/frontend/testing-and-delivery) |
| 上下文与规则 | 把 AI 协作规则沉淀到项目文件里 | `CLAUDE.md`、`AGENTS.md`、skills 清单 | [上下文与规则](/docs/roles/frontend/context-and-rules) |

## 你该从哪开始

- 如果你主要做 `React / Next.js`：从 [框架与组件生态](/docs/roles/frontend/frameworks-and-components) 开始
- 如果你主要做 `Vue / Nuxt`：也从 [框架与组件生态](/docs/roles/frontend/frameworks-and-components) 开始
- 如果你正在拿设计稿做页面：从 [设计到代码](/docs/roles/frontend/design-to-code) 开始
- 如果你最缺的是工程纪律：从 [质量门禁](/docs/roles/frontend/quality-gates) 开始
- 如果你要做团队级落地：从 [仓库结构](/docs/roles/frontend/repo-architecture) 和 [上下文与规则](/docs/roles/frontend/context-and-rules) 开始

## 项目化训练入口

建议至少做下面 3 个训练项目中的 1 个：

### 1. Figma 到营销页交付

适合练：

- 设计到代码
- 样式与设计系统
- Playwright 冒烟验证

### 2. 中后台模块重构

适合练：

- 框架与组件生态
- 质量门禁
- 测试与交付

### 3. 共享组件与 token 包

适合练：

- 仓库结构
- 上下文与规则
- 团队级约束与验证链路

## Capstone 毕业实战

如果你想验证这套培训是否真的学会了，建议至少完成一次完整 capstone：

### 题目

从一份真实设计稿出发，完成一个可以交付的前端模块，要求覆盖：

- 页面和组件实现
- token / 样式系统
- 类型与 lint 门禁
- Playwright 或组件级验证
- PR 交付说明
- rules 文件或协作约束

### 推荐路径

1. 用 [设计到代码](/docs/roles/frontend/design-to-code) 先生成页面骨架
2. 用 [框架与组件生态](/docs/roles/frontend/frameworks-and-components) 固定技术栈和状态层
3. 用 [样式与设计系统](/docs/roles/frontend/styling-and-design-systems) 补 token 与主题
4. 用 [质量门禁](/docs/roles/frontend/quality-gates) 补 lint、类型和 review 护栏
5. 用 [测试与交付](/docs/roles/frontend/testing-and-delivery) 补测试与 PR 交付
6. 用 [仓库结构](/docs/roles/frontend/repo-architecture) 和 [上下文与规则](/docs/roles/frontend/context-and-rules) 补团队边界

### Capstone 通过标准

- 设计输入、实现、验证、交付形成完整链路
- 有真实的页面、组件或模块产出
- 有可复现的验证证据
- 有明确的规则文件或协作说明
- 其他前端成员能根据你的交付继续工作

## Capstone 评分 Rubric

如果你要把这套文档用于自学验收、团队带训或导师评审，可以按下面 6 个维度打分：

| 维度 | 关注点 |
| --- | --- |
| 设计到实现 | 是否正确读取设计输入、拆分页面结构、落出组件骨架 |
| 框架与组件边界 | 是否为 React / Vue、状态层、组件基座写清边界 |
| 样式与设计系统 | 是否建立 token、主题和防止默认 AI 味的约束 |
| 质量门禁 | 是否通过类型、lint、build、测试等最少护栏 |
| 测试与交付 | 是否有验证证据、PR 说明、影响范围和风险说明 |
| 上下文与规则 | 是否把规则文件、skills 和团队协作约束落回 repo |

更简单的打分方式：

- `未达标`：只有代码，没有边界、验证和交付说明
- `可交付`：有实现、有验证、有交付说明，但规则和复用约束还不够稳定
- `可带团队复用`：有实现、有验证、有规则、有可重复执行的团队协作方式

## 复盘问题

每次完成一个项目化训练或 capstone 后，建议至少回答这些问题：

1. 这次哪些地方真正用了结构化上下文，而不是让 AI 猜？
2. 哪些边界是提前写清楚的，哪些是返工后才补上的？
3. 哪些质量问题被 lint、类型或测试提前拦住了？
4. 哪些问题说明当前 `CLAUDE.md`、`AGENTS.md` 或规则文件还不够清楚？
5. 如果让团队里的另一个前端接手，他还缺什么上下文？

## 建议的训练节奏

- `每天 30 分钟`：看 1 个模块中的 1 个小节，做 1 个最小练习
- `每周 2 到 3 次`：完成 1 个模块并留下真实交付物
- `每两周`：做 1 次项目化训练，串联多个模块
- `每月`：回头整理 `CLAUDE.md`、规则文件、命令清单和最佳实践

## 毕业标准

如果你已经能做到下面这些事情，这组培训内容才算真正学完：

- 能从设计输入走到页面与组件实现
- 能为 React 或 Vue 项目写清默认栈和边界
- 能把样式、token、lint、测试和 PR 验证接起来
- 能把项目规则写进文档和 repo 约束中
- 能独立完成一个从设计到交付的前端 AI 项目

## 工具与案例补充入口

- 工具入口：[Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)、[Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)、[Windsurf 快速开始](/docs/tools/ide-first/windsurf/quick-start)
- 工作流入口：[Spec-First](/docs/workflows/patterns/spec-first/runbook)、[Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test/runbook)、[Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing)
- 规则文件说明：[Repo instruction files](/docs/repo-instruction-files)
- 案例入口：[Claude Code bugfix 案例](/docs/case-studies/claude-code-bugfix-loop)
