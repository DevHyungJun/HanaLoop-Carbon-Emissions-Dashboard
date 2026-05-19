import { AppImage } from "@/app/components/common";

import { useTranslation } from "@/app/hooks";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="overflow-hidden rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-50/80 to-background p-6 dark:from-emerald-950/30 dark:to-background sm:p-8">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <p className="text-sm font-medium tracking-wide text-emerald-600 uppercase">
            {t("overview.hero.badge")}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("overview.hero.title")}
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            {t("overview.hero.subtitle")}
          </p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[280px] shrink-0 overflow-hidden rounded-xl shadow-sm ring-1 ring-emerald-500/10 lg:mx-0 lg:max-w-none">
          <AppImage
            src="/overview_image.png"
            alt={t("overview.hero.imageAlt")}
            fill
            priority
            sizes="(max-width: 1024px) 280px, 320px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
