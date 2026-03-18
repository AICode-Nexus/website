---
title: 示例：结算链路回归训练包
description: 一份已填写的 QA 训练包示例，演示测试计划、缺陷复现、证据和 handoff 如何收口。
slug: /roles/qa/templates/example-checkout-regression-pack
sidebar_label: 示例：结算链路回归
tags: [ai-coding, qa, templates, examples]
track: cross-track
kind: guide
content_form: guide
audience: qa-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# 示例：结算链路回归训练包

这个示例把 [测试计划 Brief 模板](/docs/roles/qa/templates/test-plan-brief)、[缺陷复现与回归模板](/docs/roles/qa/templates/bug-repro-and-regression)、[命令与证据模板](/docs/roles/qa/templates/commands-and-evidence) 和 [QA Handoff 模板](/docs/roles/qa/templates/handoff-template) 串成一个真实回归包。

## 场景

- 目标：验证优惠券改造后，`checkout -> pay -> success` 主路径和失败路径都没有回归。
- 风险点：多币种、移动端 Safari、支付超时重试。

## 1. 测试计划摘要

```md
## 范围
- Web 结算页
- Stripe 支付成功 / 失败回调
- 优惠券可叠加与不可叠加场景

## 高优先级场景
- 首次支付成功
- 支付失败后重试成功
- 优惠券失效提示
```

## 2. 缺陷复现摘要

```md
## bug
- 场景：Safari 移动端支付失败后返回结算页，按钮仍显示 loading
- 复现步骤：
  1. 打开 /checkout
  2. 使用 3DS 卡片制造失败
  3. 返回页面

## 预期 / 实际
- 预期：按钮恢复可点击，错误提示出现
- 实际：按钮卡住 20s
```

## 3. 命令与证据摘要

```md
## 命令
- pnpm test --filter checkout
- pnpm playwright test tests/e2e/checkout.spec.ts

## 证据
- `artifacts/checkout-fail-retry.mp4`
- `artifacts/checkout-safari-bug.png`
- `artifacts/checkout-network-har.zip`
```

## 4. QA Handoff 摘要

```md
## 当前状态
- 桌面端通过
- Safari 移动端修复待回归

## 待继续事项
- 开发修复后补跑移动端 Safari 用例
- 发布前再次确认多币种价格展示
```

## 配套 workflow 与案例

- 先走 [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 如果需要终端和浏览器联合定位，接 [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。
- 想看缺陷到验证闭环的成品：去 [Claude Code Bugfix Loop](/docs/case-studies/claude-code-bugfix-loop)。
