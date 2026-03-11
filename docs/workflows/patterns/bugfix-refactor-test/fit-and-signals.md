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

这个模式适合“问题已经足够清楚，可以围绕根因、最小修改和回归验证稳定推进”的任务。它的强项不是替你定义需求，而是把已有问题快速收敛成可复现、可修复、可验证的闭环。

## 现在先做什么

- 想直接按最小闭环执行：去 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 想先看完整示例：去 [Bugfix / Refactor / Test 示例](/docs/workflows/patterns/bugfix-refactor-test/examples)。
- 想先看真实修复怎么收口：去 [Claude Code Bugfix Loop 案例](/docs/case-studies/claude-code-bugfix-loop)。

## 快速判断表

| 判断点 | 适合上这条主线 | 更该切走的时候 |
| --- | --- | --- |
| 问题定义 | 能复现，或至少能靠日志和断言定位。 | 连预期行为都还说不清。 |
| 修改范围 | 能说清只动哪些模块和哪些测试。 | 一改就牵到 schema、接口和交互大改。 |
| 验收方式 | 有明确命令、断言或人工检查步骤。 | 只能靠“看起来像好了”。 |
| 团队目标 | 更在意稳定回归和小步交付。 | 实际想借机做体系级重构。 |

## 什么时候该上

- 问题可以复现，或者至少能通过日志、断言和快照稳定定位。
- 团队能写出“这轮最小修复边界”，不会顺手扩成第二个任务。
- 修完后能通过测试、构建、截图、回归路径或观测指标确认结果。
- review 关注点是根因、边界和回归，而不是“顺便清了多少旧账”。

## 什么时候别上

- 需求还在探索，甚至不知道预期行为是什么。
- 任务同时牵涉 schema、架构边界和产品交互大改。
- 团队没有固定验证命令，只能靠主观感觉判断完成。
- 这轮真实目标其实是设计新方案，而不是修旧行为。

## 常见切换条件

- 如果只是配置微调或文案修正，直接走更轻量维护动作。
- 如果要跨模块改接口、数据结构和审批链，切到 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 如果需要把实现、测试和文档拆成多 lane，切到 [Parallel Worktrees / Multi-Agent Runbook](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。
- 如果问题主要发生在本地探索和后台长执行之间，补看 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。

## 开始前自测

- 你能不能一句话说清“坏在哪、应该好成什么样”。
- 你能不能列出这轮绝对不碰的目录或行为。
- 你能不能先写出验证步骤，再开始改。
- 你是不是已经把“大重构冲动”和“当前 bugfix 范围”分开了。

## 读完回哪里

- 想直接执行：回 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 想看标准例子：去 [Bugfix / Refactor / Test 示例](/docs/workflows/patterns/bugfix-refactor-test/examples)。
- 想看真实终端修复闭环：去 [Claude Code Bugfix Loop 案例](/docs/case-studies/claude-code-bugfix-loop)。

## 来源

- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [Cline Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act)
- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
