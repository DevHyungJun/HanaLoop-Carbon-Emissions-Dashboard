"use client";

import { CalendarRange } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import BottomSheet from "./BottomSheet";
import { Button } from "./Button";
import { WheelSpinner } from "./WheelSpinner";
import { useTranslation } from "@/app/hooks";
import {
  formatActivityMonthShort,
  getActivityDataMonthsForYear,
  getActivityDataYears,
  parseActivityYearMonth,
  toActivityYearMonth,
} from "@/app/utils/activity-data";
import {
  formatDateRangeLabel,
  getYearMonthsForBounds,
  normalizeDateRange,
  type DateRange,
} from "@/app/utils/date-range";

type DateRangePickerProps = {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  label: string;
};

const DateRangePicker = ({
  dateRange,
  onDateRangeChange,
  label,
}: DateRangePickerProps) => {
  const { locale, t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [draftFromYear, setDraftFromYear] = useState("");
  const [draftFromMonth, setDraftFromMonth] = useState("");
  const [draftToYear, setDraftToYear] = useState("");
  const [draftToMonth, setDraftToMonth] = useState("");

  const availableMonths = useMemo(() => getYearMonthsForBounds(), []);

  const years = useMemo(
    () => getActivityDataYears(availableMonths),
    [availableMonths],
  );

  const fromMonthOptions = useMemo(() => {
    if (!draftFromYear) {
      return [];
    }

    return getActivityDataMonthsForYear(draftFromYear, availableMonths).map(
      (yearMonth) => {
        const { month } = parseActivityYearMonth(yearMonth);

        return {
          value: month,
          label: formatActivityMonthShort(yearMonth, locale),
        };
      },
    );
  }, [availableMonths, draftFromYear, locale]);

  const toMonthOptions = useMemo(() => {
    if (!draftToYear) {
      return [];
    }

    return getActivityDataMonthsForYear(draftToYear, availableMonths).map(
      (yearMonth) => {
        const { month } = parseActivityYearMonth(yearMonth);

        return {
          value: month,
          label: formatActivityMonthShort(yearMonth, locale),
        };
      },
    );
  }, [availableMonths, draftToYear, locale]);

  const yearOptions = useMemo(
    () => years.map((year) => ({ value: year, label: year })),
    [years],
  );

  const selectedLabel = formatDateRangeLabel(dateRange, locale);

  const draftPreviewLabel = useMemo(() => {
    if (!draftFromYear || !draftFromMonth || !draftToYear || !draftToMonth) {
      return selectedLabel;
    }

    return formatDateRangeLabel(
      normalizeDateRange({
        from: toActivityYearMonth(draftFromYear, draftFromMonth),
        to: toActivityYearMonth(draftToYear, draftToMonth),
      }),
      locale,
    );
  }, [
    draftFromMonth,
    draftFromYear,
    draftToMonth,
    draftToYear,
    locale,
    selectedLabel,
  ]);

  const openSheet = () => {
    const normalized = normalizeDateRange(dateRange);
    const fromParts = parseActivityYearMonth(normalized.from);
    const toParts = parseActivityYearMonth(normalized.to);

    setDraftFromYear(fromParts.year);
    setDraftFromMonth(fromParts.month);
    setDraftToYear(toParts.year);
    setDraftToMonth(toParts.month);
    setIsSheetOpen(true);
  };

  useEffect(() => {
    if (!draftFromYear) {
      return;
    }

    const monthsForYear = getActivityDataMonthsForYear(
      draftFromYear,
      availableMonths,
    );

    if (
      monthsForYear.some((yearMonth) => yearMonth.endsWith(`-${draftFromMonth}`))
    ) {
      return;
    }

    const nextMonth = parseActivityYearMonth(monthsForYear[0] ?? "").month;

    if (nextMonth) {
      setDraftFromMonth(nextMonth);
    }
  }, [availableMonths, draftFromYear, draftFromMonth]);

  useEffect(() => {
    if (!draftToYear) {
      return;
    }

    const monthsForYear = getActivityDataMonthsForYear(
      draftToYear,
      availableMonths,
    );

    if (
      monthsForYear.some((yearMonth) => yearMonth.endsWith(`-${draftToMonth}`))
    ) {
      return;
    }

    const nextMonth = parseActivityYearMonth(monthsForYear[0] ?? "").month;

    if (nextMonth) {
      setDraftToMonth(nextMonth);
    }
  }, [availableMonths, draftToYear, draftToMonth]);

  const handleApply = () => {
    if (!draftFromYear || !draftFromMonth || !draftToYear || !draftToMonth) {
      return;
    }

    onDateRangeChange(
      normalizeDateRange({
        from: toActivityYearMonth(draftFromYear, draftFromMonth),
        to: toActivityYearMonth(draftToYear, draftToMonth),
      }),
    );
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
          <CalendarRange
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden
          />
        </button>
      </div>

      <BottomSheet
        open={isSheetOpen}
        title={t("common.dateRange.title")}
        onClose={() => setIsSheetOpen(false)}
        bodyClassName="overflow-hidden py-3"
        footer={
          <Button type="button" className="w-full" onClick={handleApply}>
            {t("common.dateRange.apply")}
          </Button>
        }
      >
        <div className="space-y-3">
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-foreground">
              {t("common.dateRange.from")}
            </p>
            <div className="mx-auto flex w-fit max-w-md justify-center gap-1">
              <WheelSpinner
                label={t("activityData.monthPicker.year")}
                items={yearOptions}
                value={draftFromYear}
                onChange={setDraftFromYear}
              />
              <WheelSpinner
                label={t("activityData.monthPicker.month")}
                items={fromMonthOptions}
                value={draftFromMonth}
                onChange={setDraftFromMonth}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-sm font-medium text-foreground">
              {t("common.dateRange.to")}
            </p>
            <div className="mx-auto flex w-fit max-w-md justify-center gap-1">
              <WheelSpinner
                label={t("activityData.monthPicker.year")}
                items={yearOptions}
                value={draftToYear}
                onChange={setDraftToYear}
              />
              <WheelSpinner
                label={t("activityData.monthPicker.month")}
                items={toMonthOptions}
                value={draftToMonth}
                onChange={setDraftToMonth}
              />
            </div>
          </div>

          <p className="pt-0.5 text-center text-xs text-muted-foreground">
            {draftPreviewLabel}
          </p>
        </div>
      </BottomSheet>
    </>
  );
};

export { DateRangePicker };
export type { DateRangePickerProps };
