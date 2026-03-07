---
title: "Spec-First：案例与工具组合"
description: "Spec-First 的代表案例，以及最适合搭配的工具或框架。"
slug: "/workflows/patterns/spec-first/examples-and-tool-fit"
sidebar_label: "案例与工具组合"
tags: ["ai-coding", "workflow", "spec-first"]
track: "prompting-workflows"
kind: "guide"
audience: "mixed"
stage: "intermediate"
featured: false
pillar: "workflows"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Spec-First：案例与工具组合

没有一种工具能自动修正糟糕的工作流，但合适的入口确实能让同一条 workflow 更稳。这一页的目标是把案例、入口和组合方式绑在一起看。

## 代表案例

- **新增组织级权限模型**：先写清角色矩阵、非目标和回归路径，再拆成后端、前端和测试任务。
- **导出系统增加新格式**：先固定输入输出契约、兼容边界和验收样例，再安排实现与验证。

## 推荐工具组合

- [Spec Kit](/docs/workflows/frameworks/spec-kit)：适合先把 spec、plan、tasks 链条固定下来。
- [BMAD](/docs/workflows/frameworks/bmad)：适合需要多角色 handoff 的更重流程。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：适合在 spec 定稿后进入本地或云端执行。
- [VS Code Agents](/docs/tools/control-planes/vscode-agents)：适合把本地探索和后台执行串在一条控制面里。

## 常见组合误区

- 把工具当成 workflow 本身，而不是 workflow 的承载入口。
- 同时上多个重流程和多个重工具，最后先死在上下文和治理成本上。
- 只看生成速度，不看证据是否能回流到 diff、测试和 review。

## 延伸阅读

- [AI 工作流总览](/docs/workflows)
- [主流 AI Coding 工作流](/docs/workflows/mainstream-ai-coding-workflows)
- [工作流框架总览](/docs/workflows/frameworks-overview)
