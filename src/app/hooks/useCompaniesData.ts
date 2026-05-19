"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  ALL_COUNTRIES_FILTER,
  DEFAULT_DATE_RANGE,
} from "@/app/constants";
import { fetchCompanies, fetchCountries } from "@/app/lib/api";
import type { Company } from "@/app/types/company";
import type { Country } from "@/app/types/country";
import {
  computeCompaniesPortfolioMetrics,
  filterCompaniesByCountry,
} from "@/app/utils/companies";

export const useCompaniesData = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>(
    ALL_COUNTRIES_FILTER,
  );
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
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

  const filteredCompanies = useMemo(
    () =>
      filterCompaniesByCountry(
        companies,
        selectedCountryCode,
        ALL_COUNTRIES_FILTER,
      ),
    [companies, selectedCountryCode],
  );

  const portfolioMetrics = useMemo(
    () => computeCompaniesPortfolioMetrics(filteredCompanies, DEFAULT_DATE_RANGE),
    [filteredCompanies],
  );

  useEffect(() => {
    if (
      selectedCompanyId &&
      filteredCompanies.some((company) => company.id === selectedCompanyId)
    ) {
      return;
    }

    setSelectedCompanyId(filteredCompanies[0]?.id ?? "");
  }, [filteredCompanies, selectedCompanyId]);

  const selectedCompanySummary = useMemo(
    () =>
      portfolioMetrics.companies.find(
        (company) => company.id === selectedCompanyId,
      ),
    [portfolioMetrics.companies, selectedCompanyId],
  );

  const getCountryName = useCallback(
    (countryCode: string) =>
      countries.find((country) => country.code === countryCode)?.name ??
      countryCode,
    [countries],
  );

  return {
    companies: filteredCompanies,
    countries,
    selectedCountryCode,
    setSelectedCountryCode,
    selectedCompanyId,
    setSelectedCompanyId,
    selectedCompanySummary,
    portfolioMetrics,
    getCountryName,
    isLoading,
    isRefreshing,
    error,
    reload,
    dateRange: DEFAULT_DATE_RANGE,
  };
};
