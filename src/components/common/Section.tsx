import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  action?: ReactNode;
  align?: "left" | "center";
}

export function Section({
  title,
  subtitle,
  eyebrow,
  action,
  align = "left",
  className,
  children,
  ...props
}: SectionProps) {
  const centered = align === "center";
  return (
    <section className={cn("py-20 md:py-28", className)} {...props}>
      <Container>
        {(title || subtitle || eyebrow || action) && (
          <div
            className={cn(
              "mb-12 flex flex-col gap-6",
              centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between",
            )}
          >
            <div className={cn("max-w-2xl", centered && "mx-auto")}>
              {eyebrow && (
                <p className="text-xs font-medium uppercase tracking-widest text-primary">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
