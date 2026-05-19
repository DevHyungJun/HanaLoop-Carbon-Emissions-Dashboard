import { cn } from "@/app/utils";

export const SIDEBAR_ICON_BUTTON_CLASS = "size-10 shrink-0 p-0";

export const getSidebarIconButtonStateClass = (isActive: boolean) =>
  cn(
    "rounded-lg border transition-colors",
    isActive
      ? "border-emerald-500/40 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100"
      : "border-transparent text-foreground hover:bg-muted",
  );
