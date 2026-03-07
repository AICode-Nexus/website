---
title: "Gemini CLI：规则、记忆与工具边界"
description: "Gemini CLI 的 rules、memory、tools 与 repo 接入建议。"
slug: "/tools/terminal-agents/gemini-cli/rules-memory-tools"
sidebar_label: "规则记忆与工具"
tags: ["ai-coding", "tool", "gemini-cli"]
track: "cross-track"
kind: "guide"
audience: "mixed"
stage: "intermediate"
featured: false
pillar: "tools"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Gemini CLI：规则、记忆与工具边界

一旦一个工具开始支持 rules、memory、background task 或 MCP，它就不只是“会写代码的 UI”，而是在参与团队治理。规则写在哪、状态留在哪、工具权限怎么管，决定了这个入口能不能长期存在。

## rules 与上下文

- GEMINI.md 或等价 context files 是它进入 repo 的主要长期资产。
- 这些 context files 应该只写 repo 级规则，不要把一次性任务说明也长期固化进去。
- 如果仓库里同时存在多种指令文件，必须定义它们的职责边界。

## 记忆与状态

- 更偏向 repo context files 和当前任务上下文，而不是复杂的长期个体记忆。
- 适合把稳定规则版本化，而不是让用户每次重述。

## tools / approvals / 执行边界

- 终端命令、仓库上下文文件和脚本化任务。
- 更适合与 GitHub/CI 组合，而不是单独承担全部工作流。

## 仓库接入建议

- 先写一版最小 GEMINI.md，只保留目录边界、验证命令和禁止事项。
- 保持 context files 简洁，否则很快变成无人维护的大块说明。
- 把验证命令写成脚本，减少不同终端入口之间的语义漂移。
