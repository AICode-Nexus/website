---
title: "Claude Code 快速开始"
description: "用 Claude Code 在一个真实仓库里完成第一次终端内 AI coding 闭环。"
slug: "/tools/terminal-agents/claude-code/quick-start"
sidebar_label: "快速开始"
sidebar_position: 2
tags: ["ai-coding", "tool", "claude-code", "tutorial"]
track: "cross-track"
kind: "tutorial"
content_form: "tutorial"
audience: "individual"
stage: "starter"
featured: true
domain: "tools"
journey_stage: "implementation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
tutorial_series: ["tool-quick-start", "claude-code"]
estimated_time: 20
prerequisites: ["本地可运行代码仓库", "至少一个验证命令", "已可使用 Claude Code"]
deliverable: "一次在仓库内完成并验证的最小改动记录"
---

# Claude Code 快速开始

## 前置条件

- 你已经决定把终端当成主入口，而不是把它当 IDE 的补位气泡。
- 仓库里至少有一个能稳定运行的验证命令。
- 你已经看过 [Claude Code 概览](/docs/tools/terminal-agents/claude-code)，知道它更适合仓库内闭环。

## 步骤

### 第 1 步：在仓库根目录固定边界

先把本次任务写成 4 行：

```text
任务：今天只做什么
范围：只改哪些目录
不要做：这次明确不碰什么
验收：要跑什么命令
```

如果你还没有规则文件，先补 [仓库规则文件体系](/docs/repo-instruction-files)。

### 第 2 步：让 Claude Code 先复述，再执行

第一次不要直接要求“帮我全做完”。先要求它：

1. 复述任务和边界。
2. 给出最小计划。
3. 只做一轮最小改动。
4. 回报真实命令结果。

### 第 3 步：把第一次闭环跑通

优先选这些任务：

- 修一个已知 bug
- 补一条缺失测试
- 做一次不改变行为的小重构

如果今天任务偏维护，直接搭配 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。

## 验证

第一次成功的标准不是“它写了很多代码”，而是：

- 任务边界没有失控。
- 你真的执行了验证命令。
- 你能给出一段结果说明，而不是只给 diff。

## 下一步

- 回到 [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks) 固定 3 类高频 SOP。
- 如果命令或权限经常出错，进入 [Claude Code 排错](/docs/tools/terminal-agents/claude-code/troubleshooting)。
- 如果你要把终端工作方式变成长期习惯，进入 [Claude Code 最佳实践](/docs/tools/terminal-agents/claude-code/best-practices)。

## 来源

- [Claude Code Overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
