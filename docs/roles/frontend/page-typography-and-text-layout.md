---
title: 前端页面字体与文字排版
description: 把标题、正文、按钮文案与 `pre/code` 片段拆成可执行的排版合同，让 AI 生成的页面先可读，再可改。
slug: /roles/frontend/page-typography-and-text-layout
sidebar_label: 页面字体与排版
tags: [ai-coding, frontend, typography, css]
track: cross-track
kind: guide
content_form: guide
audience: frontend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-05-28
source_window_end: 2026-05-28
market_status: current
---

# 前端页面字体与文字排版

这页解决的不是“字体好不好看”这种模糊审美争论，而是一个更工程化的问题：AI 很容易把页面先写出来，但如果标题、正文、按钮文案和 `pre/code` 片段没有被拆成不同排版合同，页面通常会在第二轮文案变长、移动端收缩、缩放 200% 或中英混排时立刻失去可读性。

## 结论先行

- 字体与排版不是上线前最后抹平的视觉细节，而是正文、界面文案、预格式化文本三套不同的工程约束。
- 只定字体族不够，还要同时定字号层级、行高、段间距、正文宽度、对齐策略和 `pre/code` 规则。
- 对中文或中英混排页面，默认值应先守住可读性，再做品牌化微调；否则 AI 会很快退回“能跑但难读”的平均模板。

## 事实与推断

- 事实：[`AICode-Nexus/website` 的 issue #7 `pretext 文字排版`](https://github.com/AICode-Nexus/website/issues/7) 于 `2026-03-30 15:12:06 UTC` 创建，正文是“前端页面字体pretext 文字排版”。
- 事实：截至 `2026-05-28` 的当前全量 issue 复核，issue #1 到 #6 都已经有明确中文内容页或中文回帖，issue #7 是唯一仍未被内容化处理的候选。
- 推断：这条 issue 想问的不是单个 CSS 属性，而是“前端页面里的文字如何稳定可读”，而且原文里的 `pretext` 很可能同时指向普通正文排版，以及 `pre` / `code` 这类预格式化文本的处理边界。
- 推断：现有的 [`样式与设计系统`](/docs/roles/frontend/styling-and-design-systems) 已经覆盖 token 和视觉系统，但还没有把“页面文字层级 + 正文宽度 + `pre/code` 片段”收成独立入口，所以更适合直接补一篇前端方案页，而不是只写日报。

## 先把文字拆成三层

| 层 | 典型对象 | 首要目标 | 最常见失控点 |
| --- | --- | --- | --- |
| 界面文案层 | 按钮、导航、标签、表单说明 | 清楚、短、状态稳定 | 把标题级字号直接拿来做按钮，导致密度失衡 |
| 正文内容层 | 文章、说明区、FAQ、卡片摘要 | 连续阅读可追踪 | 行太长、行高太紧、段间距太弱、中英混排跳动 |
| 预格式化层 | `pre`、`code`、命令、日志、配置片段 | 保真、可复制、可滚动 | 用 `pre` 承载长正文，或让代码块和正文共用同一排版尺度 |

如果这三层没有先拆开，AI 就会在一个组件里混写标题、解释、按钮和命令片段，最后只能靠人工一点点调 `font-size` 与 `margin-top`。

## 最小排版合同

W3C 对可读性给了两个很实用的底线：

- 事实：WCAG 2.2 对 `Text Spacing` 的说明要求内容在用户把行高提高到 `1.5`、段后间距提高到 `2`、字距提高到 `0.12em`、词距提高到 `0.16em` 时，仍然不能丢内容或失去功能。
- 事实：WCAG 对 `Visual Presentation` 的说明建议大段文本要支持较窄的阅读宽度，正文不要做两端对齐，并且在放大后不应为了读一行文字而横向滚动；对 CJK 文本，还特别给出了更短的推荐宽度上限。

把这些规则翻成前端默认合同，通常至少要固定下面几项：

| 项目 | 正文默认建议 | 为什么先固定它 |
| --- | --- | --- |
| 正文字号 | `16px` 左右起步，再按平台微调 | 小于这个值时，中文正文和混排说明在桌面与移动端都容易吃力 |
| 正文行高 | `1.6` 到 `1.8` | 这比只盯字号更直接决定连续阅读体验 |
| 正文宽度 | 先按 36 到 42 个中文字符左右做实测 | 行太长时，用户会更容易丢行；这条是基于 W3C 可读性建议的工程推断 |
| 段间距 | 至少和正文行高同一层级，不要只靠换行 | 否则说明块、FAQ、卡片正文会黏成一片 |
| 对齐方式 | 正文默认左对齐或逻辑起点对齐 | 两端对齐会把中英混排与短句拉扯得很散 |
| `pre/code` | 单独使用等宽字体、单独行高、单独溢出策略 | 它的目标是保真和复制，不是模仿正文 |

## 用 token 把排版边界写死

如果你已经有设计系统，排版合同最好也进入 token 或共享配置，而不是散在页面 className 里：

```css
:root {
  --font-sans: "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", sans-serif;
  --font-mono: "SFMono-Regular", "JetBrains Mono", "Cascadia Code", monospace;
  --text-ui-size: 0.875rem;
  --text-body-size: 1rem;
  --text-body-line-height: 1.75;
  --text-body-max-width: 42rem;
  --text-heading-line-height: 1.2;
  --text-paragraph-gap: 1rem;
  --text-code-size: 0.875rem;
  --text-code-line-height: 1.6;
}

.articleBody {
  font-family: var(--font-sans);
  font-size: var(--text-body-size);
  line-height: var(--text-body-line-height);
  max-inline-size: min(100%, var(--text-body-max-width));
  text-align: start;
}

.articleBody p + p {
  margin-block-start: var(--text-paragraph-gap);
}

.articleBody pre {
  font-family: var(--font-mono);
  font-size: var(--text-code-size);
  line-height: var(--text-code-line-height);
  overflow-x: auto;
  white-space: pre;
}
```

如果你更习惯把约束显式写成配置对象，也可以先收成一份 `typographyContract`：

```ts
export const typographyContract = {
  ui: {
    fontFamily: 'sans',
    fontSize: '0.875rem',
    lineHeight: 1.4,
  },
  body: {
    fontFamily: 'sans',
    fontSize: '1rem',
    lineHeight: 1.75,
    maxWidth: '42rem',
    align: 'start',
  },
  code: {
    fontFamily: 'mono',
    fontSize: '0.875rem',
    lineHeight: 1.6,
    overflow: 'x-auto',
    wrap: 'preserve',
  },
};
```

这类配置的价值不只是“好看一点”，而是让 AI 在改文案、补模块或拆组件时，不会重新发明一套字号和间距。

## 如果 issue 里的 `pretext` 指的是 `pre/code`

这类问题最常见的误用，不是 `pre` 本身，而是把本来该进正文层的文字硬塞进 `pre`：

- 命令、日志、配置、代码片段适合放在 `pre/code`，因为它们需要保真、复制和对齐。
- 说明性长文、FAQ、卡片描述不应该为了“看起来整齐”放进 `pre`，否则正文宽度、行高和缩放规则都会失效。
- 对大多数 CLI、配置片段，默认优先保留单行与横向滚动；只有在移动端阅读优先、且复制精度要求没那么高时，才考虑软换行版本。

如果确实要给一部分片段提供“可读版软换行”，最好显式标记，不要把所有 `pre` 一刀切：

```css
pre[data-wrap='soft'] {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
```

这样做的目的，是把“保真版”和“阅读版”分开，而不是让同一个代码块同时承担两种互相冲突的目标。

## 为什么不要只抄一套现成字阶

- 事实：USWDS 明确把字体、字号、行高收进 token，并强调这些 token 是为了减少随意取值，让组件与页面共用同一套离散选项。
- 事实：Carbon 把排版分成 `productive` 和 `expressive` 两套类型集，前者更适合产品型界面，后者更适合编辑型或品牌型页面。
- 事实：Apple 的 Typography 指南强调默认与最小字号要先保证可读性，而且字重本身也会影响易读性。
- 推断：对大多数前端项目来说，最稳的做法不是照搬某个设计系统的全部字阶，而是先决定“任务型页面”和“内容型页面”是否共用同一套正文规则，再从已有系统里挑一套最小组合。

换句话说，你真正要定的不是“我们用哪种字体”，而是：

1. 产品界面文字和长正文是否共用同一套层级。
2. 中文正文和中英混排标题是否需要不同的宽度上限。
3. `pre/code` 是否有独立字体、字号和溢出策略。
4. AI 修改页面时，哪些值允许局部变化，哪些值只能引用共享 token。

## 交给 AI 的任务合同

如果你希望 AI 改页面时不要再次把排版打散，任务合同里至少要补下面这些约束：

```yaml
typography_rules:
  ui_text:
    use_shared_tokens: true
    font_size: "0.875rem"
    line_height: 1.4
  body_copy:
    font_size: "1rem"
    line_height: 1.75
    max_width: "42rem"
    text_align: "start"
  preformatted:
    font_family: "mono"
    font_size: "0.875rem"
    overflow_strategy: "horizontal-scroll"
    allow_soft_wrap_only_when_explicit: true
  acceptance:
    - "正文在 200% 缩放下仍可读，不需要为读一行字横向滚动"
    - "中英混排标题不超过 2 行，且不会因为字重变化而塌陷"
    - "`pre/code` 片段与正文使用不同排版层，不混成一套字号"
```

这份合同比“帮我把页面排版调舒服一点”更有效，因为它把 AI 真正需要守住的边界写成了可以验证的条件。

## 验证清单

- 把页面放大到 `200%` 后，正文区不应为了读一行字而横向滚动。
- 用浏览器临时覆盖更大的 `line-height`、`letter-spacing` 和段间距时，文案不应被裁切或遮挡。
- 分别检查纯中文、纯英文和中英混排标题，确认不会在窄屏下变成孤字、孤词或三层断裂。
- 单独检查 `pre/code`：是否仍可复制、是否需要横向滚动、是否和正文争抢同一排版层。
- 截图至少覆盖桌面正文、移动端正文、一个带长标题的区块，以及一个带 `pre/code` 的区块。

## 现在该怎么接回项目

- 先把正文容器和 `pre/code` 容器收成共享样式或共享组件，不要让每个页面自己决定宽度和行高。
- 把排版 token 放进设计系统或配置模块，而不是散落在页面 JSX 里临时改 class。
- 在 review checklist 里单列一项“正文可读性与 `pre/code` 处理”，避免它永远被归类成“上线前再看”的视觉细节。

## Sources

- [GitHub Issue #7: `pretext 文字排版`](https://github.com/AICode-Nexus/website/issues/7)
- [W3C: Understanding Success Criterion 1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing)
- [W3C: Understanding Success Criterion 1.4.8 Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation)
- [USWDS: Using type](https://designsystem.digital.gov/design-tokens/typesetting/overview/)
- [USWDS: Font tokens](https://designsystem.digital.gov/design-tokens/typesetting/font/)
- [Carbon Design System: Typography style strategies](https://carbondesignsystem.com/elements/typography/style-strategies)
- [Apple Human Interface Guidelines: Typography](https://developer.apple.com/design/Human-Interface-Guidelines/typography?changes=_3)

## Related docs

- [前端 AI 工作台](/docs/roles/frontend)
- [样式与设计系统](/docs/roles/frontend/styling-and-design-systems)
- [设计到代码](/docs/roles/frontend/design-to-code)
- [质量门禁](/docs/roles/frontend/quality-gates)
