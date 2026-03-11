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

## 先判断是不是 handoff 问题

这页主要处理三类故障：

- 本地探索没产出可交接 brief
- background agent 执行越界或回传结果太虚
- 编辑器阶段没有真正承担最终审阅

如果你的问题只是单轮 IDE 小任务，就不要套三段 handoff，先回 [Cursor 排错](/docs/tools/ide-first/cursor/troubleshooting)。

## 常见卡点

- 本地阶段没有写 brief，就直接把任务扔给 background agent。
- 后台结果回来了，但没人回到编辑器里看 diff 与日志。
- 一个任务明明很小，却硬切成本地、后台、平台三段，反而更慢。

## 症状到原因的快速对应

- 症状：background agent 每次都自己扩范围。
  原因：brief 没写目录边界和停止条件。
- 症状：回来的结果看似完整，但你解释不清做了什么。
  原因：没有在编辑器里重新审 diff 和日志。
- 症状：流程很复杂，但速度还不如本地直接改。
  原因：任务规模不值得三段切换。

## 诊断顺序

1. 先看 [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start) 里的边界是否真的写过。
2. 再看交接内容有没有目录范围、验证命令和停止条件。
3. 最后看当前任务是不是其实该退回 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

## 修复动作

### 场景 1：本地阶段没产出结构化 brief

不要继续追加聊天解释，直接补一份结构化 handoff：

- 目标
- 已确认事实
- 允许改动目录
- 验证命令
- 停止条件

如果本地阶段连这些都写不出来，说明还不该交后台。

### 场景 2：background agent 越界或回报太虚

先不要继续下一轮。收紧两件事：

- 允许改动目录
- 必须回传的证据格式

要求下一轮只回报真实命令结果、改动文件和剩余风险，不要只给一句“完成了”。

### 场景 3：编辑器阶段失位

如果你没有回到编辑器里看 diff、日志和验证结果，那 VS Code Agents 的控制面价值根本没发挥出来。把最终收口动作补回去：

- 在编辑器里审 diff
- 复核日志和命令
- 决定是继续、回退，还是切换入口

## 回退策略

- 如果 background agent 经常越界，先缩回本地执行，只保留编辑器内最小任务。
- 如果交接总是失真，先要求本地阶段固定产出结构化 brief。
- 如果任务天然是多阶段的，就改用 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook) 明确阶段与产物。

## 下次避免再犯

- 本地阶段统一使用同一份 brief 模板
- background agent 一律带目录边界和停止条件
- 编辑器阶段必须有人工最终判断，不允许默认自动继续

## 什么时候直接换工具

- 只是本地小修：改 [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks) 或 [Cursor 常见任务](/docs/tools/ide-first/cursor/common-tasks)
- 需要强执行栈：补 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)
- 最终主要在平台交付：接 [GitHub Copilot 常见任务](/docs/tools/platforms/github-copilot/common-tasks)

## 继续阅读

- [VS Code Agents 常见任务](/docs/tools/control-planes/vscode-agents/common-tasks)
- [VS Code Agents 最佳实践](/docs/tools/control-planes/vscode-agents/best-practices)
- [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)

## 来源

- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
