import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles, Target, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Task } from "@/components/task/data";
import { MILESTONES, SPRINTS, PRIORITY_META } from "@/components/task/data";

type View = "month" | "week";

export function CalendarView({ tasks }: { tasks: Task[] }) {
  const [view, setView] = useState<View>("month");
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()));

  const cells = useMemo(() => (view === "month" ? monthGrid(cursor) : weekGrid(cursor)), [cursor, view]);

  const byDate = useMemo(() => {
    const map = new Map<string, Task[]>();
    tasks.forEach((t) => {
      const key = new Date(t.due).toDateString();
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    });
    return map;
  }, [tasks]);

  const sprintDates = SPRINTS.flatMap((s) => [
    { date: new Date(s.start).toDateString(), label: `${s.name} starts`, kind: "sprint" as const },
    { date: new Date(s.end).toDateString(),   label: `${s.name} ends`,   kind: "sprint" as const },
  ]);
  const milestoneDates = MILESTONES.map((m) => ({ date: new Date(m.date).toDateString(), label: m.name, kind: "milestone" as const }));

  const eventFor = (d: Date) => {
    const k = d.toDateString();
    return [...sprintDates, ...milestoneDates].filter((e) => e.date === k);
  };

  const title = cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  return (
    <div className="rounded-2xl border border-border/60 bg-surface/40 backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 border border-primary/30 text-primary">
            <CalendarIcon className="h-4 w-4" />
          </div>
          <h2 className="font-display text-lg font-semibold">{title}</h2>
        </div>
        <div className="flex items-center gap-1">
          <div className="mr-2 flex items-center rounded-lg border border-border/60 bg-surface/50 p-0.5">
            {(["month", "week"] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition",
                  view === v ? "bg-primary/20 text-highlight" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {v}
              </button>
            ))}
          </div>
          <button onClick={() => nudge(-1)} className="grid h-8 w-8 place-items-center rounded-lg border border-border/60 hover:bg-surface"><ChevronLeft className="h-4 w-4" /></button>
          <button onClick={() => setCursor(startOfMonth(new Date()))} className="rounded-lg border border-border/60 px-2.5 py-1.5 text-xs font-medium hover:bg-surface">Today</button>
          <button onClick={() => nudge(1)} className="grid h-8 w-8 place-items-center rounded-lg border border-border/60 hover:bg-surface"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-border/60 bg-surface/30 text-[10px] uppercase tracking-wider text-muted-foreground">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d} className="px-2 py-1.5 text-center">{d}</div>
        ))}
      </div>

      <div className={cn("grid grid-cols-7", view === "week" ? "" : "")}>
        {cells.map((d, i) => {
          const inMonth = d.getMonth() === cursor.getMonth();
          const today = d.toDateString() === new Date().toDateString();
          const tasksHere = byDate.get(d.toDateString()) ?? [];
          const events = eventFor(d);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.005 }}
              className={cn(
                "min-h-[110px] border-b border-r border-border/40 p-1.5 text-[11px]",
                !inMonth && "bg-surface/20 text-muted-foreground/60",
                today && "bg-primary/5",
              )}
            >
              <div className={cn(
                "mb-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-md px-1 text-[10px] font-semibold",
                today && "bg-primary text-primary-foreground",
              )}>
                {d.getDate()}
              </div>
              <div className="space-y-0.5">
                {events.map((e, k) => (
                  <div key={k} className={cn(
                    "flex items-center gap-1 truncate rounded px-1 py-0.5 text-[9px] font-medium",
                    e.kind === "sprint" ? "bg-primary/15 text-highlight" : "bg-fuchsia-500/15 text-fuchsia-200",
                  )}>
                    {e.kind === "sprint" ? <Target className="h-2 w-2" /> : <Flag className="h-2 w-2" />}
                    <span className="truncate">{e.label}</span>
                  </div>
                ))}
                {tasksHere.slice(0, 3).map((t) => {
                  const p = PRIORITY_META[t.priority];
                  return (
                    <div key={t.id} className={cn("flex items-center gap-1 truncate rounded px-1 py-0.5 text-[9px]", p.bg, p.color)}>
                      <span className="font-mono">{t.key}</span>
                      <span className="truncate opacity-80">{t.title}</span>
                    </div>
                  );
                })}
                {tasksHere.length > 3 && (
                  <div className="text-[9px] text-muted-foreground">+{tasksHere.length - 3} more</div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  function nudge(dir: number) {
    const d = new Date(cursor);
    if (view === "month") d.setMonth(d.getMonth() + dir);
    else d.setDate(d.getDate() + dir * 7);
    setCursor(startOfMonth(d));
  }
}

function startOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function monthGrid(cursor: Date) {
  const first = startOfMonth(cursor);
  const start = new Date(first);
  start.setDate(1 - first.getDay());
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start); d.setDate(start.getDate() + i); return d;
  });
}
function weekGrid(cursor: Date) {
  const start = new Date(cursor);
  start.setDate(cursor.getDate() - cursor.getDay());
  return Array.from({ length: 7 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d; });
}
