type EmissionFactorMobileCardProps = {
  sourceLabel: string;
  scopeLabel: string;
  regionLabel: string;
  unit: string;
  factorDisplay: string;
  standard: string;
  formula: string;
  fieldLabels: {
    region: string;
    unit: string;
    standard: string;
    formula: string;
  };
};

const EmissionFactorMobileCard = ({
  sourceLabel,
  scopeLabel,
  regionLabel,
  unit,
  factorDisplay,
  standard,
  formula,
  fieldLabels,
}: EmissionFactorMobileCardProps) => {
  return (
    <article className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-foreground">{sourceLabel}</h3>
        <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          {scopeLabel}
        </span>
      </div>

      <p className="mt-2 font-mono text-base tabular-nums text-foreground">
        {factorDisplay}
      </p>

      <dl className="mt-3 grid gap-2 border-t border-border/60 pt-3 text-sm">
        <div className="flex items-start justify-between gap-4">
          <dt className="text-muted-foreground">{fieldLabels.region}</dt>
          <dd className="text-right text-foreground">{regionLabel}</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-muted-foreground">{fieldLabels.unit}</dt>
          <dd className="text-right font-mono text-foreground">{unit}</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-muted-foreground">{fieldLabels.standard}</dt>
          <dd className="text-right text-foreground">{standard}</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-muted-foreground">{fieldLabels.formula}</dt>
          <dd className="text-right font-mono text-xs text-muted-foreground">
            {formula}
          </dd>
        </div>
      </dl>
    </article>
  );
};

export default EmissionFactorMobileCard;
