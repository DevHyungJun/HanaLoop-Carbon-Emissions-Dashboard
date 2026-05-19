"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Plus } from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/common";
import { useToast } from "@/app/components/state";
import {
  EMISSION_SOURCES,
  TOOLBAR_ICON_TEXT_BUTTON_CLASS,
} from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import {
  createOrUpdateActivityRecord,
  deleteActivityRecord,
  type CreateOrUpdateActivityRecordInput,
} from "@/app/lib/api";
import { useActivityRecordsStore, useDateRangeStore } from "@/app/store";
import type { ActivityRecord } from "@/app/types/activity-record";
import { getYearMonthsInRange, isYearMonthInRange } from "@/app/utils";

import ActivityRecordForm, {
  type ActivityRecordFormState,
} from "./ActivityRecordForm";
import ActivityRecordListItem from "./ActivityRecordListItem";

type ActivityRecordPanelProps = {
  records: ActivityRecord[];
  companyId: string;
  countryCode: string;
};

const createEmptyForm = (defaultYearMonth: string): ActivityRecordFormState => ({
  title: "",
  yearMonth: defaultYearMonth,
  source: EMISSION_SOURCES[0],
  description: "",
  quantity: "",
});

const ActivityRecordPanel = ({
  records,
  companyId,
  countryCode,
}: ActivityRecordPanelProps) => {
  const { locale, t } = useTranslation();
  const { toast } = useToast();
  const dateRange = useDateRangeStore((state) => state.dateRange);
  const monthsInRange = useMemo(
    () => getYearMonthsInRange(dateRange),
    [dateRange],
  );
  const upsertRecord = useActivityRecordsStore((state) => state.upsertRecord);
  const deleteRecordFromStore = useActivityRecordsStore(
    (state) => state.deleteRecord,
  );
  const setRecords = useActivityRecordsStore((state) => state.setRecords);
  const [form, setForm] = useState<ActivityRecordFormState | null>(null);
  const [processingRecordId, setProcessingRecordId] = useState<string | null>(
    null,
  );
  const titleInputRef = useRef<HTMLInputElement>(null);
  const previousFormRef = useRef<ActivityRecordFormState | null>(null);

  useEffect(() => {
    if (form && previousFormRef.current === null) {
      titleInputRef.current?.focus();
    }

    previousFormRef.current = form;
  }, [form]);

  useEffect(() => {
    if (!form) {
      return;
    }

    if (!isYearMonthInRange(form.yearMonth, dateRange)) {
      setForm((currentForm) =>
        currentForm
          ? { ...currentForm, yearMonth: dateRange.to }
          : currentForm,
      );
    }
  }, [dateRange, form]);

  const openCreateForm = () => {
    setForm(createEmptyForm(dateRange.to));
  };

  const openEditForm = (record: ActivityRecord) => {
    setForm({
      id: record.id,
      title: record.title,
      yearMonth: record.yearMonth,
      source: record.source,
      description: record.description,
      quantity: String(record.quantity),
    });
  };

  const closeForm = () => {
    setForm(null);
  };

  const handleSubmit = async () => {
    if (!form || !companyId) {
      return;
    }

    const trimmedTitle = form.title.trim();
    const trimmedDescription = form.description.trim();
    const quantity = Number(form.quantity);

    if (
      !trimmedTitle ||
      !trimmedDescription ||
      !Number.isFinite(quantity) ||
      quantity <= 0
    ) {
      return;
    }

    const input: CreateOrUpdateActivityRecordInput = {
      id: form.id,
      title: trimmedTitle,
      companyId,
      yearMonth: form.yearMonth,
      source: form.source,
      description: trimmedDescription,
      quantity,
    };

    const optimisticId = form.id ?? `temp-${crypto.randomUUID()}`;
    const optimisticRecord: ActivityRecord = {
      id: optimisticId,
      title: input.title,
      companyId: input.companyId,
      yearMonth: input.yearMonth,
      source: input.source,
      description: input.description,
      quantity: input.quantity,
    };

    const previousRecords = useActivityRecordsStore.getState().records;

    upsertRecord(optimisticRecord);
    setProcessingRecordId(optimisticId);
    closeForm();

    try {
      const savedRecord = await createOrUpdateActivityRecord(input);

      if (savedRecord.id !== optimisticId) {
        deleteRecordFromStore(optimisticId);
      }

      upsertRecord(savedRecord);
      toast.default(t("pcf.activity.saveSuccess"));
    } catch {
      setRecords(previousRecords);
      toast.error(t("pcf.activity.saveError"));
    } finally {
      setProcessingRecordId(null);
    }
  };

  const handleDelete = async (recordId: string) => {
    const previousRecords = useActivityRecordsStore.getState().records;

    deleteRecordFromStore(recordId);

    if (form?.id === recordId) {
      closeForm();
    }

    setProcessingRecordId(recordId);

    try {
      await deleteActivityRecord(recordId);
      toast.default(t("pcf.activity.deleteSuccess"));
    } catch {
      setRecords(previousRecords);
      toast.error(t("pcf.activity.deleteError"));
    } finally {
      setProcessingRecordId(null);
    }
  };

  const visibleRecords = form?.id
    ? records.filter((record) => record.id !== form.id)
    : records;

  const recordsInRange = useMemo(
    () =>
      visibleRecords.filter((record) =>
        isYearMonthInRange(record.yearMonth, dateRange),
      ),
    [dateRange, visibleRecords],
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>{t("pcf.activity.title")}</CardTitle>
          <CardDescription>{t("pcf.activity.description")}</CardDescription>
        </div>
        <Button
          type="button"
          size="sm"
          className={TOOLBAR_ICON_TEXT_BUTTON_CLASS}
          onClick={openCreateForm}
        >
          <Plus className="size-4" aria-hidden />
          {t("pcf.activity.add")}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {form ? (
          <ActivityRecordForm
            form={form}
            countryCode={countryCode}
            months={monthsInRange}
            titleInputRef={titleInputRef}
            onChange={setForm}
            onCancel={closeForm}
            onSubmit={() => void handleSubmit()}
          />
        ) : null}

        {recordsInRange.length === 0 && !form ? (
          <p className="text-sm text-muted-foreground">
            {t("pcf.activity.empty")}
          </p>
        ) : recordsInRange.length > 0 ? (
          <ul className="min-w-0 space-y-3">
            {recordsInRange.map((record) => (
              <ActivityRecordListItem
                key={record.id}
                record={record}
                countryCode={countryCode}
                locale={locale}
                isProcessing={processingRecordId === record.id}
                readMoreLabel={t("pcf.activity.readMore")}
                readLessLabel={t("pcf.activity.readLess")}
                editLabel={t("pcf.activity.edit")}
                deleteLabel={t("pcf.activity.delete")}
                onEdit={openEditForm}
                onDelete={(targetRecord) =>
                  void handleDelete(targetRecord.id)
                }
              />
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default ActivityRecordPanel;
