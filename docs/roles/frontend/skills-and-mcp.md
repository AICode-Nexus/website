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
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
slug: /roles/frontend/skills-and-mcp
---

# Skills 与 MCP

前端任务最容易出现的一种低效，是知道很多工具名，但不知道应该先启用什么能力。结果就是：设计稿任务没先拿 Figma 上下文，React 重构没先收紧组件边界，浏览器问题没先进真实页面，最后所有上下文都堆到同一段对话里。

## 先区分三类能力

| 能力类型 | 更适合解决什么问题 | 前端典型例子 |
| --- | --- | --- |
| Skill | 工作方法、约束、最佳实践 | React 组件边界、TDD、系统化调试、验证闭环 |
| MCP | 实际世界上下文与外部系统 | Figma 节点、浏览器页面、官方文档、截图、文件资源 |
| 普通任务 brief | 本次任务目标与验收 | “重构 pricing 页 Hero 并补移动端抽屉” |

最稳的顺序通常是：先用 skill 决定工作方法，再用 MCP 拿真实上下文，最后让任务 brief 约束范围和产出。

## 前端高频任务到 skills 的映射

| 任务形状 | 优先 skill | 为什么 |
| --- | --- | --- |
| React 组件治理 | `react-best-practices`、`typescript-react-patterns` | 先收紧组件职责、props、事件和类型边界 |
| 状态边界梳理 | `state-management` | 先区分远程状态、本地状态和共享状态 |
| 设计稿落地 | `figma`、`react-best-practices` | 先拿设计输入，再落到真实组件结构 |
| Bug 排查 | `systematic-debugging` | 先证明问题，再写修复 |
| 改动较大 | `writing-plans` 或计划先行能力 | 先拆步，避免跨目录乱改 |
| 交付收口 | `verification-before-completion`、`requesting-code-review` | 先补证据，再声称完成 |

这些 skill 的价值不在于“更智能”，而在于让前端任务不再每次都从零发明流程。

## 前端最值得优先使用的 MCP

| MCP / 能力 | 什么时候最有价值 | 前端场景 |
| --- | --- | --- |
| Figma MCP | 设计稿、节点、变量、截图是真实输入时 | 页面还原、组件提炼、token 对齐 |
| Context7 | 需要最新官方接口或文档时 | `Next.js`、`React`、`Playwright`、`Tailwind` 新 API |
| 浏览器 / Playwright 类能力 | 需要真实页面行为和截图时 | 复现 bug、检查断点、录制交互路径 |
| 文件与资源读取 | 需要理解 repo 中的 token、配置、素材文件时 | 设计 token、内容配置、静态资源目录 |

一个常见错误是：前端任务明明依赖 Figma 和浏览器，却只给文本说明。这样模型只能猜视觉、猜交互、猜断点，返工自然会高。

## 前端设计稿任务的默认能力组合

1. 先启用 `figma` 或等价设计上下文能力，读取节点、截图、变量和层级。
2. 再用 React / Vue 相关最佳实践 skill，约束组件边界和目录位置。
3. 实现完成后，用浏览器或 Playwright 能力补断点截图和交互录屏。
4. 最后用验证类 skill 收口命令、截图和风险说明。

这条组合链路特别适合页面首版、设计系统提炼和高保真还原任务。

## 前端浏览器问题的默认能力组合

| 问题 | 建议组合 | 为什么 |
| --- | --- | --- |
| 样式只在移动端坏 | 浏览器能力 + 样式系统文档 + 验证闭环 | 先看真实窄屏，再改 token 或布局 |
| 某个交互路径失效 | 浏览器能力 + systematic-debugging + Playwright | 先复现，再判断是逻辑问题还是选择器问题 |
| 断点切换抖动 | 浏览器截图 + repo 结构检查 + 测试与交付要求 | 先确认是页面私有逻辑还是共享组件问题 |

如果你不先进真实页面，只在代码层推理，前端 bug 很容易被误判。

## MCP 使用失败的 4 个前端信号

1. 设计稿任务没有节点上下文，只有整屏截图。
2. UI bug 修复没有真实浏览器复现，只有报错片段。
3. 查最新框架接口时没有查官方文档，直接凭旧印象改。
4. 需要真实截图或视频的任务，却把“请帮我验证”留在纯文本层。

## 训练任务

| 训练任务 | 目标 | 交付物 |
| --- | --- | --- |
| 任务 1：用 Figma 节点重建一个页面骨架 | 练设计上下文读取 | 节点说明、页面骨架、断点截图 |
| 任务 2：为 React 重构任务选 skill 组合 | 练能力编排 | skill 选择表、边界说明、验证计划 |
| 任务 3：用浏览器能力复现并关闭一个前端 bug | 练真实页面调试 | 复现步骤、修复说明、录屏和命令结果 |

## 下一步

- 想把这些能力接回规则文件：去 [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files)。
- 想把能力选择再收敛到入口工具：去 [工具匹配与选型](/docs/roles/frontend/tool-fit-and-selection)。
- 想回到前端机制总览：去 [上下文与规则](/docs/roles/frontend/context-and-rules)。
