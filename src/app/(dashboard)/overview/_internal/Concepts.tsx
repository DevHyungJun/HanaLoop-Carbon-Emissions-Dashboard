import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/common";
import { useTranslation } from "@/app/hooks";

const CARD_ITEMS = [
  {
    titleKey: "overview.pcf.title",
    descriptionKey: "overview.pcf.description",
  },
  {
    titleKey: "overview.unit.title",
    descriptionKey: "overview.unit.description",
  },
] as const;

const Concepts = () => {
  const { t } = useTranslation();

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      {CARD_ITEMS.map((item) => (
        <Card key={item.titleKey}>
          <CardHeader>
            <CardTitle>{t(item.titleKey)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-7 text-muted-foreground">
              {t(item.descriptionKey)}
            </p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default Concepts;
