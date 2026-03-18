---
title: 规则与规范文档
description: 产品经理如何用 AGENTS.md、PRD 合同、任务 brief 和验收模板把 AI 协作写成可复用规则。
slug: /roles/product/rules-and-instruction-files
sidebar_label: 规则与规范文档
tags: [ai-coding, product, rules]
track: cross-track
kind: guide
content_form: guide
audience: product-manager
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# 规则与规范文档

产品经理最容易把 AI 用散的地方，是把“需求真相”“本次任务”“验收口径”全塞进一次聊天。更稳的做法是把长期规则写进 instruction files，把本次范围写进 PRD / brief，把最终验收写进交付模板。

## 产品侧文档分层

| 载体 | 更适合写什么 |
| --- | --- |
| `AGENTS.md` | 仓库或项目长期合同、PRD 必备章节、交付纪律 |
| `CLAUDE.md` / 工具说明 | 默认工作方式、输出格式、会议纪要和需求拆解习惯 |
| PRD / Spec | 背景、目标、范围、用户故事、验收标准 |
| 任务 brief | 本次故事、依赖、风险、交付物 |
| 发布 / handoff 模板 | 验收结果、未覆盖风险、跨团队同步项 |

## 最值得写进产品长期合同的内容

- 任何功能需求必须包含目标、范围外事项和验收标准。
- 技术调研输出必须给出假设、风险和依赖，而不是只给“建议实现”。
- 原型验证类任务必须说明验证目标和判定标准。
- 交付说明必须指向对应 PRD、设计稿、测试结论和发布事项。

## 一个更稳的产品任务 brief

```yaml
task:
  goal: "为新 onboarding 流程补首版 PRD 与验收标准"
  must_include:
    - "用户故事"
    - "范围外说明"
    - "技术依赖"
    - "成功指标"
  artifacts:
    - "PRD 初稿"
    - "验收清单"
    - "风险与待确认问题"
```

## 可直接复制的产品模板

| 模板 | 什么时候先用 |
| --- | --- |
| [PRD 大纲模板](/docs/roles/product/templates/prd-outline) | 需要把背景、目标、范围外和验收固定下来时 |
| [发现与调研 Brief 模板](/docs/roles/product/templates/discovery-brief) | 还在做需求澄清、竞品或技术调研时 |
| [原型验证模板](/docs/roles/product/templates/prototype-validation) | 需要验证原型、交互或关键假设时 |
| [Handoff 与验收模板](/docs/roles/product/templates/handoff-and-acceptance) | 要把需求交给设计、研发、测试或上线 owner 时 |

如果团队还没有固定模板首页，先从 [产品训练包模板](/docs/roles/product/templates) 建目录，再决定哪些要沉到 repo 级合同里。

## 常见失败方式

1. PRD 只有功能列表，没有范围外与验收标准。
2. 工具局部规则代替了真正的项目合同。
3. 任务 brief 没写依赖与风险，导致 AI 把问题当成单点需求处理。
4. 发布说明不回链到原始需求与验收项。

## 下一步

- 想继续看产品角色该怎么选 skills 与 MCP：去 [Skills 与 MCP](/docs/roles/product/skills-and-mcp)。
- 想判断需求、原型、交付跟踪分别该用什么入口：去 [工具匹配与选型](/docs/roles/product/tool-fit-and-selection)。
- 想直接复制可复用产物：去 [产品训练包模板](/docs/roles/product/templates)。
