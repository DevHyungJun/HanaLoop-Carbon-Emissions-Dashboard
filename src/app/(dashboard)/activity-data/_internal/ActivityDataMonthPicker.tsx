"use client";

import { MonthPicker } from "@/app/components/common/MonthPicker";
import { useTranslation } from "@/app/hooks";

type ActivityDataMonthPickerProps = {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
};

const ActivityDataMonthPicker = ({
  selectedMonth,
  onMonthChange,
}: ActivityDataMonthPickerProps) => {
  const { t } = useTranslation();

  return (
    <MonthPicker
      selectedMonth={selectedMonth}
      onMonthChange={onMonthChange}
      label={t("activityData.toolbar.month")}
      showAllMonthsOption
    />
  );
};

export default ActivityDataMonthPicker;
