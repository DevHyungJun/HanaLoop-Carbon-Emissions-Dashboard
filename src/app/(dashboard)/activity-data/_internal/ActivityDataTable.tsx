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
  ACTIVITY_DATA_PAGE_SIZE,
  EMISSION_SCOPE_LABEL_KEYS,
  EMISSION_SOURCE_LABEL_KEYS,
  type EmissionScope,
  type EmissionSource,
} from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import { formatTco2e, type ActivityDataRow } from "@/app/utils";

type ActivityDataTableProps = {
  rows: ActivityDataRow[];
};

const formatPaginationSummary = (
  template: string,
  values: { total: number; from: number; to: number },
) =>
  template
    .replace("{{total}}", String(values.total))
    .replace("{{from}}", String(values.from))
    .replace("{{to}}", String(values.to));

const ActivityDataTable = ({ rows }: ActivityDataTableProps) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(rows.length / ACTIVITY_DATA_PAGE_SIZE));

  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * ACTIVITY_DATA_PAGE_SIZE;

    return rows.slice(startIndex, startIndex + ACTIVITY_DATA_PAGE_SIZE);
  }, [rows, currentPage]);

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [rows]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const summaryFrom =
    rows.length === 0 ? 0 : (currentPage - 1) * ACTIVITY_DATA_PAGE_SIZE + 1;
  const summaryTo = Math.min(currentPage * ACTIVITY_DATA_PAGE_SIZE, rows.length);

  const getSourceLabel = (source: string) => {
    if (source in EMISSION_SOURCE_LABEL_KEYS) {
      return t(EMISSION_SOURCE_LABEL_KEYS[source as EmissionSource]);
    }

    return source;
  };

  const getScopeLabel = (scope: EmissionScope) =>
    t(EMISSION_SCOPE_LABEL_KEYS[scope]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("activityData.table.title")}</CardTitle>
        <CardDescription>{t("activityData.table.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {t("activityData.table.empty")}
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="px-3 py-2 font-medium">
                      {t("activityData.table.month")}
                    </th>
                    <th className="px-3 py-2 font-medium">
                      {t("activityData.table.source")}
                    </th>
                    <th className="px-3 py-2 font-medium">
                      {t("activityData.table.scope")}
                    </th>
                    <th className="px-3 py-2 text-right font-medium">
                      {t("activityData.table.emissions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-border/60 transition-colors hover:bg-muted/30"
                    >
                      <td className="px-3 py-3 font-mono tabular-nums text-foreground">
                        {row.yearMonth}
                      </td>
                      <td className="px-3 py-3 text-foreground">
                        {getSourceLabel(row.source)}
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">
                        {getScopeLabel(row.scope)}
                      </td>
                      <td className="px-3 py-3 text-right font-mono tabular-nums">
                        {formatTco2e(row.emissions)} {t("pcf.unit")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 ? (
              <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  {formatPaginationSummary(t("activityData.pagination.summary"), {
                    total: rows.length,
                    from: summaryFrom,
                    to: summaryTo,
                  })}
                </p>

                <nav
                  className="flex items-center gap-1"
                  aria-label={t("activityData.table.title")}
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

export default ActivityDataTable;
