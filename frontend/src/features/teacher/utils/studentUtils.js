export function getAverage(scores) {
  const values = Object.values(scores);
  if (values.length === 0) return 0;
  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
}

// 75 and up is on track. 60 to 74 needs attention. Below 60 is at risk.
export function getStatus(score) {
  if (score >= 75) return 'on-track';
  if (score >= 60) return 'needs-attention';
  return 'at-risk';
}

export const STATUS_LABELS = {
  'on-track': 'On Track',
  'needs-attention': 'Needs Attention',
  'at-risk': 'At Risk',
};