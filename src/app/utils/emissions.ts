import { DEFAULT_DATE_RANGE } from "@/app/constants";
import {
  EMISSION_SCOPES,
  EMISSION_SOURCE_SCOPE,
  type EmissionScope,
  type EmissionSource,
} from "@/app/constants/pcf";
import type { GhgEmission } from "@/app/types/ghg-emission";

type DateRange = {
  from: string;
  to: string;
};

export type MonthlyScopePoint = {
  month: string;
  scope1: number;
  scope2: number;
  scope3: number;
  total: number;
};

export type PcfMetrics = {
  totalEmissions: number;
  monthlyAverage: number;
  monthCount: number;
  topSource: string | null;
  topSourceShare: number;
  monthOverMonthChange: number | null;
  monthlyTrend: { month: string; total: number }[];
  monthlyScopeTrend: MonthlyScopePoint[];
  scopeTotals: Record<EmissionScope, number>;
  sourceTotals: { source: string; total: number }[];
};

const createEmptyScopeTotals = (): Record<EmissionScope, number> => ({
  scope1: 0,
  scope2: 0,
  scope3: 0,
});

export const isWithinDateRange = (
  yearMonth: string,
  range: DateRange = DEFAULT_DATE_RANGE,
) => yearMonth >= range.from && yearMonth <= range.to;

export const filterEmissionsByRange = (
  emissions: GhgEmission[],
  range: DateRange = DEFAULT_DATE_RANGE,
) => emissions.filter((emission) => isWithinDateRange(emission.yearMonth, range));

export const sumEmissions = (emissions: GhgEmission[]) =>
  emissions.reduce((sum, emission) => sum + emission.emissions, 0);

export const getEmissionScope = (source: string): EmissionScope => {
  if (source in EMISSION_SOURCE_SCOPE) {
    return EMISSION_SOURCE_SCOPE[source as EmissionSource];
  }

  return "scope3";
};

export const groupEmissionsByMonth = (emissions: GhgEmission[]) => {
  const totals = new Map<string, number>();

  for (const emission of emissions) {
    totals.set(
      emission.yearMonth,
      (totals.get(emission.yearMonth) ?? 0) + emission.emissions,
    );
  }

  return Array.from(totals.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([month, total]) => ({ month, total }));
};

export const groupEmissionsByMonthAndScope = (emissions: GhgEmission[]) => {
  const totals = new Map<string, Record<EmissionScope, number>>();

  for (const emission of emissions) {
    const scope = getEmissionScope(emission.source);
    const monthTotals =
      totals.get(emission.yearMonth) ?? createEmptyScopeTotals();

    monthTotals[scope] += emission.emissions;
    totals.set(emission.yearMonth, monthTotals);
  }

  return Array.from(totals.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([month, scopeTotals]) => ({
      month,
      ...scopeTotals,
      total: EMISSION_SCOPES.reduce(
        (sum, scope) => sum + scopeTotals[scope],
        0,
      ),
    }));
};

export const groupEmissionsByScope = (emissions: GhgEmission[]) => {
  const totals = createEmptyScopeTotals();

  for (const emission of emissions) {
    totals[getEmissionScope(emission.source)] += emission.emissions;
  }

  return totals;
};

export const groupEmissionsBySource = (emissions: GhgEmission[]) => {
  const totals = new Map<string, number>();

  for (const emission of emissions) {
    totals.set(
      emission.source,
      (totals.get(emission.source) ?? 0) + emission.emissions,
    );
  }

  return Array.from(totals.entries())
    .sort(([, leftTotal], [, rightTotal]) => rightTotal - leftTotal)
    .map(([source, total]) => ({ source, total }));
};

export const computePcfMetrics = (
  emissions: GhgEmission[],
  range: DateRange = DEFAULT_DATE_RANGE,
): PcfMetrics => {
  const filtered = filterEmissionsByRange(emissions, range);
  const monthlyTrend = groupEmissionsByMonth(filtered);
  const monthlyScopeTrend = groupEmissionsByMonthAndScope(filtered);
  const sourceTotals = groupEmissionsBySource(filtered);
  const totalEmissions = sumEmissions(filtered);
  const monthCount = monthlyTrend.length;
  const monthlyAverage = monthCount > 0 ? totalEmissions / monthCount : 0;
  const topSource = sourceTotals[0]?.source ?? null;
  const topSourceShare =
    topSource && totalEmissions > 0
      ? (sourceTotals[0].total / totalEmissions) * 100
      : 0;

  let monthOverMonthChange: number | null = null;

  if (monthlyTrend.length >= 2) {
    const previousMonth = monthlyTrend[monthlyTrend.length - 2].total;
    const latestMonth = monthlyTrend[monthlyTrend.length - 1].total;
    monthOverMonthChange =
      previousMonth > 0 ? ((latestMonth - previousMonth) / previousMonth) * 100 : null;
  }

  return {
    totalEmissions,
    monthlyAverage,
    monthCount,
    topSource,
    topSourceShare,
    monthOverMonthChange,
    monthlyTrend,
    monthlyScopeTrend,
    scopeTotals: groupEmissionsByScope(filtered),
    sourceTotals,
  };
};

export const formatTco2e = (value: number, maximumFractionDigits = 2) =>
  value.toLocaleString(undefined, { maximumFractionDigits });

export const formatPercentChange = (value: number | null) => {
  if (value == null) {
    return "—";
  }

  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(1)}%`;
};
