# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for site releases.

## [Unreleased]

### Added

- A tutorial-first public IA with new `开始上手 / 工具教程 / 工作流教程 / 实战案例 / 进阶专题 / 动态` entry points, a rebuilt homepage, and a new homepage data contract centered on starter tracks, featured tutorials, case studies, and updates.
- Explicit `tutorial` and `case-study` content forms in `src/data/knowledgeModel.js`, plus build-time validation for tutorial metadata (`tutorial_series`, `estimated_time`, `prerequisites`, `deliverable`) and case-study metadata (`case_type`, `scenario`, `tool_stack`, `verification`).
- A new `30 分钟上手` starter tutorial, four first-wave tool tutorial tracks (Claude Code, OpenAI Codex, Cursor, GitHub Copilot), four first-wave workflow tutorial tracks (Bugfix / Refactor / Test, Terminal-First Repo Pairing, Issue / Jira -> Draft PR, Spec-First), and three cross-tool case-study docs under `/docs/case-studies`.
- A second tutorial wave for `VS Code Agents`, `Gemini CLI`, `Cline`, and `Windsurf`, plus new runbook/example/pitfall/tooling tracks for `Parallel Worktrees / Multi-Agent` and `Local -> Background -> Cloud`.
- Three additional cross-tool case studies covering `VS Code Agents -> OpenAI Codex -> GitHub review`, `Cline + parallel worktrees`, and `Windsurf -> draft PR` handoff patterns, plus expanded case-study navigation and homepage case-study surfacing.
- A `Gemini CLI -> terminal audit -> draft PR` case study, and explicit `现在应该读什么` jump sections on downgraded archive lenses so legacy map/index/archive pages now route readers back into current tutorial paths.
- Comparison and insight hubs now act as tutorial-return pages, and key comparison/insight articles are required to link back into executable tutorials or case studies.

- A shared `domain / journey_stage / entry_role / content_form` knowledge model in `src/data/knowledgeModel.js`, plus a new `/docs/start/journey-map` flow overview and `/docs/ecosystem` hub for the `生态与集成` direction.
- Dedicated hub pages for `开始`、`内容索引`、`资源中心` and `旧赛道归档`, plus split tool-resource docs for `/docs/tools/resources/videos` and `/docs/tools/resources/courses`.
- A legacy teaching-video redirect shim that forwards `/docs/ai-code-teaching-videos` deep links to the new video or course resource routes without breaking shared URLs.
- Shared docs presentation primitives in `src/components/docs/` for decision matrices, scenario cards, checklists, related-reading blocks, and tool-linked teaching resources so handbook and longform pages can reuse a single docs UI layer.
- Build-time handbook catalog validation in `src/utils/handbookCatalog.mjs`, forcing tool and workflow source records to provide stable ids, required page sections, internal links, and source metadata before docs generation runs.
- A scheduled `Teaching Videos Sync` GitHub Actions workflow that refreshes the teaching-video catalog every 6 hours, validates the contract, and auto-commits a new generated catalog when the sync succeeds.
- Structured workflow and tool handbooks generated from `src/data/workflowCatalog.mjs` and `src/data/toolCatalog.mjs`, adding pattern/framework/community workflow directories and role-based tool directories under `docs/workflows/` and `docs/tools/`.
- A practical workflow layer for the knowledge base with a new mainstream workflow guide and a step-by-step workflow playbook, covering spec-first, bugfix, async issue-to-PR, terminal-first, and parallel worktree usage.
- Repository-level frontend and release guardrails in `AGENTS.md` for performance, low coupling, reusable components, fail-fast config validation, and release discipline.
- A validated homepage content model in `src/data/portalContent.js` and `src/utils/portalContent.js` to centralize portal copy, links, and section metadata.
- Shared portal primitives for section wrappers and reusable cards in `src/components/portal/SectionBlock.js`, `src/components/portal/ContentCard.js`, and `src/components/portal/LinkTile.js`.
- Phase D content upgrades across taxonomy, playbooks, comparisons, and monthly insights, including a deeper `Cursor vs Windsurf vs Cline` comparison and a March 2026 monthly brief.
- A new AICode-Nexus logo system in `static/img/` with navbar and favicon integration.
- Google Analytics 4 site tracking via Docusaurus `gtag` with measurement ID `G-7XSE8G61G2`.
- A navbar-level global search input that indexes docs and Daily Brief metadata without adding an external search dependency.
- A build-time portal data plugin that auto-aggregates homepage featured docs from docs frontmatter instead of requiring hand-maintained homepage doc entries.
- A new `AI Code 教学视频` homepage section and `/docs/ai-code-teaching-videos` catalog page backed by validated local video metadata, prioritizing Bilibili public videos.
- A build-time `sync:teaching-videos` workflow that scrapes public Bilibili video metadata from a curated seed list and writes committed generated catalog data for the portal and docs pages.
- An earlier direction-based knowledge architecture spanning `AI 开发方式`、`AI 工作流`、`AI 编程工具`、`AI 规范`、`AI 架构`, which now serves as the foundation for the expanded journey-plus-direction model.
- New direction hub docs and new topic docs covering Claude Code, Gemini CLI, terminal agent landscape, repo instruction files, freshness governance, AI-native engineering architecture, and MCP topology.
- A docs-page freshness banner and build-time validation for knowledge-doc freshness metadata, while retaining `pillar` compatibility for older frontmatter.
- A maintained mainstream tool watchlist to keep GitHub Copilot, VS Code Agents, OpenAI Codex, Claude Code, Gemini CLI, Cursor, and Windsurf under explicit review cadence.
- New first-class docs directories for `development-modes`, `workflows`, `tools`, `standards`, and `architecture`, plus `docs/archive/tracks` for legacy lenses.
- New workflow docs covering framework selection, task workflow catalog, async agent delivery, expanded prompt contracts, and deeper spec-driven delivery guidance.
- New standards docs covering skills/commands/hooks, review quality gates, evaluation metrics, and richer repository rule ownership guidance.
- New content automation under `scripts/content/` for content quality checks and draft generation of daily briefs and weekly roundups from repository manifests.
- New content source manifests in `content-sources/` and tracked draft-only folders for `blog/weekly`, `blog/monthly`, and `drafts/notes`.

### Changed

- Tightened tool-handbook auxiliary pages so `工作流适配 / 规则与边界 / 优点与替代` now use shorter navigation labels and denser decision-oriented content instead of verbose “补充” framing.
- Promoted `视频资源` into an independent top-level docs route at `/docs/resources`, moved the navbar entry into the right-side utility area before `GitHub` and search, and kept `/docs/tools/resources*` on explicit redirects so old shared links still resolve.
- Rebuilt the `工具教程` sidebar into explicit tool directories so quick starts are grouped by tool family and each handbook now expands under its own tool label instead of flattening into repeated generic page names.
- Added a docs right rail for tool pages that surfaces tool-filtered teaching videos beside the article and TOC, making resource discovery available without leaving the current tutorial.
- Repositioned concept landing pages so they now point readers to concrete tutorial or case-study next steps instead of stopping at maps, indexes, or tool-role summaries.
- Reworked the homepage plugin and content-quality checks to prioritize tutorial and case-study collections instead of comparison/playbook/insight homepage groupings.
- Slimmed the second-wave supplementary tool and workflow docs into shorter decision-aid pages, and taught `check:content` to validate `补充：...` docs as lightweight decision aids instead of forcing them to mimic full handbook pages, so `quick-start`, `common-tasks`, `runbook`, and case-study content remain the primary learning path.
- Slimmed the first-wave Claude Code, OpenAI Codex, Cursor, GitHub Copilot, Bugfix / Refactor / Test, Terminal-First Repo Pairing, Issue / Jira -> Draft PR, and Spec-First supplementary docs into the same lightweight decision-aid format, and demoted their sidebar labels/positions behind the runnable tutorial and runbook pages.
- Rewrote the first-wave tool and workflow overview pages into tutorial-first landing pages with clearer "start here" CTAs, direct reading order, and less repeated conceptual prose, so the overview layer now routes readers into runnable docs instead of competing with them.
- Rewrote the second-wave VS Code Agents, Gemini CLI, Cline, Windsurf, Parallel Worktrees / Multi-Agent, and Local -> Background -> Cloud overview pages into the same tutorial-first landing pattern, reducing repeated concept prose while keeping the overview layer as an entry point into quick starts, runbooks, and cases.
- Reworked the `AI 编程工具`, `AI 工作流`, `开始这里`, `学习路径`, `工具选择地图`, `流程地图`, and `内容索引` hub pages into shorter routing pages that now prioritize direct quick-start, runbook, case-study, and comparison entry points over repeated high-level explanation.
- Tightened homepage entry validation so primary homepage CTAs must point to actionable routes, homepage gateway pages must expose enough tutorial/playbook/case-study links, and the portal cannot quietly drift back toward abstract landing pages.
- Tightened navbar and sidebar IA guards so the six primary top-level entries stay fixed, each primary sidebar opens on the expected tutorial-first landing doc, and the tool/workflow rails must keep explicit `先跑 Quick Start` and `先跑 Runbook` sections ahead of slower conceptual reading.
- Added click-budget acceptance to `check:ia` and `check:content`, so homepage hero/starter entries must remain one click from executable docs, homepage gateway CTAs must remain within two clicks of tutorials or case studies, and the case-study hub now carries the same direct-return requirements as the tool and workflow hubs.
- Added a repeatable browser acceptance script (`npm run check:browser`) that serves the production build under `/website`, drives a real browser through `playwright-cli`, verifies desktop/mobile primary navigation and tutorial entry rails, and writes screenshots plus a JSON report under `output/playwright/browser-acceptance/`.
- Added an optional release smoke path with `npm run verify:release:smoke` and a manual GitHub Actions workflow (`.github/workflows/browser-smoke.yml`) so browser acceptance can be run on demand and its screenshots/report uploaded as artifacts without turning the default CI lane into a slow hard gate.

- Split the docs navigation into per-tab sidebars so the left rail now follows the active top-level section, and promoted the teaching-video/resource area into a dedicated `视频资源` navbar tab instead of repeating every first-level docs section in the sidebar.
- Reframed the homepage around `Quick Start -> Journey Map -> Direction Map -> Learning Path -> Resource Center -> Content Index -> Daily Brief`, replacing the old portal narrative with a process-first AI Code map.
- Updated sidebar, navbar, overview docs, search metadata, featured-doc aggregation, and doc freshness badges to prefer `domain` with `pillar` fallback, and to surface `journey_stage` where available.
- Backfilled `domain / journey_stage / entry_role / content_form` across the remaining handbook, archive, comparison, playbook, insight, and site-admin docs, and normalized legacy `pillar` values where those pages were reclassified.
- Aligned the handbook generator, content-quality checks, and portal-data validation with the new metadata contract so generated docs now emit `domain / journey_stage / entry_role / content_form` by default and build-time checks enforce those fields.
- Codified the allowed `tools/* -> ecosystem` integration-governance exceptions in the shared knowledge model, documented that policy on the ecosystem hub, and added a dedicated IA audit script so future path/domain drift fails explicitly.
- Consolidated the public integration-governance URLs under `/docs/ecosystem/integrations/*`, moved those generated docs into the ecosystem sidebar cluster, and kept the old tool-scoped governance URLs alive through redirects.
- Added a generated-handbook sync check and wired `check:handbooks -> check:ia -> check:content` into CI and release documentation so stale generated docs or IA drift fail before deployment.
- Added `npm run verify:release` so release validation can be run as one deterministic local gate instead of manually remembering each pre-publish check.
- Removed `pillar` from the active docs metadata contract, handbook generator output, and search keywords so the repo now writes `domain` only while runtime compatibility remains in place for historical content.
- Rebuilt the site IA around `开始 / AI Code 地图 / 资源中心 / 内容索引 / 旧赛道归档 / Daily Brief / 站点维护`, updating navbar, sidebar, footer entry points, homepage ordering, and core overview links to match the new journey-plus-direction model.
- Aligned the footer `AI Code 地图` entry with the navbar so both now land on the process-first journey map instead of splitting between journey and taxonomy routes.
- Moved start, tool-map, comparison, playbook, and insight docs onto the newer docs routes with redirect coverage for the previous slugs, while keeping comparison/playbook/insight index hubs as discovery layers instead of primary leaf paths.
- Split the teaching-video experience into separate video and course directories so filters now drive only the active result entity, course aggregation is computed from the filtered video set, and video cards link down into the dedicated course view instead of rendering a course block mid-page.
- Upgraded the navbar search index with stable `entityType / domain / journeyStage / contentForm / resourceType` metadata and grouped result rendering for knowledge docs, videos, and courses.
- Added an explicit keyword search button to the teaching-video catalog filters so query edits now apply on button click or Enter instead of re-filtering on every keystroke.
- Updated teaching-video quick filters and tool-scoped learning-resource CTAs so they now deep-link straight to the catalog `视频明细` section instead of stopping at the top of the page after applying a filter.
- Reworked the teaching-video catalog navigation so desktop now uses a stateful pagination panel with range feedback and page numbers, while mobile switches to shareable incremental "load more" browsing driven by URL state instead of local-only previous/next buttons.
- Normalized CTA alignment inside teaching-video cards and shared homepage content cards so card buttons now anchor to a consistent bottom edge even when summaries and tag rows have different heights.
- Rewrote the generated handbook output under `docs/tools/` and `docs/workflows/` so tool, workflow, and framework clusters now render decision-oriented sections, tables, next-step links, and tool learning resources instead of thin bullet-only pages.
- Reworked the `AI 编程工具` and `AI 工作流` hub docs into decision-first landing pages that route readers by problem shape, family, and reading order instead of stacked title-summary lists.
- Added reusable related-reading rails to longform comparisons, playbooks, and insights so deep reads now connect back to the relevant handbook clusters and follow-on actions.
- Tightened `check:content` with family-specific depth rules for generated handbook pages and hub/overview pages, including stronger floors for H2 structure, tables, internal links, and source coverage.
- Tightened handbook and content validation again so source links are deduplicated, only real docs/blog routes count toward internal-link floors, archive/site-admin docs receive explicit lightweight checks, and handbook catalogs now enforce the minimum array shapes the generator actually reads.
- Clarified the teaching-video auto-sync cadence across the homepage card, catalog hero, and overview doc so the UI now explicitly states the 6-hour refresh cycle instead of a vague “自动同步” badge.
- Moved the docs-page freshness/status banner to the bottom of each document article so governance metadata remains available without displacing the main content above the fold.
- Fixed the teaching-video course CTA deep-link behavior so `查看课程代表视频` now lands on and highlights the corresponding video card, and aligned course-card CTAs to a consistent bottom edge.
- Removed the decorative underline from the navbar `教学视频` link and disabled the mobile navbar blur on narrow screens so the Docusaurus slide-out menu can render correctly in iOS and WeChat browsers.
- Elevated the `AI Code 教学视频库` discovery path with a dedicated right-side navbar `教学视频` entry and a lighter desktop highlight so the video hub is reachable above the fold without disrupting the main knowledge navigation.
- Reworked the `AI 工作流` and `AI 编程工具` hubs, sidebar, homepage links, and learning paths around handbook-style subdirectories while preserving legacy routes such as `/docs/workflows/mainstream-ai-coding-workflows`, `/docs/claude-code-workstyle`, and `/docs/gemini-cli-github-workflow`.
- Expanded the workflow framework layer to include `Superpowers` alongside `BMAD`, `Spec Kit`, and `OpenSpec`, and added detailed handbook pages for GitHub Copilot, VS Code Agents, OpenAI Codex, Claude Code, Gemini CLI, Cline, Cursor, and Windsurf.
- Rebuilt the `AI Code 教学视频` module around a 90-day multi-source catalog with generated metrics, facets, course aggregation, featured ranking, search deep-links, and a filterable docs directory instead of a hand-laid flat list.
- Promoted the homepage teaching-video section into a primary portal block with freshness status, 7/30/90-day counters, 8 featured videos, and tool quick filters sourced from generated catalog metadata.
- Tightened CI so website builds now validate teaching-video freshness and catalog contract before deployment.
- Tightened homepage CTA layout and mobile navbar behavior so section actions keep a compact size and the main navigation remains reachable on narrow screens.
- Reworked workflow discovery across the workflow hub, playbooks hub, start-here guide, learning paths, sidebar, and homepage quick actions so readers reach concrete workflow docs before abstract framework pages.
- Refactored the portal homepage to consume centralized content config instead of spreading section text and routes across individual components.
- Unified homepage card rendering around shared presentation components to improve style consistency, component boundaries, and future extensibility.
- Narrowed handbook generation and sync checks back to the roots that are still truly autogenerated (`ecosystem/integrations`, workflow frameworks, and community frameworks) so CI no longer tries to overwrite the manually maintained tutorial-first tool and workflow tracks.
- Constrained the navbar search results panel to the viewport and enabled touch-friendly vertical scrolling so long result lists remain usable on narrow or short screens.
- Switched docs tables to horizontal scrolling on small screens so comparison and workflow tables are no longer clipped on mobile.
- Restored dark-mode styling across the navbar, docs surface, and portal homepage cards so the theme switch updates the full site instead of leaving light-only hardcoded colors behind.
- Stabilized docs-page backgrounds so long-form knowledge pages no longer reveal the global homepage gradient while scrolling.
- Shifted homepage featured content to deterministic build-time grouping by docs `featured` and `kind` metadata, and documented that contract in the taxonomy doc.
- Extended the shared portal card component to support richer metadata and tags so video entries can reuse the existing card pattern instead of introducing a separate homepage card system.
- Replaced the hand-maintained teaching video catalog module with a seed-plus-generated data pipeline, keeping runtime rendering deterministic while moving metadata capture into an explicit sync step.
- Expanded the global footer with direct contact details, collaboration topics, and a usable repository fallback so the bottom section carries real personal entry points instead of empty space.
- Reframed the homepage, navbar, sidebar, and overview docs around team/platform-owner needs instead of only individual-engineer onboarding.
- Demoted the old `models-agents / ides-tooling / prompting-workflows / team-delivery` structure into legacy lenses while preserving their existing routes.
- Added domain-compatible freshness metadata to public knowledge docs and surfaced that metadata in homepage featured cards and search indexing, with `pillar` fallback for older pages.
- Reorganized the sidebar so main navigation now points to long-term knowledge-direction directories while old track hubs live under the archive lens section.
- Split the blog into `daily`, `weekly`, and `monthly` layers, and rewrote Daily Brief standards and site-admin workflows around draft-first publishing.
- Moved scratch note creation from `docs/notes` to `drafts/notes` so unpublished material no longer mixes with public docs.

### Fixed

- Reworked the scheduled Daily Brief and Weekly Roundup draft workflows to validate a build and commit generated draft files directly to the default branch, avoiding repeated failures when `GITHUB_TOKEN` is not allowed to create pull requests.

### Removed

- Removed the old split portal content sources `src/utils/docsCatalog.js` and `src/data/featuredBriefs.js` in favor of a single validated portal content source.
- Removed unused legacy homepage section components that no longer participate in the tutorial-first portal flow.

## [1.0.0] - 2026-03-06

### Added

- Independent portal homepage at `/` with tool navigation, track map, learning path, featured docs, and Daily Brief sections.
- Knowledge base moved under `/docs` with 30 public docs across overview, tracks, comparisons, playbooks, and insights.
- Daily Brief blog stream under `/blog` and initial AI coding trend articles.
- Local `ai-coding-daily-writer` skill and related drafting workflow files.

### Changed

- Reorganized Docusaurus navigation, sidebar structure, and route layout for portal-first information architecture.
- Added redirects for legacy root-level docs paths to preserve older links.
- Moved internal editorial and site-maintenance docs under `docs/site-admin`.
