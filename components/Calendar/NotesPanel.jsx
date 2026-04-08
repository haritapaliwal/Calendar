"use client";
import { useState } from "react";
import styles from "./NotesPanel.module.css";
import { MONTH_NAMES, formatDateShort } from "@/utils/dateHelpers";
import { MONTH_THEMES } from "@/data/monthImages";

const MAX_CHARS = 500;

export default function NotesPanel({
  year,
  month,
  monthNote,
  setMonthNote,
  startDate,
  endDate,
  getRangeNote,
  setRangeNote,
  hasRange,
}) {
  const [activeTab, setActiveTab] = useState("month");
  const theme = MONTH_THEMES[month];

  const rangeNote = hasRange ? getRangeNote(startDate, endDate) : "";
  const handleRangeNote = (text) => {
    if (hasRange) setRangeNote(startDate, endDate, text);
  };

  const activeNote = activeTab === "month" ? monthNote : rangeNote;
  const setActiveNote = activeTab === "month" ? setMonthNote : handleRangeNote;
  const charsLeft = MAX_CHARS - activeNote.length;

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>📝 Notes</span>
        <div className={styles.tabs}>
          <button
            id="tab-monthly-notes"
            className={`${styles.tab} ${activeTab === "month" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("month")}
            style={activeTab === "month" ? { "--tab-color": theme.primary } : {}}
          >
            Monthly
          </button>
          <button
            id="tab-range-notes"
            className={`${styles.tab} ${activeTab === "range" ? styles.activeTab : ""} ${!hasRange ? styles.disabledTab : ""}`}
            onClick={() => hasRange && setActiveTab("range")}
            style={activeTab === "range" ? { "--tab-color": theme.primary } : {}}
            title={!hasRange ? "Select a date range to add range notes" : ""}
            aria-disabled={!hasRange}
          >
            Range {hasRange ? "✓" : "🔒"}
          </button>
        </div>
      </div>

      {/* Range info display */}
      {activeTab === "range" && hasRange && (
        <div className={styles.rangeInfo} style={{ borderColor: theme.primary, color: theme.primary }}>
          <span>📅</span>
          <span>{formatDateShort(startDate <= endDate ? startDate : endDate)}</span>
          <span>→</span>
          <span>{formatDateShort(startDate <= endDate ? endDate : startDate)}</span>
        </div>
      )}

      {/* Month context label */}
      {activeTab === "month" && (
        <div className={styles.contextLabel}>
          {MONTH_NAMES[month]} {year}
        </div>
      )}

      {/* Textarea */}
      <div className={styles.textareaWrapper}>
        {!hasRange && activeTab === "range" ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🗓️</span>
            <p>Select a start and end date on the calendar to add range-specific notes.</p>
          </div>
        ) : (
          <textarea
            id={`notes-textarea-${activeTab}`}
            className={styles.textarea}
            value={activeNote}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) setActiveNote(e.target.value);
            }}
            placeholder={
              activeTab === "month"
                ? `Jot down notes for ${MONTH_NAMES[month]} ${year}…`
                : "Add notes for this date range…"
            }
            rows={6}
          />
        )}
      </div>

      {/* Character counter & save indicator */}
      {!(activeTab === "range" && !hasRange) && (
        <div className={styles.footer}>
          <span className={`${styles.charCount} ${charsLeft < 50 ? styles.charCountWarn : ""}`}>
            {charsLeft} chars left
          </span>
          {activeNote.length > 0 && (
            <span className={styles.savedBadge}>✓ Auto-saved</span>
          )}
        </div>
      )}

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendTitle}>Holiday Legend</div>
        <div className={styles.legendItems}>
          <span className={styles.legendDot} style={{ background: "#e63946" }} /> National
          <span className={styles.legendDot} style={{ background: "#f4a261" }} /> Indian
          <span className={styles.legendDot} style={{ background: "#457b9d" }} /> International
        </div>
      </div>
    </div>
  );
}
