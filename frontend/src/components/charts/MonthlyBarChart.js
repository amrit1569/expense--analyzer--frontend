import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { parseISO, format, isValid } from 'date-fns';
import { formatCurrency } from '../../utils/formatters';
import { SkeletonChart } from '../ui/SkeletonLoader';
import { RiBarChartLine } from 'react-icons/ri';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function MonthlyBarChart({ expenses, loading }) {
  const chartData = useMemo(() => {
    const monthMap = {};
    expenses.forEach((e) => {
      try {
        const d = parseISO(e.date);
        if (!isValid(d)) return;
        const key = format(d, 'yyyy-MM');
        const label = format(d, 'MMM yy');
        if (!monthMap[key]) monthMap[key] = { label, amount: 0 };
        monthMap[key].amount += e.amount;
      } catch {}
    });

    const sorted = Object.entries(monthMap).sort(([a], [b]) => a.localeCompare(b)).slice(-8);
    const labels = sorted.map(([, v]) => v.label);
    const data   = sorted.map(([, v]) => v.amount);

    return {
      labels,
      datasets: [
        {
          label: 'Monthly Spend',
          data,
          backgroundColor: (ctx) => {
            const canvas = ctx.chart.ctx;
            const gradient = canvas.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, 'rgba(139,92,246,0.8)');
            gradient.addColorStop(1, 'rgba(34,211,238,0.3)');
            return gradient;
          },
          borderColor: 'rgba(139,92,246,0.9)',
          borderWidth: 1,
          borderRadius: 6,
          borderSkipped: false,
          hoverBackgroundColor: 'rgba(167,139,250,0.9)',
        },
      ],
    };
  }, [expenses]);

  if (loading) return <SkeletonChart />;
  if (!expenses.length) return null;

  return (
    <div className="glass-card rounded-2xl p-5 animate-slide-up">
      <div className="flex items-center gap-2 mb-4">
        <RiBarChartLine size={16} className="text-cyan-400" />
        <h3 className="text-sm font-semibold text-white">Monthly Expenses</h3>
      </div>

      <div className="chart-container" style={{ height: 220 }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
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
                  label: (ctx) => ` ${formatCurrency(ctx.parsed.y)}`,
                },
              },
            },
            scales: {
              x: {
                grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                ticks: { color: '#475569', font: { size: 11, family: 'Inter' } },
                border: { display: false },
              },
              y: {
                grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
                ticks: {
                  color: '#475569',
                  font: { size: 11, family: 'JetBrains Mono' },
                  callback: (v) => `₹${v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v}`,
                },
                border: { display: false },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
