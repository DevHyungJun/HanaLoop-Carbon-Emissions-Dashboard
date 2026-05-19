"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/common";
import { useTranslation } from "@/app/hooks";
import type { EmissionFactorsSummary } from "@/app/utils";

type EmissionFactorsSummaryCardsProps = {
  summary: EmissionFactorsSummary;
};

const EmissionFactorsSummaryCards = ({
  summary,
}: EmissionFactorsSummaryCardsProps) => {
  const { t } = useTranslation();

  const cards = [
    {
      title: t("emissionFactors.kpi.totalCount"),
      description: t("emissionFactors.kpi.totalCountDesc"),
      value: String(summary.totalCount),
      unit: "",
    },
    {
      title: t("emissionFactors.kpi.scope1Count"),
      description: t("emissionFactors.kpi.scope1CountDesc"),
      value: String(summary.scope1Count),
      unit: "",
    },
    {
      title: t("emissionFactors.kpi.scope2Count"),
      description: t("emissionFactors.kpi.scope2CountDesc"),
      value: String(summary.scope2Count),
      unit: "",
    },
    {
      title: t("emissionFactors.kpi.latestUpdate"),
      description: t("emissionFactors.kpi.latestUpdateDesc"),
      value: summary.latestEffectiveFrom ?? "—",
      unit: "",
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

export default EmissionFactorsSummaryCards;
