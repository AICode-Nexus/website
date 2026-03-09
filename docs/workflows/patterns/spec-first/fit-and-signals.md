---
audience: "mixed"
stage: "intermediate"
featured: false
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "solution-design"
title: "Spec-First：适用信号与边界"
description: "什么时候优先用 Spec-First，什么时候不要用。"
slug: "/workflows/patterns/spec-first/fit-and-signals"
sidebar_label: "补充：适用信号"
sidebar_position: 6
tags: ["ai-coding", "workflow", "spec-first"]
---

# Spec-First：适用信号与边界

## 现在先做什么

- 想直接按 spec 主线执行：去 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 想先看完整示例：去 [Spec-First 示例](/docs/workflows/patterns/spec-first/examples)。
- 想先看 spec 定稿后怎么进入执行：去 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)。

## 什么时候该上

- 需求边界模糊，稍不注意就会在实现阶段扩边界。
- 多个角色会 review 同一个改动，需要先对齐目标和非目标。
- 如果不先列验收标准，后续很难判断 agent 是否真的完成。

## 什么时候别上

- 生产事故热修、单点配置修正或纯文案修订。
- 团队没有基本验证命令，也没有人维护文档产物。
- 只打算做一次性探索，不准备沉淀长期流程。

## 切回更轻或更重

- 如果任务降级成局部修复，回 [Bugfix / Refactor / Test Runbook](/docs/workflows/patterns/bugfix-refactor-test/runbook)。
- 如果任务要跨更多角色和更重审批链，可切到 [BMAD](/docs/workflows/frameworks/bmad)。
- 如果 spec 已定稿，直接回 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook) 进入执行。

## 读完回哪里

- 想直接按 spec 主线执行：回 [Spec-First Runbook](/docs/workflows/patterns/spec-first/runbook)。
- 想看标准例子：去 [Spec-First 示例](/docs/workflows/patterns/spec-first/examples)。
- 想看 spec 定稿后如何进入执行栈：去 [OpenAI Codex 常见任务](/docs/tools/execution-stacks/openai-codex/common-tasks)。

## 来源

- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
