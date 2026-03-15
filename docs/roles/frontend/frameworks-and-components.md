---
title: 框架与组件生态
description: 在 React、Vue、Next.js、Nuxt、Vite、状态层和组件基座之间做更适合 AI 协作的技术选择。
sidebar_label: 框架与组件生态
tags: [ai-coding, frontend, react, vue]
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
slug: /roles/frontend/frameworks-and-components
---

# 框架与组件生态

这一页回答的不是“哪个框架更流行”，而是“哪套组合在 AI 修改、人工 review 和长期维护时更稳”。前端 AI 的风险通常不在生成速度，而在边界混乱：页面逻辑、状态层、组件基座和数据流如果混在一起，任何一次自动重构都可能扩散成全项目返工。

## 技术路线图

![React 与 Vue 协作泳道图](/img/roles/frontend/frameworks-components-lanes.svg)

## React、Vue、Next、Nuxt、Vite 怎么判断

| 场景 | 更推荐的路线 | 原因 |
| --- | --- | --- |
| SEO、SSR、内容站、营销站 | `Next.js` 或 `Nuxt` | 路由与渲染边界清楚，AI 不容易把数据获取和页面渲染写散 |
| 中后台、控制台、纯前端应用 | `React + Vite` 或 `Vue + Vite` | 心智更简单，AI 的上下文负担更低 |
| 设计系统、组件库、内嵌组件场景 | `Vite` 优先 | 更适合聚焦组件边界和构建速度 |
| 多团队共享一套 UI 规范 | React/Vue 都可，但要强约束组件基座和目录结构 | 真正决定可维护性的不是框架，而是抽象边界 |

## React 线：适合 AI 的默认做法

### 推荐组合

- `React + TypeScript`
- 有 SSR/SEO 需求时用 `Next.js`
- 纯业务台前或中后台时优先 `Vite`
- 异步数据优先 `TanStack Query`
- 客户端共享状态只在确实需要时才引入 `Zustand`
- 可控组件基座优先 `Radix UI / shadcn/ui`

### 为什么这条线对 AI 友好

- 文件和组件边界容易固定，便于明确“改哪里、不改哪里”。
- TypeScript props、hooks、server/client boundary 都适合写规则。
- 源码可控的 UI 基座比闭源组件或高度黑盒库更适合 AI 重构。

### 代码案例：把内容配置和组件显示层拆开

```ts
// src/data/featureCards.ts
export const featureCards = [
  {
    id: 'diff-aware',
    title: 'Diff-aware review',
    summary: '在提交前先比较真实变更与设计目标。',
    href: '/docs/standards/review-quality-gates',
  },
];
```

```tsx
// src/components/FeatureCardGrid.tsx
import {featureCards} from '../data/featureCards';

export function FeatureCardGrid() {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      {featureCards.map((card) => (
        <article key={card.id} className="rounded-3xl border p-6">
          <h3 className="text-xl font-semibold">{card.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{card.summary}</p>
          <a className="mt-4 inline-flex" href={card.href}>
            继续阅读
          </a>
        </article>
      ))}
    </section>
  );
}
```

这类模式有两个明显好处：

- 复用内容和链接不再散落在多个 JSX 文件中。
- AI 重写 UI 时，不会顺手改坏内容源或路由常量。

## Vue 线：适合 AI 的默认做法

### 推荐组合

- `Vue 3 + TypeScript`
- 有 SSR/SEO 时用 `Nuxt`
- 标准 SPA 或组件库场景优先 `Vue + Vite`
- 业务状态优先 `Pinia`
- 远程缓存和异步协作可以补 `@tanstack/vue-query`

### 为什么这条线对 AI 友好

- `SFC` 给了模型一个稳定上下文，模板、逻辑和样式不会拆得到处都是。
- `Composition API` 让你能把副作用和业务规则收进 composables，而不是塞进页面。
- `props / emits / slots` 对 review 很友好，组件职责更容易审查。

### 代码案例：把逻辑从页面抽到 composable

```vue
<script setup lang="ts">
import {useDashboardFilters} from '@/composables/useDashboardFilters';

const {filters, resetFilters, activeCount} = useDashboardFilters();
</script>

<template>
  <section class="space-y-4">
    <FilterBar :model-value="filters" />
    <button type="button" class="btn-secondary" @click="resetFilters">
      重置筛选（{{ activeCount }}）
    </button>
  </section>
</template>
```

```ts
// composables/useDashboardFilters.ts
import {computed, ref} from 'vue';

export function useDashboardFilters() {
  const filters = ref({status: 'all', owner: 'me'});
  const activeCount = computed(() => Object.values(filters.value).filter((value) => value !== 'all').length);
  const resetFilters = () => {
    filters.value = {status: 'all', owner: 'me'};
  };

  return {filters, activeCount, resetFilters};
}
```

## 组件基座与状态层怎么选

| 决策点 | 更稳的做法 | 不推荐的做法 |
| --- | --- | --- |
| 组件基座 | 选源码可控、变体清楚的系统 | 依赖只能二次包裹、无法追踪样式来源的黑盒库 |
| 远程数据 | 用 `TanStack Query` 或 `vue-query` 管缓存与异步状态 | 把请求结果塞进任意全局 store |
| 本地共享状态 | 限定在少量 store/composable 中 | 看到多个组件共享就立刻全局化 |
| 目录结构 | `page -> section -> component -> shared/ui` 分层 | 页面和共享组件混在同一层 |

## 最常见的 6 个反模式

- 用 `useMemo`、`memo` 或缓存抽象掩盖糟糕的组件边界。
- 因为 AI 能写得快，就把页面专有组件过早抽到共享层。
- 还没确认远程状态边界，就把所有数据塞进全局 store。
- 在 Next.js 里随手改 `server`/`client` 边界，造成渲染模式混乱。
- 在 Vue 页面里把全部逻辑塞进一个 `script setup`，不给 composables 留位置。
- 同时混搭过多 UI 库和状态层，让 AI 每次改动都要重新判断约束。

## 配套图片与视频

- 图表已补在本页顶部，可直接用于对齐 React/Vue 协作边界。
- 想找组件化和框架协作演示：去 [实战演示](/docs/resources/hands-on-demos) 搜 `react`、`vue`、`component`.
- 想继续补组件规范：去 [样式与设计系统](/docs/roles/frontend/styling-and-design-systems)。
- 想补复杂任务的计划先行流程：去 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 想看真实终端协作案例：去 [Codex Refactor with Verification](/docs/case-studies/codex-refactor-with-verification) 和 [Windsurf 维护到 PR](/docs/case-studies/windsurf-maintenance-to-pr)。
