import {definePortalContent} from '@site/src/utils/portalContent';

export const portalContent = definePortalContent({
  meta: {
    title: 'AICode-Nexus 教程站',
    description: '从 30 分钟上手、工具教程、工作流教程到实战案例，帮助开发者真正学会 AI coding。',
  },
  hero: {
    brand: {
      name: 'AICode-Nexus',
      label: 'AI coding tutorials',
      markSrc: 'img/logo-mark.svg',
      markAlt: 'AICode-Nexus logo',
    },
    kicker: 'AICODE-NEXUS TUTORIALS',
    title: '先跑通一条 AI coding 教程，再扩展成长期工作流。',
    description:
      '首页先把你送进可执行的教程主线，再按工具、工作流、案例和进阶专题组织长期知识。先做出来，再补地图、治理和架构。',
    panelTitle: '先跑主线，再补进阶',
    signals: [
      '30 分钟内完成一次真实的 AI coding 上手',
      '先固定一个主工具，再跑一条可验证的工作流',
      '把治理、架构和生态放到主线跑通之后再补',
    ],
    primaryAction: {
      label: '30 分钟上手',
      href: '/docs/start/30-minute-quick-start',
    },
    secondaryAction: {
      label: '按任务找教程',
      href: '/docs/workflows/playbooks/workflow-playbook',
    },
  },
  advancedTopics: {
    kicker: 'Advanced Topics',
    title: '主线跑通后再补这些专题',
    items: [
      {
        id: 'development-modes',
        title: '开发方式',
        description: '补默认入口、人机协作方式和开发范式。',
        href: '/docs/development-modes',
      },
      {
        id: 'standards',
        title: '规范治理',
        description: '补规则文件、验证门禁、评估和 review。',
        href: '/docs/standards',
      },
      {
        id: 'architecture',
        title: '架构系统',
        description: '补上下文切片、MCP、worktree 和系统边界。',
        href: '/docs/architecture',
      },
      {
        id: 'ecosystem',
        title: '生态集成',
        description: '补 GitHub、Jira、CI、PR 和组织接入闭环。',
        href: '/docs/ecosystem',
      },
    ],
  },
  starterTracks: {
    kicker: 'Starter Tracks',
    title: '开始上手',
    description: '先走能落地的主线，不要先被地图、分类和工具名淹没。这里给你 4 条最短的教程入口。',
    items: [
      {
        id: 'thirty-minute-start',
        badge: 'Track 01',
        title: '30 分钟上手',
        description: '用一个真实仓库跑通第一次 AI coding 协作，留下最小可复用记录。',
        bullets: ['先定主工具', '先写边界', '先交付一次最小可验证任务'],
        href: '/docs/start/30-minute-quick-start',
        linkLabel: '开始教程',
      },
      {
        id: 'first-week',
        badge: 'Track 02',
        title: '7 天跑通第一套工作流',
        description: '按天拆分第一周动作，把主工具、规则、合同和验证回路固定下来。',
        bullets: ['先跑一类任务', '记录返工', '保留复盘'],
        href: '/docs/workflows/playbooks/first-7-days-ai-coding',
        linkLabel: '进入路线',
      },
      {
        id: 'personal-stack',
        badge: 'Track 03',
        title: '搭个人默认栈',
        description: '把主入口、备用入口、验证命令和复盘节奏固定成个人默认配置。',
        bullets: ['固定主入口', '保留备用入口', '写下验证命令'],
        href: '/docs/workflows/playbooks/personal-engineer-stack-setup',
        linkLabel: '配置默认栈',
      },
      {
        id: 'task-based-read',
        badge: 'Track 04',
        title: '按任务找教程',
        description: '如果你已经知道自己在做 bugfix、refactor、issue 到 PR 或 spec-first，就直接按任务找 runbook。',
        bullets: ['按任务形状选流程', '先读 runbook', '再补工具组合'],
        href: '/docs/workflows/playbooks/workflow-playbook',
        linkLabel: '查看任务手册',
      },
    ],
  },
  featuredToolTutorials: {
    kicker: 'Tool Tutorials',
    title: '工具教程精选',
    description: '每个工具先给你一条真正能落地的起步教程，再补常见任务、排错和长期实践。',
    primaryAction: {
      label: '查看全部工具教程',
      href: '/docs/tools',
    },
  },
  featuredWorkflowTutorials: {
    kicker: 'Workflow Tutorials',
    title: '工作流教程精选',
    description: '优先进入 runbook，而不是先背框架名。每条工作流都直接写输入条件、步骤、验证和结束条件。',
    primaryAction: {
      label: '查看全部工作流教程',
      href: '/docs/workflows',
    },
  },
  featuredCaseStudies: {
    kicker: 'Case Studies',
    title: '实战案例与近期更新',
    description: '把工具教程、工作流和验证方式串成完整案例，同时保留近期值得跟踪的动态。',
    primaryAction: {
      label: '查看全部实战案例',
      href: '/docs/case-studies',
    },
  },
  latestUpdates: {
    kicker: 'Latest Updates',
    title: '近期更新',
    items: [
      {
        id: 'agentic-coding-shifts',
        badge: '2026-03-06',
        title: 'Agentic Coding 开始进入持久记忆与任务委派阶段',
        description: '从 GitHub、VS Code 和 OpenAI 的官方动作里，看清更强模型、持久记忆、异步委派和可控执行正在一起成形。',
        href: '/blog/agentic-coding-shifts',
        linkLabel: '阅读日报',
      },
      {
        id: 'personal-stack-signals',
        badge: '2026-03-06',
        title: '个人工程师现在最该先补的三层 AI coding 能力',
        description: '先选主平台，再补规则系统，最后把 bugfix、refactor、test 变成固定工作流。',
        href: '/blog/personal-ai-coding-stack-signals',
        linkLabel: '阅读日报',
      },
      {
        id: 'launch-daily-brief',
        badge: '2026-03-06',
        title: '启动 AI Coding Daily Brief',
        description: '解释这个站点为什么要引入 Daily Brief，以及它如何和长期知识文档形成协同。',
        href: '/blog/launching-ai-coding-daily-brief',
        linkLabel: '阅读日报',
      },
    ],
  },
});
