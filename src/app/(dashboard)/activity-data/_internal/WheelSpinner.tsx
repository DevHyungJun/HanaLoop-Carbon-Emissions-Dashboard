"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";

import { cn } from "@/app/utils";

const ITEM_HEIGHT_PX = 44;
const WHEEL_VISIBLE_HEIGHT_PX = ITEM_HEIGHT_PX * 3;
const DRAG_SNAP_THRESHOLD_PX = ITEM_HEIGHT_PX / 3;

type WheelSpinnerItem<T extends string> = {
  value: T;
  label: string;
};

type WheelSpinnerProps<T extends string> = {
  label: string;
  items: WheelSpinnerItem<T>[];
  value: T;
  onChange: (value: T) => void;
};

const WheelSpinner = <T extends string>({
  label,
  items,
  value,
  onChange,
}: WheelSpinnerProps<T>) => {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const indexRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const lastPointerYRef = useRef(0);
  const isDraggingRef = useRef(false);

  const selectedIndex = items.findIndex((item) => item.value === value);
  const safeIndex = selectedIndex >= 0 ? selectedIndex : 0;
  const hasPrevious = safeIndex > 0;
  const hasNext = safeIndex < items.length - 1;

  useEffect(() => {
    indexRef.current = safeIndex;
  }, [safeIndex]);

  const applyDragDelta = useCallback(
    (delta: number) => {
      let offset = dragOffsetRef.current + delta;
      let index = indexRef.current;

      while (offset >= ITEM_HEIGHT_PX && index < items.length - 1) {
        offset -= ITEM_HEIGHT_PX;
        index += 1;
        indexRef.current = index;
        onChange(items[index].value);
      }

      while (offset <= -ITEM_HEIGHT_PX && index > 0) {
        offset += ITEM_HEIGHT_PX;
        index -= 1;
        indexRef.current = index;
        onChange(items[index].value);
      }

      if (index === 0 && offset > 0) {
        offset *= 0.35;
      }

      if (index === items.length - 1 && offset < 0) {
        offset *= 0.35;
      }

      dragOffsetRef.current = offset;
      setDragOffset(offset);
    },
    [items, onChange],
  );

  const finishDrag = useCallback(() => {
    const offset = dragOffsetRef.current;
    const index = indexRef.current;

    if (offset >= DRAG_SNAP_THRESHOLD_PX && index < items.length - 1) {
      const nextIndex = index + 1;
      indexRef.current = nextIndex;
      onChange(items[nextIndex].value);
    } else if (offset <= -DRAG_SNAP_THRESHOLD_PX && index > 0) {
      const previousIndex = index - 1;
      indexRef.current = previousIndex;
      onChange(items[previousIndex].value);
    }

    dragOffsetRef.current = 0;
    setDragOffset(0);
    isDraggingRef.current = false;
    setIsDragging(false);
  }, [items, onChange]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    isDraggingRef.current = true;
    setIsDragging(true);
    lastPointerYRef.current = event.clientY;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) {
      return;
    }

    const delta = event.clientY - lastPointerYRef.current;
    lastPointerYRef.current = event.clientY;
    applyDragDelta(delta);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    finishDrag();
  };

  const goToPrevious = () => {
    if (!hasPrevious) {
      return;
    }

    onChange(items[safeIndex - 1].value);
  };

  const goToNext = () => {
    if (!hasNext) {
      return;
    }

    onChange(items[safeIndex + 1].value);
  };

  const getItemStyle = (index: number) => {
    const distance = Math.abs(index - safeIndex - dragOffset / ITEM_HEIGHT_PX);

    if (distance < 0.35) {
      return "text-base font-semibold text-foreground";
    }

    if (distance < 1.35) {
      return "text-sm text-muted-foreground/80";
    }

    return "text-sm text-muted-foreground/35";
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <div className="flex h-[188px] w-full max-w-[140px] items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">
          —
        </div>
      </div>
    );
  }

  const wheelTranslateY =
    ITEM_HEIGHT_PX - safeIndex * ITEM_HEIGHT_PX + dragOffset;

  return (
    <div className="flex flex-1 flex-col items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>

      <div className="relative w-full max-w-[140px] select-none">
        <button
          type="button"
          aria-label={`${label} previous`}
          disabled={!hasPrevious}
          onClick={goToPrevious}
          className="flex h-11 w-full items-center justify-center rounded-t-lg border border-border bg-muted/30 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronUp className="size-5" aria-hidden />
        </button>

        <div
          className="relative overflow-hidden border-x border-border bg-background touch-none"
          style={{ height: WHEEL_VISIBLE_HEIGHT_PX }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
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

          <div
            className={cn(isDragging ? "transition-none" : "transition-transform duration-200 ease-out")}
            style={{ transform: `translateY(${wheelTranslateY}px)` }}
          >
            {items.map((item, index) => (
              <div
                key={item.value}
                className={cn(
                  "flex items-center justify-center px-2",
                  getItemStyle(index),
                  index === safeIndex && "aria-selected",
                )}
                style={{ height: ITEM_HEIGHT_PX }}
                aria-hidden={index !== safeIndex}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label={`${label} next`}
          disabled={!hasNext}
          onClick={goToNext}
          className="flex h-11 w-full items-center justify-center rounded-b-lg border border-border bg-muted/30 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronDown className="size-5" aria-hidden />
        </button>

        <p className="sr-only" aria-live="polite">
          {items[safeIndex]?.label}
        </p>
      </div>
    </div>
  );
};

export default WheelSpinner;
