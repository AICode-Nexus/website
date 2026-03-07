---
title: "Spec-First"
description: "Spec-First 的定位、适合任务和默认人工接管点。"
slug: "/workflows/patterns/spec-first"
sidebar_label: "概览"
tags: ["ai-coding", "workflow", "spec-first"]
track: "prompting-workflows"
kind: "guide"
audience: "mixed"
stage: "intermediate"
featured: true
pillar: "workflows"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Spec-First

先把目标、非目标、验收和任务拆解写清，再让 agent 执行，是新功能和跨模块改动的默认主线。

## 适合的任务

- 新功能、跨模块改动、需要显式验收的任务。
- 涉及 schema、API、权限、迁移或多端联动的需求。
- 组织希望先把“做什么”与“怎么做”分开审阅。

## 最小闭环

1. **写目标与边界**：先把目标、非目标、影响面、约束和验收条件写成可 review 的 spec。
   产物：spec 草稿
2. **补实现计划**：在读完仓库上下文后，把任务拆成可验证的阶段和工作包。
   产物：plan 与 task list
3. **小步执行并对照 spec**：每次修改都回到 spec 和验收标准，避免实现漂移。
   产物：按阶段完成的 diff
4. **按验收标准验证**：把测试、构建、人工检查和风险说明映射回验收项。
   产物：verification packet

## 默认人工接管点

- spec 定稿前必须明确谁能改目标、谁只能补实现细节。
- plan 定稿后再进入执行，避免边执行边发明范围。
- 最终 merge 仍要由 owner 按 spec 与 diff 做人工 review。

## 推荐入口

- [Spec Kit](/docs/workflows/frameworks/spec-kit)：适合先把 spec、plan、tasks 链条固定下来。
- [BMAD](/docs/workflows/frameworks/bmad)：适合需要多角色 handoff 的更重流程。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：适合在 spec 定稿后进入本地或云端执行。
- [VS Code Agents](/docs/tools/control-planes/vscode-agents)：适合把本地探索和后台执行串在一条控制面里。

## 来源

- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
