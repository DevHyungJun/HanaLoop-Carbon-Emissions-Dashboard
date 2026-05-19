"use client";

import { Button } from "@/app/components/common";
import { ALL_COUNTRIES_FILTER } from "@/app/constants";
import { useCompaniesData, useTranslation } from "@/app/hooks";

import {
  CompaniesSkeleton,
  CompaniesSummaryCards,
  CompaniesToolbar,
  CompanyComparisonChart,
  CompanyDetailPanel,
  CompanyRankingTable,
  CountryComparisonChart,
} from "./_internal";

const Companies = () => {
  const { t } = useTranslation();
  const {
    selectedCountryCode,
    setSelectedCountryCode,
    selectedCompanyId,
    setSelectedCompanyId,
    selectedCompanySummary,
    portfolioMetrics,
    getCountryName,
    countries,
    isLoading,
    isRefreshing,
    error,
    reload,
  } = useCompaniesData();

  if (isLoading) {
    return <CompaniesSkeleton />;
  }

  if (error) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card p-8">
        <p className="text-sm text-muted-foreground">{t("companies.error")}</p>
        <Button type="button" variant="outline" onClick={() => void reload()}>
          {t("companies.toolbar.refresh")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CompaniesToolbar
        countries={countries}
        selectedCountryCode={selectedCountryCode}
        onCountryChange={setSelectedCountryCode}
        onRefresh={() => void reload()}
        isRefreshing={isRefreshing}
      />

      <CompaniesSummaryCards
        metrics={portfolioMetrics}
        getCountryName={getCountryName}
      />

      {selectedCountryCode === ALL_COUNTRIES_FILTER ? (
        <div className="grid gap-6 xl:grid-cols-2">
          <CountryComparisonChart
            countries={portfolioMetrics.countries}
            getCountryName={getCountryName}
          />
          <CompanyComparisonChart companies={portfolioMetrics.companies} />
        </div>
      ) : (
        <CompanyComparisonChart companies={portfolioMetrics.companies} />
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <CompanyRankingTable
          companies={portfolioMetrics.companies}
          selectedCompanyId={selectedCompanyId}
          onSelectCompany={setSelectedCompanyId}
          getCountryName={getCountryName}
        />
        <CompanyDetailPanel
          company={selectedCompanySummary}
          getCountryName={getCountryName}
        />
      </div>
    </div>
  );
};

export default Companies;
