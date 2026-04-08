"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./CalendarApp.module.css";
import CalendarHero from "./CalendarHero";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import { useCalendar } from "@/hooks/useCalendar";
import { useDateRange } from "@/hooks/useDateRange";
import { useNotes } from "@/hooks/useNotes";
import { MONTH_THEMES } from "@/data/monthImages";
import { formatDateShort } from "@/utils/dateHelpers";

export default function CalendarApp() {
  const { year, month, direction, goNext, goPrev, goToday, today } = useCalendar();
  const { startDate, endDate, selecting, handleDayClick, getDayState, clearSelection, hasRange } = useDateRange();
  const { monthNote, setMonthNote, getRangeNote, setRangeNote } = useNotes(year, month);
  const [appTheme, setAppTheme] = useState("light");
  const [animKey, setAnimKey] = useState(0);
  const theme = MONTH_THEMES[month];

  // Trigger animation on month change
  const prevMonth = useRef(month);
  useEffect(() => {
    if (prevMonth.current !== month) {
      setAnimKey((k) => k + 1);
      prevMonth.current = month;
    }
  }, [month]);

  // Theme class switcher
  const themeClass = {
    light: styles.themeLight,
    dark:  styles.themeDark,
    ocean: styles.themeOcean,
    warm:  styles.themeWarm,
  }[appTheme] || styles.themeLight;

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft")  goPrev();
      if (e.key === "Escape")     clearSelection();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, clearSelection]);

  // Dynamic CSS var for month color (for grid day labels)
  const cssVars = {
    "--month-primary": theme.primary,
    "--month-accent":  theme.accent,
    "--range-bg": `${theme.accent}33`,
    "--range-info-bg": `${theme.primary}12`,
    "--accent-primary": theme.primary,
    "--focus-ring": `${theme.primary}33`,
  };

  return (
    <div className={`${styles.root} ${themeClass}`} style={cssVars}>
      {/* Calendar Card */}
      <div className={styles.calendarCard} role="main" aria-label="Wall Calendar">

        {/* Two-column desktop layout: Calendar (left) | Notes (right) */}
        <div className={styles.layout}>

          {/* ── Left / Top: Calendar Column ── */}
          <div className={styles.calendarColumn}>
            {/* Hero image with spiral binding + chevron overlay */}
            <CalendarHero year={year} month={month} direction={direction} />

            {/* Navigation header */}
            <CalendarHeader
              year={year}
              month={month}
              onPrev={goPrev}
              onNext={goNext}
              onToday={goToday}
              appTheme={appTheme}
              onThemeChange={setAppTheme}
            />

            {/* Date grid */}
            <CalendarGrid
              year={year}
              month={month}
              today={today}
              getDayState={getDayState}
              onDayClick={handleDayClick}
              selecting={selecting}
              animKey={animKey}
              direction={direction}
            />

            {/* Range status bar */}
            <div className={styles.statusBar}>
              {selecting && !endDate && (
                <span className={styles.statusMsg} style={{ color: theme.primary }}>
                  📌 Click another date to complete the range
                </span>
              )}
              {hasRange && (
                <div className={styles.rangeStatus}>
                  <span style={{ color: theme.primary }}>
                    📅 {formatDateShort(startDate <= endDate ? startDate : endDate)} → {formatDateShort(startDate <= endDate ? endDate : startDate)}
                  </span>
                  <button
                    id="btn-clear-range"
                    className={styles.clearBtn}
                    onClick={clearSelection}
                    style={{ "--clear-color": theme.primary }}
                  >
                    ✕ Clear
                  </button>
                </div>
              )}
              {!selecting && !hasRange && (
                <span className={styles.hintMsg}>Click a date to start selecting a range · ← → arrow keys to navigate</span>
              )}
            </div>
          </div>

          {/* ── Right / Bottom: Notes Column ── */}
          <div className={styles.notesColumn}>
            <NotesPanel
              year={year}
              month={month}
              monthNote={monthNote}
              setMonthNote={setMonthNote}
              startDate={startDate}
              endDate={endDate}
              getRangeNote={getRangeNote}
              setRangeNote={setRangeNote}
              hasRange={hasRange}
            />
          </div>
        </div>
      </div>

      {/* Page background decoration */}
      <div className={styles.bgDecor1} style={{ background: theme.primary }} />
      <div className={styles.bgDecor2} style={{ background: theme.accent }} />
    </div>
  );
}
