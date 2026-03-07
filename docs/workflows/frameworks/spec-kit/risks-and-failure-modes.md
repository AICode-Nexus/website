---
title: "Spec Kit：误用与退出条件"
description: "Spec Kit 的常见误用、维护成本和退出信号。"
slug: "/workflows/frameworks/spec-kit/risks-and-failure-modes"
sidebar_label: "误用与退出条件"
tags: ["ai-coding", "workflow-framework", "spec-kit"]
track: "prompting-workflows"
kind: "guide"
audience: "mixed"
stage: "intermediate"
featured: false
pillar: "workflows"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Spec Kit：误用与退出条件

框架最大的风险，不是它本身太差，而是团队把它用成“看起来很完整”的仪式，却没有把真实交付、验证和 review 绑进去。能不能及时退出错误用法，比一开始会不会写模板更重要。

## 常见误用

- 把 spec 写成空洞大词，导致 plan 和 tasks 仍然无从落地。
- 在没看 repo 的情况下就生成 tasks，最后返工更多。
- 把 Spec Kit 当成文档模板，而不是执行与验收合同。

## 维护成本

- 模板、示例和任务拆解标准需要持续优化。
- 需要有人判断 spec 到底写到多深才合适。
- 任务复杂度变化后，模板也要跟着收缩或扩展。

## 退出条件

- spec 与 plan 长期被跳过，团队直接回到临场 prompt。
- tasks 无法对应真实仓库边界，执行始终要重做规划。
- review 已经不再参考 spec，说明链路失效。

## 来源

- [GitHub Spec Kit](https://github.com/github/spec-kit)
