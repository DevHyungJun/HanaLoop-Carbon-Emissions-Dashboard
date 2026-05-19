"use client";

import { useLayoutEffect, useMemo, useRef, type RefObject } from "react";

import { Button, MonthPicker } from "@/app/components/common";
import {
  ACTIVITY_RECORD_DESCRIPTION_MAX_LENGTH,
  ACTIVITY_RECORD_TITLE_MAX_LENGTH,
  EMISSION_SOURCES,
  EMISSION_SOURCE_LABEL_KEYS,
  TOOLBAR_INPUT_CLASS,
  TOOLBAR_SELECT_CLASS,
  type EmissionSource,
} from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import {
  computeActivityRecordEmissions,
  formatTco2e,
  getActivityRecordUnit,
} from "@/app/utils";

export type ActivityRecordFormState = {
  id?: string;
  title: string;
  yearMonth: string;
  source: EmissionSource;
  description: string;
  quantity: string;
};

type ActivityRecordFormProps = {
  form: ActivityRecordFormState;
  countryCode: string;
  months: string[];
  titleInputRef: RefObject<HTMLInputElement | null>;
  onChange: (nextForm: ActivityRecordFormState) => void;
  onCancel: () => void;
  onSubmit: () => void;
};

const DESCRIPTION_TEXTAREA_MIN_HEIGHT_PX = 96;

const formatCharCount = (
  template: string,
  current: number,
  max: number,
) =>
  template
    .replace("{{current}}", String(current))
    .replace("{{max}}", String(max));

const formatTemplate = (template: string, values: Record<string, string>) =>
  Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{{${key}}}`, value),
    template,
  );

const syncTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
  if (!textarea) {
    return;
  }

  textarea.style.height = "auto";
  textarea.style.height = `${Math.max(textarea.scrollHeight, DESCRIPTION_TEXTAREA_MIN_HEIGHT_PX)}px`;
};

const ActivityRecordForm = ({
  form,
  countryCode,
  months,
  titleInputRef,
  onChange,
  onCancel,
  onSubmit,
}: ActivityRecordFormProps) => {
  const { t } = useTranslation();
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const parsedQuantity = Number(form.quantity);
  const isQuantityValid = Number.isFinite(parsedQuantity) && parsedQuantity > 0;
  const unit = getActivityRecordUnit(form.source, countryCode);

  const previewEmissions = useMemo(() => {
    if (!isQuantityValid) {
      return null;
    }

    return computeActivityRecordEmissions(
      {
        id: "preview",
        companyId: "",
        yearMonth: form.yearMonth,
        source: form.source,
        title: "",
        description: "",
        quantity: parsedQuantity,
      },
      countryCode,
    );
  }, [
    countryCode,
    form.source,
    form.yearMonth,
    isQuantityValid,
    parsedQuantity,
  ]);

  useLayoutEffect(() => {
    syncTextareaHeight(descriptionTextareaRef.current);
  }, [form.description]);

  const isSubmitDisabled =
    !form.title.trim() || !form.description.trim() || !isQuantityValid;

  return (
    <div className="grid gap-3 rounded-xl border border-border bg-muted/20 p-4">
      <label className="grid gap-1.5 text-sm">
        <span className="font-medium">{t("pcf.activity.fieldTitle")}</span>
        <input
          ref={titleInputRef}
          value={form.title}
          maxLength={ACTIVITY_RECORD_TITLE_MAX_LENGTH}
          onChange={(event) =>
            onChange({ ...form, title: event.target.value })
          }
          className={TOOLBAR_INPUT_CLASS}
        />
        <span className="text-right text-xs text-muted-foreground">
          {formatCharCount(
            t("pcf.activity.charCount"),
            form.title.length,
            ACTIVITY_RECORD_TITLE_MAX_LENGTH,
          )}
        </span>
      </label>

      <MonthPicker
        selectedMonth={form.yearMonth}
        onMonthChange={(yearMonth) => onChange({ ...form, yearMonth })}
        label={t("pcf.activity.fieldMonth")}
        months={months}
      />

      <label className="grid gap-1.5 text-sm">
        <span className="font-medium">{t("pcf.activity.fieldSource")}</span>
        <select
          value={form.source}
          onChange={(event) =>
            onChange({
              ...form,
              source: event.target.value as EmissionSource,
            })
          }
          className={TOOLBAR_SELECT_CLASS}
        >
          {EMISSION_SOURCES.map((source) => {
            const sourceUnit = getActivityRecordUnit(source, countryCode);

            return (
              <option key={source} value={source}>
                {t(EMISSION_SOURCE_LABEL_KEYS[source])}
                {sourceUnit ? ` (${sourceUnit})` : ""}
              </option>
            );
          })}
        </select>
      </label>

      <label className="grid gap-1.5 text-sm">
        <span className="font-medium">
          {unit
            ? formatTemplate(t("pcf.activity.fieldQuantityWithUnit"), { unit })
            : t("pcf.activity.fieldQuantity")}
        </span>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            step="any"
            value={form.quantity}
            onChange={(event) =>
              onChange({ ...form, quantity: event.target.value })
            }
            className={TOOLBAR_INPUT_CLASS}
          />
          {unit ? (
            <span className="inline-flex h-9 min-w-14 shrink-0 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm text-muted-foreground">
              {unit}
            </span>
          ) : null}
        </div>
        {form.quantity && !isQuantityValid ? (
          <span className="text-xs text-destructive">
            {t("pcf.activity.invalidQuantity")}
          </span>
        ) : null}
        {previewEmissions != null ? (
          <span className="text-xs text-muted-foreground">
            {formatTemplate(t("pcf.activity.previewEmissions"), {
              amount: formatTco2e(previewEmissions),
            })}
          </span>
        ) : null}
      </label>

      <label className="grid gap-1.5 text-sm">
        <span className="font-medium">{t("pcf.activity.fieldDescription")}</span>
        <textarea
          ref={descriptionTextareaRef}
          value={form.description}
          maxLength={ACTIVITY_RECORD_DESCRIPTION_MAX_LENGTH}
          onChange={(event) =>
            onChange({ ...form, description: event.target.value })
          }
          rows={1}
          className="min-h-24 resize-none overflow-hidden rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        <span className="text-right text-xs text-muted-foreground">
          {formatCharCount(
            t("pcf.activity.charCount"),
            form.description.length,
            ACTIVITY_RECORD_DESCRIPTION_MAX_LENGTH,
          )}
        </span>
      </label>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t("pcf.activity.cancel")}
        </Button>
        <Button
          type="button"
          disabled={isSubmitDisabled}
          onClick={onSubmit}
        >
          {t("pcf.activity.save")}
        </Button>
      </div>
    </div>
  );
};

export default ActivityRecordForm;
