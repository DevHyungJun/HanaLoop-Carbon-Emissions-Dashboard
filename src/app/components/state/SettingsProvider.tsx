"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { useSettingsStore } from "@/app/store";
import { applyThemeClass, getSystemTheme, SETTINGS_STORAGE_KEY } from "@/app/utils/theme";

const SettingsReadyContext = createContext(false);

export const useSettingsReady = () => useContext(SettingsReadyContext);

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const theme = useSettingsStore((state) => state.theme);
  const locale = useSettingsStore((state) => state.locale);
  const setTheme = useSettingsStore((state) => state.setTheme);
  const [isSettingsReady, setIsSettingsReady] = useState(false);

  useEffect(() => {
    const hadStoredSettings = Boolean(
      localStorage.getItem(SETTINGS_STORAGE_KEY),
    );

    const unsubscribe = useSettingsStore.persist.onFinishHydration(() => {
      if (!hadStoredSettings) {
        setTheme(getSystemTheme());
      }

      setIsSettingsReady(true);
    });

    void useSettingsStore.persist.rehydrate();

    return unsubscribe;
  }, [setTheme]);

  useEffect(() => {
    if (!isSettingsReady) {
      return;
    }

    applyThemeClass(theme);
    document.documentElement.lang = locale;
  }, [theme, locale, isSettingsReady]);

  return (
    <SettingsReadyContext.Provider value={isSettingsReady}>
      {children}
    </SettingsReadyContext.Provider>
  );
};

export default SettingsProvider;
