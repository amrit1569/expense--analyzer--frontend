import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { getCategoryConfig } from '../../utils/categoryConfig';
import { formatCurrency } from '../../utils/formatters';
import { SkeletonChart } from '../ui/SkeletonLoader';
import { RiPieChartLine } from 'react-icons/ri';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryPieChart({ expenses, loading }) {
  const chartData = useMemo(() => {
    const catMap = {};
    expenses.forEach((e) => {
      if (!catMap[e.category]) catMap[e.category] = 0;
      catMap[e.category] += e.amount;
    });

    const sorted = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
    const labels = sorted.map(([cat]) => cat);
    const data   = sorted.map(([, amt]) => amt);
    const colors = labels.map((l) => getCategoryConfig(l).color);
    const bgs    = labels.map((l) => getCategoryConfig(l).color + 'cc');

    return { labels, datasets: [{ data, backgroundColor: bgs, borderColor: colors, borderWidth: 1.5, hoverOffset: 6 }] };
  }, [expenses]);

  if (loading) return <SkeletonChart />;
  if (!expenses.length) return null;

  return (
    <div className="glass-card rounded-2xl p-5 animate-slide-up">
      <div className="flex items-center gap-2 mb-4">
        <RiPieChartLine size={16} className="text-violet-400" />
        <h3 className="text-sm font-semibold text-white">Spending by Category</h3>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Chart */}
        <div className="w-52 h-52 flex-shrink-0">
          <Pie
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: 'rgba(15,15,26,0.95)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  borderWidth: 1,
                  titleColor: '#e2e8f0',
                  bodyColor: '#94a3b8',
                  padding: 10,
                  callbacks: {
                    label: (ctx) => ` ${formatCurrency(ctx.parsed)}`,
                  },
                },
              },
            }}
          />
        </div>

        {/* Legend */}
        <div className="flex-1 grid grid-cols-1 gap-2 w-full">
          {chartData.labels.map((label, i) => {
            const cfg = getCategoryConfig(label);
            const total = chartData.datasets[0].data.reduce((s, v) => s + v, 0);
            const pct = total > 0 ? Math.round((chartData.datasets[0].data[i] / total) * 100) : 0;
            return (
              <div key={label} className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
                <span className="text-xs text-slate-400 flex-1 truncate">{label}</span>
                <span className="text-xs text-slate-500">{pct}%</span>
                <span className="text-xs font-medium stat-badge" style={{ color: cfg.color }}>
                  {formatCurrency(chartData.datasets[0].data[i])}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
