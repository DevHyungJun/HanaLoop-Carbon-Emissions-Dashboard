"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/app/components/common";
import {
  APP_DESCRIPTION,
  APP_NAME,
  DEFAULT_DATE_RANGE,
  getNavItemByPathname,
} from "@/app/constants";
import { useDashboardStore } from "@/app/store";
import { cn } from "@/app/utils";

type DashboardHeaderProps = {
  className?: string;
};

export function DashboardHeader({ className }: DashboardHeaderProps) {
  const pathname = usePathname();
  const currentPage = getNavItemByPathname(pathname);
  const toggleDrawer = useDashboardStore((state) => state.toggleDrawer);

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
        aria-label="메뉴 열기"
        className="lg:hidden"
        onClick={toggleDrawer}
      >
        <Menu className="size-5" />
      </Button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-wide text-emerald-600 uppercase">
            {APP_NAME}
          </span>
          <span className="hidden text-border sm:inline">|</span>
          <h1 className="truncate text-sm font-semibold text-foreground sm:text-base">
            {currentPage.label}
          </h1>
        </div>
        <p className="truncate text-xs text-muted-foreground">
          {currentPage.description || APP_DESCRIPTION}
        </p>
      </div>

      <div className="hidden shrink-0 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground sm:block">
        {DEFAULT_DATE_RANGE.from} ~ {DEFAULT_DATE_RANGE.to}
      </div>
    </header>
  );
}
