---
title: "Claude Code 排错"
description: "当 Claude Code 在权限、边界、验证或上下文上出问题时，按固定顺序排查。"
slug: "/tools/terminal-agents/claude-code/troubleshooting"
sidebar_label: "排错"
sidebar_position: 4
tags: ["ai-coding", "tool", "claude-code", "troubleshooting"]
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

# Claude Code 排错

## 先判断是不是任务合同太松

这页主要处理三类故障：

- 越界改动
- 没有真实命令验证
- 本来是大任务，却硬要一次对话做完

多数情况下，不是 Claude Code 坏了，而是仓库边界、任务范围和验收方式没有写清。

## 常见卡点

- 一上来就越界改动太多文件。
- 只给代码，不给命令验证结果。
- 仓库规则、目录边界或禁止修改区没有写清。
- 任务本身太大，却还想用一次对话硬推完。

## 症状到原因的快速对应

- 症状：一轮改了太多目录。
  原因：允许改动范围没有写清。
- 症状：结果看起来像完成了，但你不知道仓库是否真能跑通。
  原因：没有把验证命令写成硬要求。
- 症状：越聊越长，越改越散。
  原因：任务本身已经超过一轮 repo pairing 的粒度。

## 诊断顺序

1. 先看边界有没有写清。
2. 再看验证命令能不能稳定执行。
3. 再看任务是不是已经超过 Claude Code 当前这一轮该处理的粒度。

大多数问题都不是工具坏了，而是任务合同太松。

## 修复动作

### 场景 1：越界改动

不要继续在当前上下文补救。先缩回到：

- 当前模块
- 当前文件组
- 当前验证命令

然后要求先复述范围，再只做第一步改动。

### 场景 2：没有命令验证

把“回报真实命令结果”写成硬门槛。没有命令结果，就视为这轮未完成。

如果仓库根本没有稳定命令，先补仓库基础设施，不要继续推 agent。

### 场景 3：任务过大

如果一轮里同时出现：

- 多模块改动
- 多次目标切换
- 很多未完成项

那就说明要切工作流，不是继续聊得更细。优先切到 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook) 或 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)。

## 回退策略

- 缩小改动范围，只保留一个模块。
- 改成先给计划、再给第一步执行。
- 把大任务切回 [Terminal-First Repo Pairing Runbook](/docs/workflows/patterns/terminal-first-repo-pairing/runbook) 或 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。

## 下次避免再犯

- 每轮开始前写清允许改动目录和禁止修改区
- 把默认验证命令写进仓库规则文件
- 每轮交付只要求“最小可解释结果”，不追求一次做完

## 什么时候直接换工具

- 需要平台 PR 收口：接 [GitHub Copilot 常见任务](/docs/tools/platforms/github-copilot/common-tasks)
- 需要长阶段执行：接 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)
- 只是 IDE 内小修：接 [Cursor 常见任务](/docs/tools/ide-first/cursor/common-tasks)

## 继续阅读

- [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)
- [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks)
- [Claude Code 最佳实践](/docs/tools/terminal-agents/claude-code/best-practices)

## 来源

- [CLAUDE.md Memory File](https://docs.anthropic.com/en/docs/claude-code/memory#claude-md)
