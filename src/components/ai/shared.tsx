import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function AIPageHeader({
  icon: Icon,
  title,
  description,
  actions,
}: {
  icon: any;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap items-start justify-between gap-4 mb-6"
    >
      <div className="flex items-start gap-3 min-w-0">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">{description}</p>
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </motion.div>
  );
}

export function AICard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl glass-strong p-5", className)}>{children}</div>
  );
}

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface/50 px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : label}
    </button>
  );
}

export function MarkdownBlock({ children }: { children: string }) {
  return (
    <pre className="whitespace-pre-wrap break-words rounded-xl border border-border/60 bg-surface/40 p-4 text-[13px] leading-6 font-mono text-foreground/90">
      {children}
    </pre>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-muted-foreground/70">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "w-full rounded-xl border border-border/60 bg-surface/40 px-3 py-2 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition";

export const textareaCls = inputCls + " min-h-[100px] resize-y";

export function GenerateButton({
  onClick,
  loading,
  children = "Generate",
}: {
  onClick: () => void;
  loading?: boolean;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95 disabled:opacity-60 transition"
    >
      <Sparkles className={cn("h-4 w-4", loading && "animate-pulse")} />
      {loading ? "Generating…" : children}
    </button>
  );
}

export function AISkeleton({ lines = 6 }: { lines?: number }) {
  return (
    <div className="space-y-2.5">
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.08 }}
          className="h-3 rounded-md bg-primary/10"
          style={{ width: `${60 + Math.random() * 35}%` }}
        />
      ))}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: any;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-border/60 bg-surface/30 p-10 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary mb-3">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-display text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Chip({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "primary" | "warning" | "success" | "destructive" }) {
  const tones: Record<string, string> = {
    default: "border-border/60 bg-surface/50 text-muted-foreground",
    primary: "border-primary/30 bg-primary/10 text-highlight",
    warning: "border-warning/30 bg-warning/10 text-warning",
    success: "border-success/30 bg-success/10 text-success",
    destructive: "border-destructive/30 bg-destructive/10 text-destructive",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium", tones[tone])}>
      {children}
    </span>
  );
}
