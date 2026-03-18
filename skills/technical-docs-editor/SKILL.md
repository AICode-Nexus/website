---
name: technical-docs-editor
description: Use when reviewing, reinforcing, or structurally expanding technical docs such as role pages, tool guides, workflow docs, playbooks, or standards pages, including 技术文档审查、扩写、补强、角色文档、工具文档 tasks where pages feel thin, lack tables, examples, deliverables, or media entry points, or need alignment with neighboring docs.
---

# Technical Docs Editor

## Overview

Audit and expand technical docs without blindly increasing word count. Default to tightening structure, decisions, evidence, and operating cues before writing longer prose.

## When to Use

- A role, tool, workflow, guide, playbook, or standards page feels thin.
- A doc needs stronger tables, examples, deliverables, training tasks, or media entry points.
- A page has drifted away from its index page or sibling docs.
- You need to review a doc first, then decide whether to plan a rewrite or patch it directly.

Do not use this for time-sensitive AI news or daily brief writing. Use `ai-coding-daily-writer` for those cases.

## Default Mode

Start in `hybrid` mode:

1. Read the target doc.
2. Read the relevant entry page and sibling docs.
3. Read nearby specs, plans, or editorial docs if the page is part of a larger topic.
4. Audit four layers: `结构层`, `决策层`, `证据层`, `运营层`.
5. Choose one action:
   - If structure or topic boundaries are weak, output an expansion plan first.
   - If structure is already stable and the gaps are local, edit directly and attach a short review summary.

## Repo Bias

For this repo, prefer reinforcing these assets before adding long prose:

- decision tables
- training tasks
- deliverables and verification cues
- diagram, screenshot, and video entry points
- related-doc links and next-reading paths

Preserve the existing information architecture unless the page is clearly mis-scoped. For large structural changes, plan first.

## Resources

Read `content-playbook.md` for:

- the four-layer audit framework
- content-shape guidance for role, tool, workflow, and standards docs
- output templates
- repo-specific heuristics for this site's documentation system
