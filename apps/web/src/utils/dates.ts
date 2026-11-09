import copy from "@/content/en.json";

import { formatMessage } from "./formatMessage";

/** Today's date in the reader's time zone, as YYYY-MM-DD so it compares directly with content dates. */
export function todayIso(now: Date = new Date()): string {
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function daysBetween(fromIso: string, toIso: string): number {
  const millisecondsPerDay = 86_400_000;
  return Math.round(
    (Date.parse(`${toIso}T00:00:00Z`) - Date.parse(`${fromIso}T00:00:00Z`)) /
      millisecondsPerDay,
  );
}

/** "Today", "Tomorrow", "In 12 days" or "Happening now" for an event that has started. */
export function countdownLabel(
  today: string,
  starts: string,
  ends?: string,
): string {
  const days = daysBetween(today, starts);
  if (days > 1) return formatMessage(copy.common.daysAway, { count: days });
  if (days === 1) return copy.common.tomorrow;
  if (days === 0) return copy.common.today;
  return ends && ends >= today ? copy.common.happeningNow : "";
}
