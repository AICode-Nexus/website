import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {workspaceRoot} from './lib/content-utils.mjs';

const PROMPTS_DIR = path.join(workspaceRoot, 'scripts', 'content', 'prompts');

const MAX_RETRIES = 2;
const DEFAULT_MODEL = 'claude-sonnet-4-20250514';
const DEFAULT_MAX_TOKENS = 4096;
const DEFAULT_TEMPERATURE = 0.3;

async function loadPrompt(name) {
  const filePath = path.join(PROMPTS_DIR, `${name}.md`);
  return readFile(filePath, 'utf8');
}

function createClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return null;
  }

  // Dynamic import to avoid hard failure when SDK is not available in CI
  return import('@anthropic-ai/sdk').then(({default: Anthropic}) => new Anthropic({apiKey}));
}

function extractJson(text) {
  // Try parsing the whole text first
  try {
    return JSON.parse(text);
  } catch {
    // Look for JSON block in markdown code fence
    const match = text.match(/```(?:json)?\s*\n([\s\S]*?)\n```/u);
    if (match) {
      return JSON.parse(match[1]);
    }

    // Try to find first { ... } block
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end > start) {
      return JSON.parse(text.slice(start, end + 1));
    }

    throw new Error('No valid JSON found in LLM response');
  }
}

export async function llmGenerate({promptName, userMessage, model, maxTokens, temperature}) {
  const client = await createClient();
  if (!client) {
    console.warn('ANTHROPIC_API_KEY not set — skipping LLM generation');
    return null;
  }

  const systemPrompt = await loadPrompt(promptName);

  let lastError;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await client.messages.create({
        model: model || DEFAULT_MODEL,
        max_tokens: maxTokens || DEFAULT_MAX_TOKENS,
        temperature: temperature ?? DEFAULT_TEMPERATURE,
        system: systemPrompt,
        messages: [{role: 'user', content: userMessage}],
      });

      const text = response.content
        .filter((block) => block.type === 'text')
        .map((block) => block.text)
        .join('');

      return extractJson(text);
    } catch (error) {
      lastError = error;
      if (attempt < MAX_RETRIES) {
        const delay = 1000 * (attempt + 1);
        console.warn(`LLM call attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw new Error(`LLM generation failed after ${MAX_RETRIES + 1} attempts: ${lastError?.message}`);
}

export async function generateDailyBriefContent(manifest) {
  const input = {
    date: manifest.date,
    signals: (manifest.signals ?? []).map((signal) => ({
      title: signal.title,
      summary: signal.summary,
      tags: signal.tags,
      source: signal.source,
    })),
  };

  return llmGenerate({
    promptName: 'daily-brief',
    userMessage: JSON.stringify(input, null, 2),
  });
}

export async function generateWeeklyRoundupContent({weekStart, weekEnding, dailyBriefs}) {
  const input = {weekStart, weekEnding, dailyBriefs};

  return llmGenerate({
    promptName: 'weekly-roundup',
    userMessage: JSON.stringify(input, null, 2),
  });
}

export async function generateArticleContent({topic, domain, contentForm, signals, existingDocs}) {
  const input = {topic, domain, contentForm, signals, existingDocs};

  return llmGenerate({
    promptName: 'article-writer',
    userMessage: JSON.stringify(input, null, 2),
    maxTokens: 8192,
  });
}
