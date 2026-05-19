"use client";

import { usePathname } from "next/navigation";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@/app/components/common";
import {
  DEFAULT_DATE_RANGE,
  getNavItemByPathname,
} from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import { useDashboardStore } from "@/app/store";
import { cn } from "@/app/utils";

import {
  getSidebarIconButtonStateClass,
  SIDEBAR_ICON_BUTTON_CLASS,
} from "./sidebarStyles";
import { DashboardBrand } from "./DashboardBrand";

type DashboardHeaderProps = {
  className?: string;
};

export function DashboardHeader({ className }: DashboardHeaderProps) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const currentPage = getNavItemByPathname(pathname);
  const toggleDrawer = useDashboardStore((state) => state.toggleDrawer);
  const isSidebarCollapsed = useDashboardStore(
    (state) => state.isSidebarCollapsed,
  );
  const toggleSidebarCollapsed = useDashboardStore(
    (state) => state.toggleSidebarCollapsed,
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:px-6",
        className,
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={t("common.openMenu")}
        className="lg:hidden"
        onClick={toggleDrawer}
      >
        <Menu className="size-5" />
      </Button>

      <button
        type="button"
        aria-label={
          isSidebarCollapsed
            ? t("common.expandSidebar")
            : t("common.collapseSidebar")
        }
        onClick={toggleSidebarCollapsed}
        className={cn(
          "hidden items-center justify-center lg:flex",
          SIDEBAR_ICON_BUTTON_CLASS,
          getSidebarIconButtonStateClass(false),
        )}
      >
        {isSidebarCollapsed ? (
          <PanelLeftOpen className="size-4" aria-hidden />
        ) : (
          <PanelLeftClose className="size-4" aria-hidden />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <DashboardBrand />
          <span className="hidden text-border sm:inline">|</span>
          <h1 className="truncate text-sm font-semibold text-foreground sm:text-base">
            {t(currentPage.labelKey)}
          </h1>
        </div>
        <p className="truncate text-xs text-muted-foreground">
          {t(currentPage.descriptionKey)}
        </p>
      </div>

      <div className="hidden shrink-0 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground sm:block">
        {DEFAULT_DATE_RANGE.from} ~ {DEFAULT_DATE_RANGE.to}
      </div>
    </header>
  );
}
