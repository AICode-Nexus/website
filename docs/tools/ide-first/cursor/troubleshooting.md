---
title: "Cursor 排错"
description: "当 Cursor 在规则、上下文或多文件改动上开始漂移时，按固定顺序排查。"
slug: "/tools/ide-first/cursor/troubleshooting"
sidebar_label: "排错"
sidebar_position: 4
tags: ["ai-coding", "tool", "cursor", "troubleshooting"]
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

# Cursor 排错

## 先判断是不是 IDE 小步任务被做大了

这页主要处理三类故障：

- 规则太弱，导致输出漂移
- 多文件改动扩太快
- IDE 上下文和真实验收要求脱节

如果你已经明显需要多阶段推进，不要继续在单轮 IDE 协作里硬顶，优先转 [OpenAI Codex 排错](/docs/tools/execution-stacks/openai-codex/troubleshooting)。

## 常见卡点

- 规则文件太弱，导致输出和仓库风格不一致。
- 多文件改动扩得太快，超过当前任务边界。
- IDE 里的上下文和真实验收要求脱节。

## 症状到原因的快速对应

- 症状：输出像“通用建议”，不像当前仓库里的改动。
  原因：规则文件太泛，没约束住仓库语境。
- 症状：原本一个小任务，最后改了很多文件。
  原因：任务边界没缩住。
- 症状：改完看起来不错，但一跑命令就露馅。
  原因：验证没有参与这轮流程。

## 诊断顺序

1. 先看规则文件是否足够具体。
2. 再看当前任务是不是太大。
3. 最后看验证命令有没有真实执行。

## 修复动作

### 场景 1：规则不够具体

不要继续追加聊天要求，先把规则文件补具体：

- 当前目录边界
- 不要修改区
- 默认验证命令
- 团队风格约束

### 场景 2：任务越做越大

把任务缩回到：

- 单文件
- 单模块
- 单个明确目标

如果缩不回去，说明该换入口了。

### 场景 3：验证脱节

每轮改动后都要执行至少一个真实验证命令。没有验证，这轮就不能算闭环。

## 回退策略

- 缩回到单文件或单模块改动。
- 先补规则，再继续任务。
- 如果任务已经升级到多阶段推进，切到 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)。

## 下次避免再犯

- 每个仓库都先写清 IDE 规则文件
- 每轮只做一个最小目标
- diff 审阅和命令验证都发生在 IDE 里，而不是只看回答

## 什么时候直接换工具

- 平台交付：接 [GitHub Copilot 常见任务](/docs/tools/platforms/github-copilot/common-tasks)
- 长阶段执行：接 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)
- 终端仓库深潜：接 [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks)

## 继续阅读

- [Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)
- [Cursor 常见任务](/docs/tools/ide-first/cursor/common-tasks)
- [Cursor 最佳实践](/docs/tools/ide-first/cursor/best-practices)

## 来源

- [Cursor Documentation](https://docs.cursor.com/)
