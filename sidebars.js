const {DOMAIN_DEFINITIONS} = require('./src/data/knowledgeModel');
const toolDocNavigation = require('./src/data/toolDocNavigation.json');

function ensureString(value, fieldName) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Sidebar config field "${fieldName}" must be a non-empty string.`);
  }

  return value;
}

function ensureArray(value, fieldName) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`Sidebar config field "${fieldName}" must be a non-empty array.`);
  }

  return value;
}

function validateToolDocNavigation(config) {
  const navigation = config && typeof config === 'object' ? config : null;

  if (!navigation) {
    throw new Error('Sidebar config "toolDocNavigation" must be an object.');
  }

  ensureArray(navigation.pageOrder, 'toolDocNavigation.pageOrder').forEach((page, index) => {
    ensureString(page.id, `toolDocNavigation.pageOrder[${index}].id`);
    ensureString(page.label, `toolDocNavigation.pageOrder[${index}].label`);
  });

  ['quickStartGroups', 'coreTools', 'extendedTools'].forEach((fieldName) => {
    ensureArray(navigation[fieldName], `toolDocNavigation.${fieldName}`).forEach((entry, index) => {
      ensureString(entry.id, `toolDocNavigation.${fieldName}[${index}].id`);
      ensureString(entry.label, `toolDocNavigation.${fieldName}[${index}].label`);

      if (fieldName === 'quickStartGroups') {
        ensureArray(entry.items, `toolDocNavigation.quickStartGroups[${index}].items`).forEach((item, itemIndex) => {
          ensureString(item.id, `toolDocNavigation.quickStartGroups[${index}].items[${itemIndex}].id`);
          ensureString(item.label, `toolDocNavigation.quickStartGroups[${index}].items[${itemIndex}].label`);
        });
      }
    });
  });

  return navigation;
}

const validatedToolDocNavigation = validateToolDocNavigation(toolDocNavigation);

function createToolGuideCategory(tool) {
  return {
    type: 'category',
    label: tool.label,
    link: {
      type: 'doc',
      id: `${tool.id}/index`,
    },
    items: validatedToolDocNavigation.pageOrder.map((page) => ({
      type: 'doc',
      id: `${tool.id}/${page.id}`,
      label: page.label,
    })),
  };
}

function createQuickStartEntry(group) {
  if (group.items.length === 1) {
    const [item] = group.items;

    return {
      type: 'doc',
      id: `${item.id}/quick-start`,
      label: item.label,
    };
  }

  return {
    type: 'category',
    label: group.label,
    items: group.items.map((item) => ({
      type: 'doc',
      id: `${item.id}/quick-start`,
      label: item.label,
    })),
  };
}

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  gettingStartedSidebar: [
    'overview/minute-quick-start',
    'playbooks/first-7-days-ai-coding',
    'playbooks/personal-engineer-stack-setup',
    'playbooks/workflow-playbook',
    {
      type: 'category',
      label: '辅助判断',
      items: [
        'overview/start-here',
        'overview/learning-paths',
        'overview/journey-map',
        'overview/tool-selection-map',
        'overview/content-index',
      ],
    },
  ],

  rolesSidebar: [
    'roles/index',
    {
      type: 'category',
      label: '产品经理',
      items: [
        'roles/product',
        'roles/product/rules-and-instruction-files',
        'roles/product/skills-and-mcp',
        'roles/product/tool-fit-and-selection',
        {
          type: 'category',
          label: '训练包模板',
          link: {
            type: 'doc',
            id: 'roles/product/templates/index',
          },
          items: [
            'roles/product/templates/prd-outline',
            'roles/product/templates/discovery-brief',
            'roles/product/templates/prototype-validation',
            'roles/product/templates/handoff-and-acceptance',
            'roles/product/templates/example-referral-launch-pack',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '设计师',
      items: [
        'roles/design',
        'roles/design/rules-and-instruction-files',
        'roles/design/skills-and-mcp',
        'roles/design/tool-fit-and-selection',
        {
          type: 'category',
          label: '训练包模板',
          link: {
            type: 'doc',
            id: 'roles/design/templates/index',
          },
          items: [
            'roles/design/templates/figma-handoff-pack',
            'roles/design/templates/component-state-contract',
            'roles/design/templates/tokens-and-constraints',
            'roles/design/templates/prototype-proof-sheet',
            'roles/design/templates/example-dashboard-card-pack',
          ],
        },
        {
          type: 'category',
          label: '工具专题',
          link: {
            type: 'doc',
            id: 'roles/design/tools/index',
          },
          items: [
            'roles/design/tools/figma',
            'roles/design/tools/mastergo',
            'roles/design/tools/framer',
            'roles/design/tools/relume',
            'roles/design/tools/uizard',
            'roles/design/tools/visily',
            'roles/design/tools/webflow-ai',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '前端工程师',
      items: [
        'roles/frontend/index',
        'roles/frontend/design-to-code',
        'roles/frontend/frameworks-and-components',
        'roles/frontend/styling-and-design-systems',
        'roles/frontend/quality-gates',
        'roles/frontend/repo-architecture',
        'roles/frontend/playwright-automation-plan',
        'roles/frontend/testing-and-delivery',
        'roles/frontend/context-and-rules',
        'roles/frontend/rules-and-instruction-files',
        'roles/frontend/skills-and-mcp',
        'roles/frontend/tool-fit-and-selection',
        {
          type: 'category',
          label: '训练包模板',
          link: {
            type: 'doc',
            id: 'roles/frontend/templates/index',
          },
          items: [
            'roles/frontend/templates/page-input-pack',
            'roles/frontend/templates/task-brief',
            'roles/frontend/templates/commands-and-evidence',
            'roles/frontend/templates/pr-handoff',
            'roles/frontend/templates/risks-and-next',
            'roles/frontend/templates/example-marketing-page-pack',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '后端工程师',
      items: [
        'roles/backend/index',
        'roles/backend/training-roadmap',
        'roles/backend/tool-fit-and-selection',
        'roles/backend/labs-and-case-maps',
        'roles/backend/assessment-rubric',
        'roles/backend/failure-modes-and-recovery',
        'roles/backend/api-and-contracts',
        'roles/backend/data-and-storage',
        'roles/backend/services-and-integrations',
        'roles/backend/quality-and-testing',
        'roles/backend/observability-and-operations',
        'roles/backend/architecture-and-delivery',
        'roles/backend/context-and-rules',
        'roles/backend/rules-and-instruction-files',
        'roles/backend/skills-and-mcp',
        'roles/backend/delivery-checklists',
        {
          type: 'category',
          label: '模板与交付资产',
          link: {
            type: 'doc',
            id: 'roles/backend/templates-and-handoffs',
          },
          items: [
            'roles/backend/templates/repo-contract-template',
            'roles/backend/templates/api-change-brief',
            'roles/backend/templates/migration-change-brief',
            'roles/backend/templates/integration-task-brief',
            'roles/backend/templates/commands-and-validation',
            'roles/backend/templates/pr-handoff-and-rollback',
            'roles/backend/templates/example-webhook-hardening-pack',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '测试工程师',
      items: [
        'roles/qa',
        'roles/qa/rules-and-instruction-files',
        'roles/qa/skills-and-mcp',
        'roles/qa/tool-fit-and-selection',
        {
          type: 'category',
          label: '训练包模板',
          link: {
            type: 'doc',
            id: 'roles/qa/templates/index',
          },
          items: [
            'roles/qa/templates/test-plan-brief',
            'roles/qa/templates/bug-repro-and-regression',
            'roles/qa/templates/commands-and-evidence',
            'roles/qa/templates/handoff-template',
            'roles/qa/templates/example-checkout-regression-pack',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '运维工程师',
      items: [
        'roles/devops',
        'roles/devops/rules-and-instruction-files',
        'roles/devops/skills-and-mcp',
        'roles/devops/tool-fit-and-selection',
        {
          type: 'category',
          label: '训练包模板',
          link: {
            type: 'doc',
            id: 'roles/devops/templates/index',
          },
          items: [
            'roles/devops/templates/infra-change-brief',
            'roles/devops/templates/runbook-and-rollback',
            'roles/devops/templates/commands-and-evidence',
            'roles/devops/templates/incident-handoff',
            'roles/devops/templates/example-k8s-rollout-pack',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '数据分析师',
      items: [
        'roles/data-analysis',
        'roles/data-analysis/rules-and-instruction-files',
        'roles/data-analysis/skills-and-mcp',
        'roles/data-analysis/tool-fit-and-selection',
        {
          type: 'category',
          label: '训练包模板',
          link: {
            type: 'doc',
            id: 'roles/data-analysis/templates/index',
          },
          items: [
            'roles/data-analysis/templates/analysis-brief',
            'roles/data-analysis/templates/data-quality-checklist',
            'roles/data-analysis/templates/commands-and-repro',
            'roles/data-analysis/templates/report-handoff',
            'roles/data-analysis/templates/example-retention-report-pack',
          ],
        },
      ],
    },
  ],

  resourcesSidebar: [
    {
      type: 'doc',
      id: 'tools/resources/videos',
      label: '全部视频',
    },
    {
      type: 'category',
      label: '按类型进入',
      items: [
        {
          type: 'doc',
          id: 'tools/resources/beginner-tutorials',
          label: '入门教程',
        },
        {
          type: 'doc',
          id: 'tools/resources/hands-on-demos',
          label: '实战演示',
        },
        {
          type: 'doc',
          id: 'tools/resources/quick-tips',
          label: '技巧速览',
        },
      ],
    },
    {
      type: 'doc',
      id: 'tools/resources/courses',
      label: '课程目录',
    },
  ],

  toolTutorialsSidebar: [
    'tools/index',
    {
      type: 'category',
      label: '先跑 Quick Start',
      items: validatedToolDocNavigation.quickStartGroups.map(createQuickStartEntry),
    },
    {
      type: 'category',
      label: '重点工具教程',
      items: validatedToolDocNavigation.coreTools.map(createToolGuideCategory),
    },
    {
      type: 'category',
      label: '扩展工具教程',
      items: [
        ...validatedToolDocNavigation.extendedTools.map(createToolGuideCategory),
        {
          type: 'category',
          label: '判断与对比',
          items: [
            'tools/terminal-agents-and-cli',
            'tools/ai-ide-landscape',
            'tools/terminal-agent-landscape',
            'tools/mainstream-tool-watchlist',
          ],
        },
      ],
    },
  ],

  workflowTutorialsSidebar: [
    'workflows/index',
    'playbooks/workflow-playbook',
    {
      type: 'category',
      label: '先跑 Runbook',
      items: [
        'workflows/patterns/bugfix-refactor-test/runbook',
        'workflows/patterns/terminal-first-repo-pairing/runbook',
        'workflows/patterns/issue-to-draft-pr/runbook',
        'workflows/patterns/spec-first/runbook',
        'workflows/patterns/local-to-background-to-cloud/runbook',
        'workflows/patterns/parallel-worktrees-multi-agent/runbook',
      ],
    },
    'playbooks/index',
    {
      type: 'category',
      label: '重点工作流教程',
      items: [
        {
          type: 'autogenerated',
          dirName: 'workflows/patterns/bugfix-refactor-test',
        },
        {
          type: 'autogenerated',
          dirName: 'workflows/patterns/terminal-first-repo-pairing',
        },
        {
          type: 'autogenerated',
          dirName: 'workflows/patterns/issue-to-draft-pr',
        },
        {
          type: 'autogenerated',
          dirName: 'workflows/patterns/spec-first',
        },
      ],
    },
    {
      type: 'category',
      label: '扩展工作流教程',
      items: [
        {
          type: 'autogenerated',
          dirName: 'workflows/patterns/parallel-worktrees-multi-agent',
        },
        {
          type: 'autogenerated',
          dirName: 'workflows/patterns/local-to-background-to-cloud',
        },
        {
          type: 'category',
          label: '框架与方法',
          items: [
            'workflows/mainstream-ai-coding-workflows',
            'workflows/frameworks-overview',
            {
              type: 'autogenerated',
              dirName: 'workflows/frameworks',
            },
            {
              type: 'autogenerated',
              dirName: 'workflows/community-frameworks',
            },
            'workflows/multi-agent-collaboration',
            'workflows/async-agent-delivery',
            'workflows/prompt-contracts',
            'workflows/spec-driven-ai-delivery',
            'workflows/workflow-catalog',
          ],
        },
      ],
    },
  ],

  caseStudiesSidebar: [
    'case-studies/index',
    'case-studies/claude-code-bugfix-loop',
    'case-studies/gemini-cli-terminal-audit-to-draft-pr',
    'case-studies/vscode-agents-local-to-background-handoff',
    'case-studies/cline-parallel-worktree-owner-loop',
    'case-studies/windsurf-maintenance-to-pr',
    'case-studies/github-copilot-draft-pr-handoff',
    'case-studies/codex-refactor-with-verification',
  ],

  advancedTopicsSidebar: [
    {
      type: 'category',
      label: DOMAIN_DEFINITIONS.standards.label,
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
      label: DOMAIN_DEFINITIONS['development-modes'].label,
      items: ['development-modes/index', 'development-modes/landscape', 'development-modes/agent-execution-modes'],
    },
    {
      type: 'category',
      label: DOMAIN_DEFINITIONS.architecture.label,
      items: ['architecture/index', 'architecture/ai-native-engineering-architecture', 'architecture/mcp-tool-topology'],
    },
    {
      type: 'category',
      label: DOMAIN_DEFINITIONS.ecosystem.label,
      items: [
        'ecosystem/index',
        {
          type: 'autogenerated',
          dirName: 'ecosystem/integrations',
        },
      ],
    },
    {
      type: 'category',
      label: '辅助导航',
      items: [
        'overview/journey-map',
        'overview/taxonomy',
        'overview/content-index',
        {
          type: 'category',
          label: '对比与观察',
          items: [
            'comparisons/index',
            'comparisons/ai-coding-platform-comparison-framework',
            'comparisons/github-copilot-vs-vscode-agent-vs-openai-codex',
            'comparisons/cursor-vs-windsurf-vs-cline',
            'insights/index',
            'insights/repo-issue-signals',
            'insights/agent-model-plus-harness',
            'insights/agentic-coding-patterns',
            'insights/monthly-brief-2026-03',
          ],
        },
      ],
    },
  ],

  aiDirectorySidebar: [
    'ai-directory/index',
    'ai-directory/coding-agents-and-products',
    'ai-directory/agent-frameworks-and-orchestration',
    'ai-directory/evals-observability-and-llmops',
    'ai-directory/learning-and-curated-collections',
    'ai-directory/code-inspector',
    'ai-directory/model-platforms',
    'ai-directory/mcp-and-protocols',
    'ai-directory/chinese-community',
  ],

  archiveSidebar: [
    'archive/index',
    {
      type: 'category',
      label: '模型与 Agent',
      link: {
        type: 'doc',
        id: 'archive/tracks/models-agents/index',
      },
      items: ['archive/tracks/models-agents/coding-models-scorecard'],
    },
    {
      type: 'category',
      label: 'IDE 与工具链',
      link: {
        type: 'doc',
        id: 'archive/tracks/ides-tooling/index',
      },
      items: ['archive/tracks/ides-tooling/review-and-pr-tooling'],
    },
    'archive/tracks/prompting-workflows/index',
    {
      type: 'category',
      label: '团队与交付',
      link: {
        type: 'doc',
        id: 'archive/tracks/team-delivery/index',
      },
      items: ['archive/tracks/team-delivery/solo-to-team-transition'],
    },
  ],

  toolUpdatesSidebar: [
    'tool-updates/index',
    {
      type: 'category',
      label: '按工具查看',
      collapsed: false,
      items: [
        'tool-updates/claude-code',
        'tool-updates/cursor',
        'tool-updates/openai-codex',
        'tool-updates/github-copilot',
        'tool-updates/windsurf',
        'tool-updates/cline',
        'tool-updates/gemini-cli',
        'tool-updates/vscode-agents',
      ],
    },
  ],

  siteAdminSidebar: [
    'site-admin/editorial-workflow',
    'site-admin/github-issue-monitoring',
    'site-admin/ai-writing-workflow',
    'site-admin/publish-github',
    'site-admin/site-roadmap',
    'site-admin/example-first-note',
  ],
};

module.exports = sidebars;
