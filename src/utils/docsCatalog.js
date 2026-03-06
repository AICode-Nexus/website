export const portalSignals = [
  '先选主平台，再搭个人工作流',
  '把 bugfix、refactor、test 做成标准动作',
  '用对比文和 Daily Brief 区分主线与噪音',
];

export const quickActions = [
  {
    title: '选主平台',
    description: '先比较 GitHub Copilot、VS Code Agent、OpenAI Codex。',
    href: '/docs/comparisons/github-copilot-vs-vscode-agent-vs-openai-codex',
  },
  {
    title: '搭个人工作流',
    description: '从 7 天路线开始，建立第一套可复用的 AI coding 栈。',
    href: '/docs/playbooks/first-7-days-ai-coding',
  },
  {
    title: '学任务流程',
    description: '先掌握 bugfix、refactor、test 三条最高价值工作流。',
    href: '/docs/prompting-workflows/bugfix-refactor-test-workflows',
  },
  {
    title: '看对比文',
    description: '用同一套框架看平台、IDE 和开放式工具入口。',
    href: '/docs/comparisons',
  },
  {
    title: '看本月主线',
    description: '先理解这个阶段 AI coding 真正的四个主线变化。',
    href: '/docs/insights/agentic-coding-patterns',
  },
  {
    title: '跟 Daily Brief',
    description: '用每日观察流持续追踪最值得测试的新变化。',
    href: '/blog',
  },
];

export const toolMatrix = [
  {
    name: 'GitHub Copilot',
    tone: 'Platform',
    description: '最适合 GitHub-first 的个人工程师和 PR / issue 工作流。',
    href: '/docs/comparisons/github-copilot-vs-vscode-agent-vs-openai-codex',
  },
  {
    name: 'OpenAI Codex',
    tone: 'Execution Stack',
    description: '更适合长任务、后台执行和多 Agent 并行尝试。',
    href: '/docs/comparisons/github-copilot-vs-vscode-agent-vs-openai-codex',
  },
  {
    name: 'VS Code Agent',
    tone: 'Control Console',
    description: '更适合把本地、后台、云端和第三方 agent 统一调度。',
    href: '/docs/comparisons/github-copilot-vs-vscode-agent-vs-openai-codex',
  },
  {
    name: 'Cursor',
    tone: 'AI IDE',
    description: '更适合重视编辑体验和高频 IDE 内协作的人。',
    href: '/docs/comparisons/cursor-vs-windsurf-vs-cline',
  },
  {
    name: 'Windsurf',
    tone: 'AI Workspace',
    description: '更适合关注整合式协作体验和工作流包装的人。',
    href: '/docs/comparisons/cursor-vs-windsurf-vs-cline',
  },
  {
    name: 'Cline / Continue',
    tone: 'Open Agent Entry',
    description: '更适合想深度控制模型、规则和 Agent 行为的人。',
    href: '/docs/comparisons/cursor-vs-windsurf-vs-cline',
  },
];

export const trackCards = [
  {
    title: '模型与 Agent',
    description: '理解模型上限、Agent 执行模式、memory 和 rules 如何影响真实工程质量。',
    bullets: ['模型评分卡', 'Agent 执行模式', '上下文、记忆与规则'],
    href: '/docs/models-agents',
  },
  {
    title: 'IDE 与工具链',
    description: '从 IDE、CLI、PR review 到 issue 流程，建立你的 AI coding 工具链地图。',
    bullets: ['AI IDE 全景', '终端 Agent 与 CLI', 'Review 与 PR 工具链'],
    href: '/docs/ides-tooling',
  },
  {
    title: '提示词与工作流',
    description: '把 prompt、rules 和任务拆解方法变成可复用的个人工作流资产。',
    bullets: ['Prompt Contracts', 'Bugfix / Refactor / Test', '多 Agent 协作'],
    href: '/docs/prompting-workflows',
  },
  {
    title: '团队与交付',
    description: '从个人实践出发，理解 AI coding 如何进入 review、质量和小团队协作。',
    bullets: ['从个人到团队', '质量门禁与 Review', '指标与风险'],
    href: '/docs/team-delivery',
  },
];

export const learningPath = [
  {
    day: 'Day 1',
    title: '选平台',
    summary: '先确认主平台和备用入口，避免同时长期试太多工具。',
    href: '/docs/tool-selection',
  },
  {
    day: 'Day 2',
    title: '搭环境',
    summary: '配置 repo rules、目录边界和最小校验回路。',
    href: '/docs/playbooks/personal-engineer-stack-setup',
  },
  {
    day: 'Day 3',
    title: '写 Contract',
    summary: '为常见任务写第一版 prompt contract。',
    href: '/docs/prompting-workflows/prompt-contracts',
  },
  {
    day: 'Day 4',
    title: '练 Bugfix',
    summary: '把定位、最小修复和验证拆成稳定步骤。',
    href: '/docs/prompting-workflows/bugfix-refactor-test-workflows',
  },
  {
    day: 'Day 5',
    title: '练 Refactor',
    summary: '先保行为不变，再清理结构。',
    href: '/docs/prompting-workflows/bugfix-refactor-test-workflows',
  },
  {
    day: 'Day 6',
    title: '练 Test',
    summary: '建立补测试和边界验证的基本手感。',
    href: '/docs/prompting-workflows/bugfix-refactor-test-workflows',
  },
  {
    day: 'Day 7',
    title: '做实战',
    summary: '跑通一次完整任务并记录返工和 review 成本。',
    href: '/docs/playbooks/first-7-days-ai-coding',
  },
];

export const featuredDocs = {
  comparisons: [
    {
      title: '平台比较框架',
      description: '先定义维度，再比较产品，避免把不同层的工具放在一起硬排位。',
      href: '/docs/comparisons/ai-coding-platform-comparison-framework',
    },
    {
      title: 'Copilot vs VS Code Agent vs Codex',
      description: '用平台、控制台和执行栈三层视角做主平台选型。',
      href: '/docs/comparisons/github-copilot-vs-vscode-agent-vs-openai-codex',
    },
    {
      title: 'Cursor vs Windsurf vs Cline',
      description: '把开放式 AI coding 入口放回正确维度里比较。',
      href: '/docs/comparisons/cursor-vs-windsurf-vs-cline',
    },
  ],
  playbooks: [
    {
      title: '7 天上手路线',
      description: '从选平台到第一次完整实战，给个人工程师一个最短起步路径。',
      href: '/docs/playbooks/first-7-days-ai-coding',
    },
    {
      title: '个人工程师栈搭建',
      description: '把 IDE、CLI、rules、hook 和复盘方法固定成长期栈。',
      href: '/docs/playbooks/personal-engineer-stack-setup',
    },
    {
      title: '学习路径',
      description: '按 7 天、30 天和进阶路线安排你的学习顺序。',
      href: '/docs/learning-paths',
    },
  ],
};
