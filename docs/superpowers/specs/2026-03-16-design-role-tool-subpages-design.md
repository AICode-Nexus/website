---
title: Design Role Tool Subpages Design
description: 为设计师角色页新增工具专题分组和独立工具介绍页的设计说明。
slug: /site-admin/superpowers/specs/design-role-tool-subpages-design
tags: [site-admin, spec, superpowers]
track: cross-track
kind: guide
content_form: guide
domain: standards
journey_stage: solution-design
entry_role: admin
audience: advanced
stage: intermediate
featured: false
reviewed_at: 2026-03-16
source_window_end: 2026-03-16
market_status: current
unlisted: true
---

# Design Role Tool Subpages Design

## Goal

Add a dedicated tool cluster under the design role so the current role area no longer forces tool introductions, workflow advice, and capability mapping into the same three mechanism pages.

## User Direction

The user explicitly wants:

- design tools to live on separate subpages
- each tool page to explain what the tool is, when to use it, and practical examples
- the design role sidebar to expose these pages directly
- the tool set to extend beyond Figma and MasterGo and include more current AI-plus-design products

## Decision

Keep the existing page `工具匹配与选型` as the methodology page, and add a separate `工具专题` section for tool-by-tool references.

This preserves a clean split:

- `工具匹配与选型`: how to choose
- `工具专题`: what each tool is and how to use it

## Target Routes

Keep:

- `/docs/roles/design`
- `/docs/roles/design/rules-and-instruction-files`
- `/docs/roles/design/skills-and-mcp`
- `/docs/roles/design/tool-fit-and-selection`

Add:

- `/docs/roles/design/tools`
- `/docs/roles/design/tools/figma`
- `/docs/roles/design/tools/mastergo`
- `/docs/roles/design/tools/framer`
- `/docs/roles/design/tools/relume`
- `/docs/roles/design/tools/uizard`
- `/docs/roles/design/tools/visily`
- `/docs/roles/design/tools/webflow-ai`

## Content Shape

The new tool landing page should do three jobs:

1. explain why designers need a separate tool reference area
2. group tools by workflow shape instead of by vendor list
3. route readers into individual tool pages

Each tool page should follow one stable template:

1. what the tool is
2. best-fit tasks
3. why designers use it with AI
4. practical workflow examples
5. tradeoffs and boundaries
6. handoff advice for working with developers
7. related internal links

## Source Strategy

Because these tools change quickly, each page should rely on current official product sources where possible. The page metadata should reflect the current review window, and claims should stay at the capability level unless the source clearly supports deeper detail.

## Non-Goals

- do not turn these pages into pricing trackers
- do not duplicate the generic platform docs that already live under `docs/tools/`
- do not replace the existing design role overview with a vendor directory

## Verification

The implementation must update sidebar navigation, internal links, and `CHANGELOG.md`, then pass `npm run build`.
