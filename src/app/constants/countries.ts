import type { MessageKey } from "./i18n";

export const COUNTRY_CODES = ["KR", "US", "JP", "DE", "CN"] as const;

export type CountryCode = (typeof COUNTRY_CODES)[number];

export const COUNTRY_LABEL_KEYS: Record<CountryCode, MessageKey> = {
  KR: "country.KR",
  US: "country.US",
  JP: "country.JP",
  DE: "country.DE",
  CN: "country.CN",
};

export const isCountryCode = (code: string): code is CountryCode =>
  code in COUNTRY_LABEL_KEYS;
