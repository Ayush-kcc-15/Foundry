import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { MILESTONES, TIMELINE } from "./data";
import { cn } from "@/lib/utils";

export function MilestonesList() {
  return (
    <div className="space-y-2.5">
      {MILESTONES.map((m, i) => (
        <motion.div
          key={m.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-2xl border border-border/60 bg-surface/40 p-4"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "grid h-6 w-6 shrink-0 place-items-center rounded-full",
                  m.pct === 100 ? "bg-success text-background" : "bg-primary/15 text-primary border border-primary/30",
                )}>
                  {m.pct === 100 ? <Check className="h-3.5 w-3.5" /> : <span className="text-[10px] font-bold">{m.id}</span>}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{m.title}</div>
                  <div className="text-[11px] text-muted-foreground">Due {m.due} · {m.status}</div>
                </div>
              </div>
            </div>
            <span className="text-sm font-semibold shrink-0">{m.pct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-border/60 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${m.pct}%` }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.05 }}
              className={cn(
                "h-full bg-gradient-to-r",
                m.pct === 100 ? "from-success to-primary" : "from-primary to-accent",
              )}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function ProjectTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-3 top-2 bottom-2 w-px bg-border/60" aria-hidden />
      <ol className="space-y-4">
        {TIMELINE.map((t, i) => (
          <motion.li
            key={t.phase}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="relative flex items-start gap-3"
          >
            <div
              className={cn(
                "relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2",
                t.done && "bg-primary border-primary text-primary-foreground",
                (t as any).active && "border-primary bg-background text-primary animate-pulse",
                !t.done && !(t as any).active && "border-border/60 bg-background text-muted-foreground",
              )}
            >
              {t.done ? <Check className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="text-sm font-medium">{t.phase}</div>
              <div className="text-[11px] text-muted-foreground">{t.date}</div>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
