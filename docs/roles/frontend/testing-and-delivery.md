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
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
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

## 配套图片与视频

- 本页已补测试与交付闭环图，可直接用作新人培训材料。
- 想找 Playwright、PR 验证或 bugfix 录像：去 [实战演示](/docs/resources/hands-on-demos)。
- 想对齐终端优先的修复与验证流程：去 [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing/runbook)。
- 想看真实案例：去 [Claude Code Bugfix Loop](/docs/case-studies/claude-code-bugfix-loop) 与 [Codex Refactor with Verification](/docs/case-studies/codex-refactor-with-verification)。
- 想把规则和工具上下文写回仓库：继续看 [上下文与规则](/docs/roles/frontend/context-and-rules)。
