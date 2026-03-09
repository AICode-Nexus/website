---
audience: "individual"
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
title: "Windsurf：规则、记忆与工具边界"
description: "Windsurf 的 rules、memory、tools 与 repo 接入建议。"
slug: "/tools/ide-first/windsurf/rules-memory-tools"
sidebar_label: "补充：规则与边界"
sidebar_position: 7
tags: ["ai-coding", "tool", "windsurf"]
---

# Windsurf：规则、记忆与工具边界

## 现在先做什么

- 第一次厘清工作台规则边界：去 [Windsurf 快速开始](/docs/tools/ide-first/windsurf/quick-start)。
- 想把工作台习惯稳定下来：去 [Windsurf 最佳实践](/docs/tools/ide-first/windsurf/best-practices)。
- 想先把 repo 规则与记忆边界写清：去 [仓库规则文件体系](/docs/repo-instruction-files)。

## 什么时候读这页

- 你准备长期把 Windsurf 当工作台，而不是只偶尔试用。
- 你在决定 AGENTS.md、Cascade memories 和内部 rules 谁优先。
- 你想避免工作台记忆变成唯一知识源。

## 应该写进 repo 的东西

- AGENTS.md、目录边界、验证命令和必须跟 PR 一起走的交付证据。
- 规则优先级、handoff 条件和谁能改高风险目录。
- 需要跨工具复用的项目事实，不要只留在 memories 里。

## 只留在工具里的东西

- 工作台内的个人偏好、短期会话上下文和临时任务连续性。
- 单次维护任务中的临时提醒，不值得版本化的微型习惯。
- 便于连续操作的 memories，但不能代替仓库合同。

## 失控信号

- 入口一换，关键规则和上下文就全部消失。
- 团队说不清 memories、repo 合同和 review 证据分别在哪。
- 工作台里能看到“完成”，但仓库里找不到对应验证或 handoff 说明。

## 读完回哪里

- 想先把边界定住：回 [Windsurf 快速开始](/docs/tools/ide-first/windsurf/quick-start)。
- 想看长期使用的稳定写法：去 [Windsurf 最佳实践](/docs/tools/ide-first/windsurf/best-practices)。
- 想把 repo 规则文件重新梳理：去 [仓库规则文件体系](/docs/repo-instruction-files)。

## 来源

- [Windsurf AGENTS.md Discovery](https://docs.windsurf.com/windsurf/cascade/agents-md)
- [Windsurf Memories](https://docs.windsurf.com/windsurf/cascade/memories)
- [Windsurf Cascade](https://docs.windsurf.com/windsurf/cascade/cascade)
