import type { MessageKey } from "./i18n";

export type OverviewScopeItem = {
  id: "scope1" | "scope2" | "scope3";
  titleKey: MessageKey;
  descriptionKey: MessageKey;
  accentClassName: string;
};

export type OverviewWorkflowStep = {
  step: number;
  titleKey: MessageKey;
  descriptionKey: MessageKey;
  href: string;
  labelKey: MessageKey;
};

export type OverviewQuickLink = {
  href: string;
  labelKey: MessageKey;
  descriptionKey: MessageKey;
};

export const OVERVIEW_SCOPES: OverviewScopeItem[] = [
  {
    id: "scope1",
    titleKey: "overview.scope1.title",
    descriptionKey: "overview.scope1.description",
    accentClassName:
      "border-orange-300/60 bg-orange-50 text-orange-950 dark:border-orange-500/30 dark:bg-orange-950/40 dark:text-orange-100",
  },
  {
    id: "scope2",
    titleKey: "overview.scope2.title",
    descriptionKey: "overview.scope2.description",
    accentClassName:
      "border-sky-300/60 bg-sky-50 text-sky-950 dark:border-sky-500/30 dark:bg-sky-950/40 dark:text-sky-100",
  },
  {
    id: "scope3",
    titleKey: "overview.scope3.title",
    descriptionKey: "overview.scope3.description",
    accentClassName:
      "border-violet-300/60 bg-violet-50 text-violet-950 dark:border-violet-500/30 dark:bg-violet-950/40 dark:text-violet-100",
  },
];

export const OVERVIEW_WORKFLOW_STEPS: OverviewWorkflowStep[] = [
  {
    step: 1,
    titleKey: "overview.workflow.step1.title",
    descriptionKey: "overview.workflow.step1.description",
    href: "/activity-data",
    labelKey: "nav.activityData",
  },
  {
    step: 2,
    titleKey: "overview.workflow.step2.title",
    descriptionKey: "overview.workflow.step2.description",
    href: "/emission-factors",
    labelKey: "nav.emissionFactors",
  },
  {
    step: 3,
    titleKey: "overview.workflow.step3.title",
    descriptionKey: "overview.workflow.step3.description",
    href: "/pcf",
    labelKey: "nav.pcf",
  },
];

export const OVERVIEW_QUICK_LINKS: OverviewQuickLink[] = [
  {
    href: "/pcf",
    labelKey: "nav.pcf",
    descriptionKey: "nav.pcfDesc",
  },
  {
    href: "/companies",
    labelKey: "nav.companies",
    descriptionKey: "nav.companiesDesc",
  },
  {
    href: "/activity-data",
    labelKey: "nav.activityData",
    descriptionKey: "nav.activityDataDesc",
  },
];
