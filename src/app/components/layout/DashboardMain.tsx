import type { ReactNode } from "react";

import { cn } from "@/app/utils";

type DashboardMainProps = {
  children: ReactNode;
  className?: string;
};

export function DashboardMain({ children, className }: DashboardMainProps) {
  return (
    <main className={cn("flex-1 overflow-y-auto bg-muted/20", className)}>
      <div className="mx-auto w-full max-w-7xl p-4 lg:p-6">{children}</div>
    </main>
  );
}
