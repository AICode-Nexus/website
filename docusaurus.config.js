// @ts-check

const {ECOSYSTEM_INTEGRATIONS} = require('./src/data/ecosystemIntegrations');

const repo = process.env.GITHUB_REPOSITORY || 'AICode-Nexus/website';
const [organizationName, projectName] = repo.split('/');
const isUserSite = projectName === `${organizationName}.github.io`;
const footerContactRows = [
  {
    label: '微信号',
    value: 'trsoliu',
  },
  {
    label: '添加备注',
    value: 'AICode-Nexus / AI coding',
  },
  {
    label: '交流方向',
    value: '工具选型、工作流、内容合作',
  },
];
const footerContactCardHtml = `
  <div class="footer-contact-card">
    ${footerContactRows
      .map(
        ({label, value}) => `
          <div class="footer-contact-line">
            <span class="footer-contact-label">${label}</span>
            <span class="footer-contact-value">${value}</span>
          </div>`,
      )
      .join('')}
  </div>
`;
const footerTopics = ['AI 开发方式与工具栈设计', '规则文件、工作流与评估治理', 'MCP 架构与案例交流'];
const footerTopicsHtml = `
  <ul class="footer-topic-list">
    ${footerTopics.map((topic) => `<li>${topic}</li>`).join('')}
  </ul>
`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AICode-Nexus',
  tagline: 'AI coding 教程、工作流与实战案例',
  favicon: 'img/favicon.svg',
  url: `https://${organizationName}.github.io`,
  baseUrl: process.env.NODE_ENV === 'production' ? (isUserSite ? '/' : `/${projectName}/`) : '/',
  organizationName,
  projectName,
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },
  plugins: [
    require.resolve('./plugins/portal-data-plugin'),
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/start/taxonomy',
            from: ['/knowledge-taxonomy'],
          },
          {
            to: '/docs/start/start-here',
            from: ['/docs/start-here'],
          },
          {
            to: '/docs/start/taxonomy',
            from: ['/docs/taxonomy'],
          },
          {
            to: '/docs/start/learning-paths',
            from: ['/docs/learning-paths'],
          },
          {
            to: '/docs/tools/map',
            from: ['/docs/tool-selection'],
          },
          {
            to: '/docs/models-agents',
            from: ['/tracks/models-and-agents'],
          },
          {
            to: '/docs/ides-tooling',
            from: ['/tracks/ides-and-tooling'],
          },
          {
            to: '/docs/prompting-workflows',
            from: ['/tracks/prompting-and-workflows'],
          },
          {
            to: '/docs/team-delivery',
            from: ['/tracks/team-and-delivery'],
          },
          {
            to: '/docs/tools/insights/agentic-coding-patterns',
            from: ['/insights/agentic-coding-patterns'],
          },
          {
            to: '/docs/tools/compare/ai-coding-platform-comparison-framework',
            from: ['/insights/ai-coding-platform-comparison-framework'],
          },
          {
            to: '/docs/tools/compare/github-copilot-vs-vscode-agent-vs-openai-codex',
            from: ['/insights/github-copilot-vs-vscode-agent-vs-openai-codex'],
          },
          {
            to: '/docs/tools/compare/ai-coding-platform-comparison-framework',
            from: ['/docs/comparisons/ai-coding-platform-comparison-framework'],
          },
          {
            to: '/docs/tools/compare/github-copilot-vs-vscode-agent-vs-openai-codex',
            from: ['/docs/comparisons/github-copilot-vs-vscode-agent-vs-openai-codex'],
          },
          {
            to: '/docs/tools/compare/cursor-vs-windsurf-vs-cline',
            from: ['/docs/comparisons/cursor-vs-windsurf-vs-cline'],
          },
          {
            to: '/docs/workflows/playbooks/workflow-playbook',
            from: ['/docs/playbooks/workflow-playbook'],
          },
          {
            to: '/docs/workflows/playbooks/personal-engineer-stack-setup',
            from: ['/docs/playbooks/personal-engineer-stack-setup'],
          },
          {
            to: '/docs/workflows/playbooks/first-7-days-ai-coding',
            from: ['/docs/playbooks/first-7-days-ai-coding'],
          },
          {
            to: '/docs/tools/insights/agentic-coding-patterns',
            from: ['/docs/insights/agentic-coding-patterns'],
          },
          {
            to: '/docs/tools/insights/monthly-brief-2026-03',
            from: ['/docs/insights/monthly-brief-2026-03'],
          },
          {
            to: '/docs/workflows/prompt-contracts',
            from: ['/docs/prompting-workflows/prompt-contracts'],
          },
          {
            to: '/docs/workflows/bugfix-refactor-test-workflows',
            from: ['/docs/prompting-workflows/bugfix-refactor-test-workflows'],
          },
          {
            to: '/docs/workflows/multi-agent-collaboration',
            from: ['/docs/prompting-workflows/multi-agent-collaboration'],
          },
          {
            to: '/docs/development-modes/agent-execution-modes',
            from: ['/docs/models-agents/agent-execution-modes'],
          },
          {
            to: '/docs/standards/context-memory-and-rules',
            from: ['/docs/models-agents/context-memory-and-rules'],
          },
          {
            to: '/docs/standards/review-quality-gates',
            from: ['/docs/team-delivery/quality-gates-and-review'],
          },
          {
            to: '/docs/standards/evaluation-risk-metrics',
            from: ['/docs/team-delivery/metrics-and-risk'],
          },
          {
            to: '/docs/resources/videos',
            from: ['/docs/resources', '/docs/tools/resources'],
          },
          {
            to: '/docs/resources/videos',
            from: ['/docs/tools/resources/videos'],
          },
          {
            to: '/docs/resources/courses',
            from: ['/docs/tools/resources/courses'],
          },
          {
            to: '/docs/tools/terminal-agents-and-cli',
            from: ['/docs/ides-tooling/terminal-agents-and-cli'],
          },
          {
            to: '/docs/tools/ai-ide-landscape',
            from: ['/docs/ides-tooling/ai-ide-landscape'],
          },
          ...ECOSYSTEM_INTEGRATIONS.map(({href, legacyHref}) => ({
            to: href,
            from: [legacyHref],
          })),
        ],
      },
    ],
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'AI Coding Daily Brief',
          blogDescription: '每天跟踪最值得关注的 AI coding 变化',
          routeBasePath: 'blog',
        },
        gtag: {
          trackingID: 'G-7XSE8G61G2',
        },
        pages: {},
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'AICode-Nexus',
      logo: {
        alt: 'AICode-Nexus logo',
        src: 'img/logo-mark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'gettingStartedSidebar',
          label: '开始上手',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'toolTutorialsSidebar',
          label: '工具教程',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'workflowTutorialsSidebar',
          label: '工作流教程',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'caseStudiesSidebar',
          label: '实战案例',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'advancedTopicsSidebar',
          label: '进阶专题',
          position: 'left',
        },
        {
          to: '/blog',
          label: '动态',
          position: 'left',
        },
        {
          to: '/docs/resources/videos',
          label: '视频资源',
          activeBaseRegex: '^/docs/resources(?:/|$)',
          position: 'right',
        },
        {
          href: `https://github.com/${organizationName}/${projectName}`,
          className: 'navbar-github-link',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '教程入口',
          items: [
            {
              label: '30 分钟上手',
              to: '/docs/start/30-minute-quick-start',
            },
            {
              label: '工具教程',
              to: '/docs/tools',
            },
            {
              label: '工作流教程',
              to: '/docs/workflows',
            },
            {
              label: '实战案例',
              to: '/docs/case-studies',
            },
            {
              label: '进阶专题',
              to: '/docs/standards',
            },
            {
              label: '动态',
              to: '/blog',
            },
          ],
        },
        {
          title: '辅助导航',
          items: [
            {
              label: 'AI Code 地图',
              to: '/docs/start/journey-map',
            },
            {
              label: '内容索引',
              to: '/docs/content-index',
            },
            {
              label: '旧赛道归档',
              to: '/docs/archive',
            },
            {
              label: '站点维护',
              to: '/docs/site-admin/site-roadmap',
            },
          ],
        },
        {
          title: '联系我',
          items: [
            {
              html: footerContactCardHtml,
            },
            {
              label: 'GitHub 仓库',
              href: `https://github.com/${organizationName}/${projectName}`,
            },
          ],
        },
        {
          title: '适合交流',
          items: [
            {
              html: footerTopicsHtml,
            },
            {
              label: '最近动态',
              to: '/blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AICode-Nexus`,
    },
  },
};

module.exports = config;
