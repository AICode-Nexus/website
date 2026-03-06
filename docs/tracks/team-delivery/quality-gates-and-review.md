---
title: 质量门禁与 Review
description: 让 AI 生成结果进入可控交付流程的关键，是 review 设计和质量门禁，而不是模型本身。
slug: /team-delivery/quality-gates-and-review
sidebar_label: 质量门禁与 Review
tags: [ai-coding, quality, review]
track: team-delivery
kind: guide
audience: mixed
stage: intermediate
featured: false
---

# 质量门禁与 Review

## 背景

AI coding 最大的风险往往不是第一次生成错误，而是错误被快速带进主分支。模型和 agent 让产出速度更快之后，review 和门禁如果不升级，风险只会更早进入系统。

## 结论先行

你需要把 review、lint、test、目录边界和审批条件一起设计成门禁，而不是只让 reviewer“多看看”。

高质量门禁的目标不是拖慢速度，而是把低价值的人肉修补，替换成更早、更自动、更清楚的拦截。

## 适用场景

- 团队引入 AI coding
- 调整 review 规范
- 想降低 merge 前人工修补量
- 想让不同 agent 入口共享统一质量标准

## 核心概念

### 1. Review 关注点

review 不应该平均看所有 diff，而应该重点看：

- 是否越界
- 是否符合 issue / contract
- 是否覆盖测试和失败路径
- 是否引入架构层面的新风险

### 2. 质量门禁

自动化检查必须接在 Agent 输出之后。

最小门禁通常包括：

- lint
- test
- build 或 type check
- 必要时的安全扫描

### 3. 路径级规则

不是所有目录都要一样严格。高风险目录应该有更高门槛，例如：

- infra
- auth
- payment
- migration

### 4. 失败恢复

门禁不是只管拦截，也要管出问题后如何回退。

## 当前官方事实

截至 2026 年 3 月 6 日，GitHub 已把“instructions + code review + coding agent”做成一套联动能力：

- GitHub Docs 说明可以通过 `.github/copilot-instructions.md` 和 path-specific instructions 为 coding agent 与 code review 提供仓库级规则。
- GitHub Docs 说明 Copilot code review 可以在 PR 中自动执行 review。
- GitHub Docs 说明 coding agent 会依据仓库设置、branch protections 和 environment secrets 边界工作。

这说明门禁的正确方向不是更依赖“人工记忆”，而是把规则版本化、路径化、自动化。

## 推荐做法

### 第一层：把 review 重点写出来

至少写清：

- 哪些目录属于高风险目录
- 哪些改动一定要人工确认
- 哪些 PR 必须有测试结果

### 第二层：把门禁自动化

把下列检查接到 agent 输出之后：

- lint
- test
- build / type check
- path-specific approval

### 第三层：为 reviewer 减少低价值负担

让 agent 在 PR 里主动给出：

- 变更摘要
- 风险点
- 验证结果
- 未解决问题

## 一份最小 review 清单

```text
- 是否只修改了允许的目录？
- 是否满足原任务验收标准？
- 是否有必要的测试和验证结果？
- 是否引入不必要的结构变更？
- 如果失败，是否容易回退？
```

## 常见错误

- 过度相信第一次输出
- 只看 diff，不跑验证
- 质量门禁只写在文档里，不自动执行
- reviewer 在收拾基础卫生，而不是审真正的风险

## 延伸阅读

- [上下文、记忆与规则](/docs/models-agents/context-memory-and-rules)
- [Review 与 PR 工具链](/docs/ides-tooling/review-and-pr-tooling)
- [从个人工作流到团队协作](/docs/team-delivery/solo-to-team-transition)

## 来源

- GitHub Docs: [Customizing Copilot coding agent with repository custom instructions](https://docs.github.com/en/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot)
- GitHub Docs: [Configuring GitHub Copilot code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/configure-automatic-code-review-by-copilot)
- GitHub Docs: [About GitHub Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent)
