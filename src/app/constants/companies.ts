export const ALL_COUNTRIES_FILTER = "all" as const;

export const COMPANIES_TABLE_PAGE_SIZE = 5;

export const COUNTRY_CHART_THEMES = {
  KR: {
    light: "oklch(0.527 0.154 150.069)",
    dark: "oklch(0.696 0.17 162.48)",
  },
  US: {
    light: "oklch(0.623 0.17 240.5)",
    dark: "oklch(0.72 0.14 240.5)",
  },
  JP: {
    light: "oklch(0.646 0.222 41.116)",
    dark: "oklch(0.705 0.213 47.604)",
  },
  DE: {
    light: "oklch(0.627 0.265 303.9)",
    dark: "oklch(0.714 0.203 305.504)",
  },
  CN: {
    light: "oklch(0.553 0.13 60.5)",
    dark: "oklch(0.65 0.12 60.5)",
  },
} as const;

export const COMPANY_CHART_THEMES = [
  {
    light: "oklch(0.527 0.154 150.069)",
    dark: "oklch(0.696 0.17 162.48)",
  },
  {
    light: "oklch(0.623 0.17 240.5)",
    dark: "oklch(0.72 0.14 240.5)",
  },
  {
    light: "oklch(0.646 0.222 41.116)",
    dark: "oklch(0.705 0.213 47.604)",
  },
  {
    light: "oklch(0.627 0.265 303.9)",
    dark: "oklch(0.714 0.203 305.504)",
  },
  {
    light: "oklch(0.553 0.13 60.5)",
    dark: "oklch(0.65 0.12 60.5)",
  },
  {
    light: "oklch(0.58 0.12 200)",
    dark: "oklch(0.68 0.1 200)",
  },
] as const;
