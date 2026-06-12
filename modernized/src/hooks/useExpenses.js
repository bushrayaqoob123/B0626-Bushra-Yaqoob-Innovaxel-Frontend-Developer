import { useState, useEffect, useMemo } from "react";
import { getExpenses, saveExpenses } from "../utils/storage";

export function useExpenses(filterCategory = "All", filterDate = { from: "", to: "" }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      setLoading(true);
      const data = getExpenses();
      setExpenses(data);
    } catch (err) {
      setError("Failed to load expenses. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Persist whenever expenses change
  const persist = (updated) => {
    try {
      saveExpenses(updated);
      setExpenses(updated);
      setError(null);
    } catch (err) {
      setError("Failed to save. Please try again.");
    }
  };

  const addExpense = (expense) => {
    persist([{ ...expense, id: Date.now() }, ...expenses]);
  };

  const updateExpense = (id, updated) => {
    persist(expenses.map((e) => (e.id === id ? { ...updated, id } : e)));
  };

  const deleteExpense = (id) => {
    persist(expenses.filter((e) => e.id !== id));
  };

  // useMemo — filtered + sorted list (no recompute unless deps change)
  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((e) => filterCategory === "All" || e.category === filterCategory)
      .filter((e) => !filterDate.from || e.date >= filterDate.from)
      .filter((e) => !filterDate.to   || e.date <= filterDate.to)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses, filterCategory, filterDate]);

  // Last 7 days data for trend chart
  const last7DaysData = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const label   = d.toLocaleDateString("en-US", { weekday: "short" });
      const total   = expenses
        .filter((e) => e.date === dateStr)
        .reduce((sum, e) => sum + e.amount, 0);
      days.push({ label, dateStr, total });
    }
    return days;
  }, [expenses]);

  return {
    expenses,
    filteredExpenses,
    last7DaysData,
    loading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
  };
}
