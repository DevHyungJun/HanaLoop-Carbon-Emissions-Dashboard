import { OVERVIEW_QUICK_LINKS } from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const QuickLinks = () => {
  const { t } = useTranslation();

  return (
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
  );
};

export default QuickLinks;
