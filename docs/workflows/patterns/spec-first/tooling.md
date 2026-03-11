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

Spec-First 的工具组合重点，不是谁来“写文档”，而是谁来承接定稿后的阶段推进、阶段内实现和最终 review 收口。工具应该跟着 spec 生命周期变化，而不是从头到尾只用一个入口。

## 默认组合

| 角色 | 默认工具 | 作用 | 什么时候切换 |
| --- | --- | --- | --- |
| 规格与阶段推进 | [OpenAI Codex](/docs/tools/execution-stacks/openai-codex) | 适合承接阶段执行和长链路推进。 | 如果只是小步实现，可直接回 IDE 或终端。 |
| IDE 内局部实现 | [Cursor](/docs/tools/ide-first/cursor) | 适合阶段内快速实现。 | 需要更强 repo pairing 时改终端入口。 |
| 平台收口 | [GitHub Copilot](/docs/tools/platforms/github-copilot) | 适合把阶段结果回收到 PR 流。 | 如果团队不以 GitHub 为主系统，则换平台层。 |

## 选择顺序

1. 先看 spec 最终要服务谁，是 owner、reviewer 还是执行者。
2. 再看执行主要发生在哪里，是长链路执行栈、IDE 还是终端。
3. 最后决定 review 在哪里收口，而不是一开始就把工具绑定在 spec 写作阶段。

## 默认搭配建议

- 规格和阶段推进交给 [OpenAI Codex](/docs/tools/execution-stacks/openai-codex) 这类执行栈更稳。
- 阶段内局部实现可以回到 [Cursor](/docs/tools/ide-first/cursor) 这种 IDE 主入口。
- 最终结果如果要进入平台 review，再补 [GitHub Copilot](/docs/tools/platforms/github-copilot)。
- 如果 spec 定稿后主要在终端推进，补看 [Terminal-First Repo Pairing Tooling](/docs/workflows/patterns/terminal-first-repo-pairing/tooling)。

## 最小落地包

- 一个 spec 模板，至少覆盖目标、非目标和验收。
- 一个执行入口，不要写完 spec 后所有人各选各的主线。
- 一种阶段总结模板，用来把 spec 和实际执行对齐。
- 一种正式收口位置，例如 PR、issue 或阶段说明文档。

## 什么时候换组合

- 定稿后进入长任务执行时，执行栈优先。
- 定稿后只剩局部实现和快速验证时，IDE 或终端优先。
- 平台主要承担 review 和审批，不要承担需求澄清。
- 如果 spec 本身还没稳，不要急着讨论工具组合，先回 [Spec-First：适用信号与边界](/docs/workflows/patterns/spec-first/fit-and-signals)。

## 下一步

- [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)
- [Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)
- [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)
