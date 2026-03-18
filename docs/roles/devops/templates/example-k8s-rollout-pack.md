---
title: 示例：Kubernetes 发布窗口训练包
description: 一份已填写的 DevOps 训练包示例，演示变更 brief、runbook、证据和 incident handoff 如何连起来。
slug: /roles/devops/templates/example-k8s-rollout-pack
sidebar_label: 示例：Kubernetes 发布窗口
tags: [ai-coding, devops, templates, examples]
track: cross-track
kind: guide
content_form: guide
audience: devops-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# 示例：Kubernetes 发布窗口训练包

这个示例把 [基础设施变更 Brief 模板](/docs/roles/devops/templates/infra-change-brief)、[Runbook 与回滚模板](/docs/roles/devops/templates/runbook-and-rollback)、[命令与证据模板](/docs/roles/devops/templates/commands-and-evidence) 和 [Incident / Handoff 模板](/docs/roles/devops/templates/incident-handoff) 串成一次真实的发布窗口包。

## 场景

- 目标：把 `billing-worker` 从单副本升级到 HPA，并切换新的队列消费配置。
- 风险：消息积压、重复消费、HPA 阈值误配。

## 1. 基础设施变更 Brief 摘要

```md
## 影响范围
- staging / production
- billing-worker deployment
- queue-consumer configmap

## 风险边界
- 不修改 producer
- 若 lag > 5k 且错误率 > 2%，立即回滚
```

## 2. Runbook 与回滚摘要

```md
## 执行步骤
1. apply configmap
2. rollout deployment
3. 观察 queue lag 与 pod restart

## 回滚步骤
1. kubectl rollout undo deploy/billing-worker
2. apply 旧版 configmap
3. 再看 lag 和 error log
```

## 3. 命令与证据摘要

```md
## 执行命令
- kubectl apply -f k8s/billing-worker-config.yaml
- kubectl rollout status deploy/billing-worker
- kubectl top pods -n billing

## 执行后证据
- grafana queue lag screenshot
- loki error log sample
- HPA target current value
```

## 4. Incident / Handoff 摘要

```md
## 当前状态
- staging 已稳定 30 分钟
- production 进入观察窗口

## 升级与止损条件
- lag 连续 10 分钟上升则升级给平台 oncall
- 重复消费告警出现则触发回滚
```

## 配套 workflow 与案例

- 先看 [Local -> Background -> Cloud](/docs/workflows/patterns/local-to-background-to-cloud/runbook)。
- 如果涉及多 lane 并行变更，可接 [Parallel Worktrees / Multi-Agent](/docs/workflows/patterns/parallel-worktrees-multi-agent/runbook)。
- 想看后台执行与交接的节奏：去 [VS Code Agents 本地到后台交接案例](/docs/case-studies/vscode-agents-local-to-background-handoff)。
