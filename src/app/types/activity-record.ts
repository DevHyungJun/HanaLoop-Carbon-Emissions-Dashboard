import type { EmissionSource } from "@/app/constants/pcf";

export type ActivityRecord = {
  id: string;
  /** Company.id */
  companyId: string;
  /** "YYYY-MM" 형식 */
  yearMonth: string;
  source: EmissionSource;
  title: string;
  description: string;
  quantity: number;
};
