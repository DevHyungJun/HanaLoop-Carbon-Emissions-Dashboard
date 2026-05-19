"use client";

import { Button } from "@/app/components/common";
import { useActivityData, useTranslation } from "@/app/hooks";

import {
  ActivityDataSkeleton,
  ActivityDataSummaryCards,
  ActivityDataTable,
  ActivityDataToolbar,
} from "./_internal";

const ActivityData = () => {
  const { t } = useTranslation();
  const {
    countries,
    companies,
    selectedCountryCode,
    setSelectedCountryCode,
    selectedCompanyId,
    setSelectedCompanyId,
    selectedMonth,
    setSelectedMonth,
    selectedSource,
    setSelectedSource,
    rows,
    summary,
    isLoading,
    isRefreshing,
    error,
    reload,
  } = useActivityData();

  if (isLoading) {
    return <ActivityDataSkeleton />;
  }

  if (error || !selectedCompanyId) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card p-8">
        <p className="text-sm text-muted-foreground">{t("activityData.error")}</p>
        <Button type="button" variant="outline" onClick={() => void reload()}>
          {t("activityData.toolbar.refresh")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ActivityDataToolbar
        countries={countries}
        companies={companies}
        selectedCountryCode={selectedCountryCode}
        selectedCompanyId={selectedCompanyId}
        selectedMonth={selectedMonth}
        selectedSource={selectedSource}
        onCountryChange={setSelectedCountryCode}
        onCompanyChange={setSelectedCompanyId}
        onMonthChange={setSelectedMonth}
        onSourceChange={setSelectedSource}
        onRefresh={() => void reload()}
        isRefreshing={isRefreshing}
      />

      <ActivityDataSummaryCards summary={summary} />

      <ActivityDataTable rows={rows} />
    </div>
  );
};

export default ActivityData;
