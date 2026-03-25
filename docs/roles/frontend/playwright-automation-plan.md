---
title: Playwright 自动化测试方案
description: 用官方 Playwright 最佳实践和仓库 issue 需求，解释前端团队什么时候该上 Playwright、第一条 smoke 应该怎么选，以及怎样把测试结果变成真正可交付的证据包。
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
reviewed_at: 2026-03-25
source_window_end: 2026-03-25
market_status: current
slug: /roles/frontend/playwright-automation-plan
---

# Playwright 自动化测试方案

## TL;DR

Playwright 不是“把浏览器自动点一遍”的工具，也不是“前端成熟团队必须上的政治正确”。  
它真正适合解决的问题只有一个：当你的系统已经复杂到“代码看起来没问题，但真实用户路径可能已经断掉”时，Playwright 能帮你把这条路径变成可验证、可复现、可交付的证据。

Playwright 官方最佳实践页反复强调三件事：

- 测试要验证用户可见行为，而不是实现细节。
- 每条测试要尽量保持隔离，避免级联失败。
- 选择器、断言和调试手段都应该优先服务于稳定性，而不是“先写出来再说”。

这意味着，真正好的 Playwright 方案，不是测试文件越多越好，而是你能不能先选对第一条 smoke，用最小投入验证最关键的真实路径，并把脚本、命令、截图、trace 和风险说明收成一套交付物。

## 为什么这页值得单独写

- 事实：GitHub issue [#1 `plawright`](https://github.com/AICode-Nexus/website/issues/1) 由 `trsoliu` 于 `2026-03-23 08:40:40 UTC` 创建，正文是“我希望看到关于playwright 相关的自动化测试方案”。
- 事实：截至 `2026-03-25 14:20:42 +08:00` 的全量 issue 快照，这条 issue 当前状态仍为 Open，但仓库内已经有对应的中文方案页与回帖。
- 推断：这条 issue 真正要的不是 Playwright API 速查，而是一条“什么时候该上、第一步怎么走、最后怎么交付”的工程路径。

## Playwright 官方文档其实在反复提醒什么

Playwright 官方文档并没有把重点放在“你能做多少炫酷自动化”，而是放在“怎么让测试可靠”。

- 事实：在官方 [Best Practices](https://playwright.dev/docs/best-practices) 中，Playwright 明确建议测试验证用户可见行为，而不是函数名、数组结构或 CSS 类名这类实现细节。
- 事实：同一页文档明确建议每个测试尽量隔离，保持独立的 local storage、session storage、cookies 和数据，以提高复现性并减少级联失败。
- 事实：官方同时建议优先使用 user-facing locators、web-first assertions 和 trace viewer，而不是脆弱选择器、手写即时断言和“只有失败截图”的排查方式。

推断：把这三件事合起来看，Playwright 的核心价值其实不是“能做 E2E”，而是“能把真实用户路径变成更可信的工程证据”。

## 什么时候真的该上 Playwright

不是所有前端改动都值得写 Playwright。  
更稳的判断标准不是“这功能重不重要”，而是“它是不是已经超出静态检查和人工 review 能可靠覆盖的范围”。

下面这些场景，通常值得优先考虑：

| 场景 | 建议 | 原因 |
| --- | --- | --- |
| 静态文案或纯排版调整 | 通常先不上 | `build`、断点截图和人工 review 往往已经够用 |
| 交互切换、表单、抽屉、筛选器 | 建议至少上一条 smoke | 真实问题常出在状态切换和 DOM 交互 |
| 登录、注册、支付、权限流 | 必须认真评估并优先落地 | 这些路径只看组件层测试通常不够 |
| 共享 UI 改动影响多个页面 | 值得上一条跨页最短路径 | 重点是验证真实页面链路有没有被共享改动带坏 |

一句话判断：只要你已经开始担心“实现没错，但真实路径可能断了”，Playwright 就进入候选名单了。

## 第一条 smoke 为什么几乎决定后续成败

很多团队不是因为不会写 Playwright 失败，而是因为第一条测试选错了。  
最常见的错误有两种：

- 一上来就想覆盖整条复杂业务流，结果测试又长又脆。
- 一上来只测最简单页面，最后虽然“有 Playwright 了”，但对真实交付没有任何帮助。

更稳的第一条 smoke，通常同时满足三个条件：

1. 这条路径一旦坏掉，用户会立刻受影响。
2. 这条路径在 1 到 2 分钟内可以稳定跑完。
3. 这条路径主要依赖你自己可控的页面和数据，而不是大量第三方依赖。

这也和官方建议一致。Playwright 明确提醒不要测试第三方依赖本身，而是优先测试你自己控制的行为，并在必要时通过网络 mock 保证可重复性。

## 一个足够现实的第一条 smoke 应该长什么样

最有价值的第一条 smoke 通常不是“业务覆盖面最大”的那条，而是“最短但最容易出事故”的那条。

优先级通常可以这样排：

1. 关键转化路径，比如登录、注册、价格切换、提交表单。
2. 共享组件影响下的高频路径，比如 Header、Drawer、全局筛选器。
3. 最容易被 review 漏掉的状态，比如错误态、空态、禁用态或断点切换。

不建议作为第一条 smoke 的目标：

- 强依赖多个外部系统的全链路流程
- 需要复杂数据准备才能稳定跑通的路径
- 一次覆盖过多分支、导致定位失败原因非常困难的脚本

## Playwright 交付物为什么不能只剩一份 `spec.ts`

真正可 review 的 Playwright 方案，最少应该同时交 5 件东西：

1. 一条最短 smoke case。
2. 一个明确运行命令。
3. 一段说明，解释为什么先测这条，不测别的。
4. 一套可回放证据，比如截图、视频或 trace。
5. 一段风险说明，告诉 reviewer 这轮没覆盖什么。

如果只有测试文件，本质上还只是“有人写了点自动化代码”；  
只有当脚本、证据和边界一起出现，Playwright 才开始成为真正的交付系统。

## 官方最佳实践怎样落到日常写法里

### 1. 优先验证用户可见行为

Playwright 官方建议测试用户真正能看到和交互到的东西，所以首选：

- `getByRole`
- `getByText`
- `getByLabel`
- 明确的 `test id`

不要把第一条关键 smoke 建在一堆脆弱 CSS selector 上，否则它很快会被样式重构带坏。

### 2. 保持测试隔离

如果每个测试都依赖上一个测试留下的 session 或数据，失败会像多米诺骨牌一样扩散。  
更稳的做法是让每条测试都能独立启动、独立失败、独立定位。

### 3. 用 trace viewer，而不只是截图

截图能证明“最后看起来像对的”，但 trace 更能证明“过程是真的走通的”。  
这也是为什么 Playwright 官方在 CI 调试里更推荐 trace viewer。

## 一个更稳的最小落地模型

### 第 1 阶段：建立首条 smoke

目标只有一个：证明关键路径真的能走通。

### 第 2 阶段：补最危险边界

不要急着铺满矩阵，先补最容易翻车的 1 到 2 个边界状态。

### 第 3 阶段：进入长期治理

当脚本已经稳定，再考虑把它接进默认门禁、CI 或 release smoke。

这三步里，最重要的不是速度，而是不要在第 1 阶段就做出一条维护成本过高的测试。

## 一个前端团队可以直接拿去用的最小模板

```text
tests/
  e2e/
    pricing-smoke.spec.ts
playwright.config.ts
artifacts/
  pricing/
    desktop-home.png
    mobile-home.png
    pricing-trace.zip
docs/
  verification/
    pricing-playwright-plan.md
```

这个结构的核心思想不是目录名，而是把脚本、证据和说明放进同一条任务链。  
这样 reviewer 看见的不是“一个测试文件”，而是一套完整的验证闭环。

## 推荐动作

- 如果你现在还没有任何浏览器自动化，不要从“完整业务流”开始，先选最短关键路径。
- 如果你已经写了一些 Playwright 脚本，但 reviewer 仍然说“我不知道它到底证明了什么”，那就先补证据包和风险说明。
- 如果你已经有稳定 smoke，再考虑把它纳入 [`测试与交付`](/docs/roles/frontend/testing-and-delivery) 的长期门禁，而不是一开始就要求全量覆盖。

## 这页之后该看什么

- 想把 Playwright 接进更大的验证闭环：去 [测试与交付](/docs/roles/frontend/testing-and-delivery)。
- 想把 lint、typecheck、build 和浏览器验证收成同一套门禁：去 [质量门禁](/docs/roles/frontend/quality-gates)。
- 想看更完整的工作流分流：去 [主流 AI Coding 工作流](/docs/workflows/mainstream-ai-coding-workflows)。

## Sources

- [GitHub Issue #1: `plawright`](https://github.com/AICode-Nexus/website/issues/1)
- [Playwright Docs: Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Docs: Trace viewer](https://playwright.dev/docs/trace-viewer)
- [Playwright Docs: Running and debugging tests](https://playwright.dev/docs/running-tests)
- [测试与交付](/docs/roles/frontend/testing-and-delivery)
