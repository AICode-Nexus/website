import {access, mkdir, readdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const workspaceRoot = path.resolve(__dirname, '../../..');

export function formatIsoDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date value: ${value}`);
  }
  return date.toISOString().slice(0, 10);
}

export function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith('--')) {
      continue;
    }

    const trimmed = token.slice(2);
    if (trimmed.includes('=')) {
      const [key, ...rest] = trimmed.split('=');
      args[key] = rest.join('=');
      continue;
    }

    const next = argv[index + 1];
    if (!next || next.startsWith('--')) {
      args[trimmed] = true;
      continue;
    }

    args[trimmed] = next;
    index += 1;
  }

  return args;
}

function parseArray(value) {
  const inner = value.slice(1, -1).trim();
  if (!inner) {
    return [];
  }

  return inner
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => stripQuotes(item));
}

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function parseValue(rawValue) {
  const value = rawValue.trim();
  if (value === '') {
    return '';
  }
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  if (value.startsWith('[') && value.endsWith(']')) {
    return parseArray(value);
  }
  if (/^-?\d+$/.test(value)) {
    return Number.parseInt(value, 10);
  }
  return stripQuotes(value);
}

export function parseFrontMatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/u);
  if (!match) {
    return {data: {}, body: source};
  }

  const data = {};
  match[1]
    .split(/\r?\n/u)
    .forEach((line) => {
      if (!line.trim() || line.trim().startsWith('#')) {
        return;
      }
      const separatorIndex = line.indexOf(':');
      if (separatorIndex === -1) {
        return;
      }
      const key = line.slice(0, separatorIndex).trim();
      const rawValue = line.slice(separatorIndex + 1);
      data[key] = parseValue(rawValue);
    });

  return {
    data,
    body: source.slice(match[0].length),
  };
}

function formatScalar(value) {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  if (typeof value === 'number') {
    return String(value);
  }
  const stringValue = String(value);
  if (/^[A-Za-z0-9._/-]+$/u.test(stringValue)) {
    return stringValue;
  }
  return JSON.stringify(stringValue);
}

export function serializeFrontMatter(data) {
  const lines = Object.entries(data)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        const serializedItems = value.map((item) => formatScalar(item)).join(', ');
        return `${key}: [${serializedItems}]`;
      }
      return `${key}: ${formatScalar(value)}`;
    });

  return `---\n${lines.join('\n')}\n---\n`;
}

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/gu, '-')
    .replace(/^-+|-+$/gu, '')
    .replace(/-{2,}/gu, '-');
}

export function extractHeadings(body) {
  return body
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => /^##\s+/u.test(line))
    .map((line) => line.replace(/^##\s+/u, '').trim());
}

export function splitSections(body) {
  const lines = body.split(/\r?\n/u);
  const sections = new Map();
  let current = null;

  lines.forEach((line) => {
    const headingMatch = line.match(/^##\s+(.+)$/u);
    if (headingMatch) {
      current = headingMatch[1].trim();
      sections.set(current, []);
      return;
    }

    if (current) {
      sections.get(current).push(line);
    }
  });

  return new Map(
    Array.from(sections.entries()).map(([title, sectionLines]) => [title, sectionLines.join('\n').trim()]),
  );
}

export function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/gu, ' ')
    .replace(/`[^`]*`/gu, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/gu, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/gu, '$1')
    .replace(/^>\s+/gmu, '')
    .replace(/[#*_~>-]/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
}

export function hasMarkdownLink(value) {
  return /\[[^\]]+\]\([^)]*\)/u.test(value);
}

export async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function ensureDirForFile(filePath) {
  await mkdir(path.dirname(filePath), {recursive: true});
}

export async function writeTextFile(filePath, value) {
  await ensureDirForFile(filePath);
  await writeFile(filePath, value, 'utf8');
}

export async function readJson(filePath) {
  const content = await readFile(filePath, 'utf8');
  return JSON.parse(content);
}

export async function listMarkdownFiles(directoryPath) {
  const results = [];
  const entries = await readdir(directoryPath, {withFileTypes: true});

  for (const entry of entries) {
    const entryPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await listMarkdownFiles(entryPath)));
      continue;
    }

    if (/\.(md|mdx)$/u.test(entry.name)) {
      results.push(entryPath);
    }
  }

  return results.sort((left, right) => left.localeCompare(right, 'zh-CN'));
}

export async function readMarkdownDocument(filePath) {
  const source = await readFile(filePath, 'utf8');
  const {data, body} = parseFrontMatter(source);
  return {
    filePath,
    source,
    frontMatter: data,
    body,
    headings: extractHeadings(body),
    plainText: stripMarkdown(body),
    sections: splitSections(body),
  };
}

export function inferDateFromFileName(filePath) {
  const fileName = path.basename(filePath);
  const match = fileName.match(/^(\d{4}-\d{2}-\d{2})-/u);
  return match ? match[1] : null;
}

export function mondayForDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid weekly date: ${value}`);
  }

  const weekday = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() - weekday + 1);
  return formatIsoDate(date);
}

export function addDays(value, days) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date for addDays: ${value}`);
  }
  date.setUTCDate(date.getUTCDate() + days);
  return formatIsoDate(date);
}
