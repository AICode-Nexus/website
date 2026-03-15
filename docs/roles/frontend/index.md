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
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
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
- 如何把结果交出去：去 [测试与交付](/docs/roles/frontend/testing-and-delivery) 补组件级验证、Playwright 冒烟和 PR 交付模板。
- 如何把团队知识写回 repo：最后看 [上下文与规则](/docs/roles/frontend/context-and-rules)，明确 `AGENTS.md`、`CLAUDE.md`、工具 rules 和 skills 的分工。

## 模块地图

![前端 AI 工作台模块地图](/img/roles/frontend/frontend-workbench-map.svg)

上图把这组文档拆成三条主线：

- `设计到实现`：适合页面首版、设计稿还原、组件拆分和主题落地。
- `开发到交付`：适合中后台功能、老页面重构、缺陷修复和 PR 收口。
- `团队到机制`：适合组件库维护、monorepo 协作、规则文件治理和培训带教。

## 三条推荐阅读路径

| 路径 | 适合谁 | 先读什么 | 典型产出 |
| --- | --- | --- | --- |
| 设计到实现 | 正在从 Figma 落页面的前端 | [设计到代码](/docs/roles/frontend/design-to-code) -> [框架与组件生态](/docs/roles/frontend/frameworks-and-components) -> [样式与设计系统](/docs/roles/frontend/styling-and-design-systems) | 页面骨架、组件拆分图、token 初稿 |
| 开发到交付 | 正在做真实业务功能或重构 | [框架与组件生态](/docs/roles/frontend/frameworks-and-components) -> [质量门禁](/docs/roles/frontend/quality-gates) -> [测试与交付](/docs/roles/frontend/testing-and-delivery) | 可 review 的代码、验证命令、PR 交付说明 |
| 团队到机制 | 组件库维护者、前端负责人 | [仓库结构](/docs/roles/frontend/repo-architecture) -> [上下文与规则](/docs/roles/frontend/context-and-rules) -> [测试与交付](/docs/roles/frontend/testing-and-delivery) | repo 合同、skills 映射、团队质量护栏 |

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
| 团队规则 | `AGENTS.md`、`CLAUDE.md`、skill 映射 | [上下文与规则](/docs/roles/frontend/context-and-rules) |

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

## 下一步

- 你正拿着设计稿准备开工：先读 [设计到代码](/docs/roles/frontend/design-to-code)。
- 你已经在做真实页面或组件：先读 [框架与组件生态](/docs/roles/frontend/frameworks-and-components)。
- 你最大的问题是质量和返工：直接去 [质量门禁](/docs/roles/frontend/quality-gates)。
- 你要把团队默认做法固化进仓库：直接看 [仓库结构](/docs/roles/frontend/repo-architecture) 和 [上下文与规则](/docs/roles/frontend/context-and-rules)。
- 你想先补跨角色视角：同时看 [设计师](/docs/roles/design)、[后端工程师](/docs/roles/backend) 和 [测试工程师](/docs/roles/qa)。
