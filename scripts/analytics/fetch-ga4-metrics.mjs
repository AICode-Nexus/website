import path from 'node:path';
import {readdir} from 'node:fs/promises';
import {
  fileExists,
  formatIsoDate,
  parseArgs,
  readJson,
  workspaceRoot,
  writeTextFile,
} from '../content/lib/content-utils.mjs';

const METRICS_DIR = path.join(workspaceRoot, 'content-sources', 'analytics');

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const date = args.date ? formatIsoDate(args.date) : formatIsoDate(new Date());

  const {mkdir} = await import('node:fs/promises');
  await mkdir(METRICS_DIR, {recursive: true});

  const serviceAccountJson = process.env.GA4_SERVICE_ACCOUNT;
  if (!serviceAccountJson) {
    console.log('GA4_SERVICE_ACCOUNT not set. Generating placeholder metrics report.');

    const placeholder = {
      date,
      source: 'placeholder',
      note: 'Set GA4_SERVICE_ACCOUNT secret to enable real metrics collection.',
      pages: [],
    };

    const outputPath = path.join(METRICS_DIR, `${date}-metrics.json`);
    await writeTextFile(outputPath, `${JSON.stringify(placeholder, null, 2)}\n`);
    console.log(`Placeholder metrics: ${path.relative(workspaceRoot, outputPath)}`);
    return;
  }

  // GA4 Data API integration
  // Uses Google Analytics Data API v1 to fetch page-level metrics
  let serviceAccount;
  try {
    serviceAccount = JSON.parse(serviceAccountJson);
  } catch {
    throw new Error('GA4_SERVICE_ACCOUNT is not valid JSON');
  }

  const propertyId = serviceAccount.ga4_property_id || process.env.GA4_PROPERTY_ID;
  if (!propertyId) {
    throw new Error('GA4 property ID not found in service account or GA4_PROPERTY_ID env');
  }

  // Fetch access token using service account JWT
  const token = await getAccessToken(serviceAccount);

  const endDate = date;
  const startDate = addDaysStr(date, -7);

  const body = {
    dateRanges: [{startDate, endDate}],
    dimensions: [{name: 'pagePath'}],
    metrics: [
      {name: 'screenPageViews'},
      {name: 'averageSessionDuration'},
      {name: 'bounceRate'},
    ],
    limit: 200,
    orderBys: [{metric: {metricName: 'screenPageViews'}, desc: true}],
  };

  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    throw new Error(`GA4 API error: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const pages = (data.rows || []).map((row) => ({
    path: row.dimensionValues[0].value,
    pageviews: Number(row.metricValues[0].value),
    avgDuration: Number(row.metricValues[1].value),
    bounceRate: Number(row.metricValues[2].value),
  }));

  const report = {
    date,
    source: 'ga4',
    dateRange: {startDate, endDate},
    propertyId,
    pages,
  };

  const outputPath = path.join(METRICS_DIR, `${date}-metrics.json`);
  await writeTextFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`GA4 metrics: ${path.relative(workspaceRoot, outputPath)}`);
  console.log(`Pages tracked: ${pages.length}`);
}

function addDaysStr(dateStr, days) {
  const d = new Date(dateStr);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

async function getAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = btoa(JSON.stringify({alg: 'RS256', typ: 'JWT'}));
  const payload = btoa(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));

  // Use Node.js crypto to sign JWT
  const {createSign} = await import('node:crypto');
  const sign = createSign('RSA-SHA256');
  sign.update(`${header}.${payload}`);
  const signature = sign.sign(serviceAccount.private_key, 'base64url');

  const jwt = `${header}.${payload}.${signature}`;

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  if (!tokenResponse.ok) {
    throw new Error(`Token exchange failed: ${tokenResponse.status}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
