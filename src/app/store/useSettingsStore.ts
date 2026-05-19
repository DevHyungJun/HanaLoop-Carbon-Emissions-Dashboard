import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Locale, Theme } from "@/app/constants/i18n";
import { SETTINGS_STORAGE_KEY } from "@/app/utils/theme";

type SettingsState = {
  theme: Theme;
  locale: Locale;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      theme: "light",
      locale: "ko",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set({ theme: get().theme === "light" ? "dark" : "light" }),
      setLocale: (locale) => set({ locale }),
      toggleLocale: () =>
        set({ locale: get().locale === "ko" ? "en" : "ko" }),
    }),
    {
      name: SETTINGS_STORAGE_KEY,
      skipHydration: true,
    },
  ),
);
