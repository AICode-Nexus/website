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
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
slug: /roles/frontend/rules-and-instruction-files
---

# 规则与规范文档

前端团队把 AI 用稳，不是把所有要求都塞进一个 prompt，而是把不同寿命、不同读者、不同约束强度的信息写进不同文档。`AGENTS.md`、`CLAUDE.md`、任务 brief、PR 模板和发布说明如果职责不清，模型和人类都会反复猜边界。

## 文档栈总览

![前端上下文分层图](/img/roles/frontend/context-rules-stack.svg)

## 文档资产栈

![前端文档资产栈](/img/roles/frontend/frontend-doc-asset-stack.svg)

这张图适合拿来讲“谁该维护什么模板”。如果团队里总有人把 brief 写成长期规则，或者把 PR 模板当成补需求的地方，这张图能很快把责任边界讲明白。

## 前端规则文件应该怎么拆

| 载体 | 主要读者 | 应该承载什么 | 不应该承载什么 |
| --- | --- | --- | --- |
| `AGENTS.md` | 所有 agent、后续维护者、reviewer | 仓库长期合同、目录边界、必跑命令、发布纪律 | 本次任务的局部细节 |
| `CLAUDE.md` | 特定入口或工具使用者 | 工具默认工作方式、交互偏好、输出习惯 | 团队唯一真相 |
| 工具 rules / local instructions | 单一工具入口 | 本地习惯、输出格式、快捷行为 | 跨团队共享的 repo 合同 |
| 任务 brief | 本次改动参与者 | 范围、设计输入、验收条件、媒体证据 | 其他项目也通用的长期规则 |
| PR 模板 / handoff 文档 | reviewer、发布人、接手人 | 命令结果、截图、录屏、剩余风险 | 重复定义仓库边界 |

对前端尤其重要的一点是：视觉类约束和工程类约束往往混在一起。更稳的做法是把“目录合同、共享层边界、必跑命令”放进长期规则，把“这次页面必须补 360px 截图和 tab 切换录屏”放进任务 brief。

## 规则所有权矩阵

| 文档 | 默认 owner | 什么时候更新 | 最常见的漂移方式 |
| --- | --- | --- | --- |
| `AGENTS.md` | 仓库 owner / 技术负责人 | 目录边界、共享层合同、发布纪律变化时 | 被写成过于抽象的价值观口号 |
| `CLAUDE.md` 或等价文件 | 入口 owner / 工具 owner | 工作方式、输出偏好、默认节奏变化时 | 把入口习惯写成团队唯一真相 |
| 工具 rules / local instructions | 个人或小组 | 某个入口的本地协作方式变化时 | 把 repo 公共规范重复进去 |
| task brief | 任务 owner | 每个真实任务启动时 | 只有目标，没有设计输入和验收 |
| PR / handoff 文档 | 实施者 + reviewer | 每次交付前 | 只有命令，没有截图、录屏和风险说明 |

如果同一条约束在这些载体里写法不一致，人和 agent 最后一定会各自执行一套。

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

## 最小模板资产包

| 模板资产 | 适合什么时候直接复用 | 至少应包含什么 |
| --- | --- | --- |
| `AGENTS.md` 规则片段 | 新仓库或旧仓库开始沉淀长期合同 | 目录边界、共享层禁区、验证纪律、发布约束 |
| `CLAUDE.md` / 工具工作方式片段 | 要稳定某个入口的行为 | 探索顺序、输出习惯、断点与验证说明 |
| task brief YAML | 每个真实页面、组件、重构任务 | 目标、范围、设计输入、验收、证据 |
| PR / handoff 模板 | 每次交付收口 | Summary、Verification、Artifacts、Risks |
| 证据清单 | 视觉任务、交互任务、共享层任务 | 截图、录屏、命令结果、风险说明、回滚入口 |

把这些模板当成资产，而不是“每次临时写一版”，是前端团队真正开始吃到 AI 协作复利的起点。

想直接复制这批模板：去 [训练包模板](/docs/roles/frontend/templates)。

## PR / Handoff 文档应该补什么

| 项目 | 为什么必须存在 |
| --- | --- |
| 变更范围 | 帮 reviewer 判断是否越界污染了共享层或其他页面 |
| 命令结果 | 证明 lint、typecheck、build、test 是否真实执行 |
| 截图与录屏位置 | 让 UI 变化和交互路径可复核 |
| 剩余风险 | 防止“看起来通过”掩盖未覆盖路径 |
| 回滚或排查入口 | 帮后续接手人快速定位问题 |

前端的 Handoff 文档之所以重要，是因为 UI 类任务高度依赖上下文。如果只交代码，很多设计意图和验证边界会在当天结束后立即丢失。

## 媒体证据应该写进哪一层

| 资产类型 | 应该写进哪里 | 前端为什么不能缺 |
| --- | --- | --- |
| 关键截图 | task brief / 验收条件 | 告诉 agent 和 reviewer 这次真正要看的视觉状态 |
| 录屏 | PR / handoff 文档 | 说明交互、状态切换和动态行为 |
| 图表 | 角色页、培训页、onboarding 材料 | 帮新人快速建立目录边界和流程心智模型 |
| 命令结果 | PR / handoff 文档 | 证明 lint、typecheck、build、test 真的跑过 |
| 风险说明 | PR / handoff 文档 | 防止“看起来没问题”掩盖未覆盖路径 |

一旦这些资产被定义成正式交付物，它们就不再是“有空再补”的附属品。

## 规范文档最常见的 5 个失败方式

1. 所有规则都写进某个工具的本地 rules，换入口就失效。
2. `AGENTS.md` 过于抽象，读完仍不知道页面私有和共享层怎么分。
3. 任务 brief 没有设计输入和媒体证据要求，导致 UI 验收只能靠猜。
4. PR 模板只要求贴命令，不要求截图、录屏和风险说明。
5. 同一条约束在多个文档里写法不一致，导致人和 agent 各自理解一套。

## 文档资产巡检时最该问的 6 个问题

1. 哪些约束应该升成长期合同，却还留在聊天记录里？
2. 哪些入口习惯被误写成 repo 公共规范？
3. 哪些任务 brief 缺少截图、节点、token 或验收项？
4. 哪些 PR 模板还不能证明交互和视觉变化？
5. 哪些规则在 `AGENTS.md`、brief、PR 模板里写法不一致？
6. 哪些媒体资产还只留在 IM，而没有进入正式文档？

## 训练任务

| 训练任务 | 目标 | 交付物 |
| --- | --- | --- |
| 任务 1：给前端仓库写一版最小 `AGENTS.md` | 练长期合同表达 | 合同片段、目录边界清单 |
| 任务 2：给一个设计任务写完整 brief | 练本次任务收口 | YAML brief、截图清单、验收项 |
| 任务 3：补一版前端 PR 模板 | 练交付语言 | Summary / Verification / Artifacts / Risks 模板 |

## 文档模板案例地图

规则文件页最值得配合真实 handoff 案例一起看。否则很容易觉得“模板就是写几段字”，而忽略了 brief、命令、截图和风险说明其实是怎么传递的：

| 你现在最缺哪种文档资产 | 先看哪篇案例 | 为什么值得搭配本页 |
| --- | --- | --- |
| 需要把本地 discovery 交给后台执行段 | [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff) | 最适合看 brief、设计输入和阶段交接怎么写进正式文档 |
| 需要把 issue 收口成 reviewer 可读的 draft PR | [GitHub Copilot Draft PR 交接案例](/docs/case-studies/github-copilot-draft-pr-handoff) | 适合看 Summary、Verification、Artifacts、Risks 如何形成统一模板 |
| 需要先巡检仓库，再把命令和风险写成可接手文档 | [Gemini CLI 终端巡检到 Draft PR 案例](/docs/case-studies/gemini-cli-terminal-audit-to-draft-pr) | 适合对照“巡检结果 -> 最小修复 -> 交付说明”这条链路 |

看这些案例时，不要只看工具名。更值得对照的是：

1. 哪些约束属于长期合同，哪些只属于单次任务。
2. 设计输入、截图、录屏和命令结果有没有落在对的文档层级。
3. reviewer 接手时，是否能只靠文档资产快速恢复上下文。

## 模板资产的媒体联动表

这页最适合搭配“文档资产产出练习”。更具体地说，建议把视频、案例和模板交付绑在一起：

![前端模板资产包](/img/roles/frontend/frontend-template-media-pack.svg)

| 你想练哪种模板 | 先看哪个视频或演示入口 | 再看哪篇案例 | 最后至少要交什么模板资产 |
| --- | --- | --- | --- |
| 设计任务 brief | [Claude Code + Figma 工作流](/docs/resources/videos?video=bilibili-bv1f5cyz1eov-青柠智信) | [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff) | YAML brief、设计输入清单、验收与截图要求 |
| PR / handoff 模板 | [Claude Code + Playwright 浏览器自动化](/docs/resources/videos?video=bilibili-bv1vgpaz6ehu-云桥网络) | [GitHub Copilot Draft PR 交接案例](/docs/case-studies/github-copilot-draft-pr-handoff) | Summary、Verification、Artifacts、Risks |
| 巡检到交付说明 | [实战演示视频列表](/docs/resources/videos?format=实战演示&section=results) | [Gemini CLI 终端巡检到 Draft PR 案例](/docs/case-studies/gemini-cli-terminal-audit-to-draft-pr) | 巡检结论、命令结果、风险说明、回滚入口 |

## 视频与继续阅读

- 想继续判断能力怎么编排：去 [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp)。
- 想继续判断入口工具怎么选：去 [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection)。
- 想找 rules、workflow、agent 相关视频：去 [全部视频](/docs/resources/videos) 搜 `rules`、`workflow`、`agent`。
- 想把这些模板接回真实交付：回看 [质量门禁](/docs/roles/frontend/quality-gates) 和 [测试与交付](/docs/roles/frontend/testing-and-delivery)。
- 想直接复制模板正文：去 [训练包模板](/docs/roles/frontend/templates)。
- 想看真实模板如何在交付链路里起作用：去 [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff)、[GitHub Copilot Draft PR 交接案例](/docs/case-studies/github-copilot-draft-pr-handoff)、[Gemini CLI 终端巡检到 Draft PR 案例](/docs/case-studies/gemini-cli-terminal-audit-to-draft-pr)。

## 下一步

- 想继续把规则接到能力选择：去 [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp)。
- 想判断前端任务到底该走哪个入口：去 [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection)。
- 想回到前端机制总览：去 [上下文与规则](/docs/roles/frontend/context-and-rules)。
