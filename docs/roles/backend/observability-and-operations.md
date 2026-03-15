---
title: 观测性与运维协作
description: 后端 AI 产出要能在生产环境被理解、监控、回滚，而不只是本地跑通。
slug: /roles/backend/observability-and-operations
sidebar_label: 观测性与运维协作
tags: [ai-coding, backend, observability]
track: cross-track
kind: guide
content_form: guide
audience: backend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
---

# 观测性与运维协作

对后端团队来说，AI 是否“真的帮上忙”，最终要看它生成的变更能不能被生产环境吸收。没有日志、trace、指标、告警和回滚路径的改动，只是把风险从开发阶段推迟到了线上。

## 默认遥测包

任何新接口、新任务链路或新第三方集成，至少应该带上：

- 请求或任务级 correlation ID。
- 成功/失败计数和延迟分布。
- 关键依赖的超时、重试和错误码统计。
- 队列堆积、任务重试次数和死信数量。

如果这些信号还没规划出来，说明改动尚未完成，即使接口已经能返回 200。

## 结构化日志的最低要求

- 日志字段要能让人按 request ID、user/tenant、job ID、provider name 检索。
- 敏感信息默认脱敏，不要把 token、邮箱、身份证、卡号原文写进日志。
- 业务异常和系统异常要分开，避免告警被“已知用户错误”淹没。

这类约束最好写进 [上下文与规则](/docs/roles/backend/context-and-rules) 的 repo contract，让 AI 生成日志代码时遵循相同格式。

## metrics 和 trace 用来回答什么问题

### metrics 负责看健康趋势

- 错误率是不是上升。
- 平均值、P95、P99 是否异常。
- 哪个队列或 provider 开始积压。

### trace 负责追具体链路

- 请求卡在哪个 span。
- 外部依赖慢在 DNS、连接、认证还是业务处理。
- 一次失败是不是由重试放大。

对多服务改动，trace 通常比堆日志更值得优先补齐。

## 发布、灰度和回滚要提前写

每次让 AI 参与后端改动时，都应该预先定义：

- 是否支持 feature flag 或灰度发布。
- 是否需要双写/双读兼容期。
- 回滚时是回代码、回配置还是停任务消费。
- 哪些指标恶化会触发人工接管。

这部分和 [质量门禁与测试](/docs/roles/backend/quality-and-testing) 里的 smoke path 是同一条链路的最后一段，不应该分家。

## 和运维团队怎么分工

后端团队至少要向 [运维工程师](/docs/roles/devops) 交付：

- 新增环境变量与密钥需求。
- Dashboard 或告警规则变更点。
- 发布窗口和风险说明。
- 回滚 runbook 或人工接管条件。

如果这些内容不存在，就不要把“上线交给运维”当成已经完成协作。

## 下一步

- 想先补测试和 smoke path：去 [质量门禁与测试](/docs/roles/backend/quality-and-testing)。
- 想先整理 SDK、migration、env manifest 和 release artifact：去 [仓库结构与交付](/docs/roles/backend/architecture-and-delivery)。
- 想先把日志格式、命令、计划和 review 规则写进 repo：去 [上下文与规则](/docs/roles/backend/context-and-rules)。
