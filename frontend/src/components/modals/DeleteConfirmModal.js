import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { RiDeleteBinLine, RiAlertLine } from 'react-icons/ri';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { getCategoryConfig } from '../../utils/categoryConfig';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, expense }) {
  const [deleting, setDeleting] = useState(false);

  if (!expense) return null;
  const cfg = getCategoryConfig(expense.category);

  const handleConfirm = async () => {
    setDeleting(true);
    await onConfirm(expense.id);
    setDeleting(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Expense" size="sm">
      <div className="space-y-5">
        {/* Warning icon */}
        <div className="flex items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
            <RiAlertLine size={28} className="text-rose-400" />
          </div>
        </div>

        {/* Message */}
        <div className="text-center space-y-1">
          <p className="text-base font-semibold text-white">Are you sure?</p>
          <p className="text-sm text-slate-500">
            This action cannot be undone. The expense will be permanently removed.
          </p>
        </div>

        {/* Expense preview */}
        <div className="glass-card rounded-xl p-3.5 flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-sm flex-shrink-0"
            style={{ background: cfg.bg, color: cfg.color }}
          >
            {expense.category[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{expense.title}</p>
            <p className="text-[11px] text-slate-500">{expense.category} · {formatDate(expense.date)}</p>
          </div>
          <p className="text-sm font-bold stat-badge" style={{ color: cfg.color }}>
            {formatCurrency(expense.amount)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-white/[0.08] text-sm text-slate-400 hover:text-white hover:bg-white/[0.04] transition-fast font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={deleting}
            className="flex-1 py-2.5 rounded-xl btn-danger text-white text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {deleting ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Deleting…
              </>
            ) : (
              <>
                <RiDeleteBinLine size={14} />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
