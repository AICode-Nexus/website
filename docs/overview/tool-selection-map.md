---
title: AI Coding 工具选择地图
description: 按任务目标选择主平台、执行方式和工作流，而不是盲目追逐最热产品名。
slug: /tools/map
sidebar_label: 工具选择地图
tags: [ai-coding, tool-selection, comparison]
track: cross-track
kind: guide
content_form: guide
domain: tools
journey_stage: tech-selection
entry_role: domain
audience: individual
stage: starter
featured: true
reviewed_at: 2026-03-08
source_window_end: 2026-03-08
market_status: current
---

import {RelatedReadings} from '@site/src/components/docs';

# AI Coding 工具选择地图

这张地图不负责替你做最终选型，它只负责帮你先把默认入口选对。先分任务，再分入口类型，最后才是同层产品之间的取舍。

## 现在先做什么

- 想最快上手终端主入口：去 [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start)。
- 想跑平台任务和 draft PR：去 [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start)。
- 想跑长链路阶段推进：去 [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start)。
- 想把 IDE 当主入口：去 [Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start)。

## 先按任务选默认入口

| 你的默认任务 | 更适合先看什么 | 第一步去哪里 |
| --- | --- | --- |
| issue、PR、review 是主工作系统 | 平台型入口 | [GitHub Copilot 快速开始](/docs/tools/platforms/github-copilot/quick-start) |
| 本地探索和后台执行都重要 | 控制面 | [VS Code Agents 快速开始](/docs/tools/control-planes/vscode-agents/quick-start) |
| 长任务、并行 lane、云端执行是主问题 | 执行栈 | [OpenAI Codex 快速开始](/docs/tools/execution-stacks/openai-codex/quick-start) |
| repo pairing、命令验证和规则文件是主线 | 终端入口 | [Claude Code 快速开始](/docs/tools/terminal-agents/claude-code/quick-start) |
| 你长期在 IDE 内工作，最在意低切换成本 | IDE-first | [Cursor 快速开始](/docs/tools/ide-first/cursor/quick-start) |

## 再按组织习惯做二选一

| 你的组织习惯 | 默认主入口 | 常见补位 |
| --- | --- | --- |
| GitHub-first | [GitHub Copilot](/docs/tools/platforms/github-copilot) | [VS Code Agents](/docs/tools/control-planes/vscode-agents) / [OpenAI Codex](/docs/tools/execution-stacks/openai-codex) |
| Editor-first | [VS Code Agents](/docs/tools/control-planes/vscode-agents) / [Cursor](/docs/tools/ide-first/cursor) | [GitHub Copilot](/docs/tools/platforms/github-copilot) |
| Terminal-first | [Claude Code](/docs/tools/terminal-agents/claude-code) / [Gemini CLI](/docs/tools/terminal-agents/gemini-cli) | [GitHub Copilot](/docs/tools/platforms/github-copilot) |
| Long-task-first | [OpenAI Codex](/docs/tools/execution-stacks/openai-codex) | [GitHub Copilot](/docs/tools/platforms/github-copilot) / [VS Code Agents](/docs/tools/control-planes/vscode-agents) |
| Open-stack-first | [Cline](/docs/tools/terminal-agents/cline) | [OpenAI Codex](/docs/tools/execution-stacks/openai-codex) / [Windsurf](/docs/tools/ide-first/windsurf) |

## 7 天试跑方法

1. 选 1 个主入口，不要第一天就上 3 个工具。
2. 选 1 个补位入口，只负责你主入口明显不擅长的场景。
3. 用同一批任务跑 7 天，重点记录返工、review 修补量和切换成本。
4. 第 7 天回 [AI 工作流](/docs/workflows)，确认这个入口是否真能嵌进你的默认交付链。

## 读完回哪里

- 想直接选型并进入具体工具簇：回 [AI 编程工具](/docs/tools)。
- 想看平台、控制面和执行栈怎么横向取舍：去 [GitHub Copilot、VS Code Agent 与 OpenAI Codex 怎么选](/docs/tools/compare/github-copilot-vs-vscode-agent-vs-openai-codex)。
- 想看 IDE 工作台和开放壳层怎么分工：去 [Cursor、Windsurf 与 Cline 怎么看](/docs/tools/compare/cursor-vs-windsurf-vs-cline)。
- 想把入口判断放进默认交付链：去 [AI 工作流](/docs/workflows)。

## 来源

- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
- [VS Code Agents Overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [OpenAI Codex App](https://openai.com/index/introducing-the-codex-app/)
- [Cursor Background Agents](https://docs.cursor.com/en/background-agents)
- [Claude Code Overview](https://docs.anthropic.com/en/docs/claude-code/overview)

<RelatedReadings
  title="继续阅读与下一步"
  description="地图页负责做初筛。真正要选型和落地时，下一步应该回到具体工具簇、对比文和工作流主线。"
  items={[
    {
      title: 'AI 编程工具',
      href: '/docs/tools',
      description: '按入口类型进入具体工具簇和 quick start。',
    },
    {
      title: 'GitHub Copilot、VS Code Agent 与 OpenAI Codex 怎么选',
      href: '/docs/tools/compare/github-copilot-vs-vscode-agent-vs-openai-codex',
      description: '如果你正在平台、控制面和执行栈之间做选择，这篇最直接。',
    },
    {
      title: 'Cursor、Windsurf 与 Cline 怎么看',
      href: '/docs/tools/compare/cursor-vs-windsurf-vs-cline',
      description: '如果你正在 IDE-first 和开放壳层之间做选择，这篇最直接。',
    },
    {
      title: 'AI 工作流',
      href: '/docs/workflows',
      description: '如果你已经选完入口，下一步就该把它放回稳定交付链里。',
    },
  ]}
/>
