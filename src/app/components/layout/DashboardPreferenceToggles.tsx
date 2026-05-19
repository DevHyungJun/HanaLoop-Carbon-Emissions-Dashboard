"use client";

import { Languages, Moon, Sun } from "lucide-react";

import { Button } from "@/app/components/common";
import { useTranslation } from "@/app/hooks";
import { useSettingsStore } from "@/app/store";
import { cn } from "@/app/utils";

import {
  getSidebarIconButtonStateClass,
  SIDEBAR_ICON_BUTTON_CLASS,
} from "./sidebarStyles";

type DashboardPreferenceTogglesProps = {
  isSidebarCollapsed: boolean;
};

const DashboardPreferenceToggles = ({
  isSidebarCollapsed,
}: DashboardPreferenceTogglesProps) => {
  const { locale, t } = useTranslation();
  const theme = useSettingsStore((state) => state.theme);
  const toggleTheme = useSettingsStore((state) => state.toggleTheme);
  const toggleLocale = useSettingsStore((state) => state.toggleLocale);

  const themeLabel =
    theme === "dark" ? t("settings.themeLight") : t("settings.themeDark");
  const localeLabel =
    locale === "ko" ? t("settings.localeEn") : t("settings.localeKo");

  return (
    <div
      className={cn(
        "border-t border-sidebar-border",
        isSidebarCollapsed ? "p-2" : "p-4",
      )}
    >
      <div
        className={cn(
          "flex gap-2",
          isSidebarCollapsed ? "flex-col items-center" : "items-center",
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={themeLabel}
          title={themeLabel}
          onClick={toggleTheme}
          className={cn(
            SIDEBAR_ICON_BUTTON_CLASS,
            getSidebarIconButtonStateClass(false),
          )}
        >
          {theme === "dark" ? (
            <Moon className="size-4" aria-hidden />
          ) : (
            <Sun className="size-4" aria-hidden />
          )}
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={localeLabel}
          title={localeLabel}
          onClick={toggleLocale}
          className={cn(
            SIDEBAR_ICON_BUTTON_CLASS,
            getSidebarIconButtonStateClass(false),
            "relative",
          )}
        >
          <Languages className="size-4" aria-hidden />
          <span className="absolute -top-1 -right-1 rounded-full border border-border bg-background px-1 text-[10px] font-semibold leading-none text-foreground">
            {locale === "ko" ? "KO" : "EN"}
          </span>
        </Button>

        {!isSidebarCollapsed ? (
          <div className="min-w-0 flex-1 text-xs text-muted-foreground">
            <p className="truncate">{themeLabel}</p>
            <p className="truncate">{localeLabel}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DashboardPreferenceToggles;
