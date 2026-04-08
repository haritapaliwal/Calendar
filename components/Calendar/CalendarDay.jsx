"use client";
import styles from "./CalendarDay.module.css";
import { getHoliday, HOLIDAY_COLORS } from "@/utils/holidays";
import { MONTH_THEMES } from "@/data/monthImages";

export default function CalendarDay({
  day,
  year,
  month,
  dayState,       // "default" | "start" | "end" | "inRange"
  isToday,
  isWeekend,
  isSunday,
  onDayClick,
  selecting,
}) {
  if (day === null) {
    return <div className={styles.emptyCell} />;
  }

  const holiday = getHoliday(year, month, day);
  const theme = MONTH_THEMES[month];

  const cellClass = [
    styles.dayCell,
    dayState === "start"   ? styles.rangeStart  : "",
    dayState === "end"     ? styles.rangeEnd    : "",
    dayState === "inRange" ? styles.inRange     : "",
    isToday                ? styles.today       : "",
    isWeekend              ? styles.weekend     : "",
    isSunday               ? styles.sunday      : "",
    selecting              ? styles.selecting   : "",
  ].filter(Boolean).join(" ");

  const HOLIDAY_EMOJI = {
    national: "🇮🇳",
    indian: "🪔",
    international: "🌐",
  };

  return (
    <button
      id={`day-${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`}
      className={cellClass}
      onClick={() => onDayClick(year, month, day)}
      style={{
        "--month-primary": theme.primary,
        "--month-accent": theme.accent,
        "--month-gradient": theme.gradient,
      }}
      aria-label={`${day} ${String(month + 1).padStart(2, "0")} ${year}${holiday ? `, ${holiday.name}` : ""}${isToday ? ", Today" : ""}`}
    >
      {/* Today glow ring */}
      {isToday && <span className={styles.todayRing} />}

      <span className={styles.dayNumber}>{day}</span>

      {/* Today label badge */}
      {isToday && <span className={styles.todayLabel}>TODAY</span>}

      {/* Holiday badge with hover tooltip */}
      {holiday && (
        <span className={styles.holidayBadgeWrapper}>
          <span
            className={styles.holidayDot}
            style={{
              background: HOLIDAY_COLORS[holiday.type],
              "--holiday-color": HOLIDAY_COLORS[holiday.type],
            }}
          >
            {HOLIDAY_EMOJI[holiday.type]}
          </span>
          <span
            className={styles.holidayTooltip}
            style={{ borderColor: HOLIDAY_COLORS[holiday.type], color: HOLIDAY_COLORS[holiday.type] }}
          >
            {holiday.name}
          </span>
        </span>
      )}
    </button>
  );
}
