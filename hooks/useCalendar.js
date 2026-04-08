"use client";
import { useState } from "react";

export function useCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [direction, setDirection] = useState("forward"); // for animation

  const goNext = () => {
    setDirection("forward");
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const goPrev = () => {
    setDirection("backward");
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const goToday = () => {
    setDirection("forward");
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  };

  return { year, month, direction, goNext, goPrev, goToday, today };
}
