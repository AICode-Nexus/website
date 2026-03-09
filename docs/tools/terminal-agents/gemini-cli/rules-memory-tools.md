---
audience: "mixed"
stage: "intermediate"
featured: false
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "cross-track"
domain: "tools"
journey_stage: "implementation"
title: "Gemini CLI：规则、记忆与工具边界"
description: "Gemini CLI 的 rules、memory、tools 与 repo 接入建议。"
slug: "/tools/terminal-agents/gemini-cli/rules-memory-tools"
sidebar_label: "补充：规则与边界"
sidebar_position: 7
tags: ["ai-coding", "tool", "gemini-cli"]
---

# Gemini CLI：规则、记忆与工具边界

## 现在先做什么

- 第一次进入终端主入口：去 [Gemini CLI 快速开始](/docs/tools/terminal-agents/gemini-cli/quick-start)。
- 想让它长期稳定工作：去 [Gemini CLI 最佳实践](/docs/tools/terminal-agents/gemini-cli/best-practices)。
- 想先把 repo 规则边界写清：去 [仓库规则文件体系](/docs/repo-instruction-files)。

## 什么时候读这页

- 你已经开始长期依赖 GEMINI.md 或等价 context file。
- 你发现规则和一次性任务说明开始混在一起。
- 你想把终端入口和 PR 证据链接起来。

## 应该写进 repo 的东西

- 目录边界、禁止事项和必跑命令。
- 最小交付说明模板。
- 和 PR / review 对齐的验证口径。

## 只留在工具里的东西

- 当前任务的短期上下文。
- 不值得沉淀成公共规范的操作习惯。
- 一次性巡检或试跑结论。

## 失控信号

- GEMINI.md 已经写成无人维护的大块说明。
- 终端输出无法回到真实命令和 PR 证据。
- 团队说不清哪些规则属于 repo，哪些只属于 Gemini CLI。

## 读完回哪里

- 想先整理规则源头：回 [仓库规则文件体系](/docs/repo-instruction-files)。
- 想把这些边界用到日常执行：回 [Gemini CLI 最佳实践](/docs/tools/terminal-agents/gemini-cli/best-practices)。
- 想继续看真实工作系统接入：去 [Gemini CLI：集成、review 与治理](/docs/ecosystem/integrations/gemini-cli)。

## 来源

- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [Gemini CLI Context Files](https://google-gemini.github.io/gemini-cli/docs/cli/configuration/#context-files)
