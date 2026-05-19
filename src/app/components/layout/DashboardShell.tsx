"use client";

import type { ReactNode } from "react";

import { DashboardHeader } from "./DashboardHeader";
import { DashboardMain } from "./DashboardMain";
import { NavigationDrawer } from "./NavigationDrawer";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <DashboardHeader />
      <div className="flex min-h-0 flex-1">
        <NavigationDrawer />
        <DashboardMain>{children}</DashboardMain>
      </div>
    </div>
  );
}
