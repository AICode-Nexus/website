---
title: 接口改动 Brief 模板
description: 用统一 brief 写清后端接口改动的 contract、兼容性、验证和输出要求。
slug: /roles/backend/templates/api-change-brief
sidebar_label: 接口改动 Brief
tags: [ai-coding, backend, templates]
track: cross-track
kind: template
content_form: template
audience: backend-engineer
stage: intermediate
featured: false
domain: workflows
journey_stage: implementation
entry_role: domain
reviewed_at: 2026-03-18
source_window_end: 2026-03-18
market_status: current
---

# 接口改动 Brief 模板

适用场景：contract 已经清楚，准备进入接口实现、错误模型更新和验证阶段。

```text
任务：实现一个后端接口改动
接口路径：
HTTP 方法：
请求 schema：
响应 schema：
错误码与状态码：
鉴权与租户边界：
需要兼容的旧客户端行为：
允许修改的文件：
必须补的验证：
- lint
- type-check
- contract test
- integration test
- smoke path
输出要求：
- 代码改动
- contract 或 schema 更新
- 风险说明
- 验证结果
```

## 最容易漏的字段

| 字段 | 漏掉会怎样 |
| --- | --- |
| 兼容旧客户端行为 | 容易把后端改动写成破坏式升级 |
| 错误码与状态码 | reviewer 很难判断 contract 是否完整 |
| 允许修改的文件 | 实施时容易顺手扩散到无关目录 |

## 配套页面

- [API 与契约](/docs/roles/backend/api-and-contracts)
- [质量门禁与测试](/docs/roles/backend/quality-and-testing)
