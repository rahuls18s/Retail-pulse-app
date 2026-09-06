import { RegionMetric, WorkerAggregateResponse } from '../models/retail.models';
addEventListener('message', ({ data }) => {
  const start = performance.now();
  let revenue = 0,
    units = 0;
  const map = new Map<string, { revenue: number; units: number }>();
  for (const tx of data.transactions) {
    if (data.region !== 'All regions' && tx.region !== data.region) continue;
    revenue += tx.revenue;
    units += tx.quantity;
    const x = map.get(tx.region) ?? { revenue: 0, units: 0 };
    x.revenue += tx.revenue;
    x.units += tx.quantity;
    map.set(tx.region, x);
  }
  const regions: RegionMetric[] = [...map.entries()].map(([name, v], i) => ({
    name,
    revenue: v.revenue,
    growth: (i % 5) * 2.1 - 2.8,
    accent: ['#6d5dfc', '#15b8a6', '#f59e0b', '#ec6b9a'][i % 4],
  }));
  const result: WorkerAggregateResponse = {
    revenue,
    units,
    processingMs: Math.max(1, Math.round(performance.now() - start)),
    regions,
  };
  postMessage(result);
});
