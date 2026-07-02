import { CheckCircle2, Flag, ArrowRightLeft, MessageSquare, UserPlus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Activity } from "@/components/task/data";

const ICONS = {
  created:   { icon: Plus,          color: "bg-primary/15 text-primary border-primary/30" },
  priority:  { icon: Flag,          color: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
  moved:     { icon: ArrowRightLeft,color: "bg-blue-500/15 text-blue-300 border-blue-500/30" },
  comment:   { icon: MessageSquare, color: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30" },
  assigned:  { icon: UserPlus,      color: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30" },
  completed: { icon: CheckCircle2,  color: "bg-success/15 text-success border-success/30" },
} as const;

export function ActivityTimeline({ items }: { items: Activity[] }) {
  return (
    <ol className="relative pl-4 border-l border-border/60 space-y-3">
      {items.map((a) => {
        const cfg = ICONS[a.kind] ?? ICONS.created;
        const Icon = cfg.icon;
        return (
          <li key={a.id} className="relative">
            <span className={cn("absolute -left-[22px] top-0 grid h-6 w-6 place-items-center rounded-full border", cfg.color)}>
              <Icon className="h-3 w-3" />
            </span>
            <div className="rounded-xl border border-border/60 bg-surface/40 px-3 py-2">
              <div className="text-xs font-medium">{a.text}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                {a.who && <span>{a.who} · </span>}
                {a.time}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
