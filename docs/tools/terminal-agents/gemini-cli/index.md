---
title: "Gemini CLI"
description: "Gemini CLI 的角色定位、最佳使用者和默认工作方式。"
slug: "/tools/terminal-agents/gemini-cli"
sidebar_label: "概览"
tags: ["ai-coding", "tool", "gemini-cli"]
track: "cross-track"
kind: "guide"
audience: "mixed"
stage: "intermediate"
featured: true
pillar: "tools"
reviewed_at: "2026-03-07"
source_window_end: "2026-03-07"
market_status: "current"
---

# Gemini CLI

Gemini CLI 把终端入口、context files 和自动化脚本结合在一起，适合做 GitHub 友好的 terminal-first 补位入口。

## 角色定位

轻量终端入口，重点在 repo context files、命令执行和与 GitHub 流的兼容性。

## 最适合谁

- 已经有 GitHub review 流，但还想补一个 terminal-first 入口的团队。
- 想把上下文文件版本化到仓库，又不想一上来引入太重框架的人。
- 希望把本地 CLI 与自动化脚本放进同一链路的人。

## 默认工作方式

- 这个入口真正高价值的地方是：轻量终端入口，重点在 repo context files、命令执行和与 GitHub 流的兼容性。
- 如果它不能回流到 repo 证据、验证命令和人工 review，它就只是在制造另一层会话噪音。
- 最稳的使用方式通常不是“让它承担全部职责”，而是和平台、框架或终端验证形成分层。

## 来源

- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [Gemini CLI Context Files](https://google-gemini.github.io/gemini-cli/docs/cli/configuration/#context-files)
