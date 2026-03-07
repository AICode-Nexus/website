---
title: "BMAD：接入手册"
description: "把 BMAD 接进真实仓库时的试跑、接入和收口方式。"
slug: "/workflows/frameworks/bmad/adoption-playbook"
sidebar_label: "接入手册"
tags: ["ai-coding", "workflow-framework", "bmad"]
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

# BMAD：接入手册

把框架写进文档并不难，真正难的是它进入真实仓库后还能和 repo 规则、验证命令、PR 审批和团队节奏对齐。接入手册的重点，就是降低“文档很好看、但真实任务没人照着走”的风险。

## 先在哪类仓库试跑

先在一个中等复杂度、至少跨两个阶段的任务里试跑，而不是拿最小 bug 或最大平台重构做第一次试点。

## 接入步骤

- 先把 BMAD 输出映射到你仓库现有的文档和任务目录，不要另起一套孤立宇宙。
- 定义哪些阶段必须停下等待人工确认，哪些阶段可以继续由 agent 推进。
- 把验证命令、评审清单和 repo 规则接进每个阶段，而不是让 BMAD 独立漂浮。
- 先跑 2 到 4 个真实故事，再根据返工与 review 成本收敛流程。

## 与仓库规范的连接

- BMAD 负责角色与阶段，仓库规则负责权限、可编辑区域和验证门禁。
- 长任务建议配合 worktree 和 issue / story 编号，减少上下文混乱。
- 最终合并仍回到 repo 的 CI、review 和 branch protection 体系。

## 试跑周期

- 最少跑 2 到 4 个真实任务，再判断是否值得扩大。
- 每轮试跑都要记录返工量、review 修补量和文档维护成本。
- 如果试跑阶段就明显没人遵守，应该先减重，而不是继续加流程。
