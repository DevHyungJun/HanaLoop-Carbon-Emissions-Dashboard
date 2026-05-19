"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { buttonVariants, spinnerSizeClassName } from "@/app/constants";
import { cn } from "@/app/utils";

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
  };

const Button = ({
  className,
  variant = "default",
  size = "default",
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const resolvedSize = size ?? "default";

  return (
    <ButtonPrimitive
      data-slot="button"
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={cn(
        "relative",
        buttonVariants({ variant, size: resolvedSize }),
        isLoading &&
          "pointer-events-none border-border bg-muted text-muted-foreground opacity-100",
        disabled && !isLoading && "opacity-50",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center gap-inherit",
          isLoading && "invisible",
        )}
      >
        {children}
      </span>
      {isLoading ? (
        <span className="absolute inset-0 inline-flex items-center justify-center">
          <Loader2
            className={cn("animate-spin", spinnerSizeClassName[resolvedSize])}
            aria-hidden
          />
        </span>
      ) : null}
    </ButtonPrimitive>
  );
};

export { Button };
export type { ButtonProps };
