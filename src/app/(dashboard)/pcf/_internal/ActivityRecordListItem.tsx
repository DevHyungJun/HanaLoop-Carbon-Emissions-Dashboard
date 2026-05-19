"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/app/components/common";
import {
  ACTIVITY_RECORD_DESCRIPTION_COLLAPSED_LINES,
  ACTIVITY_RECORD_DESCRIPTION_EXPAND_MIN_LENGTH,
  EMISSION_SOURCE_LABEL_KEYS,
  TOOLBAR_ICON_TEXT_BUTTON_CLASS,
  type EmissionSource,
} from "@/app/constants";
import type { Locale } from "@/app/constants/i18n";
import { useTranslation } from "@/app/hooks";
import type { ActivityRecord } from "@/app/types/activity-record";
import {
  cn,
  computeActivityRecordEmissions,
  formatActivityMonthLong,
  formatTco2e,
  getActivityRecordUnit,
} from "@/app/utils";

type ActivityRecordListItemProps = {
  record: ActivityRecord;
  countryCode: string;
  locale: Locale;
  isProcessing: boolean;
  readMoreLabel: string;
  readLessLabel: string;
  editLabel: string;
  deleteLabel: string;
  onEdit: (record: ActivityRecord) => void;
  onDelete: (record: ActivityRecord) => void;
};

const isDescriptionExpandable = (description: string) =>
  description.length > ACTIVITY_RECORD_DESCRIPTION_EXPAND_MIN_LENGTH ||
  description.split("\n").length > ACTIVITY_RECORD_DESCRIPTION_COLLAPSED_LINES;

const ActivityRecordListItem = ({
  record,
  countryCode,
  locale,
  isProcessing,
  readMoreLabel,
  readLessLabel,
  editLabel,
  deleteLabel,
  onEdit,
  onDelete,
}: ActivityRecordListItemProps) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const canExpandDescription = isDescriptionExpandable(record.description);
  const unit = getActivityRecordUnit(record.source, countryCode);
  const emissions = computeActivityRecordEmissions(record, countryCode);
  const sourceLabel = t(EMISSION_SOURCE_LABEL_KEYS[record.source as EmissionSource]);

  return (
    <li className="min-w-0 rounded-xl border border-border bg-background p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p
            className="truncate font-medium text-foreground"
            title={record.title}
          >
            {record.title}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatActivityMonthLong(record.yearMonth, locale)} · {sourceLabel}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={TOOLBAR_ICON_TEXT_BUTTON_CLASS}
            onClick={() => onEdit(record)}
            disabled={isProcessing}
          >
            <Pencil className="size-4" aria-hidden />
            {editLabel}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              TOOLBAR_ICON_TEXT_BUTTON_CLASS,
              "text-destructive hover:text-destructive",
            )}
            onClick={() => onDelete(record)}
            disabled={isProcessing}
          >
            <Trash2 className="size-4" aria-hidden />
            {deleteLabel}
          </Button>
        </div>
      </div>

      <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs text-muted-foreground">
            {t("pcf.activity.fieldQuantity")}
          </dt>
          <dd className="font-medium text-foreground">
            {record.quantity.toLocaleString()} {unit}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">
            {t("pcf.activity.computedEmissions")}
          </dt>
          <dd className="font-medium text-foreground">
            {formatTco2e(emissions)} {t("pcf.unit")}
          </dd>
        </div>
      </dl>

      <div className="mt-3 min-w-0">
        <p
          className={cn(
            "text-sm leading-6 break-words text-muted-foreground",
            isExpanded ? "whitespace-pre-wrap" : "line-clamp-3",
          )}
        >
          {record.description}
        </p>

        {canExpandDescription ? (
          <Button
            type="button"
            variant="link"
            size="sm"
            className="mt-1 h-auto px-0"
            onClick={() => setIsExpanded((current) => !current)}
          >
            {isExpanded ? readLessLabel : readMoreLabel}
          </Button>
        ) : null}
      </div>
    </li>
  );
};

export default ActivityRecordListItem;
