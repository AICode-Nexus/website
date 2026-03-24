# Issue source snapshots

This directory stores dated source snapshots for repo issue monitoring runs.

Recommended file name:

- `YYYY-MM-DD-repo-issue-monitor.json`

Recommended fields:

- `date`: run date in `YYYY-MM-DD`
- `repository`: GitHub repository slug such as `AICode-Nexus/website`
- `windowStart`: ISO timestamp for the start of the observation window
- `windowEnd`: ISO timestamp for the end of the observation window
- `issues`: raw issue records used as factual input
- `materialChanges`: the subset judged worth turning into site content
- `sourceUrls`: canonical GitHub issue or search URLs used for verification

Keep this file factual. Interpretations belong in the blog post or docs page, not in the source snapshot.
