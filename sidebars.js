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
      ],
    },
    {
      type: 'category',
      label: 'AI 开发方式',
      items: [
        'development-modes/index',
        'development-modes/landscape',
        'development-modes/agent-execution-modes',
      ],
    },
    {
      type: 'category',
      label: 'AI 工作流',
      items: [
        'workflows/index',
        'workflows/mainstream-ai-coding-workflows',
        'workflows/frameworks-overview',
        'workflows/spec-driven-ai-delivery',
        'workflows/prompt-contracts',
        'workflows/bugfix-refactor-test-workflows',
        'workflows/multi-agent-collaboration',
        'workflows/workflow-catalog',
        'workflows/async-agent-delivery',
        'playbooks/index',
        'playbooks/workflow-playbook',
        'playbooks/personal-engineer-stack-setup',
        'playbooks/first-7-days-ai-coding',
      ],
    },
    {
      type: 'category',
      label: 'AI 编程工具',
      items: [
        'tools/index',
        'overview/tool-selection-map',
        'overview/ai-code-teaching-videos',
        'comparisons/index',
        'comparisons/ai-coding-platform-comparison-framework',
        'comparisons/github-copilot-vs-vscode-agent-vs-openai-codex',
        'comparisons/cursor-vs-windsurf-vs-cline',
        'tools/ai-ide-landscape',
        'tools/terminal-agents-and-cli',
        'tools/claude-code-workstyle',
        'tools/gemini-cli-github-workflow',
        'tools/terminal-agent-landscape',
        'tools/mainstream-tool-watchlist',
      ],
    },
    {
      type: 'category',
      label: 'AI 规范',
      items: [
        'standards/index',
        'standards/repo-instruction-files',
        'standards/skills-commands-hooks',
        'standards/context-memory-and-rules',
        'standards/review-quality-gates',
        'standards/evaluation-risk-metrics',
        'standards/ai-development-standards',
        'standards/freshness-governance',
      ],
    },
    {
      type: 'category',
      label: 'AI 架构',
      items: [
        'architecture/index',
        'architecture/ai-native-engineering-architecture',
        'architecture/mcp-tool-topology',
      ],
    },
    {
      type: 'category',
      label: '趋势与观察',
      items: [
        'insights/index',
        'insights/agentic-coding-patterns',
        'insights/monthly-brief-2026-03',
      ],
    },
    {
      type: 'category',
      label: '旧赛道 / 专题透镜',
      items: [
        'archive/tracks/models-agents/index',
        'archive/tracks/ides-tooling/index',
        'archive/tracks/prompting-workflows/index',
        'archive/tracks/team-delivery/index',
      ],
    },
    {
      type: 'category',
      label: '站点维护',
      items: [
        'site-admin/editorial-workflow',
        'site-admin/ai-writing-workflow',
        'site-admin/publish-github',
        'site-admin/site-roadmap',
        'site-admin/example-first-note',
      ],
    },
  ],
};

module.exports = sidebars;
