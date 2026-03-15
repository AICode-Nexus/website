---
title: 前端 AI 工作台：质量门禁
description: 把 TypeScript、ESLint、Oxlint 和发布前验证变成 AI 协作的默认护栏。
sidebar_label: 质量门禁
tags: [ai-coding, frontend, typescript, lint]
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
slug: /roles/frontend/quality-gates
---

# 前端 AI 工作台：质量门禁

如果你只让 AI 生成代码，而不把门禁接上去，前端质量不会变稳定，只会变快地积累问题。

## 学习目标

学完这一页后，你应该能：

- 把 `TypeScript / ESLint / Oxlint` 变成 AI 开发的默认护栏
- 区分写码时、review 时和发布前的门禁职责
- 为项目写出最小可执行的验证链路

## 建议先修

建议先看：

- [前端 AI 培训营：总览](/docs/roles/frontend)
- [框架与组件生态](/docs/roles/frontend/frameworks-and-components)

## 训练任务

至少完成 1 个最小练习：

1. 为当前项目整理一份 `lint / type-check / build / test` 的验证顺序
2. 找一段 AI 生成代码，手动补齐类型、lint 和 review 约束
3. 给团队写一份“什么改动不允许直接跳过验证”的规则说明

## 写码时的护栏

### TypeScript

AI 最适合用来：

- 补 `props`、事件和返回值类型
- 收紧接口模型
- 帮你在重构时发现缺失的类型边界

但你要防的事也很明确：

- 它会倾向于用更宽松的类型先过编译
- 它会为了省事引入 `any` 或不必要的联合类型

### ESLint / Oxlint / 格式化

这层的意义不是“事后补救”，而是让 AI 一开始就知道不能怎么写。

- `ESLint`：负责长期约束和规则表达
- `Oxlint`：适合更快的批量静态检查
- `Biome` 或格式化层：适合压平低价值风格争议

AI 在这一步最适合做：

- 修自动可修的规则问题
- 统一重复性的目录级问题
- 根据报错快速定位风险点

## Review 时的护栏

代码能过 lint，不等于能过 review。

review 阶段要额外盯住：

- 组件边界是否变差
- 是否重复造轮子
- 是否把局部问题扩散成共享抽象
- 是否引入没有必要的状态和复杂度

如果任务复杂，优先走：

- [`Spec-First` runbook](/docs/workflows/patterns/spec-first/runbook)
- [`Bugfix / Refactor / Test` runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)

## 发布前的护栏

发布前至少要把这些门接上：

```bash
# 按项目实际脚本替换
npm run lint
npm run type-check
npm run build
npx playwright test
```

如果你是 workspace / monorepo 项目，通常会换成：

```bash
pnpm lint
pnpm typecheck
turbo run build test
```

## 推荐的门禁顺序

1. 写码时就让 `TypeScript` 和 lint 报警
2. 改完先看 diff，再跑静态检查
3. 关键页面补 Playwright 或组件测试
4. 发布前再跑完整构建链路

## 训练验收

完成这一页训练后，至少要拿出这些结果：

- 一套明确的门禁顺序
- 一份项目验证命令清单
- 一个经过类型、lint 和测试验证的真实改动

## 这页后面接什么

- 要继续看 Playwright、Vitest、PR 交付：去 [测试与交付](/docs/roles/frontend/testing-and-delivery)
- 要继续看 repo 级边界和 workspace 任务：去 [仓库结构](/docs/roles/frontend/repo-architecture)
- 要继续看规则文件和 skills：去 [上下文与规则](/docs/roles/frontend/context-and-rules)
