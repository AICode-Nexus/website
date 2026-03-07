import {defineToolCatalog} from '../utils/handbookCatalog.mjs';

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

export const toolGroups = [
  {
    id: 'platforms',
    title: '平台型工具',
    description: '把 issue、PR、review、任务系统和 coding agent 接进同一平台的入口。',
  },
  {
    id: 'control-planes',
    title: '控制面',
    description: '统一调度本地 agent、后台 agent、浏览器和扩展能力的工作台。',
  },
  {
    id: 'execution-stacks',
    title: '执行栈',
    description: '强调任务执行、审批、隔离环境和并行 worktree 的主入口。',
  },
  {
    id: 'terminal-agents',
    title: '终端 Agent',
    description: '围绕 shell、repo 规则、命令验证和 worktree 组织日常开发的入口。',
  },
  {
    id: 'ide-first',
    title: 'IDE-First',
    description: '把规则、编辑体验、后台 agent 和工作区上下文打包进 IDE 或工作台。',
  },
];

export const toolCatalog = defineToolCatalog([
  {
    ...base,
    id: 'github-copilot',
    title: 'GitHub Copilot',
    category: 'platforms',
    docsRoot: '/docs/tools/platforms/github-copilot',
    officialUrl: 'https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent',
    featured: true,
    audience: 'mixed',
    stage: 'intermediate',
    summary: 'GitHub Copilot 更像 GitHub-first 的平台入口：把 issue、PR、review、coding agent 和 Jira 集成收在一个工作系统里。',
    role: '平台型主入口，强项是把任务系统、代码评审和异步交付连接起来。',
    bestFor: [
      'GitHub-first 团队、平台负责人和默认在 PR / review 里协作的工程组织。',
      '已经使用 issue、PR、branch protection 和 reviewer 流程的团队。',
      '希望把 agent 直接接入工作系统，而不是只停留在本地 IDE。 ',
    ],
    workflows: [
      docLink('Issue / Jira -> Draft PR', '/docs/workflows/patterns/issue-to-draft-pr', 'GitHub Copilot 天然适合把清晰任务委派成 draft PR。'),
      docLink('Local -> Background -> Cloud', '/docs/workflows/patterns/local-to-background-to-cloud', '适合在平台层追踪异步执行和最终 review。'),
      docLink('Bugfix / Refactor / Test', '/docs/workflows/patterns/bugfix-refactor-test', '对已有 issue 与 PR 模板的日常维护任务尤其顺手。'),
    ],
    badFit: [
      '纯本地终端深潜、重脚本化和高频 worktree 操作的仓库内协作。',
      '几乎不在 GitHub PR 流里协作的团队。',
      '需要高度开放 provider、自定义 MCP 和工具编排的高级用户。',
    ],
    combos: [
      docLink('VS Code Agents', '/docs/tools/control-planes/vscode-agents', '本地控制面与 GitHub 平台形成前后端分工。'),
      docLink('OpenAI Codex', '/docs/tools/execution-stacks/openai-codex', '长任务可在执行栈里推进，最后回到 GitHub 收口。'),
      docLink('Spec Kit', '/docs/workflows/frameworks/spec-kit', '适合把 spec 或 task 摘要附着在 issue / PR 流里。'),
    ],
    typicalTasks: [
      '从 issue 或 Jira 委派清晰任务并生成 draft PR。',
      '在 review comment 往返中让 agent 修改代码或补说明。',
      '以平台身份统一管理多个 repo 的日常 AI 交付流程。',
    ],
    rules: [
      '优先把 issue 模板、PR 模板、branch policy 和 repo 指令当成平台规则源头。',
      '平台层的自定义说明应该服务于 repo 规则，而不是覆盖 repo 合同。',
      '当组织开始用 memory 或 coding agent 指令时，仍需明确谁能修改这些默认规则。',
    ],
    memory: [
      '平台更适合保存工作系统上下文，例如 issue、PR、review、Jira 状态。',
      '个体偏好可以交给平台记忆，但仓库级规则仍应版本化在 repo 内。',
    ],
    tools: [
      '强项在 GitHub issue、PR、review、branch 与外部工单系统集成。',
      '不应该把它当成 shell-first 的主入口，而应把本地执行交给更合适的工具。',
    ],
    repoAdvice: [
      '先把 issue 模板、PR checklist 和 branch protection 写清，再扩大 coding agent 使用范围。',
      '在 repo 里固定好验证命令和 reviewer 规则，平台只负责承接这些制度。',
      '如果平台 agent 产物无法回流到 PR 描述或检查结果，就不要扩大使用。',
    ],
    integrations: [
      'GitHub Issues、Pull Requests、Reviews、branch protections。',
      'Jira 集成与任务追踪。',
      '与本地控制面或执行栈的组合使用。',
    ],
    reviewEvidence: [
      'draft PR 描述、运行结果、linked issue 和 reviewer comment 应成为主要证据载体。',
      '不要把“平台面板里显示成功”当成唯一完成标准。',
    ],
    governance: [
      '平台可以放大团队效率，也会放大 issue hygiene 差的问题。',
      'merge 规则、审批边界和 reviewer 责任不应因为有 agent 而放松。',
    ],
    strengths: [
      '最接近组织已有 GitHub 工作系统。',
      '异步委派与 review 闭环天然强。',
      '适合团队级 rollout 和可追溯治理。',
    ],
    limits: [
      '对本地终端深潜、复杂 worktree 和自定义工具编排不如执行栈或终端 agent 灵活。',
      '如果团队并不以 GitHub 为核心协作系统，平台优势会明显下降。',
    ],
    alternatives: [
      docLink('VS Code Agents', '/docs/tools/control-planes/vscode-agents', '如果你更需要 editor 控制面。'),
      docLink('OpenAI Codex', '/docs/tools/execution-stacks/openai-codex', '如果你更需要并行执行与 worktree。'),
      docLink('Claude Code', '/docs/tools/terminal-agents/claude-code', '如果你更需要 terminal-first repo pairing。'),
    ],
    exitSignals: [
      '团队越来越多地绕过 GitHub 工作系统，在别处交付和 review。',
      '平台 agent 产物无法提供足够的 repo 证据与验证记录。',
      '真正困难的任务总要回退到其他入口，本平台只剩外围补位。',
    ],
    sources: [
      source('GitHub Copilot Coding Agent', 'https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent'),
      source('GitHub Copilot for Jira', 'https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/integrate-coding-agent-with-jira'),
    ],
  },
  {
    ...base,
    id: 'vscode-agents',
    title: 'VS Code Agents',
    category: 'control-planes',
    docsRoot: '/docs/tools/control-planes/vscode-agents',
    officialUrl: 'https://code.visualstudio.com/docs/copilot/agents/overview',
    featured: true,
    audience: 'mixed',
    stage: 'intermediate',
    summary: 'VS Code Agents 更像统一控制面：把本地 agent、background agents、第三方 agent 和编辑器工具能力收进一个工作台。',
    role: '控制面，擅长在本地探索、后台执行和编辑器内审阅之间切换。',
    bestFor: [
      '已经把 VS Code 作为主编辑器的团队。',
      '希望把本地 agent、background agents 和浏览器工具放在同一控制面里的人。',
      '需要 editor-first 体验，但又不想放弃后台执行和第三方 agent 的组织。',
    ],
    workflows: [
      docLink('Local -> Background -> Cloud', '/docs/workflows/patterns/local-to-background-to-cloud', '这是 VS Code Agents 最自然的主线。'),
      docLink('Bugfix / Refactor / Test', '/docs/workflows/patterns/bugfix-refactor-test', '本地修复与后台补跑结合得比较顺。'),
      docLink('Spec-First', '/docs/workflows/patterns/spec-first', '适合先在本地规划，再把明确任务交给后台。'),
    ],
    badFit: [
      '纯终端文化团队，不愿意依赖编辑器控制面。',
      '想要 GitHub 平台即入口，而不是 editor 先行的组织。',
      '只需轻量 CLI 助手，不需要本地/后台统一调度的场景。',
    ],
    combos: [
      docLink('GitHub Copilot', '/docs/tools/platforms/github-copilot', 'GitHub 负责平台闭环，VS Code 负责本地控制面。'),
      docLink('OpenAI Codex', '/docs/tools/execution-stacks/openai-codex', '用 VS Code 作为可视化控制面，Codex 负责更深执行。'),
      docLink('Superpowers', '/docs/workflows/community-frameworks/superpowers', '需要把计划、worktree 和 review ritual 固化时可以叠加。'),
    ],
    typicalTasks: [
      '在本地读代码、起草方案，然后发给 background agent 继续执行。',
      '结合终端、浏览器和编辑器 diff 做交互式修复。',
      '用统一工作台接入第三方 agent 或 MCP 风格工具。',
    ],
    rules: [
      '编辑器级工作区配置应与 repo 规则相互对照，而不是成为第二套事实来源。',
      '当团队启用 custom agents 或 reusable prompts 时，仍要明确职责归属。',
      '本地与后台 agent 共享的任务合同最好回写到仓库或工单，而不是只留在会话里。',
    ],
    memory: [
      '编辑器会保留会话上下文和 background task 状态，但 repo 级长期规则仍应版本化。',
      '适合承载“当前任务”与“当前工作区”的短中期状态。',
    ],
    tools: [
      '编辑器内代码理解、diff、终端和 background agents 是主要优势。',
      '第三方 agents 与扩展机制让它更像控制面，而不是单一 vendor agent。',
    ],
    repoAdvice: [
      '把常用验证命令、任务模板和目录边界写回仓库文件，减少 editor 特有配置漂移。',
      '背景任务必须有 owner 和 handoff 规则，不能把编辑器当异步黑盒。',
      '视觉验证、浏览器操作和终端验证最好有固定时机，不要混成一锅。 ',
    ],
    integrations: [
      '本地 agent、background agents 和第三方 agents。',
      '编辑器内终端、浏览器工具和 diff 评审。',
      '可与 GitHub 平台或终端执行栈组合。',
    ],
    reviewEvidence: [
      '背景任务摘要、编辑器内 diff、命令结果和最终 PR 说明应形成一套完整证据。',
      '不要只因为 editor 里看起来顺，就跳过平台 review。',
    ],
    governance: [
      '需要定义本地与后台 agent 的职责边界，以及何时必须升级到人工审批。',
      '统一控制面会提升效率，也会把不清晰的任务定义放大得更快。',
    ],
    strengths: [
      '本地与后台结合自然。',
      'editor-first 团队迁移成本低。',
      '适合混合多种 agent 能力。',
    ],
    limits: [
      '如果团队不以 VS Code 为中心，控制面价值会明显下降。',
      '它不是 GitHub 平台，也不是最深的执行栈，常需要和其他入口配合。',
    ],
    alternatives: [
      docLink('GitHub Copilot', '/docs/tools/platforms/github-copilot', '如果你更需要平台入口与异步 PR 闭环。'),
      docLink('Cursor', '/docs/tools/ide-first/cursor', '如果你想把 editor-first 体验做得更深、更产品化。'),
      docLink('OpenAI Codex', '/docs/tools/execution-stacks/openai-codex', '如果你更需要长任务执行与 worktree 能力。'),
    ],
    exitSignals: [
      '团队无法统一在 VS Code 上协作。',
      '真正的复杂任务仍然需要大量切换到终端或平台，控制面没有形成价值闭环。',
      'background agent 产物长期无人收口。',
    ],
    sources: [
      source('VS Code Agents Overview', 'https://code.visualstudio.com/docs/copilot/agents/overview'),
      source('VS Code Background Agents', 'https://code.visualstudio.com/docs/copilot/agents/background-agents'),
    ],
  },
  {
    ...base,
    id: 'openai-codex',
    title: 'OpenAI Codex',
    category: 'execution-stacks',
    docsRoot: '/docs/tools/execution-stacks/openai-codex',
    officialUrl: 'https://openai.com/index/introducing-the-codex-app/',
    featured: true,
    audience: 'mixed',
    stage: 'advanced',
    summary: 'OpenAI Codex 更像执行栈：围绕本地 CLI、云端任务、审批模式、隔离环境和并行 worktree 组织长链路执行。',
    role: '执行栈，强项是把复杂任务拆成可执行、可并行、可审阅的任务流。',
    bestFor: [
      '长任务、并行分支、隔离 worktree 和需要后台执行的团队。',
      '想保留本地 repo pairing，又希望把部分任务交给云端或后台环境的人。',
      '重视审批模式、任务日志和执行证据，而不是只要聊天回答的组织。',
    ],
    workflows: [
      docLink('Terminal-First Repo Pairing', '/docs/workflows/patterns/terminal-first-repo-pairing', 'Codex CLI 很适合作为终端内的主执行入口。'),
      docLink('Parallel Worktrees / Multi-Agent', '/docs/workflows/patterns/parallel-worktrees-multi-agent', '它天然适合并行 worktree 与多任务分治。'),
      docLink('Local -> Background -> Cloud', '/docs/workflows/patterns/local-to-background-to-cloud', '本地探索、后台执行和平台收口都能承接。'),
    ],
    badFit: [
      '只需要轻量 IDE 补全或聊天，不需要执行链与审批模式。',
      '团队完全不愿意维护 repo 规则和 command evidence。',
      '工作主要发生在纯平台 review 层，本地执行价值不大。',
    ],
    combos: [
      docLink('Spec Kit', '/docs/workflows/frameworks/spec-kit', 'Spec Kit 提供清晰 planning，Codex 负责执行和验证。'),
      docLink('Superpowers', '/docs/workflows/community-frameworks/superpowers', '需要把 worktree、plan、subagent 和 TDD 串起来时尤其合拍。'),
      docLink('GitHub Copilot', '/docs/tools/platforms/github-copilot', 'GitHub 收口 PR 与 review，Codex 负责执行层。'),
    ],
    typicalTasks: [
      '长链路重构、并行子任务、跨模块实现与验证。',
      '本地探索后转交 cloud task 持续执行。',
      '需要审批模式和命令证据的 repo 级改动。',
    ],
    rules: [
      'AGENTS.md 或等价 repo 指令文件应先把权限、目录边界和验证命令讲清。',
      '执行栈越强，越需要明确哪些动作必须审批、哪些可以自动继续。',
      '如果 planning 来自外部框架，必须让 Codex 的任务合同能直接引用这些产物。',
    ],
    memory: [
      '适合承接任务级上下文、执行摘要和阶段性状态。',
      '长期团队规则仍应回到 repo 文件，而不是只留在任务运行上下文中。',
    ],
    tools: [
      '本地 CLI、云端任务、并行 agent、worktree、审批模式。',
      '可与 IDE 控制面、GitHub 平台和 MCP 拓扑组合。',
    ],
    repoAdvice: [
      '先写好 repo 指令和审批策略，再放开长任务执行。',
      '默认使用 worktree 或隔离环境承接并行 lane，避免污染主工作区。',
      '每次任务都应留下命令证据、diff 摘要和未覆盖风险。',
    ],
    integrations: [
      '本地 CLI、云端任务面板、IDE 与 GitHub 衔接。',
      '适合与 issue / PR / spec 框架并用。',
      '可接入工具与 MCP 拓扑，但规则源头仍应落在仓库。',
    ],
    reviewEvidence: [
      '任务日志、命令输出、diff 摘要和最终验证说明都是核心证据。',
      '只看“任务已完成”状态远远不够，必须回到 repo 证据。',
    ],
    governance: [
      '执行能力强的工具会放大 repo 边界不清的问题。',
      '并行 lane 必须由 owner 管控，不能让多 agent 各自冲向主分支。',
    ],
    strengths: [
      '长任务与并行执行能力强。',
      '审批模式和执行证据意识明确。',
      '适合 worktree、隔离环境和云端任务协作。',
    ],
    limits: [
      '对仅需轻量编辑器交互的用户可能过重。',
      '如果团队没有 repo contract，执行栈会很快失控。',
    ],
    alternatives: [
      docLink('Claude Code', '/docs/tools/terminal-agents/claude-code', '如果你更偏向轻量 terminal-first pairing。'),
      docLink('VS Code Agents', '/docs/tools/control-planes/vscode-agents', '如果你更需要 editor 控制面和 background agents。'),
      docLink('GitHub Copilot', '/docs/tools/platforms/github-copilot', '如果你更需要平台工作系统而不是执行栈。'),
    ],
    exitSignals: [
      '团队真正依赖的只有聊天和补全，执行链几乎不用。',
      'owner 无法解释每个任务到底跑了什么命令、改了什么东西。',
      '并行与后台能力带来的协调成本超过收益。',
    ],
    sources: [
      source('OpenAI Codex App', 'https://openai.com/index/introducing-the-codex-app/'),
      source('OpenAI Codex Upgrades', 'https://openai.com/index/codex-upgrades/'),
    ],
  },
  {
    ...base,
    id: 'claude-code',
    title: 'Claude Code',
    category: 'terminal-agents',
    docsRoot: '/docs/tools/terminal-agents/claude-code',
    officialUrl: 'https://docs.anthropic.com/en/docs/claude-code/overview',
    featured: true,
    audience: 'mixed',
    stage: 'intermediate',
    summary: 'Claude Code 是典型的 terminal-first repo pairing 入口：强调 CLAUDE.md、common workflows、命令验证和 worktree 协作。',
    role: '终端主入口，适合把仓库规则、计划、执行和命令验证放在一条清晰回路里。',
    bestFor: [
      '后端、基础设施、monorepo 和脚本化仓库。',
      '愿意把规则文件、目录边界和验证命令版本化到仓库的人。',
      '想让 agent 真正成为 repo 内的搭档，而不是 IDE 辅助气泡的团队。',
    ],
    workflows: [
      docLink('Terminal-First Repo Pairing', '/docs/workflows/patterns/terminal-first-repo-pairing', '这几乎就是 Claude Code 的默认工作姿势。'),
      docLink('Parallel Worktrees / Multi-Agent', '/docs/workflows/patterns/parallel-worktrees-multi-agent', '官方 common workflows 已经把 worktree 并行写成主线。'),
      docLink('Bugfix / Refactor / Test', '/docs/workflows/patterns/bugfix-refactor-test', '命令驱动和验证回路尤其适合高频维护任务。'),
    ],
    badFit: [
      '完全不想看 shell、diff 和命令输出的团队。',
      '工作大量依赖可视化拖拽或浏览器人工操作的任务。',
      '希望把 GitHub 平台工作系统当作唯一入口的组织。',
    ],
    combos: [
      docLink('Superpowers', '/docs/workflows/community-frameworks/superpowers', '如果你想把 brainstorming、plan、worktree、TDD 和 review ritual 固定下来。'),
      docLink('Spec Kit', '/docs/workflows/frameworks/spec-kit', '复杂 feature 先用 spec 固定边界，再回到 Claude Code 执行。'),
      docLink('GitHub Copilot', '/docs/tools/platforms/github-copilot', '本地终端执行与 GitHub PR 收口形成分工。'),
    ],
    typicalTasks: [
      'repo 读代码、跑脚本、修构建、补测试和做小步重构。',
      '在独立 worktree 里推进长任务或并行子任务。',
      '围绕规则文件和审批边界做高控制开发。',
    ],
    rules: [
      'CLAUDE.md 是长期资产，适合写 repo 结构、命令、边界和审批要求。',
      '如果团队还有 AGENTS.md / GEMINI.md 等文件，需要明确职责而不是互相覆盖。',
      '规则文件越清楚，Claude Code 的稳定性越高。',
    ],
    memory: [
      'CLAUDE.md 与会话上下文一起组成主要记忆层。',
      '团队共识应尽量回到版本化文件，而不是只留在个人 session 里。',
    ],
    tools: [
      'shell、git、worktree、MCP 和命令执行。',
      '适合作为 repo 内的高控制主入口。',
    ],
    repoAdvice: [
      '先写最小 CLAUDE.md，再决定是否扩展更多流程。',
      '高风险任务先切 worktree，再放开更多权限。',
      '所有最终交付都要附带命令证据和 diff 摘要。',
    ],
    integrations: [
      '终端、git、worktree、MCP。',
      '可与 GitHub review、Spec Kit、Superpowers 等方法层叠加。',
      '适合做本地 owner，再把结果回流到 PR 系统。',
    ],
    reviewEvidence: [
      '命令执行记录、root cause / plan 说明和最终 diff 是主要证据。',
      '如果只剩一段对话，没有命令和验证结果，说明流程没有落地。',
    ],
    governance: [
      'terminal-first 最大价值来自边界控制，不是自动化本身。',
      '计划、执行、验证和审批必须有清晰顺序，不能混在同一次输出里。',
    ],
    strengths: [
      'terminal-first 体验稳。',
      '规则文件、worktree 和验证意识强。',
      '很适合严谨的 repo pairing。',
    ],
    limits: [
      '对纯 IDE 或平台型团队不一定是最顺手的入口。',
      '视觉检查与工作系统集成通常需要和其他工具搭配。',
    ],
    alternatives: [
      docLink('OpenAI Codex', '/docs/tools/execution-stacks/openai-codex', '如果你更需要更强执行栈和云端任务。'),
      docLink('Gemini CLI', '/docs/tools/terminal-agents/gemini-cli', '如果你更倾向轻量终端入口和 GitHub 结合。'),
      docLink('VS Code Agents', '/docs/tools/control-planes/vscode-agents', '如果你更依赖 editor 控制面与 background agents。'),
    ],
    exitSignals: [
      '团队不愿维护规则文件，也不愿看 diff 和命令输出。',
      '高频任务都转到平台或 IDE，终端入口只剩边缘用途。',
      'repo pairing 价值不如维护成本。',
    ],
    sources: [
      source('Claude Code Overview', 'https://docs.anthropic.com/en/docs/claude-code/overview'),
      source('Claude Code Common Workflows', 'https://docs.anthropic.com/en/docs/claude-code/common-workflows'),
      source('CLAUDE.md Memory File', 'https://docs.anthropic.com/en/docs/claude-code/memory#claude-md'),
    ],
  },
  {
    ...base,
    id: 'gemini-cli',
    title: 'Gemini CLI',
    category: 'terminal-agents',
    docsRoot: '/docs/tools/terminal-agents/gemini-cli',
    officialUrl: 'https://github.com/google-gemini/gemini-cli',
    featured: true,
    audience: 'mixed',
    stage: 'intermediate',
    summary: 'Gemini CLI 把终端入口、context files 和自动化脚本结合在一起，适合做 GitHub 友好的 terminal-first 补位入口。',
    role: '轻量终端入口，重点在 repo context files、命令执行和与 GitHub 流的兼容性。',
    bestFor: [
      '已经有 GitHub review 流，但还想补一个 terminal-first 入口的团队。',
      '想把上下文文件版本化到仓库，又不想一上来引入太重框架的人。',
      '希望把本地 CLI 与自动化脚本放进同一链路的人。',
    ],
    workflows: [
      docLink('Terminal-First Repo Pairing', '/docs/workflows/patterns/terminal-first-repo-pairing', 'Gemini CLI 适合做轻量终端入口。'),
      docLink('Bugfix / Refactor / Test', '/docs/workflows/patterns/bugfix-refactor-test', '本地修复和命令验证是它的主战场。'),
      docLink('Issue / Jira -> Draft PR', '/docs/workflows/patterns/issue-to-draft-pr', '和 GitHub review 流搭配时比较顺手。'),
    ],
    badFit: [
      '需要很强后台 agent 编排和 worktree 并行的长任务。',
      '团队完全不想维护 context file 或脚本化验证。',
      '希望一个产品同时承担平台、控制面和执行栈全部角色的人。',
    ],
    combos: [
      docLink('GitHub Copilot', '/docs/tools/platforms/github-copilot', 'Gemini CLI 做本地终端入口，GitHub 负责 PR 与 review。'),
      docLink('Spec Kit', '/docs/workflows/frameworks/spec-kit', 'Spec 定稿后可用 Gemini CLI 接手执行与验证。'),
      docLink('Superpowers', '/docs/workflows/community-frameworks/superpowers', '需要更重的日常操作方法时可以叠加。'),
    ],
    typicalTasks: [
      '终端里的 bugfix、重构、脚本运行和 repo 巡检。',
      '把规则文件、命令验证和 GitHub review 拼成双入口组合。',
      '让 AI 入口与自动化脚本共用一套上下文文件。',
    ],
    rules: [
      'GEMINI.md 或等价 context files 是它进入 repo 的主要长期资产。',
      '这些 context files 应该只写 repo 级规则，不要把一次性任务说明也长期固化进去。',
      '如果仓库里同时存在多种指令文件，必须定义它们的职责边界。',
    ],
    memory: [
      '更偏向 repo context files 和当前任务上下文，而不是复杂的长期个体记忆。',
      '适合把稳定规则版本化，而不是让用户每次重述。',
    ],
    tools: [
      '终端命令、仓库上下文文件和脚本化任务。',
      '更适合与 GitHub/CI 组合，而不是单独承担全部工作流。',
    ],
    repoAdvice: [
      '先写一版最小 GEMINI.md，只保留目录边界、验证命令和禁止事项。',
      '保持 context files 简洁，否则很快变成无人维护的大块说明。',
      '把验证命令写成脚本，减少不同终端入口之间的语义漂移。',
    ],
    integrations: [
      'GitHub review 流、CI 脚本和 repo context files。',
      '适合作为终端入口补位，不必强行承担平台职责。',
    ],
    reviewEvidence: [
      '命令输出、context file 更新和 PR 说明应一起出现。',
      '如果 CLI 行为没有回流到 repo 证据，review 仍然会很痛苦。',
    ],
    governance: [
      '规则文件一旦版本化，就要指定 owner，防止不同人按不同风格膨胀。',
      '终端 agent 只能在验证命令足够稳定时规模化使用。',
    ],
    strengths: [
      '终端入口轻量、上手快。',
      'context files 很适合版本化。',
      '和 GitHub review 流容易形成稳妥组合。',
    ],
    limits: [
      '后台执行和并行编排能力不如执行栈或控制面重工具。',
      '如果团队完全不走终端或脚本，优势很难体现。',
    ],
    alternatives: [
      docLink('Claude Code', '/docs/tools/terminal-agents/claude-code', '如果你更看重 repo pairing、worktree 和规则文件沉淀。'),
      docLink('OpenAI Codex', '/docs/tools/execution-stacks/openai-codex', '如果你更需要并行任务和云端执行。'),
      docLink('GitHub Copilot', '/docs/tools/platforms/github-copilot', '如果你更想以平台工作系统为中心。'),
    ],
    exitSignals: [
      'CLI 只被用来聊天，不再真正跑命令和回传证据。',
      'GEMINI.md 长期失修，和真实仓库边界脱节。',
      '复杂任务总要换到其他入口，Gemini CLI 只剩演示用途。',
    ],
    sources: [
      source('Gemini CLI', 'https://github.com/google-gemini/gemini-cli'),
      source('Gemini CLI Context Files', 'https://google-gemini.github.io/gemini-cli/docs/cli/configuration/#context-files'),
    ],
  },
  {
    ...base,
    id: 'cline',
    title: 'Cline',
    category: 'terminal-agents',
    docsRoot: '/docs/tools/terminal-agents/cline',
    officialUrl: 'https://docs.cline.bot/core-workflows/plan-and-act',
    featured: false,
    audience: 'advanced',
    stage: 'advanced',
    summary: 'Cline 是开放式 agent 壳层：围绕 Plan / Act、MCP、browser automation 和 checkpoints 提供高度可组合的执行能力。',
    role: '开放式终端/agent 外壳，适合要自己拼工作流、模型和工具权限的高级用户。',
    bestFor: [
      '重视开放性、MCP、浏览器自动化和 provider 可替换性的用户。',
      '想自己控制 Plan / Act、checkpoint、工具权限和外部模型的人。',
      '愿意承担更高配置成本，换取更大组合空间的团队。',
    ],
    workflows: [
      docLink('Terminal-First Repo Pairing', '/docs/workflows/patterns/terminal-first-repo-pairing', '在高控制 shell 环境里很自然。'),
      docLink('Bugfix / Refactor / Test', '/docs/workflows/patterns/bugfix-refactor-test', '配合 Plan / Act 和 checkpoints 适合迭代修复。'),
      docLink('Parallel Worktrees / Multi-Agent', '/docs/workflows/patterns/parallel-worktrees-multi-agent', '若团队已有外部 orchestration，可作为开放式执行壳。'),
    ],
    badFit: [
      '只想要产品化完整体验，不想自己拼装模型、rules 和工具的人。',
      '团队更重视统一治理而不是开放扩展的组织。',
      '没有人能维护 provider、MCP 与权限配置的仓库。',
    ],
    combos: [
      docLink('Continue Rules', '/docs/tools/ai-ide-landscape', '开放栈通常不只看 Cline，还要看 rules 与模型配置生态。'),
      docLink('Superpowers', '/docs/workflows/community-frameworks/superpowers', '当你想在开放壳层上再叠加一套日常操作方法时很有帮助。'),
      docLink('OpenAI Codex', '/docs/tools/execution-stacks/openai-codex', '部分团队会把 Cline 留作开放实验入口，把 Codex 留作正式执行栈。'),
    ],
    typicalTasks: [
      'Plan / Act 交替的长任务推进。',
      'MCP 重度场景、浏览器自动化或外部 provider 实验。',
      '需要 checkpoints 与回滚意识的开放式 agent 工作流。',
    ],
    rules: [
      '开放性越强，越需要你自己定义 repo contract、权限边界和停止条件。',
      '最好把关键规则收回仓库文件，避免全靠客户端配置。',
      '对同一个团队，不宜让每个人都维护完全不同的规则集。',
    ],
    memory: [
      'checkpoint、会话状态和工具配置是主要状态层。',
      '更适合实验和高度可组合场景，不天然提供统一组织记忆层。',
    ],
    tools: [
      'Plan / Act、browser automation、MCP、checkpoint。',
      '强项是开放组合，而不是默认流程治理。',
    ],
    repoAdvice: [
      '先定义哪些任务允许用开放式工具，哪些必须走更稳的标准入口。',
      '高风险改动建议强制 worktree 和 checkpoint，避免开放栈误伤主工作区。',
      '把 provider 与工具权限管理当成正式治理问题，而不是个人偏好。',
    ],
    integrations: [
      'MCP 服务器、浏览器自动化、外部模型和自定义工具。',
      '可与 repo rules、GitHub review 和外部 orchestration 结合。',
    ],
    reviewEvidence: [
      'checkpoint、工具调用结果、diff 和验证命令都需要保留。',
      '开放式工具尤其不能只靠一句“我做完了”。',
    ],
    governance: [
      'Cline 的风险不在能力不够，而在开放能力很容易超过团队治理能力。',
      '只有把边界、权限和验证写清，开放栈才会变成优势。',
    ],
    strengths: [
      '开放、可组合、MCP 与自动化能力强。',
      '适合高级用户试验新的 agent 工具链。',
    ],
    limits: [
      '团队统一 rollout 难度高。',
      '默认体验不如更产品化的平台或 IDE 入口收敛。',
    ],
    alternatives: [
      docLink('Windsurf', '/docs/tools/ide-first/windsurf', '如果你更想要整合好的工作台体验。'),
      docLink('Cursor', '/docs/tools/ide-first/cursor', '如果你更偏向成熟 IDE-first 体验。'),
      docLink('Claude Code', '/docs/tools/terminal-agents/claude-code', '如果你更想要终端式但更稳的 repo pairing。'),
    ],
    exitSignals: [
      '团队无法统一 tool permission 与 provider 配置。',
      '大多数正式任务仍回到其他更标准化的入口。',
      '开放性带来的维护负担超过实验收益。',
    ],
    sources: [
      source('Cline Plan & Act', 'https://docs.cline.bot/core-workflows/plan-and-act'),
      source('Cline Checkpoints', 'https://docs.cline.bot/core-workflows/checkpoints'),
      source('Cline MCP Overview', 'https://docs.cline.bot/mcp/mcp-overview'),
    ],
  },
  {
    ...base,
    id: 'cursor',
    title: 'Cursor',
    category: 'ide-first',
    docsRoot: '/docs/tools/ide-first/cursor',
    officialUrl: 'https://docs.cursor.com/en/background-agents',
    featured: true,
    audience: 'individual',
    stage: 'intermediate',
    summary: 'Cursor 是打磨很深的 IDE-first 入口：把编辑体验、rules、background agents 和上下文管理组合成主开发环境。',
    role: 'IDE-first 主入口，强项是高频交互式编辑与逐步扩展到 background agents。',
    bestFor: [
      '默认长期在 IDE 中工作、重视编辑体验的个人工程师或小团队。',
      '想把 rules、context 和 background agents 收进一个日常主入口的人。',
      '需要较强交互式编辑体验，同时又想有 agent 能力的组织。',
    ],
    workflows: [
      docLink('Bugfix / Refactor / Test', '/docs/workflows/patterns/bugfix-refactor-test', 'Cursor 很适合高频迭代和小步修复。'),
      docLink('Local -> Background -> Cloud', '/docs/workflows/patterns/local-to-background-to-cloud', '适合本地编辑与 background agents 组合。'),
      docLink('Spec-First', '/docs/workflows/patterns/spec-first', '轻中型 spec-first 任务可以在 IDE 内先规划再执行。'),
    ],
    badFit: [
      '团队核心协作都在 GitHub 平台，不需要 IDE 作为主入口。',
      '纯终端或强脚本文化团队。',
      '更看重开放 provider 与工具编排，而不是 IDE 体验的人。',
    ],
    combos: [
      docLink('Superpowers', '/docs/workflows/community-frameworks/superpowers', '当你想在 Cursor 之上再固定 daily workflow 和 review ritual。'),
      docLink('GitHub Copilot', '/docs/tools/platforms/github-copilot', 'GitHub 负责 PR / review，Cursor 负责日常编辑入口。'),
      docLink('Spec Kit', '/docs/workflows/frameworks/spec-kit', 'Spec / plan 先固定，再回 IDE 做执行。'),
    ],
    typicalTasks: [
      '高频重构、交互式编辑、局部修复和 background agents。',
      '需要在 IDE 中保持较低上下文切换成本的日常任务。',
      '对规则和编辑器体验都比较敏感的个人工作流。',
    ],
    rules: [
      '`.cursor/rules` 适合放入口专用规则，但仓库级真实边界仍应有统一来源。',
      '不要把所有团队制度都塞进 IDE 规则里，避免入口切换后失效。',
      '最好定义哪些规则是个人偏好，哪些是团队必须遵守的 contract。',
    ],
    memory: [
      '规则、上下文和 background agent 状态是核心状态层。',
      '更适合承载 IDE 使用习惯和当前任务上下文，不适合替代 repo 规则文件。',
    ],
    tools: [
      'IDE 编辑、rules、background agents。',
      '适合高频主入口，而不是唯一平台或唯一执行栈。',
    ],
    repoAdvice: [
      '把 repo contract 与 `.cursor/rules` 分层管理，避免同一规则写两遍且互相打架。',
      'background agent 的验收要回到 PR、测试和 repo 证据里。',
      '如果团队多人共用 Cursor，最好定规则目录和命名约定。',
    ],
    integrations: [
      'IDE 工作流、background agents、rules。',
      '常与 GitHub review 或终端验证结合。',
    ],
    reviewEvidence: [
      'background agent 摘要、diff、测试结果和最终 PR 说明缺一不可。',
      '只看 IDE 内成功提示，不足以替代 repo 级验证。',
    ],
    governance: [
      'Cursor 很适合个人提效，但团队 rollout 时必须明确 rules ownership。',
      'editor-first 很容易把流程藏在界面里，需主动回写 repo 规则和证据。',
    ],
    strengths: [
      'IDE 体验成熟。',
      'rules 与 background agents 结合自然。',
      '适合作为个人或小团队的长期主入口。',
    ],
    limits: [
      '不是 GitHub-first 平台。',
      '开放度和执行栈深度不如 Cline / Codex 这类工具。',
    ],
    alternatives: [
      docLink('VS Code Agents', '/docs/tools/control-planes/vscode-agents', '如果你想保留 VS Code 生态与控制面。'),
      docLink('Windsurf', '/docs/tools/ide-first/windsurf', '如果你更偏好更整合的 workspace 工作流。'),
      docLink('Cline', '/docs/tools/terminal-agents/cline', '如果你更重视开放工具壳层而非 IDE 体验。'),
    ],
    exitSignals: [
      '团队规则越来越依赖 Cursor 私有配置，导致入口一换就断。',
      '长任务和平台协作长期要切回其他工具。',
      'background agents 产物难以纳入统一治理。',
    ],
    sources: [
      source('Cursor Background Agents', 'https://docs.cursor.com/en/background-agents'),
      source('Cursor Rules', 'https://docs.cursor.com/context/rules'),
    ],
  },
  {
    ...base,
    id: 'windsurf',
    title: 'Windsurf',
    category: 'ide-first',
    docsRoot: '/docs/tools/ide-first/windsurf',
    officialUrl: 'https://docs.windsurf.com/windsurf/cascade/agents-md',
    featured: true,
    audience: 'individual',
    stage: 'intermediate',
    summary: 'Windsurf 更像一套整合好的 workspace：把 Cascade、memories、rules、AGENTS.md 发现和模型管理组合成产品化工作流。',
    role: '集成式工作台，适合想把规则、记忆、模型和 IDE 体验收进一个产品的人。',
    bestFor: [
      '想要比较完整的 workspace 体验，而不是只拼装一个编辑器插件的用户。',
      '需要把 memories、rules、AGENTS.md 和模型选择放在统一产品里的团队。',
      '在意工作流产品化，而不是极致开放配置的工程师。',
    ],
    workflows: [
      docLink('Bugfix / Refactor / Test', '/docs/workflows/patterns/bugfix-refactor-test', '集成式工作台很适合高频维护任务。'),
      docLink('Local -> Background -> Cloud', '/docs/workflows/patterns/local-to-background-to-cloud', '适合在工作台内维持多步骤任务连续性。'),
      docLink('Parallel Worktrees / Multi-Agent', '/docs/workflows/patterns/parallel-worktrees-multi-agent', '与 Cascade 和记忆机制结合时适合更长任务。'),
    ],
    badFit: [
      '团队完全偏终端或需要最大开放度与自定义度。',
      '只想要轻量 IDE 补位，不需要一体化 workspace 的人。',
      '组织协作核心已经完全迁移到 GitHub 平台，不需要额外工作台层。',
    ],
    combos: [
      docLink('Superpowers', '/docs/workflows/community-frameworks/superpowers', '当你想在 Windsurf 之上加一层方法论与 lane discipline。'),
      docLink('GitHub Copilot', '/docs/tools/platforms/github-copilot', 'Windsurf 负责日常 workspace，GitHub 负责最终 review 闭环。'),
      docLink('OpenSpec', '/docs/workflows/frameworks/openspec', '高频 brownfield 变化可用 OpenSpec 管理提案层。'),
    ],
    typicalTasks: [
      '基于 rules 和记忆的连续式 IDE 工作流。',
      '需要模型切换、workspace 上下文和 AGENTS.md 发现的任务。',
      '适合以产品化方式管理日常 AI coding 的工程师。',
    ],
    rules: [
      'Windsurf 会发现 AGENTS.md，也有自己的 memories / rules 体系。',
      '最好把 repo 级事实边界固定在公共文件里，再让产品内规则做入口补充。',
      '如果同时使用多套规则来源，必须明确优先级和 owner。',
    ],
    memory: [
      'Cascade memories 与 workspace 记忆是它的重要差异点。',
      '这类记忆适合承接工作台连续性，但不应替代 repo 级契约。',
    ],
    tools: [
      '工作台、memories、rules、模型管理、AGENTS.md 发现。',
      '偏向整合好的体验，而不是开放式壳层。',
    ],
    repoAdvice: [
      '把 AGENTS.md 和 Windsurf 内部 rules 分层管理，减少产品切换成本。',
      'memory 应服务于任务连续性，不要承载唯一业务知识源。',
      '团队 rollout 时要明确谁负责维护 memories 与规则治理。',
    ],
    integrations: [
      'workspace、memories、rules、AGENTS.md discovery。',
      '可与 GitHub review、repo 规则和外部框架结合。',
    ],
    reviewEvidence: [
      'session summary、diff、命令结果和最终 PR 说明都应保留。',
      '工作台里的顺滑体验不能替代 repo 证据和人工 merge 判断。',
    ],
    governance: [
      '一体化体验会降低摩擦，但也容易让规则和记忆藏在产品内。',
      '团队级使用时必须处理 memory hygiene、rules precedence 和 owner 问题。',
    ],
    strengths: [
      '工作台体验整合度高。',
      'AGENTS.md、rules 和记忆组合有明显产品化优势。',
      '适合连续式 IDE 工作流。',
    ],
    limits: [
      '开放可组合性不如 Cline。',
      '平台与执行栈能力仍要靠其他入口补位。',
    ],
    alternatives: [
      docLink('Cursor', '/docs/tools/ide-first/cursor', '如果你更重视成熟 IDE-first 体验与 background agents。'),
      docLink('Cline', '/docs/tools/terminal-agents/cline', '如果你更想完全控制开放工具栈。'),
      docLink('VS Code Agents', '/docs/tools/control-planes/vscode-agents', '如果你更希望保留 VS Code 作为统一控制面。'),
    ],
    exitSignals: [
      '团队无法解释 memories、rules 与 repo contract 的边界。',
      '入口一换，关键工作流就断。',
      '真正复杂任务仍主要依赖外部平台或执行栈。',
    ],
    sources: [
      source('Windsurf AGENTS.md Discovery', 'https://docs.windsurf.com/windsurf/cascade/agents-md'),
      source('Windsurf Memories', 'https://docs.windsurf.com/windsurf/cascade/memories'),
      source('Windsurf Cascade', 'https://docs.windsurf.com/windsurf/cascade/cascade'),
    ],
  },
]);

export const toolCatalogByGroup = toolGroups.map((group) => ({
  ...group,
  items: toolCatalog.filter((item) => item.category === group.id),
}));
