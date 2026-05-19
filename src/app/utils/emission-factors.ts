import {
  ALL_EMISSION_FACTOR_SOURCES_FILTER,
  ALL_SCOPES_FILTER,
} from "@/app/constants/emission-factors";
import type { EmissionScope } from "@/app/constants/pcf";
import type { EmissionFactor } from "@/app/types/emission-factor";

export type EmissionFactorsSummary = {
  totalCount: number;
  scope1Count: number;
  scope2Count: number;
  sourceCount: number;
  latestEffectiveFrom: string | null;
};

export const filterEmissionFactors = (
  factors: EmissionFactor[],
  scopeFilter: string,
  sourceFilter: string,
) =>
  factors.filter((factor) => {
    const matchesScope =
      scopeFilter === ALL_SCOPES_FILTER || factor.scope === scopeFilter;
    const matchesSource =
      sourceFilter === ALL_EMISSION_FACTOR_SOURCES_FILTER ||
      factor.source === sourceFilter;

    return matchesScope && matchesSource;
  });

export const computeEmissionFactorsSummary = (
  factors: EmissionFactor[],
): EmissionFactorsSummary => {
  const uniqueSources = new Set(factors.map((factor) => factor.source));
  const latestEffectiveFrom = factors.reduce<string | null>(
    (latest, factor) => {
      if (!latest || factor.effectiveFrom > latest) {
        return factor.effectiveFrom;
      }

      return latest;
    },
    null,
  );

  return {
    totalCount: factors.length,
    scope1Count: factors.filter((factor) => factor.scope === "scope1").length,
    scope2Count: factors.filter((factor) => factor.scope === "scope2").length,
    sourceCount: uniqueSources.size,
    latestEffectiveFrom,
  };
};

export const formatEmissionFactorValue = (factor: number) => {
  if (factor >= 0.001) {
    return factor.toFixed(4);
  }

  return factor.toExponential(2);
};

export const getEmissionFactorScopeCounts = (
  factors: EmissionFactor[],
): { scope: EmissionScope; count: number }[] => {
  const counts = new Map<EmissionScope, number>();

  for (const factor of factors) {
    counts.set(factor.scope, (counts.get(factor.scope) ?? 0) + 1);
  }

  return Array.from(counts.entries()).map(([scope, count]) => ({ scope, count }));
};
