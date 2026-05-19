"use client";

import { RefreshCw } from "lucide-react";
import { useMemo } from "react";

import { Button, DateRangePicker } from "@/app/components/common";
import {
  ALL_SOURCES_FILTER,
  EMISSION_SOURCES,
  EMISSION_SOURCE_LABEL_KEYS,
  TOOLBAR_REFRESH_BUTTON_CLASS,
  TOOLBAR_SELECT_CLASS,
  type EmissionSource,
} from "@/app/constants";
import { useCountryName, useTranslation } from "@/app/hooks";
import { useDateRangeStore } from "@/app/store";
import type { Company } from "@/app/types/company";
import type { Country } from "@/app/types/country";
import { getYearMonthsInRange } from "@/app/utils";

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
  const getCountryName = useCountryName();
  const dateRange = useDateRangeStore((state) => state.dateRange);
  const setDateRange = useDateRangeStore((state) => state.setDateRange);
  const hasCompanies = companies.length > 0;
  const monthsInRange = useMemo(
    () => getYearMonthsInRange(dateRange),
    [dateRange],
  );

  return (
    <section className="rounded-xl border border-border bg-card p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-foreground">
              {t("activityData.toolbar.country")}
            </span>
            <select
              value={selectedCountryCode}
              onChange={(event) => onCountryChange(event.target.value)}
              className={TOOLBAR_SELECT_CLASS}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {getCountryName(country.code)}
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
              className={TOOLBAR_SELECT_CLASS}
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

          <DateRangePicker
            label={t("activityData.toolbar.period")}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />

          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-foreground">
              {t("activityData.toolbar.source")}
            </span>
            <select
              value={selectedSource}
              onChange={(event) => onSourceChange(event.target.value)}
              className={TOOLBAR_SELECT_CLASS}
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
            months={monthsInRange}
          />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={onRefresh}
          isLoading={isRefreshing}
          className={`${TOOLBAR_REFRESH_BUTTON_CLASS} lg:self-end`}
        >
          <RefreshCw className="size-4" aria-hidden />
          {t("activityData.toolbar.refresh")}
        </Button>
      </div>
    </section>
  );
};

export default ActivityDataToolbar;
