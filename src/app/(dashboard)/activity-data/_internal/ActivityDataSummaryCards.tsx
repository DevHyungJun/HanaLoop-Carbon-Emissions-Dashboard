"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/common";
import { useTranslation } from "@/app/hooks";
import { formatTco2e, type ActivityDataSummary } from "@/app/utils";

type ActivityDataSummaryCardsProps = {
  summary: ActivityDataSummary;
};

const ActivityDataSummaryCards = ({ summary }: ActivityDataSummaryCardsProps) => {
  const { t } = useTranslation();

  const cards = [
    {
      title: t("activityData.kpi.recordCount"),
      description: t("activityData.kpi.recordCountDesc"),
      value: String(summary.recordCount),
      unit: "",
    },
    {
      title: t("activityData.kpi.totalEmissions"),
      description: t("activityData.kpi.totalEmissionsDesc"),
      value: formatTco2e(summary.totalEmissions),
      unit: t("pcf.unit"),
    },
    {
      title: t("activityData.kpi.sourceCount"),
      description: t("activityData.kpi.sourceCountDesc"),
      value: String(summary.uniqueSourceCount),
      unit: "",
    },
    {
      title: t("activityData.kpi.monthlyAvg"),
      description: t("activityData.kpi.monthlyAvgDesc"),
      value: formatTco2e(summary.monthlyAverage),
      unit: t("pcf.unit"),
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

export default ActivityDataSummaryCards;
