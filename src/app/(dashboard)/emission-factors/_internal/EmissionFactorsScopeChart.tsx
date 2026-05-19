"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/app/components/common";
import { PCF_CHART_CONFIG, EMISSION_SCOPE_LABEL_KEYS, type EmissionScope } from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import { getEmissionFactorScopeCounts } from "@/app/utils";
import type { EmissionFactor } from "@/app/types/emission-factor";

type EmissionFactorsScopeChartProps = {
  factors: EmissionFactor[];
};

const EmissionFactorsScopeChart = ({
  factors,
}: EmissionFactorsScopeChartProps) => {
  const { t } = useTranslation();

  const chartData = getEmissionFactorScopeCounts(factors).map((entry) => ({
    scope: entry.scope,
    count: entry.count,
    fill: `var(--color-${entry.scope})`,
  }));

  const chartConfig = chartData.reduce<ChartConfig>((config, entry) => {
    config[entry.scope] = {
      label: t(EMISSION_SCOPE_LABEL_KEYS[entry.scope as EmissionScope]),
      theme: PCF_CHART_CONFIG[entry.scope as EmissionScope].theme,
    };

    return config;
  }, {});

  if (chartData.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("emissionFactors.chart.scopeDistribution")}</CardTitle>
        <CardDescription>
          {t("emissionFactors.chart.scopeDistributionDesc")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[16/10] w-full">
          <BarChart data={chartData} margin={{ left: 8, right: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="scope"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                t(EMISSION_SCOPE_LABEL_KEYS[value as EmissionScope])
              }
            />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={32} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="scope"
                  labelKey="scope"
                  formatter={(value) => [value, t("emissionFactors.kpi.totalCount")]}
                />
              }
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default EmissionFactorsScopeChart;
