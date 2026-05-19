import { EMISSION_FACTOR_DEFINITIONS } from "@/app/constants/emission-factors";
import type { EmissionSource } from "@/app/constants/pcf";
import type { ActivityRecord } from "@/app/types/activity-record";
import type { EmissionFactor } from "@/app/types/emission-factor";
import type { GhgEmission } from "@/app/types/ghg-emission";

export const resolveEmissionFactor = (
  source: EmissionSource,
  countryCode: string,
): EmissionFactor | undefined => {
  const regionalFactor = EMISSION_FACTOR_DEFINITIONS.find(
    (factor) => factor.source === source && factor.region === countryCode,
  );

  if (regionalFactor) {
    return regionalFactor;
  }

  return EMISSION_FACTOR_DEFINITIONS.find(
    (factor) => factor.source === source && factor.region === "GLOBAL",
  );
};

export const computeActivityRecordEmissions = (
  record: ActivityRecord,
  countryCode: string,
) => {
  const factor = resolveEmissionFactor(record.source, countryCode);

  if (!factor) {
    return 0;
  }

  return record.quantity * factor.factor;
};

export const getActivityRecordUnit = (
  source: EmissionSource,
  countryCode: string,
) => resolveEmissionFactor(source, countryCode)?.unit ?? "";

const emissionKey = (yearMonth: string, source: string) =>
  `${yearMonth}:${source}`;

export const mergeEmissionsWithActivityRecords = (
  baseEmissions: GhgEmission[],
  records: ActivityRecord[],
  countryCode: string,
): GhgEmission[] => {
  const merged = baseEmissions.map((emission) => ({ ...emission }));
  const indexByKey = new Map<string, number>();

  merged.forEach((emission, index) => {
    indexByKey.set(emissionKey(emission.yearMonth, emission.source), index);
  });

  for (const record of records) {
    const emissions = computeActivityRecordEmissions(record, countryCode);
    const key = emissionKey(record.yearMonth, record.source);
    const existingIndex = indexByKey.get(key);

    if (existingIndex !== undefined) {
      merged[existingIndex] = {
        ...merged[existingIndex],
        emissions: merged[existingIndex].emissions + emissions,
      };
      continue;
    }

    indexByKey.set(key, merged.length);
    merged.push({
      yearMonth: record.yearMonth,
      source: record.source,
      emissions,
    });
  }

  return merged;
};
