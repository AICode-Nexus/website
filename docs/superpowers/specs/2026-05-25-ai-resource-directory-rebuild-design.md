---
title: AI Resource Directory Rebuild Design
description: 为全行业 AI 资源库重建记录目标、分类、字段、收录策略和第一期边界。
slug: /site-admin/superpowers/specs/ai-resource-directory-rebuild-design
tags: [site-admin, spec, superpowers, ai-directory]
track: cross-track
kind: guide
content_form: guide
domain: standards
journey_stage: solution-design
entry_role: admin
audience: advanced
stage: intermediate
featured: false
reviewed_at: 2026-05-25
source_window_end: 2026-05-25
market_status: current
unlisted: true
---

# AI Resource Directory Rebuild Design

## Goal

Rebuild the site's AI knowledge resource layer into a broad, cross-industry AI resource directory.

The first release should establish a durable collection system for excellent AI websites, especially non-Chinese official sites, documentation portals, courses, cookbooks, open-source projects, community directories, and role-specific AI work resources. It should support the current R&D-first learning site while making room for product, design, operations, marketing, sales, data, office productivity, management, and industry-specific AI resource tracks.

## User Decision

The selected scope is `C: 全行业 AI 资源库`.

Additional requirement:

- Foreign high-quality AI websites should be collected as broadly as practical.
- Chinese resources should remain useful, but they should be a complementary layer, not the main worldview.

## Context

The repository already has an `AI 资源导航` system:

- canonical data source: `src/data/aiDirectory.js`
- schema and validation: `src/utils/aiDirectory.js`
- directory pages: `docs/ai-directory/`
- sidebar: `aiDirectorySidebar` in `sidebars.js`

The current directory is a useful seed, but it is still shaped mainly around AI coding, agents, LLM application engineering, MCP, model platforms, and Chinese community links. The new direction needs a wider taxonomy and stronger collection governance.

## Non-Goals

- Do not turn the site into a generic AI news portal.
- Do not collect low-quality tool-listing sites just to increase count.
- Do not make every resource a longform article in the first release.
- Do not dilute the existing R&D learning path; the directory should support it and expand beyond it.
- Do not rely on runtime fetching for the public site. The published directory remains deterministic static content.

## Recommended Approach

Use a hybrid of breadth-first taxonomy and trust-first collection.

1. Build the full cross-industry category map first.
2. Seed every major category with 10-20 high-trust resources.
3. Prioritize foreign official and high-quality sources across every category.
4. Keep Chinese resources as a separate discovery layer and localized bridge.
5. Store canonical metadata in one data source, then render category pages from the shared components.

This gives the site a visible full-industry shape without letting the first release become an unreviewable link dump.

## First Release Categories

### 1. 基础与官方平台

Purpose: collect primary model and AI platform entry points.

Examples of resource shapes:

- model provider docs and developer platforms
- official API docs
- model catalogs and safety docs
- official cookbooks and examples

Default emphasis: OpenAI, Anthropic, Google, Microsoft, Meta, Mistral, Hugging Face, Amazon, Cohere, Stability AI, and other high-trust international platform sources.

### 2. 研发与 AI Coding

Purpose: keep the existing AI coding strength but reorganize it as one category in a wider system.

Examples of resource shapes:

- coding agents
- AI IDEs
- terminal agents
- code review and testing assistants
- software engineering case repositories

Default emphasis: official product sites, docs, GitHub repos, and serious engineering writeups.

### 3. Agent / MCP / LLM 应用开发

Purpose: collect frameworks, orchestration systems, protocol resources, and application-building references.

Examples of resource shapes:

- agent SDKs
- graph or workflow frameworks
- MCP docs, SDKs, registries, and server collections
- RAG, tool-use, structured-output, and guardrail resources

Default emphasis: official docs and open-source projects with active maintenance.

### 4. 产品与设计

Purpose: support product managers, UX designers, UI designers, and design-system maintainers.

Examples of resource shapes:

- AI product discovery and research tools
- prototyping and wireframing tools
- design generation tools
- user-research summarization tools
- product analytics and feedback-analysis resources

Default emphasis: resources that produce real product artifacts, not prompt-tip collections.

### 5. 运营与市场

Purpose: collect resources for content operations, marketing, SEO, growth, campaign planning, and social distribution.

Examples of resource shapes:

- content workflow platforms
- SEO and research tools with AI features
- social media planning tools
- ad creative and campaign experimentation tools
- audience and trend research resources

Default emphasis: practical workflow value and trustworthy official documentation.

### 6. 销售与商务

Purpose: collect AI resources for business development, sales research, CRM hygiene, proposal drafting, and meeting preparation.

Examples of resource shapes:

- sales intelligence platforms
- CRM AI docs
- account research workflows
- meeting summary and follow-up systems
- proposal and outbound writing tools

Default emphasis: resources that connect to concrete sales artifacts and enterprise workflows.

### 7. 数据与分析

Purpose: support analysts, data scientists, BI users, and technical operators.

Examples of resource shapes:

- AI-assisted notebooks
- BI copilots
- data cleaning and transformation tools
- data visualization resources
- analytics report generation workflows

Default emphasis: official docs, examples, and reproducible workflows.

### 8. 企业效率与办公

Purpose: collect broadly useful AI resources for documents, spreadsheets, meetings, knowledge bases, automation, and internal operations.

Examples of resource shapes:

- office suites with AI features
- meeting and transcription tools
- knowledge-base and search tools
- workflow automation platforms
- document and spreadsheet assistants

Default emphasis: mainstream official resources and role-neutral productivity workflows.

### 9. 行业专题

Purpose: create a place for industry-specific AI resources without forcing them into general role categories.

Initial subtopics:

- education
- legal
- finance
- healthcare
- e-commerce
- media and publishing
- manufacturing
- customer support

Default emphasis: official, regulatory-aware, or institutionally credible sources. Healthcare, legal, and finance resources need stricter caution labels and should not be framed as professional advice.

### 10. 中文社区与导航

Purpose: provide a localized discovery layer for Chinese readers.

Examples of resource shapes:

- Chinese AI community sites
- Chinese prompt and workflow repositories
- Chinese course directories
- high-quality Chinese AI navigation sites

Default emphasis: sustained maintenance, clear ownership, and real learning value.

## Collection Targets

For the first release:

- Target 10-20 resources per top-level category.
- Favor foreign high-quality AI websites across all categories.
- Keep Chinese resources mostly inside `中文社区与导航`, with exceptions only when a Chinese source is the strongest resource for a specific role or task.
- Mark priority resources as featured, but keep the featured count limited so category pages stay scannable.

The expected first-release size is roughly 100-200 reviewed resources.

## Resource Type Model

The current resource type list should be expanded beyond the existing AI coding shape.

Required resource types:

- `official-product`
- `official-platform`
- `official-docs`
- `official-course`
- `official-cookbook`
- `official-repo`
- `research-lab`
- `open-source-project`
- `community-curation`
- `community-course`
- `community-repo`
- `industry-resource`
- `tool-directory`
- `media-library`

The implementation can keep compatibility with existing resource types and add new labels incrementally.

## Entry Field Model

Every directory entry should have stable, validated metadata.

Required fields:

- `id`
- `categoryId`
- `name`
- `resourceType`
- at least one of `officialUrl`, `docsUrl`, or `repoUrl`
- `summary`
- `bestFor`
- `whyListed`
- `tags`
- `reviewedAt`
- `sourceWindowEnd`

Recommended new fields:

- `audience`: role or user group, such as `developer`, `product`, `design`, `operations`, `marketing`, `sales`, `data`, `general`, `industry`
- `language`: `en`, `zh`, `multi`, or another stable code when needed
- `region`: `global`, `china`, `us`, `europe`, or another broad region when useful
- `trustLevel`: `official`, `institutional`, `established-community`, `emerging-community`, `watch`
- `marketStatus`: `current`, `watch`, or `legacy`
- `collectionPriority`: `core`, `important`, or `supplemental`
- `updateTrigger`: short note describing what should cause re-review

## Collection Rules

### Include

- Official AI platform sites and docs.
- Official courses, cookbooks, API examples, and GitHub organizations.
- Open-source projects with clear ownership, active usage, or strong educational value.
- High-quality community collections that are maintained and useful as discovery surfaces.
- Role-specific AI workflow tools that produce real work artifacts.
- Industry-specific AI resources with credible backing.

### Exclude

- Thin affiliate directories.
- Pure SEO pages with no unique classification value.
- Tool homepages with no clear AI relevance or unclear ownership.
- Stale GitHub repositories with no obvious historical value.
- News-only sites unless they are part of a later trend-monitoring layer.
- Unverifiable claims about medical, legal, or financial advice.

## Page Structure

Keep the existing static-directory model:

- `docs/ai-directory/index.mdx`: overview and category entry point.
- One category page per top-level category.
- Category pages render shared data through `AiDirectoryCategoryView`.
- Optional standalone pages are reserved for high-value resources that need deeper explanation.

Do not create a long article for every resource in v1.

## Data Flow

1. Editor collects and verifies resource candidates.
2. Canonical metadata is added to `src/data/aiDirectory.js`.
3. `defineAiDirectoryCatalog` validates ids, categories, urls, dates, and enum fields.
4. Category docs render the validated entries.
5. Sidebar exposes every top-level category.
6. Homepage and taxonomy pages can link to the directory after the v1 shape is stable.

## Freshness And Governance

Use exact dates for every collection pass.

Default rules:

- `reviewedAt`: the date an editor checked the entry.
- `sourceWindowEnd`: the latest source-check date included in that review.
- `marketStatus`: current, watch, or legacy.
- `updateTrigger`: model launch, major docs rewrite, repo archival, pricing/product repositioning, or broken official link.

Recommended cadence:

- Monthly quick link check for featured resources.
- Quarterly review for all core resources.
- Immediate review when major model/platform/product changes affect a category.

## Verification

Before publishing implementation:

- Run `npm run check:ia`.
- Run `npm run check:content`.
- Run `npm run build`.
- Confirm category pages use stable ids and real routes.
- Confirm every entry has at least one valid public URL.
- Confirm docs and data dates are updated to the collection date.
- Update `CHANGELOG.md` under `Unreleased`.

## Implementation Boundary

This design only approves the resource-directory rebuild direction. Implementation should happen in a separate plan.

The first implementation plan should focus on:

1. Expanding the `aiDirectory` schema.
2. Renaming or adding top-level categories.
3. Reworking existing entries into the new taxonomy.
4. Collecting the first 100-200 foreign-first, high-quality AI resources.
5. Adding or updating category docs.
6. Running the site checks and build.

