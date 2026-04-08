/**
 * Returns the number of days in a given month/year
 */
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Returns the day-of-week index (0=Mon...6=Sun) the month starts on
 */
export function getMonthStartDay(year, month) {
  const day = new Date(year, month, 1).getDay();
  // Convert Sunday=0 to Sunday=6, Monday=1 to Monday=0
  return (day + 6) % 7;
}

/**
 * Build a flat array of day cells (null = empty, number = day)
 */
export function buildCalendarGrid(year, month) {
  const totalDays = getDaysInMonth(year, month);
  const startDay = getMonthStartDay(year, month);
  const cells = [];

  // Preceding empties
  for (let i = 0; i < startDay; i++) cells.push(null);

  for (let d = 1; d <= totalDays; d++) cells.push(d);

  // Trailing empties to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  return cells;
}

/**
 * Returns a Date object for a given year/month/day (local time, midnight)
 */
export function makeDate(year, month, day) {
  return new Date(year, month, day);
}

/**
 * Compare two dates by value (ignoring time)
 */
export function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

export function isInRange(date, start, end) {
  if (!start || !end || !date) return false;
  const [s, e] = start <= end ? [start, end] : [end, start];
  return date > s && date < e;
}

export function isBefore(a, b) {
  return a < b;
}

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const DAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export function formatDateShort(date) {
  if (!date) return "";
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()].slice(0, 3)} ${date.getFullYear()}`;
}
