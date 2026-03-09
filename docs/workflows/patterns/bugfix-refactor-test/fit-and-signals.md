---
audience: "mixed"
stage: "starter"
featured: false
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "testing-validation"
title: "Bugfix / Refactor / Test：适用信号与边界"
description: "什么时候优先用 Bugfix / Refactor / Test，什么时候不要用。"
slug: "/workflows/patterns/bugfix-refactor-test/fit-and-signals"
sidebar_label: "补充：适用信号"
sidebar_position: 6
tags: ["ai-coding", "workflow", "bugfix-refactor-test"]
---

# Bugfix / Refactor / Test：适用信号与边界

## 现在先做什么

- 想直接按最小闭环执行：去 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 想先看完整示例：去 [Bugfix / Refactor / Test 示例](/docs/workflows/patterns/bugfix-refactor-test/examples)。
- 想先看真实修复怎么收口：去 [Claude Code Bugfix Loop 案例](/docs/case-studies/claude-code-bugfix-loop)。

## 什么时候该上

- 问题可以复现，或者至少能通过日志、断言和快照定位。
- 允许修改的范围比较清楚，能写出“最小修复边界”。
- 团队更在意稳定回归，而不是借机扩成大重构。

## 什么时候别上

- 需求还在探索，甚至不知道预期行为是什么。
- 任务同时牵涉 schema、架构边界和产品交互大改。
- 团队没有固定验证命令，只能靠主观感觉判断完成。

## 切回更轻或更重

- 如果只是配置微调或文案修正，直接走更轻量维护动作。
- 如果要跨模块改接口、数据结构和审批链，切到 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 如果需要把实现、测试和文档拆成多 lane，切到 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。

## 读完回哪里

- 想直接执行：回 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 想看标准例子：去 [Bugfix / Refactor / Test 示例](/docs/workflows/patterns/bugfix-refactor-test/examples)。
- 想看真实终端修复闭环：去 [Claude Code Bugfix Loop 案例](/docs/case-studies/claude-code-bugfix-loop)。

## 来源

- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [Cline Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act)
- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
