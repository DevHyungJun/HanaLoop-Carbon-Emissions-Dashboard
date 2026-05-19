"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/app/utils";

const ITEM_HEIGHT_PX = 44;
const WHEEL_VISIBLE_HEIGHT_PX = ITEM_HEIGHT_PX * 3;

type WheelSpinnerItem<T extends string> = {
  value: T;
  label: string;
};

type WheelSpinnerProps<T extends string> = {
  label: string;
  items: WheelSpinnerItem<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

const WheelSpinner = <T extends string>({
  label,
  items,
  value,
  onChange,
  className,
}: WheelSpinnerProps<T>) => {
  const selectedIndex = items.findIndex((item) => item.value === value);
  const activeIndex = selectedIndex >= 0 ? selectedIndex : 0;
  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex < items.length - 1;

  const goToPrevious = () => {
    if (!hasPrevious) {
      return;
    }

    onChange(items[activeIndex - 1].value);
  };

  const goToNext = () => {
    if (!hasNext) {
      return;
    }

    onChange(items[activeIndex + 1].value);
  };

  const getItemStyle = (index: number) => {
    const distance = Math.abs(index - activeIndex);

    if (distance === 0) {
      return "text-base font-semibold text-foreground";
    }

    if (distance === 1) {
      return "text-sm text-muted-foreground/80";
    }

    return "text-sm text-muted-foreground/35";
  };

  const getSlotTop = (index: number) =>
    ITEM_HEIGHT_PX + (index - activeIndex) * ITEM_HEIGHT_PX;

  const visibleIndices = [activeIndex - 1, activeIndex, activeIndex + 1].filter(
    (index) => index >= 0 && index < items.length,
  );

  if (items.length === 0) {
    return (
      <div
        className={cn(
          "flex w-40 shrink-0 flex-col items-center gap-2",
          className,
        )}
      >
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <div className="flex h-[188px] w-full items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">
          —
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-40 shrink-0 flex-col items-center gap-2",
        className,
      )}
    >
      <span className="text-xs font-medium text-muted-foreground">{label}</span>

      <div className="relative w-full select-none overflow-hidden rounded-lg border border-border bg-background">
        <button
          type="button"
          aria-label={`${label} previous`}
          disabled={!hasPrevious}
          onClick={goToPrevious}
          className="flex h-11 w-full items-center justify-center border-b border-border bg-muted/30 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronUp className="size-5" aria-hidden />
        </button>

        <div
          className="relative overflow-hidden bg-background"
          style={{ height: WHEEL_VISIBLE_HEIGHT_PX }}
        >
          <div className="pointer-events-none absolute inset-x-2 top-1/2 z-10 h-11 -translate-y-1/2 rounded-lg border border-primary/30 bg-primary/5" />

          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-11 bg-gradient-to-b from-background to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-11 bg-gradient-to-t from-background to-transparent"
            aria-hidden
          />

          {visibleIndices.map((index) => (
            <div
              key={items[index].value}
              className={cn(
                "absolute inset-x-0 flex items-center justify-center px-2 transition-[top] duration-200 ease-out",
                getItemStyle(index),
                index === activeIndex && "aria-selected",
              )}
              style={{
                top: getSlotTop(index),
                height: ITEM_HEIGHT_PX,
              }}
              aria-hidden={index !== activeIndex}
            >
              {items[index].label}
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label={`${label} next`}
          disabled={!hasNext}
          onClick={goToNext}
          className="flex h-11 w-full items-center justify-center border-t border-border bg-muted/30 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronDown className="size-5" aria-hidden />
        </button>

        <p className="sr-only" aria-live="polite">
          {items[activeIndex]?.label}
        </p>
      </div>
    </div>
  );
};

export { WheelSpinner };
export type { WheelSpinnerProps };
