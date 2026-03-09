---
title: "Windsurf 排错"
description: "当 Windsurf 的规则、记忆和仓库事实开始分叉时，优先排查哪些信息该留在产品内，哪些必须写回 repo。"
slug: "/tools/ide-first/windsurf/troubleshooting"
sidebar_label: "排错"
sidebar_position: 4
tags: ["ai-coding", "tool", "windsurf", "troubleshooting"]
track: "cross-track"
kind: "guide"
content_form: "guide"
audience: "individual"
stage: "starter"
featured: false
domain: "tools"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
---

# Windsurf 排错

## 常见卡点

- product memory 里堆了太多一次性任务说明。
- rules 只存在于 IDE 工作台，没有写回仓库。
- 一体化体验看起来顺，但没人能解释最终验证依据是什么。

## 诊断顺序

1. 先回看 [Windsurf 快速开始](/docs/tools/ide-first/windsurf/quick-start) 里哪些规则应该写回 repo。
2. 再看当前任务是不是本就适合 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook) 这种小闭环。
3. 最后判断是否已经需要切到 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。

## 回退策略

- 把一次性记忆删除，只保留长期稳定规则。
- 把验证命令、目录边界和禁区写回仓库文件。
- 如果主要问题已经离开 IDE 内维护范畴，就切换到更合适的工作流。

## 继续阅读

- [Windsurf 常见任务](/docs/tools/ide-first/windsurf/common-tasks)
- [Windsurf 最佳实践](/docs/tools/ide-first/windsurf/best-practices)
- [Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)

## 来源

- [Windsurf AGENTS.md Discovery](https://docs.windsurf.com/windsurf/cascade/agents-md)
- [Windsurf Memories](https://docs.windsurf.com/windsurf/cascade/memories)
- [Windsurf Cascade](https://docs.windsurf.com/windsurf/cascade/cascade)
