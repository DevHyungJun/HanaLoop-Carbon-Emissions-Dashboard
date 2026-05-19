"use client";

import { RefreshCw } from "lucide-react";

import { Button } from "@/app/components/common";
import { ALL_COUNTRIES_FILTER } from "@/app/constants";
import { useCountryName, useTranslation } from "@/app/hooks";
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

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-end sm:justify-between">
      <label className="grid w-full max-w-sm gap-1.5 text-sm">
        <span className="font-medium text-foreground">
          {t("companies.toolbar.country")}
        </span>
        <select
          value={selectedCountryCode}
          onChange={(event) => onCountryChange(event.target.value)}
          className="h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
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

      <Button
        type="button"
        variant="outline"
        onClick={onRefresh}
        isLoading={isRefreshing}
        className="sm:self-end"
      >
        <RefreshCw className="size-4" aria-hidden />
        {t("companies.toolbar.refresh")}
      </Button>
    </section>
  );
};

export default CompaniesToolbar;
