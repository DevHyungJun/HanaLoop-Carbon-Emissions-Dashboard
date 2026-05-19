"use client";

import { CalendarDays } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import BottomSheet from "./BottomSheet";
import { Button } from "./Button";
import { WheelSpinner } from "./WheelSpinner";
import { ACTIVITY_DATA_MONTHS, ALL_MONTHS_FILTER } from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import {
  formatActivityMonthLong,
  formatActivityMonthShort,
  getActivityDataMonthsForYear,
  getActivityDataYears,
  parseActivityYearMonth,
  toActivityYearMonth,
} from "@/app/utils/activity-data";

type MonthPickerProps = {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  label: string;
  showAllMonthsOption?: boolean;
  months?: readonly string[];
};

const MonthPicker = ({
  selectedMonth,
  onMonthChange,
  label,
  showAllMonthsOption = false,
  months = ACTIVITY_DATA_MONTHS,
}: MonthPickerProps) => {
  const { locale, t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [draftYear, setDraftYear] = useState("");
  const [draftMonth, setDraftMonth] = useState("");

  const years = useMemo(() => getActivityDataYears(months), [months]);

  const monthOptions = useMemo(() => {
    if (!draftYear) {
      return [];
    }

    return getActivityDataMonthsForYear(draftYear, months).map((yearMonth) => {
      const { month } = parseActivityYearMonth(yearMonth);

      return {
        value: month,
        label: formatActivityMonthShort(yearMonth, locale),
      };
    });
  }, [draftYear, locale, months]);

  const yearOptions = useMemo(
    () => years.map((year) => ({ value: year, label: year })),
    [years],
  );

  const selectedLabel =
    showAllMonthsOption && selectedMonth === ALL_MONTHS_FILTER
      ? t("activityData.toolbar.allMonths")
      : formatActivityMonthLong(selectedMonth, locale);

  const openSheet = () => {
    const fallbackYearMonth = months[0] ?? "";
    const initialYearMonth =
      showAllMonthsOption && selectedMonth === ALL_MONTHS_FILTER
        ? fallbackYearMonth
        : selectedMonth;
    const { year, month } = parseActivityYearMonth(initialYearMonth);

    setDraftYear(year);
    setDraftMonth(month);
    setIsSheetOpen(true);
  };

  useEffect(() => {
    if (!draftYear) {
      return;
    }

    const monthsForYear = getActivityDataMonthsForYear(draftYear, months);

    if (
      monthsForYear.some((yearMonth) => yearMonth.endsWith(`-${draftMonth}`))
    ) {
      return;
    }

    const nextMonth = parseActivityYearMonth(monthsForYear[0] ?? "").month;

    if (nextMonth) {
      setDraftMonth(nextMonth);
    }
  }, [draftYear, draftMonth, months]);

  const handleApply = () => {
    if (draftYear && draftMonth) {
      onMonthChange(toActivityYearMonth(draftYear, draftMonth));
    }

    setIsSheetOpen(false);
  };

  const handleSelectAllMonths = () => {
    onMonthChange(ALL_MONTHS_FILTER);
    setIsSheetOpen(false);
  };

  return (
    <>
      <div className="grid gap-1.5 text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <button
          type="button"
          onClick={openSheet}
          className="flex h-9 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-border bg-background pl-3 pr-3.5 text-sm text-foreground outline-none transition-colors hover:bg-muted/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="truncate text-left">{selectedLabel}</span>
          <CalendarDays
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden
          />
        </button>
      </div>

      <BottomSheet
        open={isSheetOpen}
        title={t("activityData.monthPicker.title")}
        onClose={() => setIsSheetOpen(false)}
        bodyClassName="overflow-hidden"
        footer={
          showAllMonthsOption ? (
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleSelectAllMonths}
              >
                {t("activityData.toolbar.allMonths")}
              </Button>
              <Button type="button" className="flex-1" onClick={handleApply}>
                {t("activityData.monthPicker.apply")}
              </Button>
            </div>
          ) : (
            <Button type="button" className="w-full" onClick={handleApply}>
              {t("activityData.monthPicker.apply")}
            </Button>
          )
        }
      >
        <div className="mx-auto flex w-fit max-w-md justify-center gap-1">
          <WheelSpinner
            label={t("activityData.monthPicker.year")}
            items={yearOptions}
            value={draftYear}
            onChange={setDraftYear}
          />
          <WheelSpinner
            label={t("activityData.monthPicker.month")}
            items={monthOptions}
            value={draftMonth}
            onChange={setDraftMonth}
          />
        </div>
      </BottomSheet>
    </>
  );
};

export { MonthPicker };
export type { MonthPickerProps };
