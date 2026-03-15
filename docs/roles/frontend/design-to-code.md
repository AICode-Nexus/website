---
title: 设计到代码
description: 用结构化设计输入、token 合同和阶段化实现路径，让 AI 更稳定地产出前端首版页面与组件。
sidebar_label: 设计到代码
tags: [ai-coding, frontend, design-to-code]
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
slug: /roles/frontend/design-to-code
---

# 设计到代码

前端的第一版质量，往往不是由模型能力决定，而是由输入质量决定。Figma 链接、token、交互约束、截图和文字说明如果没有排好优先级，AI 生成的页面就会在层级、间距、状态和组件边界上同时失真。

## 结构化输入优先级

![设计到代码流程图](/img/roles/frontend/design-to-code-flow.svg)

更稳的顺序是：

1. 先给结构化设计上下文，例如 Figma Dev Mode 节点、尺寸、层级和命名。
2. 再给 token 或语义变量，让颜色、字号、间距和圆角不是临时猜测。
3. 补文字化交互约束，例如断点、空态、加载态、错误态和 hover/focus。
4. 最后才用截图补视觉细节，而不是让截图承担全部语义。

## 四类输入源怎么配合

| 输入源 | 负责回答什么 | 适合什么时候用 | 单独使用会出什么问题 |
| --- | --- | --- | --- |
| Figma Dev Mode / 节点上下文 | 区块层级、尺寸、结构关系 | 首次拆页面骨架 | 不含业务语义和状态说明 |
| 设计 token | 色彩、字号、间距、阴影、圆角 | 需要长期维护的页面或组件 | 没有布局和行为上下文 |
| 文字规格 | 交互、边界态、内容优先级 | 表单、筛选器、复杂列表 | 容易漏掉视觉层级 |
| 截图 | 视觉氛围和细节参考 | 原型、视觉精修、补充状态 | 会诱导 AI 靠猜测拼页面 |

一个常见误区是“给整屏截图 + 让 AI 直接出最终代码”。这条路径在 demo 上看起来快，在业务项目里返工最大，因为它直接跳过了 `结构拆分 -> token 映射 -> 状态补齐`。

## 默认工作流：先骨架，再抽象

### 第一步：拆页面结构，不急着写共享组件

先把页面拆成 `layout -> section -> block -> atomic UI` 四层，明确哪些是页面专有结构，哪些才值得抽进共享层。

### 第二步：做 token 映射，不在组件里硬写视觉值

如果首页 hero、导航卡片、价格卡和 CTA 都直接写死在组件里，AI 后续一改主题就会把整个页面改成一团 diff。

### 第三步：补状态与约束

至少明确：

- `hover / focus / active / disabled`
- `loading / empty / error / success`
- `mobile / tablet / desktop`
- `数据长文案、无图、超长按钮文案` 等边界场景

## 代码案例：先写 token 合同，再写页面骨架

下面的例子展示一种更适合 AI 协作的做法：先把 token 合同和内容结构写清，再进入页面组件。

```json
{
  "page": "pricing",
  "tokens": {
    "surface.hero.background": "{color.blue.950}",
    "surface.card.background": "{color.neutral.0}",
    "text.heading.primary": "{color.neutral.0}",
    "space.section.y": "clamp(64px, 8vw, 120px)",
    "radius.card": "24px"
  },
  "layout": {
    "sections": ["hero", "social-proof", "plans", "faq"],
    "maxWidth": "1200px",
    "breakpoints": ["360", "768", "1280"]
  }
}
```

```tsx
type PricingSection = 'hero' | 'social-proof' | 'plans' | 'faq';

const sectionOrder: PricingSection[] = ['hero', 'social-proof', 'plans', 'faq'];

export function PricingPage() {
  return (
    <main>
      {sectionOrder.map((section) => (
        <PricingSectionRenderer key={section} section={section} />
      ))}
    </main>
  );
}
```

这类首版代码的重点不是“立刻优雅”，而是让页面区块、内容结构和 token 引用都能被后续步骤稳定继承。

## 代码案例：给 AI 的页面实现任务包

```yaml
task:
  objective: "根据 pricing 页面设计稿生成首版页面骨架"
  do_first:
    - "输出区块拆分表"
    - "说明哪些组件属于页面私有，哪些可抽共享"
    - "列出必须 token 化的视觉值"
  do_not:
    - "不要直接生成最终动效"
    - "不要先抽象 shared/ui，除非当前页面至少复用两次"
    - "不要在 JSX 中硬编码颜色和间距"
  verification:
    - "移动端 360px 和桌面端 1280px 均可用"
    - "键盘可以遍历交互元素"
    - "页面状态包含 loading / empty / error"
```

## 什么时候截图仍然有价值

截图不是无用，而是应该放到更准确的位置：

- 用于讨论视觉方向，而不是替代结构化输入。
- 用于补 hover、光影、插画比例、局部纹理等视觉细节。
- 用于对比“AI 输出”和“设计目标”的差异，而不是当唯一真相。

如果任务是一次性活动页或低保真原型，截图可以更靠前；如果是业务页面、设计系统或组件库，则必须让结构化输入排在前面。

## 最常见的 5 个失控点

| 失控点 | 表现 | 修正动作 |
| --- | --- | --- |
| 只有截图，没有结构说明 | 页面看起来像，但组件边界错 | 先补区块拆分表 |
| token 缺席 | 颜色和间距散落在组件里 | 先补语义 token |
| 一次性生成整页最终代码 | 页面可运行，但难以重构 | 改成“骨架 -> 组件 -> 状态” |
| 把页面专有组件提前共享化 | shared/ui 被污染 | 先保持页面私有 |
| 没写边界态 | 评审时才发现空态和响应式缺失 | 在任务包里显式写入验收条件 |

## 配套图片与视频

- 图表已在本页补齐，可直接用来向设计师或新成员解释输入顺序。
- 想看公开视频演示：去 [实战演示](/docs/resources/hands-on-demos) 搜 `figma`、`frontend`、`design-to-code`。
- 想按最近素材筛前端视频：去 [全部视频](/docs/resources/videos)。
- 想把设计协作视角补完整：再读 [设计师岗位页](/docs/roles/design)。
- 想继续进入具体技术栈实现：下一页看 [框架与组件生态](/docs/roles/frontend/frameworks-and-components)。
