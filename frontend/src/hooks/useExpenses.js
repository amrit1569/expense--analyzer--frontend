import { useState, useEffect, useCallback } from 'react';
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../services/expenseService';
import toast from 'react-hot-toast';

export default function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getExpenses();
      // Sort by date desc
      const sorted = [...(data || [])].sort((a, b) => new Date(b.date) - new Date(a.date));
      setExpenses(sorted);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to load expenses';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const addExpense = async (data) => {
    try {
      const created = await createExpense(data);
      setExpenses((prev) =>
        [created, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date))
      );
      toast.success('Expense added successfully');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add expense');
      return false;
    }
  };

  const editExpense = async (id, data) => {
    try {
      const updated = await updateExpense(id, data);
      setExpenses((prev) =>
        prev
          .map((e) => (e.id === id ? updated : e))
          .sort((a, b) => new Date(b.date) - new Date(a.date))
      );
      toast.success('Expense updated');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update expense');
      return false;
    }
  };

  const removeExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
      toast.success('Expense deleted');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete expense');
      return false;
    }
  };

  return { expenses, loading, error, fetchExpenses, addExpense, editExpense, removeExpense };
}
