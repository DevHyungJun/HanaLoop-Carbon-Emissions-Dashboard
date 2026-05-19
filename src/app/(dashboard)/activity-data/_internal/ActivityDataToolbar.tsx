"use client";

import { RefreshCw } from "lucide-react";

import { Button } from "@/app/components/common";
import {
  ALL_SOURCES_FILTER,
  DEFAULT_DATE_RANGE,
  EMISSION_SOURCES,
  EMISSION_SOURCE_LABEL_KEYS,
  type EmissionSource,
} from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import type { Company } from "@/app/types/company";
import type { Country } from "@/app/types/country";

import ActivityDataMonthPicker from "./ActivityDataMonthPicker";

type ActivityDataToolbarProps = {
  countries: Country[];
  companies: Company[];
  selectedCountryCode: string;
  selectedCompanyId: string;
  selectedMonth: string;
  selectedSource: string;
  onCountryChange: (countryCode: string) => void;
  onCompanyChange: (companyId: string) => void;
  onMonthChange: (month: string) => void;
  onSourceChange: (source: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
};

const ActivityDataToolbar = ({
  countries,
  companies,
  selectedCountryCode,
  selectedCompanyId,
  selectedMonth,
  selectedSource,
  onCountryChange,
  onCompanyChange,
  onMonthChange,
  onSourceChange,
  onRefresh,
  isRefreshing,
}: ActivityDataToolbarProps) => {
  const { t } = useTranslation();
  const hasCompanies = companies.length > 0;

  return (
    <section className="rounded-xl border border-border bg-card p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-foreground">
              {t("activityData.toolbar.country")}
            </span>
            <select
              value={selectedCountryCode}
              onChange={(event) => onCountryChange(event.target.value)}
              className="h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-foreground">
              {t("activityData.toolbar.company")}
            </span>
            <select
              value={selectedCompanyId}
              onChange={(event) => onCompanyChange(event.target.value)}
              disabled={!hasCompanies}
              className="h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {!hasCompanies ? (
                <option value="">{t("activityData.toolbar.noCompany")}</option>
              ) : (
                companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))
              )}
            </select>
          </label>

          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-foreground">
              {t("activityData.toolbar.source")}
            </span>
            <select
              value={selectedSource}
              onChange={(event) => onSourceChange(event.target.value)}
              className="h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value={ALL_SOURCES_FILTER}>
                {t("activityData.toolbar.allSources")}
              </option>
              {EMISSION_SOURCES.map((source) => (
                <option key={source} value={source}>
                  {t(EMISSION_SOURCE_LABEL_KEYS[source as EmissionSource])}
                </option>
              ))}
            </select>
          </label>

          <ActivityDataMonthPicker
            selectedMonth={selectedMonth}
            onMonthChange={onMonthChange}
          />

          <div className="grid gap-1.5 text-sm">
            <span className="font-medium text-foreground">
              {t("activityData.toolbar.period")}
            </span>
            <div className="flex h-9 items-center rounded-lg border border-border bg-muted/40 px-3 text-sm text-muted-foreground">
              {DEFAULT_DATE_RANGE.from} ~ {DEFAULT_DATE_RANGE.to}
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={onRefresh}
          isLoading={isRefreshing}
          className="lg:self-end"
        >
          <RefreshCw className="size-4" aria-hidden />
          {t("activityData.toolbar.refresh")}
        </Button>
      </div>
    </section>
  );
};

export default ActivityDataToolbar;
