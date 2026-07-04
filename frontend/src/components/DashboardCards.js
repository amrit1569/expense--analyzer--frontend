import React, { useMemo } from 'react';
import {
  RiMoneyDollarCircleLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiCalendarLine,
  RiPieChartLine,
} from 'react-icons/ri';
import { formatCurrency } from '../utils/formatters';
import { getCategoryConfig } from '../utils/categoryConfig';
import { SkeletonStatCard } from './ui/SkeletonLoader';
import { format, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';

function StatCard({ icon: Icon, label, value, subValue, color, trend, loading }) {
  if (loading) return <SkeletonStatCard />;

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-5 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full ${
              trend >= 0
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}
          >
            {trend >= 0 ? <RiArrowUpLine size={11} /> : <RiArrowDownLine size={11} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-white stat-badge tracking-tight">{value}</p>
      <p className="text-xs text-slate-500 mt-1 font-medium">{label}</p>
      {subValue && <p className="text-xs text-slate-600 mt-0.5">{subValue}</p>}
    </div>
  );
}

function CategorySummaryCard({ category, amount, count, percentage, loading }) {
  if (loading) return <SkeletonStatCard />;
  const cfg = getCategoryConfig(category);

  return (
    <div className="glass-card glass-card-hover rounded-xl p-4 animate-fade-in">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold"
          style={{ background: cfg.bg, color: cfg.color }}
        >
          {category[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{category}</p>
          <p className="text-[11px] text-slate-500">{count} transaction{count !== 1 ? 's' : ''}</p>
        </div>
        <p className="text-sm font-bold stat-badge" style={{ color: cfg.color }}>
          {formatCurrency(amount)}
        </p>
      </div>
      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%`, background: cfg.color }}
        />
      </div>
      <p className="text-[10px] text-slate-600 mt-1.5 text-right">{percentage}% of total</p>
    </div>
  );
}

export default function DashboardCards({ expenses, loading }) {
  const stats = useMemo(() => {
    if (!expenses.length) return null;

    const total = expenses.reduce((s, e) => s + e.amount, 0);

    const now = new Date();
    const thisMonth = expenses.filter((e) => {
      try {
        return isWithinInterval(parseISO(e.date), {
          start: startOfMonth(now),
          end: endOfMonth(now),
        });
      } catch { return false; }
    });
    const monthTotal = thisMonth.reduce((s, e) => s + e.amount, 0);

    const lastMonthStart = startOfMonth(new Date(now.getFullYear(), now.getMonth() - 1));
    const lastMonthEnd = endOfMonth(new Date(now.getFullYear(), now.getMonth() - 1));
    const lastMonthTotal = expenses
      .filter((e) => {
        try {
          return isWithinInterval(parseISO(e.date), { start: lastMonthStart, end: lastMonthEnd });
        } catch { return false; }
      })
      .reduce((s, e) => s + e.amount, 0);

    const trend =
      lastMonthTotal === 0
        ? null
        : Math.round(((monthTotal - lastMonthTotal) / lastMonthTotal) * 100);

    // Category breakdown
    const catMap = {};
    expenses.forEach((e) => {
      if (!catMap[e.category]) catMap[e.category] = { amount: 0, count: 0 };
      catMap[e.category].amount += e.amount;
      catMap[e.category].count += 1;
    });
    const categories = Object.entries(catMap)
      .sort((a, b) => b[1].amount - a[1].amount)
      .slice(0, 4)
      .map(([cat, data]) => ({
        category: cat,
        amount: data.amount,
        count: data.count,
        percentage: total > 0 ? Math.round((data.amount / total) * 100) : 0,
      }));

    return { total, monthTotal, trend, count: expenses.length, thisMonthCount: thisMonth.length, categories };
  }, [expenses]);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          loading={loading}
          icon={RiMoneyDollarCircleLine}
          label="Total Spent"
          value={stats ? formatCurrency(stats.total) : '₹0'}
          subValue={`${stats?.count ?? 0} transactions`}
          color="#a78bfa"
        />
        <StatCard
          loading={loading}
          icon={RiCalendarLine}
          label={`This Month (${format(new Date(), 'MMM')})`}
          value={stats ? formatCurrency(stats.monthTotal) : '₹0'}
          subValue={`${stats?.thisMonthCount ?? 0} transactions`}
          color="#22d3ee"
          trend={stats?.trend}
        />
        <StatCard
          loading={loading}
          icon={RiPieChartLine}
          label="Top Category"
          value={stats?.categories?.[0]?.category ?? '—'}
          subValue={stats?.categories?.[0] ? formatCurrency(stats.categories[0].amount) : ''}
          color="#34d399"
        />
        <StatCard
          loading={loading}
          icon={RiArrowUpLine}
          label="Avg. per Transaction"
          value={stats && stats.count > 0 ? formatCurrency(Math.round(stats.total / stats.count)) : '₹0'}
          subValue="across all time"
          color="#fb7185"
        />
      </div>

      {/* Category summary */}
      {!loading && stats?.categories?.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
            <RiPieChartLine size={14} className="text-violet-400" />
            Spending by Category
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.categories.map((cat) => (
              <CategorySummaryCard key={cat.category} {...cat} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
