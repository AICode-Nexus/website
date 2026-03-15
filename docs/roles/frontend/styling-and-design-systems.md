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

## 样式治理板

![样式治理板](/img/roles/frontend/styling-governance-board.svg)

这张图的重点是把“品牌感觉”从空泛描述落回可以被实现和 review 的层次。没有 Brand 层，你很难知道该避免哪些视觉套路；没有 Token 层，样式就会重新散回组件；没有 Screen / Review 层，最终页面又会重新靠人工感觉把关。

## 视觉输入包最小集合

当你希望图片和视频权重提高时，样式页最需要补的不是更多形容词，而是更完整的视觉输入包：

| 输入 | 最好长什么样 | 为什么重要 |
| --- | --- | --- |
| 品牌关键词板 | 3 到 5 个关键词 + 2 到 3 张参考图 + 明确禁用项 | 让 AI 知道什么是“像我们”，什么是“模板味” |
| token 对照表 | 基础色、语义色、字号、间距、圆角、阴影 | 把视觉语言变成可引用资产 |
| 状态对照图 | hover / focus / disabled / selected / error | 避免交互态靠猜 |
| 页面节奏对照图 | Hero、内容区、CTA、Footer 的留白层次与背景切换 | 让页面层的视觉节奏不被统一模板吞掉 |

如果这四类输入都清楚，AI 生成的样式会明显更接近“系统扩展”；如果它们缺席，再强的模型也只能回落到行业平均模板。

## Token 命名与分层建议

| 层级 | 命名方式 | 例子 | 作用 |
| --- | --- | --- | --- |
| 基础值 | `color.blue.950`、`space.6` | 原始设计值 | 供系统内部引用，不直接在页面里消费 |
| 语义值 | `surface.hero.background`、`text.muted` | 指向基础值 | 面向组件和页面消费 |
| 组件值 | `button.primary.bg`、`card.feature.shadow` | 组件变体的组合结果 | 便于集中维护交互态和品牌化差异 |
| 页面值 | `pricing.hero.overlay` | 只服务单页或单专题 | 避免为了一次性视觉强行污染全局 token |

最常见的问题是团队一上来就只建基础色表，没有语义层。这样一来，AI 只能在组件里直接引用颜色值或基础 token，最终还是会让视觉语言退回到“可以跑，但不可治理”的状态。

## 样式评审时必须追问的问题

1. 这个页面是不是在复用已有品牌语言，还是又回到了默认蓝白 SaaS 模板。
2. 新增样式有没有绕过语义 token，直接在组件或页面里写死颜色和间距。
3. 组件变体是不是还收敛在同一个定义处，还是被散落到多个页面局部 className 中。
4. 关键断点截图里，背景层次、区块节奏和文字层级是否仍然成立。
5. 视频或录屏里，hover/focus/selected 等动态态有没有违背设计系统原有语气。

把这些问题写成评审模板之后，样式审查就不再是“我觉得不太像”，而是可以被新人复用、被 AI 任务包复述的结构化标准。

## 训练任务与媒体清单

| 训练任务 | 重点 | 至少需要提交的媒体 |
| --- | --- | --- |
| 任务 1：把一个现有页面改成语义 token 驱动 | 学会从色值和 utility 迁移到 token | before/after 截图、token 映射表 |
| 任务 2：为按钮和卡片补完整变体 | 学会把状态与视觉差异集中定义 | 组件状态对照图、状态录屏 |
| 任务 3：做一个“去模板化”页面改造 | 学会用品牌板和禁用项约束 AI | 参考图板、断点截图、设计说明 |

如果你要把这一页用作培训材料，建议每次作业都要求交一张视觉对照图。图上至少包含“参考输入”“实现输出”“差异说明”三栏。这样图片就不是装饰，而是 review 的核心证据。

## 视频学习路径

| 想练什么 | 先看什么 |
| --- | --- |
| 理解设计系统如何约束页面实现 | [实战演示视频列表](/docs/resources/videos?format=实战演示&section=results) |
| 对照更多前端视觉案例 | [全部视频](/docs/resources/videos) |
| 把样式约束接回代码审查 | [质量门禁](/docs/roles/frontend/quality-gates) |

## 视觉回归清单

当样式页写到足够详细时，最好把“看什么”也一起写出来，而不是只写“做什么”：

| 检查项 | 应该怎么观察 |
| --- | --- |
| 背景层次 | 比较 Hero、内容区、CTA 和 Footer 的层次变化，确认不是整页同一种底色 |
| 排版节奏 | 截图中标题、正文、辅助文字是否落在同一套层级，而不是每个区块自定义一套字号 |
| 组件状态 | 对照录屏或状态图，看 hover、focus、selected、disabled 是否延续同一语气 |
| 品牌一致性 | 对比参考图板，确认没有回落到默认紫色、蓝白卡片或过度圆润模板样式 |

这张清单特别适合带训时做“图表讲解 + 对照评审”。它会逼着评审者说出具体差异，而不是只说“感觉有点不像”。

## 视觉评审会议建议

样式相关评审最好不要只看 diff。更有效的做法是同时打开设计板、实现截图和录屏，用 10 分钟对齐“哪里一致、哪里故意不一致、哪里是技术折中”。这能显著减少前端和设计在评论区来回打补丁。

## 配套图片与视频

- 本页已经补上样式系统层级图，适合给设计师和前端共同对齐。
- 想看样式实战演示：去 [实战演示](/docs/resources/hands-on-demos) 搜 `tailwind`、`design system`。
- 想继续把视觉约束接入代码审核：去 [质量门禁](/docs/roles/frontend/quality-gates)。
- 想看整个站点对质量和规范的要求：去 [AI 开发规范](/docs/ai-development-standards) 与 [Review Quality Gates](/docs/standards/review-quality-gates)。
