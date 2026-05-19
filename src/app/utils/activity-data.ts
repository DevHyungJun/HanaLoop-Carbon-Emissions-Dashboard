import {
  ACTIVITY_DATA_MONTHS,
  ALL_MONTHS_FILTER,
  ALL_SOURCES_FILTER,
  DEFAULT_DATE_RANGE,
} from "@/app/constants";
import type { Locale } from "@/app/constants/i18n";
import type { EmissionScope } from "@/app/constants/pcf";
import type { Company } from "@/app/types/company";

import { filterEmissionsByRange, getEmissionScope } from "./emissions";
import type { DateRange } from "./date-range";

export const groupActivityDataMonthsByYear = (
  months: readonly string[] = ACTIVITY_DATA_MONTHS,
) => {
  const groups = new Map<string, string[]>();

  for (const month of months) {
    const year = month.slice(0, 4);
    const yearMonths = groups.get(year) ?? [];
    yearMonths.push(month);
    groups.set(year, yearMonths);
  }

  return Array.from(groups.entries()).sort(([leftYear], [rightYear]) =>
    leftYear.localeCompare(rightYear),
  );
};

export const formatActivityMonthShort = (
  yearMonth: string,
  locale: Locale,
) => {
  const [year, month] = yearMonth.split("-").map(Number);

  return new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", {
    month: "short",
  }).format(new Date(year, month - 1, 1));
};

export const formatActivityMonthLong = (
  yearMonth: string,
  locale: Locale,
) => {
  const [year, month] = yearMonth.split("-").map(Number);

  return new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", {
    year: "numeric",
    month: "long",
  }).format(new Date(year, month - 1, 1));
};

export const getActivityDataYears = (
  months: readonly string[] = ACTIVITY_DATA_MONTHS,
) =>
  Array.from(new Set(months.map((month) => month.slice(0, 4)))).sort(
    (left, right) => left.localeCompare(right),
  );

export const getActivityDataMonthsForYear = (
  year: string,
  months: readonly string[] = ACTIVITY_DATA_MONTHS,
) => months.filter((month) => month.startsWith(`${year}-`));

export const parseActivityYearMonth = (yearMonth: string) => {
  const [year, month] = yearMonth.split("-");

  return { year, month };
};

export const toActivityYearMonth = (year: string, month: string) =>
  `${year}-${month.padStart(2, "0")}`;

export type ActivityDataRow = {
  id: string;
  yearMonth: string;
  source: string;
  scope: EmissionScope;
  emissions: number;
};

export type ActivityDataSummary = {
  recordCount: number;
  totalEmissions: number;
  uniqueSourceCount: number;
  monthlyAverage: number;
};

export const buildActivityDataRows = (
  company: Company | undefined,
  range: DateRange = DEFAULT_DATE_RANGE,
): ActivityDataRow[] => {
  if (!company) {
    return [];
  }

  return filterEmissionsByRange(company.emissions, range)
    .map((emission) => ({
      id: `${company.id}-${emission.yearMonth}-${emission.source}`,
      yearMonth: emission.yearMonth,
      source: emission.source,
      scope: getEmissionScope(emission.source),
      emissions: emission.emissions,
    }))
    .sort((left, right) => {
      const monthCompare = right.yearMonth.localeCompare(left.yearMonth);

      if (monthCompare !== 0) {
        return monthCompare;
      }

      return left.source.localeCompare(right.source);
    });
};

export const filterActivityDataRows = (
  rows: ActivityDataRow[],
  monthFilter: string,
  sourceFilter: string,
) =>
  rows.filter((row) => {
    const matchesMonth =
      monthFilter === ALL_MONTHS_FILTER || row.yearMonth === monthFilter;
    const matchesSource =
      sourceFilter === ALL_SOURCES_FILTER || row.source === sourceFilter;

    return matchesMonth && matchesSource;
  });

export const computeActivityDataSummary = (
  rows: ActivityDataRow[],
): ActivityDataSummary => {
  const uniqueSources = new Set(rows.map((row) => row.source));
  const totalEmissions = rows.reduce((sum, row) => sum + row.emissions, 0);
  const uniqueMonths = new Set(rows.map((row) => row.yearMonth));

  return {
    recordCount: rows.length,
    totalEmissions,
    uniqueSourceCount: uniqueSources.size,
    monthlyAverage:
      uniqueMonths.size > 0 ? totalEmissions / uniqueMonths.size : 0,
  };
};
