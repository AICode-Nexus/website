import http from 'node:http';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {mkdir, readFile, stat} from 'node:fs/promises';

import {workspaceRoot, writeTextFile} from './lib/content-utils.mjs';

const BUILD_ROOT = path.join(workspaceRoot, 'build');
const OUTPUT_ROOT = path.join(workspaceRoot, 'output', 'playwright', 'browser-acceptance');
const SITE_PREFIX = '/website';
const PLAYWRIGHT_PACKAGE = '@playwright/cli';
const SESSION_NAME = `browser-acceptance-${Date.now()}`;
const NAV_LABELS = ['开始上手', '工具教程', '工作流教程', '实战案例', '进阶专题', '按岗位进入', '博客动态', '版本更新'];
const HERO_ACTIONS = [
  {label: '30 分钟上手', href: '/website/docs/start/30-minute-quick-start'},
  {label: '按任务找教程', href: '/website/docs/workflows/playbooks/workflow-playbook'},
];
const STARTER_TRACK_ACTIONS = [
  {label: '开始教程', href: '/website/docs/start/30-minute-quick-start'},
  {label: '进入路线', href: '/website/docs/workflows/playbooks/first-7-days-ai-coding'},
  {label: '配置默认栈', href: '/website/docs/workflows/playbooks/personal-engineer-stack-setup'},
  {label: '查看任务手册', href: '/website/docs/workflows/playbooks/workflow-playbook'},
];
const MIME_TYPES = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.ico', 'image/x-icon'],
]);

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: workspaceRoot,
      env: {
        ...process.env,
        PLAYWRIGHT_CLI_SESSION: options.sessionName ?? SESSION_NAME,
        ...options.env,
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';
    let settled = false;

    const timeout = setTimeout(() => {
      if (settled) {
        return;
      }

      settled = true;
      child.kill('SIGTERM');
      reject(new Error(`${command} ${args.join(' ')} timed out after ${options.timeout ?? 120_000}ms.`));
    }, options.timeout ?? 120_000);

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.once('error', (error) => {
      if (settled) {
        return;
      }

      settled = true;
      clearTimeout(timeout);
      reject(error);
    });

    child.once('close', (code) => {
      if (settled) {
        return;
      }

      settled = true;
      clearTimeout(timeout);

      if (code !== 0 && !options.allowFailure) {
        reject(
          new Error(
            [
              `${command} ${args.join(' ')} failed with exit code ${code}.`,
              stdout.trim(),
              stderr.trim(),
            ]
              .filter(Boolean)
              .join('\n\n'),
          ),
        );
        return;
      }

      resolve(`${stdout}${stderr}`);
    });
  });
}

function runPlaywright(args, options = {}) {
  return runCommand('npx', ['--yes', '--package', PLAYWRIGHT_PACKAGE, 'playwright-cli', ...args], options);
}

function parseResultBlock(output) {
  const match = output.match(/### Result\s*\n([\s\S]*?)(?:\n### |\n```|$)/u);

  if (!match) {
    throw new Error(`Unable to parse Playwright result block:\n${output}`);
  }

  return match[1].trim();
}

function parseJsonResult(output) {
  const rawValue = parseResultBlock(output);
  const parsed = JSON.parse(rawValue);

  if (typeof parsed === 'string') {
    const trimmedValue = parsed.trim();

    if (/^[\[{"]/u.test(trimmedValue)) {
      return JSON.parse(trimmedValue);
    }
  }

  return parsed;
}

async function evaluateJson(expression, options = {}) {
  return parseJsonResult(await runPlaywright(['eval', `() => JSON.stringify(${expression})`], options));
}

async function evaluateJsonScript(script, options = {}) {
  return parseJsonResult(await runPlaywright(['eval', script], options));
}

async function getConsoleErrors(options = {}) {
  const output = await runPlaywright(['console', 'error'], options);
  const match = output.match(/\[Console\]\(([^)]+)\)/u);

  if (!match) {
    throw new Error(`Unable to locate console log output:\n${output}`);
  }

  const logPath = path.join(workspaceRoot, match[1]);
  const logText = await readFile(logPath, 'utf8');
  const errorCount = Number.parseInt(logText.match(/Errors:\s*(\d+)/u)?.[1] ?? '0', 10);

  return {errorCount, logPath, logText};
}

function assertCondition(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertDeepEqual(actual, expected, message) {
  const actualSerialized = JSON.stringify(actual);
  const expectedSerialized = JSON.stringify(expected);

  if (actualSerialized !== expectedSerialized) {
    throw new Error(`${message}\nExpected: ${expectedSerialized}\nReceived: ${actualSerialized}`);
  }
}

async function fileExists(filePath) {
  try {
    const fileInfo = await stat(filePath);
    return fileInfo.isFile();
  } catch {
    return false;
  }
}

function buildCandidatePaths(routePath) {
  const relativePath = routePath.replace(/^\/+/u, '');

  if (relativePath === '') {
    return ['index.html'];
  }

  if (relativePath.endsWith('/')) {
    return [`${relativePath}index.html`];
  }

  return [relativePath, `${relativePath}.html`, `${relativePath}/index.html`];
}

async function resolveBuildFilePath(requestPath) {
  const normalizedPath = decodeURIComponent(requestPath);

  if (!normalizedPath.startsWith(SITE_PREFIX)) {
    return '';
  }

  const routePath = normalizedPath.slice(SITE_PREFIX.length) || '/';
  const candidatePaths = buildCandidatePaths(routePath);

  for (const candidatePath of candidatePaths) {
    const absolutePath = path.join(BUILD_ROOT, candidatePath);
    const relativeTarget = path.relative(BUILD_ROOT, absolutePath);

    if (relativeTarget.startsWith('..')) {
      continue;
    }

    if (await fileExists(absolutePath)) {
      return absolutePath;
    }
  }

  return '';
}

function getMimeType(filePath) {
  return MIME_TYPES.get(path.extname(filePath).toLowerCase()) ?? 'application/octet-stream';
}

function createBuildServer() {
  return http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? '/', 'http://127.0.0.1');
      const pathname = url.pathname === SITE_PREFIX ? `${SITE_PREFIX}/` : url.pathname;
      const filePath = await resolveBuildFilePath(pathname);

      if (!filePath) {
        response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        response.end('File not found');
        return;
      }

      const fileBuffer = await readFile(filePath);
      response.writeHead(200, {'Content-Type': getMimeType(filePath)});
      response.end(fileBuffer);
    } catch (error) {
      response.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
      response.end(error instanceof Error ? error.message : String(error));
    }
  });
}

async function startServer() {
  const server = createBuildServer();

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

  const address = server.address();

  if (!address || typeof address === 'string') {
    throw new Error('Unable to resolve local browser acceptance server address.');
  }

  return {
    server,
    baseUrl: `http://127.0.0.1:${address.port}${SITE_PREFIX}`,
  };
}

function normalizeSiteRoute(baseUrl, route) {
  if (!route || route === '/') {
    return `${baseUrl}/`;
  }

  return `${baseUrl}${route.startsWith('/') ? route : `/${route}`}`;
}

function addCheck(report, name, details = {}) {
  report.checks.push({name, ...details});
}

async function captureScreenshot(fileName, options = {}) {
  const screenshotPath = path.join(OUTPUT_ROOT, fileName);
  await runPlaywright(['screenshot', '--filename', screenshotPath, '--full-page'], options);
  return screenshotPath;
}

async function setViewportSize(width, height, options = {}) {
  await runPlaywright(['resize', String(width), String(height)], {...options, allowFailure: true});
  const viewport = await evaluateJson(`({ width: window.innerWidth, height: window.innerHeight })`, options);
  assertCondition(
    viewport.width === width,
    `Viewport width mismatch. Expected ${width}, received ${viewport.width}.`,
  );
}

async function setDesktopViewport(options = {}) {
  await setViewportSize(1280, 720, options);
}

async function setMobileViewport(options = {}) {
  await setViewportSize(375, 812, options);
}

async function gotoRoute(baseUrl, route, options = {}) {
  await runPlaywright(['goto', normalizeSiteRoute(baseUrl, route)], options);
  await runPlaywright(['run-code', 'await page.waitForSelector("main")'], options);
}

async function verifyConsole(report, pageName, options = {}) {
  const consoleResult = await getConsoleErrors(options);

  assertCondition(
    consoleResult.errorCount === 0,
    `${pageName} emitted ${consoleResult.errorCount} console error(s).\n${consoleResult.logText}`,
  );

  addCheck(report, `${pageName}: no console errors`, {
    status: 'passed',
    logPath: consoleResult.logPath,
  });
}

async function verifyHomepage(report, baseUrl) {
  await gotoRoute(baseUrl, '/');
  await verifyConsole(report, 'Homepage');

  const title = await evaluateJson('document.title');
  assertCondition(title === 'AICode-Nexus 教程站 | AICode-Nexus', `Homepage title mismatch: ${title}`);
  addCheck(report, 'Homepage: title', {status: 'passed', title});

  const navLabels = await evaluateJson(`Array.from(document.querySelectorAll('nav[aria-label="主导航"] a[href^="/website/"]'))
    .map((element) => element.textContent.replace(/\\s+/gu, ' ').trim())
    .filter((label) => label && label !== 'AICode-Nexus')`);
  assertDeepEqual(navLabels.slice(0, NAV_LABELS.length), NAV_LABELS, 'Desktop navbar labels changed.');
  addCheck(report, 'Homepage: desktop navbar labels', {status: 'passed', labels: navLabels.slice(0, NAV_LABELS.length)});

  const heroActions = await evaluateJson(`Array.from(document.querySelectorAll('main a'))
    .filter((element) => ${JSON.stringify(HERO_ACTIONS.map(({label}) => label))}.includes(element.textContent.trim()))
    .map((element) => ({ label: element.textContent.trim(), href: element.getAttribute('href') }))`);
  assertDeepEqual(heroActions, HERO_ACTIONS, 'Homepage hero actions changed.');
  addCheck(report, 'Homepage: hero actions', {status: 'passed', actions: heroActions});

  const starterActions = await evaluateJson(`Array.from(document.querySelectorAll('main a'))
    .filter((element) => ${JSON.stringify(STARTER_TRACK_ACTIONS.map(({label}) => label))}.includes(element.textContent.trim()))
    .map((element) => ({ label: element.textContent.trim(), href: element.getAttribute('href') }))`);
  assertDeepEqual(starterActions, STARTER_TRACK_ACTIONS, 'Homepage starter-track actions changed.');
  addCheck(report, 'Homepage: starter track actions', {status: 'passed', actions: starterActions});

  const sectionCardCounts = await evaluateJson(`({
    toolCards: Array.from(document.querySelectorAll('main a[href$="/quick-start"]')).length,
    workflowCards: Array.from(document.querySelectorAll('main a[href$="/runbook"], main a[href$="/30-minute-quick-start"]')).length,
    caseCards: Array.from(document.querySelectorAll('main a[href*="/docs/case-studies/"]')).filter((element) => !element.getAttribute('href').endsWith('/case-studies')).length
  })`);
  assertCondition(sectionCardCounts.toolCards >= 4, `Homepage should expose at least 4 tool tutorial cards, found ${sectionCardCounts.toolCards}.`);
  assertCondition(sectionCardCounts.workflowCards >= 4, `Homepage should expose at least 4 workflow tutorial cards, found ${sectionCardCounts.workflowCards}.`);
  assertCondition(sectionCardCounts.caseCards >= 4, `Homepage should expose at least 4 case-study cards, found ${sectionCardCounts.caseCards}.`);
  addCheck(report, 'Homepage: featured card counts', {status: 'passed', ...sectionCardCounts});

  report.artifacts.homeDesktopScreenshot = await captureScreenshot('home-desktop.png');
}

async function verifyToolsHub(report, baseUrl) {
  await gotoRoute(baseUrl, '/docs/tools');
  await verifyConsole(report, 'Tools hub');

  const summary = await evaluateJson(`({
    h1: document.querySelector('main h1')?.textContent.trim() ?? '',
    hasQuickStartLead: document.body.innerText.includes('先跑 Quick Start'),
    quickStartLinks: Array.from(new Set(
      Array.from(document.querySelectorAll('a[href$="/quick-start"]')).map((element) => element.getAttribute('href'))
    )),
    actionableLinks: Array.from(new Set(
      Array.from(document.querySelectorAll('main a[href^="/website/docs/"]'))
        .map((element) => element.getAttribute('href'))
        .filter((href) => /(?:30-minute-quick-start|\\/quick-start$|\\/playbooks\\/|\\/case-studies\\/[^/]+$)/u.test(href))
    )),
  })`);

  assertCondition(summary.h1 === 'AI 编程工具', `Tools hub H1 changed: ${summary.h1}`);
  assertCondition(summary.hasQuickStartLead, 'Tools hub no longer surfaces "先跑 Quick Start".');
  assertCondition(summary.quickStartLinks.length >= 4, `Tools hub should expose at least 4 quick-start links, found ${summary.quickStartLinks.length}.`);
  assertCondition(summary.actionableLinks.length >= 6, `Tools hub should expose at least 6 actionable tutorial links, found ${summary.actionableLinks.length}.`);
  addCheck(report, 'Tools hub: quick-start rail', {
    status: 'passed',
    quickStartLinks: summary.quickStartLinks.length,
    actionableLinks: summary.actionableLinks.length,
  });
}

async function verifyWorkflowsHub(report, baseUrl) {
  await gotoRoute(baseUrl, '/docs/workflows');
  await verifyConsole(report, 'Workflows hub');

  const summary = await evaluateJson(`({
    h1: document.querySelector('main h1')?.textContent.trim() ?? '',
    hasRunbookLead: document.body.innerText.includes('先跑 Runbook'),
    runbookLinks: Array.from(new Set(
      Array.from(document.querySelectorAll('a[href$="/runbook"]')).map((element) => element.getAttribute('href'))
    )),
    actionableLinks: Array.from(new Set(
      Array.from(document.querySelectorAll('main a[href^="/website/docs/"]'))
        .map((element) => element.getAttribute('href'))
        .filter((href) => /(?:30-minute-quick-start|\\/runbook$|\\/playbooks\\/|\\/case-studies\\/[^/]+$)/u.test(href))
    )),
  })`);

  assertCondition(summary.h1 === 'AI 工作流', `Workflows hub H1 changed: ${summary.h1}`);
  assertCondition(summary.hasRunbookLead, 'Workflows hub no longer surfaces "先跑 Runbook".');
  assertCondition(summary.runbookLinks.length >= 4, `Workflows hub should expose at least 4 runbook links, found ${summary.runbookLinks.length}.`);
  assertCondition(summary.actionableLinks.length >= 6, `Workflows hub should expose at least 6 actionable tutorial links, found ${summary.actionableLinks.length}.`);
  addCheck(report, 'Workflows hub: runbook rail', {
    status: 'passed',
    runbookLinks: summary.runbookLinks.length,
    actionableLinks: summary.actionableLinks.length,
  });
}

async function verifyCaseStudiesHub(report, baseUrl) {
  await gotoRoute(baseUrl, '/docs/case-studies');
  await verifyConsole(report, 'Case-studies hub');

  const summary = await evaluateJson(`({
    h1: document.querySelector('main h1')?.textContent.trim() ?? '',
    hasLeadQuestion: document.body.innerText.includes('先按任务形状进入'),
    caseLinks: Array.from(new Set(
      Array.from(document.querySelectorAll('main a[href*="/docs/case-studies/"]'))
        .map((element) => element.getAttribute('href'))
        .filter((href) => href && !href.endsWith('/case-studies'))
    )),
    actionableReturns: Array.from(new Set(
      Array.from(document.querySelectorAll('main a[href^="/website/docs/"]'))
        .map((element) => element.getAttribute('href'))
        .filter((href) => /(?:30-minute-quick-start|\\/runbook$|\\/playbooks\\/|\\/quick-start$)/u.test(href))
    )),
  })`);

  assertCondition(summary.h1 === '实战案例', `Case-studies hub H1 changed: ${summary.h1}`);
  assertCondition(summary.hasLeadQuestion, 'Case-studies hub no longer opens with "先按任务形状进入".');
  assertCondition(summary.caseLinks.length >= 4, `Case-studies hub should expose at least 4 case links, found ${summary.caseLinks.length}.`);
  assertCondition(summary.actionableReturns.length >= 3, `Case-studies hub should expose at least 3 actionable return links, found ${summary.actionableReturns.length}.`);
  addCheck(report, 'Case-studies hub: case and return links', {
    status: 'passed',
    caseLinks: summary.caseLinks.length,
    actionableReturns: summary.actionableReturns.length,
  });
}

async function verifyAdvancedTopicsEntry(report, baseUrl) {
  await gotoRoute(baseUrl, '/docs/standards');
  await verifyConsole(report, 'Standards hub');

  const summary = await evaluateJson(`({
    h1: document.querySelector('main h1')?.textContent.trim() ?? '',
    hasStartHerePrompt: document.body.innerText.includes('现在先做什么'),
    actionableLinks: Array.from(new Set(
      Array.from(document.querySelectorAll('main a[href^="/website/docs/"]'))
        .map((element) => element.getAttribute('href'))
        .filter((href) => /(?:30-minute-quick-start|\\/runbook$|\\/playbooks\\/|\\/case-studies\\/[^/]+$)/u.test(href))
    )),
  })`);

  assertCondition(summary.h1 === 'AI 规范', `Standards hub H1 changed: ${summary.h1}`);
  assertCondition(summary.hasStartHerePrompt, 'Standards hub no longer exposes "现在先做什么".');
  assertCondition(summary.actionableLinks.length >= 2, `Standards hub should expose at least 2 actionable next-step links, found ${summary.actionableLinks.length}.`);
  addCheck(report, 'Standards hub: actionable next steps', {
    status: 'passed',
    actionableLinks: summary.actionableLinks.length,
  });
}

async function verifyMobileNavigation(report, baseUrl) {
  const mobileSessionName = `${SESSION_NAME}-mobile`;
  const mobileSession = {sessionName: mobileSessionName};

  try {
    await runPlaywright(['open', `${baseUrl}/`], mobileSession);
    await setMobileViewport(mobileSession);
    await gotoRoute(baseUrl, '/', mobileSession);
    await verifyConsole(report, 'Homepage mobile', mobileSession);
    await runPlaywright([
      'run-code',
      `await page.waitForFunction(() => {
  const mobileWidthReady = window.innerWidth <= 480;
  const searchTrigger = document.querySelector('button[aria-label="打开全站搜索"]');
  const navToggle = document.querySelector('nav[aria-label="主导航"] button[aria-label="切换导航栏"]');
  return mobileWidthReady && Boolean(searchTrigger) && Boolean(navToggle);
});`,
    ], mobileSession);

    const hasToggle = await evaluateJson(
      `({
        width: window.innerWidth,
        hasToggle: Boolean(document.querySelector('nav[aria-label="主导航"] button[aria-label="切换导航栏"]')),
      })`,
      mobileSession,
    );
    assertCondition(hasToggle.hasToggle, `Mobile navbar toggle is missing at width ${hasToggle.width}.`);

    const hasSearchTrigger = await evaluateJson(
      `({
        width: window.innerWidth,
        hasSearchTrigger: Boolean(document.querySelector('button[aria-label="打开全站搜索"]')),
      })`,
      mobileSession,
    );
    assertCondition(
      hasSearchTrigger.hasSearchTrigger,
      `Mobile navbar search trigger is missing at width ${hasSearchTrigger.width}.`,
    );

    const mobileSearchSummary = await evaluateJsonScript(
      `async () => {
        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const inputSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        const trigger = document.querySelector('button[aria-label="打开全站搜索"]');

        if (trigger instanceof HTMLButtonElement) {
          trigger.click();
        }

        let searchInput = null;
        for (let index = 0; index < 40; index += 1) {
          searchInput = document.querySelector('input[aria-label="搜索全站内容"]');
          if (searchInput instanceof HTMLInputElement) {
            break;
          }

          await wait(50);
        }

        if (searchInput instanceof HTMLInputElement) {
          const previousValue = searchInput.value;
          if (inputSetter) {
            inputSetter.call(searchInput, 'Codex');
          } else {
            searchInput.value = 'Codex';
          }

          const valueTracker = searchInput._valueTracker;
          if (valueTracker && typeof valueTracker.setValue === 'function') {
            valueTracker.setValue(previousValue);
          }

          searchInput.dispatchEvent(new InputEvent('input', {bubbles: true, data: 'Codex'}));
          searchInput.dispatchEvent(new Event('change', {bubbles: true}));
        }

        for (let index = 0; index < 200; index += 1) {
          const container = document.getElementById('global-site-mobile-search-results');
          const text = container?.textContent?.replace(/\\s+/gu, ' ').trim() ?? '';

          if (
            container &&
            !text.includes('正在加载搜索索引') &&
            (container.querySelector('a') || text.includes('没有找到匹配内容'))
          ) {
            break;
          }

          await wait(50);
        }

        const dialog = document.getElementById('global-site-mobile-search');
        const results = Array.from(document.querySelectorAll('#global-site-mobile-search-results a'))
          .map((element) => element.textContent.replace(/\\s+/gu, ' ').trim())
          .filter(Boolean);
        const resultHeadings = Array.from(document.querySelectorAll('#global-site-mobile-search-results p'))
          .map((element) => element.textContent.replace(/\\s+/gu, ' ').trim())
          .filter(Boolean);

        return JSON.stringify({
          dialogVisible: Boolean(dialog),
          currentPath: window.location.pathname,
          hasSearchTrigger: Boolean(document.querySelector('button[aria-label="打开全站搜索"]')),
          resultCount: results.length,
          resultsText:
            document.getElementById('global-site-mobile-search-results')?.textContent?.replace(/\\s+/gu, ' ').trim() ??
            '',
          topResults: results.slice(0, 3),
          resultHeadings,
          width: window.innerWidth,
        });
      }`,
      mobileSession,
    );

    addCheck(report, 'Homepage mobile: search debug state', {
      status: 'observed',
      ...mobileSearchSummary,
    });
    report.artifacts.homeMobileSearchScreenshot = await captureScreenshot(
      'home-mobile-search.png',
      mobileSession,
    );

    assertCondition(mobileSearchSummary.dialogVisible, 'Mobile search dialog did not open.');
    assertCondition(mobileSearchSummary.resultCount > 0, 'Mobile search did not return any results for "Codex".');
    addCheck(report, 'Homepage mobile: search trigger and results', {
      status: 'passed',
      currentPath: mobileSearchSummary.currentPath,
      resultCount: mobileSearchSummary.resultCount,
      topResults: mobileSearchSummary.topResults,
    });

    const mobileNavLabels = await evaluateJsonScript(
      `async () => {
        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const closeButton = Array.from(document.querySelectorAll('button')).find(
          (element) => element.textContent?.trim() === '关闭',
        );

        if (closeButton instanceof HTMLButtonElement) {
          closeButton.click();
        }

        for (let index = 0; index < 40; index += 1) {
          if (!document.getElementById('global-site-mobile-search')) {
            break;
          }

          await wait(50);
        }

        const navToggle = document.querySelector('nav[aria-label="主导航"] button[aria-label="切换导航栏"]');
        if (navToggle instanceof HTMLButtonElement) {
          navToggle.click();
        }

        for (let index = 0; index < 40; index += 1) {
          if (document.querySelectorAll('nav[aria-label="主导航"] a[href^="/website/"]').length >= ${NAV_LABELS.length}) {
            break;
          }

          await wait(50);
        }

        return JSON.stringify(
          Array.from(document.querySelectorAll('nav[aria-label="主导航"] a[href^="/website/"]'))
            .map((element) => element.textContent.replace(/\\s+/gu, ' ').trim())
            .filter((label) => label && label !== 'AICode-Nexus'),
        );
      }`,
      mobileSession,
    );

    assertDeepEqual(mobileNavLabels.slice(0, NAV_LABELS.length), NAV_LABELS, 'Mobile navbar labels changed.');
    addCheck(report, 'Homepage mobile: nav toggle and labels', {
      status: 'passed',
      labels: mobileNavLabels.slice(0, NAV_LABELS.length),
    });

    report.artifacts.homeMobileMenuScreenshot = await captureScreenshot(
      'home-mobile-menu.png',
      mobileSession,
    );
  } finally {
    await runPlaywright(['close'], {allowFailure: true, sessionName: mobileSessionName});
  }
}

async function main() {
  await mkdir(OUTPUT_ROOT, {recursive: true});

  const report = {
    generatedAt: new Date().toISOString(),
    sessionName: SESSION_NAME,
    checks: [],
    artifacts: {},
  };

  let server;

  try {
    await runCommand('npx', ['--version'], {timeout: 10_000});

    assertCondition(await fileExists(path.join(BUILD_ROOT, 'index.html')), 'Missing build output. Run `npm run build` before `npm run check:browser`.');

    const serverInfo = await startServer();
    server = serverInfo.server;
    report.baseUrl = serverInfo.baseUrl;

    await runPlaywright(['open', `${serverInfo.baseUrl}/`]);
    await setDesktopViewport();

    await verifyHomepage(report, serverInfo.baseUrl);
    await verifyToolsHub(report, serverInfo.baseUrl);
    await verifyWorkflowsHub(report, serverInfo.baseUrl);
    await verifyCaseStudiesHub(report, serverInfo.baseUrl);
    await verifyAdvancedTopicsEntry(report, serverInfo.baseUrl);
    await verifyMobileNavigation(report, serverInfo.baseUrl);

    report.status = 'passed';
    await writeTextFile(path.join(OUTPUT_ROOT, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
    console.log(`Browser acceptance passed. Report: ${path.join(OUTPUT_ROOT, 'report.json')}`);
  } catch (error) {
    report.status = 'failed';
    report.error = error instanceof Error ? error.message : String(error);
    await writeTextFile(path.join(OUTPUT_ROOT, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
    throw error;
  } finally {
    await runPlaywright(['close'], {allowFailure: true});

    if (server) {
      await new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      });
    }
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
