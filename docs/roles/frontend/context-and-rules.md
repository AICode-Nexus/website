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
