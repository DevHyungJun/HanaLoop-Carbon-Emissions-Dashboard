import { EMISSION_SOURCE_SCOPE } from "@/app/constants/pcf";
import type { EmissionFactor } from "@/app/types/emission-factor";

export const ALL_SCOPES_FILTER = "all" as const;

export const ALL_EMISSION_FACTOR_SOURCES_FILTER = "all" as const;

export const EMISSION_FACTORS_PAGE_SIZE = 10;

export const EMISSION_FACTOR_DEFINITIONS: EmissionFactor[] = [
  {
    id: "ef-gasoline",
    source: "gasoline",
    scope: EMISSION_SOURCE_SCOPE.gasoline,
    region: "GLOBAL",
    unit: "L",
    factor: 0.00231,
    effectiveFrom: "2024-01",
    standard: "IPCC 2006",
  },
  {
    id: "ef-diesel",
    source: "diesel",
    scope: EMISSION_SOURCE_SCOPE.diesel,
    region: "GLOBAL",
    unit: "L",
    factor: 0.00268,
    effectiveFrom: "2024-01",
    standard: "IPCC 2006",
  },
  {
    id: "ef-lpg",
    source: "lpg",
    scope: EMISSION_SOURCE_SCOPE.lpg,
    region: "GLOBAL",
    unit: "kg",
    factor: 0.00301,
    effectiveFrom: "2024-01",
    standard: "IPCC 2006",
  },
  {
    id: "ef-natural-gas",
    source: "natural_gas",
    scope: EMISSION_SOURCE_SCOPE.natural_gas,
    region: "GLOBAL",
    unit: "m3",
    factor: 0.00202,
    effectiveFrom: "2024-01",
    standard: "IPCC 2006",
  },
  {
    id: "ef-electricity-kr",
    source: "electricity",
    scope: EMISSION_SOURCE_SCOPE.electricity,
    region: "KR",
    unit: "kWh",
    factor: 0.0004787,
    effectiveFrom: "2024-07",
    standard: "KEA 2024",
  },
  {
    id: "ef-electricity-us",
    source: "electricity",
    scope: EMISSION_SOURCE_SCOPE.electricity,
    region: "US",
    unit: "kWh",
    factor: 0.000385,
    effectiveFrom: "2024-01",
    standard: "EPA eGRID 2024",
  },
  {
    id: "ef-electricity-jp",
    source: "electricity",
    scope: EMISSION_SOURCE_SCOPE.electricity,
    region: "JP",
    unit: "kWh",
    factor: 0.000465,
    effectiveFrom: "2024-01",
    standard: "MOE Japan 2023",
  },
  {
    id: "ef-electricity-de",
    source: "electricity",
    scope: EMISSION_SOURCE_SCOPE.electricity,
    region: "DE",
    unit: "kWh",
    factor: 0.000366,
    effectiveFrom: "2024-01",
    standard: "UBA ProBas 2024",
  },
  {
    id: "ef-electricity-cn",
    source: "electricity",
    scope: EMISSION_SOURCE_SCOPE.electricity,
    region: "CN",
    unit: "kWh",
    factor: 0.000581,
    effectiveFrom: "2024-01",
    standard: "MEE China 2023",
  },
];
