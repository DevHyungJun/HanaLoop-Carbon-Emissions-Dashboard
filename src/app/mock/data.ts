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

const COMPANY_DEFINITIONS = [
  { id: "company-hanaloop-mfg", name: "HanaLoop Manufacturing", country: "KR", seed: 1 },
  { id: "company-green-logistics", name: "GreenLogistics", country: "KR", seed: 2 },
  { id: "company-seoul-precision", name: "Seoul Precision Parts", country: "KR", seed: 3 },
  { id: "company-korean-battery", name: "Korean Battery Tech", country: "KR", seed: 4 },
  { id: "company-pacific-steel", name: "Pacific Steel", country: "US", seed: 5 },
  { id: "company-midwest-auto", name: "Midwest Auto Components", country: "US", seed: 6 },
  { id: "company-california-solar", name: "California Solar Industries", country: "US", seed: 7 },
  { id: "company-great-lakes-paper", name: "Great Lakes Paper", country: "US", seed: 8 },
  { id: "company-tokyo-energy", name: "Tokyo Energy Solutions", country: "JP", seed: 9 },
  { id: "company-osaka-chemical", name: "Osaka Chemical Works", country: "JP", seed: 10 },
  { id: "company-yokohama-packaging", name: "Yokohama Packaging", country: "JP", seed: 11 },
  { id: "company-nagoya-metals", name: "Nagoya Metals", country: "JP", seed: 12 },
  { id: "company-eurochem", name: "EuroChem GmbH", country: "DE", seed: 13 },
  { id: "company-rhine-valley", name: "Rhine Valley Plastics", country: "DE", seed: 14 },
  { id: "company-bavaria-motors", name: "Bavaria Motors Supply", country: "DE", seed: 15 },
  { id: "company-hamburg-logistics", name: "Hamburg Logistics", country: "DE", seed: 16 },
  { id: "company-yangtze-materials", name: "Yangtze Materials", country: "CN", seed: 17 },
  { id: "company-shenzhen-electronics", name: "Shenzhen Electronics", country: "CN", seed: 18 },
  { id: "company-shanghai-port", name: "Shanghai Port Services", country: "CN", seed: 19 },
  { id: "company-chengdu-materials", name: "Chengdu Materials", country: "CN", seed: 20 },
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

export const MOCK_COMPANIES: Company[] = COMPANY_DEFINITIONS.map(
  ({ id, name, country, seed }) => ({
    id,
    name,
    country,
    emissions: createEmissions(seed),
  }),
);

export const MOCK_POSTS: Post[] = [];
