import { EMISSION_FACTOR_DEFINITIONS } from "@/app/constants/emission-factors";
import { MOCK_ACTIVITY_RECORDS, MOCK_COMPANIES, MOCK_COUNTRIES } from "@/app/mock/data";
import type { ActivityRecord } from "@/app/types/activity-record";
import type { Company } from "@/app/types/company";
import type { Country } from "@/app/types/country";
import type { EmissionFactor } from "@/app/types/emission-factor";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const jitter = () => 200 + Math.random() * 600;
const maybeFail = () => Math.random() < 0.15;

let activityRecordsStore: ActivityRecord[] = structuredClone(MOCK_ACTIVITY_RECORDS);

const withDelay = async <T>(operation: () => T): Promise<T> => {
  await delay(jitter());
  return operation();
};

export const fetchCountries = async (): Promise<Country[]> => {
  return withDelay(() => structuredClone(MOCK_COUNTRIES));
};

export const fetchCompanies = async (): Promise<Company[]> => {
  return withDelay(() => structuredClone(MOCK_COMPANIES));
};

export const fetchActivityRecords = async (): Promise<ActivityRecord[]> => {
  return withDelay(() => structuredClone(activityRecordsStore));
};

/** @deprecated Post API 호환 alias */
export const fetchPosts = fetchActivityRecords;

export const fetchEmissionFactors = async (): Promise<EmissionFactor[]> => {
  return withDelay(() => structuredClone(EMISSION_FACTOR_DEFINITIONS));
};

export type CreateOrUpdateActivityRecordInput = Omit<ActivityRecord, "id"> & {
  id?: string;
};

/** @deprecated Post API 호환 alias */
export type CreateOrUpdatePostInput = CreateOrUpdateActivityRecordInput;

export class ActivityRecordSaveError extends Error {
  constructor(
    message = "활동 데이터 저장에 실패했습니다. 잠시 후 다시 시도해 주세요.",
  ) {
    super(message);
    this.name = "ActivityRecordSaveError";
  }
}

/** @deprecated Post API 호환 alias */
export class PostSaveError extends ActivityRecordSaveError {}

export class ActivityRecordDeleteError extends Error {
  constructor(
    message = "활동 데이터 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.",
  ) {
    super(message);
    this.name = "ActivityRecordDeleteError";
  }
}

/** @deprecated Post API 호환 alias */
export class PostDeleteError extends ActivityRecordDeleteError {}

export const createOrUpdateActivityRecord = async (
  input: CreateOrUpdateActivityRecordInput,
): Promise<ActivityRecord> => {
  await delay(jitter());

  if (maybeFail()) {
    throw new ActivityRecordSaveError();
  }

  const record: ActivityRecord = {
    id: input.id ?? crypto.randomUUID(),
    companyId: input.companyId,
    yearMonth: input.yearMonth,
    source: input.source,
    title: input.title,
    description: input.description,
    quantity: input.quantity,
  };

  const existingIndex = activityRecordsStore.findIndex(
    (item) => item.id === record.id,
  );

  if (existingIndex >= 0) {
    activityRecordsStore[existingIndex] = record;
  } else {
    activityRecordsStore = [record, ...activityRecordsStore];
  }

  return structuredClone(record);
};

/** @deprecated Post API 호환 alias */
export const createOrUpdatePost = createOrUpdateActivityRecord;

export const deleteActivityRecord = async (id: string): Promise<void> => {
  await delay(jitter());

  if (maybeFail()) {
    throw new ActivityRecordDeleteError();
  }

  activityRecordsStore = activityRecordsStore.filter((record) => record.id !== id);
};

/** @deprecated Post API 호환 alias */
export const deletePost = deleteActivityRecord;
