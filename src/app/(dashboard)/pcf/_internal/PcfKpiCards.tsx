"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/common";
import {
  EMISSION_SOURCE_LABEL_KEYS,
  type EmissionSource,
} from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import {
  formatPercentChange,
  formatTco2e,
  type PcfMetrics,
} from "@/app/utils/emissions";

type PcfKpiCardsProps = {
  metrics: PcfMetrics;
};

const PcfKpiCards = ({ metrics }: PcfKpiCardsProps) => {
  const { t } = useTranslation();

  const topSourceLabel =
    metrics.topSource &&
    metrics.topSource in EMISSION_SOURCE_LABEL_KEYS
      ? t(EMISSION_SOURCE_LABEL_KEYS[metrics.topSource as EmissionSource])
      : metrics.topSource ?? "—";

  const cards = [
    {
      title: t("pcf.kpi.total"),
      description: t("pcf.kpi.totalDesc"),
      value: formatTco2e(metrics.totalEmissions),
      unit: t("pcf.unit"),
    },
    {
      title: t("pcf.kpi.monthlyAvg"),
      description: t("pcf.kpi.monthlyAvgDesc"),
      value: formatTco2e(metrics.monthlyAverage),
      unit: t("pcf.unit"),
    },
    {
      title: t("pcf.kpi.topSource"),
      description: t("pcf.kpi.topSourceDesc"),
      value: topSourceLabel,
      unit: `${formatTco2e(metrics.topSourceShare, 1)}%`,
    },
    {
      title: t("pcf.kpi.monthOverMonth"),
      description: t("pcf.kpi.monthOverMonthDesc"),
      value: formatPercentChange(metrics.monthOverMonthChange),
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

export default PcfKpiCards;
