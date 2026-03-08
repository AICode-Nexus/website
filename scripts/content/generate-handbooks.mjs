import {mkdir, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';

import {toolCatalog} from '../../src/data/toolCatalog.mjs';
import {workflowCatalog, workflowGroups} from '../../src/data/workflowCatalog.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../..');
const require = createRequire(import.meta.url);
const {getEcosystemIntegrationByToolId} = require('../../src/data/ecosystemIntegrations');

const generatedRoots = [
  'docs/ecosystem/integrations',
  'docs/workflows/patterns',
  'docs/workflows/frameworks',
  'docs/workflows/community-frameworks',
  'docs/tools/platforms',
  'docs/tools/control-planes',
  'docs/tools/execution-stacks',
  'docs/tools/terminal-agents',
  'docs/tools/ide-first',
];

function fmArray(values) {
  return `[${values.map((value) => JSON.stringify(value)).join(', ')}]`;
}

function frontMatter(fields) {
  return `---\n${Object.entries(fields)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: ${fmArray(value)}`;
      }
      if (typeof value === 'boolean') {
        return `${key}: ${value}`;
      }
      return `${key}: ${JSON.stringify(value)}`;
    })
    .join('\n')}\n---`;
}

function escapeTableCell(value) {
  return String(value).replace(/\|/gu, '\\|').replace(/\n/gu, '<br />');
}

function bulletList(items) {
  return items.map((item) => `- ${item}`).join('\n');
}

function linkedList(items) {
  return items.map((item) => `- [${item.title}](${item.href})：${item.description}`).join('\n');
}

function sourceList(items) {
  return items.map((item) => `- [${item.label}](${item.url})`).join('\n');
}

function stepList(items) {
  return items
    .map(
      (item, index) =>
        `${index + 1}. **${item.name}**：${item.description}\n   产物：${item.artifact}`,
    )
    .join('\n');
}

function markdownTable(headers, rows) {
  return [`| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`]
    .concat(rows.map((row) => `| ${row.map((cell) => escapeTableCell(cell)).join(' | ')} |`))
    .join('\n');
}

function admonition(kind, title, body) {
  const heading = title ? ` ${title}` : '';
  return `:::${kind}${heading}\n${body}\n:::\n`;
}

function ensureDir(dirPath) {
  return mkdir(dirPath, {recursive: true});
}

async function writeTextFile(relativePath, value) {
  const filePath = path.join(workspaceRoot, relativePath);
  await ensureDir(path.dirname(filePath));
  await writeFile(filePath, `${value.trim()}\n`, 'utf8');
}

function buildCategoryMetadata(label, position, id) {
  return JSON.stringify(
    {
      label,
      position,
      link: {
        type: 'doc',
        id,
      },
    },
    null,
    2,
  );
}

function dedupeLinks(...groups) {
  const seen = new Set();

  return groups
    .flat()
    .filter((item) => {
      if (!item || seen.has(item.href)) {
        return false;
      }
      seen.add(item.href);
      return true;
    });
}

function buildToolDecisionMatrix(item) {
  return markdownTable(
    ['判断维度', '如果你满足这个条件', '默认建议'],
    [
      ['主控制面', item.role, `先把 ${item.title} 当成日常主入口，再用其他入口补平台或执行层。`],
      ['任务形状', item.typicalTasks[0], `先跑 [${item.workflows[0].title}](${item.workflows[0].href})。`],
      ['团队约束', item.governance[0], `把规则与证据链先写回 repo，再扩大 ${item.title} 使用面。`],
      ['退出信号', item.exitSignals[0], `一旦出现这些信号，就优先评估 [${item.alternatives[0].title}](${item.alternatives[0].href})。`],
    ],
  );
}

function buildToolWorkflowMatrix(item) {
  return markdownTable(
    ['场景', '为什么适合', '搭配入口'],
    item.workflows.map((workflow, index) => [
      workflow.title,
      workflow.description,
      item.combos[index % item.combos.length].title,
    ]),
  );
}

function buildToolRuleBoundaryMatrix(item) {
  return markdownTable(
    ['边界层', '应该放什么', '不要放什么'],
    [
      ['入口规则', item.rules[0], item.rules[1] ?? '不要把所有团队制度都塞进入口私有规则。'],
      ['状态与记忆', item.memory[0], item.memory[1]],
      ['执行边界', item.tools[0], item.tools[1]],
      ['仓库合同', item.repoAdvice[0], item.repoAdvice[1]],
    ],
  );
}

function buildToolGovernanceMatrix(item) {
  return markdownTable(
    ['治理面', '最低要求', '不满足时的风险'],
    [
      ['工作系统接入', item.integrations[0], '入口成功提示会替代真正的任务状态。'],
      ['证据链', item.reviewEvidence[0], '团队无法解释“这次到底跑了什么、改了什么”。'],
      ['Owner 与规则', item.governance[0], item.exitSignals[0]],
      ['扩张节奏', '先从低风险、高频任务试点，再扩大到复杂任务。', item.exitSignals[1]],
    ],
  );
}

function buildToolTradeoffMatrix(item) {
  return markdownTable(
    ['面向', '你会得到什么', '你要接受什么'],
    [
      ['优势', item.strengths[0], item.limits[0]],
      ['长期使用', item.strengths[1], item.limits[1]],
      ['团队 rollout', item.strengths[2] ?? item.governance[0], item.exitSignals[0]],
      ['补位路线', item.alternatives[0].title, item.alternatives[1]?.title ?? item.alternatives[0].title],
    ],
  );
}

function buildWorkflowPatternDecisionMatrix(item) {
  return markdownTable(
    ['判断维度', '匹配信号', '不匹配信号'],
    [
      ['任务边界', item.signals[0], item.notFor[0]],
      ['协作方式', item.signals[1], item.notFor[1]],
      ['验收要求', item.signals[2], item.notFor[2]],
      ['默认切换', '边界越复杂，越适合先写合同再执行。', '只剩单点修复时应切回更轻流程。'],
    ],
  );
}

function buildPatternStageTable(item) {
  return markdownTable(
    ['阶段', '目标', '主要产物'],
    item.steps.map((step) => [step.name, step.description, step.artifact]),
  );
}

function buildPatternExampleMatrix(item) {
  const combos = item.toolFit ?? [];
  return markdownTable(
    ['案例', '为什么适合这个流程', '优先搭配'],
    item.examples.map((example, index) => [
      example.title,
      example.description,
      combos[index % combos.length]?.title ?? combos[0]?.title ?? '配套入口',
    ]),
  );
}

function buildFrameworkStageTable(item) {
  return markdownTable(
    ['阶段', '目标', '主要产物'],
    item.stages.map((stage) => [stage.name, stage.description, stage.artifact]),
  );
}

function buildFrameworkComparisonMatrix(item) {
  const alternatives = item.alternatives ?? [];
  return markdownTable(
    ['如果你当前更在意', '更适合继续用它', '更适合改看别的'],
    [
      ['先把 planning 合同写稳', item.bestFor[0], alternatives[0]?.title ?? '其他框架'],
      ['多角色或更重流程', item.bestFor[1], alternatives[1]?.title ?? alternatives[0]?.title ?? '其他框架'],
      ['日常执行纪律', item.bestFor[2], alternatives[2]?.title ?? alternatives[0]?.title ?? '其他框架'],
    ],
  );
}

function buildWorkflowRiskMatrix(item) {
  return markdownTable(
    ['风险面', '最容易出的问题', '默认应对'],
    [
      ['边界控制', item.risks[0], item.scopeReduction[0]],
      ['流程执行', item.risks[1], item.scopeReduction[1]],
      ['团队成本', item.risks[2], item.scopeReduction[2]],
    ],
  );
}

function buildFrameworkRiskMatrix(item) {
  return markdownTable(
    ['判断面', '继续保留框架的条件', '该停下来做减法的信号'],
    [
      ['执行方式', item.maintenanceCosts[0], item.exitSignals[0]],
      ['团队认知', item.maintenanceCosts[1], item.exitSignals[1]],
      ['长期收益', item.maintenanceCosts[2], item.exitSignals[2]],
    ],
  );
}

function toolImports() {
  return `import {LearningResources} from '@site/src/components/docs';`;
}

function buildGeneratedFrontMatter(item, overrides) {
  return frontMatter({
    audience: item.audience,
    stage: item.stage,
    featured: false,
    reviewed_at: item.reviewedAt,
    source_window_end: item.reviewedAt,
    market_status: item.marketStatus,
    entry_role: 'domain',
    kind: 'guide',
    content_form: 'guide',
    ...overrides,
  });
}

function buildToolFrontMatter(item, overrides = {}) {
  const {
    domain = 'tools',
    journeyStage = 'tech-selection',
    ...rest
  } = overrides;

  return buildGeneratedFrontMatter(item, {
    track: 'cross-track',
    domain,
    journey_stage: journeyStage,
    ...rest,
  });
}

function getWorkflowPatternJourneyStage(item) {
  if (item.docsRoot.includes('/spec-first')) {
    return 'solution-design';
  }

  if (item.docsRoot.includes('/bugfix-refactor-test')) {
    return 'testing-validation';
  }

  return 'implementation';
}

function buildWorkflowPatternFrontMatter(item, overrides = {}) {
  const {journeyStage = getWorkflowPatternJourneyStage(item), ...rest} = overrides;

  return buildGeneratedFrontMatter(item, {
    track: 'prompting-workflows',
    domain: 'workflows',
    journey_stage: journeyStage,
    ...rest,
  });
}

function buildWorkflowFrameworkFrontMatter(item, overrides = {}) {
  const {journeyStage = 'development-planning', ...rest} = overrides;

  return buildGeneratedFrontMatter(item, {
    track: 'prompting-workflows',
    domain: 'workflows',
    journey_stage: journeyStage,
    ...rest,
  });
}

function getToolGovernanceLink(item) {
  const ecosystemIntegration = getEcosystemIntegrationByToolId(item.id);

  return {
    title: `${item.title}：集成、review 与治理`,
    href: ecosystemIntegration?.href ?? `/docs/ecosystem/integrations/${item.id}`,
    description: '如果你已经进入真实工作系统，需要把 review、PR、CI 和责任边界收口，就继续看这页。',
  };
}

function buildToolIndexDoc(item) {
  const nextLinks = dedupeLinks(item.workflows, item.combos, [getToolGovernanceLink(item)], item.alternatives).slice(0, 6);

  return `${buildToolFrontMatter(item, {
    title: item.title,
    description: `${item.title} 的角色定位、最佳使用者和默认工作方式。`,
    slug: item.docsRoot.replace('/docs', ''),
    sidebar_label: '概览',
    tags: ['ai-coding', 'tool', item.id],
    featured: item.featured,
  })}

${toolImports()}

# ${item.title}

${item.summary}

## 60 秒结论

${admonition(
    'tip',
    '先给判断',
    `${item.title} 最稳的使用方式，不是把它当成“所有任务都交给一个入口”，而是先承认它的主控制面是：${item.role}`,
  )}

如果你主要在同一个工作区里高频推进任务、频繁读 diff、并且愿意把 rules、review 证据和 handoff 节点写清，${item.title} 会非常顺手。反过来，如果你的工作系统、审批边界和最终交付主要不发生在这个入口里，那么它就更像补位层，而不是标准栈中心。

## 适合谁，也不适合谁

### 更适合

${bulletList(item.bestFor)}

### 暂时不要先选

${bulletList(item.badFit)}

## 快速判断矩阵

${buildToolDecisionMatrix(item)}

## 默认进入方式与补位组合

${item.title} 进入标准栈时，最重要的不是“功能有没有”，而是你打算让它承担哪一段主线。默认建议是先把高频日常任务放进 ${item.title}，再用平台、框架或终端入口兜住验证与治理。

### 推荐组合

${linkedList(item.combos)}

### 典型任务

${bulletList(item.typicalTasks)}

## 官方事实与工程判断

### 官方资料明确说明了什么

${sourceList(item.sources)}

### 这份手册据此做出的工程判断

${bulletList([
    `${item.title} 的真正优势，不是“它也能做很多事”，而是它把 ${item.role} 这件事打磨得更顺。`,
    `如果团队没有把 repo 规则、验证命令和人工 review 固定下来，再好的入口体验也会被流程噪音抵消。`,
    `决定 ${item.title} 能不能长期留在栈里的，不是单次演示效果，而是这些治理要求：${item.governance[0]}`,
  ])}

## 下一步怎么读

${linkedList(nextLinks)}

<LearningResources
  tool="${item.title}"
  description="如果你已经确认这类入口值得继续深入，下面这些课程和公开视频可以直接补齐操作层细节。"
/>
`;
}

function buildToolWorkflowDoc(item) {
  const nextLinks = dedupeLinks(item.combos, [getToolGovernanceLink(item)], item.alternatives, item.workflows).slice(0, 6);

  return `${buildToolFrontMatter(item, {
    title: `${item.title}：最适合的工作流`,
    description: `${item.title} 最适合承接哪些工作流，以及不适合单独承接什么。`,
    slug: `${item.docsRoot.replace('/docs', '')}/best-fit-workflows`,
    sidebar_label: '最适合的工作流',
    tags: ['ai-coding', 'tool', item.id],
  })}

# ${item.title}：最适合的工作流

工具选型真正困难的地方，不是它能不能“做很多事”，而是它最适合承接哪一段 workflow。主入口和任务形状不匹配，再强的模型和 UI 也会变成频繁切换上下文的负担。

## 哪些任务最自然

${linkedList(item.workflows)}

${admonition(
    'info',
    '默认使用法',
    `${item.title} 更适合承接那些需要频繁交互、快速回看改动、并且仍能把验证结果回流到 repo 或 PR 的任务。`,
  )}

## 场景矩阵

${buildToolWorkflowMatrix(item)}

## 典型任务长什么样

${bulletList(item.typicalTasks)}

这些任务有一个共同点：你需要的不是“纯聊天式解释”，而是能在一个连续入口里做读代码、改代码、看 diff、再决定是否把任务交给补位工具。

## 最好不要单独承接的工作

${bulletList(item.badFit)}

如果团队已经明确属于这些情形，最稳的做法不是硬上 ${item.title}，而是把它降级成局部补位入口，避免让主入口和治理结构长期错位。

## 推荐组合与进入顺序

${linkedList(item.combos)}

### 常见误配信号

${bulletList([
    `大家知道 ${item.title} 很顺手，但说不清它到底应该负责工作流的哪一段。`,
    '复杂任务总是先在这个入口里开工，最后又回到别的工具才能真正收口。',
    item.exitSignals[0],
  ])}

## 下一步怎么读

${linkedList(nextLinks)}

## 来源

${sourceList(item.sources)}
`;
}

function buildToolRulesDoc(item) {
  const nextLinks = dedupeLinks(item.combos, [getToolGovernanceLink(item)], item.alternatives, item.workflows).slice(0, 6);

  return `${buildToolFrontMatter(item, {
    title: `${item.title}：规则、记忆与工具边界`,
    description: `${item.title} 的 rules、memory、tools 与 repo 接入建议。`,
    slug: `${item.docsRoot.replace('/docs', '')}/rules-memory-tools`,
    sidebar_label: '规则记忆与工具',
    tags: ['ai-coding', 'tool', item.id],
    journeyStage: 'implementation',
  })}

# ${item.title}：规则、记忆与工具边界

一旦一个入口开始支持 rules、memory、background task 或 MCP，它就不再只是“会写代码的 UI”，而是在参与团队治理。规则写在哪、状态留在哪、工具权限怎么管，会直接决定这个入口是否能长期留在标准栈里。

## 规则分层

${bulletList(item.rules)}

## 状态与记忆边界

${bulletList(item.memory)}

## 规则与边界矩阵

${buildToolRuleBoundaryMatrix(item)}

## 仓库接入建议

${bulletList(item.repoAdvice)}

如果你已经在 repo 里有 AGENTS.md、目录边界、验证命令和 review checklist，那么 ${item.title} 更应该做的是补足入口体验，而不是再造第二套事实来源。

## 团队检查清单

${bulletList([
    `先定义哪些规则必须版本化留在 repo，哪些只属于 ${item.title} 的入口习惯。`,
    '任何长期状态都必须能解释 owner、刷新时机和失效条件。',
    '执行边界要能回到真实命令、diff 和 PR 证据，而不是只剩界面内的一句“完成了”。',
    item.repoAdvice[0],
  ])}

## 下一步怎么读

${linkedList(nextLinks)}

## 来源

${sourceList(item.sources)}
`;
}

function buildToolGovernanceDoc(item) {
  const nextLinks = dedupeLinks(item.combos, item.alternatives, item.workflows).slice(0, 6);
  const ecosystemIntegration = getEcosystemIntegrationByToolId(item.id);

  return `${buildToolFrontMatter(item, {
    title: `${item.title}：集成、review 与治理`,
    description: `${item.title} 如何接工作系统、保留 review 证据并纳入治理。`,
    slug: ecosystemIntegration?.href.replace('/docs', '') ?? `/ecosystem/integrations/${item.id}`,
    sidebar_label: '集成与治理',
    tags: ['ai-coding', 'tool', item.id],
    domain: 'ecosystem',
    journeyStage: 'implementation',
  })}

# ${item.title}：集成、review 与治理

一个工具一旦被组织当成主入口，就必须回答三个问题：它怎么接入工作系统、证据回流到哪里、出了问题由谁负责。只有把这三件事说清，工具选型才算进入工程层。

## 工作系统接入

${bulletList(item.integrations)}

## 证据链

${bulletList(item.reviewEvidence)}

## 治理矩阵

${buildToolGovernanceMatrix(item)}

## Owner、审批与 rollout 清单

${bulletList([
    '先定义谁拥有入口规则、谁拥有 repo 合同、谁拥有最终 merge 责任。',
    '把“哪些任务能直接放行、哪些任务必须人工接管”写成可复用清单。',
    '默认先从低风险、高频任务试点，再扩大到长任务或跨模块任务。',
    item.governance[0],
    item.governance[1],
  ])}

## 团队落地顺序

1. 先确认 ${item.title} 在系统里负责哪一段，而不是一开始就给它全部权限。
2. 再把 review 证据固定成 diff、命令结果、说明和 handoff 记录。
3. 最后才扩大适用范围，否则你只是在放大现有治理缺口。

## 下一步怎么读

${linkedList(nextLinks)}

## 来源

${sourceList(item.sources)}
`;
}

function buildToolTradeoffDoc(item) {
  const nextLinks = dedupeLinks(item.alternatives, item.combos, [getToolGovernanceLink(item)], item.workflows).slice(0, 6);

  return `${buildToolFrontMatter(item, {
    title: `${item.title}：优点、边界与替代项`,
    description: `${item.title} 的优势、边界、替代项和退出信号。`,
    slug: `${item.docsRoot.replace('/docs', '')}/tradeoffs-and-boundaries`,
    sidebar_label: '优点与边界',
    tags: ['ai-coding', 'tool', item.id],
  })}

# ${item.title}：优点、边界与替代项

没有一个入口应该永久占据所有场景。真正成熟的工具栈，必须知道某个入口为什么值得主用、什么时候只是补位、又在什么条件下应该退出标准栈。

## 核心优势

${bulletList(item.strengths)}

## 取舍矩阵

${buildToolTradeoffMatrix(item)}

## 替代路线

${linkedList(item.alternatives)}

替代项的价值，不是为了证明“谁更强”，而是帮你在主控制面、治理要求和执行深度发生变化时及时换挡，而不是让整个团队继续被一个已经不匹配的入口拖着走。

## 退出与迁移信号

${bulletList(item.exitSignals)}

## 决策检查清单

${bulletList([
    `如果你需要的是 ${item.role}，${item.title} 仍然值得保留。`,
    `如果团队更在意的是 ${item.limits[0]} 这一类问题，就该优先评估替代路线。`,
    '任何迁移都应该先迁出规则边界和证据链，再迁主入口本身。',
  ])}

## 下一步怎么读

${linkedList(nextLinks)}

## 来源

${sourceList(item.sources)}
`;
}

function buildWorkflowIndexDoc(item) {
  const nextLinks = dedupeLinks(item.toolFit).slice(0, 6);

  return `${buildWorkflowPatternFrontMatter(item, {
    title: item.title,
    description: `${item.title} 的定位、适合任务和默认人工接管点。`,
    slug: item.docsRoot.replace('/docs', ''),
    sidebar_label: '概览',
    tags: ['ai-coding', 'workflow', item.id],
    featured: item.featured,
  })}

# ${item.title}

${item.summary}

## 什么时候优先用它

${bulletList(item.bestFor)}

## 什么时候先别用它

${bulletList(item.notFor)}

## 最小闭环

${stepList(item.steps)}

## 阶段与产物总表

${buildPatternStageTable(item)}

## 输入、输出与验收

### 输入

${bulletList(item.inputs)}

### 输出

${bulletList(item.outputs)}

### 验收证据

${bulletList(item.evidence)}

## 默认人工接管点

${bulletList(item.handoffs)}

## 推荐入口与下一步

${linkedList(nextLinks)}

## 来源

${sourceList(item.sources)}
`;
}

function buildWorkflowFitDoc(item) {
  const nextLinks = dedupeLinks(item.toolFit).slice(0, 6);

  return `${buildWorkflowPatternFrontMatter(item, {
    title: `${item.title}：适用信号与边界`,
    description: `什么时候优先用 ${item.title}，什么时候不要用。`,
    slug: `${item.docsRoot.replace('/docs', '')}/fit-and-signals`,
    sidebar_label: '适用信号',
    tags: ['ai-coding', 'workflow', item.id],
  })}

# ${item.title}：适用信号与边界

${item.title} 不是“越先进越该上”的默认答案，而是一套只在特定任务结构与团队成熟度下真正赚回成本的做法。判断是否该上它，关键是信号是否匹配，而不是词汇是否热门。

## 触发信号

${bulletList(item.signals)}

## 更适合谁

${bulletList(item.bestFor)}

## 不适用场景

${bulletList(item.notFor)}

## 快速判断矩阵

${buildWorkflowPatternDecisionMatrix(item)}

## 默认切换条件

${bulletList([
    '如果任务规模下降到只剩局部修复，应切回更轻的 bugfix / refactor / test 流。',
    '如果任务规模升级到需要更多角色或更多产物，应切到更重的框架层，而不是硬撑当前模式。',
    '如果团队没有 owner、没有验证命令或没有清晰边界，再好的工作流名词都不会救场。',
  ])}

## 下一步怎么读

${linkedList(nextLinks)}

## 来源

${sourceList(item.sources)}
`;
}

function buildWorkflowLoopDoc(item) {
  const nextLinks = dedupeLinks(item.toolFit).slice(0, 6);

  return `${buildWorkflowPatternFrontMatter(item, {
    title: `${item.title}：流程与产物`,
    description: `${item.title} 的输入、输出、标准步骤和验收证据。`,
    slug: `${item.docsRoot.replace('/docs', '')}/loop-and-artifacts`,
    sidebar_label: '流程与产物',
    tags: ['ai-coding', 'workflow', item.id],
  })}

# ${item.title}：流程与产物

${item.title} 的价值，不在于步骤名字好看，而在于每一步都有清晰输入、输出和可 review 的证据。只要其中一环变成“相信我已经做了”，流程就会失真。

## 输入

${bulletList(item.inputs)}

## 输出

${bulletList(item.outputs)}

## 阶段与产物总表

${buildPatternStageTable(item)}

## 标准步骤

${stepList(item.steps)}

## 验收证据

${bulletList(item.evidence)}

## 最容易断裂的地方

${bulletList([
    item.handoffs[0],
    item.handoffs[1],
    item.risks[0],
  ])}

## 下一步怎么读

${linkedList(nextLinks)}

## 来源

${sourceList(item.sources)}
`;
}

function buildWorkflowGovernanceDoc(item) {
  const nextLinks = dedupeLinks(item.toolFit).slice(0, 6);

  return `${buildWorkflowPatternFrontMatter(item, {
    title: `${item.title}：治理与风险`,
    description: `${item.title} 需要的权限边界、验证方式和失败模式。`,
    slug: `${item.docsRoot.replace('/docs', '')}/governance-and-risks`,
    sidebar_label: '治理与风险',
    tags: ['ai-coding', 'workflow', item.id],
  })}

# ${item.title}：治理与风险

${item.title} 一旦进入真实工程环境，问题从来不是“能不能生成代码”，而是权限、边界、验证和人工接管点是否足够清楚。治理写不清，执行越快越危险。

## 权限与边界

${bulletList(item.governance)}

## 验证与 review

${bulletList(item.handoffs)}

## 失败模式

${bulletList(item.risks)}

## 风险矩阵

${buildWorkflowRiskMatrix(item)}

## 缩减办法

${bulletList(item.scopeReduction)}

## 团队治理检查清单

${bulletList([
    '默认先锁边界，再放权限，不要边执行边发明范围。',
    '每个验收点都要能映射到命令输出、截图或人工检查结果。',
    '如果流程本身没人维护，就先减重，而不是继续加文档层次。',
  ])}

只要团队能把“风险是什么、怎么缩减、什么时候应该切回更轻流程”讲清，这类治理页才算真的有用。否则它就只是把原本应该在 review 里回答的问题，换了个地方再写一遍。

## 下一步怎么读

${linkedList(nextLinks)}

## 来源

${sourceList(item.sources)}
`;
}

function buildWorkflowExamplesDoc(item) {
  const nextLinks = dedupeLinks(item.toolFit).slice(0, 6);

  return `${buildWorkflowPatternFrontMatter(item, {
    title: `${item.title}：案例与工具组合`,
    description: `${item.title} 的代表案例，以及最适合搭配的工具或框架。`,
    slug: `${item.docsRoot.replace('/docs', '')}/examples-and-tool-fit`,
    sidebar_label: '案例与工具组合',
    tags: ['ai-coding', 'workflow', item.id],
  })}

# ${item.title}：案例与工具组合

没有一种工具能自动修正糟糕的 workflow，但合适的入口确实能让同一条交付链更稳。这一页的目标，是把代表案例、工具组合和常见误配放在一起看。

## 代表案例

${bulletList(item.examples.map((example) => `**${example.title}**：${example.description}`))}

## 案例与工具组合矩阵

${buildPatternExampleMatrix(item)}

## 推荐工具组合

${linkedList(item.toolFit)}

## 常见组合误区

${bulletList([
    '把工具当成 workflow 本身，而不是 workflow 的承载入口。',
    '同时上多个重流程和多个重工具，最后先死在上下文和治理成本上。',
    '只看生成速度，不看证据是否能回流到 diff、测试和 review。',
  ])}

## 什么时候切到更重或更轻的流程

${bulletList([
    '如果任务开始涉及更多角色、更多产物或更长审批链，应切到框架层。',
    '如果任务降级成单点修复或纯配置修订，应切回更轻量的维护流。',
    '如果案例看起来很像，但团队没有任何验证命令，先补基础设施再谈流程。',
  ])}

## 下一步怎么读

${linkedList(nextLinks)}

## 来源

${sourceList(item.sources)}
`;
}

function buildFrameworkIndexDoc(item) {
  const nextLinks = dedupeLinks(item.comboPatterns, item.alternatives).slice(0, 6);

  return `${buildWorkflowFrameworkFrontMatter(item, {
    title: item.title,
    description: `${item.title} 的定位、适用团队和默认进入方式。`,
    slug: item.docsRoot.replace('/docs', ''),
    sidebar_label: '概览',
    tags: ['ai-coding', 'workflow-framework', item.id],
    featured: item.featured,
  })}

# ${item.title}

${item.summary}

## 这个框架解决什么

${bulletList(item.bestFor)}

## 默认进入方式

${item.entry}

## 更适合谁

${bulletList(item.signals)}

## 角色与阶段概览

${buildFrameworkStageTable(item)}

## 采用前检查

${bulletList([
    '先确认团队已经有 repo 规则、验证命令和明确 owner，否则只会把流程层再加一层壳。',
    '先挑一个真实任务试跑，而不是先做大面积制度推广。',
    item.handoffs[0],
    item.handoffs[1],
  ])}

## 下一步怎么读

${linkedList(nextLinks)}

## 来源

${sourceList(item.sources)}
`;
}

function buildFrameworkRolesDoc(item) {
  const nextLinks = dedupeLinks(item.comboPatterns, item.alternatives).slice(0, 6);

  return `${buildWorkflowFrameworkFrontMatter(item, {
    title: `${item.title}：角色、阶段与产物`,
    description: `${item.title} 的角色切面、阶段划分和核心产物。`,
    slug: `${item.docsRoot.replace('/docs', '')}/roles-stages-and-artifacts`,
    sidebar_label: '角色阶段与产物',
    tags: ['ai-coding', 'workflow-framework', item.id],
  })}

# ${item.title}：角色、阶段与产物

框架和“任务模板”的差别，在于它不仅告诉你先做什么、后做什么，还定义了哪些角色切面需要出现、哪些产物必须沉淀、哪些 handoff 不能跳过。

## 角色切面

${bulletList(item.roles)}

## 阶段总表

${buildFrameworkStageTable(item)}

## 核心产物

${bulletList(item.artifacts)}

## 交接点

${bulletList(item.handoffs)}

## 角色和产物为什么要一起看

如果角色只停留在名称层，而产物没有固定下来，最终执行时还是会回到“谁想起什么就补什么”的状态。把角色、阶段和产物绑在一起看，才有可能让不同人对同一个框架产生相同预期。

## 下一步怎么读

${linkedList(nextLinks)}

## 来源

${sourceList(item.sources)}
`;
}

function buildFrameworkAdoptionDoc(item) {
  const nextLinks = dedupeLinks(item.comboPatterns, item.alternatives).slice(0, 6);
  const adoptionMatrix = markdownTable(
    ['阶段', '应该做什么', '完成标准'],
    [
      ['试跑前', item.entry, '能明确一类真实任务和一位 owner。'],
      ['试跑中', item.adoption[0], '真实任务能按框架阶段推进。'],
      ['试跑后', item.adoption[3], '能判断返工量、review 成本和维护成本是否下降。'],
    ],
  );

  return `${buildWorkflowFrameworkFrontMatter(item, {
    title: `${item.title}：接入手册`,
    description: `把 ${item.title} 接进真实仓库时的试跑、接入和收口方式。`,
    slug: `${item.docsRoot.replace('/docs', '')}/adoption-playbook`,
    sidebar_label: '接入手册',
    tags: ['ai-coding', 'workflow-framework', item.id],
    content_form: 'playbook',
  })}

# ${item.title}：接入手册

把框架写进文档并不难，真正难的是它进入真实仓库后还能和 repo 规则、验证命令、PR 审批和团队节奏对齐。接入手册的重点，就是降低“文档很好看、但真实任务没人照着走”的风险。

## 先在哪类仓库试跑

${item.entry}

## 接入步骤

${bulletList(item.adoption)}

## 试跑矩阵

${adoptionMatrix}

## 与仓库规范的连接

${bulletList(item.integration)}

## 试跑周期与收口

${bulletList([
    '最少跑 2 到 4 个真实任务，再判断是否值得扩大。',
    '每轮试跑都要记录返工量、review 修补量和文档维护成本。',
    '如果试跑阶段就明显没人遵守，应该先减重，而不是继续加流程。',
  ])}

## 下一步怎么读

${linkedList(nextLinks)}

## 来源

${sourceList(item.sources)}
`;
}

function buildFrameworkFitDoc(item) {
  const nextLinks = dedupeLinks(item.alternatives, item.comboPatterns).slice(0, 6);

  return `${buildWorkflowFrameworkFrontMatter(item, {
    title: `${item.title}：适配边界与替代方案`,
    description: `${item.title} 适合什么、不适合什么，以及与其他框架如何分工。`,
    slug: `${item.docsRoot.replace('/docs', '')}/fit-vs-alternatives`,
    sidebar_label: '边界与替代方案',
    tags: ['ai-coding', 'workflow-framework', item.id],
    content_form: 'comparison',
    journeyStage: 'tech-selection',
  })}

# ${item.title}：适配边界与替代方案

真正的选型问题不是“谁更先进”，而是你当前的团队规模、任务复杂度和治理成熟度，更适合哪一种骨架。框架一旦选错，后续每次任务都会被额外流程拖累。

## 更适合什么

${bulletList(item.bestFor)}

## 与其他框架的边界

${linkedList(item.alternatives)}

## 比较矩阵

${buildFrameworkComparisonMatrix(item)}

## 什么时候不要选它

${bulletList(item.notFor)}

## 组合方式

${linkedList(item.comboPatterns)}

## 下一步怎么读

${linkedList(nextLinks)}

## 来源

${sourceList(item.sources)}
`;
}

function buildFrameworkRiskDoc(item) {
  const nextLinks = dedupeLinks(item.alternatives, item.comboPatterns).slice(0, 6);

  return `${buildWorkflowFrameworkFrontMatter(item, {
    title: `${item.title}：误用与退出条件`,
    description: `${item.title} 的常见误用、维护成本和退出信号。`,
    slug: `${item.docsRoot.replace('/docs', '')}/risks-and-failure-modes`,
    sidebar_label: '误用与退出条件',
    tags: ['ai-coding', 'workflow-framework', item.id],
    journeyStage: 'testing-validation',
  })}

# ${item.title}：误用与退出条件

框架最大的风险，不是它本身太差，而是团队把它用成“看起来很完整”的仪式，却没有把真实交付、验证和 review 绑进去。能不能及时退出错误用法，比一开始会不会写模板更重要。

## 常见误用

${bulletList(item.misuse)}

## 维护成本

${bulletList(item.maintenanceCosts)}

## 退出条件

${bulletList(item.exitSignals)}

## 维护与退出矩阵

${buildFrameworkRiskMatrix(item)}

## 团队检查清单

${bulletList([
    '团队能不能说清每个阶段产出什么，而不只是记住框架名。',
    '框架维护成本有没有低于它带来的返工下降与节奏稳定收益。',
    '只要真实任务已经持续绕开这套骨架，就该先停下来做减法。',
  ])}

这类风险页的作用，不是证明框架“也有问题”，而是帮助你在框架开始失效时尽早识别出错方向，避免继续往一个已经不被真实任务采用的骨架里堆更多 ritual。

## 下一步怎么读

${linkedList(nextLinks)}

## 来源

${sourceList(item.sources)}
`;
}

async function resetGeneratedRoots() {
  await Promise.all(
    generatedRoots.map(async (relativePath) => {
      await rm(path.join(workspaceRoot, relativePath), {recursive: true, force: true});
      await mkdir(path.join(workspaceRoot, relativePath), {recursive: true});
    }),
  );
}

async function generateWorkflowDocs() {
  const groupLookup = new Map(workflowGroups.map((group) => [group.id, group]));

  for (const [index, item] of workflowCatalog.entries()) {
    const folder = path.join('docs', item.docsRoot.replace('/docs/', ''));
    const id = item.docsRoot.replace('/docs/', '') + '/index';

    await writeTextFile(
      path.join(folder, '_category_.json'),
      buildCategoryMetadata(item.title, index + 1, id),
    );

    if (groupLookup.get(item.group).id === 'pattern') {
      await writeTextFile(path.join(folder, 'index.md'), buildWorkflowIndexDoc(item));
      await writeTextFile(path.join(folder, 'fit-and-signals.md'), buildWorkflowFitDoc(item));
      await writeTextFile(path.join(folder, 'loop-and-artifacts.md'), buildWorkflowLoopDoc(item));
      await writeTextFile(
        path.join(folder, 'governance-and-risks.md'),
        buildWorkflowGovernanceDoc(item),
      );
      await writeTextFile(
        path.join(folder, 'examples-and-tool-fit.md'),
        buildWorkflowExamplesDoc(item),
      );
      continue;
    }

    await writeTextFile(path.join(folder, 'index.md'), buildFrameworkIndexDoc(item));
    await writeTextFile(
      path.join(folder, 'roles-stages-and-artifacts.md'),
      buildFrameworkRolesDoc(item),
    );
    await writeTextFile(path.join(folder, 'adoption-playbook.md'), buildFrameworkAdoptionDoc(item));
    await writeTextFile(path.join(folder, 'fit-vs-alternatives.md'), buildFrameworkFitDoc(item));
    await writeTextFile(
      path.join(folder, 'risks-and-failure-modes.md'),
      buildFrameworkRiskDoc(item),
    );
  }
}

async function generateToolDocs() {
  for (const [index, item] of toolCatalog.entries()) {
    const folder = path.join('docs', item.docsRoot.replace('/docs/', ''));
    const id = item.docsRoot.replace('/docs/', '') + '/index';
    const ecosystemIntegration = getEcosystemIntegrationByToolId(item.id);

    await writeTextFile(
      path.join(folder, '_category_.json'),
      buildCategoryMetadata(item.title, index + 1, id),
    );
    await writeTextFile(path.join(folder, 'index.md'), buildToolIndexDoc(item));
    await writeTextFile(path.join(folder, 'best-fit-workflows.md'), buildToolWorkflowDoc(item));
    await writeTextFile(path.join(folder, 'rules-memory-tools.md'), buildToolRulesDoc(item));
    if (!ecosystemIntegration) {
      throw new Error(`Missing ecosystem integration route for tool "${item.id}".`);
    }
    await writeTextFile(
      path.join('docs', 'ecosystem', 'integrations', `${item.id}.md`),
      buildToolGovernanceDoc(item),
    );
    await writeTextFile(
      path.join(folder, 'tradeoffs-and-boundaries.md'),
      buildToolTradeoffDoc(item),
    );
  }
}

async function main() {
  await resetGeneratedRoots();
  await generateWorkflowDocs();
  await generateToolDocs();
  console.log(`Generated ${workflowCatalog.length} workflow handbooks and ${toolCatalog.length} tool handbooks.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
