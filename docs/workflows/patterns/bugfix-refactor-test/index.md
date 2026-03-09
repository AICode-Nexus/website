---
audience: "mixed"
stage: "starter"
featured: true
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "testing-validation"
title: "Bugfix / Refactor / Test"
description: "Bugfix / Refactor / Test 的定位、适合任务和默认人工接管点。"
slug: "/workflows/patterns/bugfix-refactor-test"
sidebar_label: "概览"
tags: ["ai-coding", "workflow", "bugfix-refactor-test"]
---

# Bugfix / Refactor / Test

这是知识站里最该优先跑通的日常主线之一。它不追求“最先进”，而是把修 bug、局部重构和补测试固定成最小可验证闭环。

## 现在先做什么

- 直接按步骤执行：去 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 想先看完整样例：去 [Bugfix / Refactor / Test 示例](/docs/workflows/patterns/bugfix-refactor-test/examples)。
- 想先选终端入口：去 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)。

## 60 秒定位

这个工作流最适合那些已经能复现、能定义修改边界、能执行回归验证的维护任务。它的重点不是生成更多代码，而是更快把问题收束到一个小 patch、一组验证命令和一份清晰风险说明。

如果需求本身还在探索，或者改动会同时触及 schema、架构边界和交互设计，就不该硬塞进这条主线。那类任务应该先转到 [Spec-First](/docs/workflows/patterns/spec-first) 或更重的框架层。

## 默认进入顺序

1. 先用 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook) 跑通最小闭环。
2. 再看 [Bugfix / Refactor / Test 示例](/docs/workflows/patterns/bugfix-refactor-test/examples) 对照真实输入、输出和验证。
3. 然后按入口选择 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)、[Gemini CLI 快速开始](/docs/tools/terminal-agents/gemini-cli/quick-start) 或 [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start)。
4. 最后再补 [Bugfix / Refactor / Test 风险与切换条件](/docs/workflows/patterns/bugfix-refactor-test/pitfalls) 和补充页。

## 快速判断矩阵

| 判断维度 | 如果你满足这个条件 | 默认建议 |
| --- | --- | --- |
| 任务边界 | 问题可复现，或者至少能通过日志、断言和快照定位。 | 直接进入 [Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。 |
| 协作方式 | 允许修改的位置比较清楚，可以定义最小修复范围。 | 先把根因和边界说清，再开始动手。 |
| 验收要求 | 团队更在意稳定回归，而不是借机做大规模设计翻新。 | 把验证证据和剩余风险一并回收到 PR。 |
| 切换信号 | 需求本身还在探索，或改动已跨到 schema / 架构层。 | 转去 [Spec-First](/docs/workflows/patterns/spec-first) 或更重流程。 |

## 默认人工接管点

- 根因没说清之前，不进入大改动。
- 重构必须先写出行为边界，否则 review 无从判断是否越界。
- 最终交付要附回归结果和覆盖缺口，而不是只贴 diff。

## 下一步怎么读

- 想直接开跑：去 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 想看标准例子：去 [Bugfix / Refactor / Test 示例](/docs/workflows/patterns/bugfix-refactor-test/examples)。
- 想看真实终端修复闭环：去 [Claude Code Bugfix Loop 案例](/docs/case-studies/claude-code-bugfix-loop)。
- 想看它和 spec 主线怎么分工：去 [Spec-First](/docs/workflows/patterns/spec-first)。

## 来源

- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [Cline Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act)
- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
