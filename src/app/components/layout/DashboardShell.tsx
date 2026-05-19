"use client";

import type { ReactNode } from "react";

import DashboardHeader from "./DashboardHeader";
import DashboardMain from "./DashboardMain";
import NavigationDrawer from "./NavigationDrawer";

type DashboardShellProps = {
  children: ReactNode;
};

const DashboardShell = ({ children }: DashboardShellProps) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <DashboardHeader />
      <div className="flex min-h-0 flex-1">
        <NavigationDrawer />
        <DashboardMain>{children}</DashboardMain>
      </div>
    </div>
  );
};

export default DashboardShell;
