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
title: "VS Code Agents：规则、记忆与工具边界"
description: "VS Code Agents 的 rules、memory、tools 与 repo 接入建议。"
slug: "/tools/control-planes/vscode-agents/rules-memory-tools"
sidebar_label: "补充：规则与边界"
sidebar_position: 7
tags: ["ai-coding", "tool", "vscode-agents"]
---

# VS Code Agents：规则、记忆与工具边界

## 现在先做什么

- 第一次进入控制面：去 [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start)。
- 想把它用成长期系统：去 [VS Code Agents 最佳实践](/docs/tools/control-planes/vscode-agents/best-practices)。
- 想先把仓库规则写清：去 [仓库规则文件体系](/docs/repo-instruction-files)。

## 什么时候读这页

- 你已经开始长期使用 VS Code Agents，想判断哪些规则该写回 repo。
- 你发现 background task、会话状态和仓库事实开始分叉。
- 你要定义本地与后台 agent 的职责边界。

## 应该写进 repo 的东西

- 目录边界、禁止修改区和必跑命令。
- 本地与后台 handoff 的最小合同。
- review 说明和接管条件。

## 只留在工具里的东西

- 当前工作区的短期状态。
- 只对编辑器控制面有意义的操作习惯。
- 暂时不值得沉淀成仓库公共规范的偏好。

## 失控信号

- 编辑器配置已经变成第二套事实来源。
- background task 产物无法回到仓库或 PR 证据里解释。
- 团队成员说不清哪些规则来自 repo，哪些来自工作台。

## 读完回哪里

- 想先整理规则源头：回 [仓库规则文件体系](/docs/repo-instruction-files)。
- 想把这些边界用进日常协作：回 [VS Code Agents 最佳实践](/docs/tools/control-planes/vscode-agents/best-practices)。
- 想继续看真实工作系统接入：去 [VS Code Agents：集成、review 与治理](/docs/ecosystem/integrations/vscode-agents)。

## 来源

- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
