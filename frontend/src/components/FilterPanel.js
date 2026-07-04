import React from 'react';
import { RiFilterLine, RiRefreshLine } from 'react-icons/ri';
import { CATEGORIES } from '../utils/categoryConfig';

export default function FilterPanel({ filters, onChange, onReset }) {
  const hasFilters = filters.category || filters.dateFrom || filters.dateTo || filters.sort !== 'latest';

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <RiFilterLine size={15} className="text-violet-400" />
          Filters
          {hasFilters && (
            <span className="ml-1 w-2 h-2 rounded-full bg-violet-400 animate-pulse-slow" />
          )}
        </div>
        {hasFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-violet-400 transition-fast"
          >
            <RiRefreshLine size={13} />
            Reset
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Category */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[11px] text-slate-500 mb-1.5 font-medium uppercase tracking-wider">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className="input-glass w-full px-3 py-2 rounded-lg text-sm"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Date from */}
        <div>
          <label className="block text-[11px] text-slate-500 mb-1.5 font-medium uppercase tracking-wider">
            From
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
            className="input-glass w-full px-3 py-2 rounded-lg text-sm"
          />
        </div>

        {/* Date to */}
        <div>
          <label className="block text-[11px] text-slate-500 mb-1.5 font-medium uppercase tracking-wider">
            To
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
            className="input-glass w-full px-3 py-2 rounded-lg text-sm"
          />
        </div>

        {/* Sort */}
        <div>
          <label className="block text-[11px] text-slate-500 mb-1.5 font-medium uppercase tracking-wider">
            Sort
          </label>
          <select
            value={filters.sort}
            onChange={(e) => onChange({ ...filters, sort: e.target.value })}
            className="input-glass w-full px-3 py-2 rounded-lg text-sm"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>
      </div>
    </div>
  );
}
