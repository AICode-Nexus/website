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
title: "Gemini CLI：规则与边界"
description: "Gemini CLI 的规则应该放哪，哪些边界必须写清。"
slug: "/tools/terminal-agents/gemini-cli/rules-memory-tools"
sidebar_label: "规则与边界"
tags: ["ai-coding", "tool", "gemini-cli"]
---

# Gemini CLI：规则与边界

Gemini CLI 的稳定性，主要来自 context files 是否克制。GEMINI.md 这种文件很容易越写越大，最后把一次性任务说明、个人习惯和正式仓库规则全部混进去。真正有效的做法，是把长期规则留在 repo，把这轮上下文留在任务里。

| 层级 | 应放内容 | 应避开内容 |
| --- | --- | --- |
| 仓库合同 | GEMINI.md 中长期有效的命令和边界。 | 个人口味和一次性需求。 |
| 入口习惯 | 输出格式、调用节奏、简短导航。 | 覆盖正式交付要求。 |
| 单次任务 | 本轮范围、线索、后续 TODO。 | 回灌进长期 context file。 |

## 先分清三层

### 仓库合同

- GEMINI.md 中真正长期有效的目录边界、命令、验收和禁止事项。
- 这些内容应该服务于所有终端入口，而不是只服务一个产品。

### 入口习惯

- Gemini CLI 的调用节奏、输出格式偏好、默认汇报结构。
- 这些可以存在，但不能代替正式交付规则。

### 单次任务上下文

- 本轮要先查什么、只改什么、剩余风险是什么。
- 这些信息应该随着任务结束而退出，不要塞回长期 context file。

## 必须写进 repo 的内容

- 关键目录边界和不可改区。
- 默认验证脚本和最小验收标准。
- 交付时必须附带的命令结果和风险说明。
- 任何团队成员都必须遵守的禁区和审批条件。

## 适合放在 context files 的内容

- 仓库结构的简短导航。
- 最常用的任务类型和建议步骤。
- 统一的回报格式，例如先总结、再列验证、再列风险。
- 终端入口需要的少量执行习惯。

## 只保留在单次任务里的内容

- 当前复现步骤和临时假设。
- 这一轮 comment 的处理顺序。
- 当次改动的拆分建议和后续 TODO。

## 治理动作

- 先写最小 GEMINI.md，只保留真正反复使用的信息。
- 验证命令尽量写成脚本，减少不同入口的理解偏差。
- 每次结束任务时，检查有没有一次性内容误混进长期文件。
- 如果团队同时使用多个入口，统一规则源必须回到 repo。

## 常见反模式

- GEMINI.md 变成大段说明文，却没人维护。
- 团队规则只写在 context file，换入口就失效。
- 交付只剩自然语言总结，没有命令证据。
- 个人偏好和团队正式规则混成一层。

## 团队上线前检查

- GEMINI.md 是否真的只保留长期有效规则。
- 默认验证命令是否都已脚本化。
- context files 和 repo 文档是否分工清楚。
- 人工接手时能否只靠 repo 规则继续推进。

## 下一步

- 去 [Gemini CLI 常见任务](/docs/tools/terminal-agents/gemini-cli/common-tasks) 固定 bugfix、脚本验证和 PR 回写模板。
- 去 [Gemini CLI：优点与替代](/docs/tools/terminal-agents/gemini-cli/tradeoffs-and-boundaries) 判断它该不该继续做默认终端入口。
- 如果你需要更重的规则文件体系，继续看 [Claude Code：规则与边界](/docs/tools/terminal-agents/claude-code/rules-memory-tools)。

## 来源

- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [Gemini CLI Context Files](https://google-gemini.github.io/gemini-cli/docs/cli/configuration/#context-files)
