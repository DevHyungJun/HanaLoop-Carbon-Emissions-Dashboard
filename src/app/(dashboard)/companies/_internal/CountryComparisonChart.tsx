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
import { COUNTRY_CHART_THEMES } from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import type { CountrySummary } from "@/app/utils";

type CountryComparisonChartProps = {
  countries: CountrySummary[];
  getCountryName: (countryCode: string) => string;
};

const CountryComparisonChart = ({
  countries,
  getCountryName,
}: CountryComparisonChartProps) => {
  const { t } = useTranslation();

  const chartData = countries.map((country) => ({
    countryCode: country.countryCode,
    total: country.totalEmissions,
    fill: `var(--color-${country.countryCode})`,
  }));

  const chartConfig = countries.reduce<ChartConfig>((config, country) => {
    const theme =
      COUNTRY_CHART_THEMES[
        country.countryCode as keyof typeof COUNTRY_CHART_THEMES
      ];

    config[country.countryCode] = {
      label: getCountryName(country.countryCode),
      theme: theme ?? COUNTRY_CHART_THEMES.KR,
    };

    return config;
  }, {});

  chartConfig.emissions = {
    label: t("companies.chart.emissions"),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("companies.chart.countryComparison")}</CardTitle>
        <CardDescription>{t("companies.chart.countryComparisonDesc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[16/10] w-full">
          <BarChart data={chartData} margin={{ left: 8, right: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="countryCode"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => getCountryName(String(value))}
            />
            <YAxis tickLine={false} axisLine={false} width={48} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey="countryCode"
                  labelKey="countryCode"
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

export default CountryComparisonChart;
