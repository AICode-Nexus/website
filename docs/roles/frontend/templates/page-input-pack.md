---
title: 页面输入包模板
description: 复制一套最小页面输入包，避免前端设计任务只剩整屏截图和模糊描述。
slug: /roles/frontend/templates/page-input-pack
sidebar_label: 页面输入包
tags: [ai-coding, frontend, templates]
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

# 页面输入包模板

适用场景：页面首版、设计稿还原、组件抽取前的输入整理。

## 推荐目录

```text
page-input/
  figma-node.md
  tokens-map.md
  states-checklist.md
  shots/
    README.md
```

## `figma-node.md`

```md
# Figma Node

- Link:
- Page / Frame:
- Node name:
- Goal:

## Section Structure

1.
2.
3.

## Key Dimensions

- Container:
- Hero:
- Cards / Grid:

## Notes

- 哪些层是页面专有结构
- 哪些层可能后续提炼成共享组件
```

## `tokens-map.md`

```md
# Tokens Map

| UI Element | Design Value | Semantic Token | Notes |
| --- | --- | --- | --- |
| Hero background |  |  |  |
| Card radius |  |  |  |
| CTA gap |  |  |  |
| Heading color |  |  |  |
```

## `states-checklist.md`

```md
# States Checklist

## Breakpoints

- [ ] 360
- [ ] 768
- [ ] 1280

## Interaction States

- [ ] hover
- [ ] focus
- [ ] active
- [ ] disabled

## Data / Edge States

- [ ] loading
- [ ] empty
- [ ] error
- [ ] success
- [ ] long copy
```

## `shots/README.md`

```md
# Shots

- `360-home.png`
- `768-home.png`
- `1280-home.png`
- `component-closeup.png`
- `state-diff.png`

每张图至少标注：
- 当前断点
- 当前状态
- 对应模块
```

## 使用提醒

- 配套说明页： [设计到代码](/docs/roles/frontend/design-to-code)
- 想补品牌板和视觉对照：去 [样式与设计系统](/docs/roles/frontend/styling-and-design-systems)
