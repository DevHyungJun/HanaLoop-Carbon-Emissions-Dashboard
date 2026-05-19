import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Locale, Theme } from "@/app/constants/i18n";

type SettingsState = {
  theme: Theme;
  locale: Locale;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLocale: (locale: Locale) => void;
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
    }),
    {
      name: "hana-loop-settings",
    },
  ),
);
