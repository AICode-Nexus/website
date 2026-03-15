---
title: Frontend Role Subpages Design
description: 为前端岗位页从单文档重构为总览页加主题子页记录信息架构设计。
slug: /site-admin/superpowers/specs/frontend-role-subpages-design
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
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
unlisted: true
---

# Frontend Role Subpages Design

## Goal

Split the current front-end role page from one long document into:

- one stable overview page at `/docs/roles/frontend`
- a set of child docs under `docs/roles/frontend/`

The result should make the content easier to scan, easier to maintain, and easier to expand without turning the overview page into a long scrolling handbook.

## Context

The current page at `/docs/roles/frontend` has already been repositioned as a `前端 AI 工作台`, but it still concentrates too much material into one file. The user explicitly wants the content broken into multiple subdirectories and also wants the information organized in a more professional, category-first way.

Key user direction established during brainstorming:

- keep `/docs/roles/frontend` as the public entry route
- split content into child pages instead of one long doc
- organize child pages by engineering themes, not by one-off task flows
- React and Vue must remain equal first-class ecosystems
- topics such as Tailwind CSS, ESLint, Oxlint, pnpm, Turborepo, `CLAUDE.md`, `AGENTS.md`, and front-end-related skills should land in natural, stable sections

## Decision

Use a hybrid structure:

- overview page remains at `/docs/roles/frontend`
- child pages are split by engineering theme
- overview page includes suggested workflow reading paths

This gives readers two entry modes at the same time:

- by workflow sequence
- by engineering topic

## Target Routes

Keep:

- `/docs/roles/frontend`

Add:

- `/docs/roles/frontend/design-to-code`
- `/docs/roles/frontend/frameworks-and-components`
- `/docs/roles/frontend/styling-and-design-systems`
- `/docs/roles/frontend/quality-gates`
- `/docs/roles/frontend/repo-architecture`
- `/docs/roles/frontend/testing-and-delivery`
- `/docs/roles/frontend/context-and-rules`

## Target File Structure

```text
docs/roles/frontend/
  index.md
  design-to-code.md
  frameworks-and-components.md
  styling-and-design-systems.md
  quality-gates.md
  repo-architecture.md
  testing-and-delivery.md
  context-and-rules.md
```

The existing single-file page `docs/roles/frontend.md` should be replaced by the folder-based structure above while preserving the public route `/docs/roles/frontend`.

## Overview Page Responsibilities

The overview page should stop acting like the full handbook. It should do only these jobs:

1. Define what the front-end AI workbench covers
2. Explain two reading modes:
   - read by workflow
   - read by engineering topic
3. Offer three suggested workflow paths:
   - `设计到实现`
   - `开发到交付`
   - `团队落地`
4. Link to all themed child pages
5. Briefly explain which reader type should start where
6. Link to tool tutorials, workflows, and case studies as next steps

## Child Page Responsibilities

Each child page should answer one class of question and avoid turning into a second overview page.

### `design-to-code`

Focus:

- Figma and structured design input
- design tokens
- page skeleton generation
- first-pass responsive structure

Do not center framework-specific implementation details here.

### `frameworks-and-components`

Focus:

- React / Next.js
- Vue / Nuxt
- hooks / composables
- component primitives and customizable component bases

React and Vue should use mirrored structure and similar depth.

### `styling-and-design-systems`

Focus:

- Tailwind CSS
- theme tokens
- design system consistency
- avoiding generic AI visual output
- theme tooling such as TweakCN / Shadcraft when relevant

### `quality-gates`

Focus:

- TypeScript
- ESLint
- Oxlint
- naming and directory conventions
- how AI-generated output passes engineering gates

### `repo-architecture`

Focus:

- pnpm
- workspace layout
- monorepo boundaries
- Turborepo task orchestration
- package and dependency responsibilities

### `testing-and-delivery`

Focus:

- Playwright
- component/unit testing
- build, lint, type-check, smoke paths
- PR and acceptance expectations

### `context-and-rules`

Focus:

- Context7
- Plan First
- MCP-assisted workflows
- `CLAUDE.md`
- `AGENTS.md`
- front-end-relevant skills

## Sidebar Design

`rolesSidebar` should no longer point directly to a single `roles/frontend` doc entry. Instead, it should expose a category for the front-end role:

- `前端工程师`
  - `总览`
  - `设计到代码`
  - `框架与组件生态`
  - `样式与设计系统`
  - `质量门禁`
  - `仓库结构`
  - `测试与交付`
  - `上下文与规则`

This should improve scanability without changing the top-level role navigation model for the other roles.

## Scope

### In scope

- Replace the single front-end role file with a folder-based doc cluster
- Preserve the public route `/docs/roles/frontend`
- Rewrite the overview page as a router/entry page
- Split detailed content across 7 themed child docs
- Update the relevant sidebar entries
- Update `CHANGELOG.md`

### Out of scope

- Restructuring other role guides
- Introducing new React components just for this doc split
- Creating standalone tutorial tracks for each front-end topic
- Changing the public `/docs/roles` landing model

## Constraints

- External links to `/docs/roles/frontend` must remain valid
- The documentation should remain deterministic and static
- Internal links should point only to real docs routes
- Topic ownership should remain stable over time, so categories should be chosen for long-term maintainability rather than one-off workflow phrasing

## Verification

- `npm run build`
- `npm run check:content`
- Confirm `/docs/roles/frontend` remains the overview route
- Confirm the front-end role renders as a sidebar category with child docs
