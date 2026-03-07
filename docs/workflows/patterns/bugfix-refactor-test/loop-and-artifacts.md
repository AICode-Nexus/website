---
title: "Bugfix / Refactor / Test：流程与产物"
description: "Bugfix / Refactor / Test 的输入、输出、标准步骤和验收证据。"
slug: "/workflows/patterns/bugfix-refactor-test/loop-and-artifacts"
sidebar_label: "流程与产物"
tags: ["ai-coding", "workflow", "bugfix-refactor-test"]
track: "prompting-workflows"
kind: "guide"
audience: "mixed"
stage: "starter"
featured: false
pillar: "workflows"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Bugfix / Refactor / Test：流程与产物

Bugfix / Refactor / Test 的价值，不在于步骤名字好看，而在于每一步都有清晰输入、输出和可 review 的证据。只要其中一环变成“相信我已经做了”，流程就会失真。

## 输入

- 失败用例、日志、异常描述或行为对照。
- 允许修改的文件范围、可运行的测试命令。
- 是否允许顺手清理、补测或做兼容修正。

## 输出

- 最小修复、最小重构或测试补充。
- 根因说明、回归结果和剩余风险。
- 必要时的后续任务建议。

## 阶段与产物总表

| 阶段 | 目标 | 主要产物 |
| --- | --- | --- |
| 先复现或收集症状 | 把失败测试、日志、截图或行为差异整理成可重复的起点。 | repro note |
| 确认根因与边界 | 先解释为什么出错、为什么本次只修这一层，再决定是否需要重构或补测试。 | root cause note |
| 做最小修复或最小重构 | 优先保持范围稳定，避免顺手扩大设计变更。 | small diff |
| 跑回归并说明覆盖缺口 | 执行测试、构建或人工验证，并明确还剩什么风险。 | regression evidence |

## 标准步骤

1. **先复现或收集症状**：把失败测试、日志、截图或行为差异整理成可重复的起点。
   产物：repro note
2. **确认根因与边界**：先解释为什么出错、为什么本次只修这一层，再决定是否需要重构或补测试。
   产物：root cause note
3. **做最小修复或最小重构**：优先保持范围稳定，避免顺手扩大设计变更。
   产物：small diff
4. **跑回归并说明覆盖缺口**：执行测试、构建或人工验证，并明确还剩什么风险。
   产物：regression evidence

## 验收证据

- 修复前后的失败/成功信号对照。
- 本次真正执行过的命令和结果摘要。
- 如果没有补充测试，要明确说明为什么。

## 最容易断裂的地方

- 根因没说清之前，不进入大改动。
- 重构必须先写出行为边界，否则 review 无从判断是否越界。
- 只修症状、不修根因，问题很快复发。

## 下一步怎么读

- [Claude Code](/docs/tools/terminal-agents/claude-code)：适合终端里先复现、再修、再跑命令。
- [Gemini CLI](/docs/tools/terminal-agents/gemini-cli)：适合把终端验证与 GitHub 交付串起来。
- [VS Code Agents](/docs/tools/control-planes/vscode-agents)：适合本地改动加后台补跑。
- [GitHub Copilot](/docs/tools/platforms/github-copilot)：适合已有 issue 与 PR 流的日常小改动。

## 来源

- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [Cline Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act)
- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
