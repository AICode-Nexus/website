---
title: 上下文、记忆与规则
description: 解释为什么规则文件、上下文切片、记忆机制和权限边界要分层设计，而不是把一切都交给 memory。
slug: /models-agents/context-memory-and-rules
sidebar_label: 上下文、记忆与规则
tags: [ai-coding, context, memory, rules]
track: models-agents
kind: guide
audience: mixed
stage: intermediate
featured: false
pillar: standards
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

# 上下文、记忆与规则

## 先给结论

更稳定的优先顺序通常是：

1. 先写显式规则文件
2. 再设计任务上下文切片
3. 最后再引入记忆机制

## 为什么要分层

### 规则

规则负责硬约束，例如：

- 哪些目录不能动
- 哪些命令必须跑
- 哪些操作必须审批

### 上下文

上下文负责当前任务的最小相关信息，而不是把整个仓库一次性塞给 agent。

### 记忆

记忆适合长期偏好和仓库习惯，但不适合作为唯一真相来源。

## 当前主流信号

- GitHub Copilot 在 2026 年 3 月继续把 memory 和 repository instructions 放进正式能力层。
- Claude Code 官方文档已经把 `CLAUDE.md` 明确写进记忆 / 指令体系。
- Gemini CLI 也把 `GEMINI.md` 写入 context files 机制。
- Cursor、Windsurf、Continue 都把 rules 做成显式目录或文件。

这些信号说明：显式规则文件已经成为主流，而不是高级用户技巧。

## 推荐做法

- 规则文件存长期约束
- contract / spec 存当前任务边界
- memory 只存长期偏好

## 来源

- GitHub Docs: [Repository custom instructions for Copilot](https://docs.github.com/en/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot)
- Anthropic Docs: [CLAUDE.md memory file](https://docs.anthropic.com/en/docs/claude-code/memory#claude-md)
- Gemini CLI Docs: [Context files](https://google-gemini.github.io/gemini-cli/docs/cli/configuration/#context-files)
- Cursor Docs: [Rules](https://docs.cursor.com/context/rules)
