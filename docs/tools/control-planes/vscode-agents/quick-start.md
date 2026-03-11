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

## 这页适合什么场景

- 你想把编辑器当控制面，而不是唯一执行层。
- 这次任务适合先本地收敛，再交给 background agent 执行。
- 你需要验证的是 handoff 质量，而不是单轮回答质量。

## 前置条件

- 你已经看过 [VS Code Agents 概览](/docs/tools/control-planes/vscode-agents)，知道它更适合作为控制面，而不是唯一执行栈。
- 当前仓库至少有一个稳定验证命令。
- 这次任务足够小，能在一轮本地探索和一轮后台交接内完成。

## 20 到 25 分钟交付目标

第一次 quick start 只需要做到：

- 本地阶段把问题面、边界和交接说明写清楚。
- background agent 只执行被授权的那一段。
- 你回到编辑器后，能看懂 diff、日志和验证结果。

## 推荐第一条任务

第一次建议选：

- 一个定位点已经比较明确的 bugfix
- 一次局部实现补全
- 一段能明确区分“本地分析”和“后台执行”的维护任务

第一次不要选：

- 需要大量反复交互的 UI 微调
- 还没想清楚边界的大 feature
- 没有任何验证命令的仓库

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

第一次最好把本地探索结果收成这三项：

- 当前判断成立的依据
- 允许改动的目录
- 必须回传的验证结果

如果只是小修小补，也可以直接停在本地，改走 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

### 第 3 步：只把可执行部分交给 background agent

交接说明必须包含：

- 本地已经确认的结论
- 允许改动的目录
- 需要回传的验证结果
- 何时必须停下交还人工

第一次可以直接要求 background agent：

```text
只根据下面这份 handoff 执行，不要自行扩大范围。
完成后必须回传：改动文件、执行过的命令、真实命令结果、剩余风险。
如果发现边界不清或需要额外权限，立即停下并交还人工。
```

这一段最适合配合 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook) 一起用。

### 第 4 步：回到编辑器审 diff 和验证结果

不要把 background agent 当黑盒。回到编辑器后，至少检查：

- diff 是否仍在本次目录边界内
- 验证命令是否真的执行过
- 说明里是否写明剩余风险

## 验收清单

第一次成功的标准不是“它会自动做很多事”，而是：

- 本地探索结果能清楚交接
- background agent 只执行了被授权的部分
- 你能在编辑器里看懂 diff、日志和验证结果
- 你能明确判断下一轮是否还值得继续交给后台

## 常见失误

- 一上来就把问题整个丢给 background agent，本地没有先做收敛。
- handoff 只有目标，没有范围、停止条件和验证要求。
- 回到编辑器后只看 diff，不看日志和命令结果。
- 本来只是本地小修，却人为制造一轮多余的后台交接。

## 下一步

- 去 [VS Code Agents 常见任务](/docs/tools/control-planes/vscode-agents/common-tasks) 固定 3 类高频 SOP。
- 如果交接总是失真，去 [VS Code Agents 排错](/docs/tools/control-planes/vscode-agents/troubleshooting)。
- 如果你想把这种节奏变成长期习惯，去 [VS Code Agents 最佳实践](/docs/tools/control-planes/vscode-agents/best-practices)。

## 来源

- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
