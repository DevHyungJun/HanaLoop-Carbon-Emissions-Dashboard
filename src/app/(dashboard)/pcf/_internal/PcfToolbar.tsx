"use client";

import { RefreshCw } from "lucide-react";

import { Button } from "@/app/components/common";
import {
  TOOLBAR_REFRESH_BUTTON_CLASS,
  TOOLBAR_SELECT_CLASS,
} from "@/app/constants";
import { useCountryName, useTranslation } from "@/app/hooks";
import type { Company } from "@/app/types/company";
import type { Country } from "@/app/types/country";

type PcfToolbarProps = {
  countries: Country[];
  companies: Company[];
  selectedCountryCode: string;
  selectedCompanyId: string;
  onCountryChange: (countryCode: string) => void;
  onCompanyChange: (companyId: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
};

const PcfToolbar = ({
  countries,
  companies,
  selectedCountryCode,
  selectedCompanyId,
  onCountryChange,
  onCompanyChange,
  onRefresh,
  isRefreshing,
}: PcfToolbarProps) => {
  const { t } = useTranslation();
  const getCountryName = useCountryName();
  const hasCompanies = companies.length > 0;

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-foreground">
            {t("pcf.toolbar.country")}
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
            {t("pcf.toolbar.company")}
          </span>
          <select
            value={selectedCompanyId}
            onChange={(event) => onCompanyChange(event.target.value)}
            disabled={!hasCompanies}
            className={TOOLBAR_SELECT_CLASS}
          >
            {!hasCompanies ? (
              <option value="">{t("pcf.toolbar.noCompany")}</option>
            ) : (
              companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))
            )}
          </select>
        </label>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onRefresh}
        isLoading={isRefreshing}
        className={`${TOOLBAR_REFRESH_BUTTON_CLASS} sm:self-end`}
      >
        <RefreshCw className="size-4" aria-hidden />
        {t("pcf.toolbar.refresh")}
      </Button>
    </section>
  );
};

export default PcfToolbar;
