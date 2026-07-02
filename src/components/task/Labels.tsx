import { cn } from "@/lib/utils";
import {
  PRIORITY_META, STATUS_META, TYPE_META, labelColor,
  type Priority, type Status, type TaskType, type User, getUser,
} from "./data";
import { Flag } from "lucide-react";

export function LabelChip({ name, size = "sm" }: { name: string; size?: "xs" | "sm" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        labelColor(name),
        size === "xs" ? "px-1.5 py-0 text-[9px]" : "px-2 py-0.5 text-[10px]",
      )}
    >
      {name}
    </span>
  );
}

export function PriorityBadge({ value, showLabel = true }: { value: Priority; showLabel?: boolean }) {
  const m = PRIORITY_META[value];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold",
        m.bg, m.color,
      )}
      title={`Priority: ${value}`}
    >
      <Flag className="h-2.5 w-2.5" />
      {showLabel && m.label}
    </span>
  );
}

export function StatusBadge({ value }: { value: Status }) {
  const m = STATUS_META[value];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border/60 bg-surface/50 px-2 py-0.5 text-[10px] font-medium",
        m.color,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", m.dot)} />
      {value}
    </span>
  );
}

export function TypeBadge({ value }: { value: TaskType }) {
  const m = TYPE_META[value];
  const Icon = m.icon;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium", m.bg, m.color)}>
      <Icon className="h-2.5 w-2.5" />
      {value}
    </span>
  );
}

export function Avatar({ userId, size = 24 }: { userId: string; size?: number }) {
  const u = getUser(userId);
  return (
    <div
      className={cn(
        "grid place-items-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white ring-2 ring-background",
        u.color,
      )}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      title={u.name}
    >
      {u.initials}
    </div>
  );
}

export function AvatarStack({ ids, max = 3 }: { ids: string[]; max?: number }) {
  const shown = ids.slice(0, max);
  const rest = ids.length - shown.length;
  return (
    <div className="flex -space-x-2">
      {shown.map((id) => <Avatar key={id} userId={id} />)}
      {rest > 0 && (
        <div className="grid h-6 w-6 place-items-center rounded-full bg-surface border border-border/60 text-[10px] font-semibold text-muted-foreground ring-2 ring-background">
          +{rest}
        </div>
      )}
    </div>
  );
}
