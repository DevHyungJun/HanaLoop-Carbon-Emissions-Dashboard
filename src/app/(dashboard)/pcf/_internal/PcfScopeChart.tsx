"use client";

import { Cell, Pie, PieChart } from "recharts";

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
import {
  EMISSION_SCOPES,
  PCF_CHART_CONFIG,
  type EmissionScope,
} from "@/app/constants";
import { useTranslation } from "@/app/hooks";

type PcfScopeChartProps = {
  scopeTotals: Record<EmissionScope, number>;
};

const PcfScopeChart = ({ scopeTotals }: PcfScopeChartProps) => {
  const { t } = useTranslation();

  const chartConfig = EMISSION_SCOPES.reduce<ChartConfig>((config, scope) => {
    config[scope] = {
      label: t(PCF_CHART_CONFIG[scope].labelKey),
      theme: PCF_CHART_CONFIG[scope].theme,
    };
    return config;
  }, {});

  const chartData = EMISSION_SCOPES.map((scope) => ({
    scope,
    value: scopeTotals[scope],
    fill: `var(--color-${scope})`,
  })).filter((item) => item.value > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("pcf.chart.scopeBreakdown")}</CardTitle>
        <CardDescription>{t("pcf.chart.scopeBreakdownDesc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-72">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="scope" />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="scope"
              innerRadius={56}
              outerRadius={88}
              paddingAngle={2}
            >
              {chartData.map((item) => (
                <Cell key={item.scope} fill={item.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PcfScopeChart;
