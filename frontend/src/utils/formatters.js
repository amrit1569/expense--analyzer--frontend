import { format, parseISO, isValid } from 'date-fns';

export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  try {
    const d = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
    if (!isValid(d)) return dateStr;
    return format(d, 'dd MMM yyyy');
  } catch {
    return dateStr;
  }
};

export const formatMonthYear = (dateStr) => {
  if (!dateStr) return '—';
  try {
    const d = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
    if (!isValid(d)) return dateStr;
    return format(d, 'MMM yyyy');
  } catch {
    return dateStr;
  }
};

export const formatDateInput = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
    if (!isValid(d)) return dateStr;
    return format(d, 'yyyy-MM-dd');
  } catch {
    return dateStr;
  }
};

export const truncate = (str, n = 28) =>
  str?.length > n ? str.slice(0, n) + '…' : str;
