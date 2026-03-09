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

## 现在先做什么

- 想先跑三层主线：去 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
- 想知道什么时候该停下或切回轻流程：去 [Local -> Background -> Cloud 风险与切换条件](/docs/workflows/patterns/local-to-background-to-cloud/pitfalls)。
- 想先补 review 与验证门禁：去 [Review Quality Gates](/docs/standards/review-quality-gates)。

## 权限与 owner

- 本地、后台、平台三段都要有清晰 owner，不要假设流程会自动收尾。
- 只有边界清楚的部分才交后台，模糊问题继续留在本地。
- 平台层负责追踪和 review，不负责替你补合同。

## 验证与 review

- 本地阶段先交付结构化 brief，再交后台。
- 后台阶段保留日志、diff 和验证结果，不能只贴结论。
- 平台收口仍要有人做最终判断，review 不是自动完成按钮。

## 失败信号

- 本地、后台和平台三份上下文完全分裂，重复劳动越来越多。
- 没有 owner，大家都以为下一阶段会自动把尾收干净。
- 后台产物没回到 PR 或仓库，最后审计和 review 都无从落地。

## 读完回哪里

- 想先按标准主线走：回 [Local -> Background -> Cloud Runbook](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
- 想知道什么时候停：去 [Local -> Background -> Cloud 风险与切换条件](/docs/workflows/patterns/local-to-background-to-cloud/pitfalls)。
- 想补 review 门禁：去 [Review Quality Gates](/docs/standards/review-quality-gates)。

## 来源

- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
