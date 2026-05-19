import type { Theme } from "@/app/constants/i18n";

export const getSystemTheme = (): Theme => {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const applyThemeClass = (theme: Theme) => {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.classList.toggle("dark", theme === "dark");
};

export const SETTINGS_STORAGE_KEY = "hana-loop-settings";
