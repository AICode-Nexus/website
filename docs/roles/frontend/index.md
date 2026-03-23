---
title: 前端 AI 工作台
description: 用 AI 协作把设计输入、框架实现、样式系统、质量门禁、仓库结构、测试交付和规则体系接成闭环。
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
reviewed_at: 2026-03-23
source_window_end: 2026-03-23
market_status: current
---

# 前端 AI 工作台

前端团队把 AI 用稳，靠的不是“让模型多写一点 JSX”，而是把设计输入、组件边界、样式系统、验证命令和交付证据全部讲清楚。这一组文档按工程主题拆开，目标是让你在真实前端项目里形成一条可复用的默认链路，而不是每次都从零试 prompt。

## 这个工作台覆盖什么

- 设计输入怎么变成稳定骨架：从 [设计到代码](/docs/roles/frontend/design-to-code) 开始，先管好 Figma、token、交互说明和截图补充的顺序。
- 框架与组件怎么选：去 [框架与组件生态](/docs/roles/frontend/frameworks-and-components) 对齐 `React / Next.js / Vue / Nuxt / Vite`、状态层和组件基座。
- 样式如何避免“默认 AI 味”：用 [样式与设计系统](/docs/roles/frontend/styling-and-design-systems) 固定 token、CSS 变量、Tailwind 规则和品牌语言。
- 代码如何过门禁：用 [质量门禁](/docs/roles/frontend/quality-gates) 把 `TypeScript / ESLint / Oxlint / build / review` 串起来。
- 仓库结构如何避免 AI 误改：在 [仓库结构](/docs/roles/frontend/repo-architecture) 里判断单应用、workspace 和 monorepo 的边界。
- 想先拿到一份可执行的 E2E 落地路径：去 [Playwright 自动化测试方案](/docs/roles/frontend/playwright-automation-plan)。
- 如何把结果交出去：去 [测试与交付](/docs/roles/frontend/testing-and-delivery) 补组件级验证、Playwright 冒烟和 PR 交付模板。
- 如何把团队知识写回 repo：最后看 [上下文与规则](/docs/roles/frontend/context-and-rules)，再分专题进入 [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files)、[Skills 与 MCP](/docs/roles/frontend/skills-and-mcp)、[工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection)。

## 模块地图

![前端 AI 工作台模块地图](/img/roles/frontend/frontend-workbench-map.svg)

上图把这组文档拆成三条主线：

- `设计到实现`：适合页面首版、设计稿还原、组件拆分和主题落地。
- `开发到交付`：适合中后台功能、老页面重构、缺陷修复和 PR 收口。
- `团队到机制`：适合组件库维护、monorepo 协作、规则文件治理和培训带教。

## 建议训练节奏

如果你的目标不是“看完这组页”，而是“把前端 AI 协作真正练成默认动作”，更有效的顺序是按训练节奏推进：

| 阶段 | 先解决什么问题 | 对应模块 | 这一阶段最少要交什么 |
| --- | --- | --- | --- |
| 阶段 1：输入对齐 | 设计输入是否足够结构化 | [设计到代码](/docs/roles/frontend/design-to-code)、[样式与设计系统](/docs/roles/frontend/styling-and-design-systems) | 页面拆分表、token 清单、关键断点截图 |
| 阶段 2：实现收口 | 组件、状态、目录是否边界清楚 | [框架与组件生态](/docs/roles/frontend/frameworks-and-components)、[仓库结构](/docs/roles/frontend/repo-architecture) | 组件分层说明、目录合同、页面私有/共享划分 |
| 阶段 3：验证交付 | 代码如何被证明可交付 | [质量门禁](/docs/roles/frontend/quality-gates)、[Playwright 自动化测试方案](/docs/roles/frontend/playwright-automation-plan)、[测试与交付](/docs/roles/frontend/testing-and-delivery) | lint/typecheck/build、冒烟脚本、PR 证据包 |
| 阶段 4：团队机制 | 团队如何把经验沉淀回仓库 | [上下文与规则](/docs/roles/frontend/context-and-rules)、[规则与规范文档](/docs/roles/frontend/rules-and-instruction-files)、[Skills 与 MCP](/docs/roles/frontend/skills-and-mcp)、[工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection) | `AGENTS.md` 片段、任务 brief 模板、技能映射表 |

这个顺序的核心不是“按目录阅读”，而是先收输入，再收实现，再收证据，最后再把经验固化成机制。很多团队之所以觉得 AI 前端“时好时坏”，本质上是因为四个阶段混成了一次对话。

## 每个模块至少应该补到什么程度

你提到希望每一块都尽可能详细，而且图片、视频、图表权重更高。对这套前端工作台来说，可以把“模块完成标准”先约束成下面这个最小集合：

| 模块 | 文字层面最少应覆盖 | 图表/图片最少应覆盖 | 视频/录屏最少应覆盖 |
| --- | --- | --- | --- |
| 设计到代码 | 输入优先级、骨架拆分、状态补齐、响应式验收 | 输入流程图、交付物板、关键截图示例 | 1 条设计转页面演示、1 条响应式或交互录屏 |
| 框架与组件生态 | 路线选择、组件分层、状态边界、反模式 | 技术路线图、选型决策板 | React/Vue 至少各 1 条案例视频 |
| 样式与设计系统 | 品牌输入、token 分层、变体规则、视觉 review | 设计系统层级图、样式治理图、视觉对照图 | 1 条样式系统或 Tailwind 实战演示 |
| 质量门禁 | 写码门禁、review 问题、发布前证据 | 门禁图、验证证据图、命令矩阵 | 1 条 bugfix 到验证的完整录像 |
| 仓库结构 | 单仓到 monorepo 决策、目录合同、跨包验证 | 仓库演进图、合同分层图 | 1 条 workspace/monorepo 实操视频 |
| Playwright 自动化测试方案 | 什么时候上 E2E、第一条 smoke 怎么选、脚本与证据如何配套 | 决策表、目录骨架、最小脚本、交付模板 | 1 条最短 smoke + 截图/录屏 |
| 测试与交付 | 组件测试、预览验证、E2E、PR 收口 | 交付闭环图、证据包图 | 1 条 Playwright 或真实交付录屏 |
| 上下文与规则 | 机制总览、专题拆分阅读、治理节奏 | 规则分层图、上下文包图 | 1 条 rules/agent/workflow 讲解视频 |
| 规则与规范文档 | `AGENTS.md`、`CLAUDE.md`、brief、PR 模板 | 规则栈图、文档模板 | 1 条 instruction files 讲解视频 |
| Skills 与 MCP | skills 组合、Figma / Context7 / 浏览器上下文 | 能力映射表、任务到能力矩阵 | 1 条 MCP 或技能编排演示 |
| 工具匹配与选型 | 前端任务形状到入口工具的判断 | 任务到工具矩阵 | 1 条多入口协作演示 |

这张表的作用不是限制篇幅，而是避免文档只在“讲道理”上变长，却没有把真正能拿来训练团队的图表、对照图、录屏和视频入口补上。

## 媒体优先的学习法

当一页内容越来越长时，最容易发生的问题是读者只看标题，不看关键差异。为了解决这个问题，这套前端工作台建议你用“媒体优先 + 文本下钻”的方式消化内容：

1. 先看图表，建立这页的主框架。
2. 再看表格，知道这一页的决策维度和交付物。
3. 然后去看视频或录屏入口，观察真实操作顺序。
4. 最后再读正文，把图表里的原则接回自己项目。

如果你是带团队培训，可以把每页都拆成“10 分钟图表讲解 + 20 分钟视频观摩 + 30 分钟动手复现 + 10 分钟复盘提交”的节奏。这样这组文档就不只是知识库，而会变成可执行的训练课程。

## 三条推荐阅读路径

| 路径 | 适合谁 | 先读什么 | 典型产出 |
| --- | --- | --- | --- |
| 设计到实现 | 正在从 Figma 落页面的前端 | [设计到代码](/docs/roles/frontend/design-to-code) -> [框架与组件生态](/docs/roles/frontend/frameworks-and-components) -> [样式与设计系统](/docs/roles/frontend/styling-and-design-systems) | 页面骨架、组件拆分图、token 初稿 |
| 开发到交付 | 正在做真实业务功能或重构 | [框架与组件生态](/docs/roles/frontend/frameworks-and-components) -> [质量门禁](/docs/roles/frontend/quality-gates) -> [Playwright 自动化测试方案](/docs/roles/frontend/playwright-automation-plan) -> [测试与交付](/docs/roles/frontend/testing-and-delivery) | 可 review 的代码、验证命令、PR 交付说明 |
| 团队到机制 | 组件库维护者、前端负责人 | [仓库结构](/docs/roles/frontend/repo-architecture) -> [上下文与规则](/docs/roles/frontend/context-and-rules) -> [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files) -> [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp) -> [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection) | repo 合同、skills 映射、团队质量护栏 |

## 模块到案例地图

如果你已经知道自己想补哪一类能力，但不想只读概念页，可以直接从模块跳到更接近真实交付的案例：

| 模块 | 最值得先看的案例 | 搭配哪个 workflow 看更完整 | 读案例时重点看什么 |
| --- | --- | --- | --- |
| [设计到代码](/docs/roles/frontend/design-to-code) | [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff) | [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud/runbook) | discovery brief、设计输入 handoff、执行与验证怎么分段 |
| [框架与组件生态](/docs/roles/frontend/frameworks-and-components) | [OpenAI Codex 重构与验证案例](/docs/case-studies/codex-refactor-with-verification) | [Spec-First](/docs/workflows/patterns/spec-first/runbook) | 长链路改动如何先锁边界，再推进组件和状态重构 |
| [质量门禁](/docs/roles/frontend/quality-gates) | [Claude Code Bugfix 闭环案例](/docs/case-studies/claude-code-bugfix-loop) | [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test/runbook) | 最小修复、验证证据和范围控制 |
| [仓库结构](/docs/roles/frontend/repo-architecture) | [Cline 并行 Worktree 收口案例](/docs/case-studies/cline-parallel-worktree-owner-loop) | [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook) | lane map、owner 收口、跨目录影响面 |
| [测试与交付](/docs/roles/frontend/testing-and-delivery) | [Claude Code Bugfix 闭环案例](/docs/case-studies/claude-code-bugfix-loop)、[OpenAI Codex 重构与验证案例](/docs/case-studies/codex-refactor-with-verification) | [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test/runbook) | 命令结果、录屏、风险说明如何一起交付 |
| [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection) | [实战案例首页](/docs/case-studies) | [工作流教程首页](/docs/workflows) | 先按任务形状找入口，不要只按工具偏好找案例 |

## AI 友好的前端栈快照

### React / Next.js 线

| 层 | 默认组合 | 为什么对 AI 友好 |
| --- | --- | --- |
| 渲染与路由 | `Next.js` 或 `React + Vite` | 目录和边界清楚，AI 不容易在路由层乱改 |
| 组件基座 | `Radix UI / shadcn/ui` | 源码可控、变体显式、组件职责容易约束 |
| 数据与状态 | `TanStack Query + Zustand` | 远程状态和本地状态职责更容易拆开 |
| 样式系统 | `Tailwind CSS + CSS Variables` | 改动范围可预测，token 容易沉淀 |
| 验证 | `Vitest + Testing Library + Playwright` | 单元、组件、关键路径三层分工清楚 |

### Vue / Nuxt 线

| 层 | 默认组合 | 为什么对 AI 友好 |
| --- | --- | --- |
| 渲染与路由 | `Nuxt` 或 `Vue + Vite` | 页面、路由和 server/client 能力边界明确 |
| 组件组织 | `SFC + Composition API` | 模板、逻辑、样式在稳定上下文里协作 |
| 数据与状态 | `Pinia + @tanstack/vue-query` | 业务状态和异步缓存不会混成一团 |
| 样式系统 | `Tailwind CSS` 或 `UnoCSS + CSS Variables` | 主题变量和 utility 层容易统一 |
| 验证 | `Vitest + Vue Test Utils + Playwright` | 组件行为与端到端路径都能形成证据 |

## 开工前先交给 AI 的最小上下文包

不要只说“帮我把这个页面写出来”。更稳的做法是把任务包收成一个最小合同：

```yaml
task:
  goal: "交付营销页 hero + 功能区块 + FAQ"
  route: "/pricing"
  framework: "Next.js 15 + React 19"
  design_input:
    figma_node: "https://figma.com/design/FILE/Hero?node-id=120-480"
    screenshots:
      - "docs/assets/pricing-hero-reference.png"
    tokens: "packages/tokens/src/semantic/pricing.json"
  constraints:
    component_base: "shadcn/ui"
    style_system: "Tailwind + CSS variables"
    data_contract: "静态内容写入 src/data/pricing.ts"
    responsive_breakpoints: ["360", "768", "1280"]
  acceptance:
    - "键盘可达"
    - "Lighthouse 移动端性能 >= 85"
    - "Playwright 冒烟用例通过"
```

这份上下文包至少能避免 4 类前端常见失控：

- 组件和页面文案散落在多个文件里，导致 AI 修改时不断重复造内容结构。
- 设计输入只有截图，没有 token 和边界说明，导致颜色、间距和交互状态全部靠猜。
- 没有说明共享组件和页面私有组件的分界，导致共享层被无关页面污染。
- 只要求“跑起来”，没有说明验证命令和验收标准，导致返工都发生在 review 后。

## 这一组文档的默认交付物

| 模块 | 你应该拿到什么 | 对应入口 |
| --- | --- | --- |
| 设计输入 | 页面结构图、token 清单、组件抽取计划 | [设计到代码](/docs/roles/frontend/design-to-code) |
| 技术选型 | React/Vue 路线、状态层与组件基座决策 | [框架与组件生态](/docs/roles/frontend/frameworks-and-components) |
| 视觉约束 | token 层级、主题变量、反模板化规则 | [样式与设计系统](/docs/roles/frontend/styling-and-design-systems) |
| 质量护栏 | lint、type-check、build、review 规则 | [质量门禁](/docs/roles/frontend/quality-gates) |
| 工程骨架 | 单应用 / workspace / monorepo 判断与目录合同 | [仓库结构](/docs/roles/frontend/repo-architecture) |
| 交付证据 | 组件测试、E2E 路径、PR 说明 | [测试与交付](/docs/roles/frontend/testing-and-delivery) |
| 团队规则 | 机制总览与专题地图 | [上下文与规则](/docs/roles/frontend/context-and-rules) |
| 规范文档 | `AGENTS.md`、`CLAUDE.md`、任务 brief、PR 模板 | [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files) |
| 能力映射 | skill 组合、MCP 使用时机、Context7 / Figma / 浏览器 | [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp) |
| 工具选择 | 终端、执行栈、浏览器、平台入口的任务匹配 | [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection) |

## 前端默认训练包

如果你要把这组文档拿去做 onboarding、带练或真实项目 kickoff，最省力的做法不是每次重新拼素材，而是直接复用下面这几套默认训练包：

| 训练包 | 什么时候启用 | 至少要包含什么 | 去哪里拿模板 |
| --- | --- | --- | --- |
| 页面输入包 | 首次从设计稿落页面时 | `figma-node.md`、`tokens-map.md`、`states-checklist.md`、`shots/` | [页面输入包模板](/docs/roles/frontend/templates/page-input-pack)、[设计到代码](/docs/roles/frontend/design-to-code) |
| 视觉收口包 | 页面能跑，但风格和状态还不稳时 | 品牌关键词板、before/after、组件状态图、断点截图 | [样式与设计系统](/docs/roles/frontend/styling-and-design-systems) |
| 能力与入口决策包 | 任务启动前，不确定 skill / MCP / 入口怎么配时 | skill 组合表、工具入口判断、workflow 对照、最小证据要求 | [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp)、[工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection) |
| 交付证据包 | 进入 review、handoff 或上线前收口时 | `commands.md`、截图、`flow.mp4`、`risks-and-next.md` | [命令与证据模板](/docs/roles/frontend/templates/commands-and-evidence)、[测试与交付](/docs/roles/frontend/testing-and-delivery) |
| 规则模板包 | 想把经验固化回仓库时 | `AGENTS.md` 片段、brief 模板、PR / handoff 模板、证据合同 | [训练包模板](/docs/roles/frontend/templates)、[规则与规范文档](/docs/roles/frontend/rules-and-instruction-files) |

这张表的作用，是把“读文档”进一步推进成“拿一套现成资产开工”。如果你带团队，最值得做的不是要求大家看完所有页面，而是要求每次任务至少复用其中一套训练包。

想直接复制现成模板：去 [训练包模板](/docs/roles/frontend/templates)。

## 按你想拿到的产物反查

如果你不是按主题学习，而是按“这周必须交什么”倒推，更适合从产物反查：

| 你现在最缺什么 | 先读哪里 | 再去看哪个案例 |
| --- | --- | --- |
| 页面骨架、token 清单、断点截图 | [设计到代码](/docs/roles/frontend/design-to-code) | [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff) |
| 组件边界、状态收口、共享层判断 | [框架与组件生态](/docs/roles/frontend/frameworks-and-components)、[仓库结构](/docs/roles/frontend/repo-architecture) | [OpenAI Codex 重构与验证案例](/docs/case-studies/codex-refactor-with-verification) |
| lint/typecheck/build/PR 证据包 | [质量门禁](/docs/roles/frontend/quality-gates)、[测试与交付](/docs/roles/frontend/testing-and-delivery) | [Claude Code Bugfix 闭环案例](/docs/case-studies/claude-code-bugfix-loop) |
| repo 合同、brief 模板、PR 模板 | [上下文与规则](/docs/roles/frontend/context-and-rules)、[规则与规范文档](/docs/roles/frontend/rules-and-instruction-files) | [Gemini CLI 终端巡检到 Draft PR 案例](/docs/case-studies/gemini-cli-terminal-audit-to-draft-pr) |
| 入口工具选择和 lane 收口 | [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection) | [Cline 并行 Worktree 收口案例](/docs/case-studies/cline-parallel-worktree-owner-loop) |

## 图片、图表与视频入口

这一组页已经补上图表和本地 SVG 配图。想继续用视频补训练，可以从这些入口下钻：

- [全部视频](/docs/resources/videos)：按主题搜 `frontend`、`react`、`vue`、`playwright`、`figma`。
- [实战演示](/docs/resources/hands-on-demos)：优先找“从设计到页面”或“从 bug 到验证”的完整录像。
- [课程目录](/docs/resources/courses)：当近期形成连续系列时，按课程追一条主线。
- [实战案例首页](/docs/case-studies)：把视频里看到的操作方式，接回可执行的文档和案例。

## 前端精选视频

如果你不想先翻整个资源库，可以直接从这几条更贴近当前文档主题的视频开始：

| 主题 | 推荐视频 | 适合配合哪一页一起看 |
| --- | --- | --- |
| 设计到代码 | [Claude Code + Figma 工作流](/docs/resources/videos?video=bilibili-bv1f5cyz1eov-青柠智信) | [设计到代码](/docs/roles/frontend/design-to-code) |
| 页面实现 | [使用 OpenAI Codex 构建精美前端界面](/docs/resources/videos?video=bilibili-bv1w5p9z7en5-豚工智能) | [框架与组件生态](/docs/roles/frontend/frameworks-and-components) |
| 浏览器验证 | [Claude Code + Playwright 浏览器自动化](/docs/resources/videos?video=bilibili-bv1vgpaz6ehu-云桥网络) | [测试与交付](/docs/roles/frontend/testing-and-delivery) |
| Vue 工程化 | [Claude Code 实战：搭建 Vue3 工程级项目脚手架](/docs/resources/videos?video=bilibili-bv1lbakzme1a-极简前端) | [仓库结构](/docs/roles/frontend/repo-architecture) |

这几条链接都走站内视频目录，后续目录同步后仍然可以继续按筛选条件回到完整资源页。

## 前端专题媒体联动表

如果你不是想“找一个视频看看”，而是想直接开始带练，最稳的做法是把视频、案例、workflow 和交付物绑成一组：

| 你要带的主题 | 先看哪个视频 | 再看哪篇案例 | 最后接回哪个 workflow | 带练时至少要收什么产物 |
| --- | --- | --- | --- | --- |
| 设计输入到页面骨架 | [Claude Code + Figma 工作流](/docs/resources/videos?video=bilibili-bv1f5cyz1eov-青柠智信) | [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff) | [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud/runbook) | 节点说明、页面拆分表、关键断点截图、brief |
| 组件边界与状态收口 | [使用 OpenAI Codex 构建精美前端界面](/docs/resources/videos?video=bilibili-bv1w5p9z7en5-豚工智能) | [OpenAI Codex 重构与验证案例](/docs/case-studies/codex-refactor-with-verification) | [Spec-First](/docs/workflows/patterns/spec-first/runbook) | 组件分层说明、状态边界、阶段验证结果 |
| 浏览器验证与交付证据 | [Claude Code + Playwright 浏览器自动化](/docs/resources/videos?video=bilibili-bv1vgpaz6ehu-云桥网络) | [Claude Code Bugfix 闭环案例](/docs/case-studies/claude-code-bugfix-loop) | [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test/runbook) | smoke path、录屏、截图、Verification / Risks |
| 仓库结构与并行收口 | [Claude Code 实战：搭建 Vue3 工程级项目脚手架](/docs/resources/videos?video=bilibili-bv1lbakzme1a-极简前端) | [Cline 并行 Worktree 收口案例](/docs/case-studies/cline-parallel-worktree-owner-loop) | [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook) | lane map、owner 说明、统一验证结果 |
| 规则模板与 reviewer handoff | [实战演示视频列表](/docs/resources/videos?format=实战演示&section=results) | [GitHub Copilot Draft PR 交接案例](/docs/case-studies/github-copilot-draft-pr-handoff) | [Issue -> Draft PR](/docs/workflows/patterns/issue-to-draft-pr/runbook) | Summary、Artifacts、Risks、回滚入口 |

这张表的作用，是让你把前端培训从“推荐资料列表”推进到“可直接带练的一组动作”。只要视频、案例、workflow 和产物一起出现，团队更容易形成稳定节奏。

## 下一步

- 你正拿着设计稿准备开工：先读 [设计到代码](/docs/roles/frontend/design-to-code)。
- 你已经在做真实页面或组件：先读 [框架与组件生态](/docs/roles/frontend/frameworks-and-components)。
- 你最大的问题是质量和返工：直接去 [质量门禁](/docs/roles/frontend/quality-gates)。
- 你要把团队默认做法固化进仓库：直接看 [仓库结构](/docs/roles/frontend/repo-architecture)、[上下文与规则](/docs/roles/frontend/context-and-rules)、[规则与规范文档](/docs/roles/frontend/rules-and-instruction-files)。
- 你要判断 skill、MCP 和工具怎么配：直接看 [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp) 和 [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection)。
- 你想先补跨角色视角：同时看 [设计师](/docs/roles/design)、[后端工程师](/docs/roles/backend) 和 [测试工程师](/docs/roles/qa)。
