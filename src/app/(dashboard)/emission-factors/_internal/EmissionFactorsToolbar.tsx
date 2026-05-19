"use client";

import { RefreshCw } from "lucide-react";

import { Button } from "@/app/components/common";
import {
  ALL_EMISSION_FACTOR_SOURCES_FILTER,
  ALL_SCOPES_FILTER,
  EMISSION_SCOPES,
  EMISSION_SOURCES,
  EMISSION_SCOPE_LABEL_KEYS,
  EMISSION_SOURCE_LABEL_KEYS,
  type EmissionScope,
  type EmissionSource,
} from "@/app/constants";
import { useTranslation } from "@/app/hooks";

type EmissionFactorsToolbarProps = {
  selectedScope: string;
  selectedSource: string;
  onScopeChange: (scope: string) => void;
  onSourceChange: (source: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
};

const EmissionFactorsToolbar = ({
  selectedScope,
  selectedSource,
  onScopeChange,
  onSourceChange,
  onRefresh,
  isRefreshing,
}: EmissionFactorsToolbarProps) => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-foreground">
            {t("emissionFactors.toolbar.scope")}
          </span>
          <select
            value={selectedScope}
            onChange={(event) => onScopeChange(event.target.value)}
            className="h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value={ALL_SCOPES_FILTER}>
              {t("emissionFactors.toolbar.allScopes")}
            </option>
            {EMISSION_SCOPES.filter((scope) => scope !== "scope3").map(
              (scope) => (
                <option key={scope} value={scope}>
                  {t(EMISSION_SCOPE_LABEL_KEYS[scope as EmissionScope])}
                </option>
              ),
            )}
          </select>
        </label>

        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-foreground">
            {t("emissionFactors.toolbar.source")}
          </span>
          <select
            value={selectedSource}
            onChange={(event) => onSourceChange(event.target.value)}
            className="h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value={ALL_EMISSION_FACTOR_SOURCES_FILTER}>
              {t("emissionFactors.toolbar.allSources")}
            </option>
            {EMISSION_SOURCES.map((source) => (
              <option key={source} value={source}>
                {t(EMISSION_SOURCE_LABEL_KEYS[source as EmissionSource])}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-1.5 text-sm">
          <span className="font-medium text-foreground">
            {t("emissionFactors.toolbar.formula")}
          </span>
          <div className="flex h-9 items-center rounded-lg border border-border bg-muted/40 px-3 font-mono text-sm text-muted-foreground">
            activity × factor = tCO2e
          </div>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onRefresh}
        isLoading={isRefreshing}
        className="sm:self-end"
      >
        <RefreshCw className="size-4" aria-hidden />
        {t("emissionFactors.toolbar.refresh")}
      </Button>
    </section>
  );
};

export default EmissionFactorsToolbar;
