---
audience: "mixed"
stage: "starter"
featured: false
reviewed_at: "2026-03-08"
source_window_end: "2026-03-08"
market_status: "current"
entry_role: "domain"
kind: "guide"
content_form: "guide"
track: "prompting-workflows"
domain: "workflows"
journey_stage: "testing-validation"
title: "Bugfix / Refactor / Test：案例与工具组合"
description: "Bugfix / Refactor / Test 的代表案例，以及最适合搭配的工具或框架。"
slug: "/workflows/patterns/bugfix-refactor-test/examples-and-tool-fit"
sidebar_label: "补充：案例与工具"
sidebar_position: 9
tags: ["ai-coding", "workflow", "bugfix-refactor-test"]
---

# Bugfix / Refactor / Test：案例与工具组合

## 现在先做什么

- 想先看标准示例：去 [Bugfix / Refactor / Test 示例](/docs/workflows/patterns/bugfix-refactor-test/examples)。
- 想先选默认工具组合：去 [Bugfix / Refactor / Test Tooling](/docs/workflows/patterns/bugfix-refactor-test/tooling)。
- 想先看真实修复收口：去 [Claude Code Bugfix Loop 案例](/docs/case-studies/claude-code-bugfix-loop)。

## 代表案例

- 登录重试逻辑偶发失效，先复现、再只修状态机边界并补回归。
- 解析器模块越来越难维护，先定行为边界，再做小步重构。
- 日常维护任务需要以最小 diff 修复，再把验证结果带回 PR。

## 默认工具组合

- [Claude Code](/docs/tools/terminal-agents/claude-code)：适合终端内先复现、再修、再跑命令。
- [Gemini CLI](/docs/tools/terminal-agents/gemini-cli)：适合轻量终端修复后顺手进入 GitHub 交付。
- [VS Code Agents](/docs/tools/control-planes/vscode-agents)：适合本地编辑加后台补跑验证。

## 常见误配

- 把工具当成 workflow 本身，而不是 bugfix 闭环的承载入口。
- 同时上多个重流程和多个重工具，最后先死在上下文和治理成本上。
- 只看生成速度，不看证据是否真正回流到测试、diff 和 review。

## 读完回哪里

- 想按标准例子开工：回 [Bugfix / Refactor / Test 示例](/docs/workflows/patterns/bugfix-refactor-test/examples)。
- 想先选入口组合：去 [Bugfix / Refactor / Test Tooling](/docs/workflows/patterns/bugfix-refactor-test/tooling)。
- 想看真实修复证据链：去 [Claude Code Bugfix Loop 案例](/docs/case-studies/claude-code-bugfix-loop)。

## 来源

- [Claude Code Common Workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
- [Cline Plan & Act](https://docs.cline.bot/core-workflows/plan-and-act)
- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent)
