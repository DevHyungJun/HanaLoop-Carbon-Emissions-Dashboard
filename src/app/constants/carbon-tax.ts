import type { CountryCode } from "./countries";

export type CarbonTaxPolicy = {
  currency: string;
  locale: string;
  /** 통화 단위당 tCO2e 탄소세 단가 */
  ratePerTco2e: number;
};

/** 참고용 mock 단가 — 실제 규제·시장 가격과 다를 수 있습니다. */
export const CARBON_TAX_POLICY_BY_COUNTRY: Record<CountryCode, CarbonTaxPolicy> = {
  KR: {
    currency: "KRW",
    locale: "ko-KR",
    ratePerTco2e: 50_000,
  },
  US: {
    currency: "USD",
    locale: "en-US",
    ratePerTco2e: 51,
  },
  JP: {
    currency: "JPY",
    locale: "ja-JP",
    ratePerTco2e: 7_000,
  },
  DE: {
    currency: "EUR",
    locale: "de-DE",
    ratePerTco2e: 80,
  },
  CN: {
    currency: "CNY",
    locale: "zh-CN",
    ratePerTco2e: 200,
  },
};

export const DEFAULT_CARBON_TAX_POLICY = CARBON_TAX_POLICY_BY_COUNTRY.KR;
