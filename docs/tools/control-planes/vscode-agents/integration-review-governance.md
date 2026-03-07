---
title: "VS Code Agents：集成、review 与治理"
description: "VS Code Agents 如何接工作系统、保留 review 证据并纳入治理。"
slug: "/tools/control-planes/vscode-agents/integration-review-governance"
sidebar_label: "集成与治理"
tags: ["ai-coding", "tool", "vscode-agents"]
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

# VS Code Agents：集成、review 与治理

工具一旦被组织当主入口，就必须回答三个问题：它怎么接入工作系统、证据回流到哪里、出了问题由谁负责。只有把这三件事说清，工具选型才算进入工程层。

## 工作系统集成

- 本地 agent、background agents 和第三方 agents。
- 编辑器内终端、浏览器工具和 diff 评审。
- 可与 GitHub 平台或终端执行栈组合。

## review 与证据

- 背景任务摘要、编辑器内 diff、命令结果和最终 PR 说明应形成一套完整证据。
- 不要只因为 editor 里看起来顺，就跳过平台 review。

## 治理边界

- 需要定义本地与后台 agent 的职责边界，以及何时必须升级到人工审批。
- 统一控制面会提升效率，也会把不清晰的任务定义放大得更快。

## 团队落地建议

- 先定义主入口和补位入口，再决定谁能进入标准栈。
- 所有工具最终都要回到 repo 规则、验证命令和 PR 审核。
- 如果一个工具的产物无法纳入证据链，就不应承担高风险任务。
