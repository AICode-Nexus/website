---
title: Skills 与 MCP
description: 按前端任务形状选择 skills、Context7、Figma、浏览器和其他 MCP 能力，避免工具会用但入口错用。
sidebar_label: Skills 与 MCP
tags: [ai-coding, frontend, skills, mcp]
track: cross-track
kind: guide
content_form: guide
audience: frontend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-25
source_window_end: 2026-03-25
market_status: current
slug: /roles/frontend/skills-and-mcp
---

# Skills 与 MCP

前端任务最容易出现的一种低效，是知道很多工具名，但不知道应该先启用什么能力。结果就是：设计稿任务没先拿 Figma 上下文，React 重构没先收紧组件边界，浏览器问题没先进真实页面，最后所有上下文都堆到同一段对话里。

## 能力编排板

![前端能力编排板](/img/roles/frontend/frontend-skill-mcp-board.svg)

这张图把“方法、真实上下文、任务包、证据”压成了三个典型前端任务。它的作用不是替代表格，而是帮你先建立默认顺序，再回到具体 skill 和 MCP 组合表。

## 先区分三类能力

| 能力类型 | 更适合解决什么问题 | 前端典型例子 |
| --- | --- | --- |
| Skill | 工作方法、约束、最佳实践 | React 组件边界、TDD、系统化调试、验证闭环 |
| MCP | 实际世界上下文与外部系统 | Figma 节点、浏览器页面、官方文档、截图、文件资源 |
| 普通任务 brief | 本次任务目标与验收 | “重构 pricing 页 Hero 并补移动端抽屉” |

最稳的顺序通常是：先用 skill 决定工作方法，再用 MCP 拿真实上下文，最后让任务 brief 约束范围和产出。

## 前端任务到能力编排矩阵

| 任务形状 | 优先 skill | 必要 MCP / 上下文 | 任务包至少要补什么 | 预期交付物 |
| --- | --- | --- | --- | --- |
| 设计稿落地 | `figma`、`react-best-practices` | Figma 节点、截图、token、浏览器能力 | 路由、断点、设计输入、组件边界 | 页面骨架、断点截图、token 对照 |
| React / Vue 组件治理 | `react-best-practices`、`typescript-react-patterns`、`state-management` | 文件读取、必要时 Context7 | 共享层边界、状态职责、验证命令 | 组件分层说明、状态边界、验证结果 |
| 浏览器 bug 修复 | `systematic-debugging`、`verification-before-completion` | 浏览器能力、录屏、日志或控制台 | 复现步骤、受影响断点、验收条件 | 复现说明、修复说明、录屏、命令结果 |
| 设计系统或共享层重构 | `writing-plans`、`executing-plans`、`verification-before-completion` | 设计 token、目录结构、相关页面截图 | 受影响页面、包边界、阶段验证 | 计划、影响面清单、截图、风险说明 |
| 文档与规范补强 | `technical-docs-editor` | 目标文档、相邻文档、索引页 | 主题边界、相关页、build 验证要求 | 体检结论、扩写计划或直接改稿摘要 |
| 发布前收口 | `verification-before-completion`、`requesting-code-review` | 命令输出、浏览器截图、PR 草稿 | 验证命令、截图位置、风险项 | Verification、Artifacts、Risks、review 结论 |

这张表的关键不是“技能越多越好”，而是让每一类前端任务都先拿到正确的方法、上下文和交付物。

## 前端高频任务到 skills 的映射

| 任务形状 | 优先 skill | 为什么 |
| --- | --- | --- |
| React 组件治理 | `react-best-practices`、`typescript-react-patterns` | 先收紧组件职责、props、事件和类型边界 |
| 状态边界梳理 | `state-management` | 先区分远程状态、本地状态和共享状态 |
| 设计稿落地 | `figma`、`react-best-practices` | 先拿设计输入，再落到真实组件结构 |
| Bug 排查 | `systematic-debugging` | 先证明问题，再写修复 |
| 改动较大 | `writing-plans` 或计划先行能力 | 先拆步，避免跨目录乱改 |
| 文档与培训资产扩写 | `technical-docs-editor` | 先体检结构、决策层和证据位，再决定是否直接改稿 |
| 交付收口 | `verification-before-completion`、`requesting-code-review` | 先补证据，再声称完成 |

## 前端最值得优先使用的 MCP

| MCP / 能力 | 什么时候最有价值 | 前端场景 |
| --- | --- | --- |
| Figma MCP | 设计稿、节点、变量、截图是真实输入时 | 页面还原、组件提炼、token 对齐 |
| Context7 | 需要最新官方接口或文档时 | `Next.js`、`React`、`Playwright`、`Tailwind` 新 API |
| 浏览器 / Playwright 类能力 | 需要真实页面行为和截图时 | 复现 bug、检查断点、录制交互路径 |
| 文件与资源读取 | 需要理解 repo 中的 token、配置、素材文件时 | 设计 token、内容配置、静态资源目录 |

一个常见错误是：前端任务明明依赖 Figma 和浏览器，却只给文本说明。这样模型只能猜视觉、猜交互、猜断点，返工自然会高。

## 官方入口速查

- 事实：GitHub issue [#3](https://github.com/AICode-Nexus/website/issues/3) 在 `2026-03-24 09:54:05 UTC` 创建，直接提出“有些 skills 和 MCP 页面最好附 GitHub 地址或网址，方便点击查看”。
- 推断：对读者来说，`Skills 与 MCP` 页不只要回答“什么时候用”，还应该回答“下一步去哪里看官方入口”。

先说明一个边界：本仓库里的 `skill` 多数是本地方法模板，不一定都有独立官网或 GitHub 仓库。真正需要点出去的时候，优先看它依赖的外部工具、协议或官方文档，而不是强行为每个 skill 名称找一个并不存在的公共主页。

| 能力 / 主题 | 站内入口 | 官方或参考入口 | 什么时候值得点出去 |
| --- | --- | --- | --- |
| Figma MCP | [设计 / Figma](/docs/roles/design/tools/figma) | [Figma MCP Catalog](https://www.figma.com/mcp-catalog/)<br />[Figma Dev Mode MCP server 介绍](https://www.figma.com/blog/introducing-figmas-dev-mode-mcp-server/) | 你需要确认 Figma MCP 支持范围、接入方式或产品定位时 |
| Context7 | 当前页 | [Context7](https://context7.com/) | 你已经知道要查最新官方文档，但还没进入对应库的检索入口时 |
| Playwright | [Playwright 自动化测试方案](/docs/roles/frontend/playwright-automation-plan) | [Playwright Docs](https://playwright.dev/docs/intro) | 你已经决定要做浏览器自动化，需要对照 API、配置或 runner 细节时 |
| MCP 协议本身 | [MCP 与协议生态](/docs/ai-directory/mcp-and-protocols) | [Model Context Protocol: Introduction](https://modelcontextprotocol.io/introduction)<br />[Model Context Protocol: Architecture overview](https://modelcontextprotocol.io/docs/architecture) | 你需要先理解协议层，而不是直接挑某个 server 时 |

如果你在站内页面已经能明确任务形状，就先用站内页缩小范围；只有当你需要核对产品能力、最新接口或官方接入细节时，再点出去看官方入口。这样更不容易在一开始就掉进“开十几个标签页，但还没开始做事”的低效模式。

## 默认能力组合

### 设计稿任务

1. 先启用 `figma` 或等价设计上下文能力，读取节点、截图、变量和层级。
2. 再用 React / Vue 相关最佳实践 skill，约束组件边界和目录位置。
3. 实现完成后，用浏览器或 Playwright 能力补断点截图和交互录屏。
4. 最后用验证类 skill 收口命令、截图和风险说明。

这条组合链路特别适合页面首版、设计系统提炼和高保真还原任务。

### 浏览器问题

1. 先用浏览器能力复现，而不是先猜源码。
2. 再启用 `systematic-debugging` 限制排查顺序。
3. 修复完成后，用 `verification-before-completion` 收口录屏、截图和 smoke path。

### 共享层治理

1. 先用 `writing-plans` 或计划类能力拆步。
2. 再读取目录结构、共享组件、token 和受影响页面。
3. 最后用验证类 skill 收口跨目录影响和风险说明。

### 文档与规范补强

1. 先启用 `technical-docs-editor`，读目标页、索引页和相邻页。
2. 先判断是“结构问题”还是“局部单薄”。
3. 如果要大改结构，先出计划；如果结构稳定，再直接补表格、模板资产和案例位。

## 前端浏览器问题的默认能力组合

| 问题 | 建议组合 | 为什么 |
| --- | --- | --- |
| 样式只在移动端坏 | 浏览器能力 + 样式系统文档 + 验证闭环 | 先看真实窄屏，再改 token 或布局 |
| 某个交互路径失效 | 浏览器能力 + systematic-debugging + Playwright | 先复现，再判断是逻辑问题还是选择器问题 |
| 断点切换抖动 | 浏览器截图 + repo 结构检查 + 测试与交付要求 | 先确认是页面私有逻辑还是共享组件问题 |

如果你不先进真实页面，只在代码层推理，前端 bug 很容易被误判。

## 能力编排失败的 5 个前端信号

| 失败信号 | 说明缺了什么 | 修正动作 |
| --- | --- | --- |
| 设计稿任务只有整屏截图 | 缺结构化设计上下文 | 先补 Figma 节点、变量或关键局部截图 |
| 组件重构直接开改 | 缺方法约束 | 先补 `react-best-practices` 或计划能力 |
| 浏览器 bug 只给报错片段 | 缺真实页面上下文 | 先补复现步骤、录屏和断点环境 |
| 文档补强只拉长正文 | 缺结构体检 | 先用 `technical-docs-editor` 识别结构层、证据层缺口 |
| 发布前只有“应该没问题” | 缺验证证据 | 先跑命令，再补截图和风险说明 |

## MCP 使用失败的 4 个前端信号

1. 设计稿任务没有节点上下文，只有整屏截图。
2. UI bug 修复没有真实浏览器复现，只有报错片段。
3. 查最新框架接口时没有查官方文档，直接凭旧印象改。
4. 需要真实截图或视频的任务，却把“请帮我验证”留在纯文本层。

## 能力编排时至少要补的证据

| 任务类型 | 至少要补什么证据 |
| --- | --- |
| 设计稿落地 | 关键断点截图、设计节点说明、token 或组件边界说明 |
| 浏览器 bug | 复现步骤、录屏、修复后截图、最小 smoke path |
| 共享层重构 | 计划、影响面清单、受影响页面截图、验证结果 |
| 文档补强 | 结构变化摘要、相关页联动、build 结果 |

## 训练任务

| 训练任务 | 目标 | 交付物 |
| --- | --- | --- |
| 任务 1：用 Figma 节点重建一个页面骨架 | 练设计上下文读取 | 节点说明、页面骨架、断点截图 |
| 任务 2：为 React 重构任务选 skill 组合 | 练能力编排 | skill 选择表、边界说明、验证计划 |
| 任务 3：用浏览器能力复现并关闭一个前端 bug | 练真实页面调试 | 复现步骤、修复说明、录屏和命令结果 |

## 能力编排案例地图

这一页最适合配合真实案例一起读，因为“选对 skill 和 MCP”本身不是结果，真正要看的是它们有没有把任务包、上下文和证据收成一条线：

| 现在的前端任务 | 先看哪篇案例 | 为什么值得搭配本页 |
| --- | --- | --- |
| 本地先读设计和代码，再把长执行段交给后台 | [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff) | 适合看 skill、设计上下文和执行段 handoff 怎么配合 |
| 中等规模重构，需要计划、验证和阶段收口 | [OpenAI Codex 重构与验证案例](/docs/case-studies/codex-refactor-with-verification) | 最适合对照“方法 skill + repo 上下文 + 验证证据”这条链路 |
| 多个 lane 并行推进，最后由 owner 收口 | [Cline 并行 Worktree 收口案例](/docs/case-studies/cline-parallel-worktree-owner-loop) | 适合看多入口并行时，能力编排如何避免共享层失控 |

看这些案例时，建议只追三条线：

1. 先用了什么方法类 skill，为什么不是直接开改。
2. 真实上下文是怎么补进来的，比如 Figma、浏览器、目录结构或命令输出。
3. 最终交付里哪些证据证明这套能力编排是对的。

## 能力编排的媒体联动表

如果你准备把这页用作培训材料，最稳的方式不是只讲 skill 名单，而是把“视频演示 -> 案例 -> 交付物”放在同一张表里：

![前端能力编排证据板](/img/roles/frontend/frontend-capability-proof-sheet.svg)

| 训练主题 | 先看哪个视频 | 再看哪篇案例 | 至少要观察或交付什么 |
| --- | --- | --- | --- |
| 设计上下文 + 组件实现 | [Claude Code + Figma 工作流](/docs/resources/videos?video=bilibili-bv1f5cyz1eov-青柠智信) | [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff) | Figma 上下文、brief、组件边界和断点截图 |
| 浏览器复现 + 验证收口 | [Claude Code + Playwright 浏览器自动化](/docs/resources/videos?video=bilibili-bv1vgpaz6ehu-云桥网络) | [Claude Code Bugfix 闭环案例](/docs/case-studies/claude-code-bugfix-loop) | 复现步骤、录屏、最小 smoke path、命令结果 |
| 长链路重构 + 阶段验证 | [使用 OpenAI Codex 构建精美前端界面](/docs/resources/videos?video=bilibili-bv1w5p9z7en5-豚工智能) | [OpenAI Codex 重构与验证案例](/docs/case-studies/codex-refactor-with-verification) | 计划、影响面、阶段验证、风险说明 |

## 案例与视频路径

- 想看设计到代码链路：回到 [设计到代码](/docs/roles/frontend/design-to-code) 和 [全部视频](/docs/resources/videos) 搜 `figma`、`frontend`。
- 想看浏览器验证与交付：回到 [测试与交付](/docs/roles/frontend/testing-and-delivery) 和 [实战演示](/docs/resources/hands-on-demos)。
- 想看计划型和多步执行：去 [Spec-First](/docs/workflows/patterns/spec-first/runbook)、[OpenAI Codex](/docs/tools/execution-stacks/openai-codex/quick-start)。
- 想看真实案例：去 [实战案例首页](/docs/case-studies)。
- 想直接看能力编排的真实样子：去 [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff)、[OpenAI Codex 重构与验证案例](/docs/case-studies/codex-refactor-with-verification)、[Cline 并行 Worktree 收口案例](/docs/case-studies/cline-parallel-worktree-owner-loop)。

## 下一步

- 想把这些能力接回规则文件：去 [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files)。
- 想把能力选择再收敛到入口工具：去 [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection)。
- 想回到前端机制总览：去 [上下文与规则](/docs/roles/frontend/context-and-rules)。
