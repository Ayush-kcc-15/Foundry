import { cn } from "@/lib/utils";

const tagColors: Record<string, string> = {
  Frontend: "bg-primary/15 text-primary border-primary/30",
  Backend: "bg-accent/15 text-accent border-accent/30",
  AI: "bg-highlight/15 text-highlight border-highlight/30",
  Urgent: "bg-destructive/15 text-destructive border-destructive/30",
  Research: "bg-warning/15 text-warning border-warning/30",
  Completed: "bg-success/15 text-success border-success/30",
  Bug: "bg-destructive/15 text-destructive border-destructive/30",
  Documentation: "bg-primary/15 text-highlight border-primary/30",
  Feature: "bg-primary/15 text-primary border-primary/30",
  Design: "bg-accent/15 text-accent border-accent/30",
};

export function Tag({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium",
        tagColors[label] ?? "bg-surface text-muted-foreground border-border",
        className,
      )}
    >
      {label}
    </span>
  );
}

export function TechChip({ label }: { label: string }) {
  return (
    <span className="text-[10px] rounded-md border border-border/60 bg-surface/50 px-1.5 py-0.5 text-muted-foreground">
      {label}
    </span>
  );
}
