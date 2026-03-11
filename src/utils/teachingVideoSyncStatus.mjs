const HOUR_IN_MS = 60 * 60 * 1000;

export function formatTeachingVideoSyncTimestamp(generatedAt) {
  return new Intl.DateTimeFormat('zh-CN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Shanghai',
  }).format(new Date(generatedAt));
}

export function getTeachingVideoSyncStatus(generatedAt, syncConfig, now = new Date()) {
  const generatedValue = new Date(generatedAt).valueOf();
  const ageHours = Number.isNaN(generatedValue)
    ? Number.POSITIVE_INFINITY
    : (now.valueOf() - generatedValue) / HOUR_IN_MS;

  if (!Number.isFinite(ageHours) || ageHours >= syncConfig.staleThresholdHours) {
    return {
      ageHours,
      detailText: syncConfig.staleDescription,
      kind: 'stale',
      pillLabel: syncConfig.staleLabel,
    };
  }

  if (ageHours >= syncConfig.overdueThresholdHours) {
    return {
      ageHours,
      detailText: syncConfig.delayedDescription,
      kind: 'delayed',
      pillLabel: syncConfig.delayedLabel,
    };
  }

  return {
    ageHours,
    detailText: syncConfig.description,
    kind: 'fresh',
    pillLabel: syncConfig.pillLabel,
  };
}
