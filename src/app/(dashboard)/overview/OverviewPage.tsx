"use client";

import Link from "next/link";
import { ArrowRight, Calculator, Database, FlaskConical } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/common";
import {
  OVERVIEW_QUICK_LINKS,
  OVERVIEW_SCOPES,
  OVERVIEW_WORKFLOW_STEPS,
} from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import { cn } from "@/app/utils";

const WORKFLOW_ICONS = [Database, FlaskConical, Calculator] as const;

export function OverviewPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-50/80 to-background p-6 dark:from-emerald-950/30 dark:to-background sm:p-8">
        <p className="text-sm font-medium tracking-wide text-emerald-600 uppercase">
          {t("overview.hero.badge")}
        </p>
        <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t("overview.hero.title")}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
          {t("overview.hero.subtitle")}
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("overview.pcf.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-7 text-muted-foreground">
              {t("overview.pcf.description")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("overview.unit.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-7 text-muted-foreground">
              {t("overview.unit.description")}
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          {t("overview.scope.title")}
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {OVERVIEW_SCOPES.map((scope) => (
            <div
              key={scope.id}
              className={cn(
                "rounded-xl border p-5",
                scope.accentClassName,
              )}
            >
              <h4 className="font-semibold">{t(scope.titleKey)}</h4>
              <p className="mt-2 text-sm leading-6 opacity-90">
                {t(scope.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          {t("overview.workflow.title")}
        </h3>
        <div className="grid gap-4 lg:grid-cols-3">
          {OVERVIEW_WORKFLOW_STEPS.map((step, index) => {
            const Icon = WORKFLOW_ICONS[index];

            return (
              <Card key={step.step} className="relative">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <CardTitle>{t(step.titleKey)}</CardTitle>
                  <CardDescription>{t(step.descriptionKey)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={step.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    {t(step.labelKey)}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          {t("overview.quickLinks.title")}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OVERVIEW_QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-emerald-500/30 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20"
            >
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-medium text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                  {t(link.labelKey)}
                </h4>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-600" />
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {t(link.descriptionKey)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
