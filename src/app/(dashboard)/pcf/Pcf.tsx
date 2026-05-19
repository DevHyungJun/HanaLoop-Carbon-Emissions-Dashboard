"use client";

import { useCallback } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/app/components/common";
import { usePcfData, useTranslation } from "@/app/hooks";
import type { Post } from "@/app/types/post";

import {
  PcfKpiCards,
  PcfMonthlyTrendChart,
  PcfScopeChart,
  PcfSourceChart,
  PcfToolbar,
  PostPanel,
} from "./_internal";

const Pcf = () => {
  const { t } = useTranslation();
  const {
    companies,
    setPosts,
    selectedCompanyId,
    setSelectedCompanyId,
    metrics,
    companyPosts,
    isLoading,
    isRefreshing,
    error,
    reload,
  } = usePcfData();

  const handleCompanyPostsChange = useCallback(
    (nextCompanyPosts: Post[]) => {
      setPosts((previousPosts) => {
        const otherCompanyPosts = previousPosts.filter(
          (post) => post.resourceUid !== selectedCompanyId,
        );

        return [...otherCompanyPosts, ...nextCompanyPosts];
      });
    },
    [selectedCompanyId, setPosts],
  );

  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-border bg-card">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" aria-hidden />
          {t("pcf.loading")}
        </div>
      </div>
    );
  }

  if (error || !selectedCompanyId) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card p-8">
        <p className="text-sm text-muted-foreground">{t("pcf.error")}</p>
        <Button type="button" variant="outline" onClick={() => void reload()}>
          {t("pcf.toolbar.refresh")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PcfToolbar
        companies={companies}
        selectedCompanyId={selectedCompanyId}
        onCompanyChange={setSelectedCompanyId}
        onRefresh={() => void reload()}
        isRefreshing={isRefreshing}
      />

      <PcfKpiCards metrics={metrics} />

      <PcfMonthlyTrendChart data={metrics.monthlyScopeTrend} />

      <div className="grid gap-6 xl:grid-cols-2">
        <PcfScopeChart scopeTotals={metrics.scopeTotals} />
        <PcfSourceChart sourceTotals={metrics.sourceTotals} />
      </div>

      <PostPanel
        posts={companyPosts}
        companyId={selectedCompanyId}
        onPostsChange={handleCompanyPostsChange}
      />
    </div>
  );
};

export default Pcf;
