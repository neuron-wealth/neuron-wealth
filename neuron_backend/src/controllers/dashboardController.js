const { recordServices } = require("../services/recordService");
const { RECORD_KEYS } = require("../config/recordTypes");
const { hasDB } = require("../config/db");

async function getDashboard(_req, res) {
  const summaries = await Promise.all(RECORD_KEYS.map((key) => recordServices[key].summary()));
  const byKey = Object.fromEntries(RECORD_KEYS.map((key, index) => [key, summaries[index]]));

  const records = RECORD_KEYS.map((key) => {
    const { def } = recordServices[key];
    const summary = byKey[key];
    return {
      key,
      label: def.label,
      plural: def.plural,
      statuses: def.statuses,
      columns: def.columns,
      total: summary.total,
      open: summary.open,
      byStatus: summary.byStatus,
      lastWeek: summary.trend.slice(-7).reduce((sum, day) => sum + day.count, 0),
    };
  });

  const trend = byKey[RECORD_KEYS[0]].trend.map((day, index) => {
    const counts = Object.fromEntries(RECORD_KEYS.map((key) => [key, byKey[key].trend[index]?.count || 0]));
    return { date: day.date, total: Object.values(counts).reduce((sum, count) => sum + count, 0), ...counts };
  });

  const recent = RECORD_KEYS.flatMap((key) => byKey[key].recent.map((item) => ({ ...item, type: key })))
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 8);

  res.json({
    records,
    trend,
    recent,
    status: Object.fromEntries(RECORD_KEYS.map((key) => [key, byKey[key].byStatus])),
    storage: hasDB() ? "database" : "local",
  });
}

module.exports = { getDashboard };
