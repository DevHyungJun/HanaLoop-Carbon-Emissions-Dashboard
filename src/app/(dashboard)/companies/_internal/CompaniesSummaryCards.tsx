"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/common";
import { useTranslation } from "@/app/hooks";
import { formatTco2e, type CompaniesPortfolioMetrics } from "@/app/utils";

type CompaniesSummaryCardsProps = {
  metrics: CompaniesPortfolioMetrics;
  getCountryName: (countryCode: string) => string;
};

const CompaniesSummaryCards = ({
  metrics,
  getCountryName,
}: CompaniesSummaryCardsProps) => {
  const { t } = useTranslation();

  const topCountryLabel = metrics.topCountryCode
    ? getCountryName(metrics.topCountryCode)
    : "—";

  const cards = [
    {
      title: t("companies.kpi.companyCount"),
      description: t("companies.kpi.companyCountDesc"),
      value: String(metrics.companyCount),
      unit: "",
    },
    {
      title: t("companies.kpi.totalEmissions"),
      description: t("companies.kpi.totalEmissionsDesc"),
      value: formatTco2e(metrics.totalEmissions),
      unit: t("pcf.unit"),
    },
    {
      title: t("companies.kpi.avgPerCompany"),
      description: t("companies.kpi.avgPerCompanyDesc"),
      value: formatTco2e(metrics.averagePerCompany),
      unit: t("pcf.unit"),
    },
    {
      title: t("companies.kpi.topCountry"),
      description: t("companies.kpi.topCountryDesc"),
      value: topCountryLabel,
      unit: metrics.topCountryCode
        ? `${formatTco2e(metrics.topCountryEmissions)} ${t("pcf.unit")}`
        : "",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="pb-2">
            <CardDescription>{card.description}</CardDescription>
            <CardTitle className="text-base">{card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold tracking-tight text-foreground">
                {card.value}
              </p>
              {card.unit ? (
                <span className="text-sm text-muted-foreground">{card.unit}</span>
              ) : null}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default CompaniesSummaryCards;
