"use client";

import { RefreshCw } from "lucide-react";

import { Button, DateRangePicker } from "@/app/components/common";
import {
  ALL_COUNTRIES_FILTER,
  TOOLBAR_REFRESH_BUTTON_CLASS,
  TOOLBAR_SELECT_CLASS,
} from "@/app/constants";
import { useCountryName, useTranslation } from "@/app/hooks";
import { useDateRangeStore } from "@/app/store";
import type { Country } from "@/app/types/country";

type CompaniesToolbarProps = {
  countries: Country[];
  selectedCountryCode: string;
  onCountryChange: (countryCode: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
};

const CompaniesToolbar = ({
  countries,
  selectedCountryCode,
  onCountryChange,
  onRefresh,
  isRefreshing,
}: CompaniesToolbarProps) => {
  const { t } = useTranslation();
  const getCountryName = useCountryName();
  const dateRange = useDateRangeStore((state) => state.dateRange);
  const setDateRange = useDateRangeStore((state) => state.setDateRange);

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-foreground">
            {t("companies.toolbar.country")}
          </span>
          <select
            value={selectedCountryCode}
            onChange={(event) => onCountryChange(event.target.value)}
            className={TOOLBAR_SELECT_CLASS}
          >
            <option value={ALL_COUNTRIES_FILTER}>
              {t("companies.toolbar.allCountries")}
            </option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {getCountryName(country.code)}
              </option>
            ))}
          </select>
        </label>

        <DateRangePicker
          label={t("companies.toolbar.period")}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onRefresh}
        isLoading={isRefreshing}
        className={`${TOOLBAR_REFRESH_BUTTON_CLASS} sm:self-end`}
      >
        <RefreshCw className="size-4" aria-hidden />
        {t("companies.toolbar.refresh")}
      </Button>
    </section>
  );
};

export default CompaniesToolbar;
