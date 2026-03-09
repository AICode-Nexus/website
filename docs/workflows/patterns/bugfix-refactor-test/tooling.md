---
title: "Bugfix / Refactor / Test Tooling"
description: "为维护型任务选择最顺手的工具组合：终端、IDE 和平台各自承担什么。"
slug: "/workflows/patterns/bugfix-refactor-test/tooling"
sidebar_label: "工具组合"
sidebar_position: 5
tags: ["ai-coding", "workflow", "bugfix-refactor-test"]
track: "prompting-workflows"
kind: "guide"
content_form: "guide"
audience: "mixed"
stage: "starter"
featured: false
domain: "workflows"
journey_stage: "testing-validation"
entry_role: "domain"
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
---

# Bugfix / Refactor / Test Tooling

## 默认组合

| 场景 | 默认工具 | 原因 |
| --- | --- | --- |
| 终端内维护 | [Claude Code](/docs/tools/terminal-agents/claude-code) | 最适合仓库内读代码、跑命令、保留验证证据。 |
| IDE 内小步修复 | [Cursor](/docs/tools/ide-first/cursor) | 适合局部实现和快速验证。 |
| 平台内交接 | [GitHub Copilot](/docs/tools/platforms/github-copilot) | 适合把 issue、PR 和 review 串起来。 |

## 选择顺序

1. 先看任务发生在哪里。
2. 再看验证发生在哪里。
3. 最后再决定是否需要平台补位。

## 组合建议

- 终端内小步维护优先走 Claude Code。
- IDE 内局部改动优先走 Cursor。
- 需要把结果回收到平台 review，再补 GitHub Copilot。

## 下一步

- [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks)
- [Cursor 常见任务](/docs/tools/ide-first/cursor/common-tasks)
- [GitHub Copilot 常见任务](/docs/tools/platforms/github-copilot/common-tasks)
