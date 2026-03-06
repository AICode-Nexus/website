## Local Skills

- `ai-coding-daily-writer`: Draft daily AI coding brief articles for this repository, create dated Docusaurus blog files, and enforce source/date rigor for time-sensitive AI coding topics. File: `skills/ai-coding-daily-writer/SKILL.md`

## Project Guardrails

### Frontend Engineering

- Prefer presentational React components with content/config moved into `src/data/` or equivalent config modules. Do not scatter reusable copy, routes, or card metadata across multiple component files.
- Reuse shared section/card components before adding new portal-specific JSX blocks. If a new homepage block cannot reuse existing primitives, document why.
- Keep components single-purpose and low-coupling. Avoid hidden dependencies between sections, implicit shared state, or components that both own layout and business/content decisions.
- Validate structured UI config before export. If homepage content is malformed, fail fast during build instead of rendering partial or broken UI.
- Optimize for maintainability first, then runtime. Do not add hooks such as `useMemo` or `memo` unless profiling or a clear render boundary justifies them.
- Avoid new hardcoded route strings, duplicated labels, ad hoc breakpoints, or color literals when an existing shared constant, config object, or style token can be reused.
- Keep visual language consistent. New portal blocks should inherit the shared spacing, radius, CTA, and card patterns already defined for the portal.

### Robustness And Boundaries

- Every new UI entry added to the portal must have a stable `id`, a real destination, and enough metadata to be rendered without component-level assumptions.
- Keep static site behavior deterministic. Avoid data fetching or runtime branching on the homepage unless it is necessary and failure-tolerant.
- When moving docs or blog routes, update redirects, homepage navigation, and related internal links in the same change.

### Release Discipline

- Update `CHANGELOG.md` for every releasable milestone. Use `Unreleased` during active work and cut a dated version section when publishing.
- Before release or commit, run `npm run build` and confirm there are no broken docs/blog/homepage links.
