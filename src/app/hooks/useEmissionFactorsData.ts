"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  ALL_EMISSION_FACTOR_SOURCES_FILTER,
  ALL_SCOPES_FILTER,
} from "@/app/constants";
import { fetchCountries, fetchEmissionFactors } from "@/app/lib/api";
import type { Country } from "@/app/types/country";
import type { EmissionFactor } from "@/app/types/emission-factor";
import {
  computeEmissionFactorsSummary,
  filterEmissionFactors,
} from "@/app/utils/emission-factors";

import { useCountryName } from "./useCountryName";
import { useTranslation } from "./useTranslation";

export const useEmissionFactorsData = () => {
  const { t } = useTranslation();
  const getCountryName = useCountryName();
  const [factors, setFactors] = useState<EmissionFactor[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedScope, setSelectedScope] = useState<string>(ALL_SCOPES_FILTER);
  const [selectedSource, setSelectedSource] = useState<string>(
    ALL_EMISSION_FACTOR_SOURCES_FILTER,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (options?: { refresh?: boolean }) => {
    if (options?.refresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setError(null);

    try {
      const [nextFactors, nextCountries] = await Promise.all([
        fetchEmissionFactors(),
        fetchCountries(),
      ]);

      setFactors(nextFactors);
      setCountries(nextCountries);
    } catch {
      setError("load_failed");
    } finally {
      if (options?.refresh) {
        setIsRefreshing(false);
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const reload = useCallback(() => loadData({ refresh: true }), [loadData]);

  const filteredFactors = useMemo(
    () => filterEmissionFactors(factors, selectedScope, selectedSource),
    [factors, selectedScope, selectedSource],
  );

  const summary = useMemo(
    () => computeEmissionFactorsSummary(filteredFactors),
    [filteredFactors],
  );

  const getRegionLabel = useCallback(
    (region: string) => {
      if (region === "GLOBAL") {
        return t("emissionFactors.region.global");
      }

      return getCountryName(region);
    },
    [getCountryName, t],
  );

  return {
    factors: filteredFactors,
    selectedScope,
    setSelectedScope,
    selectedSource,
    setSelectedSource,
    summary,
    getRegionLabel,
    isLoading,
    isRefreshing,
    error,
    reload,
  };
};
