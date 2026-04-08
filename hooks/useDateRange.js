"use client";
import { useState } from "react";
import { makeDate, isSameDay, isInRange } from "@/utils/dateHelpers";

export function useDateRange() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selecting, setSelecting] = useState(false); // true = waiting for end

  const handleDayClick = (year, month, day) => {
    const clicked = makeDate(year, month, day);

    if (!selecting || !startDate) {
      // Start new selection
      setStartDate(clicked);
      setEndDate(null);
      setSelecting(true);
    } else {
      // Finish selection
      if (isSameDay(clicked, startDate)) {
        // Click same day = deselect
        setStartDate(null);
        setEndDate(null);
        setSelecting(false);
      } else {
        // Ensure startDate is always the smaller date
        if (clicked < startDate) {
          setEndDate(startDate);
          setStartDate(clicked);
        } else {
          setEndDate(clicked);
        }
        setSelecting(false);
      }
    }
  };

  const getDayState = (year, month, day) => {
    const date = makeDate(year, month, day);
    const [s, e] = startDate && endDate
      ? (startDate <= endDate ? [startDate, endDate] : [endDate, startDate])
      : [startDate, null];

    if (isSameDay(date, s)) return "start";
    if (e && isSameDay(date, e)) return "end";
    if (s && e && isInRange(date, s, e)) return "inRange";
    return "default";
  };

  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setSelecting(false);
  };

  const hasRange = startDate && endDate;

  return {
    startDate,
    endDate,
    selecting,
    handleDayClick,
    getDayState,
    clearSelection,
    hasRange,
  };
}
