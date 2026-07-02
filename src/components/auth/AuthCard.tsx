import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
  className,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("glass-strong rounded-3xl shadow-soft p-8 sm:p-10", className)}>
      <header className="mb-6 text-center sm:text-left">
        <h1 className="font-display text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
      </header>
      <div className="space-y-4">{children}</div>
      {footer && (
        <footer className="mt-6 pt-5 border-t border-border/60 text-center text-sm text-muted-foreground">
          {footer}
        </footer>
      )}
    </div>
  );
}
