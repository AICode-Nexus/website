---
audience: "advanced"
stage: "advanced"
featured: false
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "implementation"
title: "Parallel Worktrees / Multi-Agent：案例与工具组合"
description: "Parallel Worktrees / Multi-Agent 的代表案例，以及最适合搭配的工具或框架。"
slug: "/workflows/patterns/parallel-worktrees-multi-agent/examples-and-tool-fit"
sidebar_label: "补充：案例与工具"
sidebar_position: 9
tags: ["ai-coding", "workflow", "parallel-worktrees-multi-agent"]
---

# Parallel Worktrees / Multi-Agent：案例与工具组合

## 现在先做什么

- 想先看并行 lane 的标准示例：去 [Parallel Worktrees / Multi-Agent 示例](/docs/workflows/patterns/parallel-worktrees-multi-agent/examples)。
- 想先选默认工具组合：去 [Parallel Worktrees / Multi-Agent Tooling](/docs/workflows/patterns/parallel-worktrees-multi-agent/tooling)。
- 想先看开放式壳层如何收口真实任务：去 [Cline 并行 Worktree 收口案例](/docs/case-studies/cline-parallel-worktree-owner-loop)。

## 代表案例

- 实现、测试、文档三路并行，最后由 owner 做一次统一回归。
- 迁移脚本和运行时适配器分 lane，各自验证后再进集成分支。
- 大任务里的外围低耦合部分先并行，核心合同仍由 owner 串行持有。

## 默认工具组合

- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：适合把并行 task 和 worktree 做成正式执行栈。
- [Claude Code](/docs/tools/terminal-agents/claude-code)：适合 owner 驱动的终端式并行收口。
- [VS Code Agents](/docs/tools/control-planes/vscode-agents)：适合本地 owner 配后台 agent 的混合模式。

## 常见误配

- 把“并行”当成默认先进，而不是先看任务边界是否真能拆。
- 同时上多套重工具和多条 lane，结果先死在协调成本上。
- 只看生成速度，不看每条 lane 的证据是否能回流到 diff、测试和 review。

## 读完回哪里

- 想直接照示例开工：回 [Parallel Worktrees / Multi-Agent 示例](/docs/workflows/patterns/parallel-worktrees-multi-agent/examples)。
- 想先选入口组合：去 [Parallel Worktrees / Multi-Agent Tooling](/docs/workflows/patterns/parallel-worktrees-multi-agent/tooling)。
- 想看真实 owner 收口：去 [Cline 并行 Worktree 收口案例](/docs/case-studies/cline-parallel-worktree-owner-loop)。

## 来源

- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
