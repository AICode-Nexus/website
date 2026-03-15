---
title: 上下文与规则
description: 用 AGENTS.md、CLAUDE.md、工具 rules、Context7、MCP 和技能映射，把前端 AI 协作沉淀成长期机制。
sidebar_label: 上下文与规则
tags: [ai-coding, frontend, context, rules]
track: cross-track
kind: guide
content_form: guide
audience: frontend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: testing-validation
entry_role: domain
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
slug: /roles/frontend/context-and-rules
---

# 上下文与规则

前端团队把 AI 用稳，最终比拼的不是 prompt 词藻，而是规则分层是否清楚。一个成熟团队会把 repo 真相、工具行为、任务上下文和验证命令拆成不同层，而不是把全部要求塞进一段临时聊天记录。

## 专题拆分阅读

这一页现在作为“前端机制总览”保留，用来给你一张总地图；更细的内容已经拆成三个独立子页：

| 方向 | 什么时候先看 | 对应子页 |
| --- | --- | --- |
| 规则与规范文档 | 你要写 `AGENTS.md`、`CLAUDE.md`、任务 brief、PR 模板 | [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files) |
| Skills 与 MCP | 你要判断前端任务该配什么 skill、什么时候拿 Figma / Context7 / 浏览器上下文 | [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp) |
| 工具匹配与选型 | 你要判断该走终端、执行栈、浏览器还是平台入口 | [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection) |

如果你正在做团队治理，建议先读“规则与规范文档”；如果你正在做真实页面任务，先读 “Skills 与 MCP” 和 “工具匹配与选型” 往往更直接。

## 规则分层图

![前端上下文分层图](/img/roles/frontend/context-rules-stack.svg)

## `AGENTS.md`、`CLAUDE.md`、工具 rules 怎么分工

| 层级 | 应该写什么 | 不应该写什么 |
| --- | --- | --- |
| `AGENTS.md` | 仓库长期合同、目录边界、必跑命令、发布纪律 | 临时任务细节 |
| `CLAUDE.md` | 工具如何理解项目、技术栈、默认工作方式 | 团队唯一真相 |
| 工具 rules | IDE 或代理的入口行为、交互偏好、本地快捷习惯 | 代替 repo 规则本身 |
| 任务 brief | 这次改动的目标、约束、验收标准 | 项目的长期公共规范 |

## 什么时候用 Context7、计划、MCP

| 能力 | 适合什么时候用 | 前端典型场景 |
| --- | --- | --- |
| Context7 | 需要最新官方文档或库 API | 查 `Next.js`、`React`、`Playwright` 新接口 |
| Plan First / Spec-First | 改动跨目录、跨包、跨角色 | 组件库重构、设计系统升级、页面大改版 |
| MCP | 需要浏览器、设计稿、文件系统真实上下文 | Figma 节点抓取、页面录屏、浏览器重现 bug |

## 代码案例：前端仓库里的规则片段

```md
## Frontend Contracts

- Reusable copy, card metadata, and route maps live in `src/data/`.
- Shared UI components must not import page-local business logic.
- Every UI task must state affected breakpoints and required verification commands.
- Do not add new color literals when semantic tokens already exist.
```

## 代码案例：复杂前端任务的 brief

```yaml
task:
  change: "重构 dashboard 筛选条并补移动端抽屉"
  boundaries:
    - "只改 apps/admin-console/src/features/dashboard"
    - "shared/ui 仅允许新增 Drawer 变体"
  required_context:
    - "现有 Figma 节点"
    - "dashboard 现有 Playwright 冒烟脚本"
    - "tokens/filter-panel.json"
  verification:
    - "pnpm lint"
    - "pnpm typecheck"
    - "pnpm test --filter dashboard"
    - "pnpm --filter admin-console exec playwright test tests/dashboard-filter.spec.ts"
```

## 前端常用 skills 应该怎么映射

| 场景 | 更适合的能力 | 作用 |
| --- | --- | --- |
| 设计稿转页面 | `figma`、MCP 浏览器能力 | 读取设计节点、截图、变量和布局上下文 |
| 复杂页面改造 | `writing-plans`、`executing-plans` | 先把跨目录改动拆清楚 |
| React 组件边界治理 | `react-best-practices`、`typescript-react-patterns` | 收紧组件职责、类型和事件模式 |
| 状态层选择 | `state-management` | 说明 `TanStack Query / Zustand / Pinia` 的边界 |
| 调试与修复 | `systematic-debugging` | 避免“看到报错就直接改” |
| 发布前验证 | `verification-before-completion` | 强制把命令和结果补齐 |

## 规则系统最常见的三种失败方式

- repo 规则写得太空泛，AI 仍然不知道共享层和页面层怎么分。
- 所有内容都写进工具 rules，导致换一个入口就失效。
- 任务 brief 缺失验收条件，最后只能靠 review 人补救。

## 前端上下文包

![前端上下文包](/img/roles/frontend/frontend-context-packet.svg)

这张图把长期真相、本次任务和最终证据拆开，是因为很多团队把三者混写在同一个地方。结果要么规则文件越来越长却越来越没法维护，要么任务 brief 只剩一句“帮我改一下页面”，最后产出完全靠模型猜。

## 指令文件模板

下面这类片段很适合写进前端仓库的 `AGENTS.md` 或等价规则文件：

```md
## Frontend Repo Contracts

- Reusable copy, routes, and card metadata live in `src/data/`.
- Shared UI must not import page-local business logic or route loaders.
- Every visual task must state required breakpoints and screenshot artifacts.
- New color values require a token discussion before landing in code.
- Cross-package changes must list affected packages and verification commands.
```

这类模板的重点不是“写得多”，而是把高频错误写成 agent 能消费的硬边界。对于前端项目来说，目录边界、样式 token 和验证命令是最值得长期写进去的三类信息。

## 任务 brief 模板

规则文件写长期真相，任务 brief 写本次改动。一个更适合前端团队的 brief 至少应包含这些字段：

```yaml
task:
  goal: "重构 dashboard 筛选条并补移动端抽屉"
  scope:
    - "只改 apps/admin-console/src/features/dashboard"
    - "shared/ui 仅允许新增 Drawer 变体"
  design_input:
    - "Figma 节点"
    - "关键断点截图"
    - "tokens/filter-panel.json"
  acceptance:
    - "360 / 768 / 1280 断点可用"
    - "键盘可达"
    - "Playwright 冒烟通过"
  artifacts:
    - "桌面截图"
    - "移动端截图"
    - "风险说明"
```

如果这类 brief 写得足够稳定，图片、视频和图表就能自然占更大权重，因为它们已经被定义成正式制品，而不是靠“有空再补”。

## 技能与工具选择顺序

| 任务形状 | 优先能力 | 为什么 |
| --- | --- | --- |
| 设计稿落地 | `figma`、浏览器 / 设计上下文 | 先把真实设计输入拿全 |
| 跨目录重构 | `writing-plans`、`executing-plans` | 先控制改动边界和顺序 |
| React / Vue 组件治理 | `react-best-practices`、`typescript-react-patterns` | 先收紧组件职责和类型 |
| 调试与修复 | `systematic-debugging` | 先证明问题，再改实现 |
| 交付前收口 | `verification-before-completion` | 先拿证据，再声称完成 |

把技能映射写出来的好处是，团队不再需要每次从零判断“该用什么入口”。这会显著减少前端协作中的上下文切换成本。

## 团队治理节奏

前端团队真正要长期受益，建议把治理节奏也写进文档：

1. 每周回收一次高频返工点，把它们转成规则文件或任务模板。
2. 每次出现典型页面任务，都补一次截图、录屏或对照图，不让媒体证据只留在 IM 里。
3. 每月整理一次“哪些验证在重复跑”，把它们上升为脚本、模板或 CI 门禁。
4. 每个新成员入组时，先学如何读规则、如何写 brief、如何交证据，而不是先学 prompt 花样。

这套节奏的本质是把“高手经验”变成仓库资产。对 AI 协作来说，最有价值的从来不是某个模型的一次超常发挥，而是下一次任务还能不能稳定复现。

## 训练任务与交付物

| 训练任务 | 目标 | 交付物 |
| --- | --- | --- |
| 任务 1：给一个前端 repo 写最小规则片段 | 练长期真相表达 | `AGENTS.md` 片段 |
| 任务 2：给一个页面改造任务写完整 brief | 练本次任务收口 | YAML brief、截图清单 |
| 任务 3：把一次改动经验沉淀成团队模板 | 练治理闭环 | 模板、规则 diff、培训说明 |

## 媒体资产如何进入规则系统

如果你真的想提高图片、视频和图表在前端工作流中的权重，就不要只在内容页里贴链接，而要把它们写进规则合同：

| 资产类型 | 应该写进哪里 | 作用 |
| --- | --- | --- |
| 关键截图 | 任务 brief / 验收条件 | 告诉 AI 和 reviewer 这次最重要的视觉证据是什么 |
| 录屏 | PR 模板 / 交付清单 | 说明交互与状态变化，不让动态行为只靠文字描述 |
| 图表 | 角色页 / 培训页 / onboarding 材料 | 帮新人快速建立心智模型 |

一旦媒体资产进入规则系统，它们就会从“补充阅读”升级为“正式交付物”。这也是把文档长期做厚、做稳的关键前提。

## 新人 onboarding 顺序

新成员第一次接触前端 AI 工作台时，建议按这个顺序：

1. 先看本页，理解规则、brief 和证据三层分工。
2. 再看 [设计到代码](/docs/roles/frontend/design-to-code) 和 [框架与组件生态](/docs/roles/frontend/frameworks-and-components)，理解输入与实现边界。
3. 最后看 [质量门禁](/docs/roles/frontend/quality-gates) 和 [测试与交付](/docs/roles/frontend/testing-and-delivery)，理解为什么“写完”不等于“交付完”。

这样 onboarding 会从协作模型开始，而不是从碎片化技巧开始。

同时建议给新人分配一套最小媒体作业：读完一页，就交一张结构图或一段 15 秒复盘录屏。这样规则学习不会停留在文本层。

## 如何让前端团队真正长期受益

- 把高频错误写回 `AGENTS.md`，不要只留在群聊里。
- 把复杂任务的计划过程沉淀到 [Spec-First](/docs/workflows/patterns/spec-first/runbook) 或项目规范中。
- 把工具、工作流和验证动作写成可复用的默认路径，而不是靠个人熟练度。
- 让交付物始终包括代码、截图、命令和风险说明，而不是只交 diff。

## 配套图片与视频

- 本页已补前端规则分层图，适合用来给团队讲清“规则写在哪一层”。
- 想看 tools、rules、memory 一类的视频入口：去 [全部视频](/docs/resources/videos) 搜 `rules`、`workflow`、`agent`。
- 想补站点级规则设计：去 [Repo Instruction Files](/docs/repo-instruction-files) 和 [Skills / Commands / Hooks](/docs/standards/skills-commands-hooks)。
- 想继续把规则接回真实交付：回看 [质量门禁](/docs/roles/frontend/quality-gates) 和 [测试与交付](/docs/roles/frontend/testing-and-delivery)。
- 想继续分专题读：去 [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files)、[Skills 与 MCP](/docs/roles/frontend/skills-and-mcp)、[工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection)。
