import {defineWorkflowCatalog} from '../utils/handbookCatalog.mjs';

const reviewedAt = '2026-03-07';
const marketStatus = 'current';

function source(label, url) {
  return {label, url};
}

function docLink(title, href, description) {
  return {title, href, description};
}

const base = {
  reviewedAt,
  marketStatus,
};

export const workflowGroups = [
  {
    id: 'pattern',
    title: '工作流模式',
    description: '先固定任务的默认交付链，再决定具体用哪套框架或工具。',
  },
  {
    id: 'framework',
    title: '官方/主线工作流框架',
    description: '这些方案本身就定义了角色、阶段、产物或提案链，适合作为团队制度骨架。',
  },
  {
    id: 'community-framework',
    title: '社区工作流框架',
    description: '这类框架不是单页 prompt 集，而是已经形成阶段、技能、worktree 和验证方法的社区方案。',
  },
];

export const workflowCatalog = defineWorkflowCatalog([
  {
    ...base,
    id: 'spec-first',
    title: 'Spec-First',
    group: 'pattern',
    docsRoot: '/docs/workflows/patterns/spec-first',
    officialUrl: 'https://github.com/github/spec-kit',
    featured: true,
    audience: 'mixed',
    stage: 'intermediate',
    summary: '先把目标、非目标、验收和任务拆解写清，再让 agent 执行，是新功能和跨模块改动的默认主线。',
    bestFor: [
      '新功能、跨模块改动、需要显式验收的任务。',
      '涉及 schema、API、权限、迁移或多端联动的需求。',
      '组织希望先把“做什么”与“怎么做”分开审阅。',
    ],
    signals: [
      '需求边界模糊，稍不注意就会在实现阶段扩边界。',
      '多个角色会 review 同一个改动，需要先对齐目标和非目标。',
      '如果不先列验收标准，后续很难判断 agent 是否真的完成。',
    ],
    notFor: [
      '生产事故热修、单点配置修正或纯文案修订。',
      '还没有基本验证命令、也没有人维护文档产物的团队。',
      '明确只需一次性探索，不打算沉淀长期流程的场景。',
    ],
    steps: [
      {
        name: '写目标与边界',
        description: '先把目标、非目标、影响面、约束和验收条件写成可 review 的 spec。',
        artifact: 'spec 草稿',
      },
      {
        name: '补实现计划',
        description: '在读完仓库上下文后，把任务拆成可验证的阶段和工作包。',
        artifact: 'plan 与 task list',
      },
      {
        name: '小步执行并对照 spec',
        description: '每次修改都回到 spec 和验收标准，避免实现漂移。',
        artifact: '按阶段完成的 diff',
      },
      {
        name: '按验收标准验证',
        description: '把测试、构建、人工检查和风险说明映射回验收项。',
        artifact: 'verification packet',
      },
    ],
    handoffs: [
      'spec 定稿前必须明确谁能改目标、谁只能补实现细节。',
      'plan 定稿后再进入执行，避免边执行边发明范围。',
      '最终 merge 仍要由 owner 按 spec 与 diff 做人工 review。',
    ],
    inputs: [
      '目标、非目标、业务背景和影响范围。',
      '允许修改的目录、禁止触碰的区域和依赖约束。',
      '验收标准、验证命令、人工检查点。',
    ],
    outputs: [
      '规格说明、计划、任务拆解。',
      '对照 spec 的代码改动与验证证据。',
      '范围变化记录和未完成项说明。',
    ],
    evidence: [
      '每个验收点都要能映射到命令输出、截图或人工检查结果。',
      '最终说明要指出哪些需求明确完成，哪些被延后或切分。',
      '如果实现偏离 spec，必须记录原因和补充批准点。',
    ],
    governance: [
      'spec 是边界合同，不是灵感板；大改动要回流到 spec。',
      '权限默认收紧，只给完成当前阶段所需的最小命令集。',
      'review 时优先核对目标、范围和验收，而不是直接讨论写法细节。',
    ],
    risks: [
      '计划写得很长，但没有被实际执行或验证，最后只剩文档负担。',
      'spec 太泛，导致实现阶段仍要临场发明边界。',
      '团队把 spec-first 误用到所有小改动，流程成本失控。',
    ],
    scopeReduction: [
      '先只交付核心 happy path，把迁移、回收和边缘优化延后。',
      '把复杂 UI、数据层和运维改动拆成独立任务或独立 worktree。',
      '先收紧到一个 repo、一个模块或一类角色的试点任务。',
    ],
    examples: [
      {
        title: '新增组织级权限模型',
        description: '先写清角色矩阵、非目标和回归路径，再拆成后端、前端和测试任务。',
      },
      {
        title: '导出系统增加新格式',
        description: '先固定输入输出契约、兼容边界和验收样例，再安排实现与验证。',
      },
    ],
    toolFit: [
      docLink('Spec Kit', '/docs/workflows/frameworks/spec-kit', '适合先把 spec、plan、tasks 链条固定下来。'),
      docLink('BMAD', '/docs/workflows/frameworks/bmad', '适合需要多角色 handoff 的更重流程。'),
      docLink('OpenAI Codex', '/docs/tools/execution-stacks/openai-codex', '适合在 spec 定稿后进入本地或云端执行。'),
      docLink('VS Code Agents', '/docs/tools/control-planes/vscode-agents', '适合把本地探索和后台执行串在一条控制面里。'),
    ],
    sources: [
      source('GitHub Spec Kit', 'https://github.com/github/spec-kit'),
      source('BMAD Method', 'https://github.com/bmad-code-org/BMAD-METHOD'),
      source('VS Code Agents Overview', 'https://code.visualstudio.com/docs/copilot/agents/overview'),
    ],
  },
  {
    ...base,
    id: 'bugfix-refactor-test',
    title: 'Bugfix / Refactor / Test',
    group: 'pattern',
    docsRoot: '/docs/workflows/patterns/bugfix-refactor-test',
    officialUrl: 'https://docs.anthropic.com/en/docs/claude-code/common-workflows',
    featured: true,
    audience: 'mixed',
    stage: 'starter',
    summary: '把最高频的修 bug、局部重构和补测试固定成最小闭环，让 agent 先复现、再说明根因、最后给证据。',
    bestFor: [
      '已有失败测试、复现步骤或明确行为边界的维护任务。',
      '需要在小范围内修复问题、清理代码或补充回归测试。',
      '希望快速稳定高频日常任务，而不是每次从零设计流程。',
    ],
    signals: [
      '问题可复现，或者至少能通过日志、快照、断言定位。',
      '允许修改的位置比较清楚，可以定义“最小修复范围”。',
      '组织更在意稳定回归，而不是趁机做大规模设计翻新。',
    ],
    notFor: [
      '需求本身仍在探索，甚至不知道预期行为是什么。',
      '需要同时改 schema、架构边界和产品交互的复杂任务。',
      '团队没有固定验证命令，只能靠主观感觉判断完成。',
    ],
    steps: [
      {
        name: '先复现或收集症状',
        description: '把失败测试、日志、截图或行为差异整理成可重复的起点。',
        artifact: 'repro note',
      },
      {
        name: '确认根因与边界',
        description: '先解释为什么出错、为什么本次只修这一层，再决定是否需要重构或补测试。',
        artifact: 'root cause note',
      },
      {
        name: '做最小修复或最小重构',
        description: '优先保持范围稳定，避免顺手扩大设计变更。',
        artifact: 'small diff',
      },
      {
        name: '跑回归并说明覆盖缺口',
        description: '执行测试、构建或人工验证，并明确还剩什么风险。',
        artifact: 'regression evidence',
      },
    ],
    handoffs: [
      '根因没说清之前，不进入大改动。',
      '重构必须先写出行为边界，否则 review 无从判断是否越界。',
      '最终交付要附上回归结果和覆盖缺口，而不是只贴 diff。',
    ],
    inputs: [
      '失败用例、日志、异常描述或行为对照。',
      '允许修改的文件范围、可运行的测试命令。',
      '是否允许顺手清理、补测或做兼容修正。',
    ],
    outputs: [
      '最小修复、最小重构或测试补充。',
      '根因说明、回归结果和剩余风险。',
      '必要时的后续任务建议。',
    ],
    evidence: [
      '修复前后的失败/成功信号对照。',
      '本次真正执行过的命令和结果摘要。',
      '如果没有补充测试，要明确说明为什么。',
    ],
    governance: [
      '任何扩大范围的动作都要在开始前声明，不允许在 diff 里偷偷长出第二个任务。',
      '修 bug 与补测试优先使用固定命令，减少人为判断误差。',
      '评审重点是根因、回归和边界，不是“改得多不多”。',
    ],
    risks: [
      '只修症状、不修根因，问题很快复发。',
      '把局部修复顺手扩成大重构，最后没人敢 merge。',
      '测试写得脆弱，导致未来误报或维护成本上升。',
    ],
    scopeReduction: [
      '先锁定一个失败用例或一个模块，再决定是否推广。',
      '把重构与功能改动拆开，先保证行为一致。',
      '必要时只补最关键的回归测试，把更多测试拆成后续任务。',
    ],
    examples: [
      {
        title: '登录重试逻辑偶发失效',
        description: '先复现重试失败，再只修状态机或重试计数相关逻辑，并补回归测试。',
      },
      {
        title: '解析器模块难以维护',
        description: '先列行为边界，再做小步重构，保持旧测试全部通过。',
      },
    ],
    toolFit: [
      docLink('Claude Code', '/docs/tools/terminal-agents/claude-code', '适合终端里先复现、再修、再跑命令。'),
      docLink('Gemini CLI', '/docs/tools/terminal-agents/gemini-cli', '适合把终端验证与 GitHub 交付串起来。'),
      docLink('VS Code Agents', '/docs/tools/control-planes/vscode-agents', '适合本地改动加后台补跑。'),
      docLink('GitHub Copilot', '/docs/tools/platforms/github-copilot', '适合已有 issue 与 PR 流的日常小改动。'),
    ],
    sources: [
      source('Claude Code Common Workflows', 'https://docs.anthropic.com/en/docs/claude-code/common-workflows'),
      source('Cline Plan & Act', 'https://docs.cline.bot/core-workflows/plan-and-act'),
      source('GitHub Copilot Coding Agent', 'https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent'),
    ],
  },
  {
    ...base,
    id: 'issue-to-draft-pr',
    title: 'Issue / Jira -> Draft PR',
    group: 'pattern',
    docsRoot: '/docs/workflows/patterns/issue-to-draft-pr',
    officialUrl: 'https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent',
    featured: true,
    audience: 'mixed',
    stage: 'intermediate',
    summary: '把已经进入 GitHub 或 Jira 的清晰任务交给 agent 异步推进，最后以 draft PR 形式回到人工 review。',
    bestFor: [
      'issue、Jira ticket 或 PR checklist 已经足够清晰的任务。',
      '团队默认在 GitHub / Jira / review 流里协作，而不是口头同步。',
      '可以接受异步交付，重视工作系统里的可追溯性。',
    ],
    signals: [
      '任务目标、验收标准、允许修改的目录都能写进 issue。',
      '组织已经有分支保护、PR 模板和 reviewer 机制。',
      '负责人更关心交付节奏和可追踪，而不是全程同步盯执行。',
    ],
    notFor: [
      '需要大量探索、实时讨论或反复试错的模糊问题。',
      '没有 issue hygiene，连验收标准都写不清的团队。',
      '高风险变更但无人负责最终收口的场景。',
    ],
    steps: [
      {
        name: '把 issue 写到足够可委派',
        description: '补充背景、范围、验收、禁止事项和验证命令，让任务具备异步交付条件。',
        artifact: 'ready issue',
      },
      {
        name: '发给 agent 起分支',
        description: '由平台或控制面生成分支、读取上下文、执行任务并准备 draft PR。',
        artifact: 'working branch',
      },
      {
        name: '以 draft PR 回流',
        description: '把 diff、运行结果、剩余风险和任务摘要放回 PR，而不是只给一段聊天记录。',
        artifact: 'draft PR',
      },
      {
        name: '人工 review 与 merge',
        description: '由 owner 或 reviewer 最终判断是否合并、拆分或退回。',
        artifact: 'merged or returned PR',
      },
    ],
    handoffs: [
      '任务没到“可委派”状态之前，不应该直接丢给后台 agent。',
      'draft PR 是 review 起点，不是终点，必须保留人工把关。',
      '如果 PR 暴露出需求缺失，要回到 issue 层修，而不是让 reviewer 补需求。',
    ],
    inputs: [
      'issue / Jira 链接、验收标准和禁止修改范围。',
      '分支命名、PR 模板、CI 检查和 reviewer 规则。',
      '平台权限、仓库访问和必要的环境变量声明。',
    ],
    outputs: [
      '可追踪的分支、draft PR 与执行摘要。',
      '与 issue 关联的验证结果和剩余风险说明。',
      'review 后的 merge、split 或 re-open 决策。',
    ],
    evidence: [
      'PR 描述里应能直接看到 issue、范围和验收映射。',
      '验证结果要落回 PR，而不是只存在 agent 运行面板里。',
      'review comment 需要能回指具体风险和未完成项。',
    ],
    governance: [
      '先治理 issue 模板，再扩大 agent 使用范围。',
      '异步 agent 只承接清晰任务，模糊任务仍由本地流程先收敛。',
      '所有 merge 仍遵守原有 branch protection 和 reviewer 规则。',
    ],
    risks: [
      'issue 太空，导致 agent 只能胡猜并把噪音带进 PR。',
      '团队把 draft PR 当自动合并候选，跳过真正 review。',
      '平台日志与 repo 证据分离，后续审计困难。',
    ],
    scopeReduction: [
      '先从 docs、配置和隔离模块的小任务开始委派。',
      '把大 ticket 拆成多个可独立 merge 的 issue。',
      '需要先本地探索的任务，先走 local-first 再转后台。',
    ],
    examples: [
      {
        title: 'Jira 中的已定义接口调整',
        description: 'issue 已给出字段变更、回归点和 reviewer，适合直接委派 agent 产出 draft PR。',
      },
      {
        title: '文档体系补齐与导航更新',
        description: '范围清晰、验收明确、主要通过构建和链接检查验证，适合异步交付。',
      },
    ],
    toolFit: [
      docLink('GitHub Copilot', '/docs/tools/platforms/github-copilot', '最适合把 issue、PR 和 review 串成平台闭环。'),
      docLink('VS Code Agents', '/docs/tools/control-planes/vscode-agents', '适合从本地探索转到后台分支执行。'),
      docLink('OpenAI Codex', '/docs/tools/execution-stacks/openai-codex', '适合异步长任务和多分支执行。'),
    ],
    sources: [
      source('GitHub Copilot Coding Agent', 'https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent'),
      source('GitHub Copilot for Jira', 'https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/integrate-coding-agent-with-jira'),
      source('VS Code Background Agents', 'https://code.visualstudio.com/docs/copilot/agents/background-agents'),
    ],
  },
  {
    ...base,
    id: 'local-to-background-to-cloud',
    title: 'Local -> Background -> Cloud',
    group: 'pattern',
    docsRoot: '/docs/workflows/patterns/local-to-background-to-cloud',
    officialUrl: 'https://code.visualstudio.com/docs/copilot/agents/background-agents',
    featured: false,
    audience: 'advanced',
    stage: 'intermediate',
    summary: '先在本地摸清问题和边界，再把可执行部分交给后台 agent，最后在云端或 PR 系统里收口，是复杂任务的稳妥分层。',
    bestFor: [
      '一开始还需要本地读代码、跑命令和收敛边界的复杂任务。',
      '实现阶段会比较长，适合交给后台或云端 agent 异步推进。',
      '最终仍要回到 GitHub / PR / cloud task 面板做状态管理和 review。',
    ],
    signals: [
      '本地探索和后台执行各有价值，单一入口承担全部工作会很笨重。',
      '任务存在明显阶段边界，可以把发现结果转成结构化 brief。',
      '团队接受“本地 owner + 后台执行 + 平台 review”的分工。',
    ],
    notFor: [
      '本来就很小的任务，切三层只会徒增协调成本。',
      '团队既没有后台 agent，也没有云端任务面板可用。',
      '探索和实现高度纠缠，无法切出清晰 handoff 的问题。',
    ],
    steps: [
      {
        name: '本地探索',
        description: '在本地读代码、跑命令、缩小问题面，并把发现沉淀成 brief。',
        artifact: 'discovery brief',
      },
      {
        name: '后台执行',
        description: '把已经收敛的任务交给 background agent 或云端执行环境。',
        artifact: 'background branch or task',
      },
      {
        name: '平台收口',
        description: '通过 PR、任务面板或 cloud task 查看进度、日志和 diff，准备 review。',
        artifact: 'review-ready change set',
      },
      {
        name: '最终验证',
        description: '由 owner 合并各阶段证据，完成最终判断。',
        artifact: 'final verification summary',
      },
    ],
    handoffs: [
      '本地探索阶段必须输出结构化 brief，否则后台只是在放大噪音。',
      '后台执行阶段应有清晰 owner，避免“没人知道谁该收尾”。',
      '云端面板只负责状态和审阅，不替代最终人工判断。',
    ],
    inputs: [
      '本地探索结果、风险假设和目录边界。',
      '后台任务说明、验证命令和审批规则。',
      '最终合并所需的平台检查项和 reviewer 列表。',
    ],
    outputs: [
      '本地 discovery note、后台执行结果和平台中的 review 产物。',
      '可比较的 diff、日志、验证结果和风险说明。',
      '必要时的回退计划或重试决策。',
    ],
    evidence: [
      '本地阶段要说明为什么可以交给后台，而不是继续本地执行。',
      '后台阶段要保留日志和 diff，不可只靠口头汇报。',
      '最终平台收口要把本地与后台证据合并成一页可 review 摘要。',
    ],
    governance: [
      '阶段转换要有清晰准入条件，不允许把模糊问题直接推给后台。',
      '每个阶段的权限和环境都应尽量独立，避免污染主工作区。',
      '平台层只负责追踪和 review，规则文件仍应回到仓库治理。',
    ],
    risks: [
      '本地、后台和云端三份上下文分裂，导致重复劳动。',
      '没有 owner，大家都以为下一个阶段会自动完成收尾。',
      '后台产物没有回到 PR / repo，最后审计困难。',
    ],
    scopeReduction: [
      '只把长耗时但边界清楚的部分交给后台。',
      '保持每次只切一条后台分支，不并发多条不必要的 async lane。',
      '如果 brief 不稳定，就回到 local-first，而不是强行云端化。',
    ],
    examples: [
      {
        title: '前端回归先本地复现再交后台实现',
        description: '本地先确认交互路径和快照，后台再修复和补测试，最后回到 PR review。',
      },
      {
        title: '跨仓库文档更新',
        description: '本地先明确目录与链接影响面，再把批量改动交给后台运行。',
      },
    ],
    toolFit: [
      docLink('VS Code Agents', '/docs/tools/control-planes/vscode-agents', '最适合作为本地与后台 agent 的控制面。'),
      docLink('OpenAI Codex', '/docs/tools/execution-stacks/openai-codex', '适合本地探索后转交 cloud task 或并行执行。'),
      docLink('GitHub Copilot', '/docs/tools/platforms/github-copilot', '适合最终在 PR 与 review 流里收口。'),
    ],
    sources: [
      source('VS Code Background Agents', 'https://code.visualstudio.com/docs/copilot/agents/background-agents'),
      source('OpenAI Codex App', 'https://openai.com/index/introducing-the-codex-app/'),
      source('GitHub Copilot Coding Agent', 'https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent'),
    ],
  },
  {
    ...base,
    id: 'terminal-first-repo-pairing',
    title: 'Terminal-First Repo Pairing',
    group: 'pattern',
    docsRoot: '/docs/workflows/patterns/terminal-first-repo-pairing',
    officialUrl: 'https://docs.anthropic.com/en/docs/claude-code/common-workflows',
    featured: true,
    audience: 'mixed',
    stage: 'intermediate',
    summary: '把 agent 当成仓库里的搭档，而不是网页聊天框：围绕规则文件、命令执行、diff 审阅和验证闭环工作。',
    bestFor: [
      '真实工程仓库、monorepo、脚本化任务和命令驱动型修复。',
      '希望保留 shell、git、test 和审批边界的团队。',
      '需要 agent 直接和 repo 规则、工作树、构建命令交互的任务。',
    ],
    signals: [
      '仓库已有构建、测试、脚本或 codemod 回路。',
      '团队不想把全部上下文和执行都锁在 IDE 或网页产品里。',
      '你更信命令输出和 diff，而不是一句“已经完成”。',
    ],
    notFor: [
      '高度视觉化的任务，离不开浏览器交互与人工拖拽。',
      '不愿意看命令输出、也不愿意 review diff 的使用方式。',
      '仓库没有任何脚本或验证回路，命令行只能盲改的场景。',
    ],
    steps: [
      {
        name: '读规则文件',
        description: '先读取 AGENTS.md、CLAUDE.md、GEMINI.md 或其他 repo 规则，明确边界。',
        artifact: 'task contract',
      },
      {
        name: '说明计划与权限',
        description: '先说准备怎么做、要跑哪些命令、哪里需要审批。',
        artifact: 'execution plan',
      },
      {
        name: '小步执行',
        description: '边执行边看输出，必要时中断和缩小范围。',
        artifact: 'incremental diff',
      },
      {
        name: '跑命令验证并审 diff',
        description: '完成标准来自命令结果、diff 质量和人工审阅，而不是模型自评。',
        artifact: 'verified patch',
      },
    ],
    handoffs: [
      '高风险命令、依赖变更和权限放大前必须显式审批。',
      '任何大改动都要在 diff 可读的前提下推进，不宜一次性倾倒大 patch。',
      '最终仍由人决定验证是否充分、是否值得 merge。',
    ],
    inputs: [
      '任务目标、目录范围、允许执行的命令。',
      '规则文件、审批策略、环境约束。',
      '需要保留的手工检查点，例如 UI 或数据正确性。',
    ],
    outputs: [
      '带命令证据的 patch。',
      '清晰的 diff、验证结果和剩余风险。',
      '必要时的 worktree、branch 或回滚建议。',
    ],
    evidence: [
      '命令执行记录和关键输出摘要。',
      '与规则文件一致的边界说明。',
      '最终 diff review 结论和未覆盖风险。',
    ],
    governance: [
      '先收紧权限，再逐步放开，而不是默认全放开。',
      '危险动作要显式声明，不能在执行过程中偷偷发生。',
      '工作区脏状态、已有变更和用户手改内容必须被尊重。',
    ],
    risks: [
      '把 terminal-first 当成“自动化万能入口”，忽略视觉和业务验证。',
      '权限放太大，导致 agent 顺手改出主线之外的问题。',
      '过度依赖命令成功，忽略了代码可维护性和评审质量。',
    ],
    scopeReduction: [
      '优先从只读探索、单模块修复和脚本化任务起步。',
      '高风险任务先切 worktree，再逐步放开更多命令。',
      '视觉回归和产品决策始终保留人工检查。',
    ],
    examples: [
      {
        title: '修复 monorepo 构建失败',
        description: '先读规则文件和构建脚本，再按模块缩小范围，最终用 build/test 结果收口。',
      },
      {
        title: '批量 codemod',
        description: '先 dry-run 和抽样 diff，再扩大到全仓运行，并保留回滚策略。',
      },
    ],
    toolFit: [
      docLink('Claude Code', '/docs/tools/terminal-agents/claude-code', '终端协作、规则文件和 worktree 是它的强项。'),
      docLink('OpenAI Codex', '/docs/tools/execution-stacks/openai-codex', '适合审批模式、并行 worktree 和更长的执行链。'),
      docLink('Gemini CLI', '/docs/tools/terminal-agents/gemini-cli', '适合轻量终端入口与 GitHub 流结合。'),
      docLink('Cline', '/docs/tools/terminal-agents/cline', '适合要自己控制 Plan/Act、MCP 和工具权限的人。'),
    ],
    sources: [
      source('Claude Code Common Workflows', 'https://docs.anthropic.com/en/docs/claude-code/common-workflows'),
      source('OpenAI Codex App', 'https://openai.com/index/introducing-the-codex-app/'),
      source('Gemini CLI', 'https://github.com/google-gemini/gemini-cli'),
    ],
  },
  {
    ...base,
    id: 'parallel-worktrees-multi-agent',
    title: 'Parallel Worktrees / Multi-Agent',
    group: 'pattern',
    docsRoot: '/docs/workflows/patterns/parallel-worktrees-multi-agent',
    officialUrl: 'https://openai.com/index/introducing-the-codex-app/',
    featured: true,
    audience: 'advanced',
    stage: 'advanced',
    summary: '把长任务拆成多个低耦合子任务，在独立 worktree 或独立 agent 会话中并行推进，再由 owner 收口 review。',
    bestFor: [
      '实现、测试、文档、迁移或适配器等低耦合子任务并存的长链路任务。',
      '需要利用后台 agent、并行 branch 或 worktree 来缩短等待时间的场景。',
      '团队已经有明确 owner，能控制拆分和合流顺序。',
    ],
    signals: [
      '任务可拆成多个互不踩脚的 lane，每条 lane 都有独立验证方式。',
      '组织已经接受 worktree、并行 branch 和多会话协作。',
      '你更需要并行和隔离，而不是把一个大 prompt 写得更长。',
    ],
    notFor: [
      '所有改动都集中在同一批核心文件、同一组类型定义或同一套接口上。',
      '边界还没定，拆分出来的只是多份混乱。',
      '没有统一 owner，最后没人负责冲突和收尾。',
    ],
    steps: [
      {
        name: '先拆任务',
        description: '用 spec、plan 或 owner 判断把任务拆成低耦合子任务，并定义依赖顺序。',
        artifact: 'task map',
      },
      {
        name: '按 lane 建 worktree 或 agent session',
        description: '每条 lane 独立目录、独立上下文、独立验证，避免互相污染。',
        artifact: 'isolated worktrees',
      },
      {
        name: '分别验证',
        description: '每条 lane 先在自己的边界内通过验证，再进入集成阶段。',
        artifact: 'per-lane evidence',
      },
      {
        name: 'owner 合流',
        description: '由统一 owner 按依赖顺序合并、解决冲突，并做最终回归。',
        artifact: 'integrated branch',
      },
    ],
    handoffs: [
      '拆分标准要先由 owner 定，不应让多个 agent 各自理解任务边界。',
      '每个 lane 要先完成自己的验证，再进入合流和集成测试。',
      '最终回归必须回到统一 owner，而不是让各 lane 自己宣布完成。',
    ],
    inputs: [
      '任务拆分图、依赖顺序、每条 lane 的目录范围。',
      'worktree 命名、branch 策略和合流顺序。',
      '每条 lane 的验证命令，以及最终集成验证命令。',
    ],
    outputs: [
      '独立 worktree 或 session 中的子任务结果。',
      '每条 lane 的测试/构建/说明证据。',
      '最终合流后的统一 diff 和风险总结。',
    ],
    evidence: [
      '每条 lane 都要有自己的验证证据，不能只看最终集成结果。',
      '合流阶段要明确解决了哪些冲突、保留了哪些风险。',
      '如果有子任务被放弃或延后，要明确记录而不是静默消失。',
    ],
    governance: [
      '只能并行低耦合任务；高耦合热点应回到单线程 owner 驱动。',
      '统一共享 spec 和规则文件，避免每条 lane 各自发明前提。',
      '每条 lane 的权限、命令和环境要尽量隔离。',
    ],
    risks: [
      '拆分不合理，最后在合流阶段把全部成本补回来。',
      '多个 lane 改了同一份契约，冲突比串行更高。',
      '没有 owner 统一 review，导致子任务各自都看似完成，但整体不可 merge。',
    ],
    scopeReduction: [
      '先只并行两条 lane，而不是一次开五条。',
      '把高耦合部分留给 owner 串行处理，外围任务再并行。',
      '必要时先跑一个 dry-run 合流，检验拆分是否合理。',
    ],
    examples: [
      {
        title: '实现、测试和文档三路并行',
        description: '功能实现、回归测试和文档更新分别在独立 worktree 推进，最后统一集成。',
      },
      {
        title: '迁移脚本与适配器分 lane',
        description: '迁移脚本一条 lane，运行时适配器一条 lane，集成测试最后统一跑。',
      },
    ],
    toolFit: [
      docLink('OpenAI Codex', '/docs/tools/execution-stacks/openai-codex', '并行 task 与 worktree 是它最强的场景之一。'),
      docLink('Claude Code', '/docs/tools/terminal-agents/claude-code', '官方 common workflows 已明确 worktree 并行。'),
      docLink('VS Code Agents', '/docs/tools/control-planes/vscode-agents', '适合把后台 agent 和本地 owner 组合起来。'),
      docLink('Superpowers', '/docs/workflows/community-frameworks/superpowers', '适合把 worktree、subagent、TDD 和 review 固化成日常习惯。'),
    ],
    sources: [
      source('OpenAI Codex App', 'https://openai.com/index/introducing-the-codex-app/'),
      source('Claude Code Common Workflows', 'https://docs.anthropic.com/en/docs/claude-code/common-workflows'),
      source('VS Code Background Agents', 'https://code.visualstudio.com/docs/copilot/agents/background-agents'),
    ],
  },
  {
    ...base,
    id: 'bmad',
    title: 'BMAD',
    group: 'framework',
    docsRoot: '/docs/workflows/frameworks/bmad',
    officialUrl: 'https://github.com/bmad-code-org/BMAD-METHOD',
    featured: true,
    audience: 'advanced',
    stage: 'advanced',
    summary: 'BMAD 更像团队级交付骨架：用多角色、多阶段和明确 handoff 组织完整的软件交付，而不是只给一个 spec 模板。',
    bestFor: [
      '平台团队、多人协作团队和需要显式 handoff 的中大型任务。',
      '希望把 PM、架构、开发、测试、复盘都纳入一条持续流程的组织。',
      '愿意维护角色职责、阶段产物和流程纪律的团队。',
    ],
    signals: [
      '单个任务经常跨多个阶段，且需要不同角色或职责面参与。',
      '团队想把 AI 产物升级为制度化交付，而不是只靠个人 prompt 技巧。',
      '你需要的不是更短 prompt，而是更稳的交接与治理。',
    ],
    notFor: [
      '纯个人、小 bug 或一天内即可完成的任务。',
      '还没有基本验证门禁，却想直接上最重流程的团队。',
      '没有人愿意维护角色定义和产物目录的仓库。',
    ],
    roles: [
      'Sponsor / Owner：定义业务目标和决策边界。',
      'Analyst / PM：把需求拆成明确问题、范围和故事。',
      'Architect：给出实现边界、关键技术判断和风险。',
      'Implementation Agent / Engineer：执行任务并回传证据。',
      'QA / Reviewer：做验证、风险检查和最终质量把关。',
    ],
    stages: [
      {
        name: '发现与目标对齐',
        description: '先让业务目标、问题定义和范围边界稳定下来。',
        artifact: 'brief 或目标说明',
      },
      {
        name: '需求与故事拆解',
        description: '把抽象需求转成可交付的故事、任务或 sprint 输入。',
        artifact: 'PRD / stories',
      },
      {
        name: '架构与实施准备',
        description: '明确技术方案、约束、依赖和验证计划。',
        artifact: 'architecture / plan',
      },
      {
        name: '执行与验证',
        description: '按故事或任务推进实现，并同步测试与 review。',
        artifact: 'implementation evidence',
      },
      {
        name: '复盘与沉淀',
        description: '把失败模式、经验和流程调整写回体系。',
        artifact: 'retro / checklist update',
      },
    ],
    artifacts: [
      'brief、PRD、architecture note、stories、task board。',
      '验证清单、review 结论和复盘记录。',
      '与仓库规则文件配套的审批、验证和风险说明。',
    ],
    handoffs: [
      '从需求到架构，再到执行和 QA，都强调显式交接而不是口头理解。',
      '每个阶段结束时都应产生可 review 的文档或检查单。',
      '角色可以由同一人兼任，但交付边界仍应保留。',
    ],
    entry: '先在一个中等复杂度、至少跨两个阶段的任务里试跑，而不是拿最小 bug 或最大平台重构做第一次试点。',
    adoption: [
      '先把 BMAD 输出映射到你仓库现有的文档和任务目录，不要另起一套孤立宇宙。',
      '定义哪些阶段必须停下等待人工确认，哪些阶段可以继续由 agent 推进。',
      '把验证命令、评审清单和 repo 规则接进每个阶段，而不是让 BMAD 独立漂浮。',
      '先跑 2 到 4 个真实故事，再根据返工与 review 成本收敛流程。',
    ],
    integration: [
      'BMAD 负责角色与阶段，仓库规则负责权限、可编辑区域和验证门禁。',
      '长任务建议配合 worktree 和 issue / story 编号，减少上下文混乱。',
      '最终合并仍回到 repo 的 CI、review 和 branch protection 体系。',
    ],
    alternatives: [
      docLink('Spec Kit', '/docs/workflows/frameworks/spec-kit', '如果你主要缺的是 spec -> plan -> tasks 的产物链，Spec Kit 更轻。'),
      docLink('OpenSpec', '/docs/workflows/frameworks/openspec', '如果你主要是 brownfield 的高频小改动，OpenSpec 更省维护成本。'),
      docLink('Superpowers', '/docs/workflows/community-frameworks/superpowers', '如果你需要的是日常 agent 操作框架，而不是团队角色制度，Superpowers 更贴近日常执行。'),
    ],
    comboPatterns: [
      docLink('Spec-First', '/docs/workflows/patterns/spec-first', '大多数 BMAD 任务最终都应落回先定边界、再执行的主线。'),
      docLink('Parallel Worktrees / Multi-Agent', '/docs/workflows/patterns/parallel-worktrees-multi-agent', '在故事清晰后再把低耦合子任务并行化。'),
    ],
    misuse: [
      '把每个角色都做成独立官僚流程，导致执行速度被自己压垮。',
      '只有文档 handoff，没有把验证命令和 review 证据接进流程。',
      '明明是小改动，却强行走完整多阶段流程。',
    ],
    maintenanceCosts: [
      '角色说明、模板和故事拆解规则需要持续维护。',
      '需要有人负责流程纪律和产物目录整洁度。',
      '如果团队规模变化，角色数量与阶段深度也要及时收缩。',
    ],
    exitSignals: [
      '产物越来越多，但没有人按这些产物决策。',
      '故事拆解和真实代码执行长期脱节。',
      '团队为了绕开流程，不断在仓库外另起聊天或手工补活。',
    ],
    sources: [
      source('BMAD Method', 'https://github.com/bmad-code-org/BMAD-METHOD'),
    ],
  },
  {
    ...base,
    id: 'spec-kit',
    title: 'Spec Kit',
    group: 'framework',
    docsRoot: '/docs/workflows/frameworks/spec-kit',
    officialUrl: 'https://github.com/github/spec-kit',
    featured: true,
    audience: 'mixed',
    stage: 'intermediate',
    summary: 'Spec Kit 更像规格与计划产物链：用 spec、plan、tasks 先把需求和实施拆开，再交给 agent 或工程师执行。',
    bestFor: [
      '新功能、跨模块变更和容易跑偏的复杂任务。',
      '需要先对齐目标和验收，但不想引入完整多角色制度的团队。',
      '希望把 planning 产物标准化，又保留现有 repo 治理方式的组织。',
    ],
    signals: [
      '需求经常在实现阶段漂移，导致 review 只剩“补需求”。',
      '你需要的是清晰 spec 和 task 拆解，而不是更多角色。',
      '团队已经有 repo 规则和 CI，只差一个 planning 主线。',
    ],
    notFor: [
      '单点小修、紧急事故或一次性探索任务。',
      '完全没有人 review spec 与 plan，只想直接“生成代码”。',
      '需要多角色制度、复盘和流程治理的更重场景。',
    ],
    roles: [
      'Request Owner：定义目标、非目标和验收条件。',
      'Planner：把 spec 补成可执行计划与任务拆解。',
      'Implementer：按照任务包推进实现和验证。',
      'Reviewer：对照 spec 与 evidence 判断是否通过。',
    ],
    stages: [
      {
        name: '写 spec',
        description: '明确目标、非目标、范围、约束和验收标准。',
        artifact: 'spec',
      },
      {
        name: '写 plan',
        description: '结合仓库现状确定实现方案、依赖和风险。',
        artifact: 'plan',
      },
      {
        name: '拆 tasks',
        description: '把 plan 切成可执行、可验证的任务块。',
        artifact: 'tasks',
      },
      {
        name: '执行与验证',
        description: '按任务推进代码改动，并回到 spec 验收。',
        artifact: 'verification summary',
      },
    ],
    artifacts: [
      'spec、plan、tasks 三级产物。',
      '与任务对应的命令、验证结果和范围变更说明。',
      '必要时的后续拆分或 deferred items。',
    ],
    handoffs: [
      'spec 先过，再进入 plan；plan 先过，再进入 tasks。',
      'tasks 是执行入口，不应该重新定义需求。',
      'review 最终回到 spec 与验收标准，而不是只谈代码风格。',
    ],
    entry: '先挑一个本来就需要设计与实现分开的新功能，验证 spec -> plan -> tasks 是否能减少返工。',
    adoption: [
      '把你仓库现有的目录边界、验证命令和可编辑范围嵌进 spec / plan 模板。',
      '不要让 tasks 脱离 repo 实际上下文，应在读完代码后再拆。',
      '要求最终交付对照 spec 做验收映射，避免 planning 文档与实现脱节。',
      '试跑 2 到 3 次后，再决定是否扩展到更多任务类型。',
    ],
    integration: [
      'Spec Kit 可以与现有 contract、branch policy、review checklist 直接拼接。',
      '如果团队已经使用 issue / PR 工作系统，可把 spec 链接或摘要放回 ticket。',
      '长任务可在 tasks 阶段再接 worktree 或后台 agent。',
    ],
    alternatives: [
      docLink('BMAD', '/docs/workflows/frameworks/bmad', '需要多角色和更完整治理时，BMAD 更合适。'),
      docLink('OpenSpec', '/docs/workflows/frameworks/openspec', '如果主要是 brownfield 高频小改动，OpenSpec 更轻。'),
      docLink('Superpowers', '/docs/workflows/community-frameworks/superpowers', '如果你更缺日常 agent 操作框架而不是 spec 链，Superpowers 更贴近执行。'),
    ],
    comboPatterns: [
      docLink('Spec-First', '/docs/workflows/patterns/spec-first', 'Spec Kit 最自然的落点就是 spec-first。'),
      docLink('Local -> Background -> Cloud', '/docs/workflows/patterns/local-to-background-to-cloud', 'plan 定稿后可把部分任务交给后台或云端执行。'),
    ],
    misuse: [
      '把 spec 写成空洞大词，导致 plan 和 tasks 仍然无从落地。',
      '在没看 repo 的情况下就生成 tasks，最后返工更多。',
      '把 Spec Kit 当成文档模板，而不是执行与验收合同。',
    ],
    maintenanceCosts: [
      '模板、示例和任务拆解标准需要持续优化。',
      '需要有人判断 spec 到底写到多深才合适。',
      '任务复杂度变化后，模板也要跟着收缩或扩展。',
    ],
    exitSignals: [
      'spec 与 plan 长期被跳过，团队直接回到临场 prompt。',
      'tasks 无法对应真实仓库边界，执行始终要重做规划。',
      'review 已经不再参考 spec，说明链路失效。',
    ],
    sources: [
      source('GitHub Spec Kit', 'https://github.com/github/spec-kit'),
    ],
  },
  {
    ...base,
    id: 'openspec',
    title: 'OpenSpec',
    group: 'framework',
    docsRoot: '/docs/workflows/frameworks/openspec',
    officialUrl: 'https://github.com/openspec-ai/openspec',
    featured: true,
    audience: 'mixed',
    stage: 'intermediate',
    summary: 'OpenSpec 更像轻量变更管理层：用 proposal、change 和 archive 管理 brownfield 项目的高频改动，不强行引入太重流程。',
    bestFor: [
      '现有项目、brownfield 场景和高频小改动。',
      '需要显式记录变更原因，但又不想引入太多角色和阶段的团队。',
      '想把 proposal 与最终实现、归档记录连接起来的组织。',
    ],
    signals: [
      '团队高频处理小功能、增量优化、兼容调整和迭代型改动。',
      '需要追踪“为什么改”，但 spec-first 的完整产物链过重。',
      '现有 repo 治理还算稳定，只缺一层轻量 proposal 记录。',
    ],
    notFor: [
      '大范围新功能、跨团队项目或多角色治理型任务。',
      '没有人愿意维护 archive，最后 proposal 堆成坟场的团队。',
      '把 proposal 当成测试与 review 的替代品的使用方式。',
    ],
    roles: [
      'Requester：提出变更需求和业务背景。',
      'Proposer：把需求转成 proposal 与 change set。',
      'Implementer：按 proposal 执行代码与验证。',
      'Approver：确认 proposal 是否值得进入实现与归档。',
    ],
    stages: [
      {
        name: '提 proposal',
        description: '先说明为什么要改、改什么、不改什么。',
        artifact: 'proposal',
      },
      {
        name: '形成 change set',
        description: '把 proposal 转成具体改动包与依赖说明。',
        artifact: 'change set',
      },
      {
        name: '执行与验证',
        description: '在实现阶段对照 proposal 做最小变更。',
        artifact: 'implemented change',
      },
      {
        name: 'archive',
        description: '把结果、结论和后续处理归档，保留变更历史。',
        artifact: 'archive record',
      },
    ],
    artifacts: [
      'proposal、change、archive 三段式记录。',
      '与 PR 或任务系统可关联的轻量变化说明。',
      '适合 brownfield 语境的最小验证与决策证据。',
    ],
    handoffs: [
      'proposal 先确认，再执行 change，不要让实现反推需求。',
      'archive 不是可选装饰，而是让后续团队知道这个改动为什么存在。',
      '所有轻量流程最终仍要回到测试、review 和 branch policy。',
    ],
    entry: '从高频的现有项目迭代开始，先验证 OpenSpec 是否比完整 spec 链更贴近真实成本。',
    adoption: [
      '为 repo 选一处统一 proposal / archive 目录，避免散落在 issue、PR 和聊天记录里。',
      '让 proposal 模板只保留最关键字段，不要一上来复刻完整 PRD。',
      '用 bugfix / refactor / test 模板承接执行阶段，保持轻重分层。',
      '定期清理 archive，确保历史记录是可检索资产而不是噪音。',
    ],
    integration: [
      'OpenSpec 负责说明为什么改和如何归档，repo 规则负责说明怎么验证和谁能 merge。',
      'proposal ID 可以直接映射到 issue、PR 或 release note。',
      '如果需求升级成更复杂 feature，应及时切换到 Spec Kit 或 BMAD，而不是硬撑。',
    ],
    alternatives: [
      docLink('Spec Kit', '/docs/workflows/frameworks/spec-kit', '当你需要更完整的 spec 与 plan 链时，Spec Kit 更合适。'),
      docLink('BMAD', '/docs/workflows/frameworks/bmad', '当任务跨角色跨阶段时，BMAD 更能承载治理。'),
      docLink('Superpowers', '/docs/workflows/community-frameworks/superpowers', '当你要的是 agent 每天如何执行，而不是 proposal 管理层时，Superpowers 更直接。'),
    ],
    comboPatterns: [
      docLink('Bugfix / Refactor / Test', '/docs/workflows/patterns/bugfix-refactor-test', 'OpenSpec 很适合承接高频维护型变化。'),
      docLink('Issue / Jira -> Draft PR', '/docs/workflows/patterns/issue-to-draft-pr', 'proposal 通过后，可直接进入异步 PR 流程。'),
    ],
    misuse: [
      '任何小 typo 都走 proposal，流程负担立刻超过收益。',
      'archive 永远不清理，导致没人再愿意看历史。',
      'proposal 写了很多，但实现和验证仍然全靠临场发挥。',
    ],
    maintenanceCosts: [
      'proposal 模板与 archive 目录需要持续修剪。',
      '需要有人判断哪些变化值得进入 OpenSpec，哪些不值得。',
      '如果没有与 PR 和验证命令联动，就会变成孤立文档堆。',
    ],
    exitSignals: [
      'proposal 数量越来越多，但 merge 时没人再回看。',
      '团队开始用 OpenSpec 包装大项目，最后流程既轻不下去也重不起来。',
      'archive 没有检索价值，成员只好回到聊天记录找上下文。',
    ],
    sources: [
      source('OpenSpec', 'https://github.com/openspec-ai/openspec'),
    ],
  },
  {
    ...base,
    id: 'superpowers',
    title: 'Superpowers',
    group: 'community-framework',
    docsRoot: '/docs/workflows/community-frameworks/superpowers',
    officialUrl: 'https://github.com/obra/superpowers',
    featured: true,
    audience: 'advanced',
    stage: 'advanced',
    summary: 'Superpowers 是面向 coding agents 的社区工作流框架：把 brainstorming、worktree、plan、subagent、TDD 和 review 串成一条日常执行方法链。',
    bestFor: [
      '已经高频使用 Claude Code、Codex、Cursor 等 agent 的团队或个人。',
      '希望把日常 agent 协作方式标准化，而不是每次手工拼 prompt。',
      '接受 worktree、技能库和更强执行纪律的终端或 IDE power user。',
    ],
    signals: [
      '团队已经熟悉 coding agents，但产出波动仍然很大，缺少统一套路。',
      '你需要的是“每天怎么做事”的方法框架，而不是仅仅一个 spec 模板。',
      '愿意为技能、worktree、TDD 和 review 付出维护成本，换取稳定性。',
    ],
    notFor: [
      '还没有任何 repo 规则或验证习惯的团队。',
      '只想找一个轻量 planning 模板，不想引入 skills 与阶段纪律的人。',
      '组织只接受厂商官方方案，不愿采用社区框架的场景。',
    ],
    roles: [
      'Owner / Operator：选择任务、决定范围并负责最后收口。',
      'Planner：把 brainstorming 结果整理成 plan 与 lane。',
      'Executor / Subagent：按 plan 在 worktree 或子任务里推进实现。',
      'Reviewer：核对测试、diff、review packet 和 branch 完成状态。',
    ],
    stages: [
      {
        name: 'Brainstorming',
        description: '先把问题理解、方案选项和拆分方式讲清，不急着直接改代码。',
        artifact: 'brainstorm note',
      },
      {
        name: 'Worktree / Branch Setup',
        description: '为长任务或并行 lane 准备独立工作区和命名约定。',
        artifact: 'task worktrees',
      },
      {
        name: 'Writing Plans',
        description: '把方案固化为分步计划、执行清单和风险说明。',
        artifact: 'plan',
      },
      {
        name: 'Subagent / Execution',
        description: '根据 plan 分配子任务，逐步执行并汇总结果。',
        artifact: 'execution lanes',
      },
      {
        name: 'TDD / Review / Finish Branch',
        description: '用测试、review packet 和 branch 清理收尾，保证可 merge。',
        artifact: 'review-ready branch',
      },
    ],
    artifacts: [
      'brainstorm note、计划、worktree 结构和任务清单。',
      '按 lane 组织的执行证据、测试结果和 review packet。',
      '完成分支后的收尾说明与后续待办。',
    ],
    handoffs: [
      '先 brainstorming 和 plan，再开多条 lane；不要直接让多个 agent 胡乱开工。',
      '每个 lane 要把测试和 review 证据带回 owner，而不是只说“我做完了”。',
      'Finish branch 阶段要收掉临时工作区、整理总结并准备 merge。',
    ],
    entry: '在一个已有 repo 规则和固定验证命令的仓库里试跑，让 Superpowers 先叠加在现有工具之上，而不是替代全部治理。',
    adoption: [
      '先确定主入口工具，再决定哪些 Superpowers 能力通过 skills、rules 或 repo contract 承接。',
      '把 worktree 命名、测试要求和 review packet 变成团队共识，不要只留在个人习惯里。',
      '先从一两个长任务试点，观察是否真的降低返工和上下文丢失。',
      '把与 repo 相关的强约束仍然放回 AGENTS.md / CLAUDE.md / GEMINI.md，而不是全压在社区框架里。',
    ],
    integration: [
      'Superpowers 更像方法层，可叠加在 Claude Code、Codex、Cursor 等主入口之上。',
      '与 Spec Kit 结合时，可先用 spec 固定边界，再用 Superpowers 管理执行节奏。',
      '与 GitHub / PR 系统结合时，最终仍要把证据回流到 branch、PR 和 review。',
    ],
    alternatives: [
      docLink('BMAD', '/docs/workflows/frameworks/bmad', '如果你需要团队角色和阶段制度，BMAD 更适合组织治理。'),
      docLink('Spec Kit', '/docs/workflows/frameworks/spec-kit', '如果你主要想固定 spec -> plan -> tasks，Spec Kit 更直接。'),
      docLink('OpenSpec', '/docs/workflows/frameworks/openspec', '如果你主要是 brownfield 小改动管理，OpenSpec 更轻。'),
    ],
    comboPatterns: [
      docLink('Agent Skills 与插件生态', '/docs/ai-directory/agent-skills-and-plugins', '把 Superpowers 放到 skills、插件市场与方法包的公共目录里一起比较。'),
      docLink('Terminal-First Repo Pairing', '/docs/workflows/patterns/terminal-first-repo-pairing', 'Superpowers 很适合叠加在终端式 repo pairing 上。'),
      docLink('Parallel Worktrees / Multi-Agent', '/docs/workflows/patterns/parallel-worktrees-multi-agent', '它把 worktree 和 subagent 使用方式标准化。'),
      docLink('Spec-First', '/docs/workflows/patterns/spec-first', '复杂任务可先 spec-first，再交给 Superpowers 组织日常执行。'),
    ],
    misuse: [
      '装了框架却没有 repo 规则、测试门禁和 owner，最后只剩复杂 ritual。',
      '过度并行 subagent，导致 owner 无法解释每条 lane 在做什么。',
      '跳过 TDD 和 review，只保留“skills 很多”的表面热闹。',
    ],
    maintenanceCosts: [
      '技能、模板和工作约定需要持续同步到团队真实做法。',
      '需要有人负责 worktree、plan 和 review packet 的最小标准。',
      '如果工具入口切换，Superpowers 的接入方式也要调整。',
    ],
    exitSignals: [
      '团队已经完全绕开它，回到各自 improvisation。',
      '大家能说出技能名，但说不出每个阶段产出什么。',
      '框架维护成本高于它带来的返工下降和节奏稳定收益。',
    ],
    sources: [
      source('Superpowers', 'https://github.com/obra/superpowers'),
      source('Superpowers Marketplace', 'https://github.com/obra/superpowers-marketplace'),
    ],
  },
]);

export const workflowCatalogByGroup = workflowGroups.map((group) => ({
  ...group,
  items: workflowCatalog.filter((item) => item.group === group.id),
}));
