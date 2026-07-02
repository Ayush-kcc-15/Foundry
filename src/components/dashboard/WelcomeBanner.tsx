import { motion } from "framer-motion";
import { Flame, CalendarDays } from "lucide-react";
import { Badge } from "@/components/common";

export function WelcomeBanner() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl glass-strong p-6 sm:p-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="relative grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> All systems normal
            </Badge>
            <Badge variant="primary">Pro workspace</Badge>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
            Welcome back, Ayush <span className="inline-block">👋</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here's what's happening across your workspace today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="glass rounded-2xl px-3.5 py-2.5 flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Today</div>
              <div className="text-xs font-medium">{today}</div>
            </div>
          </div>
          <div className="glass rounded-2xl px-3.5 py-2.5 flex items-center gap-2">
            <Flame className="h-4 w-4 text-warning" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Streak</div>
              <div className="text-xs font-medium">12 days</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
