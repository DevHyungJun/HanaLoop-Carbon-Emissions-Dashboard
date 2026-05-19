"use client";

import { Moon, Sun } from "lucide-react";

import { useTranslation } from "@/app/hooks";
import { useSettingsStore } from "@/app/store";
import { cn } from "@/app/utils";

type OptionButtonProps = {
  isActive: boolean;
  label: string;
  onClick: () => void;
};

function OptionButton({ isActive, label, onClick }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 rounded-lg border px-3 py-2.5 text-sm transition-colors",
        isActive
          ? "border-emerald-500/40 bg-emerald-50 font-medium text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100"
          : "border-border bg-muted/40 text-foreground hover:bg-muted",
      )}
    >
      {label}
    </button>
  );
}

export function SettingsPanel() {
  const { t } = useTranslation();
  const theme = useSettingsStore((state) => state.theme);
  const locale = useSettingsStore((state) => state.locale);
  const setTheme = useSettingsStore((state) => state.setTheme);
  const setLocale = useSettingsStore((state) => state.setLocale);

  return (
    <section className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="space-y-1 text-center">
        <h2 className="text-lg font-semibold text-foreground">
          {t("settings.title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("nav.settingsDesc")}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {t("settings.darkMode")}
          </span>
          {theme === "dark" ? (
            <Moon className="size-4 text-muted-foreground" aria-hidden />
          ) : (
            <Sun className="size-4 text-muted-foreground" aria-hidden />
          )}
        </div>
        <div className="flex gap-2">
          <OptionButton
            isActive={theme === "light"}
            label={t("settings.themeLight")}
            onClick={() => setTheme("light")}
          />
          <OptionButton
            isActive={theme === "dark"}
            label={t("settings.themeDark")}
            onClick={() => setTheme("dark")}
          />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">
          {t("settings.language")}
        </p>
        <div className="flex gap-2">
          <OptionButton
            isActive={locale === "ko"}
            label={t("settings.localeKo")}
            onClick={() => setLocale("ko")}
          />
          <OptionButton
            isActive={locale === "en"}
            label={t("settings.localeEn")}
            onClick={() => setLocale("en")}
          />
        </div>
      </div>
    </section>
  );
}
