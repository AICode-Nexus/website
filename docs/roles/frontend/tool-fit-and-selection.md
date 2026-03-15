---
title: 工具匹配与选型
description: 按前端任务形状选择终端入口、执行栈、IDE、浏览器与 Figma 协作方式，避免把所有 UI 任务都塞进同一种入口。
sidebar_label: 工具匹配与选型
tags: [ai-coding, frontend, tools]
track: cross-track
kind: guide
content_form: guide
audience: frontend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: tech-selection
entry_role: domain
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
slug: /roles/frontend/tool-fit-and-selection
---

# 工具匹配与选型

前端团队在 AI 协作上最常见的误区，不是工具太少，而是任务形状不同却仍然用同一种入口。页面还原、组件重构、浏览器复现、设计系统治理、内容页扩写，这些任务对上下文的要求完全不同。

## 一个先行结论

- 设计稿落地优先“设计上下文 + 终端或执行栈”，不要只靠文本。
- 浏览器问题优先“真实页面 + 录屏 + 最小 patch”，不要只看源码。
- 共享组件或设计系统重构优先“计划 + 目录边界 + 验证闭环”。
- 文档和规范类任务优先“仓库文本结构 + 链接校验 + build 验证”。

## 按任务形状选工具

| 任务形状 | 更适合的入口 | 为什么 | 推荐搭配 |
| --- | --- | --- | --- |
| 设计稿转页面骨架 | 终端入口或执行栈 + Figma 上下文 | 需要同时读代码和真实设计输入 | [设计到代码](/docs/roles/frontend/design-to-code)、[Skills 与 MCP](/docs/roles/frontend/skills-and-mcp) |
| 小步 UI 修复 | 终端入口 | 适合快速读文件、改局部、跑最小验证 | [质量门禁](/docs/roles/frontend/quality-gates) |
| 页面交互 bug 复现 | 浏览器能力 + 终端入口 | 先在真实页面里证明问题，再回源码修复 | [测试与交付](/docs/roles/frontend/testing-and-delivery) |
| 组件库 / 设计系统重构 | 执行栈或更计划化入口 | 需要跨目录推进并保留阶段验证 | [仓库结构](/docs/roles/frontend/repo-architecture) |
| 长文档与训练资产扩写 | 终端入口 | 更适合大规模文本重组、链接更新与 build 校验 | [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files) |
| 平台内 issue 已很清楚 | 平台型入口 | 适合直接衔接任务系统与 draft PR | [工作流教程首页](/docs/workflows) |

## 对前端最值钱的入口组合

### 设计到代码

- 设计输入：Figma 或等价设计上下文
- 实现主入口：终端入口或执行栈
- 验证：浏览器截图、必要时 Playwright

### 浏览器问题定位

- 复现主入口：浏览器能力
- 修复主入口：终端入口
- 收口：截图、录屏、最小 smoke path

### 设计系统或共享组件治理

- 计划与拆步：更适合保留计划的入口
- 代码推进：终端或执行栈
- 验证：受影响页面列表、断点截图、交互录屏

## 前端团队常见误选

### 误选一：设计任务不用设计上下文

结果通常是：

- 只会产出“看起来像”的页面。
- 组件边界和 token 映射靠猜。
- review 时才发现状态和断点全漏。

### 误选二：浏览器问题只在代码里推理

这会导致你修的不是用户真正看到的问题，而是源码里最显眼的一段问题。

### 误选三：共享组件重构不用计划

短期看像是提速，长期看最容易把共享层改成“任何页面都能塞东西的地方”。

## 前端训练建议

| 阶段 | 默认入口 | 目标 |
| --- | --- | --- |
| 入门阶段 | 终端入口 | 先学会在仓库里读文件、改局部、跑验证 |
| 页面实现阶段 | 终端或执行栈 + Figma | 先学会把设计输入和代码边界接起来 |
| 浏览器验证阶段 | 浏览器 + 终端 | 先学会用真实页面复现和收口 |
| 共享层治理阶段 | 计划化入口 + 终端 | 先学会拆步、控范围、交证据 |

## 下一步

- 想先固定规则文件和任务模板：去 [规则与规范文档](/docs/roles/frontend/rules-and-instruction-files)。
- 想先确定 skill 与 MCP 应该怎么配：去 [Skills 与 MCP](/docs/roles/frontend/skills-and-mcp)。
- 想回到前端机制总览：去 [上下文与规则](/docs/roles/frontend/context-and-rules)。
