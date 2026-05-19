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
import { COMPANIES_TABLE_PAGE_SIZE } from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import { cn, formatTco2e, type CompanySummary } from "@/app/utils";

type CompanyRankingTableProps = {
  companies: CompanySummary[];
  selectedCompanyId: string;
  onSelectCompany: (companyId: string) => void;
  getCountryName: (countryCode: string) => string;
};

const formatPaginationSummary = (
  template: string,
  values: { total: number; from: number; to: number },
) =>
  template
    .replace("{{total}}", String(values.total))
    .replace("{{from}}", String(values.from))
    .replace("{{to}}", String(values.to));

const CompanyRankingTable = ({
  companies,
  selectedCompanyId,
  onSelectCompany,
  getCountryName,
}: CompanyRankingTableProps) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(companies.length / COMPANIES_TABLE_PAGE_SIZE),
  );

  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * COMPANIES_TABLE_PAGE_SIZE;

    return companies.slice(startIndex, startIndex + COMPANIES_TABLE_PAGE_SIZE);
  }, [companies, currentPage]);

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [companies]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const summaryFrom =
    companies.length === 0
      ? 0
      : (currentPage - 1) * COMPANIES_TABLE_PAGE_SIZE + 1;
  const summaryTo = Math.min(
    currentPage * COMPANIES_TABLE_PAGE_SIZE,
    companies.length,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("companies.table.title")}</CardTitle>
        <CardDescription>{t("companies.table.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {companies.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("companies.table.empty")}</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="px-3 py-2 font-medium">
                      {t("companies.table.company")}
                    </th>
                    <th className="px-3 py-2 font-medium">
                      {t("companies.table.country")}
                    </th>
                    <th className="px-3 py-2 text-right font-medium">
                      {t("companies.table.total")}
                    </th>
                    <th className="px-3 py-2 text-right font-medium">
                      {t("companies.table.monthlyAvg")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCompanies.map((company) => {
                    const isSelected = company.id === selectedCompanyId;

                    return (
                      <tr
                        key={company.id}
                        className={cn(
                          "cursor-pointer border-b border-border/60 transition-colors hover:bg-muted/40",
                          isSelected && "bg-emerald-50/60 dark:bg-emerald-950/20",
                        )}
                        onClick={() => onSelectCompany(company.id)}
                      >
                        <td className="px-3 py-3 font-medium text-foreground">
                          {company.name}
                        </td>
                        <td className="px-3 py-3 text-muted-foreground">
                          {getCountryName(company.countryCode)}
                        </td>
                        <td className="px-3 py-3 text-right font-mono tabular-nums">
                          {formatTco2e(company.totalEmissions)} {t("pcf.unit")}
                        </td>
                        <td className="px-3 py-3 text-right font-mono tabular-nums text-muted-foreground">
                          {formatTco2e(company.monthlyAverage)} {t("pcf.unit")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {totalPages > 1 ? (
              <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  {formatPaginationSummary(t("companies.pagination.summary"), {
                    total: companies.length,
                    from: summaryFrom,
                    to: summaryTo,
                  })}
                </p>

                <nav
                  className="flex items-center gap-1"
                  aria-label={t("companies.table.title")}
                >
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => page - 1)}
                    aria-label={t("companies.pagination.previous")}
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
                    aria-label={t("companies.pagination.next")}
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

export default CompanyRankingTable;
