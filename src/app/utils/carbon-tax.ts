import {
  CARBON_TAX_POLICY_BY_COUNTRY,
  DEFAULT_CARBON_TAX_POLICY,
  type CarbonTaxPolicy,
} from "@/app/constants/carbon-tax";
import { isCountryCode } from "@/app/constants/countries";

export type EstimatedCarbonTax = CarbonTaxPolicy & {
  amount: number;
};

const getCarbonTaxPolicy = (countryCode: string): CarbonTaxPolicy =>
  isCountryCode(countryCode)
    ? CARBON_TAX_POLICY_BY_COUNTRY[countryCode]
    : DEFAULT_CARBON_TAX_POLICY;

export const computeEstimatedCarbonTax = (
  totalEmissions: number,
  countryCode: string,
): EstimatedCarbonTax => {
  const policy = getCarbonTaxPolicy(countryCode);

  return {
    ...policy,
    amount: totalEmissions * policy.ratePerTco2e,
  };
};

export const formatCarbonTaxAmount = (
  estimate: EstimatedCarbonTax,
  maximumFractionDigits = 0,
) =>
  new Intl.NumberFormat(estimate.locale, {
    style: "currency",
    currency: estimate.currency,
    maximumFractionDigits,
  }).format(estimate.amount);

export const formatCarbonTaxRate = (estimate: EstimatedCarbonTax) => {
  const formattedRate = new Intl.NumberFormat(estimate.locale, {
    style: "currency",
    currency: estimate.currency,
    maximumFractionDigits: 0,
  }).format(estimate.ratePerTco2e);

  return `${formattedRate}/tCO2e`;
};
