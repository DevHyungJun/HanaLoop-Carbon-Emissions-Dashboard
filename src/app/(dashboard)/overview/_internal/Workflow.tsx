import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/common";
import { OVERVIEW_WORKFLOW_STEPS } from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import { ArrowRight, Calculator, Database, FlaskConical } from "lucide-react";
import Link from "next/link";

const WORKFLOW_ICONS = [Database, FlaskConical, Calculator] as const;

const Workflow = () => {
  const { t } = useTranslation();

  return (
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
  );
};

export default Workflow;
