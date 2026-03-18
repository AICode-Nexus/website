---
title: 测试与交付
description: 把组件测试、Playwright、预览验证和 PR 说明串成前端 AI 的默认交付闭环。
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
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
slug: /roles/frontend/testing-and-delivery
---

# 测试与交付

前端 AI 的闭环不是“代码可以运行”，而是“别人能接着看、接着测、接着交付”。所以测试与交付必须一起看：只写测试、不写交付说明，review 很难判断风险；只写 PR 描述、不补自动化证据，回归成本又会掉回人工。

## 交付闭环图

![测试与交付闭环图](/img/roles/frontend/testing-delivery-loop.svg)

## 前端验证分层

| 层级 | 解决什么问题 | 推荐工具 |
| --- | --- | --- |
| 组件/逻辑层 | props、交互、边界条件是否正确 | `Vitest`、`Testing Library`、`Vue Test Utils` |
| 预览/视觉层 | 组件状态、变体和视觉回归 | `Storybook` 或内部组件预览页 |
| 页面/流程层 | 关键用户路径是否可执行 | `Playwright` |
| 交付层 | 风险、影响面、验收证据是否完整 | PR 模板、截图、验证记录 |

## 代码案例：组件级验证

```tsx
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {PlanSwitcher} from './PlanSwitcher';

test('switches active plan when user clicks annual tab', async () => {
  const user = userEvent.setup();

  render(<PlanSwitcher />);
  await user.click(screen.getByRole('tab', {name: '年付'}));

  expect(screen.getByRole('tabpanel', {name: '年付方案'})).toBeVisible();
});
```

## 代码案例：关键路径的 Playwright 冒烟

```ts
import {test, expect} from '@playwright/test';

test('pricing page allows user to switch billing cycle', async ({page}) => {
  await page.goto('/pricing');
  await page.getByRole('tab', {name: '年付'}).click();

  await expect(page.getByText('每年节省 20%')).toBeVisible();
  await expect(page.getByRole('button', {name: '立即开始'})).toBeVisible();
});
```

## 交付时至少要补哪几类证据

- 运行过哪些命令，哪些命令没跑，原因是什么。
- 关键截图或录屏覆盖了哪些断点、状态和模块。
- 这次改动影响到哪些页面、共享组件、token 或包。
- 还有哪些风险没有覆盖，需要谁继续跟进。

## 代码案例：PR 交付说明模板

```md
## Summary

- 新增 pricing 页面 Hero 与套餐切换
- 抽取 `PlanCard` 页面私有组件
- 对齐 pricing token 到语义变量

## Verification

- `npm run lint`
- `npm run typecheck`
- `npm run test:unit`
- `npm run build`
- `npx playwright test tests/pricing-smoke.spec.ts`

## Artifacts

- Desktop screenshot: `output/pricing-desktop.png`
- Mobile screenshot: `output/pricing-mobile.png`

## Risks

- 暂未覆盖真实支付回调路径
- 未引入视觉回归基线
```

## 哪些改动一定要上 E2E

| 改动类型 | 是否建议 Playwright |
| --- | --- |
| 纯静态文案或排版微调 | 通常不需要 |
| 表单、筛选器、切换器、对话框 | 建议至少一条关键路径 |
| 登录、注册、支付、结算、权限流 | 必须 |
| 共享 UI 变更影响多个业务页面 | 建议补最短 smoke path |

## 测试与交付常见误区

- 只补单测，不补真实页面流程，导致回归依然靠手点。
- 把所有事情都丢给 E2E，最后测试慢且维护成本高。
- PR 里只贴命令，不说明影响范围和剩余风险。
- 只给桌面截图，不给移动端或关键状态截图。

## 证据包视图

![前端验证证据图](/img/roles/frontend/frontend-verification-evidence.svg)

虽然这张图也可以出现在质量门禁页，但它在测试与交付页同样关键，因为这页讨论的核心不是“测了没有”，而是“能不能把测试结果、截图、录屏和风险一起交出去”。前端交付最常见的断层，正好发生在这里。

## 测试资产包应该怎么组织

推荐把测试与交付制品组织成可追踪的资产包，而不是临时散落在聊天记录里：

![前端交付证据包板](/img/roles/frontend/frontend-delivery-proof-pack-board.svg)

```text
artifacts/
  pricing/
    desktop-home.png
    mobile-home.png
    billing-toggle.mp4
tests/
  pricing-smoke.spec.ts
docs/
  verification/
    pricing-2026-03-15.md
```

其中最关键的不是目录名，而是“每个交付任务都有固定位置存放命令、截图和录屏”。这样 AI 参与时才能明确知道哪些东西需要一起更新，而不是只修改测试代码忘了补证据。

如果你要把这套证据包直接做成团队默认模板，最小组合可以是：

| 文件 | 作用 | reviewer 最先看什么 |
| --- | --- | --- |
| `commands.md` | 记录本次真实跑过的命令 | 有没有说明哪些命令没跑及原因 |
| `artifacts/desktop.png` 与 `artifacts/mobile.png` | 证明关键断点没坏 | 是不是覆盖了高风险模块，不只是首页 Hero |
| `artifacts/flow.mp4` | 证明交互路径真的可走 | 是否包含起始态、关键交互和结果态 |
| `risks-and-next.md` | 记录未覆盖项、回滚入口和接手建议 | reviewer 是否能据此继续推进或止损 |

想直接复制这套文件骨架：去 [命令与证据模板](/docs/roles/frontend/templates/commands-and-evidence)、[PR / Handoff 模板](/docs/roles/frontend/templates/pr-handoff) 和 [Risks / Next 模板](/docs/roles/frontend/templates/risks-and-next)。

## 从组件预览到关键路径冒烟的分工

| 层级 | 核心问题 | 更适合的资产 | 失败时怎么处理 |
| --- | --- | --- | --- |
| 组件测试 | 单个组件 props、事件、边界是否正确 | 单测、交互测试 | 先修局部，再考虑页面回归 |
| 组件预览 / Storybook | 变体、状态、视觉差异是否清楚 | 预览页、状态截图 | 先补状态，再考虑流程 |
| 页面 / Playwright smoke | 用户路径是否可走通 | 冒烟脚本、录屏、关键截图 | 先收窄最短路径，再扩覆盖 |
| 交付说明 | 改动影响面和剩余风险是否明确 | PR 模板、风险说明 | 说明未覆盖项，不假装全覆盖 |

这张分工表有一个重要价值：它能防止团队把所有验证都压到 E2E。AI 生成测试时尤其容易这么做，因为“写一条跑通流程的脚本”看上去很快，但长期维护成本最高。

## 交付物清单

每次前端任务交付时，至少应该有这四类东西：

1. 自动化命令结果：lint、typecheck、build，以及必要时的 test / Playwright。
2. 关键断点截图：至少桌面和移动端各一张；涉及交互时补状态图。
3. 关键录屏：切换、抽屉、筛选、表单提交、错误提示等动态行为最好用 15 到 30 秒录屏说明。
4. PR 摘要和风险：这次改了哪里、没有改哪里、还有什么没覆盖。

这四类交付物都写进文档之后，测试与交付页就会真正承担“训练团队如何收口”的作用，而不只是介绍几个测试工具。

## 训练任务与视频路径

| 训练任务 | 重点 | 建议视频入口 |
| --- | --- | --- |
| 任务 1：给一个组件补状态测试与截图 | 学会把组件验证和视觉证据一起交付 | [全部视频](/docs/resources/videos) |
| 任务 2：给一个真实页面补最短 Playwright 冒烟路径 | 学会只覆盖高风险流程 | [Claude Code + Playwright 浏览器自动化](/docs/resources/videos?video=bilibili-bv1vgpaz6ehu-云桥网络) |
| 任务 3：写完整 PR 交付说明 | 学会把风险与未覆盖内容说清楚 | [实战演示视频列表](/docs/resources/videos?format=实战演示&section=results) |

## 测试与交付案例地图

这一页最适合和真实 handoff 案例一起读。否则很容易理解成“补几条测试就算交付完成”，而忽略了 PR 摘要、证据包和剩余风险：

| 你现在最像哪种任务 | 先看哪篇案例 | 为什么值得搭配本页 |
| --- | --- | --- |
| 交互改动已经确定，重点是最短 smoke path 和证据收口 | [Claude Code Bugfix 闭环案例](/docs/case-studies/claude-code-bugfix-loop) | 适合看关键路径验证、命令结果和收口节奏 |
| 长链路改动已经展开，需要阶段性测试和完整验证摘要 | [OpenAI Codex 重构与验证案例](/docs/case-studies/codex-refactor-with-verification) | 适合看“测试不是一次性跑完，而是分阶段回写交付物” |
| 任务已经清楚，重点是让 reviewer 快速接手和继续推进 | [GitHub Copilot Draft PR 交接案例](/docs/case-studies/github-copilot-draft-pr-handoff) | 最适合观察 PR 摘要、Artifacts、Risks 怎么组织 |

读案例时，重点不要只看测试框架，而要看这三件事：

1. 自动化命令、截图和录屏有没有落在同一份交付说明里。
2. PR 是否清楚说了“已覆盖什么”和“尚未覆盖什么”。
3. reviewer 是否能在几分钟内判断这次改动能不能继续往下推进。

## PR handoff 检查表

交付真正断层的地方，往往不在测试代码，而在 handoff。每个前端 PR 最少应该回答下面这些问题：

| 问题 | 需要给出的证据 |
| --- | --- |
| 这次改动主要影响哪里 | 变更摘要、受影响页面或组件列表 |
| 我怎么证明它现在可用 | 命令结果、截图、必要时的录屏 |
| 哪些路径还没覆盖 | 风险说明、后续跟进建议 |
| 如果线上有问题，最先看哪里 | 最短回滚思路或排查入口 |

把 handoff 写清楚之后，测试与交付页才真正完成了“从验证到交付”的闭环，而不是停留在测试工具清单。

## 录屏脚本建议

为了提高视频和录屏在交付中的权重，建议每次交互类改动都用统一脚本录 15 到 30 秒：

1. 先展示页面初始态。
2. 再演示关键交互，如 tab 切换、抽屉展开、筛选器变化或错误提示。
3. 最后停在结果态，让 reviewer 能截图或对照设计稿。

统一录屏脚本的好处是，团队后续可以横向对比不同实现，不会每个人都只录自己觉得重要的一部分。

## 交付失败复盘问题

如果一次前端交付上线后仍然出现问题，复盘时至少要问：

1. 是没写测试，还是测试写了但没有覆盖真正高风险路径。
2. 是截图和录屏缺失，还是证据存在但 reviewer 没有明确检查。
3. 是 PR 没说明风险，还是团队没有要求在交付时显式说明未覆盖项。

把这些问题回写到文档后，测试与交付页才会越用越强，而不是每次都重复同样的失误。

## 示例交付摘要

一个更成熟的前端交付摘要，不应该只有“测试通过”。它至少应包含：改动范围、命令结果、截图与录屏位置、未覆盖风险、回滚入口。只要团队持续按这个结构提交，测试与交付这页就会从教程升级成真实工作模板。

如果你准备把这页继续做成培训课，最简单的办法就是让每次练习都必须提交一份这种摘要。长期下来，团队会自然学会如何把测试证据说清楚。

前端交付真正成熟的标志，不是测试文件越来越多，而是任何一个 reviewer 都能在几分钟内看懂“这次改了什么、怎么验证、还剩什么风险”。

这也是文档、测试和交付必须一起写的原因。

也是这页存在的原因。

## 配套图片与视频

- 本页已补测试与交付闭环图，可直接用作新人培训材料。
- 想找 Playwright、PR 验证或 bugfix 录像：去 [实战演示](/docs/resources/hands-on-demos)。
- 想对齐终端优先的修复与验证流程：去 [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。
- 想看真实案例：去 [Claude Code Bugfix Loop](/docs/case-studies/claude-code-bugfix-loop) 与 [Codex Refactor with Verification](/docs/case-studies/codex-refactor-with-verification)。
- 想看更贴近 reviewer handoff 的案例：去 [GitHub Copilot Draft PR 交接案例](/docs/case-studies/github-copilot-draft-pr-handoff)。
- 想把规则和工具上下文写回仓库：继续看 [上下文与规则](/docs/roles/frontend/context-and-rules)。
