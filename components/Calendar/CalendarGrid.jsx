"use client";
import { useMemo } from "react";
import styles from "./CalendarGrid.module.css";
import CalendarDay from "./CalendarDay";
import { buildCalendarGrid, makeDate, isSameDay, DAY_LABELS } from "@/utils/dateHelpers";

export default function CalendarGrid({
  year,
  month,
  today,
  getDayState,
  onDayClick,
  selecting,
  animKey,
  direction,
}) {
  const cells = useMemo(() => buildCalendarGrid(year, month), [year, month]);

  return (
    <div
      className={`${styles.gridWrapper} ${direction === "forward" ? styles.enterForward : styles.enterBackward}`}
      key={animKey}
    >
      {/* Day-of-week headers */}
      <div className={styles.dayHeaders}>
        {DAY_LABELS.map((label, i) => (
          <div
            key={label}
            className={`${styles.dayHeader} ${i === 5 ? styles.satHeader : ""} ${i === 6 ? styles.sunHeader : ""}`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className={styles.daysGrid}>
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className={styles.emptyCell} />;
          }

          const colIndex = idx % 7; // 0=Mon, 5=Sat, 6=Sun
          const dayDate = makeDate(year, month, day);
          const isTodayDay = isSameDay(dayDate, today);
          const isWeekend = colIndex === 5;
          const isSunday  = colIndex === 6;
          const dayState  = getDayState(year, month, day);

          return (
            <CalendarDay
              key={`${year}-${month}-${day}`}
              day={day}
              year={year}
              month={month}
              dayState={dayState}
              isToday={isTodayDay}
              isWeekend={isWeekend}
              isSunday={isSunday}
              onDayClick={onDayClick}
              selecting={selecting}
            />
          );
        })}
      </div>
    </div>
  );
}
