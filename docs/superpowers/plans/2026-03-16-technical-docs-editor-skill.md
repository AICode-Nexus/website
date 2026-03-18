---
title: Technical Docs Editor Skill Implementation Plan
description: 为 technical-docs-editor 本地 skill 补齐实现步骤、基线验证和仓库内验证动作。
slug: /site-admin/superpowers/plans/technical-docs-editor-skill
tags: [site-admin, plan, superpowers, skills]
track: cross-track
kind: guide
content_form: guide
domain: standards
journey_stage: development-planning
entry_role: admin
audience: advanced
stage: intermediate
featured: false
reviewed_at: 2026-03-16
source_window_end: 2026-03-16
market_status: current
unlisted: true
---

# Technical Docs Editor Skill Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a repo-local `technical-docs-editor` skill that can audit and expand technical docs with a default hybrid flow tuned for this site's role, tool, workflow, and standards pages.

**Architecture:** Keep the implementation minimal: one discoverable `SKILL.md` plus one longer `content-playbook.md`. Validate the change in three layers: baseline discovery failure before implementation, skill-file discoverability after implementation, and repo verification via changelog update plus site build.

**Tech Stack:** Markdown, local skills under `skills/`, docs specs/plans, `CHANGELOG.md`, verification via shell checks and `npm run build`

---

## File Structure Map

### Existing files to modify

- Modify: `CHANGELOG.md`

### Existing files for reference

- Reference: `docs/superpowers/specs/2026-03-16-technical-docs-editor-skill-design.md`
- Reference: `skills/ai-coding-daily-writer/SKILL.md`

### New files to create

- Create: `skills/technical-docs-editor/SKILL.md`
- Create: `skills/technical-docs-editor/content-playbook.md`
- Create: `docs/superpowers/plans/2026-03-16-technical-docs-editor-skill.md`

## Chunk 1: Baseline and discovery checks

### Task 1: Capture the failing pre-skill state

**Files:**
- Test: `skills/technical-docs-editor/SKILL.md`

- [ ] **Step 1: Verify the skill does not exist yet**

Run:

```bash
test -f skills/technical-docs-editor/SKILL.md
```

Expected: non-zero exit because the skill has not been created yet.

- [ ] **Step 2: Verify discovery keywords do not currently match a local docs-editing skill**

Run:

```bash
rg -n "technical-docs-editor|技术文档|workflow 文档|角色文档" skills
```

Expected: no dedicated local skill covering docs audit/expansion.

## Chunk 2: Implement the skill entrypoint

### Task 2: Create `SKILL.md`

**Files:**
- Create: `skills/technical-docs-editor/SKILL.md`

- [ ] **Step 1: Write frontmatter for discoverability**

Include a concise name and a trigger-focused description that covers docs review, expansion, role docs, tool docs, workflow docs, thin pages, structure gaps, tables, examples, and deliverables.

- [ ] **Step 2: Write the default operating model**

Document:

- `hybrid` as the default mode
- the minimal context-gathering sequence
- the four-layer audit
- the two allowed outcomes: plan first or direct edit

- [ ] **Step 3: Add repo-specific bias and resource link**

State the preference for decision tables, training tasks, deliverables, media entry points, related-doc links, and next-reading paths, then link to `content-playbook.md`.

## Chunk 3: Implement the reusable playbook

### Task 3: Create `content-playbook.md`

**Files:**
- Create: `skills/technical-docs-editor/content-playbook.md`

- [ ] **Step 1: Write the audit framework**

Cover structure, decisions, evidence, and operations layers with concrete questions and common gaps.

- [ ] **Step 2: Write content-shape guidance**

Define default reinforcement patterns for:

- role docs
- tool docs
- workflow docs
- standards / site-admin docs

- [ ] **Step 3: Write expansion order and output templates**

Include:

- expansion order
- `文档体检`
- `扩写计划`
- `直接改稿`
- `专题补强地图`

- [ ] **Step 4: Add repo-specific heuristics**

Lock in the site-specific expectations for training artifacts, media weight, sibling-page boundary hygiene, and plan-first behavior for structural rewrites.

## Chunk 4: Release bookkeeping and verification

### Task 4: Update changelog and verify the repo

**Files:**
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Add an Unreleased changelog entry**

Record the addition of the local `technical-docs-editor` skill and its focus on auditing and reinforcing long-form technical docs.

- [ ] **Step 2: Verify the implemented skill is now discoverable**

Run:

```bash
rg -n "technical-docs-editor|角色文档|工具文档|workflow 文档|交付物" skills/technical-docs-editor
```

Expected: the new files contain the intended trigger keywords and repo-specific guidance.

- [ ] **Step 3: Run the site build**

Run:

```bash
npm run build
```

Expected: Docusaurus build completes successfully with the new docs and changelog content in place.
