---
title: 规则与规范文档
description: 把 AGENTS.md、CLAUDE.md、任务 brief、PR 模板和前端长期合同拆开治理，避免所有规则都堆在一处。
sidebar_label: 规则与规范文档
tags: [ai-coding, frontend, rules, docs]
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
slug: /roles/frontend/rules-and-instruction-files
---

# 规则与规范文档

前端团队把 AI 用稳，不是把所有要求都塞进一个 prompt，而是把不同寿命、不同读者、不同约束强度的信息写进不同文档。`AGENTS.md`、`CLAUDE.md`、任务 brief、PR 模板和发布说明如果职责不清，模型和人类都会反复猜边界。

## 文档栈总览

![前端上下文分层图](/img/roles/frontend/context-rules-stack.svg)

## 前端规则文件应该怎么拆

| 载体 | 主要读者 | 应该承载什么 | 不应该承载什么 |
| --- | --- | --- | --- |
| `AGENTS.md` | 所有 agent、后续维护者、reviewer | 仓库长期合同、目录边界、必跑命令、发布纪律 | 本次任务的局部细节 |
| `CLAUDE.md` | 特定入口或工具使用者 | 工具默认工作方式、交互偏好、输出习惯 | 团队唯一真相 |
| 工具 rules / local instructions | 单一工具入口 | 本地习惯、输出格式、快捷行为 | 跨团队共享的 repo 合同 |
| 任务 brief | 本次改动参与者 | 范围、设计输入、验收条件、媒体证据 | 其他项目也通用的长期规则 |
| PR 模板 / handoff 文档 | reviewer、发布人、接手人 | 命令结果、截图、录屏、剩余风险 | 重复定义仓库边界 |

对前端尤其重要的一点是：视觉类约束和工程类约束往往混在一起。更稳的做法是把“目录合同、共享层边界、必跑命令”放进长期规则，把“这次页面必须补 360px 截图和 tab 切换录屏”放进任务 brief。

## 最值得写进 `AGENTS.md` 的前端长期合同

```md
## Frontend Contracts

- Reusable copy, route maps, and card metadata live in `src/data/`.
- Shared UI components must not import page-local loaders, route objects, or business state.
- Every visual task must list required breakpoints and screenshot artifacts.
- Do not add new color literals or ad hoc spacing values when semantic tokens already exist.
- Cross-package changes must list affected apps/packages and verification commands.
```

对前端项目来说，`AGENTS.md` 里最有价值的不是“多写点经验”，而是把高频返工点固化成硬边界：

- 内容配置不能散回 JSX。
- 页面私有组件不能污染共享层。
- 样式不能绕过 token 与变体系统。
- 交付不能只给 diff，不给截图和验证命令。

## `CLAUDE.md` 或等价说明更适合写什么

```md
## Frontend Working Style

- Explore current component and data structure before proposing new files.
- Prefer presentational React components with content/config moved into `src/data/`.
- Use shared card/section primitives before introducing page-specific layout wrappers.
- Before editing UI, summarize affected breakpoints and intended verification steps.
- For visual tasks, prefer screenshots and existing tokens over purely verbal style guesses.
```

这类文件更适合表达“工作方式”而不是“项目法律”。例如：

- 默认先查现有组件和数据层，再提新抽象。
- 修改 UI 时先说清断点和验证计划。
- 视觉任务先找截图、token、设计输入，不要纯靠语言想象。

这些内容非常适合帮助一个入口快速进入状态，但不应该取代 `AGENTS.md` 中的仓库长期真相。

## 任务 brief 的前端字段

```yaml
task:
  goal: "重构 dashboard 筛选条并补移动端抽屉"
  scope:
    - "只改 apps/admin-console/src/features/dashboard"
    - "shared/ui 仅允许新增 Drawer 变体"
  design_input:
    - "Figma 节点"
    - "桌面与移动端关键截图"
    - "tokens/filter-panel.json"
  acceptance:
    - "360 / 768 / 1280 断点可用"
    - "键盘可达"
    - "Playwright 冒烟通过"
  artifacts:
    - "桌面截图"
    - "移动端截图"
    - "15 秒录屏"
    - "风险说明"
```

如果前端 brief 里没有 `design_input`、`acceptance` 和 `artifacts`，那它通常还不能称为可执行任务，只能算一句方向描述。

## PR / Handoff 文档应该补什么

| 项目 | 为什么必须存在 |
| --- | --- |
| 变更范围 | 帮 reviewer 判断是否越界污染了共享层或其他页面 |
| 命令结果 | 证明 lint、typecheck、build、test 是否真实执行 |
| 截图与录屏位置 | 让 UI 变化和交互路径可复核 |
| 剩余风险 | 防止“看起来通过”掩盖未覆盖路径 |
| 回滚或排查入口 | 帮后续接手人快速定位问题 |

前端的 Handoff 文档之所以重要，是因为 UI 类任务高度依赖上下文。如果只交代码，很多设计意图和验证边界会在当天结束后立即丢失。

## 规范文档最常见的 5 个失败方式

1. 所有规则都写进某个工具的本地 rules，换入口就失效。
2. `AGENTS.md` 过于抽象，读完仍不知道页面私有和共享层怎么分。
3. 任务 brief 没有设计输入和媒体证据要求，导致 UI 验收只能靠猜。
4. PR 模板只要求贴命令，不要求截图、录屏和风险说明。
5. 同一条约束在多个文档里写法不一致，导致人和 agent 各自理解一套。

## 训练任务

| 训练任务 | 目标 | 交付物 |
| --- | --- | --- |
| 任务 1：给前端仓库写一版最小 `AGENTS.md` | 练长期合同表达 | 合同片段、目录边界清单 |
| 任务 2：给一个设计任务写完整 brief | 练本次任务收口 | YAML brief、截图清单、验收项 |
| 任务 3：补一版前端 PR 模板 | 练交付语言 | Summary / Verification / Artifacts / Risks 模板 |

## 下一步

- 想继续把规则接到能力选择：去 [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp)。
- 想判断前端任务到底该走哪个入口：去 [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection)。
- 想回到前端机制总览：去 [上下文与规则](/docs/roles/frontend/context-and-rules)。
