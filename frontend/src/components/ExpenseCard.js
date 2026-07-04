import React, { useState } from 'react';
import { RiEditLine, RiDeleteBinLine, RiMoreLine } from 'react-icons/ri';
import { getCategoryConfig } from '../utils/categoryConfig';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function ExpenseCard({ expense, onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  const cfg = getCategoryConfig(expense.category);

  return (
    <div
      className="glass-card glass-card-hover rounded-xl p-4 flex items-center gap-4 group animate-fade-in"
      style={{ '--glow': cfg.glow }}
    >
      {/* Category icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-semibold text-sm"
        style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}22` }}
      >
        {(expense.category || expense.title || '?')[0].toUpperCase()}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{expense.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className="text-[11px] font-medium px-2 py-0.5 rounded-full"
            style={{ background: cfg.bg, color: cfg.color }}
          >
            {expense.category}
          </span>
          <span className="text-[11px] text-slate-600">·</span>
          <span className="text-[11px] text-slate-500">{formatDate(expense.date)}</span>
        </div>
      </div>

      {/* Amount */}
      <div className="flex-shrink-0 text-right">
        <p className="text-sm font-bold stat-badge" style={{ color: cfg.color }}>
          {formatCurrency(expense.amount)}
        </p>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 relative">
        <button
          onClick={() => setShowMenu((v) => !v)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-white hover:bg-white/[0.06] opacity-0 group-hover:opacity-100 transition-fast"
        >
          <RiMoreLine size={16} />
        </button>

        {showMenu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
            <div className="absolute right-0 top-9 z-20 w-36 glass-card rounded-xl border border-white/[0.08] overflow-hidden shadow-glass animate-scale-in">
              <button
                onClick={() => { onEdit(expense); setShowMenu(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/[0.05] transition-fast"
              >
                <RiEditLine size={14} className="text-violet-400" />
                Edit
              </button>
              <button
                onClick={() => { onDelete(expense); setShowMenu(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-300 hover:text-rose-400 hover:bg-rose-500/[0.06] transition-fast"
              >
                <RiDeleteBinLine size={14} className="text-rose-400" />
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
