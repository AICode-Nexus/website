---
title: 前端 AI 工作台：测试与交付
description: 把 Playwright、Vitest、组件预览和 PR 验收收进前端 AI 的默认交付链路。
sidebar_label: 测试与交付
tags: [ai-coding, frontend, testing, playwright]
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
slug: /roles/frontend/testing-and-delivery
---

# 前端 AI 工作台：测试与交付

前端 AI 的交付闭环，不是“代码写完了”，而是“可以验证、可以回归、可以交给别人接着用”。

## 学习目标

学完这一页后，你应该能：

- 把 `Playwright`、组件测试和交付清单接到默认流程里
- 为前端改动准备最少可接受的验证证据
- 让 PR 交付物不只是代码 diff

## 建议先修

建议先看：

- [前端 AI 培训营：总览](/docs/roles/frontend)
- [质量门禁](/docs/roles/frontend/quality-gates)

## 训练任务

至少完成 1 个最小练习：

1. 为一个关键页面写一条 Playwright 冒烟路径
2. 为一个组件补一条单测或组件级验证
3. 按这一页的清单整理一份真实前端 PR 交付说明

## Playwright

`Playwright` 最适合在前端 AI 链路里承担这些任务：

- 冒烟测试
- 关键路径验证
- 视觉回归
- bug 重放

AI 很适合帮你：

- 生成首版 E2E 脚本
- 补关键断言
- 用最小脚本复现用户路径

人工仍然要做的判断：

- 哪些路径必须长期维护
- 哪些页面只做 smoke，哪些需要深入回归
- 截图基线和 flaky case 怎么处理

## Vitest、Testing Library 与组件层验证

并不是所有前端问题都该扔给端到端测试。

更稳的组合通常是：

- 页面关键路径：`Playwright`
- 组件逻辑与交互：`Vitest / Testing Library`
- 共享 UI 变体验证：组件级测试或预览

AI 在这一层更适合写：

- 简洁的行为测试
- 表单交互与边界条件测试
- 针对 bug 的最小回归用例

## Storybook 或组件预览

如果你的团队维护共享组件，预览层会让 AI 协作更稳：

- 组件状态更容易被枚举
- 视觉回归更容易有基线
- 变体和 token 更容易统一

它不一定非得是 `Storybook`，关键是你有一个可重复查看组件状态的地方。

## 交付前清单

至少要把这些变成默认动作：

```bash
# 按项目实际脚本替换
npm run lint
npm run type-check
npm run build
npx playwright test
```

如果是 workspace / monorepo 项目：

```bash
pnpm lint
pnpm typecheck
turbo run build test
```

## PR 应该带什么

更成熟的前端 AI 交付，不只交代码，还应该交：

- 变更说明
- 影响范围
- 验证结果
- 是否涉及 token、组件或路由
- 是否有设计差异、已知风险或待补测试

## 训练验收

完成这一页训练后，至少要拿出这些结果：

- 一条关键路径测试
- 一份 PR 验收清单
- 一份带验证结果的交付说明

相关入口：

- [`Issue -> Draft PR` runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)
- [Claude Code bugfix 案例](/docs/case-studies/claude-code-bugfix-loop)

## 这页后面接什么

- 要继续看 lint、类型和发布前门禁：去 [质量门禁](/docs/roles/frontend/quality-gates)
- 要继续看 repo 规则和 skills：去 [上下文与规则](/docs/roles/frontend/context-and-rules)
- 要继续看工具入口：去 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)
