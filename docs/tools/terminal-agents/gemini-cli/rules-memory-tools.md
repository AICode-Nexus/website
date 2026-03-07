---
title: "Gemini CLI：规则、记忆与工具边界"
description: "Gemini CLI 的 rules、memory、tools 与 repo 接入建议。"
slug: "/tools/terminal-agents/gemini-cli/rules-memory-tools"
sidebar_label: "规则记忆与工具"
tags: ["ai-coding", "tool", "gemini-cli"]
track: "cross-track"
kind: "guide"
audience: "mixed"
stage: "intermediate"
featured: false
pillar: "tools"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Gemini CLI：规则、记忆与工具边界

一旦一个入口开始支持 rules、memory、background task 或 MCP，它就不再只是“会写代码的 UI”，而是在参与团队治理。规则写在哪、状态留在哪、工具权限怎么管，会直接决定这个入口是否能长期留在标准栈里。

## 规则分层

- GEMINI.md 或等价 context files 是它进入 repo 的主要长期资产。
- 这些 context files 应该只写 repo 级规则，不要把一次性任务说明也长期固化进去。
- 如果仓库里同时存在多种指令文件，必须定义它们的职责边界。

## 状态与记忆边界

- 更偏向 repo context files 和当前任务上下文，而不是复杂的长期个体记忆。
- 适合把稳定规则版本化，而不是让用户每次重述。

## 规则与边界矩阵

| 边界层 | 应该放什么 | 不要放什么 |
| --- | --- | --- |
| 入口规则 | GEMINI.md 或等价 context files 是它进入 repo 的主要长期资产。 | 这些 context files 应该只写 repo 级规则，不要把一次性任务说明也长期固化进去。 |
| 状态与记忆 | 更偏向 repo context files 和当前任务上下文，而不是复杂的长期个体记忆。 | 适合把稳定规则版本化，而不是让用户每次重述。 |
| 执行边界 | 终端命令、仓库上下文文件和脚本化任务。 | 更适合与 GitHub/CI 组合，而不是单独承担全部工作流。 |
| 仓库合同 | 先写一版最小 GEMINI.md，只保留目录边界、验证命令和禁止事项。 | 保持 context files 简洁，否则很快变成无人维护的大块说明。 |

## 仓库接入建议

- 先写一版最小 GEMINI.md，只保留目录边界、验证命令和禁止事项。
- 保持 context files 简洁，否则很快变成无人维护的大块说明。
- 把验证命令写成脚本，减少不同终端入口之间的语义漂移。

如果你已经在 repo 里有 AGENTS.md、目录边界、验证命令和 review checklist，那么 Gemini CLI 更应该做的是补足入口体验，而不是再造第二套事实来源。

## 团队检查清单

- 先定义哪些规则必须版本化留在 repo，哪些只属于 Gemini CLI 的入口习惯。
- 任何长期状态都必须能解释 owner、刷新时机和失效条件。
- 执行边界要能回到真实命令、diff 和 PR 证据，而不是只剩界面内的一句“完成了”。
- 先写一版最小 GEMINI.md，只保留目录边界、验证命令和禁止事项。

## 下一步怎么读

- [GitHub Copilot](/docs/tools/platforms/github-copilot)：Gemini CLI 做本地终端入口，GitHub 负责 PR 与 review。
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：Spec 定稿后可用 Gemini CLI 接手执行与验证。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：需要更重的日常操作方法时可以叠加。
- [Claude Code](/docs/tools/terminal-agents/claude-code)：如果你更看重 repo pairing、worktree 和规则文件沉淀。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：如果你更需要并行任务和云端执行。
- [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing)：Gemini CLI 适合做轻量终端入口。

## 来源

- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [Gemini CLI Context Files](https://google-gemini.github.io/gemini-cli/docs/cli/configuration/#context-files)
