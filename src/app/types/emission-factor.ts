import type { EmissionScope, EmissionSource } from "@/app/constants/pcf";

export type EmissionFactor = {
  id: string;
  source: EmissionSource;
  scope: EmissionScope;
  region: string;
  unit: string;
  factor: number;
  effectiveFrom: string;
  standard: string;
};
