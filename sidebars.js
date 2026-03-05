/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    'ai-writing-workflow',
    'publish-github',
    {
      type: 'category',
      label: '知识条目',
      items: ['notes/example-first-note']
    }
  ]
};

module.exports = sidebars;
