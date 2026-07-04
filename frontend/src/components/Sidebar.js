import React from 'react';
import {
  RiWalletLine,
  RiDashboardLine,
  RiMoneyDollarCircleLine,
  RiBarChartLine,
  RiSettings3Line,
  RiShieldCheckLine,
} from 'react-icons/ri';

const NAV_ITEMS = [
  { icon: RiDashboardLine,          label: 'Dashboard',   id: 'dashboard' },
  { icon: RiMoneyDollarCircleLine,  label: 'Expenses',    id: 'expenses'  },
  { icon: RiBarChartLine,           label: 'Analytics',   id: 'analytics' },
];

export default function Sidebar({ activeSection, onSectionChange }) {
  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen glass-card border-r border-white/[0.05] border-y-0 border-l-0 py-6">
      {/* Logo */}
      <div className="px-5 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl btn-gradient flex items-center justify-center shadow-lg glow-violet">
            <RiWalletLine size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white tracking-tight">Expense Analyzer</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Finance Dashboard</p>
          </div>
        </div>
      </div>

      {/* Nav section */}
      <nav className="flex-1 px-3 space-y-0.5">
        <p className="px-3 text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-2">
          Main Menu
        </p>
        {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
          <button
            key={id}
            onClick={() => onSectionChange(id)}
            className={`sidebar-link w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left ${
              activeSection === id ? 'active text-violet-400' : 'text-slate-400'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="px-3 mt-4 space-y-0.5 border-t border-white/[0.05] pt-4">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
          <RiShieldCheckLine size={16} className="text-emerald-400" />
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Secure Session</p>
            <p className="text-[10px] text-slate-600">JWT Protected</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 text-[11px]">
          <RiSettings3Line size={14} />
          <span>v1.0.0</span>
        </div>
      </div>
    </aside>
  );
}
