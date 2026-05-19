import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Building2,
  Calculator,
  Database,
  FlaskConical,
  Settings,
} from "lucide-react";

import type { MessageKey } from "./i18n";

export type NavSectionId = "overview" | "analysis" | "data" | "settings";

export type NavItem = {
  href: string;
  labelKey: MessageKey;
  descriptionKey: MessageKey;
  icon: LucideIcon;
  section: NavSectionId;
};

export const NAV_SECTIONS: { id: NavSectionId; labelKey: MessageKey }[] = [
  { id: "overview", labelKey: "nav.sections.overview" },
  { id: "analysis", labelKey: "nav.sections.analysis" },
  { id: "data", labelKey: "nav.sections.data" },
  { id: "settings", labelKey: "nav.sections.settings" },
];

export const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    labelKey: "nav.platformOverview",
    descriptionKey: "nav.platformOverviewDesc",
    icon: BookOpen,
    section: "overview",
  },
  {
    href: "/pcf",
    labelKey: "nav.pcf",
    descriptionKey: "nav.pcfDesc",
    icon: Calculator,
    section: "analysis",
  },
  {
    href: "/companies",
    labelKey: "nav.companies",
    descriptionKey: "nav.companiesDesc",
    icon: Building2,
    section: "analysis",
  },
  {
    href: "/activity-data",
    labelKey: "nav.activityData",
    descriptionKey: "nav.activityDataDesc",
    icon: Database,
    section: "data",
  },
  {
    href: "/emission-factors",
    labelKey: "nav.emissionFactors",
    descriptionKey: "nav.emissionFactorsDesc",
    icon: FlaskConical,
    section: "data",
  },
  {
    href: "/settings",
    labelKey: "nav.settings",
    descriptionKey: "nav.settingsDesc",
    icon: Settings,
    section: "settings",
  },
];

export const getNavItemByPathname = (pathname: string) => {
  return (
    NAV_ITEMS.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
    ) ?? NAV_ITEMS[0]
  );
};
