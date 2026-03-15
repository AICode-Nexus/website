---
title: 样式与设计系统
description: 用 token、CSS variables、Tailwind 和组件变体约束，把 AI 生成的界面从模板感拉回到品牌化系统。
sidebar_label: 样式与设计系统
tags: [ai-coding, frontend, tailwind, design-system]
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
slug: /roles/frontend/styling-and-design-systems
---

# 样式与设计系统

AI 生成的界面之所以容易“像模板”，通常不是因为模型不会写样式，而是因为团队没有给它明确的视觉边界。没有 token、没有主题变量、没有组件变体规则，模型就会回落到最常见的 SaaS 模板语言。

## 设计系统层级图

![样式系统层级图](/img/roles/frontend/styling-system-layers.svg)

## 样式系统的四层职责

| 层级 | 负责什么 | 典型制品 |
| --- | --- | --- |
| Brand Layer | 品牌语气、配色方向、排版风格 | 品牌板、视觉关键字、禁用风格 |
| Token Layer | 颜色、字号、间距、圆角、阴影的语义映射 | `tokens.json`、CSS variables |
| Component Layer | 按钮、卡片、表单、导航等变体规则 | 组件变体表、状态规范 |
| Screen Layer | 页面布局、图文节奏、插图与背景氛围 | 页面样式骨架、视觉验收截图 |

## Tailwind、CSS Modules、UnoCSS 怎么选

| 方案 | 什么时候更合适 | AI 协作优点 | 风险 |
| --- | --- | --- | --- |
| Tailwind CSS | 页面迭代快、需要统一 utility 习惯 | 改动粒度细、状态类清楚 | 容易堆成类名墙，视觉语言趋同 |
| CSS Modules | 组件边界明确、团队偏语义化 class | 局部样式更容易追踪 | 全局 token 需要额外治理 |
| UnoCSS | 需要更灵活规则生成 | utility 与原子化能力强 | 规则学习成本更高 |

对 AI 来说，最重要的不是“用哪一个”，而是是否能清楚回答这三个问题：

- 颜色和间距从哪里来？
- 组件变体在什么地方定义？
- 页面能否在不猜测品牌风格的情况下安全扩展？

## 代码案例：先把主题变量固定下来

```css
:root {
  --surface-page: #f5efe6;
  --surface-card: #fffdf9;
  --surface-strong: #1b365d;
  --text-primary: #17212b;
  --text-inverse: #fffaf2;
  --accent-primary: #d96c3f;
  --accent-secondary: #4a7c59;
  --radius-card: 24px;
  --space-section-y: clamp(4rem, 8vw, 7rem);
  --shadow-card: 0 24px 64px rgba(23, 33, 43, 0.12);
}
```

```ts
export const buttonVariants = {
  primary: 'bg-[var(--accent-primary)] text-[var(--text-inverse)] hover:opacity-90',
  secondary: 'bg-[var(--surface-strong)] text-[var(--text-inverse)] hover:bg-slate-800',
  ghost: 'border border-slate-300 bg-transparent text-[var(--text-primary)]',
} as const;
```

这类写法能把“品牌语言”变成真实代码资产，而不是提示词里的抽象描述。

## 代码案例：给 AI 明确反模板化约束

```yaml
visual_rules:
  avoid:
    - "默认紫色或蓝灰 SaaS 配色"
    - "统一 8px 圆角 + 柔和阴影的模板化卡片"
    - "整页都使用同一种背景层次"
  enforce:
    - "所有颜色必须引用语义 token 或 CSS variables"
    - "标题、正文、辅助文字必须落在既定排版层级里"
    - "按钮和表单只允许使用现有组件变体"
```

## 如何避免“默认 AI 味”

### 先写禁用项，而不是只写期望项

“像 Apple 一样简洁”这种话对模型帮助不大。更有效的写法是同时写：

- 哪些颜色不能出现。
- 哪些视觉套路不能复用。
- 哪些组件变体必须沿用已有设计系统。

### 页面层要有自己的视觉节奏

即便采用 Tailwind，也不应该让每个页面都复制同一套 `max-w-7xl rounded-3xl shadow-lg` 模板。页面层至少要有：

- 自己的区块节奏。
- 明确的背景与留白层次。
- 不同模块之间的视觉转场方式。

## 样式系统交付检查表

- token 是否区分了基础值和语义值。
- 组件变体是否集中定义，而不是分散在页面 JSX 里。
- 页面是否能在不增加新色值的情况下完成扩展。
- 设计稿上的 hover、focus、disabled 是否有对应实现。
- AI 生成的新样式是否复用了现有变量、间距尺度和圆角体系。

## 配套图片与视频

- 本页已经补上样式系统层级图，适合给设计师和前端共同对齐。
- 想看样式实战演示：去 [实战演示](/docs/resources/hands-on-demos) 搜 `tailwind`、`design system`。
- 想继续把视觉约束接入代码审核：去 [质量门禁](/docs/roles/frontend/quality-gates)。
- 想看整个站点对质量和规范的要求：去 [AI 开发规范](/docs/ai-development-standards) 与 [Review Quality Gates](/docs/standards/review-quality-gates)。
