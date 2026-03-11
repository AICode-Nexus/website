---
audience: "mixed"
stage: "intermediate"
featured: false
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "cross-track"
domain: "tools"
journey_stage: "implementation"
title: "VS Code Agents：规则与边界"
description: "VS Code Agents 的规则应该放哪，哪些边界必须写清。"
slug: "/tools/control-planes/vscode-agents/rules-memory-tools"
sidebar_label: "规则与边界"
tags: ["ai-coding", "tool", "vscode-agents"]
---

# VS Code Agents：规则与边界

VS Code Agents 容易出现的问题，是编辑器配置、workspace 习惯和 repo 合同混在一起。编辑器层适合承载“当前工作区怎么用”，不适合承载“仓库永远怎么交付”。边界不清，团队一换入口就会断。

| 层级 | 应放内容 | 应避开内容 |
| --- | --- | --- |
| 仓库合同 | 目录边界、验证命令、交付要求。 | 只在 VS Code 内成立的习惯。 |
| 编辑器入口 | custom agents、reusable prompts、面板习惯。 | 第二套业务制度。 |
| 会话/后台状态 | 当前任务、后台阶段、中间结果。 | 长期固定规则。 |

## 先分清三层

### 仓库合同

- 目录边界、验证命令、测试要求、禁止修改区。
- 这些规则必须写回 repo，而不是藏在某个工作区设置里。

### 编辑器入口规则

- VS Code Agents 的 custom agents、reusable prompts、面板使用约定。
- 这些内容只该补充入口习惯，不该成为第二套业务制度。

### 会话和后台状态

- 当前任务摘要、background task 阶段、这轮要不要继续。
- 这些信息有时效，不要长期固化。

## 必须写进 repo 的内容

- 所有人都要遵守的验证命令。
- 目录和模块边界。
- PR 或 issue 里必须回报的交付结构。
- background task 完成后需要回填哪些证据。

## 适合放在编辑器层的内容

- 常用任务入口，例如“先读哪几个文件”“先开哪个面板”。
- 自定义 agent 的角色分工。
- 本地探索和后台推进的默认 handoff 节奏。
- 个人级快捷操作和界面偏好。

## 只保留在单次任务里的内容

- 这轮探索到的临时线索。
- 当前后台任务的中间状态。
- 当次回改顺序和暂时性决策。

## 治理动作

- 把关键规则优先写成仓库文档，再做工作区便利化配置。
- background agent 的验收必须回到测试、diff 或 PR 说明里。
- 任何长期有效的规则，都要能脱离 VS Code 入口继续成立。
- 明确谁能修改 editor 级模板，谁能修改 repo 合同。

## 常见反模式

- 编辑器里有一套规则，repo 文档里又有一套更旧的规则。
- background task 只回一句“已完成”，没有可验证证据。
- 个人快捷习惯被错误升级成团队制度。
- 团队一离开 VS Code，就说不清哪些规则还有效。

## 团队上线前检查

- repo 合同是否已经独立存在。
- custom agents 是否只是补充，而不是覆盖正式规则。
- background task 的 owner、收口方式和失败回退是否明确。
- 换到其他入口时，团队是否还能继续执行同一套合同。

## 下一步

- 去 [VS Code Agents 常见任务](/docs/tools/control-planes/vscode-agents/common-tasks) 固定本地探索和后台 handoff 模板。
- 去 [VS Code Agents：优点与替代](/docs/tools/control-planes/vscode-agents/tradeoffs-and-boundaries) 判断它该做主入口还是补位入口。
- 如果你要看更深 IDE 规则体系，继续看 [Cursor：规则与边界](/docs/tools/ide-first/cursor/rules-memory-tools)。

## 来源

- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [VS Code Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)
