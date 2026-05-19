"use client";

import { Button } from "@/app/components/common";
import { ALL_SCOPES_FILTER } from "@/app/constants";
import { useEmissionFactorsData, useTranslation } from "@/app/hooks";

import {
  EmissionFactorsElectricityChart,
  EmissionFactorsScopeChart,
  EmissionFactorsSkeleton,
  EmissionFactorsSummaryCards,
  EmissionFactorsTable,
  EmissionFactorsToolbar,
} from "./_internal";

const EmissionFactors = () => {
  const { t } = useTranslation();
  const {
    factors,
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
  } = useEmissionFactorsData();

  if (isLoading) {
    return <EmissionFactorsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card p-8">
        <p className="text-sm text-muted-foreground">{t("emissionFactors.error")}</p>
        <Button type="button" variant="outline" onClick={() => void reload()}>
          {t("emissionFactors.toolbar.refresh")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <EmissionFactorsToolbar
        selectedScope={selectedScope}
        selectedSource={selectedSource}
        onScopeChange={setSelectedScope}
        onSourceChange={setSelectedSource}
        onRefresh={() => void reload()}
        isRefreshing={isRefreshing}
      />

      <EmissionFactorsSummaryCards summary={summary} />

      {selectedScope === ALL_SCOPES_FILTER ? (
        <div className="grid gap-6 xl:grid-cols-2">
          <EmissionFactorsScopeChart factors={factors} />
          <EmissionFactorsElectricityChart
            factors={factors}
            getRegionLabel={getRegionLabel}
          />
        </div>
      ) : (
        <EmissionFactorsElectricityChart
          factors={factors}
          getRegionLabel={getRegionLabel}
        />
      )}

      <EmissionFactorsTable factors={factors} getRegionLabel={getRegionLabel} />
    </div>
  );
};

export default EmissionFactors;
