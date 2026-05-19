"use client";

import { useCallback } from "react";

import { getMessage, type Locale, type MessageKey } from "@/app/constants/i18n";
import { useSettingsStore } from "@/app/store";

export const useTranslation = () => {
  const locale = useSettingsStore((state) => state.locale);

  const t = useCallback(
    (key: MessageKey) => getMessage(locale, key),
    [locale],
  );

  return { locale, t };
};

export type { Locale, MessageKey };
