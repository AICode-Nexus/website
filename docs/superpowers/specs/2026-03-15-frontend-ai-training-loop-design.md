---
title: Frontend AI Training Loop Design
description: 使用 Ralph Loop 持续把前端工作台文档打磨成 AI 前端培训体系的设计说明。
slug: /site-admin/superpowers/specs/frontend-ai-training-loop-design
tags: [site-admin, design, superpowers]
track: cross-track
kind: guide
content_form: guide
domain: standards
journey_stage: development-design
entry_role: admin
audience: advanced
stage: intermediate
featured: false
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
unlisted: true
---

# Frontend AI Training Loop Design

## Goal

把现有 `/docs/roles/frontend` 及其子页，从“前端 AI 工作台知识库”持续打磨成“AI 前端培训文档体系”。

目标不是单纯补字数，而是形成一套适合培训和自学的结构：

- 学习路径清楚
- 模块目标清楚
- 每章有训练任务
- 每章有验证标准
- 总览页能承担训练营导航作用

## Why Ralph Loop

这项工作不适合一次性大改，因为培训体系的建设天然是增量式的。`Ralph Loop` 更适合承接这种长期打磨：

- 每轮只补一个明确缺口
- 每轮都保留可发布成果
- 每轮都能围绕同一个完成标准推进
- 不会因为一次想做太多而重新散掉

## Scope

本轮 loop 只围绕前端培训体系建设，覆盖：

- `docs/roles/frontend/index.md`
- `docs/roles/frontend/*.md`

可以逐轮扩展的内容包括：

- 学习路径与阅读顺序
- 模块目标与适用人群
- 训练任务与交付物
- 验证清单与通过标准
- 实战项目与阶段里程碑
- 常见误区与反模式

## Non-Goals

当前 loop 不做这些事：

- 不重做整站 IA
- 不在第一轮就把每个技术都拆成单独课程
- 不引入大量交互组件或页面级视觉重构
- 不把所有前端知识都塞进岗位页

## Recommended Loop Shape

建议按下面顺序做多轮迭代：

1. `总览页培训化`
让首页具备训练地图、阶段路径、读者分层和模块目标。

2. `模块页课程化`
给现有子页补：
- 学习目标
- 推荐前置知识
- 训练任务
- 验证清单

3. `实战项目化`
补 2 到 3 个前端 AI 训练项目，把多个模块串起来。

4. `模板与规范化`
补 prompt、规则文件、repo 约束、验收模板。

## First Iteration Recommendation

第一轮最值得做的是：

- 重写 `docs/roles/frontend/index.md`
- 把它从“知识导航页”升级成“培训总览页”

至少补上这些模块：

- 训练目标
- 学习路径
- 分阶段训练地图
- 模块总览
- 适合谁学
- 建议训练方式

## Completion Criteria

只有同时满足下面这些条件，才算达到“AI 前端培训文档要求”：

- 总览页具备训练营入口能力
- 每个核心子页都具备最少的学习目标和训练任务
- 至少形成一条从入门到交付的完整学习路径
- 培训文档不只是技术名词汇总，而是可执行的训练手册
