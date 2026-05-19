"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  fetchActivityRecords,
  fetchCompanies,
  fetchCountries,
} from "@/app/lib/api";
import { useActivityRecordsStore, useDateRangeStore } from "@/app/store";
import type { ActivityRecord } from "@/app/types/activity-record";
import type { Company } from "@/app/types/company";
import type { Country } from "@/app/types/country";
import {
  computePcfMetrics,
  mergeEmissionsWithActivityRecords,
} from "@/app/utils";

const mergeActivityRecords = (
  fetchedRecords: ActivityRecord[],
  localRecords: ActivityRecord[],
) => {
  const merged = new Map<string, ActivityRecord>();

  for (const record of fetchedRecords) {
    merged.set(record.id, record);
  }

  for (const record of localRecords) {
    merged.set(record.id, record);
  }

  return Array.from(merged.values());
};

export const usePcfData = () => {
  const searchParams = useSearchParams();
  const companyFromUrl = searchParams.get("company");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const records = useActivityRecordsStore((state) => state.records);
  const setRecords = useActivityRecordsStore((state) => state.setRecords);
  const dateRange = useDateRangeStore((state) => state.dateRange);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
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
      const localRecords = useActivityRecordsStore.getState().records;
      const [nextCompanies, nextCountries, fetchedRecords] = await Promise.all([
        fetchCompanies(),
        fetchCountries(),
        fetchActivityRecords(),
      ]);

      setCompanies(nextCompanies);
      setCountries(nextCountries);
      setRecords(mergeActivityRecords(fetchedRecords, localRecords));
      setSelectedCountryCode((currentCode) => {
        if (
          currentCode &&
          nextCountries.some((country) => country.code === currentCode)
        ) {
          return currentCode;
        }

        if (companyFromUrl) {
          const companyFromQuery = nextCompanies.find(
            (company) => company.id === companyFromUrl,
          );

          if (companyFromQuery) {
            return companyFromQuery.country;
          }
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
  }, [companyFromUrl, setRecords]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

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

  useEffect(() => {
    if (!companyFromUrl || companies.length === 0) {
      return;
    }

    const company = companies.find((item) => item.id === companyFromUrl);

    if (!company) {
      return;
    }

    setSelectedCountryCode(company.country);
    setSelectedCompanyId(company.id);
  }, [companyFromUrl, companies]);

  const selectedCompany = useMemo(
    () => companies.find((company) => company.id === selectedCompanyId),
    [companies, selectedCompanyId],
  );

  const companyActivityRecords = useMemo(
    () =>
      records
        .filter((record) => record.companyId === selectedCompanyId)
        .sort((left, right) => right.yearMonth.localeCompare(left.yearMonth)),
    [records, selectedCompanyId],
  );

  const combinedEmissions = useMemo(() => {
    if (!selectedCompany) {
      return [];
    }

    return mergeEmissionsWithActivityRecords(
      selectedCompany.emissions,
      companyActivityRecords,
      selectedCompany.country,
    );
  }, [selectedCompany, companyActivityRecords]);

  const metrics = useMemo(
    () => computePcfMetrics(combinedEmissions, dateRange),
    [combinedEmissions, dateRange],
  );

  return {
    countries,
    companies: filteredCompanies,
    selectedCountryCode,
    setSelectedCountryCode,
    selectedCompanyId,
    setSelectedCompanyId,
    selectedCompany,
    metrics,
    companyActivityRecords,
    isLoading,
    isRefreshing,
    error,
    reload,
    dateRange,
  };
};
