"use client";
import styles from "./CalendarHeader.module.css";
import { MONTH_NAMES } from "@/utils/dateHelpers";
import { MONTH_THEMES } from "@/data/monthImages";

export default function CalendarHeader({ year, month, onPrev, onNext, onToday, appTheme, onThemeChange }) {
  const theme = MONTH_THEMES[month];

  const THEMES = [
    { id: "light",  label: "☀️ Light" },
    { id: "dark",   label: "🌙 Dark" },
    { id: "ocean",  label: "🌊 Ocean" },
    { id: "warm",   label: "🌅 Warm" },
  ];

  return (
    <div className={styles.header}>
      <div className={styles.navSection}>
        <button
          id="btn-prev-month"
          className={styles.navBtn}
          onClick={onPrev}
          aria-label="Previous month"
          style={{ "--accent": theme.primary }}
        >
          ‹
        </button>

        <div className={styles.monthYearDisplay}>
          <span className={styles.monthName} style={{ color: theme.primary }}>
            {MONTH_NAMES[month]}
          </span>
          <span className={styles.yearDisplay}>{year}</span>
        </div>

        <button
          id="btn-next-month"
          className={styles.navBtn}
          onClick={onNext}
          aria-label="Next month"
          style={{ "--accent": theme.primary }}
        >
          ›
        </button>
      </div>

      <div className={styles.controls}>
        <button
          id="btn-today"
          className={styles.todayBtn}
          onClick={onToday}
          style={{ background: theme.gradient }}
        >
          Today
        </button>

        <div className={styles.themeDropdown}>
          <select
            id="theme-select"
            value={appTheme}
            onChange={(e) => onThemeChange(e.target.value)}
            className={styles.themeSelect}
            aria-label="Select theme"
          >
            {THEMES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
