import React, { useMemo, useState } from 'react';
import ExpenseCard from './ExpenseCard';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import { EmptyExpenses, EmptySearch } from './ui/EmptyState';
import { SkeletonList } from './ui/SkeletonLoader';
import { RiAddLine, RiListCheck } from 'react-icons/ri';

const DEFAULT_FILTERS = { category: '', dateFrom: '', dateTo: '', sort: 'latest' };

export default function ExpenseList({ expenses, loading, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const filtered = useMemo(() => {
    let list = [...expenses];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.title?.toLowerCase().includes(q) ||
          e.category?.toLowerCase().includes(q) ||
          String(e.amount).includes(q)
      );
    }

    // Category
    if (filters.category) {
      list = list.filter((e) => e.category === filters.category);
    }

    // Date range
    if (filters.dateFrom) {
      list = list.filter((e) => e.date >= filters.dateFrom);
    }
    if (filters.dateTo) {
      list = list.filter((e) => e.date <= filters.dateTo);
    }

    // Sort
    if (filters.sort === 'latest')  list.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (filters.sort === 'oldest')  list.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (filters.sort === 'highest') list.sort((a, b) => b.amount - a.amount);
    if (filters.sort === 'lowest')  list.sort((a, b) => a.amount - b.amount);

    return list;
  }, [expenses, search, filters]);

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  if (loading) return <SkeletonList rows={6} />;

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RiListCheck size={18} className="text-violet-400" />
          <h2 className="text-base font-semibold text-white">All Expenses</h2>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 text-xs font-medium border border-violet-500/20">
            {filtered.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-fast ${
              showFilters
                ? 'bg-violet-500/15 text-violet-400 border-violet-500/30'
                : 'text-slate-400 border-white/[0.06] hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Filters
          </button>
          <button
            onClick={onAdd}
            className="btn-gradient flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
          >
            <RiAddLine size={14} />
            Add
          </button>
        </div>
      </div>

      {/* Search */}
      <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} />

      {/* Filters */}
      {showFilters && (
        <div className="animate-slide-up">
          <FilterPanel
            filters={filters}
            onChange={(f) => { setFilters(f); setPage(1); }}
            onReset={() => { setFilters(DEFAULT_FILTERS); setPage(1); }}
          />
        </div>
      )}

      {/* List */}
      {expenses.length === 0 ? (
        <EmptyExpenses onAdd={onAdd} />
      ) : filtered.length === 0 ? (
        <EmptySearch query={search || filters.category} />
      ) : (
        <div className="space-y-2.5">
          {paginated.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

          {hasMore && (
            <button
              onClick={() => setPage((p) => p + 1)}
              className="w-full py-3 rounded-xl border border-white/[0.06] text-sm text-slate-400 hover:text-white hover:bg-white/[0.03] transition-fast"
            >
              Load {Math.min(PER_PAGE, filtered.length - paginated.length)} more
            </button>
          )}
        </div>
      )}
    </div>
  );
}
