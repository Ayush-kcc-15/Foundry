import { cn } from "@/lib/utils";
import type { Presence } from "./data";

const styles: Record<Presence, { dot: string; label: string; ring: string }> = {
  online:  { dot: "bg-success",     label: "Online",  ring: "ring-success/40" },
  away:    { dot: "bg-warning",     label: "Away",    ring: "ring-warning/40" },
  busy:    { dot: "bg-destructive", label: "Busy",    ring: "ring-destructive/40" },
  offline: { dot: "bg-muted-foreground/60", label: "Offline", ring: "ring-border/60" },
};

export function PresenceDot({
  presence, className, pulse = true,
}: { presence: Presence; className?: string; pulse?: boolean }) {
  const s = styles[presence];
  return (
    <span className={cn("relative inline-flex h-2.5 w-2.5", className)}>
      {pulse && presence === "online" && (
        <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping", s.dot)} />
      )}
      <span
        className={cn(
          "relative inline-flex h-2.5 w-2.5 rounded-full ring-2 ring-background",
          s.dot,
        )}
      />
    </span>
  );
}

export function PresencePill({ presence }: { presence: Presence }) {
  const s = styles[presence];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground")}>
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

export function PresenceAvatar({
  initials, color, presence, size = 40,
}: { initials: string; color: string; presence: Presence; size?: number }) {
  return (
    <div className="relative shrink-0" style={{ height: size, width: size }}>
      <div
        className={cn("grid h-full w-full place-items-center rounded-full bg-gradient-to-br text-primary-foreground font-semibold", color)}
        style={{ fontSize: size * 0.35 }}
      >
        {initials}
      </div>
      <span className="absolute -bottom-0.5 -right-0.5">
        <PresenceDot presence={presence} />
      </span>
    </div>
  );
}
