"use client";
import styles from "./CalendarHero.module.css";
import { MONTH_NAMES } from "@/utils/dateHelpers";
import { MONTH_IMAGES, MONTH_THEMES } from "@/data/monthImages";

export default function CalendarHero({ year, month, direction }) {
  const theme = MONTH_THEMES[month];
  const imgUrl = MONTH_IMAGES[month];

  return (
    <div className={styles.hero}>
      {/* Background Image */}
      <div
        className={styles.heroImage}
        style={{ backgroundImage: `url(${imgUrl})` }}
      />

      {/* Diagonal colored overlay at bottom of image - matching reference */}
      <div
        className={styles.chevronOverlay}
        style={{ background: theme.gradient }}
      />

      {/* Spiral binding decoration */}
      <div className={styles.spiralBinding}>
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className={styles.spiralCoil} />
        ))}
      </div>

      {/* Month and Year label */}
      <div className={styles.monthLabel}>
        <span className={styles.yearText}>{year}</span>
        <span className={styles.monthText}>{MONTH_NAMES[month].toUpperCase()}</span>
      </div>
    </div>
  );
}
