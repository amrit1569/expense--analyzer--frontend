import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiLogoutBoxLine, RiWalletLine, RiMenuLine, RiCloseLine } from 'react-icons/ri';
import { logout } from '../services/authService';
import toast from 'react-hot-toast';

export default function Navbar({ sidebarOpen, onToggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 h-16 glass-card border-b border-white/[0.05] border-x-0 border-t-0">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-fast"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <RiCloseLine size={20} /> : <RiMenuLine size={20} />}
        </button>

        {/* Logo — visible on mobile when sidebar is closed */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
            <RiWalletLine size={16} className="text-white" />
          </div>
          <span className="font-semibold text-white text-sm">Expense Analyzer</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
          <span className="text-xs text-slate-400 font-medium">Connected</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-fast"
        >
          <RiLogoutBoxLine size={16} />
          <span className="hidden sm:inline font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
}
