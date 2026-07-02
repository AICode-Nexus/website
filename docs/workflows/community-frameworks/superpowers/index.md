---
audience: "advanced"
stage: "advanced"
featured: true
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "development-planning"
title: "Superpowers"
description: "Superpowers 的定位、适用团队和默认进入方式。"
slug: "/workflows/community-frameworks/superpowers"
sidebar_label: "概览"
tags: ["ai-coding", "workflow-framework", "superpowers"]
---

# Superpowers

Superpowers 是面向 coding agents 的社区工作流框架：把 brainstorming、worktree、plan、subagent、TDD 和 review 串成一条日常执行方法链。

## 这个框架解决什么

- 已经高频使用 Claude Code、Codex、Cursor 等 agent 的团队或个人。
- 希望把日常 agent 协作方式标准化，而不是每次手工拼 prompt。
- 接受 worktree、技能库和更强执行纪律的终端或 IDE power user。

## 默认进入方式

在一个已有 repo 规则和固定验证命令的仓库里试跑，让 Superpowers 先叠加在现有工具之上，而不是替代全部治理。

## 更适合谁

- 团队已经熟悉 coding agents，但产出波动仍然很大，缺少统一套路。
- 你需要的是“每天怎么做事”的方法框架，而不是仅仅一个 spec 模板。
- 愿意为技能、worktree、TDD 和 review 付出维护成本，换取稳定性。

## 角色与阶段概览

| 阶段 | 目标 | 主要产物 |
| --- | --- | --- |
| Brainstorming | 先把问题理解、方案选项和拆分方式讲清，不急着直接改代码。 | brainstorm note |
| Worktree / Branch Setup | 为长任务或并行 lane 准备独立工作区和命名约定。 | task worktrees |
| Writing Plans | 把方案固化为分步计划、执行清单和风险说明。 | plan |
| Subagent / Execution | 根据 plan 分配子任务，逐步执行并汇总结果。 | execution lanes |
| TDD / Review / Finish Branch | 用测试、review packet 和 branch 清理收尾，保证可 merge。 | review-ready branch |

## 采用前检查

- 先确认团队已经有 repo 规则、验证命令和明确 owner，否则只会把流程层再加一层壳。
- 先挑一个真实任务试跑，而不是先做大面积制度推广。
- 先 brainstorming 和 plan，再开多条 lane；不要直接让多个 agent 胡乱开工。
- 每个 lane 要把测试和 review 证据带回 owner，而不是只说“我做完了”。

## 下一步怎么读

- [Agent Skills 与插件生态](/docs/ai-directory/agent-skills-and-plugins)：把 Superpowers 放到 skills、插件市场与方法包的公共目录里一起比较。
- [Terminal-First Repo Pairing](/docs/workflows/patterns/terminal-first-repo-pairing)：Superpowers 很适合叠加在终端式 repo pairing 上。
- [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent)：它把 worktree 和 subagent 使用方式标准化。
- [Spec-First](/docs/workflows/patterns/spec-first)：复杂任务可先 spec-first，再交给 Superpowers 组织日常执行。
- [BMAD](/docs/workflows/frameworks/bmad)：如果你需要团队角色和阶段制度，BMAD 更适合组织治理。
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：如果你主要想固定 spec -> plan -> tasks，Spec Kit 更直接。

## 来源

- [Superpowers](https://github.com/obra/superpowers)
- [Superpowers Marketplace](https://github.com/obra/superpowers-marketplace)
