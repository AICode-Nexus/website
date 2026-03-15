---
title: 质量门禁
description: 把 TypeScript、ESLint、Oxlint、构建验证和 review 证据串成前端 AI 的默认质量护栏。
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

# 质量门禁

让 AI 参与前端开发，不是让它“先写出来再说”，而是让它在受控边界里写、在明确命令里验证、在有证据的 review 里交付。真正的质量门禁不是一个 lint 命令，而是一条分层责任链。

## 三层门禁图

![前端质量门禁图](/img/roles/frontend/quality-gates-ladder.svg)

## 写码时、评审时、发布前分别看什么

| 阶段 | 核心问题 | 典型工具 |
| --- | --- | --- |
| 写码时 | 代码结构和类型是否在边界内 | `TypeScript`、`ESLint`、`Oxlint`、格式化层 |
| 评审时 | 抽象是否合理，改动是否扩散 | PR review、架构检查、规则文件 |
| 发布前 | 构建、回归、关键路径是否可复现 | `build`、组件测试、Playwright、截图比对 |

## TypeScript、ESLint、Oxlint 如何分工

| 工具 | 主要职责 | 前端常见收益 |
| --- | --- | --- |
| TypeScript | 收紧 props、事件、数据模型和边界 | 减少组件重构时的隐性破坏 |
| ESLint | 表达长期工程规则 | 组件职责、导入约束、hooks/composables 规范 |
| Oxlint | 提供更快的静态检查反馈 | 批量扫描可疑模式、降低反馈等待时间 |
| 格式化层 | 压平无价值样式争议 | 减少 review 把时间花在排版上 |

如果只能保留一件事，那就先让 AI 不能随意引入 `any`、硬编码路径和未受控的共享抽象。

## 代码案例：前端项目的最小门禁脚本

```json
{
  "scripts": {
    "lint": "eslint . --max-warnings=0",
    "lint:fast": "oxlint .",
    "typecheck": "tsc --noEmit",
    "test:unit": "vitest run",
    "test:e2e": "playwright test",
    "verify:frontend": "npm run lint && npm run lint:fast && npm run typecheck && npm run test:unit && npm run build"
  }
}
```

```js
export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'no-restricted-imports': ['error', {patterns: ['../*../*']}],
      'react/jsx-no-useless-fragment': 'error',
    },
  },
];
```

## 代码案例：PR 必须带上的验证说明

```md
## Verification

- `npm run lint`
- `npm run typecheck`
- `npm run test:unit`
- `npm run build`
- `npx playwright test tests/pricing-smoke.spec.ts`

## Risk

- 仅覆盖了 pricing 页面关键路径，尚未覆盖支付接入后的真实回调。
- 已人工验证 360px / 768px / 1280px 三个断点。
```

## Review 时最该盯的不是格式，而是这 5 件事

- 组件边界有没有变差，页面私有逻辑是不是被过早抽到共享层。
- 内容配置、路由常量、卡片元数据是否散落在多个组件文件里。
- 样式是否绕过 token、CSS variables 和设计系统变体直接硬写。
- 数据获取和本地状态是否混在一起，导致后续调试困难。
- 验证结果是否真实覆盖了这次改动的关键路径。

## 发布前至少要有这些证据

| 改动类型 | 最少证据 |
| --- | --- |
| 纯展示层改动 | lint、typecheck、build、关键断点截图 |
| 组件行为改动 | 上述全部 + 单测或组件测试 |
| 页面交互/流程改动 | 上述全部 + Playwright 冒烟路径 |
| 共享 UI 或 token 改动 | 上述全部 + 影响面说明 + 回归范围 |

## 配套图片与视频

- 本页顶部已经补齐质量门禁图，适合直接嵌入培训材料。
- 想看 bugfix 到验证的操作录像：去 [实战演示](/docs/resources/hands-on-demos) 搜 `review`、`test`、`playwright`。
- 想把门禁接回工作流：去 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 想对齐站点级质量标准：去 [Review Quality Gates](/docs/standards/review-quality-gates)。
- 想继续补交付收口：下一页看 [测试与交付](/docs/roles/frontend/testing-and-delivery)。
