const DOMAIN_ORDER = [
  'development-modes',
  'workflows',
  'tools',
  'standards',
  'architecture',
  'ecosystem',
];

const DOMAIN_DEFINITIONS = {
  'development-modes': {
    id: 'development-modes',
    label: '开发范式与协作方式',
    shortLabel: '开发范式',
    href: '/docs/development-modes',
  },
  workflows: {
    id: 'workflows',
    label: '工作流与交付',
    shortLabel: '工作流',
    href: '/docs/workflows',
  },
  tools: {
    id: 'tools',
    label: '工具与技术选型',
    shortLabel: '技术选型',
    href: '/docs/tools',
  },
  standards: {
    id: 'standards',
    label: '规范评估与治理',
    shortLabel: '规范治理',
    href: '/docs/standards',
  },
  architecture: {
    id: 'architecture',
    label: '架构与上下文系统',
    shortLabel: '架构系统',
    href: '/docs/architecture',
  },
  ecosystem: {
    id: 'ecosystem',
    label: '生态与集成',
    shortLabel: '生态集成',
    href: '/docs/ecosystem',
  },
};

const VALID_DOMAINS = new Set(DOMAIN_ORDER);

const JOURNEY_STAGE_ORDER = [
  'raw-need',
  'normalized-requirement',
  'tech-selection',
  'project-architecture',
  'development-planning',
  'solution-design',
  'implementation',
  'testing-validation',
  'defect-optimization',
];

const JOURNEY_STAGE_DEFINITIONS = {
  'raw-need': {
    id: 'raw-need',
    label: '原始需求',
    href: '/docs/start/journey-map#raw-need',
  },
  'normalized-requirement': {
    id: 'normalized-requirement',
    label: '标准化需求',
    href: '/docs/start/journey-map#normalized-requirement',
  },
  'tech-selection': {
    id: 'tech-selection',
    label: '技术选型',
    href: '/docs/start/journey-map#tech-selection',
  },
  'project-architecture': {
    id: 'project-architecture',
    label: '项目架构',
    href: '/docs/start/journey-map#project-architecture',
  },
  'development-planning': {
    id: 'development-planning',
    label: '开发规划',
    href: '/docs/start/journey-map#development-planning',
  },
  'solution-design': {
    id: 'solution-design',
    label: '开发方案设计',
    href: '/docs/start/journey-map#solution-design',
  },
  implementation: {
    id: 'implementation',
    label: '开发实施',
    href: '/docs/start/journey-map#implementation',
  },
  'testing-validation': {
    id: 'testing-validation',
    label: '测试验证',
    href: '/docs/start/journey-map#testing-validation',
  },
  'defect-optimization': {
    id: 'defect-optimization',
    label: '缺陷优化',
    href: '/docs/start/journey-map#defect-optimization',
  },
};

const VALID_JOURNEY_STAGES = new Set(JOURNEY_STAGE_ORDER);

const ENTRY_ROLE_ORDER = ['start', 'domain', 'resource', 'index', 'brief', 'archive', 'admin'];
const ENTRY_ROLE_LABELS = {
  start: '开始',
  domain: '知识方向',
  resource: '资源中心',
  index: '内容索引',
  brief: 'Daily Brief',
  archive: '旧赛道归档',
  admin: '站点维护',
};

const VALID_ENTRY_ROLES = new Set(ENTRY_ROLE_ORDER);

const CONTENT_FORM_ORDER = ['hub', 'guide', 'comparison', 'playbook', 'insight', 'resource', 'brief'];
const CONTENT_FORM_LABELS = {
  hub: '总览',
  guide: '指南',
  comparison: '对比',
  playbook: 'Playbook',
  insight: 'Insight',
  resource: '资源',
  brief: '日报',
};

const VALID_CONTENT_FORMS = new Set(CONTENT_FORM_ORDER);

const VALID_MARKET_STATUSES = new Set(['current', 'watch', 'legacy']);
const MARKET_STATUS_LABELS = {
  current: '当前主线',
  watch: '持续观察',
  legacy: '旧赛道透镜',
};

function resolveDomainKey(frontMatter = {}) {
  const candidate = frontMatter.domain ?? frontMatter.pillar ?? '';
  return VALID_DOMAINS.has(candidate) ? candidate : '';
}

function resolveJourneyStageKey(frontMatter = {}) {
  const candidate = frontMatter.journey_stage ?? '';
  return VALID_JOURNEY_STAGES.has(candidate) ? candidate : '';
}

function resolveEntryRoleKey(frontMatter = {}) {
  const candidate = frontMatter.entry_role ?? '';
  return VALID_ENTRY_ROLES.has(candidate) ? candidate : '';
}

function resolveContentFormKey(frontMatter = {}, overrideValue = '') {
  const candidate = overrideValue || frontMatter.content_form || frontMatter.kind || '';
  return VALID_CONTENT_FORMS.has(candidate) ? candidate : '';
}

function getDomainDefinition(key) {
  return DOMAIN_DEFINITIONS[key] ?? null;
}

function getDomainLabel(key, {short = false} = {}) {
  const domain = getDomainDefinition(key);

  if (!domain) {
    return '';
  }

  return short ? domain.shortLabel : domain.label;
}

function getJourneyStageLabel(key) {
  return JOURNEY_STAGE_DEFINITIONS[key]?.label ?? '';
}

module.exports = {
  CONTENT_FORM_LABELS,
  CONTENT_FORM_ORDER,
  DOMAIN_DEFINITIONS,
  DOMAIN_ORDER,
  ENTRY_ROLE_LABELS,
  ENTRY_ROLE_ORDER,
  JOURNEY_STAGE_DEFINITIONS,
  JOURNEY_STAGE_ORDER,
  MARKET_STATUS_LABELS,
  VALID_CONTENT_FORMS,
  VALID_DOMAINS,
  VALID_ENTRY_ROLES,
  VALID_JOURNEY_STAGES,
  VALID_MARKET_STATUSES,
  getDomainDefinition,
  getDomainLabel,
  getJourneyStageLabel,
  resolveContentFormKey,
  resolveDomainKey,
  resolveEntryRoleKey,
  resolveJourneyStageKey,
};
