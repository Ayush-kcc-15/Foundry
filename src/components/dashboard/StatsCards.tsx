import { motion } from "framer-motion";
import {
  GitBranch,
  Target,
  GitPullRequest,
  BookOpen,
  Sparkles,
  Gauge,
  Clock,
  Rocket,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { devMetrics } from "./data";

const iconMap = {
  repo: GitBranch,
  target: Target,
  pr: GitPullRequest,
  book: BookOpen,
  sparkles: Sparkles,
  gauge: Gauge,
  clock: Clock,
  rocket: Rocket,
} as const;

export function StatsCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {devMetrics.map((m, i) => {
        const Icon = iconMap[m.icon as keyof typeof iconMap];
        const Trend = m.trend === "up" ? TrendingUp : TrendingDown;
        return (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.35 }}
            whileHover={{ y: -3 }}
            className="group relative overflow-hidden rounded-2xl glass-strong p-4 hover:border-primary/40 transition-all"
          >
            <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-start justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary border border-primary/20">
                <Icon className="h-4 w-4" />
              </div>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-success/15 text-success border border-success/20 text-[10px] font-semibold px-1.5 py-0.5">
                <Trend className="h-3 w-3" />
                {m.delta}
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-semibold tracking-tight font-display">{m.value}</div>
              <div className="mt-0.5 text-xs font-medium text-foreground">{m.label}</div>
              <div className="text-[11px] text-muted-foreground">{m.desc}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
