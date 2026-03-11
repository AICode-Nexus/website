---
audience: "mixed"
stage: "intermediate"
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
title: "Spec Kit：接入手册"
description: "把 Spec Kit 接进真实仓库时的试跑、接入和收口方式。"
slug: "/workflows/frameworks/spec-kit/adoption-playbook"
sidebar_label: "接入手册"
tags: ["ai-coding", "workflow-framework", "spec-kit"]
---

# Spec Kit：接入手册

把框架写进文档并不难，真正难的是它进入真实仓库后还能和 repo 规则、验证命令、PR 审批和团队节奏对齐。Spec Kit 的接入重点，是让 spec、plan、tasks 真正变成合同，而不是漂亮模板。

## 先在哪类仓库试跑

先挑一个本来就需要设计与实现分开的新功能，验证 spec -> plan -> tasks 是否能减少返工。最合适的首个试点，是需求说得多、但落地时总是需要反复补充的中型功能。

## 试点前准备

- 把仓库现有目录边界、验证命令和可编辑范围嵌进 spec / plan 模板。
- 明确谁 review spec，谁 review plan，谁只在实现阶段介入。
- 先约定好 tasks 的颗粒度，不要一会儿写成 epic，一会儿写成命令清单。
- 为 spec / plan 设定变更规则，避免执行中偷偷改合同。

## 三步接入顺序

| 阶段 | 应该做什么 | 最低交付 |
| --- | --- | --- |
| 第 1 步 | 让 owner 写清目标、非目标和验收。 | spec |
| 第 2 步 | 基于真实仓库结构写 plan，补充依赖和验证方式。 | plan |
| 第 3 步 | 把 plan 切成可执行 tasks，并在收尾时对照 spec 验收。 | tasks + verification summary |

## 与仓库规范的连接

- Spec Kit 可以与现有 contract、branch policy、review checklist 直接拼接。
- 如果团队已经使用 issue / PR 工作系统，可把 spec 链接或摘要放回 ticket。
- 长任务可在 tasks 阶段再接 worktree 或后台 agent。
- 如果已有 [Spec-First](/docs/workflows/patterns/spec-first) 习惯，Spec Kit 实际上只是把那条路线标准化。

## 可以扩大范围的信号

- reviewer 会真的回看 spec 和 plan，而不是只看最终 diff。
- 返工主要从“需求补洞”转成“实现细节优化”。
- tasks 粒度稳定，执行时不再频繁重写。
- plan 能提前暴露依赖和目录边界问题。

## 该先减法的信号

- spec 和 plan 长期没人 review，团队直接从 tasks 或代码开始。
- tasks 总是和真实仓库不匹配，执行时不得不从头拆。
- 文档内容越来越长，但 acceptance criteria 仍然模糊。
- 每次任务都要临场解释这三份文档分别有什么用。

## 下一步怎么读

- [Spec-First](/docs/workflows/patterns/spec-first)：Spec Kit 最自然的落点就是 spec-first。
- [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud)：plan 定稿后可把部分任务交给后台或云端执行。
- [BMAD](/docs/workflows/frameworks/bmad)：需要多角色和更完整治理时，BMAD 更合适。
- [OpenSpec](/docs/workflows/frameworks/openspec)：如果主要是 brownfield 高频小改动，OpenSpec 更轻。
- [Superpowers](/docs/workflows/community-frameworks/superpowers)：如果你更缺日常 agent 操作框架而不是 spec 链，Superpowers 更贴近执行。

## 来源

- [GitHub Spec Kit](https://github.com/github/spec-kit)
