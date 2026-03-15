---
title: Frontend AI Workbench Role Page Design
description: 将前端岗位页从泛化岗位说明重构为覆盖设计到交付的前端 AI 工作台。
slug: /site-admin/superpowers/specs/frontend-ai-workbench-design
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

# Frontend AI Workbench Role Page Design

## Goal

Rewrite `docs/roles/frontend.md` so it stops reading like a thin role summary and instead works as a front-end AI workbench that:

- covers the path from design input to engineering delivery
- organizes content by front-end concerns instead of generic AI scenarios
- treats React and Vue as equal first-class ecosystems
- explicitly introduces standards documents such as `CLAUDE.md` and `AGENTS.md`
- surfaces front-end-relevant skills, workflows, and verification habits

## Context

The current front-end role page is structurally consistent with the other role guides, but it is too shallow for the audience it targets. It mainly lists generic scenarios, tool entrances, and a few prompt snippets. That makes it look sparse next to the rest of the site and does not reflect how modern front-end teams actually use AI.

User direction established during brainstorming:

- default emphasis should be `设计到实现`
- React and Vue must be treated with equal weight
- the page must include front-end engineering topics such as Tailwind CSS, shadcn/ui, Figma, Playwright, ESLint, Oxlint, pnpm, monorepo, and Turborepo
- repo instruction files (`CLAUDE.md`, `AGENTS.md`) and front-end-relevant skills should be part of the information architecture

Additional source input from the user-provided PDF reinforced the same direction:

- design-to-code should be framed as a structured pipeline, not screenshot guessing
- front-end AI quality improves when design tokens, component primitives, testing, and repo context are all explicit
- standards files and context layers are part of the workflow, not optional extras

## Decision

Keep the existing route `/docs/roles/frontend`, but reposition the page as:

`前端 AI 工作台：从设计稿到工程交付`

The page should remain a Markdown doc and reuse the current documentation system. No new React components are needed for this milestone. The gain should come from denser information architecture, stronger categorization, and more concrete engineering guidance.

## Page Structure

The rewritten page should use the following sections:

1. Intro / positioning
2. This page is for whom
3. Design to code
4. Framework and component ecosystems
5. Styling and design systems
6. Code quality and engineering gates
7. Package management and repo structure
8. Testing and delivery
9. Context engineering and AI collaboration
10. Standards documents and collaboration contracts
11. Front-end-relevant skills
12. Templates, commands, and next steps

## Content Rules

- React and Vue must use mirrored structure and similar depth
- Only point to real internal docs routes that already exist
- Topics without standalone site docs yet may still appear as guidance, but should not pretend to have deep linked coverage
- Keep the guidance practical: what AI helps with, where human review is required, and how to verify
- Avoid overspecifying version-sensitive product claims unless necessary

## Scope

### In scope

- Rewrite `docs/roles/frontend.md`
- Update the doc frontmatter, title, description, and reviewed date
- Add richer guidance on front-end ecosystems, standards files, and skills
- Update `CHANGELOG.md`
- Record the design and implementation plan in `docs/superpowers/`

### Out of scope

- Creating dedicated standalone docs for Figma, Tailwind, shadcn/ui, Playwright, pnpm, Turborepo, or Oxlint
- Adding new homepage cards or portal components
- Changing the roles index or sidebar structure

## Constraints

- Preserve the existing role route and sidebar entry
- Keep the page deterministic and static
- Follow current docs conventions and frontmatter shape
- Keep release notes updated for the content milestone

## Verification

- `npm run build`
- Manually confirm the rewritten role page builds without broken internal links
