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
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
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

## 设计到代码交付物板

![设计到代码交付物板](/img/roles/frontend/design-to-code-deliverables.svg)

这张图把一次前端设计转实现拆成四类制品：输入包、骨架稿、状态稿和验证包。真正让团队返工的，通常不是 JSX 写得不够快，而是少了其中一个制品，导致所有问题都拖到 review 或联调阶段才暴露。

## 页面拆分与媒体采集清单

如果你希望图片、视频、图表在这类文档中占比更高，最实用的做法不是“多贴几张大图”，而是给每个页面任务固定一套媒体采集清单，让图像和视频直接服务于实现决策：

![前端设计输入资产板](/img/roles/frontend/frontend-design-input-packet-board.svg)

| 媒体制品 | 在什么阶段采集 | 解决什么问题 | 交给 AI 时怎么描述 |
| --- | --- | --- | --- |
| 设计节点截图 | 拆骨架之前 | 让模型看清区块结构和层级 | “只用于理解布局，不作为唯一真相” |
| 关键组件局部放大图 | 抽组件时 | 让按钮、卡片、表单和表头不靠猜 | “对应到现有组件基座中的哪个变体” |
| 响应式断点截图 | 补状态时 | 防止 AI 只照顾桌面版 | “至少覆盖 360 / 768 / 1280” |
| 交互录屏或视频 | 精修与验收时 | 解释抽屉、切换、滚动和悬浮态 | “指出触发条件、起始态、结束态和回退态” |

一旦你把媒体制品变成显式清单，图片和视频就不再是“可有可无的参考”，而会成为设计到代码过程中的正式输入。对团队培训来说，这也意味着你可以把每一次录屏和截图都沉淀成下次任务的对照样本。

如果你要把这套输入包直接落到仓库里，更推荐下面这种最小文件组合：

| 文件 | 作用 | 最少要写什么 |
| --- | --- | --- |
| `figma-node.md` | 记录设计节点和页面层级 | 链接、区块命名、关键尺寸 |
| `tokens-map.md` | 记录视觉值怎么映射到语义 token | 颜色、间距、圆角、阴影、变体 |
| `states-checklist.md` | 记录边界态和回退态 | hover / focus / loading / empty / error |
| `shots/` | 存关键截图和局部对照图 | `360`、`768`、`1280` 与高风险组件局部图 |

想直接复制这套文件骨架：去 [页面输入包模板](/docs/roles/frontend/templates/page-input-pack)。

## 更适合前端团队的默认实现顺序

设计到代码最怕的不是慢，而是顺序错。下面这条顺序更适合真实业务项目：

1. 先输出区块拆分表和页面私有/共享组件判断，不急着开始抽象。
2. 再输出 token 映射表，把色彩、字号、圆角、阴影和区块间距都指向语义变量。
3. 然后实现静态骨架，让信息架构、顺序和断点先稳定。
4. 最后补 hover、focus、empty、error、loading 和长文案等边界状态。

如果顺序反过来，比如一上来就抽共享组件或追求最终动效，你会得到一套“看起来很像设计稿，但改一次就全线抖动”的代码。

## 训练任务与验收方式

| 训练任务 | 推荐时长 | 必交产物 | 验收标准 |
| --- | --- | --- | --- |
| 任务 1：单页面骨架还原 | 0.5 天 | 区块拆分表、首版页面骨架、3 个断点截图 | 结构正确，未引入无必要共享组件 |
| 任务 2：补组件状态 | 0.5 天 | 状态矩阵、关键状态截图或录屏 | hover/focus/loading/empty 至少完整覆盖核心模块 |
| 任务 3：从页面提炼复用组件 | 1 天 | 页面私有组件与共享组件边界说明、提炼后的 diff | 共享层没有被页面文案或业务逻辑污染 |

如果是带训或自学，建议强制每个任务都提交媒体证据。比如任务 1 要求交三张断点截图，任务 2 要求交一段 15 到 30 秒录屏，任务 3 要求交一张“提炼前后结构对照图”。这样学员不会只交代码，而能学会如何解释自己的实现过程。

## 典型交付物与评审问题

| 交付物 | review 时该问什么 |
| --- | --- |
| 页面拆分表 | 有没有把页面私有结构过早抽进共享层 |
| token 映射表 | 是否还有颜色、间距、圆角直接硬编码在 JSX 或组件里 |
| 关键截图集 | 断点和状态是否覆盖到了真正高风险的部分，而不只是 Hero |
| 录屏或视频回放 | 交互节奏是否和设计稿一致，是否明确了异常态与回退态 |

这类交付物会显著提升前端文档的可用性，因为它们把“实现过程”显式化了。对于后续维护者来说，看一张拆分表和一段录屏，往往比直接读 400 行页面代码更快理解设计意图。

## 相关案例怎么接进这一页

设计到代码这页最容易读完后停在“知道该怎么做”，却还不知道真实任务里如何交接。更稳的做法是把它和下面几类案例一起看：

| 你现在是什么任务 | 先看哪篇案例 | 为什么值得搭配这页 |
| --- | --- | --- |
| 先在本地读设计输入，再交给后台执行 | [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff) | 这条链路最接近“设计 discovery -> brief -> 长执行段 -> review 收口” |
| 页面首版范围已经很清楚，但需要阶段验证 | [OpenAI Codex 重构与验证案例](/docs/case-studies/codex-refactor-with-verification) | 能帮你看清“页面骨架完成后，如何继续保留计划和验证” |
| 任务已经清楚，重点是快速推进到 draft PR | [GitHub Copilot Draft PR 交接案例](/docs/case-studies/github-copilot-draft-pr-handoff) | 适合已经有明确页面任务和验收条件的交接场景 |

读这些案例时，不要只看工具名。真正要观察的是：

1. discovery brief 里有没有把设计输入、断点和边界写清楚。
2. 执行段有没有把页面骨架、状态补齐和验证拆成阶段。
3. 最后交付时，截图、录屏和命令结果有没有回到同一份说明里。

## 视频驱动复盘法

| 复盘目标 | 先看什么 | 再回到本文哪一段 |
| --- | --- | --- |
| 学会如何从 Figma 拆页面 | [Claude Code + Figma 工作流](/docs/resources/videos?video=bilibili-bv1f5cyz1eov-青柠智信) | “结构化输入优先级”“页面拆分与媒体采集清单” |
| 学会如何把截图从“参考”变成“证据” | [实战演示视频列表](/docs/resources/videos?format=实战演示&section=results) | “训练任务与验收方式” |
| 学会如何在前端项目里收口验证 | [全部视频](/docs/resources/videos) | “典型交付物与评审问题” |

## 配套图片与视频

- 图表已在本页补齐，可直接用来向设计师或新成员解释输入顺序。
- 想看公开视频演示：去 [实战演示](/docs/resources/hands-on-demos) 搜 `figma`、`frontend`、`design-to-code`。
- 想按最近素材筛前端视频：去 [全部视频](/docs/resources/videos)。
- 想看更接近真实交接链的案例：去 [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff) 和 [OpenAI Codex 重构与验证案例](/docs/case-studies/codex-refactor-with-verification)。
- 想把设计协作视角补完整：再读 [设计师岗位页](/docs/roles/design)。
- 想继续进入具体技术栈实现：下一页看 [框架与组件生态](/docs/roles/frontend/frameworks-and-components)。
