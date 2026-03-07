// @ts-check

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
  tagline: 'AI 开发方式、工作流、规范与架构知识库',
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
            to: '/docs/taxonomy',
            from: ['/knowledge-taxonomy'],
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
            to: '/docs/insights/agentic-coding-patterns',
            from: ['/insights/agentic-coding-patterns'],
          },
          {
            to: '/docs/comparisons/ai-coding-platform-comparison-framework',
            from: ['/insights/ai-coding-platform-comparison-framework'],
          },
          {
            to: '/docs/comparisons/github-copilot-vs-vscode-agent-vs-openai-codex',
            from: ['/insights/github-copilot-vs-vscode-agent-vs-openai-codex'],
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
            to: '/docs/tools/terminal-agents-and-cli',
            from: ['/docs/ides-tooling/terminal-agents-and-cli'],
          },
          {
            to: '/docs/tools/ai-ide-landscape',
            from: ['/docs/ides-tooling/ai-ide-landscape'],
          },
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
          to: '/',
          position: 'left',
          label: '首页',
        },
        {
          to: '/docs/development-modes',
          label: '开发方式',
          position: 'left',
        },
        {
          to: '/docs/workflows',
          label: '工作流',
          position: 'left',
        },
        {
          to: '/docs/tools',
          label: '编程工具',
          position: 'left',
        },
        {
          to: '/docs/standards',
          label: '规范',
          position: 'left',
        },
        {
          to: '/docs/architecture',
          label: '架构',
          position: 'left',
        },
        {
          to: '/blog',
          label: 'Daily Brief',
          position: 'left',
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
          title: '知识入口',
          items: [
            {
              label: '首页',
              to: '/',
            },
            {
              label: '知识体系总表',
              to: '/docs/taxonomy',
            },
            {
              label: 'AI 编程工具',
              to: '/docs/tools',
            },
            {
              label: 'AI 规范',
              to: '/docs/standards',
            },
            {
              label: 'AI 架构',
              to: '/docs/architecture',
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
              label: '最近 Daily Brief',
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
