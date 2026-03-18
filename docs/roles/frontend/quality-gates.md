---
title: 质量门禁
description: 把 TypeScript、ESLint、Oxlint、构建验证和 review 证据串成前端 AI 的默认质量护栏。
sidebar_label: 质量门禁
tags: [ai-coding, frontend, typescript, lint]
track: cross-track
kind: guide
content_form: guide
audience: frontend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: testing-validation
entry_role: domain
reviewed_at: 2026-03-16
source_window_end: 2026-03-16
market_status: current
slug: /roles/frontend/quality-gates
---

# 质量门禁

让 AI 参与前端开发，不是让它“先写出来再说”，而是让它在受控边界里写、在明确命令里验证、在有证据的 review 里交付。真正的质量门禁不是一个 lint 命令，而是一条分层责任链。

## 三层门禁图

![前端质量门禁图](/img/roles/frontend/quality-gates-ladder.svg)

## 写码时、评审时、发布前分别看什么

| 阶段 | 核心问题 | 典型工具 |
| --- | --- | --- |
| 写码时 | 代码结构和类型是否在边界内 | `TypeScript`、`ESLint`、`Oxlint`、格式化层 |
| 评审时 | 抽象是否合理，改动是否扩散 | PR review、架构检查、规则文件 |
| 发布前 | 构建、回归、关键路径是否可复现 | `build`、组件测试、Playwright、截图比对 |

## TypeScript、ESLint、Oxlint 如何分工

| 工具 | 主要职责 | 前端常见收益 |
| --- | --- | --- |
| TypeScript | 收紧 props、事件、数据模型和边界 | 减少组件重构时的隐性破坏 |
| ESLint | 表达长期工程规则 | 组件职责、导入约束、hooks/composables 规范 |
| Oxlint | 提供更快的静态检查反馈 | 批量扫描可疑模式、降低反馈等待时间 |
| 格式化层 | 压平无价值样式争议 | 减少 review 把时间花在排版上 |

如果只能保留一件事，那就先让 AI 不能随意引入 `any`、硬编码路径和未受控的共享抽象。

## 代码案例：前端项目的最小门禁脚本

```json
{
  "scripts": {
    "lint": "eslint . --max-warnings=0",
    "lint:fast": "oxlint .",
    "typecheck": "tsc --noEmit",
    "test:unit": "vitest run",
    "test:e2e": "playwright test",
    "verify:frontend": "npm run lint && npm run lint:fast && npm run typecheck && npm run test:unit && npm run build"
  }
}
```

```js
export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'no-restricted-imports': ['error', {patterns: ['../*../*']}],
      'react/jsx-no-useless-fragment': 'error',
    },
  },
];
```

## 代码案例：PR 必须带上的验证说明

```md
## Verification

- `npm run lint`
- `npm run typecheck`
- `npm run test:unit`
- `npm run build`
- `npx playwright test tests/pricing-smoke.spec.ts`

## Risk

- 仅覆盖了 pricing 页面关键路径，尚未覆盖支付接入后的真实回调。
- 已人工验证 360px / 768px / 1280px 三个断点。
```

## Review 时最该盯的不是格式，而是这 5 件事

- 组件边界有没有变差，页面私有逻辑是不是被过早抽到共享层。
- 内容配置、路由常量、卡片元数据是否散落在多个组件文件里。
- 样式是否绕过 token、CSS variables 和设计系统变体直接硬写。
- 数据获取和本地状态是否混在一起，导致后续调试困难。
- 验证结果是否真实覆盖了这次改动的关键路径。

## 发布前至少要有这些证据

| 改动类型 | 最少证据 |
| --- | --- |
| 纯展示层改动 | lint、typecheck、build、关键断点截图 |
| 组件行为改动 | 上述全部 + 单测或组件测试 |
| 页面交互/流程改动 | 上述全部 + Playwright 冒烟路径 |
| 共享 UI 或 token 改动 | 上述全部 + 影响面说明 + 回归范围 |

## 前端验证证据图

![前端验证证据图](/img/roles/frontend/frontend-verification-evidence.svg)

如果你要把质量门禁讲清楚，这张图比单纯一串命令更有用，因为它把验证拆成作者侧、预览侧、流程侧和交付侧。前端最常见的失真就是只跑命令、不交截图；或者只贴截图、不说明命令和未覆盖风险。

## 门禁合同模板

下面这份模板适合直接放进真实任务 brief 或 `AGENTS.md` 的前端章节里：

```yaml
quality_contract:
  must_run:
    - "npm run lint"
    - "npm run typecheck"
    - "npm run build"
  when_interaction_changes:
    - "补组件测试或关键路径 Playwright"
  media_evidence:
    - "桌面端关键截图"
    - "移动端关键截图"
    - "必要时补 15-30 秒录屏"
  review_questions:
    - "是否新增未受控共享抽象"
    - "是否绕过 token 或目录合同"
    - "是否说明未覆盖风险"
```

模板的价值在于把“跑什么”和“交什么”同时写出来。只规定命令，团队会忘记截图和录屏；只规定截图，又会缺少可复现的自动化证据。

## 改动类型到验证矩阵

| 改动形状 | 必跑命令 | 补充证据 | 为什么 |
| --- | --- | --- | --- |
| 文案或静态排版微调 | `lint`、`typecheck`、`build` | 断点截图 | 防止布局在窄屏断裂 |
| 组件行为变化 | 上述全部 + 组件测试 | 状态对照图、录屏 | 防止事件、禁用态和键盘行为漂移 |
| 页面流程变化 | 上述全部 + Playwright smoke | 关键路径录屏、风险说明 | 防止“功能能跑但路径断裂” |
| 共享 UI 或 token 变化 | 上述全部 + 受影响页面抽样回归 | 影响面清单 | 防止单点改动扩散成全站回归 |

一旦矩阵明确，AI 产出的验证计划也会更稳。它不必猜“这次要不要跑 E2E”，只需要根据改动形状映射到既有合同。

## Review 时最值得问的 7 个问题

1. 这次 diff 是否引入了新的共享抽象，如果有，它真的跨页面复用吗。
2. 内容配置、路由或卡片元数据有没有从集中配置被写回组件内部。
3. 样式是否绕过了语义 token 和既有变体。
4. 状态边界有没有变差，比如把远程数据塞进本地 store。
5. 本次验证是否覆盖了最容易坏掉的断点、状态和关键路径。
6. 截图或录屏是否真的对应这次 diff，而不是重复旧证据。
7. PR 是否明确说明了未覆盖部分和剩余风险。

这些问题比“代码风格是否统一”更能决定最终质量，因为 AI 最容易在架构边界和验证完整性上犯大错，而不是缩进。

## 质量门禁案例地图

质量门禁页不该只停在“跑哪些命令”。更关键的是看真实任务里，验证证据、风险说明和 review 问题是怎么一起出现的：

| 现在的任务形状 | 先看哪篇案例 | 为什么值得搭配本页 |
| --- | --- | --- |
| 高风险 bug 或交互回归，需要最小修复和最短验证闭环 | [Claude Code Bugfix 闭环案例](/docs/case-studies/claude-code-bugfix-loop) | 最适合看“修复范围控制 + 命令结果 + 关键路径验证” |
| 跨模块重构，但仍要按阶段给出验证证据 | [OpenAI Codex 重构与验证案例](/docs/case-studies/codex-refactor-with-verification) | 适合看长链路改动如何保留计划、验证和风险说明 |
| 先做仓库巡检，再写 reviewer 可读的交付摘要 | [Gemini CLI 终端巡检到 Draft PR 案例](/docs/case-studies/gemini-cli-terminal-audit-to-draft-pr) | 适合对照命令、影响面、风险和 PR 说明怎么串起来 |

看这些案例时，建议只盯四类证据：

1. 哪些命令必须跑，哪些命令没跑但被明确说明。
2. 截图或录屏有没有覆盖真正高风险的断点和状态。
3. review 问题是否直接指向边界、共享层和风险，而不是只看格式。
4. 交付摘要里有没有清楚说明未覆盖项。

## 团队训练任务

| 训练任务 | 练什么 | 输出物 |
| --- | --- | --- |
| 任务 1：给一个已有页面补完整门禁 | 建立“命令 + 证据”的组合意识 | 验证清单、截图、命令结果 |
| 任务 2：审查一个故意设计得很糟的 PR | 练 review 提问能力 | review 问题单、风险说明 |
| 任务 3：把门禁写回仓库规则 | 练长期治理 | `AGENTS.md` 片段、PR 模板片段 |

## 证据包最小结构

```text
verification/
  pricing/
    commands.md
    desktop.png
    mobile.png
    interaction.mp4
    risks.md
```

把验证结果组织成固定结构的好处是，review 人和后续维护者都知道应该去哪里找命令、截图和风险说明。对 AI 来说，这也意味着“补验证”可以成为明确的目录更新任务，而不是模糊的聊天补充。

## 发布前口头报告模板

很多团队已经能跑命令，但还不会把验证结果说清楚。前端负责人在发布前最值得要求的，其实是下面这段口头报告结构：

1. 这次改动影响了哪些页面、组件、token 或目录。
2. 哪些命令已经跑过，哪些还没跑，原因是什么。
3. 哪些截图、录屏和关键路径已经覆盖。
4. 还有哪些未覆盖风险，需要上线后继续关注。

一旦口头报告也被结构化，质量门禁就不再只是一组脚本，而会变成团队日常协作语言的一部分。

## 截图、录屏与命令如何配合

前端质量门禁最容易失真的地方，是三类证据彼此脱节：命令已经跑完，但没人知道 UI 到底长什么样；截图已经贴了，但无法证明真实路径能走通；录屏已经录了，却没有说明它对应哪次构建和哪份 diff。更稳的做法是把三者绑定：

- 命令结果证明“构建与静态检查没有坏”。
- 截图证明“关键断点和状态没有坏”。
- 录屏证明“最容易翻车的交互路径没有坏”。

只要这三类证据一起存在，review 才会真正高效。

## 门禁巡检节奏

建议团队至少每月做一次前端门禁巡检，问题只看三类：哪些规则已经形同虚设、哪些命令太慢导致大家不愿意跑、哪些验证虽然存在但没有形成可复用证据。把这些巡检结果写回规则和模板后，质量门禁才会持续进化，而不是停留在一次性搭好的脚本集合。

对带团队的人来说，这一段尤其重要：门禁不是一次性搭建项目，而是持续运营项目。只要巡检停了，规则很快就会和真实代码脱节。

所以这页真正想强调的是：前端质量门禁既是技术问题，也是管理问题。命令、截图、录屏和 review 提问，缺任何一项都很难形成稳定闭环。

只有当这些内容被持续写进规则、模板和 PR 习惯里，门禁才不会随着人员变化而失效。

也就是说，质量门禁最终保护的不是某一次提交，而是团队长期的改动质量。

它保护的是长期节奏。

也保护协作。

## 配套图片与视频

- 本页顶部已经补齐质量门禁图，适合直接嵌入培训材料。
- 想看 bugfix 到验证的操作录像：去 [实战演示](/docs/resources/hands-on-demos) 搜 `review`、`test`、`playwright`。
- 想把门禁接回工作流：去 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 想对齐站点级质量标准：去 [Review Quality Gates](/docs/standards/review-quality-gates)。
- 想看真实验证闭环：去 [Claude Code Bugfix 闭环案例](/docs/case-studies/claude-code-bugfix-loop)、[OpenAI Codex 重构与验证案例](/docs/case-studies/codex-refactor-with-verification)、[Gemini CLI 终端巡检到 Draft PR 案例](/docs/case-studies/gemini-cli-terminal-audit-to-draft-pr)。
- 想继续补交付收口：下一页看 [测试与交付](/docs/roles/frontend/testing-and-delivery)。
