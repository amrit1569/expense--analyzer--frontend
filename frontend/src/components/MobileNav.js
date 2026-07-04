import React from 'react';
import { RiDashboardLine, RiMoneyDollarCircleLine, RiBarChartLine } from 'react-icons/ri';

const NAV_ITEMS = [
  { icon: RiDashboardLine,         label: 'Dashboard', id: 'dashboard' },
  { icon: RiMoneyDollarCircleLine, label: 'Expenses',  id: 'expenses'  },
  { icon: RiBarChartLine,          label: 'Analytics', id: 'analytics' },
];

export default function MobileNav({ activeSection, onSectionChange }) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-card border-t border-white/[0.05] border-x-0 border-b-0">
      <div className="flex items-center justify-around py-2 px-4">
        {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
          <button
            key={id}
            onClick={() => onSectionChange(id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-fast ${
              activeSection === id
                ? 'mobile-nav-active'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
