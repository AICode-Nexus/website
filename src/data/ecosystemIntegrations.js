const ECOSYSTEM_INTEGRATIONS = [
  {
    id: 'github-copilot',
    label: 'GitHub Copilot',
    legacyHref: '/docs/tools/platforms/github-copilot/integration-review-governance',
    href: '/docs/ecosystem/integrations/github-copilot',
  },
  {
    id: 'vscode-agents',
    label: 'VS Code Agents',
    legacyHref: '/docs/tools/control-planes/vscode-agents/integration-review-governance',
    href: '/docs/ecosystem/integrations/vscode-agents',
  },
  {
    id: 'openai-codex',
    label: 'OpenAI Codex',
    legacyHref: '/docs/tools/execution-stacks/openai-codex/integration-review-governance',
    href: '/docs/ecosystem/integrations/openai-codex',
  },
  {
    id: 'claude-code',
    label: 'Claude Code',
    legacyHref: '/docs/tools/terminal-agents/claude-code/integration-review-governance',
    href: '/docs/ecosystem/integrations/claude-code',
  },
  {
    id: 'gemini-cli',
    label: 'Gemini CLI',
    legacyHref: '/docs/tools/terminal-agents/gemini-cli/integration-review-governance',
    href: '/docs/ecosystem/integrations/gemini-cli',
  },
  {
    id: 'cline',
    label: 'Cline',
    legacyHref: '/docs/tools/terminal-agents/cline/integration-review-governance',
    href: '/docs/ecosystem/integrations/cline',
  },
  {
    id: 'cursor',
    label: 'Cursor',
    legacyHref: '/docs/tools/ide-first/cursor/integration-review-governance',
    href: '/docs/ecosystem/integrations/cursor',
  },
  {
    id: 'windsurf',
    label: 'Windsurf',
    legacyHref: '/docs/tools/ide-first/windsurf/integration-review-governance',
    href: '/docs/ecosystem/integrations/windsurf',
  },
];

function getEcosystemIntegrationByToolId(toolId) {
  return ECOSYSTEM_INTEGRATIONS.find((item) => item.id === toolId) ?? null;
}

module.exports = {
  ECOSYSTEM_INTEGRATIONS,
  getEcosystemIntegrationByToolId,
};
