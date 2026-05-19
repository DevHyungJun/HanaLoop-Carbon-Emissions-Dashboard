import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DEFAULT_DATE_RANGE } from "@/app/constants/dashboard";
import {
  normalizeDateRange,
  type DateRange,
} from "@/app/utils/date-range";

type DateRangeState = {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
};

export const useDateRangeStore = create<DateRangeState>()(
  persist(
    (set) => ({
      dateRange: { ...DEFAULT_DATE_RANGE },
      setDateRange: (range) =>
        set({ dateRange: normalizeDateRange(range) }),
    }),
    {
      name: "hana-loop-date-range",
    },
  ),
);
