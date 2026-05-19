import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ActivityRecord } from "@/app/types/activity-record";

type ActivityRecordsState = {
  records: ActivityRecord[];
  setRecords: (records: ActivityRecord[]) => void;
  upsertRecord: (record: ActivityRecord) => void;
  deleteRecord: (id: string) => void;
};

export const useActivityRecordsStore = create<ActivityRecordsState>()(
  persist(
    (set) => ({
      records: [],
      setRecords: (records) => set({ records }),
      upsertRecord: (record) =>
        set((state) => {
          const existingIndex = state.records.findIndex(
            (item) => item.id === record.id,
          );

          if (existingIndex >= 0) {
            const nextRecords = [...state.records];
            nextRecords[existingIndex] = record;
            return { records: nextRecords };
          }

          return { records: [record, ...state.records] };
        }),
      deleteRecord: (id) =>
        set((state) => ({
          records: state.records.filter((record) => record.id !== id),
        })),
    }),
    {
      name: "hana-loop-activity-records",
    },
  ),
);
