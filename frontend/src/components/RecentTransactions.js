import React from 'react';
import { RiArrowRightLine, RiHistoryLine } from 'react-icons/ri';
import { getCategoryConfig } from '../utils/categoryConfig';
import { formatCurrency, formatDate } from '../utils/formatters';
import { SkeletonList } from './ui/SkeletonLoader';

export default function RecentTransactions({ expenses, loading, onViewAll }) {
  const recent = expenses.slice(0, 5);

  if (loading) return <SkeletonList rows={5} />;

  return (
    <div className="glass-card rounded-2xl p-5 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <RiHistoryLine size={16} className="text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Recent Transactions</h3>
        </div>
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-fast font-medium"
        >
          View all
          <RiArrowRightLine size={13} />
        </button>
      </div>

      {recent.length === 0 ? (
        <p className="text-sm text-slate-600 text-center py-8">No transactions yet</p>
      ) : (
        <div className="space-y-1">
          {recent.map((expense) => {
            const cfg = getCategoryConfig(expense.category);
            return (
              <div
                key={expense.id}
                className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-white/[0.03] transition-fast group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: cfg.bg, color: cfg.color }}
                >
                  {expense.category[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200 truncate">{expense.title}</p>
                  <p className="text-[11px] text-slate-600">{formatDate(expense.date)}</p>
                </div>
                <span className="text-sm font-bold stat-badge flex-shrink-0" style={{ color: cfg.color }}>
                  {formatCurrency(expense.amount)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
