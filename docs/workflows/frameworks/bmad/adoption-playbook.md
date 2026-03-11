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
title: "BMAD：接入手册"
description: "把 BMAD 接进真实仓库时的试跑、接入和收口方式。"
slug: "/workflows/frameworks/bmad/adoption-playbook"
sidebar_label: "接入手册"
tags: ["ai-coding", "workflow-framework", "bmad"]
---

# BMAD：接入手册

把框架写进文档并不难，真正难的是它进入真实仓库后还能和 repo 规则、验证命令、PR 审批和团队节奏对齐。BMAD 的接入重点不是“把模板放进去”，而是把阶段停点、owner 和证据要求接回真实交付链。

## 先在哪类仓库试跑

先在一个中等复杂度、至少跨两个阶段的任务里试跑，而不是拿最小 bug 或最大平台重构做第一次试点。最理想的试点，是一个已经被反复讨论、但每次都因为 handoff 不稳而返工的真实项目。

## 试点前准备

- 把 BMAD 输出映射到仓库现有目录，不要另起一套孤立文档宇宙。
- 明确哪些阶段必须等 owner 确认，哪些阶段允许 agent 连续推进。
- 提前写清验证命令、PR 审批要求和风险升级路径。
- 先确定一位最终 owner，避免流程里人人参与、无人收口。

## 四周接入顺序

| 周期 | 应该做什么 | 最低交付 |
| --- | --- | --- |
| 第 1 周 | 选 1 个真实任务，补目标说明、owner 和非目标。 | 一页 brief。 |
| 第 2 周 | 做 stories 拆解和方案 note，明确停点。 | stories + architecture / plan。 |
| 第 3 周 | 按故事执行，要求每条 lane 回传测试与 review 证据。 | implementation evidence。 |
| 第 4 周 | 复盘哪些阶段有价值，哪些模板应删。 | retro + checklist update。 |

## Owner 与节奏

| 节点 | 谁负责 | 产出什么 |
| --- | --- | --- |
| 目标确认 | Sponsor / Owner | 目标、范围、成功标准。 |
| 故事拆解确认 | PM / Owner | stories 是否可执行。 |
| 方案停点 | Architect / Owner | 方案、风险、验证方式。 |
| merge 前检查 | Engineer / QA / Reviewer | 代码、测试、review 证据。 |
| 复盘收口 | Owner / Reviewer | 删哪些 ritual，保留哪些产物。 |

## 与仓库规范的连接

- BMAD 负责角色与阶段，仓库规则负责权限、可编辑区域和验证门禁。
- 长任务建议配合 worktree 和 issue / story 编号，减少上下文混乱。
- 最终合并仍回到 repo 的 CI、review 和 branch protection 体系。
- 如果你已经有 [Spec-First](/docs/workflows/patterns/spec-first) 或 [Issue / Jira -> Draft PR](/docs/workflows/patterns/issue-to-draft-pr) 习惯，不必替换，只要把它们挂到 BMAD 的对应阶段上。

## 可以扩大范围的信号

- stories 真能帮助多人并行，而不是多写一层文档。
- 方案停点能提前暴露依赖、权限和验收问题。
- review 明显更少出现“这不是我要的东西”。
- 复盘能持续删掉无效 ritual，而不是只增加表单。

## 该先减法的信号

- 阶段越来越多，但 owner 仍在聊天里临时拍板。
- stories 与真实仓库边界对不上，执行还得重新拆。
- 文档在长，证据在少，合并还是靠口头说明。
- 团队绕开流程做事的频率高于按流程做事。

## 下一步怎么读

- [Spec-First](/docs/workflows/patterns/spec-first)：大多数 BMAD 任务最终都应落回先定边界、再执行的主线。
- [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent)：在故事清晰后再把低耦合子任务并行化。
- [Spec Kit](/docs/workflows/frameworks/spec-kit)：如果你主要缺的是 spec -> plan -> tasks 的产物链，Spec Kit 更轻。
- [OpenSpec](/docs/workflows/frameworks/openspec)：如果你主要是 brownfield 的高频小改动，OpenSpec 更省维护成本。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：如果你需要的是日常 agent 操作框架，而不是团队角色制度，Superpowers 更贴近日常执行。

## 来源

- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
