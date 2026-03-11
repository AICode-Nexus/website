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
title: "Claude Code：规则与边界"
description: "Claude Code 的规则应该放哪，哪些边界必须写清。"
slug: "/tools/terminal-agents/claude-code/rules-memory-tools"
sidebar_label: "规则与边界"
tags: ["ai-coding", "tool", "claude-code"]
---

# Claude Code：规则与边界

Claude Code 稳不稳定，往往取决于 CLAUDE.md 写得稳不稳。终端入口的好处是边界清楚，坏处是如果规则文件混乱，所有问题都会直接体现在命令、diff 和风险里，所以这里比 IDE 或平台入口更需要明确合同。

| 层级 | 应放内容 | 应避开内容 |
| --- | --- | --- |
| 仓库合同 | CLAUDE.md、命令、边界、审批。 | 只对单次任务有效的细节。 |
| 入口习惯 | 先读什么、先跑什么、如何汇报。 | 替代正式验收规则。 |
| 单次任务 | 临时假设、待确认问题、暂停项。 | 不断堆进长期规则文件。 |

## 先分清三层

### 仓库合同

- CLAUDE.md 中的目录结构、命令、验收、禁止事项和审批要求。
- 这些属于任何终端协作都要遵守的正式规则。

### 入口习惯

- 先读哪些文件、先跑哪些命令、结果如何回报。
- 这些内容可以写进 CLAUDE.md，但要明确哪些是建议、哪些是硬规则。

### 单次任务上下文

- 本轮计划、临时假设、待确认问题、暂缓项。
- 这类内容不能无限累积进长期规则文件。

## 必须写进 repo 的内容

- 默认验证命令和最小通过标准。
- 哪些目录可改，哪些目录禁改或需先报备。
- worktree 或高风险任务的使用条件。
- 交付必须包含的 diff 摘要、命令结果和风险说明。

## 适合放在规则文件里的内容

- 仓库结构说明和常见入口文件。
- 常用任务模板，例如 bugfix、补测试、重构的默认流程。
- 什么时候先跑测试，什么时候先读代码，什么时候停下来问人。
- 人工 review 前必须准备的证据清单。

## 只保留在单次任务里的内容

- 当前排查到的线索。
- 本轮为什么先改 A 再改 B。
- 暂时不处理的边角问题。

## 治理动作

- 先写最小 CLAUDE.md，再逐步增加真正反复出现的规则。
- 规则文件每一条都要指向实际命令或实际交付动作。
- 高风险任务默认开 worktree，而不是直接碰主工作区。
- 任务结束时，把临时经验整理进 repo，而不是继续藏在会话里。

## 常见反模式

- CLAUDE.md 只写原则，不写可执行动作。
- 每个成员维护一版不同的规则文件，导致入口切换就混乱。
- 任务总结没有命令证据，只剩“应该好了”。
- 高风险改动不隔离，靠人为记忆避免误伤。

## 团队上线前检查

- 最小 CLAUDE.md 是否已覆盖结构、命令、边界和交付。
- 验证命令是否人人都能跑。
- 规则文件里是否混入大量一次性任务说明。
- 失败后人工能不能根据证据继续推进。

## 下一步

- 去 [Claude Code 常见任务](/docs/tools/terminal-agents/claude-code/common-tasks) 固定终端内常见维护任务模板。
- 去 [Claude Code：优点与替代](/docs/tools/terminal-agents/claude-code/tradeoffs-and-boundaries) 判断它该不该继续做主入口。
- 如果你要对比更轻的 context-file 路线，继续看 [Gemini CLI：规则与边界](/docs/tools/terminal-agents/gemini-cli/rules-memory-tools)。

## 来源

- [Claude Code Overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [CLAUDE.md Memory File](https://docs.anthropic.com/en/docs/claude-code/memory#claude-md)
