"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, type LucideIcon } from "lucide-react";

import { Button } from "@/app/components/common";
import { DRAWER_WIDTH_CLASS, NAV_ITEMS, NAV_SECTIONS } from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import { useDashboardStore } from "@/app/store";
import { cn } from "@/app/utils";

import {
  getSidebarIconButtonStateClass,
  SIDEBAR_ICON_BUTTON_CLASS,
} from "./sidebarStyles";
import DashboardBrand from "./DashboardBrand";
import DashboardPreferenceToggles from "./DashboardPreferenceToggles";

type NavLinkProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  isSidebarCollapsed: boolean;
  onNavigate: () => void;
};

const NavLink = ({
  href,
  label,
  icon: Icon,
  isActive,
  isSidebarCollapsed,
  onNavigate,
}: NavLinkProps) => {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      title={isSidebarCollapsed ? label : undefined}
      aria-label={label}
      className={cn(
        "flex items-center rounded-lg border text-sm transition-colors",
        isSidebarCollapsed
          ? cn(
              "justify-center gap-0",
              SIDEBAR_ICON_BUTTON_CLASS,
              getSidebarIconButtonStateClass(isActive),
            )
          : cn(
              "w-full justify-start gap-2 px-3 py-2 text-left",
              getSidebarIconButtonStateClass(isActive),
            ),
      )}
    >
      <Icon className="size-4 shrink-0" aria-hidden />
      <span className={cn("truncate", isSidebarCollapsed && "lg:hidden")}>
        {label}
      </span>
    </Link>
  );
};

const NavigationDrawer = () => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const isDrawerOpen = useDashboardStore((state) => state.isDrawerOpen);
  const isSidebarCollapsed = useDashboardStore(
    (state) => state.isSidebarCollapsed,
  );
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
          "fixed inset-y-0 left-0 z-50 flex shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width,transform] duration-300",
          DRAWER_WIDTH_CLASS,
          isSidebarCollapsed ? "lg:w-16" : "lg:w-72",
          "lg:static lg:translate-x-0",
          isDrawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4 lg:hidden">
          <DashboardBrand />
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

        <nav
          className={cn(
            "flex-1 overflow-x-hidden overflow-y-auto p-4 text-left",
            isSidebarCollapsed && "lg:p-2",
          )}
        >
          <div
            className={cn("hidden space-y-1", isSidebarCollapsed && "lg:block")}
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={t(item.labelKey)}
                icon={item.icon}
                isActive={isNavItemActive(item.href)}
                isSidebarCollapsed
                onNavigate={handleCloseDrawer}
              />
            ))}
          </div>

          <div className={cn("space-y-6", isSidebarCollapsed && "lg:hidden")}>
            {NAV_SECTIONS.map((section) => {
              const sectionItems = NAV_ITEMS.filter(
                (item) => item.section === section.id,
              );

              return (
                <section key={section.id} className="space-y-2">
                  <h2 className="px-1 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase">
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
                        isSidebarCollapsed={false}
                        onNavigate={handleCloseDrawer}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </nav>

        <DashboardPreferenceToggles isSidebarCollapsed={isSidebarCollapsed} />
      </aside>
    </>
  );
};

export default NavigationDrawer;
