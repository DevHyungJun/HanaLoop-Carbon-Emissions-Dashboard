import { DEFAULT_DATE_RANGE } from "@/app/constants";
import type { EmissionScope } from "@/app/constants/pcf";
import type { Company } from "@/app/types/company";

import { computePcfMetrics } from "./emissions";

type DateRange = {
  from: string;
  to: string;
};

export type CompanySummary = {
  id: string;
  name: string;
  countryCode: string;
  totalEmissions: number;
  monthlyAverage: number;
  scopeTotals: Record<EmissionScope, number>;
};

export type CountrySummary = {
  countryCode: string;
  totalEmissions: number;
  companyCount: number;
};

export type CompaniesPortfolioMetrics = {
  companyCount: number;
  totalEmissions: number;
  averagePerCompany: number;
  topCountryCode: string | null;
  topCountryEmissions: number;
  topCompany: CompanySummary | null;
  companies: CompanySummary[];
  countries: CountrySummary[];
};

export const filterCompaniesByCountry = (
  companies: Company[],
  countryCode: string,
  allCountriesValue: string,
) =>
  countryCode === allCountriesValue
    ? companies
    : companies.filter((company) => company.country === countryCode);

export const computeCompaniesPortfolioMetrics = (
  companies: Company[],
  range: DateRange = DEFAULT_DATE_RANGE,
): CompaniesPortfolioMetrics => {
  const summaries: CompanySummary[] = companies
    .map((company) => {
      const metrics = computePcfMetrics(company.emissions, range);

      return {
        id: company.id,
        name: company.name,
        countryCode: company.country,
        totalEmissions: metrics.totalEmissions,
        monthlyAverage: metrics.monthlyAverage,
        scopeTotals: metrics.scopeTotals,
      };
    })
    .sort((left, right) => right.totalEmissions - left.totalEmissions);

  const countryTotals = new Map<string, { total: number; count: number }>();

  for (const summary of summaries) {
    const current = countryTotals.get(summary.countryCode) ?? {
      total: 0,
      count: 0,
    };

    countryTotals.set(summary.countryCode, {
      total: current.total + summary.totalEmissions,
      count: current.count + 1,
    });
  }

  const countries: CountrySummary[] = Array.from(countryTotals.entries())
    .map(([countryCode, data]) => ({
      countryCode,
      totalEmissions: data.total,
      companyCount: data.count,
    }))
    .sort((left, right) => right.totalEmissions - left.totalEmissions);

  const totalEmissions = summaries.reduce(
    (sum, summary) => sum + summary.totalEmissions,
    0,
  );
  const topCountry = countries[0] ?? null;

  return {
    companyCount: summaries.length,
    totalEmissions,
    averagePerCompany:
      summaries.length > 0 ? totalEmissions / summaries.length : 0,
    topCountryCode: topCountry?.countryCode ?? null,
    topCountryEmissions: topCountry?.totalEmissions ?? 0,
    topCompany: summaries[0] ?? null,
    companies: summaries,
    countries,
  };
};
