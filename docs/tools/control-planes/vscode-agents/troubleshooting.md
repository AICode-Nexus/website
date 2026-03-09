---
title: "VS Code Agents 排错"
description: "当本地探索、后台交接和编辑器审阅之间失去节奏时，优先排查边界、brief 和验证证据。"
slug: "/tools/control-planes/vscode-agents/troubleshooting"
sidebar_label: "排错"
sidebar_position: 4
tags: ["ai-coding", "tool", "vscode-agents", "troubleshooting"]
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

# VS Code Agents 排错

## 常见卡点

- 本地阶段没有写 brief，就直接把任务扔给 background agent。
- 后台结果回来了，但没人回到编辑器里看 diff 与日志。
- 一个任务明明很小，却硬切成本地、后台、平台三段，反而更慢。

## 诊断顺序

1. 先看 [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start) 里的边界是否真的写过。
2. 再看交接内容有没有目录范围、验证命令和停止条件。
3. 最后看当前任务是不是其实该退回 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

## 回退策略

- 如果 background agent 经常越界，先缩回本地执行，只保留编辑器内最小任务。
- 如果交接总是失真，先要求本地阶段固定产出结构化 brief。
- 如果任务天然是多阶段的，就改用 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook) 明确阶段与产物。

## 继续阅读

- [VS Code Agents 常见任务](/docs/tools/control-planes/vscode-agents/common-tasks)
- [VS Code Agents 最佳实践](/docs/tools/control-planes/vscode-agents/best-practices)
- [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)

## 来源

- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
