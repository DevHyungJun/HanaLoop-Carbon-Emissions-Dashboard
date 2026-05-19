"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/common";
import {
  EMISSION_FACTORS_PAGE_SIZE,
  EMISSION_SCOPE_LABEL_KEYS,
  EMISSION_SOURCE_LABEL_KEYS,
  type EmissionScope,
  type EmissionSource,
} from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import type { EmissionFactor } from "@/app/types/emission-factor";
import { formatEmissionFactorValue } from "@/app/utils";

type EmissionFactorsTableProps = {
  factors: EmissionFactor[];
  getRegionLabel: (region: string) => string;
};

const formatPaginationSummary = (
  template: string,
  values: { total: number; from: number; to: number },
) =>
  template
    .replace("{{total}}", String(values.total))
    .replace("{{from}}", String(values.from))
    .replace("{{to}}", String(values.to));

const EmissionFactorsTable = ({
  factors,
  getRegionLabel,
}: EmissionFactorsTableProps) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(factors.length / EMISSION_FACTORS_PAGE_SIZE),
  );

  const paginatedFactors = useMemo(() => {
    const startIndex = (currentPage - 1) * EMISSION_FACTORS_PAGE_SIZE;

    return factors.slice(startIndex, startIndex + EMISSION_FACTORS_PAGE_SIZE);
  }, [factors, currentPage]);

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [factors]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const summaryFrom =
    factors.length === 0
      ? 0
      : (currentPage - 1) * EMISSION_FACTORS_PAGE_SIZE + 1;
  const summaryTo = Math.min(
    currentPage * EMISSION_FACTORS_PAGE_SIZE,
    factors.length,
  );

  const getSourceLabel = (source: string) => {
    if (source in EMISSION_SOURCE_LABEL_KEYS) {
      return t(EMISSION_SOURCE_LABEL_KEYS[source as EmissionSource]);
    }

    return source;
  };

  const getScopeLabel = (scope: EmissionScope) =>
    t(EMISSION_SCOPE_LABEL_KEYS[scope]);

  const getRegionDisplay = (region: string) => {
    if (region === "GLOBAL") {
      return t("emissionFactors.region.global");
    }

    return getRegionLabel(region);
  };

  const getUnitLabel = (unit: string) =>
    t("emissionFactors.unitLabel").replace("{{unit}}", unit);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("emissionFactors.table.title")}</CardTitle>
        <CardDescription>{t("emissionFactors.table.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {factors.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {t("emissionFactors.table.empty")}
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="px-3 py-2 font-medium">
                      {t("emissionFactors.table.source")}
                    </th>
                    <th className="px-3 py-2 font-medium">
                      {t("emissionFactors.table.scope")}
                    </th>
                    <th className="px-3 py-2 font-medium">
                      {t("emissionFactors.table.region")}
                    </th>
                    <th className="px-3 py-2 font-medium">
                      {t("emissionFactors.table.unit")}
                    </th>
                    <th className="px-3 py-2 text-right font-medium">
                      {t("emissionFactors.table.factor")}
                    </th>
                    <th className="px-3 py-2 font-medium">
                      {t("emissionFactors.table.standard")}
                    </th>
                    <th className="px-3 py-2 font-medium">
                      {t("emissionFactors.table.formula")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedFactors.map((factor) => (
                    <tr
                      key={factor.id}
                      className="border-b border-border/60 transition-colors hover:bg-muted/30"
                    >
                      <td className="px-3 py-3 text-foreground">
                        {getSourceLabel(factor.source)}
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">
                        {getScopeLabel(factor.scope)}
                      </td>
                      <td className="px-3 py-3 text-foreground">
                        {getRegionDisplay(factor.region)}
                      </td>
                      <td className="px-3 py-3 font-mono text-muted-foreground">
                        {factor.unit}
                      </td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums">
                        {formatEmissionFactorValue(factor.factor)}{" "}
                        <span className="text-muted-foreground">
                          {getUnitLabel(factor.unit)}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">
                        {factor.standard}
                      </td>
                      <td className="px-3 py-3 font-mono text-xs text-muted-foreground">
                        1 {factor.unit} × {formatEmissionFactorValue(factor.factor)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 ? (
              <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  {formatPaginationSummary(
                    t("activityData.pagination.summary"),
                    {
                      total: factors.length,
                      from: summaryFrom,
                      to: summaryTo,
                    },
                  )}
                </p>

                <nav
                  className="flex items-center gap-1"
                  aria-label={t("emissionFactors.table.title")}
                >
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => page - 1)}
                    aria-label={t("activityData.pagination.previous")}
                  >
                    <ChevronLeft className="size-4" aria-hidden />
                  </Button>

                  {pageNumbers.map((page) => (
                    <Button
                      key={page}
                      type="button"
                      variant={page === currentPage ? "default" : "outline"}
                      size="icon-sm"
                      onClick={() => setCurrentPage(page)}
                      aria-current={page === currentPage ? "page" : undefined}
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((page) => page + 1)}
                    aria-label={t("activityData.pagination.next")}
                  >
                    <ChevronRight className="size-4" aria-hidden />
                  </Button>
                </nav>
              </div>
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EmissionFactorsTable;
