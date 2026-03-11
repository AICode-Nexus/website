import test from 'node:test';
import assert from 'node:assert/strict';
import {getTeachingVideoSyncStatus} from '../../src/utils/teachingVideoSyncStatus.mjs';

const syncConfig = {
  intervalHours: 6,
  overdueThresholdHours: 8,
  staleThresholdHours: 48,
  pillLabel: '每 6 小时自动同步',
  description: 'GitHub Actions 每 6 小时自动刷新一次目录数据',
  delayedLabel: '同步延迟',
  delayedDescription: '当前已超过 8 小时未刷新，这次自动同步可能延迟。',
  staleLabel: '数据陈旧',
  staleDescription: '当前已超过 48 小时未刷新，需要手动检查同步工作流。',
};

test('getTeachingVideoSyncStatus marks a recently generated catalog as fresh', () => {
  const status = getTeachingVideoSyncStatus(
    '2026-03-11T08:00:00.000Z',
    syncConfig,
    new Date('2026-03-11T13:30:00.000Z'),
  );

  assert.equal(status.kind, 'fresh');
  assert.equal(status.pillLabel, syncConfig.pillLabel);
});

test('getTeachingVideoSyncStatus marks overdue catalogs as delayed before they become stale', () => {
  const status = getTeachingVideoSyncStatus(
    '2026-03-11T00:00:00.000Z',
    syncConfig,
    new Date('2026-03-11T08:30:00.000Z'),
  );

  assert.equal(status.kind, 'delayed');
  assert.equal(status.detailText, syncConfig.delayedDescription);
});

test('getTeachingVideoSyncStatus marks old or invalid timestamps as stale', () => {
  const agedStatus = getTeachingVideoSyncStatus(
    '2026-03-09T00:00:00.000Z',
    syncConfig,
    new Date('2026-03-11T08:30:00.000Z'),
  );
  const invalidStatus = getTeachingVideoSyncStatus('not-a-date', syncConfig, new Date('2026-03-11T08:30:00.000Z'));

  assert.equal(agedStatus.kind, 'stale');
  assert.equal(invalidStatus.kind, 'stale');
});
