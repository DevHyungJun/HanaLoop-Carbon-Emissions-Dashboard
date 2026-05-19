import { useTranslation } from "@/app/hooks";

const Hero = () => {
  const { t } = useTranslation();

  return (
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
  );
};

export default Hero;
