import { ACTIVITY_DATA_MONTHS } from "@/app/constants/activity-data";
import type { Locale } from "@/app/constants/i18n";

import { formatActivityMonthLong } from "./activity-data";

export type DateRange = {
  from: string;
  to: string;
};

export const DATE_RANGE_BOUNDS: DateRange = {
  from: ACTIVITY_DATA_MONTHS[0],
  to: ACTIVITY_DATA_MONTHS[ACTIVITY_DATA_MONTHS.length - 1],
};

export const isYearMonthInRange = (yearMonth: string, range: DateRange) =>
  yearMonth >= range.from && yearMonth <= range.to;

export const clampYearMonth = (
  yearMonth: string,
  bounds: DateRange = DATE_RANGE_BOUNDS,
) => {
  if (yearMonth < bounds.from) {
    return bounds.from;
  }

  if (yearMonth > bounds.to) {
    return bounds.to;
  }

  return yearMonth;
};

export const normalizeDateRange = (range: DateRange): DateRange => {
  const from = clampYearMonth(range.from);
  const to = clampYearMonth(range.to);

  if (from <= to) {
    return { from, to };
  }

  return { from: to, to: from };
};

const incrementYearMonth = (yearMonth: string) => {
  const [year, month] = yearMonth.split("-").map(Number);
  const nextDate = new Date(year, month, 1);

  const nextYear = nextDate.getFullYear();
  const nextMonth = String(nextDate.getMonth() + 1).padStart(2, "0");

  return `${nextYear}-${nextMonth}`;
};

export const getYearMonthsInRange = (range: DateRange) => {
  const normalized = normalizeDateRange(range);
  const months: string[] = [];
  let current = normalized.from;

  while (current <= normalized.to) {
    months.push(current);
    current = incrementYearMonth(current);
  }

  return months;
};

export const formatDateRangeLabel = (
  range: DateRange,
  locale: Locale,
) => {
  const normalized = normalizeDateRange(range);

  return `${formatActivityMonthLong(normalized.from, locale)} ~ ${formatActivityMonthLong(normalized.to, locale)}`;
};

export const getYearMonthsForBounds = (
  bounds: DateRange = DATE_RANGE_BOUNDS,
) => getYearMonthsInRange(bounds);
