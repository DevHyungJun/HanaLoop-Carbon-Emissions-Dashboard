import { OVERVIEW_SCOPES } from "@/app/constants";
import { useTranslation } from "@/app/hooks";
import { cn } from "@/app/utils";

const Scopes = () => {
  const { t } = useTranslation();

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">
        {t("overview.scope.title")}
      </h3>

      <div className="grid gap-4 md:grid-cols-3">
        {OVERVIEW_SCOPES.map((scope) => (
          <div
            key={scope.id}
            className={cn("rounded-xl border p-5", scope.accentClassName)}
          >
            <h4 className="font-semibold">{t(scope.titleKey)}</h4>
            <p className="mt-2 text-sm leading-6 opacity-90">
              {t(scope.descriptionKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Scopes;
