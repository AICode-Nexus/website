import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createCandidateReport,
  dedupeWatchlistEntries,
  normalizeCandidateType,
  validateWatchlist,
} from '../content/monitor-skill-plugins.mjs';

function buildWatchlist(overrides = {}) {
  return {
    sources: [
      {
        id: 'agent-skills-standard',
        name: 'Agent Skills standard',
        sourceUrl: 'https://agentskills.io/home',
        reason: 'Open standard baseline.',
        suggestedTags: ['skill-standard', 'authoring-tool'],
        confidence: 'high',
        ...overrides,
      },
    ],
  };
}

function buildFetch(responsesByUrl) {
  return async (url) => {
    const response = responsesByUrl[url];

    if (response instanceof Error) {
      throw response;
    }

    if (!response) {
      return {
        ok: false,
        status: 404,
        text: async () => '',
      };
    }

    return {
      ok: true,
      status: 200,
      text: async () => response,
    };
  };
}

test('validateWatchlist requires stable source metadata and normalizes defaults', () => {
  const [source] = validateWatchlist(buildWatchlist());

  assert.equal(source.id, 'agent-skills-standard');
  assert.equal(source.candidateType, 'skill-standard');
  assert.equal(source.confidence, 'high');

  assert.throws(
    () => validateWatchlist(buildWatchlist({sourceUrl: '/relative'})),
    /absolute http\(s\) URL/u,
  );
});

test('normalizeCandidateType infers type from tags, source, and marketplace names', () => {
  assert.equal(
    normalizeCandidateType({
      id: 'standard',
      name: 'Agent Skills',
      sourceUrl: 'https://agentskills.io/home',
      suggestedTags: [],
    }),
    'skill-standard',
  );

  assert.equal(
    normalizeCandidateType({
      id: 'marketplace',
      name: 'Example Plugin Marketplace',
      sourceUrl: 'https://example.com',
      suggestedTags: [],
    }),
    'plugin-marketplace',
  );

  assert.equal(
    normalizeCandidateType({
      id: 'method',
      name: 'Superpowers',
      sourceUrl: 'https://github.com/obra/Superpowers',
      suggestedTags: [],
    }),
    'methodology-pack',
  );
});

test('createCandidateReport dedupes duplicate watchlist ids and marks changed sources', async () => {
  const watchlist = {
    sources: [
      buildWatchlist().sources[0],
      {
        ...buildWatchlist().sources[0],
        name: 'Duplicate Agent Skills standard',
      },
    ],
  };
  const fetchImpl = buildFetch({
    'https://agentskills.io/home': 'new source body',
  });
  const previousReport = {
    fingerprints: {
      'agent-skills-standard': 'old-fingerprint',
    },
  };
  const report = await createCandidateReport({
    watchlist,
    date: '2026-07-02',
    checkedAt: '2026-07-02T00:00:00.000Z',
    previousReport,
    fetchImpl,
  });

  assert.equal(report.sourceCount, 1);
  assert.equal(report.candidates.length, 1);
  assert.equal(report.candidates[0].status, 'changed');
  assert.match(report.candidates[0].errors.join('\n'), /Duplicate watchlist entry ignored/u);
});

test('createCandidateReport records fetch errors while preserving fixed candidate fields', async () => {
  const fetchImpl = buildFetch({
    'https://agentskills.io/home': new Error('network down'),
  });
  const report = await createCandidateReport({
    watchlist: buildWatchlist(),
    date: '2026-07-02',
    checkedAt: '2026-07-02T00:00:00.000Z',
    previousReport: null,
    fetchImpl,
  });
  const candidate = report.candidates[0];

  assert.deepEqual(Object.keys(candidate), [
    'id',
    'name',
    'candidateType',
    'sourceUrl',
    'repoUrl',
    'reason',
    'evidenceDate',
    'suggestedTags',
    'confidence',
    'status',
    'errors',
  ]);
  assert.equal(candidate.status, 'new');
  assert.match(candidate.errors.join('\n'), /network down/u);
});

test('dedupeWatchlistEntries keeps the first matching id', () => {
  const entries = validateWatchlist({
    sources: [
      buildWatchlist({name: 'First'}).sources[0],
      buildWatchlist({name: 'Second'}).sources[0],
    ],
  });
  const {entries: deduped, duplicateErrorsById} = dedupeWatchlistEntries(entries);

  assert.equal(deduped.length, 1);
  assert.equal(deduped[0].name, 'First');
  assert.equal(duplicateErrorsById.get('agent-skills-standard').length, 1);
});
