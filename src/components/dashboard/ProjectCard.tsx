import { motion } from "framer-motion";
import { MoreHorizontal, Calendar } from "lucide-react";
import { projects } from "./data";
import { cn } from "@/lib/utils";

const statusStyle: Record<string, string> = {
  "On track": "bg-success/15 text-success border-success/30",
  "At risk": "bg-destructive/15 text-destructive border-destructive/30",
  "Planning": "bg-muted text-muted-foreground border-border",
  "In review": "bg-warning/15 text-warning border-warning/30",
};

const avatarColors = [
  "from-primary to-accent",
  "from-warning to-destructive",
  "from-accent to-highlight",
  "from-destructive to-primary",
  "from-highlight to-primary",
  "from-success to-primary",
];

export function ProjectGrid() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-display text-lg font-semibold">Recent projects</h2>
          <p className="text-xs text-muted-foreground">6 active · updated today</p>
        </div>
        <button className="text-xs text-primary hover:text-highlight font-medium">View all →</button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className="group relative rounded-2xl glass-strong p-4 hover:border-primary/40 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground">
                  {p.icon}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{p.name}</div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium mt-1",
                      statusStyle[p.status],
                    )}
                  >
                    <span className="h-1 w-1 rounded-full bg-current" />
                    {p.status}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="opacity-0 group-hover:opacity-100 transition grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5"
                aria-label="More"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-1.5 mb-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{p.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-border/60 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${p.progress}%` }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.05 }}
                  className="h-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] rounded-md border border-border/60 bg-surface/50 px-1.5 py-0.5 text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/60">
              <div className="flex -space-x-1.5">
                {p.team.slice(0, 4).map((m, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "h-6 w-6 rounded-full border-2 border-background grid place-items-center text-[9px] font-bold text-primary-foreground bg-gradient-to-br",
                      avatarColors[idx % avatarColors.length],
                    )}
                  >
                    {m}
                  </div>
                ))}
                {p.team.length > 4 && (
                  <div className="h-6 w-6 rounded-full border-2 border-background bg-surface grid place-items-center text-[9px] font-medium text-muted-foreground">
                    +{p.team.length - 4}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {p.due}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
