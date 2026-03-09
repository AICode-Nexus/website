---
title: "VS Code Agents 快速开始"
description: "先在本地读仓库，再把可执行部分交给 background agent，最后回到编辑器完成一次最小闭环。"
slug: "/tools/control-planes/vscode-agents/quick-start"
sidebar_label: "快速开始"
sidebar_position: 2
tags: ["ai-coding", "tool", "vscode-agents", "tutorial"]
track: "cross-track"
kind: "tutorial"
content_form: "tutorial"
audience: "mixed"
stage: "starter"
featured: false
domain: "tools"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["tool-quick-start", "vscode-agents"]
estimated_time: 25
prerequisites: ["VS Code Agents 已可用", "本地仓库能运行至少一个验证命令", "你能区分本地探索与后台执行的边界"]
deliverable: "一次从本地探索到 background agent 再回到编辑器验证的最小任务闭环"
---

# VS Code Agents 快速开始

## 前置条件

- 你已经看过 [VS Code Agents 概览](/docs/tools/control-planes/vscode-agents)，知道它更适合作为控制面，而不是唯一执行栈。
- 当前仓库至少有一个稳定验证命令。
- 这次任务足够小，能在一轮本地探索和一轮后台交接内完成。

## 步骤

### 第 1 步：先在本地写清本次边界

不要一打开工作区就直接把任务扔给 background agent。先写 4 行：

```text
目标：这次只交付什么
范围：只改哪些目录
不要做：明确不碰什么
验证：最后跑什么命令
```

如果你还没有 repo 合同文件，先补 [仓库规则文件体系](/docs/repo-instruction-files)。

### 第 2 步：让本地 agent 先做最小探索

本地阶段只做三件事：

1. 读相关代码和调用链。
2. 解释当前问题面和最小改动点。
3. 给出适合交给 background agent 的任务说明。

如果只是小修小补，也可以直接停在本地，改走 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

### 第 3 步：只把可执行部分交给 background agent

交接说明必须包含：

- 本地已经确认的结论
- 允许改动的目录
- 需要回传的验证结果
- 何时必须停下交还人工

这一段最适合配合 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook) 一起用。

### 第 4 步：回到编辑器审 diff 和验证结果

不要把 background agent 当黑盒。回到编辑器后，至少检查：

- diff 是否仍在本次目录边界内
- 验证命令是否真的执行过
- 说明里是否写明剩余风险

## 验证

第一次成功的标准不是“它会自动做很多事”，而是：

- 本地探索结果能清楚交接
- background agent 只执行了被授权的部分
- 你能在编辑器里看懂 diff、日志和验证结果

## 下一步

- 去 [VS Code Agents 常见任务](/docs/tools/control-planes/vscode-agents/common-tasks) 固定 3 类高频 SOP。
- 如果交接总是失真，去 [VS Code Agents 排错](/docs/tools/control-planes/vscode-agents/troubleshooting)。
- 如果你想把这种节奏变成长期习惯，去 [VS Code Agents 最佳实践](/docs/tools/control-planes/vscode-agents/best-practices)。

## 来源

- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
