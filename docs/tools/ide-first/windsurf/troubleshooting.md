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

## 先判断是不是工作台知识和仓库事实分叉了

这页主要处理三类故障：

- product memory 堆积了一次性信息
- rules 只留在工作台，没有回写仓库
- 一体化体验很顺，但没人说得清最终验证依据

如果你的任务已经离开 IDE 主场，优先转 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。

## 常见卡点

- product memory 里堆了太多一次性任务说明。
- rules 只存在于 IDE 工作台，没有写回仓库。
- 一体化体验看起来顺，但没人能解释最终验证依据是什么。

## 症状到原因的快速对应

- 症状：同一仓库隔几天回来，工作台像记住了太多旧上下文。
  原因：一次性任务细节被长期保留在 memory。
- 症状：团队里只有你自己的工作台知道规则。
  原因：规则没有写回 repo。
- 症状：结果看起来顺畅，但你说不清为什么这样改。
  原因：验证和依据都被藏在工作台内部。

## 诊断顺序

1. 先回看 [Windsurf 快速开始](/docs/tools/ide-first/windsurf/quick-start) 里哪些规则应该写回 repo。
2. 再看当前任务是不是本就适合 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook) 这种小闭环。
3. 最后判断是否已经需要切到 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。

## 修复动作

### 场景 1：memory 堆了一次性信息

先删掉短期任务记忆，只保留长期稳定知识，例如：

- 仓库目录边界
- 默认验证命令
- 长期有效的团队偏好

### 场景 2：rules 没有写回 repo

把这几类信息写回仓库文件：

- 禁止修改区
- 验收命令
- 目录边界
- 团队约定

工作台可以帮你执行，但不该独占这些事实。

### 场景 3：验证依据说不清

回到仓库层面补齐：

- 执行过什么命令
- 看到了什么 diff
- 为什么这轮可以收口

如果这些都只能存在工作台里，那后续交接一定失真。

## 回退策略

- 把一次性记忆删除，只保留长期稳定规则。
- 把验证命令、目录边界和禁区写回仓库文件。
- 如果主要问题已经离开 IDE 内维护范畴，就切换到更合适的工作流。

## 下次避免再犯

- rules 先写 repo，workspace 只是读取和补位
- memory 只存长期稳定知识
- 每轮结束都把关键决定写回仓库可见位置

## 什么时候直接换工具

- 只要轻量 IDE 补位：换 [Cursor 常见任务](/docs/tools/ide-first/cursor/common-tasks)
- 需要开放式壳层：换 [Cline 常见任务](/docs/tools/terminal-agents/cline/common-tasks)
- 需要更长执行链路：换 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)

## 继续阅读

- [Windsurf 常见任务](/docs/tools/ide-first/windsurf/common-tasks)
- [Windsurf 最佳实践](/docs/tools/ide-first/windsurf/best-practices)
- [Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)

## 来源

- [Windsurf AGENTS.md Discovery](https://docs.windsurf.com/windsurf/cascade/agents-md)
- [Windsurf Memories](https://docs.windsurf.com/windsurf/cascade/memories)
- [Windsurf Cascade](https://docs.windsurf.com/windsurf/cascade/cascade)
