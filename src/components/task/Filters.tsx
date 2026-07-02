import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PRIORITIES, STATUSES, LABELS, USERS, SPRINTS, MILESTONES,
} from "@/components/task/data";

export type TaskFilters = {
  priorities: string[];
  statuses: string[];
  types: string[];
  labels: string[];
  assignees: string[];
  sprints: string[];
  milestones: string[];
};

export const EMPTY_FILTERS: TaskFilters = {
  priorities: [], statuses: [], types: [], labels: [], assignees: [], sprints: [], milestones: [],
};

const TASK_TYPES = ["Feature","Bug","Improvement","Research","Documentation","Refactor","Hotfix","Chore"];

export function Filters({
  filters, setFilters,
}: {
  filters: TaskFilters;
  setFilters: (f: TaskFilters) => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const activeCount = Object.values(filters).reduce((n, arr) => n + arr.length, 0);

  const toggle = (key: keyof TaskFilters, value: string) => {
    const arr = filters[key];
    setFilters({
      ...filters,
      [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    });
  };

  const groups: { key: keyof TaskFilters; label: string; options: string[]; render?: (v: string) => string }[] = [
    { key: "priorities",  label: "Priority",   options: [...PRIORITIES] },
    { key: "statuses",    label: "Status",     options: [...STATUSES] },
    { key: "types",       label: "Type",       options: TASK_TYPES },
    { key: "assignees",   label: "Assignee",   options: USERS.map((u) => u.id), render: (id) => USERS.find((u) => u.id === id)?.name ?? id },
    { key: "labels",      label: "Labels",     options: LABELS.map((l) => l.name) },
    { key: "sprints",     label: "Sprint",     options: SPRINTS.map((s) => s.id), render: (id) => SPRINTS.find((s) => s.id === id)?.name ?? id },
    { key: "milestones",  label: "Milestone",  options: MILESTONES.map((m) => m.id), render: (id) => MILESTONES.find((m) => m.id === id)?.name ?? id },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {groups.map((g) => {
        const isOpen = open === g.key;
        const count = filters[g.key].length;
        return (
          <div key={g.key} className="relative">
            <button
              onClick={() => setOpen(isOpen ? null : g.key)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition",
                count > 0
                  ? "border-primary/40 bg-primary/10 text-highlight"
                  : "border-border/60 bg-surface/50 text-muted-foreground hover:text-foreground",
              )}
            >
              {g.label}
              {count > 0 && <span className="rounded-full bg-primary/25 px-1.5 text-[10px] font-semibold text-highlight">{count}</span>}
              <ChevronDown className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {isOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setOpen(null)} />
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full z-20 mt-1 w-52 rounded-xl border border-border/60 bg-card/95 backdrop-blur-xl p-1.5 shadow-glow max-h-64 overflow-y-auto"
                  >
                    {g.options.map((o) => {
                      const on = filters[g.key].includes(o);
                      return (
                        <button
                          key={o}
                          onClick={() => toggle(g.key, o)}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs",
                            on ? "bg-primary/15 text-highlight" : "hover:bg-surface",
                          )}
                        >
                          <span className={cn(
                            "grid h-3.5 w-3.5 place-items-center rounded border",
                            on ? "bg-primary border-primary" : "border-border",
                          )}>
                            {on && <X className="h-2 w-2 text-primary-foreground rotate-45" />}
                          </span>
                          <span className="truncate">{g.render ? g.render(o) : o}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        );
      })}
      {activeCount > 0 && (
        <button
          onClick={() => setFilters(EMPTY_FILTERS)}
          className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-surface/50 px-2 py-1.5 text-xs text-muted-foreground hover:text-destructive"
        >
          <X className="h-3 w-3" /> Clear ({activeCount})
        </button>
      )}
    </div>
  );
}

export function applyFilters(tasks: Parameters<typeof Array.prototype.filter>[0] extends any ? any : never, filters: TaskFilters, search: string) {
  // typed loosely to keep import surface small
  return (tasks as any[]).filter((t) => {
    if (filters.priorities.length && !filters.priorities.includes(t.priority)) return false;
    if (filters.statuses.length   && !filters.statuses.includes(t.status)) return false;
    if (filters.types.length      && !filters.types.includes(t.type)) return false;
    if (filters.assignees.length  && !filters.assignees.includes(t.assignee)) return false;
    if (filters.labels.length     && !filters.labels.some((l: string) => t.labels.includes(l))) return false;
    if (filters.sprints.length    && !filters.sprints.includes(t.sprintId)) return false;
    if (filters.milestones.length && !filters.milestones.includes(t.milestone)) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const hay = `${t.title} ${t.key} ${t.assignee} ${t.priority} ${t.labels.join(" ")} ${t.tech.join(" ")} ${t.status}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
