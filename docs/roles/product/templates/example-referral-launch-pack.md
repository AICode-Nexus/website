---
title: 示例：会员推荐计划训练包
description: 一份已填写的产品训练包示例，演示从 discovery 到 PRD、验证和 handoff 的完整串联。
slug: /roles/product/templates/example-referral-launch-pack
sidebar_label: 示例：会员推荐计划
tags: [ai-coding, product, templates, examples]
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

# 示例：会员推荐计划训练包

这个示例把 [发现与调研 Brief 模板](/docs/roles/product/templates/discovery-brief)、[PRD 大纲模板](/docs/roles/product/templates/prd-outline)、[原型验证模板](/docs/roles/product/templates/prototype-validation) 和 [Handoff 与验收模板](/docs/roles/product/templates/handoff-and-acceptance) 串成一个真实任务链。

## 场景

- 目标：为新用户 onboarding 增加“邀请好友得权益”模块。
- 当前问题：拉新成本高，但已有用户分享率偏低。
- 交付对象：设计、前端、QA、增长 owner。

## 1. Discovery Brief 摘要

```md
## 要回答的问题
- 推荐入口应该放在注册后首屏还是账户页？
- 奖励应按“注册成功”还是“首单完成”发放？

## 假设
- 首屏露出能提升分享率，但会影响 onboarding 完成率。
- 奖励按首单完成发放，风控更稳但转化更慢。

## 证据来源
- 近 30 天 onboarding 漏斗数据
- 两个竞品的推荐链路截图
- 支付与优惠券系统约束访谈
```

## 2. PRD 摘要

```md
## 目标
- 分享率从 4.8% 提升到 7%
- 被邀请用户首单转化率不低于现有新用户首单转化率的 90%

## 范围内
- onboarding 完成页新增推荐卡片
- 账户页新增“我的推荐”入口
- 后台新增推荐状态枚举

## 范围外
- 不做社交裂变排行榜
- 不改优惠券底层结算规则

## 验收标准
- 用户可成功生成邀请链接并查看状态
- 被邀请用户首单完成后，双方奖励状态更新正确
- 失败状态有明确提示和客服入口
```

## 3. 原型验证摘要

```md
## 验证目标
- 用户是否能在 onboarding 结束后理解奖励机制
- 推荐卡片是否会分散主流程注意力

## 验证方式
- 内部走查 5 人
- Figma clickable prototype
- 浏览器 demo 校对文案长度和折行

## 观察结果
- 奖励规则放在二级弹层后，理解成本明显上升
- 账户页入口更适合作为二次触达，不适合单独承担首次推荐
```

## 4. Handoff 与验收摘要

```md
## 必看链接
- PRD: docs/prd/referral-program-v1.md
- 原型: figma.com/design/.../node-id=120:88
- 技术约束: docs/specs/referral-service-constraints.md

## 风险与待确认项
- 奖励发放依赖支付服务回调，存在延迟
- 首次灰度阶段只开放 iOS 与 Web

## 上线与回看
- 灰度窗口：周三 14:00-18:00
- 重点看分享点击率、邀请转化、支付回调失败率
```

## 配套 workflow 与案例

- 先走 [Spec-First](/docs/workflows/patterns/spec-first/runbook)，把 discovery 和 PRD 收紧。
- 进入任务拆分时，再接 [Issue / Jira -> Draft PR](/docs/workflows/patterns/issue-to-draft-pr/runbook)。
- 想看交接如何更贴近真实 review：去 [GitHub Copilot Draft PR Handoff](/docs/case-studies/github-copilot-draft-pr-handoff)。
