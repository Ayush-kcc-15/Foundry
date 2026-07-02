import { motion } from "framer-motion";
import { ArrowRight, GripVertical, ListFilter } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Task } from "@/components/task/data";
import { PRIORITIES } from "@/components/task/data";
import { Avatar, LabelChip, PriorityBadge, StatusBadge, TypeBadge } from "@/components/task/Labels";

export function BacklogList({
  tasks,
  selected,
  onToggleSelect,
  onOpen,
  onMoveToSprint,
}: {
  tasks: Task[];
  selected: Set<string>;
  onToggleSelect: (id: string, shift: boolean) => void;
  onOpen: (t: Task) => void;
  onMoveToSprint: (id: string) => void;
}) {
  const grouped: Record<string, Task[]> = { Critical: [], High: [], Medium: [], Low: [] };
  tasks.forEach((t) => grouped[t.priority]?.push(t));

  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/60 bg-surface/30 py-14 px-6 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-3">
          <ListFilter className="h-6 w-6" />
        </div>
        <h3 className="font-display text-base font-semibold">Backlog is empty</h3>
        <p className="text-xs text-muted-foreground mt-1">Create tasks to start planning upcoming work.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {PRIORITIES.map((p) => {
        const list = grouped[p];
        if (!list.length) return null;
        return (
          <section key={p}>
            <div className="mb-2 flex items-center gap-2">
              <PriorityBadge value={p} />
              <span className="text-xs font-semibold text-muted-foreground">{list.length} tasks</span>
              <div className="ml-auto h-px flex-1 bg-border/50" />
            </div>
            <ul className="divide-y divide-border/40 rounded-2xl border border-border/60 bg-surface/40 overflow-hidden">
              {list.map((t) => (
                <motion.li
                  key={t.id}
                  layout
                  className={cn(
                    "grid grid-cols-[auto_auto_minmax(0,1fr)_auto_auto_auto_auto] items-center gap-3 px-3 py-2.5 hover:bg-primary/5 transition-colors",
                    selected.has(t.id) && "bg-primary/10",
                  )}
                >
                  <GripVertical className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <button
                    onClick={(e) => onToggleSelect(t.id, e.shiftKey)}
                    className={cn(
                      "h-3.5 w-3.5 rounded border transition-colors shrink-0",
                      selected.has(t.id) ? "bg-primary border-primary" : "border-border hover:border-primary",
                    )}
                    aria-label="Select"
                  />
                  <button
                    onClick={() => onOpen(t)}
                    className="text-left min-w-0"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <TypeBadge value={t.type} />
                      <span className="text-[10px] font-mono text-muted-foreground">{t.key}</span>
                      <span className="text-sm font-medium truncate">{t.title}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                      {t.labels.slice(0, 3).map((l) => <LabelChip key={l} name={l} size="xs" />)}
                    </div>
                  </button>
                  <StatusBadge value={t.status} />
                  <span className="hidden sm:inline text-[10px] text-muted-foreground">
                    {t.estimateH}h · {t.storyPoints} pts
                  </span>
                  <Avatar userId={t.assignee} size={22} />
                  <button
                    onClick={() => onMoveToSprint(t.id)}
                    className="hidden md:inline-flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-2 py-1 text-[10px] font-semibold text-highlight hover:bg-primary/20"
                  >
                    Sprint <ArrowRight className="h-2.5 w-2.5" />
                  </button>
                </motion.li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
