import type { GhgEmission } from "./ghg-emission";

export type Company = {
  id: string;
  name: string;
  /** Country.code */
  country: string;
  emissions: GhgEmission[];
};
