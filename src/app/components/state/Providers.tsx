"use client";

import type { ReactNode } from "react";

import { SettingsProvider } from "./SettingsProvider";
import { ToastProvider } from "./ToastProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <ToastProvider>
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </ToastProvider>
    </SettingsProvider>
  );
}
