---
title: "Local -> Background -> Cloud"
description: "Local -> Background -> Cloud 的定位、适合任务和默认人工接管点。"
slug: "/workflows/patterns/local-to-background-to-cloud"
sidebar_label: "概览"
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

# Local -> Background -> Cloud

先在本地摸清问题和边界，再把可执行部分交给后台 agent，最后在云端或 PR 系统里收口，是复杂任务的稳妥分层。

## 适合的任务

- 一开始还需要本地读代码、跑命令和收敛边界的复杂任务。
- 实现阶段会比较长，适合交给后台或云端 agent 异步推进。
- 最终仍要回到 GitHub / PR / cloud task 面板做状态管理和 review。

## 最小闭环

1. **本地探索**：在本地读代码、跑命令、缩小问题面，并把发现沉淀成 brief。
   产物：discovery brief
2. **后台执行**：把已经收敛的任务交给 background agent 或云端执行环境。
   产物：background branch or task
3. **平台收口**：通过 PR、任务面板或 cloud task 查看进度、日志和 diff，准备 review。
   产物：review-ready change set
4. **最终验证**：由 owner 合并各阶段证据，完成最终判断。
   产物：final verification summary

## 默认人工接管点

- 本地探索阶段必须输出结构化 brief，否则后台只是在放大噪音。
- 后台执行阶段应有清晰 owner，避免“没人知道谁该收尾”。
- 云端面板只负责状态和审阅，不替代最终人工判断。

## 推荐入口

- [VS Code Agents](/docs/tools/control-planes/vscode-agents)：最适合作为本地与后台 agent 的控制面。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：适合本地探索后转交 cloud task 或并行执行。
- [GitHub Copilot](/docs/tools/platforms/github-copilot)：适合最终在 PR 与 review 流里收口。

## 来源

- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
