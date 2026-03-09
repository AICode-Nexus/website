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

## 常见卡点

- 规则文件太弱，导致输出和仓库风格不一致。
- 多文件改动扩得太快，超过当前任务边界。
- IDE 里的上下文和真实验收要求脱节。

## 诊断顺序

1. 先看规则文件是否足够具体。
2. 再看当前任务是不是太大。
3. 最后看验证命令有没有真实执行。

## 回退策略

- 缩回到单文件或单模块改动。
- 先补规则，再继续任务。
- 如果任务已经升级到多阶段推进，切到 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)。

## 继续阅读

- [Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)
- [Cursor 常见任务](/docs/tools/ide-first/cursor/common-tasks)
- [Cursor 最佳实践](/docs/tools/ide-first/cursor/best-practices)

## 来源

- [Cursor Documentation](https://docs.cursor.com/)

