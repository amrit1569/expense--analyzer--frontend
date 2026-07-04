import React from 'react';
import { RiFileListLine, RiSearchLine, RiErrorWarningLine } from 'react-icons/ri';

export function EmptyExpenses({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      {/* SVG Illustration */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="8" y="12" width="32" height="26" rx="4" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 2"/>
            <path d="M16 20h16M16 26h10" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="36" cy="36" r="8" fill="#141428" stroke="#22d3ee" strokeWidth="2"/>
            <path d="M36 32v4l2 2" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center">
          <span className="text-white text-xs">+</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">No expenses yet</h3>
      <p className="text-slate-500 text-sm max-w-xs leading-relaxed mb-6">
        Start tracking your spending by adding your first expense. Every great financial journey starts with one entry.
      </p>

      {onAdd && (
        <button
          onClick={onAdd}
          className="btn-gradient px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-lg"
        >
          Add Your First Expense
        </button>
      )}
    </div>
  );
}

export function EmptySearch({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-white/[0.06] flex items-center justify-center mb-4">
        <RiSearchLine size={28} className="text-slate-500" />
      </div>
      <h3 className="text-base font-semibold text-white mb-1">No results found</h3>
      <p className="text-slate-500 text-sm">
        No expenses match <span className="text-violet-400">"{query}"</span>
      </p>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">
        <RiErrorWarningLine size={28} className="text-rose-400" />
      </div>
      <h3 className="text-base font-semibold text-white mb-1">Something went wrong</h3>
      <p className="text-slate-500 text-sm mb-4 max-w-xs">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-lg border border-white/[0.08] text-sm text-slate-300 hover:text-white hover:bg-white/[0.04] transition-fast"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
