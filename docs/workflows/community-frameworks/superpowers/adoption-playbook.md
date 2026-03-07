---
title: "Superpowers：接入手册"
description: "把 Superpowers 接进真实仓库时的试跑、接入和收口方式。"
slug: "/workflows/community-frameworks/superpowers/adoption-playbook"
sidebar_label: "接入手册"
tags: ["ai-coding", "workflow-framework", "superpowers"]
track: "prompting-workflows"
kind: "guide"
audience: "advanced"
stage: "advanced"
featured: false
pillar: "workflows"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
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

## 与仓库规范的连接

- Superpowers 更像方法层，可叠加在 Claude Code、Codex、Cursor 等主入口之上。
- 与 Spec Kit 结合时，可先用 spec 固定边界，再用 Superpowers 管理执行节奏。
- 与 GitHub / PR 系统结合时，最终仍要把证据回流到 branch、PR 和 review。

## 试跑周期

- 最少跑 2 到 4 个真实任务，再判断是否值得扩大。
- 每轮试跑都要记录返工量、review 修补量和文档维护成本。
- 如果试跑阶段就明显没人遵守，应该先减重，而不是继续加流程。
