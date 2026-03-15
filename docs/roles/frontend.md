---
title: 前端 AI 工作台：从设计稿到工程交付
description: 把 Figma、React / Vue、Tailwind、质量门禁、repo 规范和交付验证收进同一条前端 AI 协作链路。
slug: /roles/frontend
sidebar_label: 前端工程师
tags: [ai-coding, frontend, role-based]
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
---

# 前端 AI 工作台：从设计稿到工程交付

这页不是泛泛而谈的“AI Coding 入门文档”，而是给前端工程师准备的工作台。目标不是让 AI 替你随便吐一段组件代码，而是让它稳定参与下面这条链路：

`Figma / Design Token -> React 或 Vue 实现 -> 样式系统 -> 质量门禁 -> Playwright 验证 -> PR 交付`

对前端来说，真正专业的 AI 协作从来不只是“写页面更快”，而是把设计输入、框架生态、工程规范、测试验证和 repo 级约束都放进同一条工作流里。

## 这页适合谁

- 维护 `React / Next.js` 业务页面、组件库或后台系统的人
- 维护 `Vue / Nuxt` 页面、组件、表单流和状态管理的人
- 需要把 `Figma` 设计稿稳定落地成页面与组件的人
- 正在建设 `Tailwind CSS`、主题 token、设计系统或团队规范的人
- 需要让 AI 在 `lint / type-check / build / test / review` 链路里稳定协作的人

## 工作台全景

| 主题 | AI 最适合帮你做什么 | 你必须守住什么 |
| --- | --- | --- |
| 设计到代码 | 页面骨架、组件拆分、token 映射、初版样式和交互态 | 组件命名、设计抽象、语义结构、跨页面一致性 |
| 框架生态 | React / Vue 页面脚手架、hooks / composables、类型补齐 | 渲染边界、状态边界、框架约束、升级策略 |
| 样式系统 | Tailwind 类名组合、主题变量落地、响应式适配 | 品牌风格、视觉一致性、不要出现“默认 AI 味” |
| 质量门禁 | TypeScript 收口、lint 修复、批量静态检查 | 规则定义、例外处理、最终验收 |
| 仓库结构 | workspace 任务拆分、脚本生成、跨包改动建议 | package 边界、依赖治理、monorepo 约束 |
| 测试交付 | Playwright 冒烟、关键路径脚本、PR 说明草稿 | 测试覆盖范围、风险判断、交付标准 |

## 1. 设计到代码

前端 AI 的第一条主线不是“直接生代码”，而是把设计输入结构化。越接近结构化数据，AI 越稳定；越接近截图猜测，返工越多。

### Figma、设计稿与结构化输入

AI 最适合做：

- 根据设计稿生成页面骨架、区块层级和组件树
- 把设计 token 映射成颜色、间距、圆角、字号和断点约束
- 先产出“可继续改造”的首版页面，而不是一次性追求完美
- 批量补充交互态、空态、加载态、错误态和响应式差异

人工要先确认：

- 哪些是页面组件，哪些应沉淀为基础组件
- 设计稿中哪些视觉规则应该变成 token，而不是硬编码
- 命名、分层、目录落点和复用边界

推荐做法：

- 优先给 AI `Figma 链接 / Dev Mode / 设计 token / 组件描述`
- 避免只贴截图让它“看图猜参”
- 新页面优先走 [`Spec-First` runbook](/docs/workflows/patterns/spec-first/runbook)
- 如果设计师也在协作，顺带看一遍 [设计师岗位页](/docs/roles/design)

## 2. 框架与组件生态

这部分里 `React` 和 `Vue` 应该被当成两条并列主线，而不是一个主角、一个补充。

### React / Next.js

AI 在 React 生态里最适合承担这些任务：

- 生成页面、列表、详情页、设置页等基础组件骨架
- 拆分容器组件和展示组件
- 补齐 `TypeScript` 的 `props`、事件、泛型和接口映射
- 帮你在现有组件代码上做重构，而不是从零另起一套
- 给出初版测试和验证命令

要重点盯住：

- 不要为了“优化”机械加入 `memo / useMemo`
- 组件边界要跟 repo 现有模式一致
- Server / Client 边界、数据获取边界、状态边界要人工确认

### Vue / Nuxt

AI 在 Vue 生态里同样适合承担这些任务：

- 生成 `SFC` 页面和局部组件
- 拆分 `Composition API` 逻辑和 `composables`
- 梳理 `props / emits / slots`
- 组织表单、筛选器、后台页和路由级页面
- 协助补齐 `TypeScript`、Pinia 状态和页面交互

要重点盯住：

- 组合式逻辑不要被拆得过碎
- `Pinia`、路由守卫、页面生命周期的责任边界要先讲清
- 对既有 SFC 风格、目录约定和命名方式保持一致

### 组件基座：Radix UI、shadcn/ui 与同类方案

如果你用的是 React 生态，`Radix UI + shadcn/ui` 是很适合 AI 协作的组合：

- `Radix UI` 负责复杂交互和无障碍原语
- `shadcn/ui` 负责可复制、可改造的组件源码
- AI 更适合在这类清晰、可预测的基座上工作，而不是直接对黑盒组件库做样式覆盖战

如果你用的是 Vue 生态，思路也一样：

- 优先选择“源码可控、主题可控、变体模式清晰”的组件方案
- 让 AI 修改你项目里的真实组件代码，而不是凭空造一套新体系

## 3. 样式与设计系统

前端 AI 的第二条关键主线，是把样式系统从“临时类名堆叠”变成“有约束的设计实现”。

### Tailwind CSS 与主题 token

`Tailwind CSS` 对 AI 友好，是因为它原子化、可预测、类名职责单一。AI 能很快理解：

- 当前元素的样式由哪些类组成
- 哪些改动只影响局部
- 响应式断点和状态类如何组合

但风险同样明显：

- 容易生成一眼就能看出的默认配色和默认间距
- 容易做出“能用但不专业”的页面
- 容易出现每个页面都像 AI 模板拼装的同质化结果

建议把这些规则提前写清：

- 禁止默认品牌感配色直接上线
- 颜色、圆角、阴影、字体、间距都优先收进 token
- 组件风格先对齐设计系统，再让 AI 批量扩展页面
- 对需要统一主题的项目，可把 `TweakCN / Shadcraft` 之类工具当成主题生成和设计同步辅助，而不是让 AI 自己凭感觉配色

### 响应式与视觉还原

AI 很适合补的不是“一个静态桌面页面”，而是整套状态：

- 移动端与桌面端断点
- hover、focus、selected、disabled
- skeleton、empty、error、success
- 表单校验和反馈提示

真正需要人工确认的是：

- 页面层级是否太深
- 卡片、表格、表单是否沿用了统一布局节奏
- 是否破坏了设计系统已有的 spacing / radius / CTA 语言

## 4. 代码规范与质量门禁

真正让前端页面看起来专业的，不是 AI 会不会“写得出来”，而是它能不能稳定通过工程门禁。

### TypeScript

AI 很适合用来：

- 补 `props`、事件和返回值类型
- 收紧接口模型和 DTO 映射
- 在重构时定位缺失的类型定义
- 给组件、hooks、composables 提供更明确的输入输出

但不要把类型系统交给 AI 自由发挥：

- 它会倾向于给出“先过编译”的宽松类型
- 它会倾向于用 `any` 或不必要的联合类型绕过问题

### ESLint、Oxlint 与格式化

把这类工具当成“AI 的护栏”，不是补丁：

- `ESLint` 负责把编码风格和常见问题固定下来
- `Oxlint` 适合做更快的批量扫描和回归检查
- 格式化工具负责把低价值样式争议交给机器处理

AI 最适合做：

- 修可自动修的 lint 问题
- 批量收口目录里重复出现的问题
- 根据报错快速定位不符合规范的实现

你要先固定的是：

- 哪些规则是团队长期契约
- 哪些问题必须人工 review
- 哪些改动只允许“建议”，不允许自动修

## 5. 包管理与仓库结构

如果你的前端项目是 `pnpm workspace`、`monorepo` 或 `Turborepo`，AI 的工作方式必须跟单仓库项目区分开。

### pnpm / workspace

AI 可以帮你：

- 对齐多个 package 的依赖声明
- 生成 workspace 脚本和开发命令
- 明确组件库、应用、共享工具包之间的依赖关系

人工必须把这些说清：

- 哪些包允许直接依赖
- 哪些目录只能消费公开 API
- 哪些变更必须同步改文档、样式库或 demo

### monorepo / Turborepo

AI 在 monorepo 里最容易犯的错，是搞不清包边界和任务边界。

所以要先给出：

- package 结构图
- 每个包负责什么
- `build / lint / test / typecheck` 任务链
- 哪些任务由 `turbo run ...` 驱动

更稳的入口通常是：

- [`Terminal-First Repo Pairing` 工作流](/docs/workflows/patterns/terminal-first-repo-pairing)
- 复杂并行场景走 [`Parallel Worktrees / Multi-Agent` runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)
- 终端型团队补充阅读 [Claude Code 的工作方式说明](/docs/claude-code-workstyle)

## 6. 测试与交付

前端 AI 不应该只停在“页面跑起来了”，而要走到“这个改动可以被验收和交付”。

### Playwright

`Playwright` 很适合放在前端 AI 链路里做这些事：

- 冒烟测试
- 关键路径交互验证
- 视觉回归和截图校验
- 表单提交流程验证

AI 很适合生成：

- 首版 E2E 脚本
- 关键路径断言
- 用来重放 bug 的最小回归案例

但你仍要人工决定：

- 哪些路径值得长期维护
- 哪些页面只做 smoke，哪些页面必须做完整回归
- 截图基线和 flaky case 如何处理

### 交付前最少检查

无论 React 还是 Vue，交付前至少要过这些门：

```bash
# 按项目实际脚本替换
npm run lint
npm run type-check
npm run build
npx playwright test
```

如果你是 `pnpm` / `turbo` 项目，通常会变成：

```bash
pnpm lint
pnpm typecheck
turbo run build test
```

相关入口：

- [`Bugfix / Refactor / Test` runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)
- [`Issue -> Draft PR` runbook](/docs/workflows/patterns/issue-to-draft-pr/runbook)
- [Claude Code bugfix 案例](/docs/case-studies/claude-code-bugfix-loop)

## 7. 上下文工程与 AI 协作

如果你希望 AI 稳定参与前端开发，就不能只给一句 prompt。你要给它的是上下文工程。

### Context7、Plan First、MCP

适合的分工是：

- `Context7`：需要最新官方文档时，用它补库和框架事实
- `Plan First`：复杂页面、组件重构、跨目录改动先出计划再改代码
- `MCP / 浏览器 / 设计上下文`：需要访问设计稿、页面状态、真实 DOM 时再接入

这类能力更适合复杂任务，例如：

- 大型页面从 Figma 到工程实现
- 设计系统重构
- 跨 React / Vue 项目的样式系统统一
- monorepo 跨包改动

推荐先读：

- [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)
- [Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)
- [Windsurf 快速开始](/docs/tools/ide-first/windsurf/quick-start)

## 8. 规范文档与协作约束

前端团队想把 AI 用稳，至少要把 repo 级契约写清楚，而不是把所有规则都留在聊天窗口里。

### `AGENTS.md` 适合写什么

更适合写 repo 级公共合同：

- 哪些目录能改，哪些目录不能碰
- 哪些命令必须跑
- 什么时候必须先出方案
- 提交和发布纪律
- 文档、测试、构建是否必须同改

### `CLAUDE.md` 适合写什么

更适合写工具如何读取前端项目上下文：

- 前端技术栈
- 目录结构和代码边界
- 默认验证命令
- 组件、hooks、stores、composables 的职责
- 常见例外和团队偏好

先读标准说明：

- [Repo instruction files](/docs/repo-instruction-files)
- [Claude Code rules / memory / tools](/docs/tools/terminal-agents/claude-code/rules-memory-tools)

### 最小前端 `AGENTS.md` 模板

```md
## Frontend Repo Rules

- Preserve existing React and Vue patterns before introducing new abstractions.
- Reuse shared components and design tokens before adding page-local variants.
- Run the relevant lint, type-check, build, and test commands before claiming completion.
- Complex UI or cross-directory changes require a written plan first.
- If a change affects routes, navigation, or docs links, update them in the same change.
```

### 最小前端 `CLAUDE.md` 模板

```md
# Frontend Project Context

## Stack
- React / Vue
- TypeScript
- Tailwind CSS
- Playwright

## Code Boundaries
- `src/components`: reusable UI
- `src/features`: business-facing modules
- `src/hooks` or `src/composables`: shared logic
- `src/styles` or theme tokens: visual system only

## Verification
- lint
- type-check
- build
- relevant tests
```

## 9. 前端常用 Skills

如果你的执行环境支持 skills，不要把它们理解成“额外花活”，而是理解成针对常见前端任务的标准化工作方式。

| 场景 | 推荐 skill | 用途 |
| --- | --- | --- |
| 设计稿转实现 | `figma` | 读取设计节点、截图、变量、设计上下文 |
| React 组件与页面重构 | `react-best-practices` | 约束组件边界、结构和可维护性 |
| TypeScript 组件模式 | `typescript-react-patterns` | 处理 props、事件、ref、泛型等问题 |
| 状态与数据流 | `state-management` | 处理 React Query、Zustand 或类似状态问题 |
| 浏览器验证 | `playwright` | 跑真实页面流程、截图、交互验证 |
| 交互式前端排查 | `playwright-interactive` | 持续浏览器调试和迭代 |
| 系统排障 | `systematic-debugging` | 先定位问题，再修问题 |
| 完成前验证 | `verification-before-completion` | 防止“看起来好了”却没跑验证 |
| 复杂需求落地 | `writing-plans` | 先拆实施计划，再动手 |
| 任何创意型改动 | `brainstorming` | 先澄清目标和结构，再实现 |

## 10. 模板、命令与下一步

### 设计到代码 Prompt

```text
根据以下 Figma / 设计描述生成首版页面骨架：
- 技术栈：[React / Vue]
- 样式系统：[Tailwind CSS / 现有设计系统]
- 目标：先拆页面区块和组件边界，再补具体细节
- 要求：保留可维护的组件结构，补充空态、加载态、错误态
- 约束：不要使用默认品牌配色；优先复用现有组件和 token
```

### 代码质量 Prompt

```text
请检查这个前端改动的工程质量：
- TypeScript 类型是否收口
- 是否违反现有 ESLint / Oxlint 规则
- 是否引入重复组件或样式
- 是否缺少必要的测试和验证命令
- 如需修改，请优先在现有结构上最小化调整
```

### 推荐阅读顺序

- 先跑主线：[30 分钟上手](/docs/start/30-minute-quick-start)
- 选入口工具：[Claude Code](/docs/tools/terminal-agents/claude-code/quick-start)、[Cursor](/docs/tools/ide-first/cursor/quick-start)、[Windsurf](/docs/tools/ide-first/windsurf/quick-start)
- 选稳定工作流：[Spec-First](/docs/workflows/patterns/spec-first/runbook)、[Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test/runbook)、[Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing)
- 补 repo 契约：[Repo instruction files](/docs/repo-instruction-files)
- 看交付案例：[Claude Code bugfix 案例](/docs/case-studies/claude-code-bugfix-loop)
