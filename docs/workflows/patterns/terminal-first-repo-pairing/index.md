---
audience: "mixed"
stage: "intermediate"
featured: true
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "implementation"
title: "Terminal-First Repo Pairing"
description: "Terminal-First Repo Pairing 的定位、适合任务和默认人工接管点。"
slug: "/workflows/patterns/terminal-first-repo-pairing"
sidebar_label: "概览"
tags: ["ai-coding", "workflow", "terminal-first-repo-pairing"]
---

# Terminal-First Repo Pairing

把 agent 当成仓库里的搭档，而不是网页聊天框：围绕规则文件、命令执行、diff 审阅和验证闭环工作。

## 什么时候优先用它

- 真实工程仓库、monorepo、脚本化任务和命令驱动型修复。
- 希望保留 shell、git、test 和审批边界的团队。
- 需要 agent 直接和 repo 规则、工作树、构建命令交互的任务。

## 什么时候先别用它

- 高度视觉化的任务，离不开浏览器交互与人工拖拽。
- 不愿意看命令输出、也不愿意 review diff 的使用方式。
- 仓库没有任何脚本或验证回路，命令行只能盲改的场景。

## 最小闭环

1. **读规则文件**：先读取 AGENTS.md、CLAUDE.md、GEMINI.md 或其他 repo 规则，明确边界。
   产物：task contract
2. **说明计划与权限**：先说准备怎么做、要跑哪些命令、哪里需要审批。
   产物：execution plan
3. **小步执行**：边执行边看输出，必要时中断和缩小范围。
   产物：incremental diff
4. **跑命令验证并审 diff**：完成标准来自命令结果、diff 质量和人工审阅，而不是模型自评。
   产物：verified patch

## 阶段与产物总表

| 阶段 | 目标 | 主要产物 |
| --- | --- | --- |
| 读规则文件 | 先读取 AGENTS.md、CLAUDE.md、GEMINI.md 或其他 repo 规则，明确边界。 | task contract |
| 说明计划与权限 | 先说准备怎么做、要跑哪些命令、哪里需要审批。 | execution plan |
| 小步执行 | 边执行边看输出，必要时中断和缩小范围。 | incremental diff |
| 跑命令验证并审 diff | 完成标准来自命令结果、diff 质量和人工审阅，而不是模型自评。 | verified patch |

## 输入、输出与验收

### 输入

- 任务目标、目录范围、允许执行的命令。
- 规则文件、审批策略、环境约束。
- 需要保留的手工检查点，例如 UI 或数据正确性。

### 输出

- 带命令证据的 patch。
- 清晰的 diff、验证结果和剩余风险。
- 必要时的 worktree、branch 或回滚建议。

### 验收证据

- 命令执行记录和关键输出摘要。
- 与规则文件一致的边界说明。
- 最终 diff review 结论和未覆盖风险。

## 默认人工接管点

- 高风险命令、依赖变更和权限放大前必须显式审批。
- 任何大改动都要在 diff 可读的前提下推进，不宜一次性倾倒大 patch。
- 最终仍由人决定验证是否充分、是否值得 merge。

## 推荐入口与下一步

- [Claude Code](/docs/tools/terminal-agents/claude-code)：终端协作、规则文件和 worktree 是它的强项。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：适合审批模式、并行 worktree 和更长的执行链。
- [Gemini CLI](/docs/tools/terminal-agents/gemini-cli)：适合轻量终端入口与 GitHub 流结合。
- [Cline](/docs/tools/terminal-agents/cline)：适合要自己控制 Plan/Act、MCP 和工具权限的人。

## 来源

- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
