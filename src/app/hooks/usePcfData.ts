"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { DEFAULT_DATE_RANGE } from "@/app/constants";
import { fetchCompanies, fetchPosts } from "@/app/lib/api";
import type { Company } from "@/app/types/company";
import type { Post } from "@/app/types/post";
import { computePcfMetrics } from "@/app/utils/emissions";

export const usePcfData = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
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
      const [nextCompanies, nextPosts] = await Promise.all([
        fetchCompanies(),
        fetchPosts(),
      ]);

      setCompanies(nextCompanies);
      setPosts(nextPosts);
      setSelectedCompanyId((currentId) => {
        if (currentId && nextCompanies.some((company) => company.id === currentId)) {
          return currentId;
        }

        return nextCompanies[0]?.id ?? "";
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

  const reload = useCallback(() => loadData({ refresh: true }), [loadData]);

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
    companies,
    posts,
    setPosts,
    selectedCompanyId,
    setSelectedCompanyId,
    selectedCompany,
    metrics,
    companyPosts,
    isLoading,
    isRefreshing,
    error,
    reload,
    dateRange: DEFAULT_DATE_RANGE,
  };
};
