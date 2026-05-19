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
  const currentThemeLabel =
    theme === "dark" ? t("settings.themeDark") : t("settings.themeLight");
  const currentLocaleLabel =
    locale === "ko" ? t("settings.localeKo") : t("settings.localeEn");

  const themeButton = (
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
  );

  const localeButton = (
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
  );

  return (
    <div
      className={cn(
        "border-t border-sidebar-border",
        isSidebarCollapsed ? "p-2" : "p-4",
      )}
    >
      {isSidebarCollapsed ? (
        <div className="flex flex-col items-center gap-3">
          {themeButton}
          {localeButton}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            {themeButton}
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                {t("settings.darkMode")}
              </p>
              <p className="truncate text-sm text-foreground">
                {currentThemeLabel}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {localeButton}
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                {t("settings.language")}
              </p>
              <p className="truncate text-sm text-foreground">
                {currentLocaleLabel}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPreferenceToggles;
