---
title: Design Role Tool Subpages Implementation Plan
description: 为设计师角色新增工具专题分组和独立工具页的实施步骤。
slug: /site-admin/superpowers/plans/design-role-tool-subpages
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
reviewed_at: 2026-03-16
source_window_end: 2026-03-16
market_status: current
unlisted: true
---

# Design Role Tool Subpages Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dedicated design-tool section with individual AI design tool pages under the design role and wire it into navigation.

**Architecture:** Keep the existing design role overview and methodology pages intact, then add a new `docs/roles/design/tools/` cluster with a landing page plus one page per tool. Use current official vendor sources to shape the content, and keep each page on a shared template so the section scales cleanly.

**Tech Stack:** Docusaurus docs, Markdown front matter, sidebar navigation, changelog, build verification

---

## Chunk 1: Structure And Navigation

### Task 1: Add the design tools document cluster

**Files:**
- Create: `docs/roles/design/tools/index.md`
- Create: `docs/roles/design/tools/figma.md`
- Create: `docs/roles/design/tools/mastergo.md`
- Create: `docs/roles/design/tools/framer.md`
- Create: `docs/roles/design/tools/relume.md`
- Create: `docs/roles/design/tools/uizard.md`
- Create: `docs/roles/design/tools/visily.md`
- Create: `docs/roles/design/tools/webflow-ai.md`

- [ ] **Step 1: Draft the shared page structure**
- [ ] **Step 2: Write the landing page and tool pages**
- [ ] **Step 3: Ensure every tool entry has a stable slug and clear next steps**

### Task 2: Wire the new pages into the design role

**Files:**
- Modify: `docs/roles/design.md`
- Modify: `sidebars.js`

- [ ] **Step 1: Add `工具专题` entry links to the overview page**
- [ ] **Step 2: Add the landing page and child tool pages to the design sidebar**
- [ ] **Step 3: Check that the new ordering still reads clearly in the sidebar**

## Chunk 2: Content Freshness And Release Notes

### Task 3: Ground tool content in current sources

**Files:**
- Modify: `docs/roles/design/tools/*.md`

- [ ] **Step 1: Verify current capabilities from official sources**
- [ ] **Step 2: Keep claims bounded to what the sources support**
- [ ] **Step 3: Set `reviewed_at` and `source_window_end` to the current date**

### Task 4: Update release notes and verify

**Files:**
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Add an `Unreleased` entry for the new design tool section**
- [ ] **Step 2: Run `npm run build`**
- [ ] **Step 3: Fix any broken links or doc issues until the build passes**
