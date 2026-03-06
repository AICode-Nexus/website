/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '开始这里',
      items: [
        'overview/start-here',
        'overview/learning-paths',
        'overview/tool-selection-map',
        'overview/taxonomy'
      ]
    },
    {
      type: 'category',
      label: '主赛道',
      items: [
        'tracks/models-agents/index',
        'tracks/models-agents/coding-models-scorecard',
        'tracks/models-agents/agent-execution-modes',
        'tracks/models-agents/context-memory-and-rules',
        'tracks/ides-tooling/index',
        'tracks/ides-tooling/ai-ide-landscape',
        'tracks/ides-tooling/terminal-agents-and-cli',
        'tracks/ides-tooling/review-and-pr-tooling',
        'tracks/prompting-workflows/index',
        'tracks/prompting-workflows/prompt-contracts',
        'tracks/prompting-workflows/bugfix-refactor-test-workflows',
        'tracks/prompting-workflows/multi-agent-collaboration',
        'tracks/team-delivery/index',
        'tracks/team-delivery/solo-to-team-transition',
        'tracks/team-delivery/quality-gates-and-review',
        'tracks/team-delivery/metrics-and-risk'
      ]
    },
    {
      type: 'category',
      label: '对比与选型',
      items: [
        'comparisons/index',
        'comparisons/ai-coding-platform-comparison-framework',
        'comparisons/github-copilot-vs-vscode-agent-vs-openai-codex',
        'comparisons/cursor-vs-windsurf-vs-cline'
      ]
    },
    {
      type: 'category',
      label: 'Playbooks',
      items: [
        'playbooks/index',
        'playbooks/first-7-days-ai-coding',
        'playbooks/personal-engineer-stack-setup'
      ]
    },
    {
      type: 'category',
      label: '趋势观察',
      items: [
        'insights/index',
        'insights/agentic-coding-patterns',
        'insights/monthly-brief-2026-03'
      ]
    },
    {
      type: 'category',
      label: '站点维护',
      items: [
        'site-admin/editorial-workflow',
        'site-admin/ai-writing-workflow',
        'site-admin/publish-github',
        'site-admin/site-roadmap',
        'site-admin/example-first-note'
      ]
    }
  ]
};

module.exports = sidebars;
