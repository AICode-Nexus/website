---
title: Frontend Role Subpages Implementation Plan
description: 为前端岗位页拆分为总览页与主题子页记录实施步骤。
slug: /site-admin/superpowers/plans/frontend-role-subpages
tags: [site-admin, plan, superpowers]
track: cross-track
kind: guide
content_form: guide
domain: standards
journey_stage: development-planning
entry_role: admin
audience: advanced
stage: intermediate
featured: false
reviewed_at: 2026-03-15
source_window_end: 2026-03-15
market_status: current
unlisted: true
---

# Frontend Role Subpages Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the front-end role guide into one overview page plus seven engineering-theme child docs while preserving the public route `/docs/roles/frontend`.

**Architecture:** Replace `docs/roles/frontend.md` with a folder-based doc cluster under `docs/roles/frontend/`, keep the overview route stable via `index.md`, and move the detailed content into theme-owned child pages. Update `rolesSidebar` so `前端工程师` becomes a category with `总览 + 子页` items, then verify the docs build and content checks still pass.

**Tech Stack:** Docusaurus docs, Markdown, sidebar config in `sidebars.js`, site changelog, build/content verification via `npm run build` and `npm run check:content`

---

## File Structure Map

### Existing files to modify or replace

- Modify: `docs/roles/frontend.md`
- Modify: `sidebars.js`
- Modify: `CHANGELOG.md`

### New file structure to create

- Create: `docs/roles/frontend/index.md`
- Create: `docs/roles/frontend/design-to-code.md`
- Create: `docs/roles/frontend/frameworks-and-components.md`
- Create: `docs/roles/frontend/styling-and-design-systems.md`
- Create: `docs/roles/frontend/quality-gates.md`
- Create: `docs/roles/frontend/repo-architecture.md`
- Create: `docs/roles/frontend/testing-and-delivery.md`
- Create: `docs/roles/frontend/context-and-rules.md`

### Responsibility of each file

- `docs/roles/frontend/index.md`: overview route, reading map, workflow paths, topic entry links
- `docs/roles/frontend/design-to-code.md`: structured design input, tokens, first-pass page generation
- `docs/roles/frontend/frameworks-and-components.md`: React / Vue, rendering modes, component bases, state choices
- `docs/roles/frontend/styling-and-design-systems.md`: Tailwind, token systems, design-system consistency, anti-generic output guidance
- `docs/roles/frontend/quality-gates.md`: TypeScript, ESLint, Oxlint, formatter and review gates
- `docs/roles/frontend/repo-architecture.md`: pnpm, workspaces, monorepo boundaries, Turborepo and adjacent patterns
- `docs/roles/frontend/testing-and-delivery.md`: Playwright, component testing, verification chain, PR expectations
- `docs/roles/frontend/context-and-rules.md`: Context7, Plan First, MCP, `CLAUDE.md`, `AGENTS.md`, front-end skills

## Chunk 1: Replace single-file doc with overview route

### Task 1: Create the folder-based route

**Files:**
- Create: `docs/roles/frontend/index.md`
- Modify: `docs/roles/frontend.md`

- [ ] **Step 1: Read the current front-end role doc and copy out reusable sections**

Run:

```bash
sed -n '1,260p' docs/roles/frontend.md
```

Expected: current single-file front-end role content is visible for extraction.

- [ ] **Step 2: Write the new overview page**

Create `docs/roles/frontend/index.md` with:

- frontmatter preserving `slug: /roles/frontend`
- overview positioning for the front-end AI workbench
- workflow reading paths
- engineering-topic entry points
- AI-friendly stack snapshots for React and Vue

- [ ] **Step 3: Remove the old single-file route source**

Choose one stable cleanup path:

- either delete `docs/roles/frontend.md`
- or convert it into a thin redirect/stub only if the route system requires it

Preferred outcome: the route is owned by `docs/roles/frontend/index.md`.

- [ ] **Step 4: Run a route sanity check**

Run:

```bash
rg -n "slug: /roles/frontend|title: 前端 AI 工作台|前端工程师" docs/roles/frontend docs/roles/frontend.md
```

Expected: only the new overview route owns `slug: /roles/frontend`.

## Chunk 2: Create the first three child docs

### Task 2: Create `design-to-code`

**Files:**
- Create: `docs/roles/frontend/design-to-code.md`

- [ ] **Step 1: Write the frontmatter and page skeleton**

Include stable frontmatter and a direct, engineering-first title.

- [ ] **Step 2: Add the design-input sections**

Cover:

- Figma / structured handoff
- design tokens
- screenshot versus structured-data tradeoffs
- page skeleton and component extraction guidance

- [ ] **Step 3: Add next-step links**

Reuse only real routes already in the repo.

### Task 3: Create `frameworks-and-components`

**Files:**
- Create: `docs/roles/frontend/frameworks-and-components.md`

- [ ] **Step 1: Write mirrored React and Vue sections**

Cover:

- React / Next.js
- Vue / Nuxt
- rendering modes
- hooks / composables

- [ ] **Step 2: Add component-base sections**

Cover:

- Radix UI / shadcn/ui
- Vue-side equivalent customizable component strategy
- state-layer choices such as TanStack Query, Zustand, Pinia where relevant

- [ ] **Step 3: Check symmetry**

Run:

```bash
rg -n "^### " docs/roles/frontend/frameworks-and-components.md
```

Expected: React and Vue sections appear as peer sections, not parent/child sections.

### Task 4: Create `styling-and-design-systems`

**Files:**
- Create: `docs/roles/frontend/styling-and-design-systems.md`

- [ ] **Step 1: Write the Tailwind and token sections**

- [ ] **Step 2: Add AI-specific guidance on avoiding generic output**

- [ ] **Step 3: Add adjacent styling/tooling notes**

Mention optional comparisons such as CSS Modules, UnoCSS, TweakCN, or Shadcraft only when they sharpen AI collaboration choices.

## Chunk 3: Create the last four child docs

### Task 5: Create `quality-gates`

**Files:**
- Create: `docs/roles/frontend/quality-gates.md`

- [ ] **Step 1: Write the TypeScript, ESLint, and Oxlint sections**

- [ ] **Step 2: Separate write-time, review-time, and release-time gates**

- [ ] **Step 3: Add verification commands**

### Task 6: Create `repo-architecture`

**Files:**
- Create: `docs/roles/frontend/repo-architecture.md`

- [ ] **Step 1: Write the pnpm / workspace sections**

- [ ] **Step 2: Write the monorepo / Turborepo sections**

- [ ] **Step 3: Add architecture tradeoff guidance**

Cover:

- single app versus monorepo
- shared UI package versus duplicated local components
- strict package boundaries versus ad hoc imports

### Task 7: Create `testing-and-delivery`

**Files:**
- Create: `docs/roles/frontend/testing-and-delivery.md`

- [ ] **Step 1: Write the Playwright section**

- [ ] **Step 2: Add unit/component test tooling notes**

- [ ] **Step 3: Add PR and delivery checklist**

### Task 8: Create `context-and-rules`

**Files:**
- Create: `docs/roles/frontend/context-and-rules.md`

- [ ] **Step 1: Write the Context7 / Plan First / MCP sections**

- [ ] **Step 2: Add `CLAUDE.md` / `AGENTS.md` responsibility split**

- [ ] **Step 3: Add front-end skills mapping**

## Chunk 4: Navigation and release notes

### Task 9: Update the roles sidebar

**Files:**
- Modify: `sidebars.js`

- [ ] **Step 1: Replace `roles/frontend` with a category entry**

- [ ] **Step 2: Add child doc ids in this order**

Use:

- `roles/frontend/index`
- `roles/frontend/design-to-code`
- `roles/frontend/frameworks-and-components`
- `roles/frontend/styling-and-design-systems`
- `roles/frontend/quality-gates`
- `roles/frontend/repo-architecture`
- `roles/frontend/testing-and-delivery`
- `roles/frontend/context-and-rules`

- [ ] **Step 3: Ensure other roles remain unchanged**

Run:

```bash
sed -n '100,155p' sidebars.js
```

Expected: only the front-end role entry changes shape.

### Task 10: Update changelog

**Files:**
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Add one `Unreleased` bullet**

Describe that the front-end role page has been split into an overview plus engineering-theme subpages.

## Chunk 5: Verification

### Task 11: Validate content routing and structure

**Files:**
- No file changes

- [ ] **Step 1: Check the new front-end docs tree**

Run:

```bash
find docs/roles/frontend -maxdepth 1 -type f | sort
```

Expected: `index.md` plus 7 child docs are present.

- [ ] **Step 2: Run content quality checks**

Run:

```bash
npm run check:content
```

Expected: `Content quality check passed.`

- [ ] **Step 3: Run the full docs build**

Run:

```bash
npm run build
```

Expected: Docusaurus build succeeds with no broken links.

- [ ] **Step 4: Spot-check the final route ownership**

Run:

```bash
rg -n "slug: /roles/frontend" docs/roles/frontend docs/roles/frontend.md
```

Expected: only the overview page owns the public front-end route.
