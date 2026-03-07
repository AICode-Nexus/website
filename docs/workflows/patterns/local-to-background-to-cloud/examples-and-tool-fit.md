---
title: "Local -> Background -> Cloud：案例与工具组合"
description: "Local -> Background -> Cloud 的代表案例，以及最适合搭配的工具或框架。"
slug: "/workflows/patterns/local-to-background-to-cloud/examples-and-tool-fit"
sidebar_label: "案例与工具组合"
tags: ["ai-coding", "workflow", "local-to-background-to-cloud"]
track: "prompting-workflows"
kind: "guide"
audience: "advanced"
stage: "intermediate"
featured: false
pillar: "workflows"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Local -> Background -> Cloud：案例与工具组合

没有一种工具能自动修正糟糕的工作流，但合适的入口确实能让同一条 workflow 更稳。这一页的目标是把案例、入口和组合方式绑在一起看。

## 代表案例

- **前端回归先本地复现再交后台实现**：本地先确认交互路径和快照，后台再修复和补测试，最后回到 PR review。
- **跨仓库文档更新**：本地先明确目录与链接影响面，再把批量改动交给后台运行。

## 推荐工具组合

- [VS Code Agents](/docs/tools/control-planes/vscode-agents)：最适合作为本地与后台 agent 的控制面。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：适合本地探索后转交 cloud task 或并行执行。
- [GitHub Copilot](/docs/tools/platforms/github-copilot)：适合最终在 PR 与 review 流里收口。

## 常见组合误区

- 把工具当成 workflow 本身，而不是 workflow 的承载入口。
- 同时上多个重流程和多个重工具，最后先死在上下文和治理成本上。
- 只看生成速度，不看证据是否能回流到 diff、测试和 review。

## 延伸阅读

- [AI 工作流总览](/docs/workflows)
- [主流 AI Coding 工作流](/docs/workflows/mainstream-ai-coding-workflows)
- [工作流框架总览](/docs/workflows/frameworks-overview)
