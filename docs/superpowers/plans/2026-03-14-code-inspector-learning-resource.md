---
title: Code Inspector Learning Resource Implementation Plan
description: 为 Code Inspector 学习资料条目与独立资料页记录实施步骤。
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
reviewed_at: 2026-03-14
source_window_end: 2026-03-14
market_status: current
unlisted: true
---

# Code Inspector Learning Resource Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `code-inspector` to the learning-resource directory and publish a standalone resource page that explains what it is, how to try it, and where it fits.

**Architecture:** Keep the canonical resource metadata in `src/data/aiDirectory.js`, then add one lightweight doc page in `docs/ai-directory/` for deeper guidance. Wire discoverability through the sidebar and the existing learning-collection page instead of introducing new components.

**Tech Stack:** Docusaurus docs, MDX, shared docs components, validated `aiDirectory` data

---

## Chunk 1: Directory wiring

### Task 1: Add the resource entry

**Files:**
- Modify: `src/data/aiDirectory.js`

- [ ] Add a `Code Inspector` entry under `learning-and-collections`
- [ ] Use official docs and GitHub repo URLs from primary sources
- [ ] Add reviewed date overrides for `2026-03-14`

### Task 2: Make the new page discoverable

**Files:**
- Modify: `sidebars.js`
- Modify: `docs/ai-directory/learning-and-curated-collections.mdx`

- [ ] Add `ai-directory/code-inspector` to `aiDirectorySidebar`
- [ ] Link the new page from the learning collection doc

## Chunk 2: Standalone resource page

### Task 3: Write the resource doc

**Files:**
- Create: `docs/ai-directory/code-inspector.mdx`

- [ ] Add frontmatter consistent with other `ai-directory` pages
- [ ] Cover intro, quick try path, fit, boundaries, and official links
- [ ] Keep support claims scoped to sources reviewed on `2026-03-14`

## Chunk 3: Release notes and verification

### Task 4: Update release notes

**Files:**
- Modify: `CHANGELOG.md`

- [ ] Add one `Unreleased` bullet for the new learning resource entry and doc

### Task 5: Verify

**Files:**
- No file changes

- [ ] Run `npm run build`
- [ ] Confirm there are no broken docs/sidebar links
