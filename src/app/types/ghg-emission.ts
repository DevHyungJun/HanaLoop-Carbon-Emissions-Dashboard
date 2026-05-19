export type GhgEmission = {
  /** "YYYY-MM" 형식 (예: "2025-01") */
  yearMonth: string;
  /** 배출원 (예: gasoline, lpg, diesel) */
  source: string;
  /** tCO2e (CO2 환산 톤) */
  emissions: number;
};
