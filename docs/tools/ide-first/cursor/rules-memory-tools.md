---
audience: "individual"
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
title: "Cursor：规则与边界"
description: "Cursor 的规则应该放哪，哪些边界必须写清。"
slug: "/tools/ide-first/cursor/rules-memory-tools"
sidebar_label: "规则与边界"
tags: ["ai-coding", "tool", "cursor"]
---

# Cursor：规则与边界

Cursor 最容易踩的坑，是把 `.cursor/rules` 当成全部规则源。IDE 规则适合承载入口习惯和高频编辑上下文，但真正的仓库合同、验证命令和团队边界必须回到 repo。不然一旦换入口，整个工作流就断。

| 层级 | 应放内容 | 应避开内容 |
| --- | --- | --- |
| 仓库合同 | 验证脚本、目录边界、PR 要求。 | 只在 Cursor 内成立的习惯。 |
| IDE 入口 | `.cursor/rules`、background handoff。 | 团队正式制度。 |
| 单次任务 | 当前线索、回改顺序、局部策略。 | 升级成长期规则。 |

## 先分清三层

### 仓库合同

- 目录边界、默认测试命令、禁止事项、PR 验收要求。
- 这些必须版本化并脱离 Cursor 也能成立。

### IDE 入口规则

- `.cursor/rules`、编辑器级习惯、background agent 的默认 handoff。
- 这些内容适合加速 IDE 体验，不适合替代正式合同。

### 单次任务上下文

- 本轮只做什么、当前排查结论、为什么要把某步交给后台。
- 这类信息不该升级成长期规则。

## 必须写进 repo 的内容

- 所有人共享的验证脚本和最小验收标准。
- 模块边界和不可改目录。
- 最终交付必须包含的证据。
- 任何跨入口都要遵守的 reviewer 规则。

## 适合放在 `.cursor/rules` 的内容

- IDE 内的默认任务步骤。
- 常见文件阅读顺序和优先检查项。
- background agent 的回报格式。
- 个人或小团队高频编辑习惯。

## 只保留在单次任务里的内容

- 当前探索得到的临时线索。
- 这轮 comment 或改动的处理顺序。
- 当次改动的局部策略和后续补项。

## 治理动作

- 先把 repo contract 写清，再决定 `.cursor/rules` 放什么。
- background agent 的验收必须回到测试、diff 或 PR 描述。
- 团队多人共用 Cursor 时，给规则目录、命名和 owner 定标准。
- 定期清理已经失效的 IDE 规则，别让它变成堆积场。

## 常见反模式

- 同一条规则同时写在 repo 和 Cursor 里，内容还不一致。
- `.cursor/rules` 里混入大量一次性任务说明。
- background 产物只剩一句“完成”，没有证据。
- 团队把私有 IDE 习惯误当成正式工程制度。

## 团队上线前检查

- repo 合同是否已经独立可用。
- `.cursor/rules` 是否只保留 IDE 入口特有内容。
- background agent 的 owner 和收口动作是否明确。
- 换到别的入口时，团队是否还能执行同一套规则。

## 下一步

- 去 [Cursor 常见任务](/docs/tools/ide-first/cursor/common-tasks) 固定 IDE 内高频任务模板。
- 去 [Cursor：优点与替代](/docs/tools/ide-first/cursor/tradeoffs-and-boundaries) 判断它是否适合长期做主入口。
- 如果你要看另一种 AGENTS.md + memory 路线，继续看 [Windsurf：规则与边界](/docs/tools/ide-first/windsurf/rules-memory-tools)。

## 来源

- [Cursor Background Agents](https://docs.cursor.com/en/background-agents)
- [Cursor Rules](https://docs.cursor.com/context/rules)
