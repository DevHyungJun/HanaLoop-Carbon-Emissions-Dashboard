import type { MessageKey } from "./i18n";

export const EMISSION_SOURCE_SCOPE = {
  gasoline: "scope1",
  diesel: "scope1",
  lpg: "scope1",
  natural_gas: "scope1",
  electricity: "scope2",
} as const;

export type EmissionSource = keyof typeof EMISSION_SOURCE_SCOPE;

export type EmissionScope = "scope1" | "scope2" | "scope3";

export const EMISSION_SOURCES = Object.keys(
  EMISSION_SOURCE_SCOPE,
) as EmissionSource[];

export const EMISSION_SCOPES: EmissionScope[] = [
  "scope1",
  "scope2",
  "scope3",
];

export const EMISSION_SOURCE_LABEL_KEYS: Record<EmissionSource, MessageKey> = {
  gasoline: "pcf.source.gasoline",
  diesel: "pcf.source.diesel",
  lpg: "pcf.source.lpg",
  natural_gas: "pcf.source.naturalGas",
  electricity: "pcf.source.electricity",
};

export const EMISSION_SCOPE_LABEL_KEYS: Record<EmissionScope, MessageKey> = {
  scope1: "pcf.scope.scope1",
  scope2: "pcf.scope.scope2",
  scope3: "pcf.scope.scope3",
};

export const PCF_CHART_CONFIG = {
  scope1: {
    labelKey: "pcf.scope.scope1" as MessageKey,
    theme: {
      light: "oklch(0.646 0.222 41.116)",
      dark: "oklch(0.705 0.213 47.604)",
    },
  },
  scope2: {
    labelKey: "pcf.scope.scope2" as MessageKey,
    theme: {
      light: "oklch(0.623 0.17 240.5)",
      dark: "oklch(0.72 0.14 240.5)",
    },
  },
  scope3: {
    labelKey: "pcf.scope.scope3" as MessageKey,
    theme: {
      light: "oklch(0.627 0.265 303.9)",
      dark: "oklch(0.714 0.203 305.504)",
    },
  },
  total: {
    labelKey: "pcf.chart.total" as MessageKey,
    theme: {
      light: "oklch(0.527 0.154 150.069)",
      dark: "oklch(0.696 0.17 162.48)",
    },
  },
  gasoline: {
    labelKey: "pcf.source.gasoline" as MessageKey,
    theme: {
      light: "oklch(0.646 0.222 41.116)",
      dark: "oklch(0.705 0.213 47.604)",
    },
  },
  diesel: {
    labelKey: "pcf.source.diesel" as MessageKey,
    theme: {
      light: "oklch(0.553 0.13 60.5)",
      dark: "oklch(0.65 0.12 60.5)",
    },
  },
  lpg: {
    labelKey: "pcf.source.lpg" as MessageKey,
    theme: {
      light: "oklch(0.68 0.19 70)",
      dark: "oklch(0.75 0.16 70)",
    },
  },
  natural_gas: {
    labelKey: "pcf.source.naturalGas" as MessageKey,
    theme: {
      light: "oklch(0.58 0.12 200)",
      dark: "oklch(0.68 0.1 200)",
    },
  },
  electricity: {
    labelKey: "pcf.source.electricity" as MessageKey,
    theme: {
      light: "oklch(0.623 0.17 240.5)",
      dark: "oklch(0.72 0.14 240.5)",
    },
  },
} as const;
