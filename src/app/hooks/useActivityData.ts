"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  ALL_MONTHS_FILTER,
  ALL_SOURCES_FILTER,
} from "@/app/constants";
import { fetchCompanies, fetchCountries } from "@/app/lib/api";
import { useDateRangeStore } from "@/app/store";
import type { Company } from "@/app/types/company";
import type { Country } from "@/app/types/country";
import {
  buildActivityDataRows,
  computeActivityDataSummary,
  filterActivityDataRows,
  isYearMonthInRange,
} from "@/app/utils";

export const useActivityData = () => {
  const dateRange = useDateRangeStore((state) => state.dateRange);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string>(ALL_MONTHS_FILTER);
  const [selectedSource, setSelectedSource] = useState<string>(
    ALL_SOURCES_FILTER,
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
      const [nextCompanies, nextCountries] = await Promise.all([
        fetchCompanies(),
        fetchCountries(),
      ]);

      setCompanies(nextCompanies);
      setCountries(nextCountries);
      setSelectedCountryCode((currentCode) => {
        if (
          currentCode &&
          nextCountries.some((country) => country.code === currentCode)
        ) {
          return currentCode;
        }

        return nextCountries[0]?.code ?? "";
      });
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

  useEffect(() => {
    if (
      selectedMonth !== ALL_MONTHS_FILTER &&
      !isYearMonthInRange(selectedMonth, dateRange)
    ) {
      setSelectedMonth(ALL_MONTHS_FILTER);
    }
  }, [dateRange, selectedMonth]);

  const reload = useCallback(() => loadData({ refresh: true }), [loadData]);

  const filteredCompanies = useMemo(() => {
    if (!selectedCountryCode) {
      return [];
    }

    return companies.filter(
      (company) => company.country === selectedCountryCode,
    );
  }, [companies, selectedCountryCode]);

  useEffect(() => {
    if (
      selectedCompanyId &&
      filteredCompanies.some((company) => company.id === selectedCompanyId)
    ) {
      return;
    }

    setSelectedCompanyId(filteredCompanies[0]?.id ?? "");
  }, [filteredCompanies, selectedCompanyId]);

  const selectedCompany = useMemo(
    () => companies.find((company) => company.id === selectedCompanyId),
    [companies, selectedCompanyId],
  );

  const allRows = useMemo(
    () => buildActivityDataRows(selectedCompany, dateRange),
    [selectedCompany, dateRange],
  );

  const filteredRows = useMemo(
    () => filterActivityDataRows(allRows, selectedMonth, selectedSource),
    [allRows, selectedMonth, selectedSource],
  );

  const summary = useMemo(
    () => computeActivityDataSummary(filteredRows),
    [filteredRows],
  );

  return {
    countries,
    companies: filteredCompanies,
    selectedCountryCode,
    setSelectedCountryCode,
    selectedCompanyId,
    setSelectedCompanyId,
    selectedCompany,
    selectedMonth,
    setSelectedMonth,
    selectedSource,
    setSelectedSource,
    rows: filteredRows,
    summary,
    isLoading,
    isRefreshing,
    error,
    reload,
    dateRange,
  };
};
