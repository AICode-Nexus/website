import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {readdir, readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../..');

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

function hashContent(content) {
  return createHash('sha256').update(content).digest('hex');
}

async function listFilesRecursive(dirPath, files = []) {
  let entries = [];

  try {
    entries = await readdir(dirPath, {withFileTypes: true});
  } catch {
    return files;
  }

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      await listFilesRecursive(fullPath, files);
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

async function snapshotGeneratedRoots() {
  const snapshot = new Map();

  for (const root of generatedRoots) {
    const fullRoot = path.join(workspaceRoot, root);
    const files = await listFilesRecursive(fullRoot);

    for (const filePath of files) {
      const content = await readFile(filePath);
      const relativePath = path.relative(workspaceRoot, filePath).replace(/\\/gu, '/');
      snapshot.set(relativePath, hashContent(content));
    }
  }

  return snapshot;
}

function compareSnapshots(before, after) {
  const changes = [];
  const allPaths = new Set([...before.keys(), ...after.keys()]);

  for (const relativePath of [...allPaths].sort((left, right) => left.localeCompare(right, 'zh-CN'))) {
    const beforeHash = before.get(relativePath);
    const afterHash = after.get(relativePath);

    if (beforeHash === afterHash) {
      continue;
    }

    if (!beforeHash) {
      changes.push(`A ${relativePath}`);
      continue;
    }

    if (!afterHash) {
      changes.push(`D ${relativePath}`);
      continue;
    }

    changes.push(`M ${relativePath}`);
  }

  return changes;
}

async function main() {
  const before = await snapshotGeneratedRoots();

  execFileSync(process.execPath, [path.join(workspaceRoot, 'scripts/content/generate-handbooks.mjs')], {
    cwd: workspaceRoot,
    stdio: 'inherit',
  });

  const after = await snapshotGeneratedRoots();
  const changes = compareSnapshots(before, after);

  if (changes.length > 0) {
    console.error(
      'Generated handbook docs are out of sync. Run `npm run generate:handbooks` and commit the resulting changes.\n',
    );
    changes.forEach((change) => console.error(change));
    process.exitCode = 1;
    return;
  }

  console.log('Generated handbook docs are in sync.');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
