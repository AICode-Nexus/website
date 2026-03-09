---
title: "Spec-First Tooling"
description: "为 spec-first 工作流选择合适的执行入口、补位工具和 review 收口方式。"
slug: "/workflows/patterns/spec-first/tooling"
sidebar_label: "工具组合"
sidebar_position: 5
tags: ["ai-coding", "workflow", "spec-first"]
track: "prompting-workflows"
kind: "guide"
content_form: "guide"
audience: "mixed"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "solution-design"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
---

# Spec-First Tooling

## 默认组合

| 角色 | 默认工具 | 作用 |
| --- | --- | --- |
| 规格与阶段推进 | [OpenAI Codex](/docs/tools/execution-stacks/openai-codex) | 适合承接阶段执行和长链路推进。 |
| IDE 内局部实现 | [Cursor](/docs/tools/ide-first/cursor) | 适合阶段内快速实现。 |
| 平台收口 | [GitHub Copilot](/docs/tools/platforms/github-copilot) | 适合把阶段结果回收到 PR 流。 |

## 选择顺序

1. 先看 spec 最终要服务谁。
2. 再看执行主要发生在哪里。
3. 最后决定 review 在哪里收口。

## 组合建议

- 规格和阶段推进交给 Codex 这类执行栈更稳。
- 阶段内局部实现可以回到 Cursor 这种 IDE 主入口。
- 最终结果如果要进入平台 review，再补 GitHub Copilot。

## 下一步

- [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)
- [Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)
- [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)
