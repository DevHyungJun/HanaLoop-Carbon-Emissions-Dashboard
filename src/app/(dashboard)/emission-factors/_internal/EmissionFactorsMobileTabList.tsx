"use client";

import { useEffect, useState } from "react";

import {
  type EmissionScope,
} from "@/app/constants";
import type { EmissionFactor } from "@/app/types/emission-factor";
import { cn } from "@/app/utils";

import EmissionFactorMobileCard from "./EmissionFactorMobileCard";

type EmissionFactorsMobileTabListProps = {
  factors: EmissionFactor[];
  tabListLabel: string;
  getSourceLabel: (source: string) => string;
  getScopeLabel: (scope: EmissionScope) => string;
  getRegionDisplay: (region: string) => string;
  getFactorDisplay: (factor: EmissionFactor) => string;
  getFormulaDisplay: (factor: EmissionFactor) => string;
  fieldLabels: {
    region: string;
    unit: string;
    standard: string;
    formula: string;
  };
};

const EmissionFactorsMobileTabList = ({
  factors,
  tabListLabel,
  getSourceLabel,
  getScopeLabel,
  getRegionDisplay,
  getFactorDisplay,
  getFormulaDisplay,
  fieldLabels,
}: EmissionFactorsMobileTabListProps) => {
  const [selectedFactorId, setSelectedFactorId] = useState(factors[0]?.id ?? "");

  useEffect(() => {
    if (factors.length === 0) {
      setSelectedFactorId("");
      return;
    }

    if (!factors.some((factor) => factor.id === selectedFactorId)) {
      setSelectedFactorId(factors[0].id);
    }
  }, [factors, selectedFactorId]);

  const selectedFactor =
    factors.find((factor) => factor.id === selectedFactorId) ?? factors[0];

  if (!selectedFactor) {
    return null;
  }

  return (
    <div className="space-y-3 md:hidden">
      <div
        className="flex gap-2 overflow-x-auto pb-1"
        role="tablist"
        aria-label={tabListLabel}
      >
        {factors.map((factor) => {
          const isSelected = factor.id === selectedFactor.id;
          const sourceLabel = getSourceLabel(factor.source);
          const regionLabel = getRegionDisplay(factor.region);

          return (
            <button
              key={factor.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`emission-factor-panel-${factor.id}`}
              id={`emission-factor-tab-${factor.id}`}
              onClick={() => setSelectedFactorId(factor.id)}
              className={cn(
                "shrink-0 rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                isSelected
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border bg-background text-muted-foreground hover:bg-muted/40",
              )}
            >
              <span className="block font-medium">{sourceLabel}</span>
              <span className="mt-0.5 block text-xs opacity-80">
                {regionLabel}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`emission-factor-panel-${selectedFactor.id}`}
        aria-labelledby={`emission-factor-tab-${selectedFactor.id}`}
      >
        <EmissionFactorMobileCard
          sourceLabel={getSourceLabel(selectedFactor.source)}
          scopeLabel={getScopeLabel(selectedFactor.scope)}
          regionLabel={getRegionDisplay(selectedFactor.region)}
          unit={selectedFactor.unit}
          factorDisplay={getFactorDisplay(selectedFactor)}
          standard={selectedFactor.standard}
          formula={getFormulaDisplay(selectedFactor)}
          fieldLabels={fieldLabels}
        />
      </div>
    </div>
  );
};

export default EmissionFactorsMobileTabList;
