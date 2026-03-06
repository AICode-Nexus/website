# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for site releases.

## [Unreleased]

### Added

- Repository-level frontend and release guardrails in `AGENTS.md` for performance, low coupling, reusable components, fail-fast config validation, and release discipline.
- A validated homepage content model in `src/data/portalContent.js` and `src/utils/portalContent.js` to centralize portal copy, links, and section metadata.
- Shared portal primitives for section wrappers and reusable cards in `src/components/portal/SectionBlock.js`, `src/components/portal/ContentCard.js`, and `src/components/portal/LinkTile.js`.
- Phase D content upgrades across taxonomy, playbooks, comparisons, and monthly insights, including a deeper `Cursor vs Windsurf vs Cline` comparison and a March 2026 monthly brief.
- A new AICode-Nexus logo system in `static/img/` with navbar and favicon integration.
- Google Analytics 4 site tracking via Docusaurus `gtag` with measurement ID `G-7XSE8G61G2`.
- A navbar-level global search input that indexes docs and Daily Brief metadata without adding an external search dependency.
- A build-time portal data plugin that auto-aggregates homepage featured docs from docs frontmatter instead of requiring hand-maintained homepage doc entries.
- A new `AI Code 教学视频` homepage section and `/docs/ai-code-teaching-videos` catalog page backed by validated local video metadata, prioritizing Bilibili public videos.

### Changed

- Refactored the portal homepage to consume centralized content config instead of spreading section text and routes across individual components.
- Unified homepage card rendering around shared presentation components to improve style consistency, component boundaries, and future extensibility.
- Restored dark-mode styling across the navbar, docs surface, and portal homepage cards so the theme switch updates the full site instead of leaving light-only hardcoded colors behind.
- Shifted homepage featured content to deterministic build-time grouping by docs `featured` and `kind` metadata, and documented that contract in the taxonomy doc.
- Extended the shared portal card component to support richer metadata and tags so video entries can reuse the existing card pattern instead of introducing a separate homepage card system.

### Removed

- Removed the old split portal content sources `src/utils/docsCatalog.js` and `src/data/featuredBriefs.js` in favor of a single validated portal content source.

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
