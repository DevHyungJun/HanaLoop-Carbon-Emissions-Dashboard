"use client";

import { RefreshCw } from "lucide-react";

import { Button } from "@/app/components/common";
import { DEFAULT_DATE_RANGE } from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import type { Company } from "@/app/types/company";

type PcfToolbarProps = {
  companies: Company[];
  selectedCompanyId: string;
  onCompanyChange: (companyId: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
};

const PcfToolbar = ({
  companies,
  selectedCompanyId,
  onCompanyChange,
  onRefresh,
  isRefreshing,
}: PcfToolbarProps) => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-foreground">{t("pcf.toolbar.company")}</span>
          <select
            value={selectedCompanyId}
            onChange={(event) => onCompanyChange(event.target.value)}
            className="h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-1.5 text-sm">
          <span className="font-medium text-foreground">{t("pcf.toolbar.period")}</span>
          <div className="flex h-9 items-center rounded-lg border border-border bg-muted/40 px-3 text-sm text-muted-foreground">
            {DEFAULT_DATE_RANGE.from} ~ {DEFAULT_DATE_RANGE.to}
          </div>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onRefresh}
        isLoading={isRefreshing}
        className="sm:self-end"
      >
        <RefreshCw className="size-4" aria-hidden />
        {t("pcf.toolbar.refresh")}
      </Button>
    </section>
  );
};

export default PcfToolbar;
