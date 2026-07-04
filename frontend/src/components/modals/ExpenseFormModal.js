import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { CATEGORIES } from '../../utils/categoryConfig';
import {
  RiMoneyDollarCircleLine,
  RiCalendarLine,
  RiPriceTagLine,
  RiFileTextLine
} from 'react-icons/ri';

const EMPTY_FORM = {
  title: '',
  amount: '',
  category: 'Food',
  date: ''
};

function Field({ label, icon: Icon, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
        <Icon size={12} className="text-violet-400" />
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ExpenseFormModal({
  isOpen,
  onClose,
  onSubmit,
  expense
}) {
  const isEdit = !!expense;

  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (expense) {
        setForm({
          title: expense.title || '',
          amount: String(expense.amount || ''),
          category: expense.category || 'Food',
          date: expense.date || ''
        });
      } else {
        setForm({
          ...EMPTY_FORM,
          date: new Date().toISOString().slice(0, 10)
        });
      }

      setErrors({});
    }
  }, [isOpen, expense]);

  const validate = () => {
    const e = {};

    if (!form.title.trim()) {
      e.title = 'Title is required';
    }

    if (
      !form.amount ||
      isNaN(Number(form.amount)) ||
      Number(form.amount) <= 0
    ) {
      e.amount = 'Enter a valid amount';
    }

    if (!form.category) {
      e.category = 'Select a category';
    }

    if (!form.date) {
      e.date = 'Date is required';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSubmitting(true);

    const payload = {
      title: form.title.trim(),
      amount: parseFloat(form.amount),
      category: form.category,
      date: form.date
    };

    const ok = await onSubmit(payload);

    setSubmitting(false);

    if (ok) {
      onClose();
    }
  };

  const set = (key) => (e) => {
    setForm((f) => ({
      ...f,
      [key]: e.target.value
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Expense' : 'Add Expense'}
    >
      <div className="space-y-4">

        <Field label="Title" icon={RiFileTextLine}>
          <input
            type="text"
            value={form.title}
            onChange={set('title')}
            placeholder="e.g. Coffee, Groceries..."
            className={`input-glass w-full px-3.5 py-2.5 rounded-xl text-sm ${
              errors.title ? 'border-rose-500/50' : ''
            }`}
          />
          {errors.title && (
            <p className="text-rose-400 text-[11px] mt-1">
              {errors.title}
            </p>
          )}
        </Field>

        <div className="grid grid-cols-2 gap-4">

          <Field label="Amount (₹)" icon={RiMoneyDollarCircleLine}>
            <input
              type="number"
              value={form.amount}
              onChange={set('amount')}
              placeholder="0.00"
              min="0"
              step="0.01"
              className={`input-glass w-full px-3.5 py-2.5 rounded-xl text-sm font-mono ${
                errors.amount ? 'border-rose-500/50' : ''
              }`}
            />
            {errors.amount && (
              <p className="text-rose-400 text-[11px] mt-1">
                {errors.amount}
              </p>
            )}
          </Field>

          <Field label="Date" icon={RiCalendarLine}>
            <input
              type="date"
              value={form.date}
              onChange={set('date')}
              className={`input-glass w-full px-3.5 py-2.5 rounded-xl text-sm ${
                errors.date ? 'border-rose-500/50' : ''
              }`}
            />
            {errors.date && (
              <p className="text-rose-400 text-[11px] mt-1">
                {errors.date}
              </p>
            )}
          </Field>

        </div>

        <Field label="Category" icon={RiPriceTagLine}>
          <select
            value={form.category}
            onChange={set('category')}
            className={`input-glass w-full px-3.5 py-2.5 rounded-xl text-sm ${
              errors.category ? 'border-rose-500/50' : ''
            }`}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <div className="flex gap-3 pt-2">

          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-white/[0.08] text-sm text-slate-400 hover:text-white hover:bg-white/[0.04] transition-fast font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 py-2.5 rounded-xl btn-gradient text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Saving...
              </span>
            ) : isEdit ? (
              'Save Changes'
            ) : (
              'Add Expense'
            )}
          </button>

        </div>
      </div>
    </Modal>
  );
}