"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { DEFAULT_DATE_RANGE } from "@/app/constants";
import { fetchCompanies, fetchCountries, fetchPosts } from "@/app/lib/api";
import type { Company } from "@/app/types/company";
import type { Country } from "@/app/types/country";
import type { Post } from "@/app/types/post";
import { computePcfMetrics } from "@/app/utils/emissions";

export const usePcfData = () => {
  const searchParams = useSearchParams();
  const companyFromUrl = searchParams.get("company");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
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
      const [nextCompanies, nextPosts, nextCountries] = await Promise.all([
        fetchCompanies(),
        fetchPosts(),
        fetchCountries(),
      ]);

      setCompanies(nextCompanies);
      setPosts(nextPosts);
      setCountries(nextCountries);
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
  }, [companyFromUrl]);

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

  const metrics = useMemo(
    () => computePcfMetrics(selectedCompany?.emissions ?? [], DEFAULT_DATE_RANGE),
    [selectedCompany],
  );

  const companyPosts = useMemo(
    () =>
      posts
        .filter((post) => post.resourceUid === selectedCompanyId)
        .sort((left, right) => right.dateTime.localeCompare(left.dateTime)),
    [posts, selectedCompanyId],
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
    companyPosts,
    setPosts,
    isLoading,
    isRefreshing,
    error,
    reload,
    dateRange: DEFAULT_DATE_RANGE,
  };
};
