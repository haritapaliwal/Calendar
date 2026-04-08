/**
 * Indian public holidays + major international holidays
 * Format: "YYYY-MM-DD": { name, type }
 */
export const HOLIDAYS = {
  // January
  "2025-01-01": { name: "New Year's Day", type: "international" },
  "2025-01-14": { name: "Makar Sankranti", type: "indian" },
  "2025-01-26": { name: "Republic Day", type: "national" },

  // February
  "2025-02-14": { name: "Valentine's Day", type: "international" },
  "2025-02-26": { name: "Maha Shivratri", type: "indian" },

  // March
  "2025-03-14": { name: "Holi", type: "indian" },
  "2025-03-08": { name: "International Women's Day", type: "international" },

  // April
  "2025-04-14": { name: "Ambedkar Jayanti", type: "national" },
  "2025-04-18": { name: "Good Friday", type: "international" },

  // May
  "2025-05-01": { name: "Labour Day", type: "international" },
  "2025-05-12": { name: "Buddha Purnima", type: "indian" },

  // June
  "2025-06-05": { name: "World Environment Day", type: "international" },

  // July
  "2025-07-06": { name: "Eid al-Adha", type: "indian" },

  // August
  "2025-08-15": { name: "Independence Day", type: "national" },
  "2025-08-16": { name: "Janmashtami", type: "indian" },

  // September
  "2025-09-29": { name: "Navratri Begins", type: "indian" },

  // October
  "2025-10-02": { name: "Gandhi Jayanti", type: "national" },
  "2025-10-20": { name: "Dussehra", type: "indian" },
  "2025-10-31": { name: "Halloween", type: "international" },

  // November
  "2025-11-05": { name: "Diwali", type: "indian" },
  "2025-11-15": { name: "Guru Nanak Jayanti", type: "indian" },

  // December
  "2025-12-25": { name: "Christmas", type: "international" },
  "2025-12-31": { name: "New Year's Eve", type: "international" },

  // 2026
  "2026-01-01": { name: "New Year's Day", type: "international" },
  "2026-01-26": { name: "Republic Day", type: "national" },
  "2026-04-01": { name: "April Fools' Day", type: "international" },
  "2026-04-03": { name: "Good Friday", type: "international" },
  "2026-04-14": { name: "Ambedkar Jayanti / Tamil New Year", type: "national" },
  "2026-05-01": { name: "Labour Day", type: "international" },
  "2026-08-15": { name: "Independence Day", type: "national" },
  "2026-10-02": { name: "Gandhi Jayanti", type: "national" },
  "2026-12-25": { name: "Christmas", type: "international" },
};

export function getHoliday(year, month, day) {
  const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return HOLIDAYS[key] || null;
}

export const HOLIDAY_COLORS = {
  national: "#e63946",
  indian: "#f4a261",
  international: "#457b9d",
};
