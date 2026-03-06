// @ts-check

const repo = process.env.GITHUB_REPOSITORY || 'your-github-username/website';
const [organizationName, projectName] = repo.split('/');
const isUserSite = projectName === `${organizationName}.github.io`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AICode-Nexus',
  tagline: 'AI coding 知识地图、每日观察与团队落地手册',
  favicon: 'img/favicon.svg',
  url: `https://${organizationName}.github.io`,
  baseUrl: process.env.NODE_ENV === 'production'
    ? (isUserSite ? '/' : `/${projectName}/`)
    : '/',
  organizationName,
  projectName,
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn'
    }
  },
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN']
  },
  plugins: [
    require.resolve('./plugins/portal-data-plugin'),
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/taxonomy',
            from: ['/knowledge-taxonomy']
          },
          {
            to: '/docs/models-agents',
            from: ['/tracks/models-and-agents']
          },
          {
            to: '/docs/ides-tooling',
            from: ['/tracks/ides-and-tooling']
          },
          {
            to: '/docs/prompting-workflows',
            from: ['/tracks/prompting-and-workflows']
          },
          {
            to: '/docs/team-delivery',
            from: ['/tracks/team-and-delivery']
          },
          {
            to: '/docs/insights/agentic-coding-patterns',
            from: ['/insights/agentic-coding-patterns']
          },
          {
            to: '/docs/comparisons/ai-coding-platform-comparison-framework',
            from: ['/insights/ai-coding-platform-comparison-framework']
          },
          {
            to: '/docs/comparisons/github-copilot-vs-vscode-agent-vs-openai-codex',
            from: ['/insights/github-copilot-vs-vscode-agent-vs-openai-codex']
          }
        ]
      }
    ]
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js')
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'AI Coding Daily Brief',
          blogDescription: '每天跟踪最值得关注的 AI coding 变化',
          routeBasePath: 'blog'
        },
        gtag: {
          trackingID: 'G-7XSE8G61G2'
        },
        pages: {},
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ],
  themeConfig: {
    navbar: {
      title: 'AICode-Nexus',
      logo: {
        alt: 'AICode-Nexus logo',
        src: 'img/logo-mark.svg'
      },
      items: [
        {
          to: '/',
          position: 'left',
          label: '首页'
        },
        {
          to: '/docs/',
          label: '知识库',
          position: 'left'
        },
        {
          to: '/docs/comparisons',
          label: '工具对比',
          position: 'left'
        },
        {
          to: '/docs/playbooks',
          label: 'Playbooks',
          position: 'left'
        },
        {
          to: '/blog',
          label: 'Daily Brief',
          position: 'left'
        },
        {
          href: `https://github.com/${organizationName}/${projectName}`,
          label: 'GitHub',
          position: 'right'
        },
        {
          type: 'search',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '门户',
          items: [
            {
              label: '首页',
              to: '/'
            },
            {
              label: '开始这里',
              to: '/docs/'
            },
            {
              label: '工具对比',
              to: '/docs/comparisons'
            },
            {
              label: 'Daily Brief',
              to: '/blog'
            },
            {
              label: '关于本站',
              to: '/docs/site-admin/site-roadmap'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AICode-Nexus`
    }
  }
};

module.exports = config;
