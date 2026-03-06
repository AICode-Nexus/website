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

### Changed

- Refactored the portal homepage to consume centralized content config instead of spreading section text and routes across individual components.
- Unified homepage card rendering around shared presentation components to improve style consistency, component boundaries, and future extensibility.

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
