"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";

import { Button, MonthPicker } from "@/app/components/common";
import {
  POST_CONTENT_MAX_LENGTH,
  POST_TITLE_MAX_LENGTH,
  TOOLBAR_INPUT_CLASS,
} from "@/app/constants";
import { useTranslation } from "@/app/hooks";

export type PostFormState = {
  id?: string;
  title: string;
  dateTime: string;
  content: string;
};

type PostFormProps = {
  form: PostFormState;
  titleInputRef: RefObject<HTMLInputElement | null>;
  onChange: (nextForm: PostFormState) => void;
  onCancel: () => void;
  onSubmit: () => void;
};

const CONTENT_TEXTAREA_MIN_HEIGHT_PX = 96;

const formatCharCount = (
  template: string,
  current: number,
  max: number,
) =>
  template
    .replace("{{current}}", String(current))
    .replace("{{max}}", String(max));

const syncTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
  if (!textarea) {
    return;
  }

  textarea.style.height = "auto";
  textarea.style.height = `${Math.max(textarea.scrollHeight, CONTENT_TEXTAREA_MIN_HEIGHT_PX)}px`;
};

const PostForm = ({
  form,
  titleInputRef,
  onChange,
  onCancel,
  onSubmit,
}: PostFormProps) => {
  const { t } = useTranslation();
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    syncTextareaHeight(contentTextareaRef.current);
  }, [form.content]);

  const isSubmitDisabled = !form.title.trim() || !form.content.trim();

  return (
    <div className="grid gap-3 rounded-xl border border-border bg-muted/20 p-4">
      <label className="grid gap-1.5 text-sm">
        <span className="font-medium">{t("pcf.post.fieldTitle")}</span>
        <input
          ref={titleInputRef}
          value={form.title}
          maxLength={POST_TITLE_MAX_LENGTH}
          onChange={(event) =>
            onChange({ ...form, title: event.target.value })
          }
          className={TOOLBAR_INPUT_CLASS}
        />
        <span className="text-right text-xs text-muted-foreground">
          {formatCharCount(
            t("pcf.post.charCount"),
            form.title.length,
            POST_TITLE_MAX_LENGTH,
          )}
        </span>
      </label>

      <MonthPicker
        selectedMonth={form.dateTime}
        onMonthChange={(dateTime) => onChange({ ...form, dateTime })}
        label={t("pcf.post.fieldMonth")}
      />

      <label className="grid gap-1.5 text-sm">
        <span className="font-medium">{t("pcf.post.fieldContent")}</span>
        <textarea
          ref={contentTextareaRef}
          value={form.content}
          maxLength={POST_CONTENT_MAX_LENGTH}
          onChange={(event) =>
            onChange({ ...form, content: event.target.value })
          }
          rows={1}
          className="min-h-24 resize-none overflow-hidden rounded-lg border border-border bg-background px-3 py-2 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        <span className="text-right text-xs text-muted-foreground">
          {formatCharCount(
            t("pcf.post.charCount"),
            form.content.length,
            POST_CONTENT_MAX_LENGTH,
          )}
        </span>
      </label>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t("pcf.post.cancel")}
        </Button>
        <Button
          type="button"
          disabled={isSubmitDisabled}
          onClick={onSubmit}
        >
          {t("pcf.post.save")}
        </Button>
      </div>
    </div>
  );
};

export default PostForm;
