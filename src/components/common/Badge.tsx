import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "success" | "warning" | "error" | "neutral";

const variants: Record<Variant, string> = {
  primary: "bg-primary/15 text-highlight border-primary/30",
  success: "bg-success/15 text-success border-success/30",
  warning: "bg-warning/15 text-warning border-warning/30",
  error: "bg-destructive/15 text-destructive border-destructive/30",
  neutral: "bg-surface text-muted-foreground border-border",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

export function Badge({ variant = "neutral", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
