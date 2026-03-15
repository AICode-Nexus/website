export const roles = [
  {
    id: 'product',
    title: '产品经理',
    description: 'AI 辅助需求分析、原型验证和交付跟踪',
    href: '/docs/roles/product',
  },
  {
    id: 'design',
    title: '设计师',
    description: 'AI 辅助设计系统、组件生成和可访问性验证',
    href: '/docs/roles/design',
  },
  {
    id: 'frontend',
    title: '前端工程师',
    description: '从设计输入、组件实现、样式系统到验证交付的前端 AI 工作台',
    href: '/docs/roles/frontend',
  },
  {
    id: 'backend',
    title: '后端工程师',
    description: 'AI 辅助 API 契约、数据库迁移、服务集成和上线回归',
    href: '/docs/roles/backend',
  },
  {
    id: 'qa',
    title: '测试工程师',
    description: 'AI 辅助测试用例生成、自动化脚本和缺陷分析',
    href: '/docs/roles/qa',
  },
  {
    id: 'devops',
    title: '运维工程师',
    description: 'AI 辅助配置管理、监控告警和故障排查',
    href: '/docs/roles/devops',
  },
  {
    id: 'data-analysis',
    title: '数据分析师',
    description: 'AI 辅助数据清洗、可视化和报表生成',
    href: '/docs/roles/data-analysis',
  },
];

function ensureString(value, fieldName) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Roles content field "${fieldName}" must be a non-empty string.`);
  }

  return value;
}

export function validateRolesContent() {
  if (!Array.isArray(roles) || roles.length === 0) {
    throw new Error('Roles content must be a non-empty array');
  }

  const ids = new Set();

  roles.forEach((role, index) => {
    ensureString(role.id, `roles[${index}].id`);

    if (ids.has(role.id)) {
      throw new Error(`Duplicate role id: ${role.id}`);
    }

    ids.add(role.id);

    ensureString(role.title, `roles[${index}].title`);
    ensureString(role.description, `roles[${index}].description`);
    ensureString(role.href, `roles[${index}].href`);

    if (!role.href.startsWith('/docs/roles/')) {
      throw new Error(`Role[${index}].href must start with /docs/roles/. Received: ${role.href}`);
    }
  });

  return Object.freeze(roles);
}

export const validatedRoles = validateRolesContent();
