"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/app/components/common";
import { EMISSION_SCOPES, PCF_CHART_CONFIG } from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import type { MonthlyScopePoint } from "@/app/utils/emissions";

type PcfMonthlyTrendChartProps = {
  data: MonthlyScopePoint[];
};

const PcfMonthlyTrendChart = ({ data }: PcfMonthlyTrendChartProps) => {
  const { t } = useTranslation();

  const chartConfig = EMISSION_SCOPES.reduce<ChartConfig>((config, scope) => {
    config[scope] = {
      label: t(PCF_CHART_CONFIG[scope].labelKey),
      theme: PCF_CHART_CONFIG[scope].theme,
    };
    return config;
  }, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("pcf.chart.monthlyTrend")}</CardTitle>
        <CardDescription>{t("pcf.chart.monthlyTrendDesc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[16/10] w-full">
          <BarChart data={data} margin={{ left: 8, right: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
            />
            <YAxis tickLine={false} axisLine={false} width={48} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            {EMISSION_SCOPES.map((scope) => (
              <Bar
                key={scope}
                dataKey={scope}
                stackId="emissions"
                fill={`var(--color-${scope})`}
                radius={scope === "scope3" ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PcfMonthlyTrendChart;
