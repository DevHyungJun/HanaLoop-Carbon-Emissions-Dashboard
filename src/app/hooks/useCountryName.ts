"use client";

import { useCallback } from "react";

import {
  COUNTRY_LABEL_KEYS,
  isCountryCode,
} from "@/app/constants/countries";
import { useTranslation } from "@/app/hooks/useTranslation";

export const useCountryName = () => {
  const { t } = useTranslation();

  return useCallback(
    (countryCode: string) => {
      if (isCountryCode(countryCode)) {
        return t(COUNTRY_LABEL_KEYS[countryCode]);
      }

      return countryCode;
    },
    [t],
  );
};
