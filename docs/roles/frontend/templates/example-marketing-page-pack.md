---
title: 示例：营销页交付训练包
description: 一份已填写的前端训练包示例，演示页面输入、brief、证据、handoff 和风险说明如何串联。
slug: /roles/frontend/templates/example-marketing-page-pack
sidebar_label: 示例：营销页交付
tags: [ai-coding, frontend, templates, examples]
track: cross-track
kind: guide
content_form: guide
audience: frontend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# 示例：营销页交付训练包

这个示例把 [页面输入包模板](/docs/roles/frontend/templates/page-input-pack)、[任务 Brief 模板](/docs/roles/frontend/templates/task-brief)、[命令与证据模板](/docs/roles/frontend/templates/commands-and-evidence)、[PR / Handoff 模板](/docs/roles/frontend/templates/pr-handoff) 和 [Risks / Next 模板](/docs/roles/frontend/templates/risks-and-next) 串成一条完整交付链。

## 场景

- 目标：交付 `/pricing` 新 hero、功能模块和 FAQ。
- 技术栈：Next.js 15 + React 19 + Tailwind。

## 1. 页面输入包摘要

```md
## 设计输入
- figma node: 120:480
- tokens: packages/tokens/pricing.json
- breakpoints: 360 / 768 / 1280

## 状态清单
- hero CTA hover
- FAQ open / close
- pricing card featured state
```

## 2. 任务 Brief 摘要

```md
## 允许改动
- src/routes/pricing/*
- src/data/pricing.ts
- tests/e2e/pricing.spec.ts

## 验收
- 键盘可达
- 移动端不溢出
- Playwright smoke 通过
```

## 3. 命令与证据摘要

```md
## 命令
- pnpm lint
- pnpm test
- pnpm playwright test tests/e2e/pricing.spec.ts

## 证据
- artifacts/pricing-mobile.png
- artifacts/pricing-desktop.png
- artifacts/pricing-flow.mp4
```

## 4. PR / Handoff 与 Risks 摘要

```md
## Handoff
- 主要改动：hero、card、FAQ
- reviewer 重点：移动端折行、CTA 焦点状态

## Risks
- FAQ 数据仍写在页面文件，后续应迁到 src/data
- hero 录屏未覆盖 slow network
```

## 配套 workflow 与案例

- 先看 [设计到代码](/docs/roles/frontend/design-to-code) 和 [测试与交付](/docs/roles/frontend/testing-and-delivery)。
- 配套 workflow： [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 配套案例： [OpenAI Codex 重构与验证案例](/docs/case-studies/codex-refactor-with-verification)。
