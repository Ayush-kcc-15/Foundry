import { motion } from "framer-motion";
import { Target, Zap, Clock, CheckCircle2, TrendingUp, Calendar, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SPRINTS, type Task, type Sprint, daysUntil } from "@/components/task/data";

function sprintStats(tasks: Task[], sprintId: string) {
  const inSprint = tasks.filter((t) => t.sprintId === sprintId);
  const done = inSprint.filter((t) => t.status === "Done").length;
  const total = inSprint.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const points = inSprint.reduce((n, t) => n + t.storyPoints, 0);
  const donePoints = inSprint.filter((t) => t.status === "Done").reduce((n, t) => n + t.storyPoints, 0);
  return { done, total, pct, points, donePoints, inSprint };
}

export function SprintSummary({ tasks }: { tasks: Task[] }) {
  const active = SPRINTS.find((s) => s.status === "Active") ?? SPRINTS[0];
  const stats = sprintStats(tasks, active.id);
  const days = daysUntil(active.end);

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
      <div className="flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 border border-primary/30 text-primary">
          <Target className="h-4 w-4" />
        </div>
        <div>
          <div className="font-semibold">{active.name}</div>
          <div className="text-[10px] text-muted-foreground truncate max-w-[220px]">{active.goal}</div>
        </div>
      </div>
      <Stat label="Progress" value={`${stats.pct}%`} icon={<TrendingUp className="h-3 w-3" />} />
      <Stat label="Done"     value={`${stats.done}/${stats.total}`} icon={<CheckCircle2 className="h-3 w-3" />} />
      <Stat label="Points"   value={`${stats.donePoints}/${stats.points}`} icon={<Zap className="h-3 w-3" />} />
      <Stat label="Days left" value={days > 0 ? `${days}d` : "Ends soon"} icon={<Clock className="h-3 w-3" />} tone={days <= 3 ? "warn" : "default"} />
      <div className="hidden md:block flex-1 min-w-[120px] max-w-[220px]">
        <div className="h-1.5 rounded-full bg-border/60 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${stats.pct}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, icon, tone = "default" }: { label: string; value: string; icon: React.ReactNode; tone?: "default" | "warn" }) {
  return (
    <div className={cn("flex items-center gap-1.5", tone === "warn" ? "text-warning" : "text-foreground")}>
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export function SprintPanel({ tasks }: { tasks: Task[] }) {
  const active = SPRINTS.find((s) => s.status === "Active");
  const next   = SPRINTS.find((s) => s.status === "Planned");
  const past   = SPRINTS.find((s) => s.status === "Completed");

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {active && <SprintCard sprint={active} stats={sprintStats(tasks, active.id)} highlight />}
      {next   && <SprintCard sprint={next}   stats={sprintStats(tasks, next.id)}   />}
      {past   && <SprintCard sprint={past}   stats={sprintStats(tasks, past.id)}   completed />}
    </div>
  );
}

export function SprintCard({
  sprint, stats, highlight, completed,
}: {
  sprint: Sprint;
  stats: ReturnType<typeof sprintStats>;
  highlight?: boolean;
  completed?: boolean;
}) {
  const days = daysUntil(sprint.end);
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl",
        highlight
          ? "border-primary/40 bg-gradient-to-br from-primary/10 via-surface/60 to-surface/40 shadow-glow"
          : "border-border/60 bg-surface/40",
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className={cn(
            "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
            sprint.status === "Active"    && "border-primary/30 bg-primary/15 text-highlight",
            sprint.status === "Planned"   && "border-border bg-muted text-muted-foreground",
            sprint.status === "Completed" && "border-success/30 bg-success/15 text-success",
          )}>
            <span className="h-1 w-1 rounded-full bg-current" />
            {sprint.status}
          </span>
          <h3 className="mt-2 font-display text-lg font-semibold">{sprint.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">{sprint.goal}</p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 border border-primary/30 text-primary">
          <Target className="h-5 w-5" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 my-4">
        <MiniStat label="Progress" value={`${stats.pct}%`} />
        <MiniStat label="Points"   value={`${stats.donePoints}/${stats.points}`} />
        <MiniStat label={completed ? "Velocity" : "Days left"} value={completed ? String(sprint.velocity) : (days > 0 ? `${days}d` : "0d")} />
      </div>
      <div className="h-1.5 rounded-full bg-border/60 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${stats.pct}%` }}
          transition={{ duration: 0.7 }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {fmt(sprint.start)} → {fmt(sprint.end)}</span>
        <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {stats.done}/{stats.total} tasks</span>
      </div>
    </motion.div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-lg font-display font-semibold">{value}</div>
    </div>
  );
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
