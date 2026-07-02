import { motion } from "framer-motion";
import { CalendarClock, Target, AlertOctagon, CheckCircle2, Users2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { TASKS, SPRINTS, daysUntil, USERS } from "@/components/task/data";

export function TaskWidgets() {
  const today = new Date().toDateString();
  const dueToday = TASKS.filter((t) => new Date(t.due).toDateString() === today && t.status !== "Done").length;
  const activeSprint = SPRINTS.find((s) => s.status === "Active");
  const sprintTasks = TASKS.filter((t) => t.sprintId === activeSprint?.id);
  const sprintDone = sprintTasks.filter((t) => t.status === "Done").length;
  const sprintPct = sprintTasks.length ? Math.round((sprintDone / sprintTasks.length) * 100) : 0;
  const blocked = TASKS.filter((t) => t.dependencies.length > 0 && t.status !== "Done").length;
  const completedWeek = TASKS.filter((t) => t.status === "Done").length;
  const velocity = activeSprint?.velocity ?? 0;

  const items = [
    { label: "Tasks due today",  value: dueToday,  hint: dueToday ? "Focus needed" : "You're clear",  icon: CalendarClock, color: "from-primary to-accent", tone: "text-highlight" },
    { label: "Current sprint",   value: `${sprintPct}%`, hint: activeSprint?.name ?? "—",             icon: Target,        color: "from-blue-500 to-cyan-500", tone: "text-blue-200" },
    { label: "Blocked tasks",    value: blocked,   hint: "Awaiting dependencies",                     icon: AlertOctagon,  color: "from-orange-500 to-red-500", tone: "text-orange-200" },
    { label: "Completed this week", value: completedWeek, hint: "Nice work 🎯",                       icon: CheckCircle2,  color: "from-emerald-500 to-teal-500", tone: "text-emerald-200" },
    { label: "Team workload",    value: `${USERS.length}`, hint: "Contributors active",                icon: Users2,        color: "from-fuchsia-500 to-pink-500", tone: "text-fuchsia-200" },
    { label: "Task velocity",    value: velocity,  hint: "pts / sprint",                              icon: Zap,           color: "from-amber-500 to-orange-500", tone: "text-amber-200" },
  ];

  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 font-display text-base font-semibold">
        <Target className="h-4 w-4 text-primary" /> Task momentum
      </h2>
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="relative overflow-hidden rounded-2xl border border-border/60 bg-surface/40 backdrop-blur-xl p-4"
          >
            <div className={cn("absolute -top-4 -right-4 h-16 w-16 rounded-full bg-gradient-to-br opacity-20 blur-xl", it.color)} />
            <div className={cn("mb-2 inline-grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br text-white shadow-glow", it.color)}>
              <it.icon className="h-4 w-4" />
            </div>
            <div className={cn("font-display text-2xl font-semibold", it.tone)}>{it.value}</div>
            <div className="text-[11px] font-medium">{it.label}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{it.hint}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
