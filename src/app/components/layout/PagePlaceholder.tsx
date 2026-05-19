type PagePlaceholderProps = {
  badge: string;
  title: string;
  description: string;
};

const PagePlaceholder = ({
  badge,
  title,
  description,
}: PagePlaceholderProps) => {
  return (
    <section className="rounded-xl border border-dashed border-border bg-card p-8">
      <p className="text-sm font-medium text-emerald-600">{badge}</p>
      <h2 className="mt-2 text-2xl font-semibold text-foreground">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </section>
  );
};

export default PagePlaceholder;
