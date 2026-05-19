"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, type LucideIcon } from "lucide-react";

import { Button } from "@/app/components/common";
import { DRAWER_WIDTH_CLASS, NAV_ITEMS, NAV_SECTIONS } from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import { useDashboardStore } from "@/app/store";
import { cn } from "@/app/utils";

type NavLinkProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onNavigate: () => void;
};

function NavLink({
  href,
  label,
  icon: Icon,
  isActive,
  onNavigate,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors",
        isActive
          ? "border-emerald-500/40 bg-emerald-50 font-medium text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100"
          : "border-transparent text-foreground hover:bg-muted",
      )}
    >
      <Icon className="size-4 shrink-0" aria-hidden />
      {label}
    </Link>
  );
}

export function NavigationDrawer() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const isDrawerOpen = useDashboardStore((state) => state.isDrawerOpen);
  const setDrawerOpen = useDashboardStore((state) => state.setDrawerOpen);

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const isNavItemActive = (href: string) => {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <>
      <div
        aria-hidden={!isDrawerOpen}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden",
          isDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={handleCloseDrawer}
      />

      <aside
        aria-label="대시보드 탐색"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:static lg:translate-x-0",
          DRAWER_WIDTH_CLASS,
          isDrawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4 lg:hidden">
          <span className="text-sm font-semibold">{t("common.explore")}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={t("common.closeMenu")}
            onClick={handleCloseDrawer}
          >
            <X className="size-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto p-4">
          {NAV_SECTIONS.map((section) => {
            const sectionItems = NAV_ITEMS.filter(
              (item) => item.section === section.id,
            );

            return (
              <section key={section.id} className="space-y-2">
                <h2 className="px-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {t(section.labelKey)}
                </h2>
                <div className="grid gap-1">
                  {sectionItems.map((item) => (
                    <NavLink
                      key={item.href}
                      href={item.href}
                      label={t(item.labelKey)}
                      icon={item.icon}
                      isActive={isNavItemActive(item.href)}
                      onNavigate={handleCloseDrawer}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
