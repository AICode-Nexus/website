---
title: 个人工程师栈搭建
description: 把平台、IDE、CLI、rules、hooks 和评估方式组合成一套可长期使用的个人 AI coding 栈。
slug: /workflows/playbooks/personal-engineer-stack-setup
sidebar_label: 个人工程师栈搭建
tags: [ai-coding, playbook, setup]
track: cross-track
kind: playbook
content_form: playbook
domain: workflows
journey_stage: tech-selection
entry_role: index
audience: individual
stage: intermediate
featured: true
reviewed_at: 2026-03-06
source_window_end: 2026-03-06
market_status: current
---

import {RelatedReadings} from '@site/src/components/docs';

# 个人工程师栈搭建

## 目标

把你的 AI coding 入口、规则文件、CLI、校验回路和复盘方式固定下来，最终形成一套“每天都能用、出错也能回退”的个人工程师工作栈。

这篇文默认的目标不是“装最多工具”，而是建立一套最小但稳定的 5 层结构：

1. 主平台
2. 备用入口
3. 规则系统
4. 校验回路
5. 复盘机制

## 输入条件

- 你已经完成一次 [7 天上手路线](/docs/workflows/playbooks/first-7-days-ai-coding)
- 你已经知道自己更偏平台型入口、IDE 型入口还是开放式 Agent 入口
- 你的项目至少已经有 `lint`、`test`、`build` 中的 2 项基础校验
- 你愿意维护 repo 级指令，例如 `AGENTS.md`、tool rules 或工作流文档

## 步骤

### Step 1：确定主平台与备用入口

先接受一个现实：大多数个人工程师不需要长期维护 3 到 4 个并行主入口。更稳的做法是：

- 只选 1 个主平台，承担 70% 到 80% 的日常任务
- 再选 1 个备用入口，专门处理主平台不擅长的任务

推荐分法：

| 层级 | 负责什么 | 选择原则 |
| --- | --- | --- |
| 主平台 | 日常高频任务、主要上下文积累 | 你最常开的入口、最稳定的上下文体验 |
| 备用入口 | 长任务、特定模型、开放式控制 | 与主平台能力形成补位，而不是重复 |
| 终端层 | 验证、脚本、批处理 | 必须稳定、可重放、可被日志化 |

常见搭配示例：

- GitHub-first：`GitHub Copilot` + `VS Code Agent` / `Cursor`
- IDE-first：`Cursor` 或 `Windsurf` + 官方平台入口
- Open stack：`Cline` / `Continue` + 明确的模型与 MCP 组合

先做这件事，再读 [工具选择地图](/docs/tools/map) 和 [开放式入口对比](/docs/tools/compare/cursor-vs-windsurf-vs-cline)。

### Step 2：把 repo 边界写成文件

AI coding 一旦进入多文件改动和终端执行，边界不写下来，返工一定会变多。

最小边界集建议包含：

- 项目总规则：`AGENTS.md`
- 工具专属规则目录：如 `.cursor/rules/`、`.windsurf/rules/`、`.continue/rules/`
- 禁止自动修改区：如生成代码目录、基础设施目录、数据库迁移目录
- 校验入口：统一让 agent 使用 `npm run lint`、`npm test`、`npm run build` 这类固定命令

建议你把下面这些信息写进 repo 级规则：

- 技术栈和目录约束
- 可改与不可改目录
- 组件拆分、性能和边界要求
- 提交前必须执行的验证命令
- 哪些任务必须先给方案，再改代码

补充阅读：

- [上下文、记忆与规则](/docs/standards/context-memory-and-rules)
- [Prompt Contracts](/docs/workflows/prompt-contracts)

### Step 3：接上最小校验回路

个人工程师最容易犯的错，是把“agent 跑通一次”误当作“流程可复用”。

最小校验回路至少包含：

1. 改前说明目标与边界
2. 改后执行固定命令
3. 输出失败信息，而不是只说“已完成”
4. 人工 review 最关键的 diff
5. 记录返工原因

一个足够实用的最小命令集通常是：

```bash
npm run lint
npm test
npm run build
```

如果项目规模较大，可以拆成：

- 快速回路：`lint` + 相关测试
- 发布回路：完整 `test` + `build`

相关文档：

- [质量门禁与 Review](/docs/standards/review-quality-gates)
- [指标与风险](/docs/standards/evaluation-risk-metrics)

### Step 4：把高频任务做成合同

个人工程师栈之所以能长期工作，不是因为模型更强，而是因为输入越来越稳定。

建议先固定 3 类任务合同：

- bugfix
- refactor
- test

每个合同最少包含：

- 目标
- 约束
- 允许修改范围
- 必跑验证
- 输出格式

例如：

```text
任务类型：bugfix
目标：定位并修复一个已复现的问题
约束：不做无关重构；只修改相关模块；必须说明根因
验证：先补或运行最小复现；再跑 lint/test/build 中相关项
输出：根因、改动点、风险、验证结果
```

对应上游文档：

- [Bugfix / Refactor / Test Workflows](/docs/workflows/bugfix-refactor-test-workflows)
- [多 Agent 协作](/docs/workflows/multi-agent-collaboration)

### Step 5：建立周度复盘，而不是只看当天爽感

真正的个人工程师栈，需要按周评估，而不是按某一次“惊艳体验”评估。

每周至少记录：

| 指标 | 说明 |
| --- | --- |
| 完成速度 | 哪类任务明显更快 |
| 返工次数 | 哪些任务反复修改 |
| 失败模式 | 幻觉、误删、越权修改、测试缺失 |
| 人工接管点 | 哪一步必须切回人工 |
| 工具分工 | 主平台与备用入口是否真的形成补位 |

如果你连续两周都看不出稳定提效，就该回头简化栈，而不是继续叠工具。

## Prompt / Agent 合同

下面是一份适合个人工程师栈的默认合同，可以直接改成你自己的版本：

```text
你是当前仓库的 coding agent。

目标：在明确边界内完成当前任务，不扩大范围。

必须遵守：
1. 先说明计划，再开始大规模修改。
2. 只修改与任务直接相关的文件。
3. 如果发现架构风险或上下文缺失，先提出，再继续。
4. 修改后必须执行约定的校验命令，并报告结果。
5. 不能假设“构建成功”或“测试通过”，必须以命令结果为准。
6. 如果规则文件、目录边界或已有约束冲突，优先服从仓库规则。
```

如果你在多个入口之间切换，这份合同应尽量保持一致，避免不同 agent 行为标准完全不同。

## 校验方式

栈搭好之后，不要只看“能不能写代码”，要看它能不能长期稳定工作。

### 每周检查清单

- 主平台是否仍然承担主要任务，还是已经开始拖慢你
- 备用入口是否有清晰职责，还是只是重复工具
- rules 是否还准确，是否已经和代码结构脱节
- 校验命令是否仍然可靠，是否存在常年跳过的步骤
- memory、rules、MCP 是否带来了错误上下文或权限风险

### 判定标准

如果下面 4 条有 3 条成立，说明你的栈是健康的：

- 高频任务有稳定入口
- 改动边界比以前更清楚
- 返工率下降
- review 成本没有明显上升

## 风险与失败模式

### 失败模式 1：栈太复杂

表现：你自己都说不清楚什么时候该用哪个入口。

修正：删掉重复层，只保留主平台 + 备用入口 + 终端验证。

### 失败模式 2：规则越写越多，但没人维护

表现：`AGENTS.md`、tool rules、prompt 模板互相冲突。

修正：保留 repo 根规则做总约束，工具规则只写差异化行为。

### 失败模式 3：把 memory 当成真相

表现：agent 因历史记忆而沿用过时实现。

修正：把 memory 当提示，不当事实；关键行为仍以代码和规则为准。

### 失败模式 4：没有回退机制

表现：agent 改坏以后只能手工一点点回溯。

修正：优先使用有 checkpoint、shadow git、PR review 或 worktree 保护的入口。

## 下一步

<RelatedReadings
  title="继续阅读与补充路径"
  description="这篇 playbook 负责先把个人工程师栈搭起来。下一步应该把规则、质量门禁和入口对比补齐，而不是继续零散试工具。"
  items={[
    {
      title: '质量门禁与 Review',
      href: '/docs/standards/review-quality-gates',
      description: '把 repo 级 review 责任、证据要求和放行条件固定下来。',
    },
    {
      title: '指标与风险',
      href: '/docs/standards/evaluation-risk-metrics',
      description: '把“感觉更顺”变成可复盘的效率、返工和风险指标。',
    },
    {
      title: 'Cursor、Windsurf 与 Cline 怎么看',
      href: '/docs/tools/compare/cursor-vs-windsurf-vs-cline',
      description: '如果你还在犹豫 IDE-first 与开放式入口，这篇对比最直接。',
    },
    {
      title: '7 天上手路线',
      href: '/docs/workflows/playbooks/first-7-days-ai-coding',
      description: '如果你要把这套栈快速跑起来，这篇是一周内最实用的执行顺序。',
    },
  ]}
/>
