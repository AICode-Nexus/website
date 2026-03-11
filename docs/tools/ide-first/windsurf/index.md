---
audience: "individual"
stage: "intermediate"
featured: true
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "cross-track"
domain: "tools"
journey_stage: "tech-selection"
title: "Windsurf"
description: "Windsurf 的角色定位、最佳使用者和默认工作方式。"
slug: "/tools/ide-first/windsurf"
sidebar_label: "概览"
tags: ["ai-coding", "tool", "windsurf"]
---

import {LearningResources} from '@site/src/components/docs';

# Windsurf

Windsurf 的合理定位不是“另一个 IDE 插件”，而是一套整合好的 workspace。它把 Cascade、memories、rules、AGENTS.md 发现和模型管理收成了更产品化的日常工作流。

## 现在先做什么

- 第一次跑通 IDE 工作台闭环：去 [Windsurf 快速开始](/docs/tools/ide-first/windsurf/quick-start)。
- 想固定 IDE 高频 SOP：去 [Windsurf 常见任务](/docs/tools/ide-first/windsurf/common-tasks)。
- 想直接进入最自然的维护主线：去 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

## 60 秒定位

如果你要的是比较完整的一体化工作台，而不是自己拼装 IDE 插件、规则和记忆系统，Windsurf 很合适。它擅长维持连续式 IDE 工作流，让模型切换、workspace 上下文和规则体系尽量少暴露在用户面前。

但一体化体验也容易把规则和记忆藏在产品内部。真正决定它是否合理的，不是工作台看起来有多顺，而是 repo 合同、验证命令和 review 证据能不能稳定地回到公共系统里。

## 默认进入顺序

1. 先用 [Windsurf 快速开始](/docs/tools/ide-first/windsurf/quick-start) 跑通工作台里的最小闭环。
2. 再用 [Windsurf 常见任务](/docs/tools/ide-first/windsurf/common-tasks) 固定高频维护、规则和记忆操作。
3. 然后进入 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook) 或 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
4. 长期使用前再补 [Windsurf 最佳实践](/docs/tools/ide-first/windsurf/best-practices) 和 [Windsurf 排错](/docs/tools/ide-first/windsurf/troubleshooting)。

## 快速判断矩阵

| 判断维度 | 如果你满足这个条件 | 默认建议 |
| --- | --- | --- |
| 主控制面 | 你希望把规则、记忆、模型和 IDE 体验收进一个产品里。 | 先把 Windsurf 当工作台，再用平台层做正式收口。 |
| 任务形状 | 基于 rules 和记忆的连续式 IDE 工作流和高频维护任务。 | 先跑 [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test)。 |
| 团队约束 | 团队愿意把 repo 合同写在公共文件里，不让记忆层变成唯一知识源。 | 先理顺 AGENTS.md、规则和 memory 边界，再扩大使用面。 |
| 退出信号 | 团队无法解释 memories、rules 与 repo contract 的边界。 | 一旦出现这些信号，就优先评估 [Cursor](/docs/tools/ide-first/cursor) 或 [GitHub Copilot](/docs/tools/platforms/github-copilot)。 |

## 谁最适合用

- 想要一体化 IDE 工作台而不是自己拼装工具链的人。
- 重视连续上下文、rules 和记忆接续的个人和小团队。
- 希望把 AGENTS.md 发现、workspace 和记忆层收进一个产品的人。
- 更看重产品化体验，而不是开放壳层自由度的人。

## 不要期待它做什么

- 不要期待它替代开放工具栈和正式执行栈。
- 不要期待记忆层可以长期充当唯一知识源。
- 不要期待工作台内部状态能天然变成公共 review 证据。

## 团队采用前检查

- AGENTS.md、产品内 rules 和记忆层的优先级是否已经讲清。
- 关键结论能否稳定回写到 repo、PR 或任务系统。
- 团队是否真的需要一体化工作台，而不是更轻或更开放的入口。
- 如果记忆层开始失控，是否知道切去 [Cursor](/docs/tools/ide-first/cursor) 或 [GitHub Copilot](/docs/tools/platforms/github-copilot)。

## 默认人工接管点

- repo 级事实、验证命令和 handoff 条件必须写回公共文件，不要只藏在 memories 里。
- 当工作台换人或换入口时，规则仍应成立，不能完全依赖产品内状态。
- 复杂任务真正进入正式交付时，要能回到 PR、diff 和 review 证据，不要只留在工作台会话里。

## 官方依据

- [Windsurf AGENTS.md Discovery](https://docs.windsurf.com/windsurf/cascade/agents-md)
- [Windsurf Memories](https://docs.windsurf.com/windsurf/cascade/memories)
- [Windsurf Cascade](https://docs.windsurf.com/windsurf/cascade/cascade)

## 下一步怎么读

- 想直接上手：去 [Windsurf 快速开始](/docs/tools/ide-first/windsurf/quick-start)。
- 想按默认维护主线跑：去 [Bugfix / Refactor / Test](/docs/workflows/patterns/bugfix-refactor-test)。
- 想看真实工作台到 PR 交接：去 [Windsurf 维护到 PR 交接案例](/docs/case-studies/windsurf-maintenance-to-pr)。
- 想比较它和其他 IDE/终端入口：去 [Cursor、Windsurf 与 Cline 怎么看](/docs/tools/compare/cursor-vs-windsurf-vs-cline)。

<LearningResources
  tool="Windsurf"
  description="如果你已经确认这类入口值得继续深入，下面这些课程和公开视频可以直接补齐操作层细节。"
/>
