import path from 'node:path';
import {readdir} from 'node:fs/promises';
import {
  fileExists,
  formatIsoDate,
  parseArgs,
  readJson,
  readMarkdownDocument,
  workspaceRoot,
  writeTextFile,
} from '../content/lib/content-utils.mjs';

const METRICS_DIR = path.join(workspaceRoot, 'content-sources', 'analytics');
const EXPERIMENTS_PATH = path.join(METRICS_DIR, 'active-experiments.json');
const EVAL_WINDOW_DAYS = 7;
const MIN_IMPROVEMENT_THRESHOLD = 0.05; // 5% improvement required to keep

function addDaysStr(dateStr, days) {
  const d = new Date(dateStr);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

async function loadLatestMetrics() {
  if (!(await fileExists(METRICS_DIR))) return null;
  const files = await readdir(METRICS_DIR);
  const metricFiles = files.filter((f) => f.endsWith('-metrics.json')).sort().reverse();
  if (metricFiles.length === 0) return null;
  return readJson(path.join(METRICS_DIR, metricFiles[0]));
}

async function loadExperiments() {
  if (!(await fileExists(EXPERIMENTS_PATH))) return {experiments: []};
  return readJson(EXPERIMENTS_PATH);
}

async function saveExperiments(data) {
  await writeTextFile(EXPERIMENTS_PATH, `${JSON.stringify(data, null, 2)}\n`);
}

async function revertExperiment(experiment) {
  const filePath = path.join(workspaceRoot, experiment.filePath);
  if (!(await fileExists(filePath))) return false;

  const doc = await readMarkdownDocument(filePath);
  let content = doc.source;

  // Revert title
  if (experiment.newTitle !== experiment.originalTitle) {
    const escaped = experiment.newTitle.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
    content = content.replace(
      new RegExp(`title:\\s*['"]?${escaped}['"]?`, 'u'),
      `title: '${experiment.originalTitle}'`,
    );
  }

  // Revert description
  if (experiment.newDescription !== experiment.originalDescription) {
    const escaped = experiment.newDescription.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
    content = content.replace(
      new RegExp(`description:\\s*['"]?${escaped}['"]?`, 'u'),
      `description: '${experiment.originalDescription}'`,
    );
  }

  await writeTextFile(filePath, content);
  return true;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const date = args.date ? formatIsoDate(args.date) : formatIsoDate(new Date());

  const experimentData = await loadExperiments();
  const metrics = await loadLatestMetrics();

  if (experimentData.experiments.length === 0) {
    console.log('No active experiments to evaluate.');
    return;
  }

  const readyToEvaluate = experimentData.experiments.filter(
    (e) => e.status === 'active' && addDaysStr(e.startDate, EVAL_WINDOW_DAYS) <= date,
  );

  if (readyToEvaluate.length === 0) {
    console.log('No experiments ready for evaluation yet.');
    return;
  }

  console.log(`Evaluating ${readyToEvaluate.length} experiments...`);

  for (const experiment of readyToEvaluate) {
    const currentPage = metrics?.pages?.find((p) => p.path === experiment.pagePath);

    if (!currentPage) {
      console.log(`No metrics for ${experiment.pagePath}. Keeping experiment active.`);
      continue;
    }

    const baseline = experiment.baselineMetrics;
    const bounceImproved = baseline.bounceRate > 0
      ? (baseline.bounceRate - currentPage.bounceRate) / baseline.bounceRate
      : 0;
    const durationImproved = baseline.avgDuration > 0
      ? (currentPage.avgDuration - baseline.avgDuration) / baseline.avgDuration
      : 0;

    const overallScore = (bounceImproved + durationImproved) / 2;

    if (overallScore >= MIN_IMPROVEMENT_THRESHOLD) {
      experiment.status = 'kept';
      experiment.evaluatedAt = date;
      experiment.improvement = {bounceImproved, durationImproved, overallScore};
      console.log(`KEEP: ${experiment.pagePath} (improvement: ${(overallScore * 100).toFixed(1)}%)`);
    } else {
      // Revert changes
      const reverted = await revertExperiment(experiment);
      experiment.status = reverted ? 'reverted' : 'revert-failed';
      experiment.evaluatedAt = date;
      experiment.improvement = {bounceImproved, durationImproved, overallScore};
      console.log(`REVERT: ${experiment.pagePath} (improvement: ${(overallScore * 100).toFixed(1)}%)`);
    }
  }

  // Clean up old completed experiments (keep last 20)
  const completed = experimentData.experiments.filter((e) => e.status !== 'active');
  const active = experimentData.experiments.filter((e) => e.status === 'active');
  experimentData.experiments = [...active, ...completed.slice(-20)];

  await saveExperiments(experimentData);
  console.log(`Experiments: ${active.length} active, ${completed.length} completed`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
