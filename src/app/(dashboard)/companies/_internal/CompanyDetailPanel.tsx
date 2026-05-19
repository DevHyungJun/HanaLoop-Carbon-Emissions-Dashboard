"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
import { buttonVariants, EMISSION_SCOPES, PCF_CHART_CONFIG } from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import { cn, formatTco2e, type CompanySummary } from "@/app/utils";

type CompanyDetailPanelProps = {
  company: CompanySummary | undefined;
  getCountryName: (countryCode: string) => string;
};

const CompanyDetailPanel = ({
  company,
  getCountryName,
}: CompanyDetailPanelProps) => {
  const { t } = useTranslation();

  const chartConfig = EMISSION_SCOPES.reduce<ChartConfig>((config, scope) => {
    config[scope] = {
      label: t(PCF_CHART_CONFIG[scope].labelKey),
      theme: PCF_CHART_CONFIG[scope].theme,
    };
    return config;
  }, {});

  if (!company) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("companies.detail.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {t("companies.detail.selectHint")}
          </p>
        </CardContent>
      </Card>
    );
  }

  const chartData = EMISSION_SCOPES.map((scope) => ({
    scope,
    value: company.scopeTotals[scope],
    fill: `var(--color-${scope})`,
  })).filter((item) => item.value > 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>{company.name}</CardTitle>
          <CardDescription>
            {getCountryName(company.countryCode)} ·{" "}
            {formatTco2e(company.totalEmissions)} {t("pcf.unit")}
          </CardDescription>
        </div>
        <Link
          href={`/pcf?company=${company.id}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "inline-flex shrink-0 items-center gap-1",
          )}
        >
          {t("companies.detail.viewPcf")}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-64">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="scope" />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="scope"
              innerRadius={48}
              outerRadius={80}
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

export default CompanyDetailPanel;
