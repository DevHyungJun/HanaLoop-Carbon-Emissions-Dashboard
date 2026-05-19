import type { Company } from "@/app/types/company";
import type { Country } from "@/app/types/country";
import type { Post } from "@/app/types/post";

export const MOCK_COUNTRIES: Country[] = [
  { code: "KR", name: "대한민국" },
  { code: "US", name: "미국" },
  { code: "JP", name: "일본" },
  { code: "DE", name: "독일" },
  { code: "CN", name: "중국" },
];

const EMISSION_SOURCES = [
  "gasoline",
  "diesel",
  "lpg",
  "electricity",
  "natural_gas",
] as const;

const MONTHS = [
  "2024-07",
  "2024-08",
  "2024-09",
  "2024-10",
  "2024-11",
  "2024-12",
  "2025-01",
  "2025-02",
  "2025-03",
  "2025-04",
  "2025-05",
  "2025-06",
] as const;

function createEmissions(seed: number) {
  return MONTHS.flatMap((yearMonth, monthIndex) =>
    EMISSION_SOURCES.map((source, sourceIndex) => ({
      yearMonth,
      source,
      emissions: Number(
        (
          8 +
          seed * 1.2 +
          monthIndex * 0.7 +
          sourceIndex * 1.5 +
          ((seed + monthIndex + sourceIndex) % 5)
        ).toFixed(2),
      ),
    })),
  );
}

export const MOCK_COMPANIES: Company[] = [
  {
    id: "company-hanaloop-mfg",
    name: "HanaLoop Manufacturing",
    country: "KR",
    emissions: createEmissions(1),
  },
  {
    id: "company-green-logistics",
    name: "GreenLogistics",
    country: "KR",
    emissions: createEmissions(2),
  },
  {
    id: "company-pacific-steel",
    name: "Pacific Steel",
    country: "US",
    emissions: createEmissions(3),
  },
  {
    id: "company-eurochem",
    name: "EuroChem GmbH",
    country: "DE",
    emissions: createEmissions(4),
  },
  {
    id: "company-tokyo-energy",
    name: "Tokyo Energy Solutions",
    country: "JP",
    emissions: createEmissions(5),
  },
  {
    id: "company-yangtze-materials",
    name: "Yangtze Materials",
    country: "CN",
    emissions: createEmissions(6),
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: "post-1",
    title: "2025-Q1 감축 계획",
    resourceUid: "company-hanaloop-mfg",
    dateTime: "2025-01",
    content: "고정 연소 설비 효율 개선으로 Scope 1 배출 8% 감축 목표.",
  },
  {
    id: "post-2",
    title: "물류 경로 최적화",
    resourceUid: "company-green-logistics",
    dateTime: "2025-03",
    content: "중거리 배송 경로 재편으로 diesel 사용량 12% 절감 예상.",
  },
  {
    id: "post-3",
    title: "재생에너지 전환 검토",
    resourceUid: "company-pacific-steel",
    dateTime: "2025-02",
    content: "Scope 2 electricity 배출 감축을 위한 PPA 도입 검토 중.",
  },
];
