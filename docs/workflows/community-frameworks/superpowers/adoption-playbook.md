---
audience: "advanced"
stage: "advanced"
featured: false
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "playbook"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "development-planning"
title: "Superpowers：接入手册"
description: "把 Superpowers 接进真实仓库时的试跑、接入和收口方式。"
slug: "/workflows/community-frameworks/superpowers/adoption-playbook"
sidebar_label: "接入手册"
tags: ["ai-coding", "workflow-framework", "superpowers"]
---

# Superpowers：接入手册

把框架写进文档并不难，真正难的是它进入真实仓库后还能和 repo 规则、验证命令、PR 审批和团队节奏对齐。接入手册的重点，就是降低“文档很好看、但真实任务没人照着走”的风险。

## 先在哪类仓库试跑

在一个已有 repo 规则和固定验证命令的仓库里试跑，让 Superpowers 先叠加在现有工具之上，而不是替代全部治理。

## 接入步骤

- 先确定主入口工具，再决定哪些 Superpowers 能力通过 skills、rules 或 repo contract 承接。
- 把 worktree 命名、测试要求和 review packet 变成团队共识，不要只留在个人习惯里。
- 先从一两个长任务试点，观察是否真的降低返工和上下文丢失。
- 把与 repo 相关的强约束仍然放回 AGENTS.md / CLAUDE.md / GEMINI.md，而不是全压在社区框架里。

## 试跑矩阵

| 阶段 | 应该做什么 | 完成标准 |
| --- | --- | --- |
| 试跑前 | 在一个已有 repo 规则和固定验证命令的仓库里试跑，让 Superpowers 先叠加在现有工具之上，而不是替代全部治理。 | 能明确一类真实任务和一位 owner。 |
| 试跑中 | 先确定主入口工具，再决定哪些 Superpowers 能力通过 skills、rules 或 repo contract 承接。 | 真实任务能按框架阶段推进。 |
| 试跑后 | 把与 repo 相关的强约束仍然放回 AGENTS.md / CLAUDE.md / GEMINI.md，而不是全压在社区框架里。 | 能判断返工量、review 成本和维护成本是否下降。 |

## 与仓库规范的连接

- Superpowers 更像方法层，可叠加在 Claude Code、Codex、Cursor 等主入口之上。
- 与 Spec Kit 结合时，可先用 spec 固定边界，再用 Superpowers 管理执行节奏。
- 与 GitHub / PR 系统结合时，最终仍要把证据回流到 branch、PR 和 review。

## 试跑周期与收口

- 最少跑 2 到 4 个真实任务，再判断是否值得扩大。
- 每轮试跑都要记录返工量、review 修补量和文档维护成本。
- 如果试跑阶段就明显没人遵守，应该先减重，而不是继续加流程。

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
