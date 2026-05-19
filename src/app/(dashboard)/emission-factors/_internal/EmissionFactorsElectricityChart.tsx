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
import { COUNTRY_CHART_THEMES } from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import { formatEmissionFactorValue } from "@/app/utils";
import type { EmissionFactor } from "@/app/types/emission-factor";

type EmissionFactorsElectricityChartProps = {
  factors: EmissionFactor[];
  getRegionLabel: (region: string) => string;
};

const EmissionFactorsElectricityChart = ({
  factors,
  getRegionLabel,
}: EmissionFactorsElectricityChartProps) => {
  const { t } = useTranslation();

  const electricityFactors = factors.filter(
    (factor) => factor.source === "electricity" && factor.region !== "GLOBAL",
  );

  const chartData = electricityFactors.map((factor) => ({
    region: factor.region,
    factor: factor.factor,
    fill: `var(--color-${factor.region})`,
  }));

  const chartConfig = electricityFactors.reduce<ChartConfig>((config, factor) => {
    config[factor.region] = {
      label: getRegionLabel(factor.region),
      theme:
        COUNTRY_CHART_THEMES[
          factor.region as keyof typeof COUNTRY_CHART_THEMES
        ] ?? COUNTRY_CHART_THEMES.KR,
    };

    return config;
  }, {});

  if (chartData.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("emissionFactors.chart.electricityComparison")}</CardTitle>
        <CardDescription>
          {t("emissionFactors.chart.electricityComparisonDesc")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[16/10] w-full">
          <BarChart data={chartData} margin={{ left: 8, right: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="region"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => getRegionLabel(String(value))}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={48}
              tickFormatter={(value) => formatEmissionFactorValue(Number(value))}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="region"
                  labelKey="region"
                  formatter={(value) => [
                    `${formatEmissionFactorValue(Number(value))} tCO2e/kWh`,
                    t("emissionFactors.table.factor"),
                  ]}
                />
              }
            />
            <Bar dataKey="factor" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default EmissionFactorsElectricityChart;
