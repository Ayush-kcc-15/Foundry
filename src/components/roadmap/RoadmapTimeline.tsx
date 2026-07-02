import { motion } from "framer-motion";
import { Compass, Code2, TestTube2, Rocket, Wrench, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { MILESTONES } from "@/components/task/data";

const PHASES = [
  { key: "Planning",    icon: Compass,      color: "from-primary to-accent",         accent: "text-primary" },
  { key: "Development", icon: Code2,        color: "from-blue-500 to-cyan-500",      accent: "text-blue-300" },
  { key: "Testing",     icon: TestTube2,    color: "from-fuchsia-500 to-pink-500",   accent: "text-fuchsia-300" },
  { key: "Release",     icon: Rocket,       color: "from-emerald-500 to-teal-500",   accent: "text-emerald-300" },
  { key: "Maintenance", icon: Wrench,       color: "from-amber-500 to-orange-500",   accent: "text-amber-300" },
] as const;

export function RoadmapTimeline() {
  return (
    <div className="space-y-6">
      {/* Phase bar */}
      <div className="grid gap-3 sm:grid-cols-5">
        {PHASES.map((p, i) => (
          <motion.div
            key={p.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-border/60 bg-surface/40 backdrop-blur-xl p-4 relative overflow-hidden"
          >
            <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", p.color)} />
            <div className="flex items-center gap-2">
              <div className={cn("grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br text-white shadow-glow", p.color)}>
                <p.icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Phase {i + 1}</div>
                <div className="font-semibold">{p.key}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative rounded-2xl border border-border/60 bg-surface/40 backdrop-blur-xl p-6">
        <div className="absolute left-8 right-8 top-14 h-0.5 bg-gradient-to-r from-primary via-accent to-fuchsia-500 opacity-60" />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5 pt-6">
          {MILESTONES.map((m, i) => {
            const phase = PHASES.find((p) => p.key === m.phase) ?? PHASES[0];
            const Icon = phase.icon;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative"
              >
                <div className={cn(
                  "mx-auto grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ring-4 ring-background",
                  phase.color,
                )}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="mt-3 rounded-xl border border-border/60 bg-card/60 p-3 text-center">
                  <div className={cn("text-[10px] uppercase tracking-wider font-semibold mb-0.5", phase.accent)}>{m.phase}</div>
                  <div className="text-sm font-semibold leading-tight">{m.name}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    {new Date(m.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </div>
                  <div className="mt-2 h-1 rounded-full bg-border/60 overflow-hidden">
                    <motion.div
                      className={cn("h-full bg-gradient-to-r", phase.color)}
                      initial={{ width: 0 }}
                      animate={{ width: `${m.progress}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                    />
                  </div>
                  <div className="mt-1 text-[10px] font-semibold">{m.progress}%</div>
                  {m.progress === 100 && (
                    <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-success">
                      <CheckCircle2 className="h-3 w-3" /> Done
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
