---
title: 仓库规则文件体系
description: 梳理 AGENTS.md、CLAUDE.md、GEMINI.md 与工具 rules 的职责边界，避免多个规则源彼此冲突。
slug: /repo-instruction-files
sidebar_label: 仓库规则文件体系
tags: [ai-coding, rules, repo]
track: team-delivery
kind: guide
audience: advanced
stage: intermediate
featured: false
pillar: standards
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

# 仓库规则文件体系

## 先给结论

规则文件越来越像 AI 开发里的 `README + CONTRIBUTING + policy` 混合层。问题不是“要不要写”，而是不同文件各自负责什么。

## 推荐职责划分

### `AGENTS.md`

放跨工具、跨入口都成立的仓库级原则，例如：

- 目录边界
- 必跑命令
- 权限与审批规则
- 不允许的顺手优化

### `CLAUDE.md`

放 Claude Code 专用的记忆与工作方式约束，前提是不与 `AGENTS.md` 冲突。

### `GEMINI.md`

放 Gemini CLI 专用的 context file 内容，原则同样是不覆盖仓库级公共规范。

### 工具 rules 目录

例如 `.cursor/rules`、`.windsurf/rules`、`.continue/rules`，适合放入口专用规则：

- UI / IDE 操作约定
- 特定模型或工具组合
- 局部工作台行为

## 一个稳妥的优先级

1. `AGENTS.md`
2. 仓库级通用 instructions
3. 工具专属文件与 rules
4. 临时 task contract

## 常见错误

- 把同一条规则同时复制到 4 个文件里
- 工具专属文件覆盖仓库公共规范
- 没定义冲突时谁优先
- 规则文件存在，但没有和验证命令配套

## 来源

- Anthropic Docs: [CLAUDE.md memory file](https://docs.anthropic.com/en/docs/claude-code/memory#claude-md)
- Gemini CLI Docs: [Context files](https://google-gemini.github.io/gemini-cli/docs/cli/configuration/#context-files)
- Cursor Docs: [Rules](https://docs.cursor.com/context/rules)
- Windsurf Docs: [AGENTS.md discovery](https://docs.windsurf.com/windsurf/cascade/agents-md)
- GitHub Docs: [Repository custom instructions for Copilot](https://docs.github.com/en/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot)

## 延伸阅读

- [AI 开发规范](/docs/ai-development-standards)
- [上下文、记忆与规则](/docs/models-agents/context-memory-and-rules)
