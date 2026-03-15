---
title: 前端 AI 工作台：设计到代码
description: 用结构化设计输入、token 和设计到代码路径，让 AI 更稳定地完成前端首版实现。
sidebar_label: 设计到代码
tags: [ai-coding, frontend, design-to-code]
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
slug: /roles/frontend/design-to-code
---

# 前端 AI 工作台：设计到代码

设计到代码这一步，决定了 AI 产出的上限。输入越结构化，前端返工越少。

## 学习目标

学完这一页后，你应该能：

- 解释为什么结构化设计输入比截图更适合长期前端协作
- 把设计稿、token 和文字约束整理成更适合 AI 的输入顺序
- 先生成页面骨架，再逐步抽组件，而不是一次性赌最终代码

## 建议先修

建议先看：

- [前端 AI 培训营：总览](/docs/roles/frontend)
- [设计师岗位页](/docs/roles/design)

## 训练任务

至少完成 1 个最小练习：

1. 选一个 Figma 页面，分别用“截图输入”和“结构化输入”让 AI 生成首版页面骨架，记录差异
2. 把一个页面拆成容器、卡片、表单、列表等结构层，并写出组件拆分草图
3. 从设计稿中整理一组颜色、间距、字号 token，准备给样式系统使用

## 典型交付物

这一模块最典型的输出包括：

- 页面结构拆分图
- 首版页面骨架代码
- token 初稿
- 设计输入清单

## 为什么结构化设计输入比截图更稳

AI 如果只能看截图，通常会出现这些问题：

- 间距、字号、层级靠猜
- 响应式规则不稳定
- 组件边界容易按视觉块硬拆
- token 无法自然沉淀进主题系统

更稳定的输入顺序应该是：

1. `Figma 链接 / Dev Mode / 节点上下文`
2. `Design Token`
3. 文字化的布局与交互约束
4. 最后才是截图补充视觉细节

## 设计到代码的默认路径

一个更稳的前端 AI 路径通常是：

1. 先读设计上下文，确定页面区块和信息层级
2. 再生成首版页面骨架
3. 然后抽出可复用组件
4. 最后才补交互态、响应式和视觉精修

这个顺序比“一次性生成整页最终代码”更可靠，因为你能在组件层级和 token 层级及时纠偏。

## Figma、token 与首版页面骨架

AI 最适合在这一段做的事：

- 识别页面区块、容器、卡片、表单、表格等结构
- 把色值、间距、圆角、阴影、字号映射到 token
- 给出页面级和组件级的拆分建议
- 补齐空态、加载态、错误态、响应式断点

人工要先确定的事：

- 哪些属于页面专有结构，哪些要进共享组件
- 设计语言中哪些东西必须 token 化
- 组件命名、目录落点和复用边界

## 什么时候可以只给截图

截图仍然有用，但更适合这些场景：

- 你只需要一个视觉方向草稿
- 你要做一次性活动页原型
- 你在补充 hover / 焦点 / 视觉细节

如果目标是长期维护的业务页面、组件库或设计系统，就不该只靠截图。

## 推荐做法

- 复杂页面先走 [`Spec-First` runbook](/docs/workflows/patterns/spec-first/runbook)
- 跟设计师一起协作时，补看 [设计师岗位页](/docs/roles/design)
- 如果后续要落到 React / Vue 真正实现，接着看 [框架与组件生态](/docs/roles/frontend/frameworks-and-components)
- 如果你已经明确要进入 token 和主题系统，继续看 [样式与设计系统](/docs/roles/frontend/styling-and-design-systems)

## 最少验证

完成这一页训练后，至少要拿出这些结果：

- 一份页面结构拆分说明
- 一份首版页面骨架
- 一份 token 初稿或设计输入清单

## 常见误区

- 只给截图，不给结构化设计输入
- 一次性要求 AI 直接生成最终版页面
- 先写样式细节，后想组件边界
- 没有 token 草稿就开始长期页面开发
