---
title: Code Inspector Learning Resource Design
description: 为 Code Inspector 学习资料条目与独立资料页记录设计决策。
slug: /site-admin/superpowers/specs/code-inspector-learning-resource-design
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
reviewed_at: 2026-03-14
source_window_end: 2026-03-14
market_status: current
unlisted: true
---

# Code Inspector Learning Resource Design

## Goal

Add `code-inspector` to the site's learning-resource system as both:

- a structured entry in the `AI 资源导航` learning collection
- a standalone reference doc that combines收藏、上手、选型判断三层信息

## Context

The current repository already treats `AI 资源导航` as the stable directory for official docs, repos, and learning entrances. `code-inspector` is not a primary AI coding platform, but it is a practical front-end workflow aid that is useful to learn, evaluate, and keep bookmarked.

Official sources reviewed on 2026-03-14:

- GitHub repo: `https://github.com/zh-lx/code-inspector`
- English docs: `https://inspector.fe-dev.cn/en/`
- Quick start: `https://inspector.fe-dev.cn/en/guide/start.html`
- Launch IDE support repo: `https://github.com/zh-lx/launch-ide`

## Decision

Place the resource in `AI 资源导航 -> 课程、Cookbook 与精选合集` and create a standalone page under `docs/ai-directory/`.

This keeps the information architecture light:

- it is discoverable from the learning-resource catalog
- it does not force the tool into the main `AI 编程工具` tutorial track
- it gets enough room to explain fit, setup, and boundaries

## Scope

### Content changes

- Add one new `aiDirectory` entry for `Code Inspector`
- Add one new doc page: `docs/ai-directory/code-inspector.mdx`
- Link the new page from `learning-and-curated-collections.mdx`
- Add the page to `aiDirectorySidebar`
- Update `CHANGELOG.md`

### Page structure

The standalone page should cover:

1. What it is
2. Why it belongs in learning resources
3. Quick try path with a minimal Vite example
4. Who it fits
5. Boundaries and limitations
6. Official links and related reading

## Constraints

- Reuse existing docs primitives and frontmatter conventions
- Keep facts tied to reviewed dates because support matrices can change
- Avoid inventing unsupported integrations; rely on official repo/docs only
- Keep the site deterministic and data-driven

## Verification

- `npm run build`
- Confirm the new doc is linked from the learning collection and sidebar
