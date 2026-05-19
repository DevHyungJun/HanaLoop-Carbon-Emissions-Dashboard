"use client";

import { useEffect, type ReactNode } from "react";

import { useSettingsStore } from "@/app/store";

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const theme = useSettingsStore((state) => state.theme);
  const locale = useSettingsStore((state) => state.locale);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.lang = locale;
  }, [theme, locale]);

  return children;
};

export default SettingsProvider;
