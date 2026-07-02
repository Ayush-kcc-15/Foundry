import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Panel({ title, description, children, footer, className }: {
  title?: string; description?: string; children: ReactNode; footer?: ReactNode; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("glass-strong rounded-2xl overflow-hidden", className)}
    >
      {(title || description) && (
        <div className="p-5 border-b border-border/60">
          {title && <h3 className="text-base font-semibold">{title}</h3>}
          {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="p-5">{children}</div>
      {footer && <div className="px-5 py-3 border-t border-border/60 bg-white/[0.02] flex items-center justify-end gap-2">{footer}</div>}
    </motion.div>
  );
}

export function Field({ label, hint, children, className }: { label: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-muted-foreground/80">{hint}</span>}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full h-10 rounded-lg border border-border bg-background/40 px-3 text-sm text-foreground",
        "placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition",
        props.className,
      )}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full min-h-[90px] rounded-lg border border-border bg-background/40 px-3 py-2 text-sm text-foreground",
        "placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition",
        props.className,
      )}
    />
  );
}

export function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select
      {...props}
      className={cn(
        "w-full h-10 rounded-lg border border-border bg-background/40 px-3 text-sm text-foreground",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 transition",
        props.className,
      )}
    >
      {children}
    </select>
  );
}

export function Toggle({ checked, onChange, label, description }: {
  checked: boolean; onChange: (v: boolean) => void; label?: string; description?: string;
}) {
  const inner = (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
        checked ? "bg-primary" : "bg-white/10",
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "inline-block h-5 w-5 rounded-full bg-white shadow-md",
          checked ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </button>
  );
  if (!label) return inner;
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {inner}
    </div>
  );
}

export function Avatar({ initials, size = 40, gradient }: { initials: string; size?: number; gradient?: string }) {
  return (
    <div
      className="inline-flex items-center justify-center rounded-full font-semibold text-primary-foreground"
      style={{
        width: size, height: size, fontSize: size * 0.36,
        background: gradient || "linear-gradient(135deg,#14B8A6,#0891B2)",
      }}
    >
      {initials}
    </div>
  );
}

export function StatusDot({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-success", away: "bg-warning", offline: "bg-muted-foreground", pending: "bg-primary",
  };
  return <span className={cn("inline-block h-2 w-2 rounded-full", map[status] || "bg-muted-foreground")} />;
}

export function Progress({ value, tone = "primary" }: { value: number; tone?: "primary" | "warning" | "success" | "destructive" }) {
  const toneMap = { primary: "bg-primary", warning: "bg-warning", success: "bg-success", destructive: "bg-destructive" };
  return (
    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn("h-full rounded-full", toneMap[tone])}
      />
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }: {
  icon: any; title: string; description?: string; action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="mt-1 text-xs text-muted-foreground max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
