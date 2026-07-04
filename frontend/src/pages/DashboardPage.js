import React, { useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';
import DashboardCards from '../components/DashboardCards';
import ExpenseList from '../components/ExpenseList';
import RecentTransactions from '../components/RecentTransactions';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import MonthlyBarChart from '../components/charts/MonthlyBarChart';
import ExpenseFormModal from '../components/modals/ExpenseFormModal';
import DeleteConfirmModal from '../components/modals/DeleteConfirmModal';
import useExpenses from '../hooks/useExpenses';
import { ErrorState } from '../components/ui/EmptyState';
import { RiAddLine, RiRefreshLine } from 'react-icons/ri';
import { format } from 'date-fns';

export default function DashboardPage() {
  const { expenses, loading, error, fetchExpenses, addExpense, editExpense, removeExpense } = useExpenses();

  const [activeSection, setActiveSection]   = useState('dashboard');
  const [sidebarOpen, setSidebarOpen]       = useState(false);

  // Modals
  const [addOpen, setAddOpen]               = useState(false);
  const [editTarget, setEditTarget]         = useState(null);
  const [deleteTarget, setDeleteTarget]     = useState(null);

  const handleEdit   = useCallback((expense) => setEditTarget(expense), []);
  const handleDelete = useCallback((expense) => setDeleteTarget(expense), []);
  const handleAdd    = useCallback(() => setAddOpen(true), []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  const renderSection = () => {
    if (error) {
      return <ErrorState message={error} onRetry={fetchExpenses} />;
    }

    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Page header */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Good {getGreeting()}, <span className="text-gradient">Amrit</span> 👋
                </h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  {format(new Date(), 'EEEE, dd MMMM yyyy')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchExpenses}
                  disabled={loading}
                  className="p-2 rounded-xl border border-white/[0.06] text-slate-500 hover:text-white hover:bg-white/[0.04] transition-fast disabled:opacity-40"
                  title="Refresh"
                >
                  <RiRefreshLine size={16} className={loading ? 'animate-spin' : ''} />
                </button>
                <button
                  onClick={handleAdd}
                  className="btn-gradient flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-lg"
                >
                  <RiAddLine size={16} />
                  <span className="hidden sm:inline">Add Expense</span>
                </button>
              </div>
            </div>

            {/* Stat cards */}
            <DashboardCards expenses={expenses} loading={loading} />

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <CategoryPieChart expenses={expenses} loading={loading} />
              <MonthlyBarChart  expenses={expenses} loading={loading} />
            </div>

            {/* Recent transactions */}
            <RecentTransactions
              expenses={expenses}
              loading={loading}
              onViewAll={() => setActiveSection('expenses')}
            />
          </div>
        );

      case 'expenses':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Expenses</h1>
                <p className="text-sm text-slate-500 mt-0.5">Manage all your transactions</p>
              </div>
              <button
                onClick={fetchExpenses}
                disabled={loading}
                className="p-2 rounded-xl border border-white/[0.06] text-slate-500 hover:text-white hover:bg-white/[0.04] transition-fast disabled:opacity-40"
                title="Refresh"
              >
                <RiRefreshLine size={16} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
            <ExpenseList
              expenses={expenses}
              loading={loading}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-4">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Analytics</h1>
              <p className="text-sm text-slate-500 mt-0.5">Visual breakdown of your spending</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <MonthlyBarChart  expenses={expenses} loading={loading} />
              <CategoryPieChart expenses={expenses} loading={loading} />
            </div>
            <DashboardCards expenses={expenses} loading={loading} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex relative z-10">
      {/* Desktop sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-30 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-40 w-64">
            <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} />

        <main className="flex-1 px-4 md:px-6 py-6 pb-24 lg:pb-8 max-w-7xl w-full mx-auto">
          {renderSection()}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav activeSection={activeSection} onSectionChange={handleSectionChange} />

      {/* Modals */}
      <ExpenseFormModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={addExpense}
      />

      <ExpenseFormModal
        isOpen={!!editTarget}
        onClose={() => setEditTarget(null)}
        onSubmit={(data) => editExpense(editTarget.id, data)}
        expense={editTarget}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={removeExpense}
        expense={deleteTarget}
      />
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}
