---
title: Playwright 自动化测试方案
description: 面向前端读者的 Playwright 落地指南，回答什么时候上 E2E、第一条 smoke 怎么选、项目怎么组织、证据怎么交付。
sidebar_label: Playwright 方案
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
reviewed_at: 2026-03-23
source_window_end: 2026-03-23
market_status: current
slug: /roles/frontend/playwright-automation-plan
---

# Playwright 自动化测试方案

这页不是 Playwright API 速查，也不是“把官方文档换成中文”。它要解决的是更实际的问题：当前端团队说“我们想补自动化测试方案”时，到底应该先测什么、怎么写第一条脚本、目录怎么放、怎样把结果交出去。

`2026-03-23` 的仓库 issue [#1 `plawright`](https://github.com/AICode-Nexus/website/issues/1) 明确提出了这个需求，所以这页直接按“从 0 到 1 落地”来组织，而不是只讲概念。

## 先说结论

- Playwright 最适合承担“关键用户路径是否真的可走通”这一层，不适合替代所有单测、组件测试和视觉预览。
- 第一阶段的目标不是铺满 E2E，而是选一条最短但高风险的真实路径，建立稳定 smoke case。
- 一个合格的 Playwright 方案，必须同时包含脚本、运行命令、截图/录屏和剩余风险，而不是只有测试文件。

## 什么时候应该上 Playwright

| 场景 | 建议 | 为什么 |
| --- | --- | --- |
| 静态文案、纯排版微调 | 通常先不上 | 这类问题更适合靠 `build`、断点截图和人工 review 收口 |
| 切换器、筛选器、对话框、抽屉、表单 | 建议至少上一条 smoke | 真正容易坏的是页面交互和状态切换 |
| 登录、注册、支付、结算、权限流 | 必须上 | 这些路径只看组件测试不够，必须验证真实页面流 |
| 共享 UI 改动影响多个页面 | 建议上一条最短跨页路径 | 重点不是组件本身，而是确认没有把真实页面链路带坏 |

一句话判断：只要你担心“代码看起来没问题，但用户路径可能断掉”，就该考虑 Playwright。

## 第一条 smoke 用例应该怎么选

大多数团队第一步就错在选题。最稳的做法不是挑“功能最多”的路径，而是挑“最短但最容易出事故”的路径。

优先顺序建议如下：

1. 对业务结果最关键的路径：例如登录、注册、价格切换、下单、提交表单。
2. 改动面最广的路径：例如共享 Header、全局筛选器、通用表单容器。
3. 最容易被 review 漏掉的路径：例如断点切换、错误态、空态、禁用态。

不建议一上来就选下面这些目标：

- 依赖太多外部系统、短期内无法稳定跑通的路径。
- 需要复杂测试数据准备，导致团队先花 2 天搭环境。
- 一次性覆盖太多分支，最后脚本又长又脆。

## 选路径的决策表

| 候选路径 | 风险高不高 | 准备成本高不高 | 是否适合首条 smoke |
| --- | --- | --- | --- |
| 价格页年付/月付切换 | 中 | 低 | 适合 |
| 登录成功路径 | 高 | 中 | 适合 |
| 下单并完成支付回调 | 很高 | 很高 | 通常不适合作为第一条 |
| 后台多筛选器组合查询 | 高 | 中 | 适合，但先只测最短组合 |
| 营销页 Hero 文案展示 | 低 | 低 | 不适合，优先截图即可 |

如果团队还拿不准，先问自己两个问题：

1. 这条路径坏了，用户会不会立刻受影响？
2. 这条路径能不能在 1 到 2 分钟内稳定跑完？

同时满足，基本就值得成为第一条 smoke。

## 最小落地方案长什么样

一套最小可执行的 Playwright 方案，通常只需要这 5 个部分：

1. 一条最短 smoke case。
2. 一个明确的运行命令。
3. 一份测试目标说明，写清楚“为什么测这条，不测别的”。
4. 至少一张桌面截图和一张移动端截图。
5. 一段简短风险说明，写明哪些分支还没覆盖。

先把这 5 件事收完整，比一口气写 10 条脚本有价值。

## 推荐目录骨架

```text
tests/
  e2e/
    pricing-smoke.spec.ts
playwright.config.ts
artifacts/
  pricing/
    desktop-home.png
    mobile-home.png
    billing-toggle.mp4
docs/
  verification/
    pricing-playwright-plan.md
```

这套骨架的核心不是目录名，而是把“脚本、证据、说明”放在同一条任务链里。否则最常见的结果就是：

- 测试脚本写了，但没有截图；
- 截图有了，但找不到对应脚本；
- 命令跑过了，但没人知道还缺哪些分支。

## 最小配置与第一条脚本

### 命令层

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:smoke": "playwright test tests/e2e/pricing-smoke.spec.ts"
  }
}
```

### 脚本层

```ts
import {test, expect} from '@playwright/test';

test('pricing page allows user to switch billing cycle', async ({page}) => {
  await page.goto('/pricing');
  await page.getByRole('tab', {name: '年付'}).click();

  await expect(page.getByText('每年节省 20%')).toBeVisible();
  await expect(page.getByRole('button', {name: '立即开始'})).toBeVisible();
});
```

### 说明层

```md
# Pricing Playwright Plan

- 目标：证明价格页切换路径在真实页面上可走通
- 本轮覆盖：页面打开、年付切换、结果态展示、CTA 可见
- 本轮不覆盖：真实支付回调、登录态价格差异、多语言版本
```

这三层合起来，才叫“方案”。如果只有 `spec.ts` 文件，本质上还只是一次测试实现。

## React / Next.js / Vite 场景下怎么接

### React SPA / Vite

- 先把路由稳定在开发服务器里可直达，例如 `/pricing`、`/login`。
- 让第一条 smoke 只依赖本地可准备的数据，不要一开始就连远端环境。
- 优先用角色选择器和可读文本，不要上来就写复杂 CSS 选择器。

### Next.js

- 如果有 server/client 混合页面，先测 reader 最明显的一条真实用户路径，不要同时覆盖 server action 和所有错误态。
- 对缓存、重定向和权限跳转敏感的页面，第一轮先把“成功路径”打通，再补边界情况。
- 如果页面依赖真实后端，先明确 mock 还是测试环境，避免脚本长期不稳定。

## 证据怎么交，才算完整

Playwright 方案的目标不是让 CI 里多一个绿色勾，而是让 reviewer 和后续维护者知道“这条关键路径现在真的可用”。所以每次至少交这几类证据：

- 命令结果：跑了什么，没跑什么。
- 桌面截图：证明主要布局和结果态没坏。
- 移动端截图：证明窄屏没有直接塌掉。
- 交互录屏：证明路径真的走通，而不是只截最终态。
- 风险说明：写清楚本轮没覆盖的部分。

## PR / 交付说明模板

```md
## Playwright Plan

- 目标路径：pricing 页面账单周期切换
- 选择原因：改动影响真实 CTA，且容易在断点或状态切换时失效

## Verification

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run test:e2e:smoke`

## Artifacts

- `artifacts/pricing/desktop-home.png`
- `artifacts/pricing/mobile-home.png`
- `artifacts/pricing/billing-toggle.mp4`

## Risks

- 暂未覆盖真实支付接入
- 暂未覆盖登录后价格差异
```

## 最常见的 6 个失败模式

1. 一上来就想测完整业务流程，导致首条脚本迟迟落不了地。
2. 全部依赖外部系统，测试一半时间都在等环境。
3. 用脆弱选择器，页面稍微改结构脚本就碎。
4. 只写脚本，不补截图、录屏和风险说明。
5. 把 Playwright 当成所有验证的替代品，单测和组件测试反而不补。
6. 首条 smoke 太长，失败时团队根本不知道坏在哪一段。

## 更稳的推进顺序

推荐把 Playwright 落地拆成 3 轮，而不是一次性到位：

### 第 1 轮：建立首条 smoke

- 目标：选一条最短关键路径并跑通。
- 产出：1 条脚本 + 运行命令 + 桌面/移动端截图 + 风险说明。

### 第 2 轮：补关键边界

- 目标：把最容易翻车的一两个边界补上，例如错误态、空态、禁用态、权限跳转。
- 产出：扩展用例或第二条小 smoke，不追求全量矩阵。

### 第 3 轮：进入长期治理

- 目标：把这条路径纳入默认门禁或 CI，明确谁维护、何时更新。
- 产出：质量门禁合同、PR 模板、目录约束。

## 这页之后该看什么

- 想把 Playwright 接进更大的验证闭环：去 [测试与交付](/docs/roles/frontend/testing-and-delivery)。
- 想把 lint / typecheck / build / review 也一起收成默认护栏：去 [质量门禁](/docs/roles/frontend/quality-gates)。
- 想看真实浏览器验证与 bugfix 收口：去 [Claude Code + Playwright 浏览器自动化](/docs/resources/videos?video=bilibili-bv1vgpaz6ehu-云桥网络)。

## Sources

- [GitHub Issue #1: `plawright`](https://github.com/AICode-Nexus/website/issues/1)
- [测试与交付](/docs/roles/frontend/testing-and-delivery)
- [质量门禁](/docs/roles/frontend/quality-gates)
