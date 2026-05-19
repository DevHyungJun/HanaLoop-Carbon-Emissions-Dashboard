"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CircleAlert,
  X,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/app/utils";

const DEFAULT_TOAST_DURATION_MS = 4000;

export type ToastType = "default" | "error" | "warning";

type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
};

type ShowToastOptions = {
  type?: ToastType;
  message: string;
  duration?: number;
};

type ToastContextValue = {
  showToast: (options: ShowToastOptions) => void;
  toast: {
    default: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
  };
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toastStyles: Record<
  ToastType,
  { container: string; icon: LucideIcon; iconClassName: string }
> = {
  default: {
    container:
      "border-emerald-300/80 bg-emerald-50 text-emerald-950 shadow-emerald-100/50 dark:border-emerald-500/40 dark:bg-emerald-950/60 dark:text-emerald-50 dark:shadow-emerald-950/30",
    icon: CheckCircle2,
    iconClassName: "text-emerald-600 dark:text-emerald-400",
  },
  error: {
    container:
      "border-red-300/80 bg-red-50 text-red-950 shadow-red-100/50 dark:border-red-500/40 dark:bg-red-950/60 dark:text-red-50 dark:shadow-red-950/30",
    icon: CircleAlert,
    iconClassName: "text-red-600 dark:text-red-400",
  },
  warning: {
    container:
      "border-amber-300/80 bg-amber-50 text-amber-950 shadow-amber-100/50 dark:border-amber-500/40 dark:bg-amber-950/60 dark:text-amber-50 dark:shadow-amber-950/30",
    icon: AlertTriangle,
    iconClassName: "text-amber-600 dark:text-amber-400",
  },
};

function ToastItemView({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const { container, icon: Icon, iconClassName } = toastStyles[toast.type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-auto flex w-full items-start gap-3 rounded-xl border px-4 py-3 shadow-lg",
        container,
      )}
    >
      <Icon
        className={cn("mt-0.5 size-4 shrink-0", iconClassName)}
        aria-hidden
      />
      <p className="flex-1 text-sm leading-5 font-medium">{toast.message}</p>
      <button
        type="button"
        aria-label="토스트 닫기"
        className="rounded-md p-0.5 opacity-70 transition-opacity hover:opacity-100"
        onClick={() => onDismiss(toast.id)}
      >
        <X className="size-4" aria-hidden />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({
      type = "default",
      message,
      duration = DEFAULT_TOAST_DURATION_MS,
    }: ShowToastOptions) => {
      queueMicrotask(() => {
        setToasts((prev) => {
          if (prev.length > 0) {
            return prev;
          }

          return [{ id: crypto.randomUUID(), type, message, duration }];
        });
      });
    },
    [],
  );

  const visibleToast = toasts[0];

  useEffect(() => {
    if (!visibleToast) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      dismissToast(visibleToast.id);
    }, visibleToast.duration);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [visibleToast, dismissToast]);

  const value = useMemo<ToastContextValue>(
    () => ({
      showToast,
      toast: {
        default: (message, duration) =>
          showToast({ type: "default", message, duration }),
        error: (message, duration) =>
          showToast({ type: "error", message, duration }),
        warning: (message, duration) =>
          showToast({ type: "warning", message, duration }),
      },
    }),
    [showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-label="알림"
        className="pointer-events-none fixed top-4 left-1/2 z-50 w-[min(calc(100vw-2rem),24rem)] -translate-x-1/2"
      >
        {visibleToast ? (
          <ToastItemView toast={visibleToast} onDismiss={dismissToast} />
        ) : null}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
};

export function Providers({ children }: { children: ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
