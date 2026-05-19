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
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/app/components/common";
import {
  EMISSION_SOURCE_LABEL_KEYS,
  PCF_CHART_CONFIG,
  type EmissionSource,
} from "@/app/constants";
import { useTranslation } from "@/app/hooks";

type SourceTotal = {
  source: string;
  total: number;
};

type PcfSourceChartProps = {
  sourceTotals: SourceTotal[];
};

const PcfSourceChart = ({ sourceTotals }: PcfSourceChartProps) => {
  const { t } = useTranslation();

  const chartData = sourceTotals.map((item) => ({
    source: item.source,
    total: item.total,
    fill: `var(--color-${item.source})`,
  }));

  const chartConfig = sourceTotals.reduce<ChartConfig>((config, item) => {
    const source = item.source as EmissionSource;

    if (source in PCF_CHART_CONFIG) {
      config[item.source] = {
        label: t(EMISSION_SOURCE_LABEL_KEYS[source]),
        theme: PCF_CHART_CONFIG[source].theme,
      };
    }

    return config;
  }, {});

  chartConfig.total = {
    label: t("pcf.chart.total"),
    theme: PCF_CHART_CONFIG.total.theme,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("pcf.chart.sourceBreakdown")}</CardTitle>
        <CardDescription>{t("pcf.chart.sourceBreakdownDesc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[16/10] w-full">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 8, right: 16, top: 8, bottom: 8 }}
          >
            <CartesianGrid horizontal={false} />
            <XAxis type="number" tickLine={false} axisLine={false} />
            <YAxis
              type="category"
              dataKey="source"
              tickLine={false}
              axisLine={false}
              width={88}
              tickFormatter={(value) => {
                if (value in EMISSION_SOURCE_LABEL_KEYS) {
                  return t(
                    EMISSION_SOURCE_LABEL_KEYS[value as EmissionSource],
                  );
                }

                return value;
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey="source"
                  labelKey="source"
                />
              }
            />
            <Bar dataKey="total" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PcfSourceChart;
