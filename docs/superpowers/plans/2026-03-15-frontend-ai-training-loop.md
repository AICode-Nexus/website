---
title: Frontend AI Training Loop Implementation Plan
description: 用 Ralph Loop 持续把前端工作台文档完善为 AI 前端培训体系的实施计划。
slug: /site-admin/superpowers/plans/frontend-ai-training-loop
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

# Frontend AI Training Loop Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Iteratively evolve the front-end workbench docs into a training-grade AI front-end curriculum without destabilizing the existing role-based doc structure.

**Architecture:** Keep the current `/docs/roles/frontend` overview plus child pages, and use Ralph Loop to close one training-gap at a time. Each iteration should produce a releasable docs improvement, starting with the overview page as the training homepage, then moving to module objectives, exercises, and project-based training scaffolding.

**Tech Stack:** Docusaurus docs, Markdown, Ralph Loop state file in `.codex/ralph-loop.local.md`, changelog updates, verification via `npm run check:content` and `npm run build`

---

## File Structure Map

### Existing files to modify across iterations

- Modify: `docs/roles/frontend/index.md`
- Modify: `docs/roles/frontend/*.md`
- Modify: `CHANGELOG.md`

### Supporting files for this loop

- Create: `docs/superpowers/specs/2026-03-15-frontend-ai-training-loop-design.md`
- Create: `docs/superpowers/plans/2026-03-15-frontend-ai-training-loop.md`
- Create: `.codex/ralph-loop.local.md`

## Chunk 1: Establish the loop and the first training slice

### Task 1: Start Ralph Loop and execute the overview-page upgrade

**Files:**
- Modify: `docs/roles/frontend/index.md`
- Modify: `CHANGELOG.md`
- Create: `.codex/ralph-loop.local.md`

- [ ] **Step 1: Start the loop state**

Run:

```bash
/Users/admin/.codex/skills/ralph-loop/scripts/start-ralph-loop.sh "<prompt>" --completion-promise "FRONTEND_AI_TRAINING_COMPLETE" --max-iterations 12
```

Expected: `.codex/ralph-loop.local.md` is created in the worktree.

- [ ] **Step 2: Advance iteration 1**

Run:

```bash
/Users/admin/.codex/skills/ralph-loop/scripts/next-ralph-iteration.sh
```

Expected: the loop prompt for iteration 1 prints to stdout.

- [ ] **Step 3: Rebuild the overview page as a training homepage**

Add or deepen:

- training goal
- reader profiles
- staged learning path
- module map
- suggested training rhythm
- practice or capstone entry

- [ ] **Step 4: Record the milestone in `CHANGELOG.md`**

## Chunk 2: Turn child pages into course modules

### Task 2: Add module scaffolding to child docs

**Files:**
- Modify: `docs/roles/frontend/design-to-code.md`
- Modify: `docs/roles/frontend/frameworks-and-components.md`
- Modify: `docs/roles/frontend/styling-and-design-systems.md`
- Modify: `docs/roles/frontend/quality-gates.md`
- Modify: `docs/roles/frontend/repo-architecture.md`
- Modify: `docs/roles/frontend/testing-and-delivery.md`
- Modify: `docs/roles/frontend/context-and-rules.md`

- [ ] **Step 1: Add learning goals**
- [ ] **Step 2: Add prerequisites or recommended prior modules**
- [ ] **Step 3: Add practice tasks or deliverables**
- [ ] **Step 4: Add minimum verification criteria**

## Chunk 3: Add project-based training closure

### Task 3: Introduce practice projects and capstone guidance

**Files:**
- Modify: `docs/roles/frontend/index.md`
- Optionally modify: `docs/roles/frontend/*.md`

- [ ] **Step 1: Add 2 to 3 recommended practice projects**
- [ ] **Step 2: Add a capstone path from design to delivery**
- [ ] **Step 3: Link the capstone back into the module docs**

## Chunk 4: Verify every iteration

### Task 4: Run verification after each loop slice

**Files:**
- Verify current loop diff only

- [ ] **Step 1: Run content validation**

Run:

```bash
npm run check:content
```

Expected: content quality check passes.

- [ ] **Step 2: Run full build**

Run:

```bash
npm run build
```

Expected: Docusaurus build succeeds and static files generate.

- [ ] **Step 3: Only emit the completion promise when the curriculum criteria are all true**

The loop may end only when:

- the overview page acts as a training homepage
- each core child page includes module-learning scaffolding
- there is a full path from beginner setup to delivery
- practice projects and capstone guidance exist
- verification passes on the final committed state
