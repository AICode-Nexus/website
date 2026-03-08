---
audience: "mixed"
stage: "intermediate"
featured: false
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
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
sidebar_label: "适用信号"
tags: ["ai-coding", "workflow", "spec-first"]
---

# Spec-First：适用信号与边界

Spec-First 不是“越先进越该上”的默认答案，而是一套只在特定任务结构与团队成熟度下真正赚回成本的做法。判断是否该上它，关键是信号是否匹配，而不是词汇是否热门。

## 触发信号

- 需求边界模糊，稍不注意就会在实现阶段扩边界。
- 多个角色会 review 同一个改动，需要先对齐目标和非目标。
- 如果不先列验收标准，后续很难判断 agent 是否真的完成。

## 更适合谁

- 新功能、跨模块改动、需要显式验收的任务。
- 涉及 schema、API、权限、迁移或多端联动的需求。
- 组织希望先把“做什么”与“怎么做”分开审阅。

## 不适用场景

- 生产事故热修、单点配置修正或纯文案修订。
- 还没有基本验证命令、也没有人维护文档产物的团队。
- 明确只需一次性探索，不打算沉淀长期流程的场景。

## 快速判断矩阵

| 判断维度 | 匹配信号 | 不匹配信号 |
| --- | --- | --- |
| 任务边界 | 需求边界模糊，稍不注意就会在实现阶段扩边界。 | 生产事故热修、单点配置修正或纯文案修订。 |
| 协作方式 | 多个角色会 review 同一个改动，需要先对齐目标和非目标。 | 还没有基本验证命令、也没有人维护文档产物的团队。 |
| 验收要求 | 如果不先列验收标准，后续很难判断 agent 是否真的完成。 | 明确只需一次性探索，不打算沉淀长期流程的场景。 |
| 默认切换 | 边界越复杂，越适合先写合同再执行。 | 只剩单点修复时应切回更轻流程。 |

## 默认切换条件

- 如果任务规模下降到只剩局部修复，应切回更轻的 bugfix / refactor / test 流。
- 如果任务规模升级到需要更多角色或更多产物，应切到更重的框架层，而不是硬撑当前模式。
- 如果团队没有 owner、没有验证命令或没有清晰边界，再好的工作流名词都不会救场。

## 下一步怎么读

- [Spec Kit](/docs/workflows/frameworks/spec-kit)：适合先把 spec、plan、tasks 链条固定下来。
- [BMAD](/docs/workflows/frameworks/bmad)：适合需要多角色 handoff 的更重流程。
- [OpenAI Codex](/docs/tools/execution-stacks/openai-codex)：适合在 spec 定稿后进入本地或云端执行。
- [VS Code Agents](/docs/tools/control-planes/vscode-agents)：适合把本地探索和后台执行串在一条控制面里。

## 来源

- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
