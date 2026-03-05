// @ts-check

const repo = process.env.GITHUB_REPOSITORY || 'your-github-username/website';
const [organizationName, projectName] = repo.split('/');
const isUserSite = projectName === `${organizationName}.github.io`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AICode-Nexus 知识库',
  tagline: 'AI + Markdown + GitHub Pages',
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
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js')
        },
        blog: false,
        pages: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ],
  themeConfig: {
    navbar: {
      title: 'AICode-Nexus 知识库',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档'
        },
        {
          href: `https://github.com/${organizationName}/${projectName}`,
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '开始阅读',
              to: '/'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AICode-Nexus`
    }
  }
};

module.exports = config;
