---
audience: "advanced"
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
journey_stage: "implementation"
title: "Local -> Background -> Cloud：治理与风险"
description: "Local -> Background -> Cloud 需要的权限边界、验证方式和失败模式。"
slug: "/workflows/patterns/local-to-background-to-cloud/governance-and-risks"
sidebar_label: "补充：治理与风险"
sidebar_position: 8
tags: ["ai-coding", "workflow", "local-to-background-to-cloud"]
---

# Local -> Background -> Cloud：治理与风险

这条主线的风险不在三段太多，而在三段都以为下一段会把尾收干净。没有明确 owner、handoff 资产和平台收口时，本地、后台、云端只会制造更多上下文碎片。

## 现在先做什么

- 想先跑三层主线：去 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
- 想知道什么时候该停下或切回轻流程：去 [Local -> Background -> Cloud 风险与切换条件](/docs/workflows/patterns/local-to-background-to-cloud/pitfalls)。
- 想先补 review 与验证门禁：去 [Review Quality Gates](/docs/standards/review-quality-gates)。

## 治理检查表

| 治理面 | 最低要求 | 失控时会发生什么 |
| --- | --- | --- |
| local owner | 本地负责 discovery 和 brief。 | 后台被迫重新理解任务。 |
| background owner | 后台负责执行日志和阶段结果。 | 只有结果，没有过程。 |
| platform owner | 平台负责 review 和最终判断。 | 大家都以为“已经有人会收口”。 |
| 交接资产 | brief、日志、diff、验证结果齐全。 | 三段之间反复重复劳动。 |

## 权限与 owner

- 本地、后台、平台三段都要有清晰 owner，不要假设流程会自动收尾。
- 只有边界清楚的部分才交后台，模糊问题继续留在本地。
- 平台层负责追踪和 review，不负责替你补合同。
- 如果后台要动高风险目录或长链路步骤，必须提前定义暂停和接管条件。

## 验证与 review

- 本地阶段先交付结构化 brief，再交后台。
- 后台阶段保留日志、diff 和验证结果，不能只贴结论。
- 平台收口仍要有人做最终判断，review 不是自动完成按钮。
- 每次 handoff 都要解释“当前已知什么、未知什么、下一段该验证什么”。

## 最常见失控模式

- 本地、后台和平台三份上下文完全分裂，重复劳动越来越多。
- 没有 owner，大家都以为下一阶段会自动把尾收干净。
- 后台产物没回到 PR 或仓库，最后审计和 review 都无从落地。
- 本地发现阶段写得太散，导致后台必须重新做 discovery。

## 什么时候先停下来

- brief 根本无法稳定描述范围和下一步。
- 后台阶段开始替本地做大量问题定义。
- 平台收口拿不到日志、diff 和验证证据。
- 三段切换成本已经高于单入口推进成本。

## 读完回哪里

- 想先按标准主线走：回 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
- 想知道什么时候停：去 [Local -> Background -> Cloud 风险与切换条件](/docs/workflows/patterns/local-to-background-to-cloud/pitfalls)。
- 想补 review 门禁：去 [Review Quality Gates](/docs/standards/review-quality-gates)。

## 来源

- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
