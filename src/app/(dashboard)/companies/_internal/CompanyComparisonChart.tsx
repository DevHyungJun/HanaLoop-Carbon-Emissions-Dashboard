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
import { COMPANY_CHART_THEMES } from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import type { CompanySummary } from "@/app/utils";

type CompanyComparisonChartProps = {
  companies: CompanySummary[];
};

const CompanyComparisonChart = ({ companies }: CompanyComparisonChartProps) => {
  const { t } = useTranslation();

  const chartData = companies.map((company, index) => ({
    companyId: company.id,
    companyName: company.name,
    total: company.totalEmissions,
    fill: `var(--color-${company.id})`,
  }));

  const chartConfig = companies.reduce<ChartConfig>((config, company, index) => {
    config[company.id] = {
      label: company.name,
      theme:
        COMPANY_CHART_THEMES[index % COMPANY_CHART_THEMES.length] ??
        COMPANY_CHART_THEMES[0],
    };

    return config;
  }, {});

  chartConfig.emissions = {
    label: t("companies.chart.emissions"),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("companies.chart.companyComparison")}</CardTitle>
        <CardDescription>{t("companies.chart.companyComparisonDesc")}</CardDescription>
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
              dataKey="companyName"
              tickLine={false}
              axisLine={false}
              width={120}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent hideLabel nameKey="companyId" labelKey="companyId" />
              }
            />
            <Bar dataKey="total" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CompanyComparisonChart;
