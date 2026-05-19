"use client";

import { MonthPicker } from "@/app/components/common/MonthPicker";
import { useTranslation } from "@/app/hooks";

type ActivityDataMonthPickerProps = {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  months: readonly string[];
};

const ActivityDataMonthPicker = ({
  selectedMonth,
  onMonthChange,
  months,
}: ActivityDataMonthPickerProps) => {
  const { t } = useTranslation();

  return (
    <MonthPicker
      selectedMonth={selectedMonth}
      onMonthChange={onMonthChange}
      label={t("activityData.toolbar.month")}
      showAllMonthsOption
      months={months}
    />
  );
};

export default ActivityDataMonthPicker;
