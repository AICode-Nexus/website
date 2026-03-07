import {mkdir, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {toolCatalog, toolGroups} from '../../src/data/toolCatalog.mjs';
import {workflowCatalog, workflowGroups} from '../../src/data/workflowCatalog.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../..');

const generatedRoots = [
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

function artifactTable(items) {
  return ['| 阶段 | 目标 | 主要产物 |', '| --- | --- | --- |']
    .concat(items.map((item) => `| ${item.name} | ${item.description} | ${item.artifact} |`))
    .join('\n');
}

function exampleList(items) {
  return items.map((item) => `- **${item.title}**：${item.description}`).join('\n');
}

function ensureDir(dirPath) {
  return mkdir(dirPath, {recursive: true});
}

async function writeTextFile(relativePath, value) {
  const filePath = path.join(workspaceRoot, relativePath);
  await ensureDir(path.dirname(filePath));
  await writeFile(filePath, `${value.trim()}\n`, 'utf8');
}

function buildWorkflowIndexDoc(item) {
  return `${frontMatter({
    title: item.title,
    description: `${item.title} 的定位、适合任务和默认人工接管点。`,
    slug: item.docsRoot.replace('/docs', ''),
    sidebar_label: '概览',
    tags: ['ai-coding', 'workflow', item.id],
    track: 'prompting-workflows',
    kind: 'guide',
    audience: item.audience,
    stage: item.stage,
    featured: item.featured,
    pillar: 'workflows',
    reviewed_at: item.reviewedAt,
    source_window_end: item.reviewedAt,
    market_status: item.marketStatus,
  })}

# ${item.title}

${item.summary}

## 适合的任务

${bulletList(item.bestFor)}

## 最小闭环

${stepList(item.steps)}

## 默认人工接管点

${bulletList(item.handoffs)}

## 推荐入口

${linkedList(item.toolFit || item.comboPatterns || [])}

## 来源

${sourceList(item.sources)}
`;
}

function buildFrameworkIndexDoc(item) {
  return `${frontMatter({
    title: item.title,
    description: `${item.title} 的定位、适用团队和默认进入方式。`,
    slug: item.docsRoot.replace('/docs', ''),
    sidebar_label: '概览',
    tags: ['ai-coding', 'workflow-framework', item.id],
    track: 'prompting-workflows',
    kind: 'guide',
    audience: item.audience,
    stage: item.stage,
    featured: item.featured,
    pillar: 'workflows',
    reviewed_at: item.reviewedAt,
    source_window_end: item.reviewedAt,
    market_status: item.marketStatus,
  })}

# ${item.title}

${item.summary}

## 这个框架解决什么

${bulletList(item.bestFor)}

## 默认进入方式

${item.entry}

## 更适合谁

${bulletList(item.signals)}

## 来源

${sourceList(item.sources)}
`;
}

function buildWorkflowFitDoc(item) {
  return `${frontMatter({
    title: `${item.title}：适用信号与边界`,
    description: `什么时候优先用 ${item.title}，什么时候不要用。`,
    slug: `${item.docsRoot.replace('/docs', '')}/fit-and-signals`,
    sidebar_label: '适用信号',
    tags: ['ai-coding', 'workflow', item.id],
    track: 'prompting-workflows',
    kind: 'guide',
    audience: item.audience,
    stage: item.stage,
    featured: false,
    pillar: 'workflows',
    reviewed_at: item.reviewedAt,
    source_window_end: item.reviewedAt,
    market_status: item.marketStatus,
  })}

# ${item.title}：适用信号与边界

${item.title} 不是“越先进越该上”的默认答案，而是一套适合特定任务结构和团队成熟度的做法。判断是否该上它，关键在于信号是否匹配，而不是产品名是否热门。

## 什么时候触发

${bulletList(item.signals)}

## 更适合谁

${bulletList(item.bestFor)}

## 不适用场景

${bulletList(item.notFor)}

## 默认切换条件

- 如果任务规模下降到只剩局部修复，应切回更轻的 bugfix / refactor / test 流。
- 如果任务规模升级到需要更多角色或更多产物，应切到更重的框架层，而不是硬撑当前模式。
- 如果团队没有 owner、没有验证命令或没有清晰边界，再好的工作流名词都不会救场。
`;
}

function buildWorkflowLoopDoc(item) {
  return `${frontMatter({
    title: `${item.title}：流程与产物`,
    description: `${item.title} 的输入、输出、标准步骤和验收证据。`,
    slug: `${item.docsRoot.replace('/docs', '')}/loop-and-artifacts`,
    sidebar_label: '流程与产物',
    tags: ['ai-coding', 'workflow', item.id],
    track: 'prompting-workflows',
    kind: 'guide',
    audience: item.audience,
    stage: item.stage,
    featured: false,
    pillar: 'workflows',
    reviewed_at: item.reviewedAt,
    source_window_end: item.reviewedAt,
    market_status: item.marketStatus,
  })}

# ${item.title}：流程与产物

${item.title} 的价值，不在于步骤名字好看，而在于每一步都有清晰输入、输出和可 review 的证据。只要其中一环变成“相信我已经做了”，流程就会失真。

## 输入

${bulletList(item.inputs)}

## 输出

${bulletList(item.outputs)}

## 标准步骤

${stepList(item.steps)}

## 验收证据

${bulletList(item.evidence)}
`;
}

function buildWorkflowGovernanceDoc(item) {
  return `${frontMatter({
    title: `${item.title}：治理与风险`,
    description: `${item.title} 需要的权限边界、验证方式和失败模式。`,
    slug: `${item.docsRoot.replace('/docs', '')}/governance-and-risks`,
    sidebar_label: '治理与风险',
    tags: ['ai-coding', 'workflow', item.id],
    track: 'prompting-workflows',
    kind: 'guide',
    audience: item.audience,
    stage: item.stage,
    featured: false,
    pillar: 'workflows',
    reviewed_at: item.reviewedAt,
    source_window_end: item.reviewedAt,
    market_status: item.marketStatus,
  })}

# ${item.title}：治理与风险

${item.title} 一旦进入真实工程环境，问题从来不是“能不能生成代码”，而是权限、边界、验证和人工接管点是否足够清楚。治理写不清，执行越快越危险。

## 权限与边界

${bulletList(item.governance)}

## 验证与 review

${bulletList(item.handoffs)}

## 失败模式

${bulletList(item.risks)}

## 缩减办法

${bulletList(item.scopeReduction || item.maintenanceCosts)}
`;
}

function buildWorkflowExamplesDoc(item) {
  return `${frontMatter({
    title: `${item.title}：案例与工具组合`,
    description: `${item.title} 的代表案例，以及最适合搭配的工具或框架。`,
    slug: `${item.docsRoot.replace('/docs', '')}/examples-and-tool-fit`,
    sidebar_label: '案例与工具组合',
    tags: ['ai-coding', 'workflow', item.id],
    track: 'prompting-workflows',
    kind: 'guide',
    audience: item.audience,
    stage: item.stage,
    featured: false,
    pillar: 'workflows',
    reviewed_at: item.reviewedAt,
    source_window_end: item.reviewedAt,
    market_status: item.marketStatus,
  })}

# ${item.title}：案例与工具组合

没有一种工具能自动修正糟糕的工作流，但合适的入口确实能让同一条 workflow 更稳。这一页的目标是把案例、入口和组合方式绑在一起看。

## 代表案例

${exampleList(item.examples || [])}

## 推荐工具组合

${linkedList(item.toolFit || item.comboPatterns || [])}

## 常见组合误区

- 把工具当成 workflow 本身，而不是 workflow 的承载入口。
- 同时上多个重流程和多个重工具，最后先死在上下文和治理成本上。
- 只看生成速度，不看证据是否能回流到 diff、测试和 review。

## 延伸阅读

- [AI 工作流总览](/docs/workflows)
- [主流 AI Coding 工作流](/docs/workflows/mainstream-ai-coding-workflows)
- [工作流框架总览](/docs/workflows/frameworks-overview)
`;
}

function buildFrameworkRolesDoc(item) {
  return `${frontMatter({
    title: `${item.title}：角色、阶段与产物`,
    description: `${item.title} 的角色切面、阶段划分和核心产物。`,
    slug: `${item.docsRoot.replace('/docs', '')}/roles-stages-and-artifacts`,
    sidebar_label: '角色阶段与产物',
    tags: ['ai-coding', 'workflow-framework', item.id],
    track: 'prompting-workflows',
    kind: 'guide',
    audience: item.audience,
    stage: item.stage,
    featured: false,
    pillar: 'workflows',
    reviewed_at: item.reviewedAt,
    source_window_end: item.reviewedAt,
    market_status: item.marketStatus,
  })}

# ${item.title}：角色、阶段与产物

框架和“任务模板”的差别，在于它不仅告诉你先做什么、后做什么，还定义了哪些角色切面需要出现、哪些产物必须沉淀、哪些 handoff 不能跳过。

## 角色切面

${bulletList(item.roles)}

## 阶段

${artifactTable(item.stages)}

## 核心产物

${bulletList(item.artifacts)}

## 交接点

${bulletList(item.handoffs)}
`;
}

function buildFrameworkAdoptionDoc(item) {
  return `${frontMatter({
    title: `${item.title}：接入手册`,
    description: `把 ${item.title} 接进真实仓库时的试跑、接入和收口方式。`,
    slug: `${item.docsRoot.replace('/docs', '')}/adoption-playbook`,
    sidebar_label: '接入手册',
    tags: ['ai-coding', 'workflow-framework', item.id],
    track: 'prompting-workflows',
    kind: 'guide',
    audience: item.audience,
    stage: item.stage,
    featured: false,
    pillar: 'workflows',
    reviewed_at: item.reviewedAt,
    source_window_end: item.reviewedAt,
    market_status: item.marketStatus,
  })}

# ${item.title}：接入手册

把框架写进文档并不难，真正难的是它进入真实仓库后还能和 repo 规则、验证命令、PR 审批和团队节奏对齐。接入手册的重点，就是降低“文档很好看、但真实任务没人照着走”的风险。

## 先在哪类仓库试跑

${item.entry}

## 接入步骤

${bulletList(item.adoption)}

## 与仓库规范的连接

${bulletList(item.integration)}

## 试跑周期

- 最少跑 2 到 4 个真实任务，再判断是否值得扩大。
- 每轮试跑都要记录返工量、review 修补量和文档维护成本。
- 如果试跑阶段就明显没人遵守，应该先减重，而不是继续加流程。
`;
}

function buildFrameworkFitDoc(item) {
  return `${frontMatter({
    title: `${item.title}：适配边界与替代方案`,
    description: `${item.title} 适合什么、不适合什么，以及与其他框架如何分工。`,
    slug: `${item.docsRoot.replace('/docs', '')}/fit-vs-alternatives`,
    sidebar_label: '边界与替代方案',
    tags: ['ai-coding', 'workflow-framework', item.id],
    track: 'prompting-workflows',
    kind: 'guide',
    audience: item.audience,
    stage: item.stage,
    featured: false,
    pillar: 'workflows',
    reviewed_at: item.reviewedAt,
    source_window_end: item.reviewedAt,
    market_status: item.marketStatus,
  })}

# ${item.title}：适配边界与替代方案

真正的选型问题不是“谁更先进”，而是你当前的团队规模、任务复杂度和治理成熟度，更适合哪一种骨架。框架一旦选错，后续每次任务都会被额外流程拖累。

## 更适合什么

${bulletList(item.bestFor)}

## 与其他框架的边界

${linkedList(item.alternatives)}

## 什么时候不要选它

${bulletList(item.notFor)}

## 组合方式

${linkedList(item.comboPatterns)}
`;
}

function buildFrameworkRiskDoc(item) {
  return `${frontMatter({
    title: `${item.title}：误用与退出条件`,
    description: `${item.title} 的常见误用、维护成本和退出信号。`,
    slug: `${item.docsRoot.replace('/docs', '')}/risks-and-failure-modes`,
    sidebar_label: '误用与退出条件',
    tags: ['ai-coding', 'workflow-framework', item.id],
    track: 'prompting-workflows',
    kind: 'guide',
    audience: item.audience,
    stage: item.stage,
    featured: false,
    pillar: 'workflows',
    reviewed_at: item.reviewedAt,
    source_window_end: item.reviewedAt,
    market_status: item.marketStatus,
  })}

# ${item.title}：误用与退出条件

框架最大的风险，不是它本身太差，而是团队把它用成“看起来很完整”的仪式，却没有把真实交付、验证和 review 绑进去。能不能及时退出错误用法，比一开始会不会写模板更重要。

## 常见误用

${bulletList(item.misuse)}

## 维护成本

${bulletList(item.maintenanceCosts)}

## 退出条件

${bulletList(item.exitSignals)}

## 来源

${sourceList(item.sources)}
`;
}

function buildToolIndexDoc(item) {
  return `${frontMatter({
    title: item.title,
    description: `${item.title} 的角色定位、最佳使用者和默认工作方式。`,
    slug: item.docsRoot.replace('/docs', ''),
    sidebar_label: '概览',
    tags: ['ai-coding', 'tool', item.id],
    track: 'cross-track',
    kind: 'guide',
    audience: item.audience,
    stage: item.stage,
    featured: item.featured,
    pillar: 'tools',
    reviewed_at: item.reviewedAt,
    source_window_end: item.reviewedAt,
    market_status: item.marketStatus,
  })}

# ${item.title}

${item.summary}

## 角色定位

${item.role}

## 最适合谁

${bulletList(item.bestFor)}

## 默认工作方式

- 这个入口真正高价值的地方是：${item.role}
- 如果它不能回流到 repo 证据、验证命令和人工 review，它就只是在制造另一层会话噪音。
- 最稳的使用方式通常不是“让它承担全部职责”，而是和平台、框架或终端验证形成分层。

## 来源

${sourceList(item.sources)}
`;
}

function buildToolWorkflowDoc(item) {
  return `${frontMatter({
    title: `${item.title}：最适合的工作流`,
    description: `${item.title} 最适合承接哪些工作流，以及不适合单独承接什么。`,
    slug: `${item.docsRoot.replace('/docs', '')}/best-fit-workflows`,
    sidebar_label: '最适合的工作流',
    tags: ['ai-coding', 'tool', item.id],
    track: 'cross-track',
    kind: 'guide',
    audience: item.audience,
    stage: item.stage,
    featured: false,
    pillar: 'tools',
    reviewed_at: item.reviewedAt,
    source_window_end: item.reviewedAt,
    market_status: item.marketStatus,
  })}

# ${item.title}：最适合的工作流

工具选型的关键，不是“它能不能做很多事”，而是它最适合承接哪一段 workflow。如果主入口和默认工作流对不上，再强的模型和 UI 也会变成频繁切换上下文的负担。

## 最适合承接的工作流

${linkedList(item.workflows)}

## 最好不要单独承接的工作

${bulletList(item.badFit)}

## 推荐组合

${linkedList(item.combos)}

## 典型任务

${bulletList(item.typicalTasks)}
`;
}

function buildToolRulesDoc(item) {
  return `${frontMatter({
    title: `${item.title}：规则、记忆与工具边界`,
    description: `${item.title} 的 rules、memory、tools 与 repo 接入建议。`,
    slug: `${item.docsRoot.replace('/docs', '')}/rules-memory-tools`,
    sidebar_label: '规则记忆与工具',
    tags: ['ai-coding', 'tool', item.id],
    track: 'cross-track',
    kind: 'guide',
    audience: item.audience,
    stage: item.stage,
    featured: false,
    pillar: 'tools',
    reviewed_at: item.reviewedAt,
    source_window_end: item.reviewedAt,
    market_status: item.marketStatus,
  })}

# ${item.title}：规则、记忆与工具边界

一旦一个工具开始支持 rules、memory、background task 或 MCP，它就不只是“会写代码的 UI”，而是在参与团队治理。规则写在哪、状态留在哪、工具权限怎么管，决定了这个入口能不能长期存在。

## rules 与上下文

${bulletList(item.rules)}

## 记忆与状态

${bulletList(item.memory)}

## tools / approvals / 执行边界

${bulletList(item.tools)}

## 仓库接入建议

${bulletList(item.repoAdvice)}
`;
}

function buildToolGovernanceDoc(item) {
  return `${frontMatter({
    title: `${item.title}：集成、review 与治理`,
    description: `${item.title} 如何接工作系统、保留 review 证据并纳入治理。`,
    slug: `${item.docsRoot.replace('/docs', '')}/integration-review-governance`,
    sidebar_label: '集成与治理',
    tags: ['ai-coding', 'tool', item.id],
    track: 'cross-track',
    kind: 'guide',
    audience: item.audience,
    stage: item.stage,
    featured: false,
    pillar: 'tools',
    reviewed_at: item.reviewedAt,
    source_window_end: item.reviewedAt,
    market_status: item.marketStatus,
  })}

# ${item.title}：集成、review 与治理

工具一旦被组织当主入口，就必须回答三个问题：它怎么接入工作系统、证据回流到哪里、出了问题由谁负责。只有把这三件事说清，工具选型才算进入工程层。

## 工作系统集成

${bulletList(item.integrations)}

## review 与证据

${bulletList(item.reviewEvidence)}

## 治理边界

${bulletList(item.governance)}

## 团队落地建议

- 先定义主入口和补位入口，再决定谁能进入标准栈。
- 所有工具最终都要回到 repo 规则、验证命令和 PR 审核。
- 如果一个工具的产物无法纳入证据链，就不应承担高风险任务。
`;
}

function buildToolTradeoffDoc(item) {
  return `${frontMatter({
    title: `${item.title}：优点、边界与替代项`,
    description: `${item.title} 的优势、边界、替代项和退出信号。`,
    slug: `${item.docsRoot.replace('/docs', '')}/tradeoffs-and-boundaries`,
    sidebar_label: '优点与边界',
    tags: ['ai-coding', 'tool', item.id],
    track: 'cross-track',
    kind: 'guide',
    audience: item.audience,
    stage: item.stage,
    featured: false,
    pillar: 'tools',
    reviewed_at: item.reviewedAt,
    source_window_end: item.reviewedAt,
    market_status: item.marketStatus,
  })}

# ${item.title}：优点、边界与替代项

没有一个工具应该永久占据所有场景。真正成熟的工具栈，必须知道某个入口为什么值得主用、什么时候只是补位、又在什么条件下应该退出标准栈。

## 优势

${bulletList(item.strengths)}

## 边界

${bulletList(item.limits)}

## 可替代项

${linkedList(item.alternatives)}

## 退出信号

${bulletList(item.exitSignals)}
`;
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
    await writeTextFile(
      path.join(folder, 'index.md'),
      groupLookup.get(item.group).id === 'pattern'
        ? buildWorkflowIndexDoc(item)
        : buildFrameworkIndexDoc(item),
    );

    if (groupLookup.get(item.group).id === 'pattern') {
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

    await writeTextFile(
      path.join(folder, '_category_.json'),
      buildCategoryMetadata(item.title, index + 1, id),
    );
    await writeTextFile(path.join(folder, 'index.md'), buildToolIndexDoc(item));
    await writeTextFile(path.join(folder, 'best-fit-workflows.md'), buildToolWorkflowDoc(item));
    await writeTextFile(path.join(folder, 'rules-memory-tools.md'), buildToolRulesDoc(item));
    await writeTextFile(
      path.join(folder, 'integration-review-governance.md'),
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
