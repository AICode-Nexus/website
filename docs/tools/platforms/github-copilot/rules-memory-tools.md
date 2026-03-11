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
title: "GitHub Copilot：规则与边界"
description: "GitHub Copilot 的规则应该放哪，哪些边界必须写清。"
slug: "/tools/platforms/github-copilot/rules-memory-tools"
sidebar_label: "规则与边界"
tags: ["ai-coding", "tool", "github-copilot"]
---

# GitHub Copilot：规则与边界

GitHub Copilot 的难点不在“有没有提示词”，而在“平台里的规则和仓库里的合同是不是同一套事实”。如果 issue 模板、PR 模板、branch policy、review 规则和 agent 说明分散在不同地方，平台入口很快就会变成第二套制度。

| 层级 | 应放内容 | 应避开内容 |
| --- | --- | --- |
| 仓库合同 | issue / PR 模板、验证命令、禁区。 | 平台专属操作习惯。 |
| 平台入口 | Jira 到 PR 的映射、review 节奏。 | 覆盖 repo 合同的硬规则。 |
| 单次任务 | 本轮范围、回改顺序、风险。 | 长期模板化的一次性说明。 |

## 先分清三层规则

### 仓库合同

- issue 模板、PR 模板、目录边界、验证命令、禁止事项。
- 这些内容必须版本化，因为它们决定任何入口都该如何交付。

### 平台入口规则

- GitHub Copilot 的委派习惯、review 节奏、platform-specific 的交接格式。
- 这些内容可以依赖平台，但不能覆盖 repo 已写清的合同。

### 单次任务上下文

- 这一轮只做什么、不做什么、要把结果写回哪一个 issue 或 PR。
- 这类信息不该长期固化，否则模板会越来越臃肿。

## 必须写进 repo 的内容

- 默认验证命令和最小验收标准。
- 哪些目录不能改，哪些文件需要额外 reviewer。
- PR 必须带哪些交付信息，例如改动摘要、验证方式、剩余风险。
- issue 必须包含哪些字段，例如目标、范围、禁区、验收。

## 适合放在平台层的内容

- 任务如何从 Jira 或 issue 映射到 PR。
- reviewer 想先看什么，例如先看范围对应，再看实现细节。
- 团队约定的 draft PR 节奏和 comment 回改节奏。
- 哪些平台动作需要 owner 明确批准后再继续。

## 只保留在单次任务里的内容

- 这一轮 comment 处理顺序。
- 本轮只接受哪些回改，不扩大到无关重构。
- 当次 PR 的具体风险判断和后续拆分建议。

## 治理动作

- 先把 issue 模板和 PR 模板补齐，再扩大 agent 使用范围。
- 平台里任何默认说明，都要能追溯到 repo 规则或团队制度。
- 平台生成的结果必须回流到可 review 的证据，而不是只留在会话里。
- 定期检查平台入口有没有偷偷承载本该版本化的仓库规则。

## 常见反模式

- 把一次性任务说明直接塞进长期模板，越写越长。
- repo 里没写验收命令，却指望平台自动懂。
- agent 产物只剩“已完成”，没有 diff、验证和风险。
- 平台规则和 repo 规则冲突时，没有 owner 负责裁决。

## 团队上线前检查

- 入口规则和仓库合同是否已经分层。
- 每条长期规则是否都有 owner 和修改入口。
- reviewer 能否只看 issue + PR 就完成判断。
- 平台失败时，人工是否还能根据证据继续推进。

## 下一步

- 去 [GitHub Copilot 常见任务](/docs/tools/platforms/github-copilot/common-tasks) 固定三种平台任务模板。
- 去 [GitHub Copilot：优点与替代](/docs/tools/platforms/github-copilot/tradeoffs-and-boundaries) 判断它该不该继续做主入口。
- 如果你需要更强 repo 级控制，改读 [OpenAI Codex：规则与边界](/docs/tools/execution-stacks/openai-codex/rules-memory-tools)。

## 来源

- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
- [GitHub Copilot for Jira](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/integrate-coding-agent-with-jira)
