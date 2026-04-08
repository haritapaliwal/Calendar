"use client";
import { useState, useEffect } from "react";

const STORAGE_KEY = "tuf_calendar_notes";

export function useNotes(year, month) {
  const [notes, setNotes] = useState({});

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setNotes(JSON.parse(stored));
    } catch {}
  }, []);

  const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;

  const getNote = (key) => {
    return notes[key] || "";
  };

  const setNote = (key, text) => {
    const updated = { ...notes, [key]: text };
    setNotes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  };

  const monthNoteKey = `month_${monthKey}`;
  const monthNote = getNote(monthNoteKey);
  const setMonthNote = (text) => setNote(monthNoteKey, text);

  const getRangeNote = (startDate, endDate) => {
    if (!startDate || !endDate) return "";
    const [s, e] = startDate <= endDate ? [startDate, endDate] : [endDate, startDate];
    const key = `range_${s.toISOString().split("T")[0]}_${e.toISOString().split("T")[0]}`;
    return getNote(key);
  };

  const setRangeNote = (startDate, endDate, text) => {
    if (!startDate || !endDate) return;
    const [s, e] = startDate <= endDate ? [startDate, endDate] : [endDate, startDate];
    const key = `range_${s.toISOString().split("T")[0]}_${e.toISOString().split("T")[0]}`;
    setNote(key, text);
  };

  return { monthNote, setMonthNote, getRangeNote, setRangeNote, monthKey };
}
