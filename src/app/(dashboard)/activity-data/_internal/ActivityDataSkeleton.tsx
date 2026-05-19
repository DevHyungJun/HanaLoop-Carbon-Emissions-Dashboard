"use client";

import { Card, CardContent, CardHeader, Skeleton } from "@/app/components/common";
import { useTranslation } from "@/app/hooks";

const ActivityDataSkeleton = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">{t("activityData.loading")}</span>

      <section className="rounded-xl border border-border bg-card p-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="space-y-2 pb-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-5 w-20" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityDataSkeleton;
