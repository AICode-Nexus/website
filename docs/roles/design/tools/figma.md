---
title: Figma
description: Figma 适合把设计上下文、原型、站点交互和设计到代码 handoff 串成一条连续链路。
slug: /roles/design/tools/figma
sidebar_label: Figma
tags: [ai-coding, design, tools, figma]
track: cross-track
kind: guide
content_form: guide
audience: designer
stage: intermediate
featured: false
domain: workflows
journey_stage: tech-selection
entry_role: domain
reviewed_at: 2026-03-16
source_window_end: 2026-03-16
market_status: current
---

# Figma

Figma 现在已经不只是“在线画设计稿”的工具。按官方当前产品线，它把 `Figma Make`、`Figma Sites`、`Code Layers`、`FigJam AI` 和 `Figma MCP server` 接到了同一个设计工作流里，更适合承担“设计上下文中心”的角色，而不是只做画布。

## 它最适合什么任务

| 任务 | 适合程度 | 原因 |
| --- | --- | --- |
| 设计稿到代码 handoff | 很高 | 节点、变量、站点交互、MCP 上下文可以接到开发工具 |
| 组件库与设计系统维护 | 很高 | 变量、组件、命名和结构能长期沉淀 |
| 交互原型和网页交互演示 | 高 | `Figma Sites` 和 `Code Layers` 能补更真实的交互层 |
| 早期低门槛概念草图 | 中 | 能做，但不一定是最快的白板式入口 |

## 为什么它在 AI 时代仍然是主轴工具

Figma 官方当前把 AI 放在三类事情上：

- 用 `Figma Make` 让想法更快变成可交互原型或 app 草案。
- 用 `Code Layers` 在站点里补动画、文本效果和交互元素。
- 用 `Figma MCP server` 把真实设计上下文直接带进 VS Code、Cursor、Windsurf、Claude 等 agentic coding 工具。

这意味着 Figma 的价值不只是“生成”，而是把生成结果继续放回组件、变量、注释和 handoff 体系里。对设计师来说，这个闭环比单次出图更重要。

## 你可以怎么用它

### 设计探索

先用 `Figma Make` 测几个方向，快速看布局、层级和交互气质，再决定哪条线值得精修。这样比直接从空白画布开始更快，也比单独在聊天窗口里出图更容易留住结构。

### 设计到代码

如果后面要交给前端或 agent 继续实现，优先把关键页面节点、变量、交互说明和组件边界整理干净，再通过 `Figma MCP server` 或常规 Dev Mode 交出去。这样前端拿到的是“真实设计上下文”，不是一张静态截图。

### 例行提效

Figma 官方当前也把一些高频琐事做成了 AI 能力，例如自动重命名图层、补内容、改写/翻译文案、背景移除和 FigJam 自动整理。这类能力不一定决定工具选型，但能明显降低大文件的维护成本。

## 实战案例

### 案例：活动专题页从概念到开发交付

1. 设计师先用 `Figma Make` 试 2 到 3 个专题页结构方向。
2. 在确定方向后，把 header、hero、CTA、FAQ 和表单区拆成组件与变量。
3. 需要更接近真实网页交互时，在 `Figma Sites` 里加 `Code Layers` 做动效和文本效果。
4. 交给前端前，补齐节点链接、断点说明、状态表和变量命名。
5. 前端或 coding agent 通过 `Figma MCP server` 读取上下文，再去实现页面。

这条路径的关键收益是：同一个工具同时承担探索、精修、交互演示和 handoff，不需要把设计意图拆散到多个地方。

## 交付给开发时至少要给什么

- 关键节点链接
- 变量或 token 说明
- 组件状态与变体
- 响应式断点
- 不能随意改动的视觉边界

如果这些信息缺一半，AI 再强也会重新猜。

## 边界与注意事项

- 如果你的目标只是“先给老板看个大概方向”，Figma 可能不是最低门槛入口，像 [Uizard](/docs/roles/design/tools/uizard) 或 [Visily](/docs/roles/design/tools/visily) 会更快。
- 如果团队没有清理图层命名、变量结构和组件边界，Figma 的 AI 与 handoff 价值会被大幅削弱。
- `Figma Sites` 更适合网页和交互展示，不等于替代完整前端工程体系。

## 官方入口

- [Figma AI 官方页](https://www.figma.com/ai/)
- [Figma MCP Catalog](https://www.figma.com/mcp-catalog/)
- [Figma Dev Mode MCP server 介绍](https://www.figma.com/blog/introducing-figmas-dev-mode-mcp-server/)

## 下一步

- 想看设计到代码的配套做法：去 [前端 / 设计到代码](/docs/roles/frontend/design-to-code)。
- 想看设计任务该怎么配能力：去 [Skills 与 MCP](/docs/roles/design/skills-and-mcp)。
- 想比较它和其他工具的任务边界：回到 [工具专题](/docs/roles/design/tools)。
