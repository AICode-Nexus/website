---
title: "Gemini CLI 排错"
description: "当 Gemini CLI 开始只剩聊天或 context file 失控时，优先排查规则粒度、命令证据和任务规模。"
slug: "/tools/terminal-agents/gemini-cli/troubleshooting"
sidebar_label: "排错"
sidebar_position: 4
tags: ["ai-coding", "tool", "gemini-cli", "troubleshooting"]
track: "cross-track"
kind: "guide"
content_form: "guide"
audience: "mixed"
stage: "starter"
featured: false
domain: "tools"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
---

# Gemini CLI 排错

## 先判断是不是轻量入口被用重了

这页主要处理三类故障：

- context file 膨胀失控
- 输出只有聊天，没有命令证据
- 本来该交更强入口的任务，被硬塞进轻量 CLI

如果你已经明显需要多阶段执行，不要继续在这页找优化，直接转 [OpenAI Codex 排错](/docs/tools/execution-stacks/openai-codex/troubleshooting)。

## 常见卡点

- context file 写得太大，CLI 每轮都在重复解释规则。
- 输出只剩自然语言总结，没有真实命令和结果。
- 复杂任务硬塞进轻量 CLI，最后又要换别的入口收尾。

## 症状到原因的快速对应

- 症状：每轮先花很多篇幅重复规则。
  原因：context file 承载了太多一次性信息。
- 症状：看起来说得很多，但没有任何可复验命令。
  原因：没有把命令回报写成硬要求。
- 症状：任务越做越大，最后还得换工具重来。
  原因：入口选错了。

## 诊断顺序

1. 先回看 [Gemini CLI 快速开始](/docs/tools/terminal-agents/gemini-cli/quick-start) 的最小规则是否仍然清晰。
2. 再看任务是不是其实更适合 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook) 或 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
3. 最后看团队是否真的愿意维护 context file。

## 修复动作

### 场景 1：context file 太大

先缩回到三类信息：

- 允许改动目录
- 禁止改动目录
- 默认验证命令与输出要求

不要把本轮临时任务说明长期放进去。

### 场景 2：没有命令证据

把要求改成：

- 先复述规则
- 再执行命令
- 最后回报真实结果

没有命令结果，这轮就算没完成。

### 场景 3：任务超出轻量入口

如果开始出现阶段拆分、跨模块实现或长链路 handoff，就不要继续补 prompt。直接切换到更适合的入口。

## 回退策略

- 把 context file 缩回目录边界、验证命令和禁止事项三类信息。
- 要求每轮输出都带真实命令结果。
- 如果任务已经明显需要并行或长阶段推进，就切到 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)。

## 下次避免再犯

- context file 只写长期稳定信息
- 每轮都要求真实命令和结果
- 巡检、维护、PR 说明之外的任务，不默认交 Gemini CLI

## 什么时候直接换工具

- 更强 repo pairing：换 [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks)
- 更长阶段执行：换 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)
- 平台内收口：接 [GitHub Copilot 常见任务](/docs/tools/platforms/github-copilot/common-tasks)

## 继续阅读

- [Gemini CLI 常见任务](/docs/tools/terminal-agents/gemini-cli/common-tasks)
- [Gemini CLI 最佳实践](/docs/tools/terminal-agents/gemini-cli/best-practices)
- [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)

## 来源

- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [Gemini CLI Context Files](https://google-gemini.github.io/gemini-cli/docs/cli/configuration/#context-files)
