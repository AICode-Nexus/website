---
title: 上下文、记忆与规则
description: 解释 repo instructions、memory、rules、hook 和工作目录边界如何共同影响 AI coding 质量。
slug: /models-agents/context-memory-and-rules
sidebar_label: 上下文、记忆与规则
tags: [ai-coding, context, memory, rules]
track: models-agents
kind: guide
audience: individual
stage: intermediate
featured: false
---

# 上下文、记忆与规则

## 背景

模型能力提升后，影响输出质量的更大变量通常变成上下文组织和规则注入方式。你以为自己在升级模型，实际上更可能是在为“上下文管理失败”买单。

## 结论先行

对于大多数个人工程师来说，稳定结果的优先顺序通常是：

1. 先把项目规则写成显式文件
2. 再把上下文传递方式固定下来
3. 最后再引入记忆和自动化 hooks

良好的 rules 和 context 设计，往往比切一个更强模型更能稳定提升结果质量。

## 适用场景

- 经常出现越界修改
- 反复输入同样背景
- 想让 Agent 更稳定地遵守项目约束
- 想减少“这次能行、下次不行”的波动

## 核心概念

### 1. Repo Rules

Repo rules 是最应该先做的层。它负责告诉 agent：

- 哪些目录可以动，哪些不能动
- 哪些命令必须跑
- 哪些风格、架构和测试要求是硬约束

如果规则不在仓库里，而只在你脑子里，Agent 不可能稳定遵守。

### 2. Context Packing

上下文不是越多越好，而是越相关越好。

好的上下文通常包含：

- 任务目标
- 目录范围
- 相关文件
- 当前失败信息
- 验收标准

坏的上下文通常是：

- 一大段模糊背景
- 没有边界的“请帮我优化整个项目”
- 不相关文件堆满上下文窗口

### 3. Memory

Memory 适合保存长期偏好和仓库级习惯，但不能代替 rules。

它更适合记住：

- 常见目录约定
- 代码风格偏好
- 常用验证命令
- 团队约定的默认行为

它不适合被当成永久真相，因为代码库会变，旧记忆会过期。

### 4. Hooks

Hooks 负责把规则变成自动验证动作。

典型用途：

- 改完代码自动跑 lint
- 关键路径变更触发 test
- 高风险命令触发审批

### 5. Boundary

边界的本质是让 agent 知道“到哪里为止”。

包括：

- 目录边界
- 命令权限边界
- 网络访问边界
- PR / review 边界

## 当前官方事实

截至 2026 年 3 月 6 日，主流产品都在把记忆和规则做成一等能力，但实现方式不同：

- GitHub 在 2026 年 3 月 4 日宣布 Copilot Memory 对 Pro 和 Pro+ 默认开启；官方 changelog 说明 memory 会跨 coding agent、code review 和 Copilot CLI 共享，并且 memories 会在 28 天后自动过期。
- Windsurf 官方文档说明 Cascade 同时支持自动生成 memories 和显式 rules；rules 可定义为 global 或 workspace 级，并可存放在 `.windsurf/rules`。
- Continue 官方文档说明 rules 可以放在 `.continue/rules` 目录，并与 Hub rules 组合使用。
- Cursor 官方规则文档说明 user rules 会始终加入上下文，`Memories` 是基于聊天自动生成的规则，并且是 repo 级作用域。

这些事实说明一个共同趋势：持久上下文正在成为产品标准能力，但“显式 rules”仍然比隐式 memory 更可靠。

## 推荐做法

### 第一步：先写显式规则

最小规则文件至少覆盖：

- 允许修改的目录
- 禁止修改的目录
- 必跑验证命令
- 风格和架构红线

### 第二步：把任务上下文标准化

每次任务都尽量按固定顺序给：

1. 任务目标
2. 文件范围
3. 不要做什么
4. 验收方式

### 第三步：再启用 memory

让 memory 只记住高价值、长期有效的信息，例如：

- 常用命令
- repo 结构习惯
- 团队默认偏好

### 第四步：最后用 hooks 收口

- lint
- test
- 安全检查
- 关键命令审批

## 一份最小规则模板

```text
# Repo Rules
- 仅允许修改 src/payments 和 tests/payments
- 不要改动 migrations 和 infra 目录
- 提交前必须运行: npm test -- payments
- 如果无法确认行为边界，先停下来提问
- 不要顺手重构无关模块
```

## 常见错误

- 把记忆当作永久真相
- 规则只在脑子里，不在仓库里
- 上下文给太多，但没有边界
- 没有失败后的校验回路
- 用 memory 代替显式 instructions

## 延伸阅读

- [Prompt Contracts](/docs/prompting-workflows/prompt-contracts)
- [质量门禁与 Review](/docs/team-delivery/quality-gates-and-review)
- [个人工程师栈搭建](/docs/playbooks/personal-engineer-stack-setup)

## 来源

- GitHub Changelog, 2026-03-04: [Copilot Memory now on by default for Pro and Pro+ users in public preview](https://github.blog/changelog/2026-03-04-copilot-memory-now-on-by-default-for-pro-and-pro-users-in-public-preview/)
- Windsurf Docs: [Cascade Memories](https://docs.windsurf.com/windsurf/cascade/memories)
- Continue Docs: [Rules](https://docs.continue.dev/customize/rules)
- Cursor Docs: [Rules](https://docs.cursor.com/context/rules)
