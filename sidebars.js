/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '开始这里',
      items: [
        'overview/start-here',
        'overview/taxonomy',
        'overview/learning-paths',
      ]
    },
    {
      type: 'category',
      label: 'AI 开发方式',
      items: [
        'pillars/development-modes',
        'pillars/development-modes-landscape',
        'tracks/models-agents/agent-execution-modes',
      ]
    },
    {
      type: 'category',
      label: 'AI 工作流',
      items: [
        'pillars/workflows',
        'pillars/spec-driven-ai-delivery',
        'tracks/prompting-workflows/prompt-contracts',
        'tracks/prompting-workflows/bugfix-refactor-test-workflows',
        'tracks/prompting-workflows/multi-agent-collaboration',
        'playbooks/index',
        'playbooks/personal-engineer-stack-setup',
        'playbooks/first-7-days-ai-coding',
      ]
    },
    {
      type: 'category',
      label: 'AI 编程工具',
      items: [
        'pillars/tools',
        'overview/tool-selection-map',
        'overview/ai-code-teaching-videos',
        'comparisons/index',
        'comparisons/ai-coding-platform-comparison-framework',
        'comparisons/github-copilot-vs-vscode-agent-vs-openai-codex',
        'comparisons/cursor-vs-windsurf-vs-cline',
        'tracks/models-agents/coding-models-scorecard',
        'tracks/ides-tooling/ai-ide-landscape',
        'tracks/ides-tooling/terminal-agents-and-cli',
        'tools/claude-code-workstyle',
        'tools/gemini-cli-github-workflow',
        'tools/terminal-agent-landscape',
        'tools/mainstream-tool-watchlist',
      ]
    },
    {
      type: 'category',
      label: 'AI 规范',
      items: [
        'pillars/standards',
        'standards/repo-instruction-files',
        'standards/ai-development-standards',
        'standards/freshness-governance',
        'tracks/models-agents/context-memory-and-rules',
        'tracks/team-delivery/quality-gates-and-review',
        'tracks/team-delivery/metrics-and-risk',
        'tracks/team-delivery/solo-to-team-transition',
      ]
    },
    {
      type: 'category',
      label: 'AI 架构',
      items: [
        'pillars/architecture',
        'architecture/ai-native-engineering-architecture',
        'architecture/mcp-tool-topology',
        'tracks/ides-tooling/review-and-pr-tooling',
      ]
    },
    {
      type: 'category',
      label: '趋势与观察',
      items: [
        'insights/index',
        'insights/agentic-coding-patterns',
        'insights/monthly-brief-2026-03',
      ]
    },
    {
      type: 'category',
      label: '旧赛道 / 专题透镜',
      items: [
        'tracks/models-agents/index',
        'tracks/ides-tooling/index',
        'tracks/prompting-workflows/index',
        'tracks/team-delivery/index',
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
